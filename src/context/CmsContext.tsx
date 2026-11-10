import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type {
  CoupleInfo,
  StoryMilestone,
  WeddingEvent,
  GalleryPhoto,
  FamilyMember,
  InstagramReel,
  RsvpSubmission,
} from '../types/wedding';
import type {
  WeddingSiteData,
  EnvelopeSettings,
  HeroSettings,
  BlessingsSettings,
  StorySettings,
  CountdownSettings,
  EventsSettings,
  GallerySettings,
  FamilySettings,
  WarmRegardsSettings,
  ReelsSettings,
  RsvpSettings,
  LocationSettings,
  FinalSettings,
  SocialSettings,
  MusicSettings,
} from '../types/cms';
import { defaultWeddingData } from '../data/weddingData';
import { getAllStoredRsvps } from '../services/rsvpService';
import {
  saveSiteConfigToFirebase,
  subscribeToRTDBRsvps,
  subscribeToSiteConfigRTDB,
  fetchSiteConfigDirect,
  deleteRsvpFromFirebase,
} from '../services/firebase';

const CMS_STORAGE_KEY = 'cms_wedding_site_data_v2';
const CMS_PIN_STORAGE_KEY = 'cms_admin_pin_v1';
const CMS_AUTH_SESSION_KEY = 'cms_admin_authenticated';
const DEFAULT_ADMIN_PIN = 'grace2026';

interface CmsContextType {
  siteData: WeddingSiteData;
  isAdminLoggedIn: boolean;
  isCmsOpen: boolean;
  rsvps: RsvpSubmission[];
  
  // Navigation & Auth
  openCms: () => void;
  closeCms: () => void;
  login: (pin: string) => boolean;
  logout: () => void;
  changePin: (newPin: string) => void;

  // Single Section Updaters
  updateCouple: (data: Partial<CoupleInfo>) => void;
  updateEnvelope: (data: Partial<EnvelopeSettings>) => void;
  updateHero: (data: Partial<HeroSettings>) => void;
  updateBlessings: (data: Partial<BlessingsSettings>) => void;
  updateStorySettings: (data: Partial<StorySettings>) => void;
  updateCountdown: (data: Partial<CountdownSettings>) => void;
  updateEventsSettings: (data: Partial<EventsSettings>) => void;
  updateGallerySettings: (data: Partial<GallerySettings>) => void;
  updateFamilySettings: (data: Partial<FamilySettings>) => void;
  updateWarmRegards: (data: Partial<WarmRegardsSettings>) => void;
  updateReelsSettings: (data: Partial<ReelsSettings>) => void;
  updateRsvpSettings: (data: Partial<RsvpSettings>) => void;
  updateLocations: (data: Partial<LocationSettings>) => void;
  updateFinal: (data: Partial<FinalSettings>) => void;
  updateSocial: (data: Partial<SocialSettings>) => void;
  updateMusic: (data: Partial<MusicSettings>) => void;

  // Manual Explicit Save Trigger for CMS Sections
  saveSiteData: () => Promise<boolean>;

  // Story Milestones CRUD
  addStoryMilestone: (milestone: Omit<StoryMilestone, 'id'>) => void;
  updateStoryMilestone: (id: string, data: Partial<StoryMilestone>) => void;
  deleteStoryMilestone: (id: string) => void;
  reorderStoryMilestones: (milestones: StoryMilestone[]) => void;

  // Wedding Events CRUD
  addEvent: (event: Omit<WeddingEvent, 'id'>) => void;
  updateEvent: (id: string, data: Partial<WeddingEvent>) => void;
  deleteEvent: (id: string) => void;

  // Gallery CRUD
  addPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updatePhoto: (id: string, data: Partial<GalleryPhoto>) => void;
  deletePhoto: (id: string) => void;

  // Family CRUD
  updateFamilyMember: (index: number, data: Partial<FamilyMember>) => void;
  addFamilyMember: (member: FamilyMember) => void;
  deleteFamilyMember: (index: number) => void;

  // Instagram Reels CRUD
  addReel: (reel: Omit<InstagramReel, 'id'>) => void;
  updateReel: (id: string, data: Partial<InstagramReel>) => void;
  deleteReel: (id: string) => void;

