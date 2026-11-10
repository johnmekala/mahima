export interface CoupleInfo {
  groomName: string;
  groomFullName: string;
  brideName: string;
  brideFullName: string;
  weddingDate: string; // ISO date string or formatted
  weddingDateFormatted: string;
  weddingTime: string;
  locationCity: string;
  tagline: string;
  themeVerse: {
    verse: string;
    reference: string;
  };
  sectionTitle?: string;
  sectionSubtitle?: string;
  brideTitle?: string;
  brideBio?: string;
  brideQualification?: string;
  brideParents?: string;
  bridePhotoUrl?: string;
  brideVerse?: string;
  groomTitle?: string;
  groomBio?: string;
  groomQualification?: string;
  groomParents?: string;
  groomPhotoUrl?: string;
  groomVerse?: string;
}

export interface StoryMilestone {
  id: string;
  phase: string;
  title: string;
  date: string;
  description: string;
  verse?: string;
  image: string;
}

export interface WeddingEvent {
  id: string;
  type: 'haldi' | 'ceremony' | 'reception' | string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  attire: string;
  description: string;
  googleMapsUrl: string;
  embedMapQuery: string;
  highlights: string[];
  imageUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'ceremony' | 'engagement' | 'candid';
  imageUrl: string;
  thumbnailUrl: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface FamilyMember {
  role: string;
  title: string;
  names: string[];
  blessingMessage: string;
  familySide: 'groom' | 'bride';
}

export interface InstagramReel {
  id: string;
  title: string;
  views: string;
  likes: string;
  url: string;
  thumbnail: string;
  caption: string;
}

export interface RsvpSubmission {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  attendance: 'accept' | 'decline';
  guestCount: number;
  eventsAttending: string[];
  dietaryRequirements?: string;
  blessingMessage?: string;
  submittedAt: string;
}

