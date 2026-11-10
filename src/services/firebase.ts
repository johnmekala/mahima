import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  Database,
} from 'firebase/database';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import type { RsvpSubmission } from '../types/wedding';
import type { WeddingSiteData } from '../types/cms';

// Firebase configuration with Realtime Database (RTDB) URL
export const firebaseConfig = {
  apiKey: "AIzaSyAbUBNWhmaxmQYtDpBwo6v0ErJXmCnJntk",
  authDomain: "wedding-25306.firebaseapp.com",
  databaseURL: "https://wedding-25306-default-rtdb.firebaseio.com",
  projectId: "wedding-25306",
  storageBucket: "wedding-25306.firebasestorage.app",
  messagingSenderId: "890327218534",
  appId: "1:890327218534:web:23149f73feb5d3b673f0a7",
};

// Initialize Firebase safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Realtime Database (RTDB)
export const rtdb: Database = getDatabase(app);

// Initialize Firestore
export const db = getFirestore(app);

// Paths & Keys
const RTDB_RSVPS_PATH = 'rsvps';
const RTDB_CONFIG_PATH = 'wedding_config';
export const RTDB_CONFIG_REST_URL = 'https://wedding-25306-default-rtdb.firebaseio.com/wedding_config.json';

/**
 * -------------------------------------------------------------
 * REALTIME DATABASE (RTDB) FUNCTIONS
 * -------------------------------------------------------------
 */

/**
 * Save an RSVP submission to Firebase Realtime Database
 */
export async function saveRsvpToRTDB(rsvp: RsvpSubmission): Promise<boolean> {
  const docId = rsvp.id || `rsvp_${Date.now()}`;
  try {
    const rsvpRef = ref(rtdb, `${RTDB_RSVPS_PATH}/${docId}`);
    await set(rsvpRef, {
      ...rsvp,
      id: docId,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.warn('Firebase RTDB saveRsvp error:', error);
    return false;
  }
}

/**
 * Delete an RSVP submission from Firebase Realtime Database
 */
export async function deleteRsvpFromRTDB(id: string): Promise<boolean> {
  try {
    const rsvpRef = ref(rtdb, `${RTDB_RSVPS_PATH}/${id}`);
    await remove(rsvpRef);
    return true;
  } catch (error) {
    console.warn('Firebase RTDB deleteRsvp error:', error);
    return false;
  }
}

/**
 * Subscribe to real-time RSVP updates from Firebase Realtime Database
 */
export function subscribeToRTDBRsvps(
  onUpdate: (rsvps: RsvpSubmission[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const rsvpsRef = ref(rtdb, RTDB_RSVPS_PATH);
    const unsubscribe = onValue(
      rsvpsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const list: RsvpSubmission[] = Object.keys(val).map((key) => val[key]);
          // Sort descending by submittedAt
          list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          onUpdate(list);
        } else {
          onUpdate([]);
        }
      },
      (err) => {
        console.warn('Firebase RTDB RSVPs listener error:', err.message);
        if (onError) onError(err);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Firebase RTDB subscribe error:', error);
    return () => {};
  }
}

/**
 * Direct HTTPS REST fetch for instantaneous CMS config loading across all devices & mobile networks
 */
export async function fetchSiteConfigDirect(): Promise<WeddingSiteData | null> {
  try {
    const res = await fetch(`${RTDB_CONFIG_REST_URL}?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.couple ? (data as WeddingSiteData) : null;
  } catch (e) {
    console.warn('Direct RTDB fetch warning:', e);
    return null;
  }
}

/**
 * Save site configuration (CMS data) to Firebase Realtime Database
 * Dual-syncs via Direct REST PUT (100% reliable) and Firebase SDK set (live WebSocket broadcast)
 */
export async function saveSiteConfigToRTDB(data: WeddingSiteData): Promise<{ success: boolean; error?: string }> {
  const payload = {
    ...data,
    lastSavedAt: new Date().toISOString(),
  };

  let rtdbSuccess = false;
  let rtdbError = '';

  // 1. Direct REST PUT (instant reliable update directly to cloud RTDB)
  try {
    const res = await fetch(RTDB_CONFIG_REST_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      rtdbSuccess = true;
    } else {
      const errText = await res.text();
      rtdbError = errText;
    }
  } catch (e: any) {
    rtdbError = e?.message || String(e);
  }

  // 2. Firebase SDK set (notifies active WebSocket clients immediately)
  try {
    const configRef = ref(rtdb, RTDB_CONFIG_PATH);
    await set(configRef, payload);
    rtdbSuccess = true;
  } catch (error: any) {
    if (!rtdbSuccess) {
      rtdbError = error?.message || String(error);
    }
  }

  if (rtdbSuccess) {
    return { success: true };
  }
  return { success: false, error: rtdbError };
}

/**
 * Subscribe to real-time CMS site configuration updates from Firebase Realtime Database
 */
export function subscribeToSiteConfigRTDB(
  onUpdate: (data: WeddingSiteData) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const configRef = ref(rtdb, RTDB_CONFIG_PATH);
    const unsubscribe = onValue(
      configRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onUpdate(snapshot.val() as WeddingSiteData);
        }
      },
      (err) => {
        console.warn('Firebase RTDB site config listener error:', err.message);
        if (onError) onError(err);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Firebase RTDB subscribeToSiteConfig error:', error);
    if (onError) onError(error);
    return () => {};
  }
}

/**
 * Combined save function that pushes to both RTDB and Firestore
 */
export async function saveRsvpToFirebase(rsvp: RsvpSubmission): Promise<boolean> {
  const docId = rsvp.id || `rsvp_${Date.now()}`;
  const payload = {
    ...rsvp,
    id: docId,
    updatedAt: new Date().toISOString(),
  };

  const rtdbSuccess = await saveRsvpToRTDB(payload);

  // Firestore backup
  try {
    const firestoreRef = doc(db, 'rsvps', docId);
    await setDoc(firestoreRef, payload, { merge: true });
  } catch {
    // Ignore Firestore errors if RTDB worked
  }

  return rtdbSuccess;
}

/**
 * Combined delete function
 */
export async function deleteRsvpFromFirebase(id: string): Promise<boolean> {
  const rtdbSuccess = await deleteRsvpFromRTDB(id);
  try {
    const firestoreRef = doc(db, 'rsvps', id);
    await deleteDoc(firestoreRef);
  } catch {
    // Ignore
  }
  return rtdbSuccess;
}

/**
 * Combined save site config function
 */
export async function saveSiteConfigToFirebase(data: WeddingSiteData): Promise<{ success: boolean; error?: string }> {
  const rtdbResult = await saveSiteConfigToRTDB(data);
  try {
    const firestoreRef = doc(db, 'wedding_config', 'main');
    await setDoc(firestoreRef, { ...data, lastSavedAt: new Date().toISOString() }, { merge: true });
  } catch {
    // Ignore
  }
  return rtdbResult;
}

export const subscribeToFirebaseRsvps = subscribeToRTDBRsvps;
export const subscribeToSiteConfig = subscribeToSiteConfigRTDB;

export default app;