  // RSVPs
  refreshRsvps: () => void;
  deleteRsvp: (id: string) => void;
  exportRsvpsCsv: () => void;

  // Cloud Sync
  cloudSyncStatus: 'connected' | 'permission_denied' | 'connecting' | 'error';
  cloudErrorDetails: string | null;
  retryCloudSync: () => Promise<boolean>;

  // System Controls
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
}

const CmsContext = createContext<CmsContextType | null>(null);

/**
 * Deep merges cloud or local partial data into full site state safely
 */
export const mergeSiteData = (base: WeddingSiteData, incoming: Partial<WeddingSiteData>): WeddingSiteData => {
  if (!incoming) return base;
  return {
    ...base,
    ...incoming,
    couple: {
      ...base.couple,
      ...(incoming.couple || {}),
      bridePhotoUrl: incoming.couple?.bridePhotoUrl || base.couple?.bridePhotoUrl,
      groomPhotoUrl: incoming.couple?.groomPhotoUrl || base.couple?.groomPhotoUrl,
      brideFullName: incoming.couple?.brideFullName || base.couple?.brideFullName,
      groomFullName: incoming.couple?.groomFullName || base.couple?.groomFullName,
      brideParents: incoming.couple?.brideParents || base.couple?.brideParents,
      groomParents: incoming.couple?.groomParents || base.couple?.groomParents,
      locationCity: incoming.couple?.locationCity || base.couple?.locationCity,
      weddingDateFormatted: incoming.couple?.weddingDateFormatted || base.couple?.weddingDateFormatted,
    },
    envelope: {
      ...base.envelope,
      ...(incoming.envelope || {}),
    },
    hero: {
      ...base.hero,
      ...(incoming.hero || {}),
      backgroundUrl: incoming.hero?.backgroundUrl || base.hero?.backgroundUrl,
      overlayOpacity:
        typeof incoming.hero?.overlayOpacity === 'number'
          ? incoming.hero.overlayOpacity
          : base.hero?.overlayOpacity ?? 35,
    },
    blessings: {
      ...base.blessings,
      ...(incoming.blessings || {}),
    },
    countdown: {
      ...base.countdown,
      ...(incoming.countdown || {}),
    },
    storySettings: {
      ...base.storySettings,
      ...(incoming.storySettings || {}),
    },
    eventsSettings: {
      ...base.eventsSettings,
      ...(incoming.eventsSettings || {}),
    },
    gallerySettings: {
      ...base.gallerySettings,
      ...(incoming.gallerySettings || {}),
    },
    familySettings: {
      ...base.familySettings,
      ...(incoming.familySettings || {}),
    },
    warmRegards: {
      ...base.warmRegards,
      ...(incoming.warmRegards || {}),
    },
    reelsSettings: {
      ...base.reelsSettings,
      ...(incoming.reelsSettings || {}),
    },
    rsvpSettings: {
      ...base.rsvpSettings,
      ...(incoming.rsvpSettings || {}),
    },
    locations: {
      ...base.locations,
      ...(incoming.locations || {}),
    },
    final: {
      ...base.final,
      ...(incoming.final || {}),
    },
    social: {
      ...base.social,
      ...(incoming.social || {}),
    },
    music: {
      ...base.music,
      ...(incoming.music || {}),
    },
    events: incoming.events && incoming.events.length > 0 ? incoming.events : base.events,
    gallery: incoming.gallery && incoming.gallery.length > 0 ? incoming.gallery : base.gallery,
    story: incoming.story && incoming.story.length > 0 ? incoming.story : base.story,
    family: incoming.family && incoming.family.length > 0 ? incoming.family : base.family,
    reels: incoming.reels && incoming.reels.length > 0 ? incoming.reels : base.reels,
  };
};

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load site data from localStorage or default
  const [siteData, setSiteData] = useState<WeddingSiteData>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return mergeSiteData(defaultWeddingData, parsed);
      }
    } catch (e) {
      console.error('Failed to load CMS data from localStorage', e);
    }
    return defaultWeddingData;
  });

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(CMS_AUTH_SESSION_KEY) === 'true';
  });

  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
    return path === '/admin' || hash === '#admin' || hash === '#/admin';
  });
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>(() => getAllStoredRsvps());

  const [cloudSyncStatus, setCloudSyncStatus] = useState<'connected' | 'permission_denied' | 'connecting' | 'error'>('connecting');
  const [cloudErrorDetails, setCloudErrorDetails] = useState<string | null>(null);

  // Track if active modifications have been made by the admin in this session
  const hasUserEditedRef = useRef<boolean>(false);

  // Sync to local storage on any change; sync to Firebase Cloud ONLY when admin makes edits!
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    // CRITICAL: Only push to Firebase if admin is logged in AND has made active edits!
    // Regular visitors (new browsers, mobile devices) MUST NEVER overwrite Firebase with default data!
    if (isAdminLoggedIn && hasUserEditedRef.current) {
      saveSiteConfigToFirebase(siteData).then((res) => {
        if (res.success) {
          setCloudSyncStatus('connected');
          setCloudErrorDetails(null);
        } else {
          const isPerm =
            res.error?.toLowerCase().includes('permission') ||
            res.error?.toLowerCase().includes('permission_denied');
          setCloudSyncStatus(isPerm ? 'permission_denied' : 'error');
          setCloudErrorDetails(res.error || 'Permission denied in Firebase database rules');
        }
      });
    }
  }, [siteData, isAdminLoggedIn]);

  // Load and listen to Firebase RTDB Cloud Data
  useEffect(() => {
    let isCancelled = false;

    // 1. Direct REST fetch: executes immediately on page load in any browser/mobile network
    const fetchDirect = async () => {
      try {
        const directData = await fetchSiteConfigDirect();
        if (directData && directData.couple && !isCancelled) {
          setSiteData((prev) => {
            const merged = mergeSiteData(prev, directData);
            try {
              localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
          setCloudSyncStatus('connected');
          setCloudErrorDetails(null);
        }
      } catch (err) {
        console.warn('Direct RTDB fetch warning:', err);
      }
    };
    fetchDirect();

    // 2. Realtime WebSocket listener: streams live updates when edits are made in CMS
    const unsubscribeRtdbConfig = subscribeToSiteConfigRTDB(
      (cloudConfig) => {
        if (isCancelled) return;
        setCloudSyncStatus('connected');
        setCloudErrorDetails(null);
        if (cloudConfig && cloudConfig.couple) {
          setSiteData((prev) => {
            const merged = mergeSiteData(prev, cloudConfig);
            try {
              localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      },
      (err: any) => {
        if (isCancelled) return;
        const msg = err?.message || String(err);
        const isPerm = msg.toLowerCase().includes('permission');
        setCloudSyncStatus(isPerm ? 'permission_denied' : 'error');
        setCloudErrorDetails(msg);
      }
    );

    // 3. RTDB RSVP live listener
    const unsubscribeRtdbRsvps = subscribeToRTDBRsvps((cloudRsvps) => {
      if (isCancelled) return;
      if (cloudRsvps && cloudRsvps.length > 0) {
        setRsvps(cloudRsvps);
        try {
          localStorage.setItem('wedding_all_rsvps_sunitha_prasad', JSON.stringify(cloudRsvps));
        } catch {}
      }
    });

    return () => {
      isCancelled = true;
      unsubscribeRtdbConfig();
      unsubscribeRtdbRsvps();
    };
  }, []);

  const retryCloudSync = async (): Promise<boolean> => {
    setCloudSyncStatus('connecting');
    const res = await saveSiteConfigToFirebase(siteData);
    if (res.success) {
      setCloudSyncStatus('connected');
      setCloudErrorDetails(null);
      return true;
    } else {
      const isPerm =
        res.error?.toLowerCase().includes('permission') ||
        res.error?.toLowerCase().includes('permission_denied');
      setCloudSyncStatus(isPerm ? 'permission_denied' : 'error');
      setCloudErrorDetails(res.error || 'Permission denied in Firebase database rules');
      return false;
    }
  };

  // Auth methods
  const login = (pin: string): boolean => {
    const savedPin = localStorage.getItem(CMS_PIN_STORAGE_KEY) || DEFAULT_ADMIN_PIN;
    if (pin.trim() === savedPin.trim()) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(CMS_AUTH_SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(CMS_AUTH_SESSION_KEY);
    setIsCmsOpen(false);
  };

  const changePin = (newPin: string) => {
    if (newPin.trim().length >= 4) {
      localStorage.setItem(CMS_PIN_STORAGE_KEY, newPin.trim());
    }
  };

  const openCms = () => setIsCmsOpen(true);
  const closeCms = () => setIsCmsOpen(false);

  // Single Section Updates
  const updateCouple = (data: Partial<CoupleInfo>) => {
    setSiteData((prev) => ({
      ...prev,
      couple: { ...prev.couple, ...data },
    }));
  };

  const updateEnvelope = (data: Partial<EnvelopeSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      envelope: { ...prev.envelope, ...data },
    }));
  };

  const updateHero = (data: Partial<HeroSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...data },
    }));
  };

  const updateBlessings = (data: Partial<BlessingsSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      blessings: { ...prev.blessings, ...data },
    }));
  };

  const updateCountdown = (data: Partial<CountdownSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      countdown: { ...prev.countdown, ...data },
    }));
  };

  const updateLocations = (data: Partial<LocationSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      locations: { ...prev.locations, ...data },
    }));
  };

  const updateFinal = (data: Partial<FinalSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      final: { ...prev.final, ...data },
    }));
  };

  const updateSocial = (data: Partial<SocialSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      social: { ...prev.social, ...data },
    }));
  };

  const updateMusic = (data: Partial<MusicSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      music: { ...prev.music, ...data },
    }));
  };

  const updateStorySettings = (data: Partial<StorySettings>) => {
    setSiteData((prev) => ({
      ...prev,
      storySettings: { ...(prev.storySettings || {}), ...data },
    }));
  };

  const updateEventsSettings = (data: Partial<EventsSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      eventsSettings: { ...(prev.eventsSettings || {}), ...data },
    }));
  };

  const updateGallerySettings = (data: Partial<GallerySettings>) => {
    setSiteData((prev) => ({
      ...prev,
      gallerySettings: { ...(prev.gallerySettings || {}), ...data },
    }));
  };

  const updateFamilySettings = (data: Partial<FamilySettings>) => {
    setSiteData((prev) => ({
      ...prev,
      familySettings: { ...(prev.familySettings || {}), ...data },
    }));
  };

  const updateWarmRegards = (data: Partial<WarmRegardsSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      warmRegards: { ...(prev.warmRegards || defaultWeddingData.warmRegards || {}), ...data },
    }));
  };

  const updateReelsSettings = (data: Partial<ReelsSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      reelsSettings: { ...(prev.reelsSettings || {}), ...data },
    }));
  };

  const updateRsvpSettings = (data: Partial<RsvpSettings>) => {
    setSiteData((prev) => ({
      ...prev,
      rsvpSettings: { ...(prev.rsvpSettings || {}), ...data },
    }));
  };

  const saveSiteData = async (): Promise<boolean> => {
    try {
      hasUserEditedRef.current = true;
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(siteData));
      const res = await saveSiteConfigToFirebase(siteData);
      if (res.success) {
        setCloudSyncStatus('connected');
        setCloudErrorDetails(null);
        return true;
      } else {
        const isPerm =
          res.error?.toLowerCase().includes('permission') ||
          res.error?.toLowerCase().includes('permission_denied');
        setCloudSyncStatus(isPerm ? 'permission_denied' : 'error');
        setCloudErrorDetails(res.error || 'Permission denied in Firebase database rules');
        return false;
      }
    } catch (e) {
      console.error('Failed to manually save site config:', e);
      return false;
    }
  };

  // Story Milestones CRUD
  const addStoryMilestone = (milestone: Omit<StoryMilestone, 'id'>) => {
    const newMilestone: StoryMilestone = {
      ...milestone,
      id: `story_${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      story: [...prev.story, newMilestone],
    }));
  };

  const updateStoryMilestone = (id: string, data: Partial<StoryMilestone>) => {
    setSiteData((prev) => ({
      ...prev,
      story: prev.story.map((m) => (m.id === id ? { ...m, ...data } : m)),
    }));
  };

  const deleteStoryMilestone = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      story: prev.story.filter((m) => m.id !== id),
    }));
  };

  const reorderStoryMilestones = (milestones: StoryMilestone[]) => {
    setSiteData((prev) => ({
      ...prev,
      story: milestones,
    }));
  };

  // Wedding Events CRUD
  const addEvent = (event: Omit<WeddingEvent, 'id'>) => {
    const newEvent: WeddingEvent = {
      ...event,
      id: `event_${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const updateEvent = (id: string, data: Partial<WeddingEvent>) => {
    setSiteData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...data } : e)),
    }));
  };

  const deleteEvent = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  // Gallery CRUD
  const addPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `photo_${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newPhoto],
    }));
  };

  const updatePhoto = (id: string, data: Partial<GalleryPhoto>) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  };

  const deletePhoto = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((p) => p.id !== id),
    }));
  };

  // Family CRUD
  const updateFamilyMember = (index: number, data: Partial<FamilyMember>) => {
    setSiteData((prev) => {
      const updated = [...prev.family];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, family: updated };
    });
  };

  const addFamilyMember = (member: FamilyMember) => {
    setSiteData((prev) => ({
      ...prev,
      family: [...prev.family, member],
    }));
  };

  const deleteFamilyMember = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      family: prev.family.filter((_, i) => i !== index),
    }));
  };

  // Instagram Reels CRUD
  const addReel = (reel: Omit<InstagramReel, 'id'>) => {
    const newReel: InstagramReel = {
      ...reel,
      id: `reel_${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      reels: [...prev.reels, newReel],
    }));
  };

  const updateReel = (id: string, data: Partial<InstagramReel>) => {
    setSiteData((prev) => ({
      ...prev,
      reels: prev.reels.map((r) => (r.id === id ? { ...r, ...data } : r)),
    }));
  };

  const deleteReel = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      reels: prev.reels.filter((r) => r.id !== id),
    }));
  };

  // RSVPs Management
  const refreshRsvps = () => {
    setRsvps(getAllStoredRsvps());
  };

  const deleteRsvp = async (id: string) => {
    try {
      const updated = rsvps.filter((r) => r.id !== id);
      setRsvps(updated);
      localStorage.setItem('wedding_all_rsvps_sunitha_prasad', JSON.stringify(updated));
      await deleteRsvpFromFirebase(id);
    } catch (e) {
      console.error('Failed to delete RSVP', e);
    }
  };

  const exportRsvpsCsv = () => {
    if (rsvps.length === 0) {
      alert('No RSVPs to export yet.');
      return;
    }
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Attendance', 'Guest Count', 'Events', 'Dietary', 'Blessing', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.id || ''}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.attendance}"`,
      r.guestCount,
      `"${(r.eventsAttending || []).join('; ')}"`,
      `"${(r.dietaryRequirements || '').replace(/"/g, '""')}"`,
      `"${(r.blessingMessage || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVPs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // System Controls
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all wedding content back to initial template defaults? Any custom edits will be reverted.')) {
      setSiteData(defaultWeddingData);
      localStorage.removeItem(CMS_STORAGE_KEY);
    }
  };

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Wedding_Config_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.couple && parsed.hero && parsed.events) {
        setSiteData(parsed);
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        siteData,
        isAdminLoggedIn,
        isCmsOpen,
        rsvps,
        openCms,
        closeCms,
        login,
        logout,
        changePin,
        updateCouple,
        updateEnvelope,
        updateHero,
        updateBlessings,
        updateCountdown,
        updateLocations,
        updateFinal,
        updateSocial,
        updateMusic,
        updateStorySettings,
        updateEventsSettings,
        updateGallerySettings,
        updateFamilySettings,
        updateWarmRegards,
        updateReelsSettings,
        updateRsvpSettings,
        saveSiteData,
        addStoryMilestone,
        updateStoryMilestone,
        deleteStoryMilestone,
        reorderStoryMilestones,
        addEvent,
        updateEvent,
        deleteEvent,
        addPhoto,
        updatePhoto,
        deletePhoto,
        updateFamilyMember,
        addFamilyMember,
        deleteFamilyMember,
        addReel,
        updateReel,
        deleteReel,
        refreshRsvps,
        deleteRsvp,
        exportRsvpsCsv,
        cloudSyncStatus,
        cloudErrorDetails,
        retryCloudSync,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useWeddingCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useWeddingCms must be used within a CmsProvider');
  }
  return context;
};
