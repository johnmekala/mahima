import type {
  CoupleInfo,
  StoryMilestone,
  WeddingEvent,
  GalleryPhoto,
  FamilyMember,
  InstagramReel,
} from './wedding';

export interface EnvelopeSettings {
  headerText: string;
  subHeaderText: string;
  sealBorderText: string;
  buttonText: string;
  subNoticeText: string;
  churchBgUrl: string;
  bgBlurIntensity: string;
  topLeftBadgeText?: string;
  bottomRightBadgeText?: string;
  cardHonorText?: string;
}

export interface HeroSettings {
  divineCallingText: string;
  tagline: string;
  gettingMarriedText: string;
  backgroundUrl: string;
  churchNameShort: string;
  eventsButtonText: string;
  rsvpButtonText: string;
  overlayOpacity?: number;
}

export interface BlessingsSettings {
  sectionTitle: string;
  sectionSubtitle: string;
  mainVerse: string;
  mainVerseRef: string;
  secondaryVerse: string;
  secondaryVerseRef: string;
  prayerTitle: string;
  prayerText: string;
}

export interface StorySettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

export interface CountdownSettings {
  sectionTitle: string;
  sectionSubtitle: string;
  scriptureVerse: string;
  scriptureRef: string;
  googleCalendarTitle: string;
  googleCalendarDescription: string;
  calendarLocation: string;
}

export interface EventsSettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

export interface GallerySettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

export interface FamilySettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  proverbVerse?: string;
}

export interface WarmRegardsSettings {
  sectionSubtitle?: string;
  sectionTitle?: string;
  brideFamilyTitle?: string;
  parentsNames?: string;
  parentsRelation?: string;
  invitationQuote?: string;
  familyMembersList?: string;
  scriptureVerse?: string;
  footerNote?: string;
}

export interface ReelsSettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
}

export interface RsvpSettings {
  sectionTitle?: string;
  sectionSubtitle?: string;
  deadlineNotice?: string;
}

export interface LocationSettings {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription?: string;
  churchParkingNote: string;
  churchTransitNote: string;
  churchEtiquetteNote: string;
  receptionParkingNote: string;
  receptionTransitNote: string;
  receptionPhotoNote: string;
}

export interface FinalSettings {
  sectionTitle: string;
  tagline: string;
  closingPhotoUrl: string;
  benedictionVerse: string;
  benedictionRef: string;
  footerNote: string;
}

export interface SocialSettings {
  weddingHashtag: string;
  instagramHandle?: string;
}

export interface MusicSettings {
  trackTitle: string;
  customAudioUrl?: string;
  useSyntheticMelody: boolean;
  autoPlayAfterEnvelope: boolean;
}

export interface WeddingSiteData {
  couple: CoupleInfo;
  envelope: EnvelopeSettings;
  hero: HeroSettings;
  blessings: BlessingsSettings;
  storySettings?: StorySettings;
  story: StoryMilestone[];
  countdown: CountdownSettings;
  eventsSettings?: EventsSettings;
  events: WeddingEvent[];
  gallerySettings?: GallerySettings;
  gallery: GalleryPhoto[];
  familySettings?: FamilySettings;
  family: FamilyMember[];
  warmRegards?: WarmRegardsSettings;
  reelsSettings?: ReelsSettings;
  reels: InstagramReel[];
  rsvpSettings?: RsvpSettings;
  locations: LocationSettings;
  final: FinalSettings;
  social: SocialSettings;
  music: MusicSettings;
}

