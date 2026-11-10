import type { RsvpSubmission } from '../types/wedding';
import { saveRsvpToFirebase, deleteRsvpFromFirebase } from './firebase';

const STORAGE_KEY = 'wedding_rsvp_submission_sunitha_prasad';
const ALL_RSVPS_KEY = 'wedding_all_rsvps_sunitha_prasad';

export async function submitRsvp(data: Omit<RsvpSubmission, 'id' | 'submittedAt'>): Promise<{
  success: boolean;
  message: string;
  data: RsvpSubmission;
}> {
  const fullSubmission: RsvpSubmission = {
    ...data,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
  };

  // 1. Save to Firebase Firestore
  const savedToFirebase = await saveRsvpToFirebase(fullSubmission);

  // 2. Save local storage backup
  saveLocalBackup(fullSubmission);

  return {
    success: true,
    message: savedToFirebase
      ? 'Your RSVP has been saved to Firebase Cloud Database!'
      : 'Your blessing and RSVP response have been recorded with joy!',
    data: fullSubmission,
  };
}

function saveLocalBackup(submission: RsvpSubmission) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
    const existing = getAllStoredRsvps();
    existing.unshift(submission);
    localStorage.setItem(ALL_RSVPS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to write to localStorage', e);
  }
}

export function getSavedRsvp(): RsvpSubmission | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAllStoredRsvps(): RsvpSubmission[] {
  try {
    const raw = localStorage.getItem(ALL_RSVPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function deleteRsvp(id: string): Promise<void> {
  await deleteRsvpFromFirebase(id);
  try {
    const existing = getAllStoredRsvps();
    const updated = existing.filter((r) => r.id !== id);
    localStorage.setItem(ALL_RSVPS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete RSVP from localStorage', e);
  }
}
