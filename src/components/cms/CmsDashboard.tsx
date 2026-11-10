import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Mail,
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  Image,
  Heart,
  MapPin,
  CheckCircle2,
  Music,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  KeyRound,
  Eye,
  Sliders,
  Save,
  Check,
  Loader2,
} from 'lucide-react';
import { useWeddingCms } from '../../context/CmsContext';
import { ChristianCross } from '../common/FloralDecor';
import { CloudinaryUploadButton } from '../common/CloudinaryUploadButton';
import { getCloudinaryThumbnail, CLOUDINARY_CONFIG } from '../../services/cloudinary';

interface SectionSaveFooterProps {
  sectionTitle: string;
  onSave: () => void;
  isSaving: boolean;
  isSaved: boolean;
}

const SectionSaveFooter: React.FC<SectionSaveFooterProps> = ({
  sectionTitle,
  onSave,
  isSaving,
  isSaved,
}) => (
  <div className="sticky bottom-0 bg-[#FDFAF7]/95 backdrop-blur-md pt-5 pb-3 border-t border-[#D8D0C9] flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 z-30">
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#8EAFA0] animate-ping" />
      <span className="text-xs font-serif text-[#66564D] italic">
        Real-time sync to Firebase Cloud &amp; Local storage
      </span>
    </div>

    <button
      type="button"
      onClick={onSave}
      disabled={isSaving}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-serif tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer ${
        isSaved
          ? 'bg-[#597B6B] text-white ring-2 ring-[#8EAFA0]'
          : 'bg-[#597B6B] text-white hover:bg-[#435e51]'
      }`}
    >
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>Saving {sectionTitle}...</span>
        </>
      ) : isSaved ? (
        <>
          <Check className="h-4 w-4 text-white" />
          <span>Saved to Cloud! ✓</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4 text-white" />
          <span>Save Changes</span>
        </>
      )}
    </button>
  </div>
);

type CmsTab =
  | 'overview'
  | 'couple'
  | 'envelope'
  | 'hero'
  | 'blessings'
  | 'story'
  | 'countdown'
  | 'events'
  | 'gallery'
  | 'family'
  | 'warm-regards'
  | 'reels'
  | 'locations'
  | 'final'
  | 'music'
  | 'rsvps'
  | 'system';

export const CmsDashboard: React.FC = () => {
  const {
    siteData,
    isCmsOpen,
    closeCms,
    logout,
    rsvps,
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
    addEvent,
    updateEvent,
    deleteEvent,
    addPhoto,
    deletePhoto,
    updateFamilyMember,
    addReel,
    deleteReel,
    deleteRsvp,
    exportRsvpsCsv,
    resetToDefaults,
    exportJson,
    importJson,
    changePin,
  } = useWeddingCms();

  const [activeTab, setActiveTab] = useState<CmsTab>('overview');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // RSVP Search/Filter state
  const [rsvpSearch, setRsvpSearch] = useState('');
  const [rsvpFilter, setRsvpFilter] = useState<'all' | 'accept' | 'decline'>('all');

  // New item modal states
  const [showAddStory, setShowAddStory] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showAddReel, setShowAddReel] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [newStoryPhotoUrl, setNewStoryPhotoUrl] = useState('');
  const [newAddPhotoUrl, setNewAddPhotoUrl] = useState('');
  const [newReelThumbUrl, setNewReelThumbUrl] = useState('');

  // Explicit Section Save States
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  const handleSaveSection = async (sectionKey: string, sectionTitle: string) => {
    setSavingSection(sectionKey);
    const success = await saveSiteData();
    setSavingSection(null);
    if (success) {
      setSavedSection(sectionKey);
      triggerToast(`✓ ${sectionTitle} saved to Cloud & Local Storage!`);
      setTimeout(() => {
        setSavedSection((curr) => (curr === sectionKey ? null : curr));
      }, 3000);
    } else {
      triggerToast(`⚠️ Failed to save ${sectionTitle}`);
    }
  };

  const handleExitToWebsite = () => {
    closeCms();
    if (window.location.pathname.toLowerCase().replace(/\/+$/, '') === '/admin') {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleLogoutAdmin = () => {
    logout();
    if (window.location.pathname.toLowerCase().replace(/\/+$/, '') === '/admin') {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isDirectAdminUrl =
    typeof window !== 'undefined' &&
    (window.location.pathname.toLowerCase().replace(/\/+$/, '') === '/admin' ||
      window.location.hash.toLowerCase().replace(/\/+$/, '') === '#admin' ||
      window.location.hash.toLowerCase().replace(/\/+$/, '') === '#/admin');

  if (!isCmsOpen && !isDirectAdminUrl) return null;

  const triggerToast = (msg: string = 'Changes saved in real-time!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      (r.fullName || '').toLowerCase().includes(rsvpSearch.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(rsvpSearch.toLowerCase());
    const matchesAttendance = rsvpFilter === 'all' || r.attendance === rsvpFilter;
    return matchesSearch && matchesAttendance;
  });

  const totalGuestsAttending = rsvps
    .filter((r) => r.attendance === 'accept')
    .reduce((sum, r) => sum + (r.guestCount || 0), 0);

  const navItems: { id: CmsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview & Stats', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'couple', label: 'Couple & Date', icon: <Users className="h-4 w-4" /> },
    { id: 'envelope', label: '3D Envelope & Seal', icon: <Mail className="h-4 w-4" /> },
    { id: 'hero', label: 'Hero Section', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'blessings', label: 'Scripture & Prayer', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'story', label: 'Love Story Timeline', icon: <Clock className="h-4 w-4" /> },
    { id: 'countdown', label: 'Countdown & Cal', icon: <Calendar className="h-4 w-4" /> },
    { id: 'events', label: 'Wedding Events', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <Image className="h-4 w-4" /> },
    { id: 'family', label: 'Family Blessings', icon: <Heart className="h-4 w-4" /> },
    { id: 'warm-regards', label: 'Warm Regards (Bride)', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'locations', label: 'Locations & Maps', icon: <MapPin className="h-4 w-4" /> },
    { id: 'final', label: 'Benediction & Footer', icon: <Sliders className="h-4 w-4" /> },
    { id: 'music', label: 'Audio & Music', icon: <Music className="h-4 w-4" /> },
    { id: 'rsvps', label: `RSVP Manager (${rsvps.length})`, icon: <CheckCircle2 className="h-4 w-4 text-[#8EAFA0]" /> },
    { id: 'system', label: 'Backup & Security', icon: <KeyRound className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-[#43362F]/40 backdrop-blur-md overflow-hidden">
      {/* Save Notification Toast */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-[#597B6B] px-5 py-3 text-xs font-serif tracking-wider text-white shadow-xl"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{saveToast}</span>
        </motion.div>
      )}

      {/* Main CMS Container */}
      <div className="relative flex flex-col md:flex-row w-full h-full bg-[#FDFAF7] text-[#66564D] overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-full md:w-72 bg-[#F8F3EE] border-r border-[#D8D0C9] flex flex-col shrink-0 select-none">
          {/* Header */}
          <div className="p-5 border-b border-[#D8D0C9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ChristianCross size={20} className="text-[#8EAFA0]" />
              <div>
                <h2 className="font-serif text-lg font-medium text-[#43362F] leading-tight">
                  Wedding CMS
                </h2>
                <span className="font-serif text-[11px] text-[#A8978A] tracking-wider uppercase">
                  Admin Dashboard
                </span>
              </div>
            </div>

            <button
              onClick={handleExitToWebsite}
              className="p-1.5 rounded-full text-[#A8978A] hover:bg-[#EDE4DC] hover:text-[#43362F] transition-colors md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-serif tracking-wider transition-all text-left ${
                    isActive
                      ? 'bg-[#8EAFA0] text-white shadow-xs font-medium'
                      : 'text-[#66564D] hover:bg-[#EDE4DC]/60 hover:text-[#43362F]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#8EAFA0]'}>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer Controls */}
          <div className="p-4 border-t border-[#D8D0C9] space-y-2">
            <button
              onClick={handleExitToWebsite}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-[#DCE8E2] py-2 text-xs font-serif tracking-wider text-[#66564D] hover:border-[#BA8FA0] hover:text-[#43362F] transition-all shadow-xs"
            >
              <Eye className="h-3.5 w-3.5 text-[#8EAFA0]" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={handleLogoutAdmin}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-transparent py-2 text-xs font-serif tracking-wider text-rose-700/80 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out Admin</span>
            </button>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-1 overflow-y-auto flex flex-col bg-[#FDFAF7]">
          {/* Top Bar */}
          <header className="sticky top-0 z-10 bg-[#FDFAF7]/95 backdrop-blur-md px-6 py-4 border-b border-[#D8D0C9]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm tracking-widest uppercase text-[#A8978A]">
                Editing Section:
              </span>
              <h1 className="font-serif text-xl sm:text-2xl text-[#43362F] font-normal capitalize">
                {activeTab.replace(/([A-Z])/g, ' $1')}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] border border-[#BFD4CA] text-xs font-serif text-[#597B6B]">
                <span className="h-2 w-2 rounded-full bg-[#597B6B] animate-pulse" />
                <span>Firebase RTDB Synced</span>
              </span>

              <button
                onClick={handleExitToWebsite}
                className="hidden md:flex p-2 rounded-full text-[#A8978A] hover:bg-[#EDE4DC]/80 hover:text-[#43362F] transition-colors"
                title="Close CMS & Return to Website"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Tab Views */}
          <div className="flex-1 p-6 sm:p-8 max-w-5xl">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Couple Card Banner */}
                <div className="rounded-3xl bg-[#F8F3EE] border border-[#DCE8E2] p-6 sm:p-8 card-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#8EAFA0] font-medium block mb-1">
                      Holy Matrimony Portal
                    </span>
                    <h2 className="font-script text-4xl sm:text-5xl text-[#43362F]">
                      {siteData.couple.brideName} &amp; {siteData.couple.groomName}
                    </h2>
                    <p className="font-serif italic text-sm text-[#66564D] mt-1">
                      {siteData.couple.weddingDateFormatted} • {siteData.couple.locationCity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={closeCms}
                      className="inline-flex items-center gap-2 rounded-full bg-[#8EAFA0] px-5 py-2.5 text-xs font-serif tracking-wider text-white shadow-xs hover:bg-[#597B6B] transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview Live Website</span>
                    </button>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 text-center shadow-xs">
                    <span className="font-serif text-3xl sm:text-4xl text-[#43362F] font-medium block">
                      {rsvps.length}
                    </span>
                    <span className="font-serif text-xs uppercase tracking-wider text-[#A8978A] mt-1 block">
                      Total RSVPs
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#BFD4CA] p-5 text-center shadow-xs">
                    <span className="font-serif text-3xl sm:text-4xl text-[#597B6B] font-medium block">
                      {totalGuestsAttending}
                    </span>
                    <span className="font-serif text-xs uppercase tracking-wider text-[#597B6B] mt-1 block">
                      Confirmed Guests
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 text-center shadow-xs">
                    <span className="font-serif text-3xl sm:text-4xl text-[#43362F] font-medium block">
                      {siteData.story.length}
                    </span>
                    <span className="font-serif text-xs uppercase tracking-wider text-[#A8978A] mt-1 block">
                      Story Chapters
                    </span>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 text-center shadow-xs">
                    <span className="font-serif text-3xl sm:text-4xl text-[#43362F] font-medium block">
                      {siteData.gallery.length}
                    </span>
                    <span className="font-serif text-xs uppercase tracking-wider text-[#A8978A] mt-1 block">
                      Gallery Photos
                    </span>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div>
                  <h3 className="font-serif text-lg text-[#43362F] mb-4">
                    Quick Section Management
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setActiveTab('couple')}
                      className="p-4 rounded-2xl bg-white border border-[#D8D0C9] text-left hover:border-[#8EAFA0] transition-colors shadow-xs"
                    >
                      <Users className="h-5 w-5 text-[#8EAFA0] mb-2" />
                      <h4 className="font-serif text-base text-[#43362F] font-medium">Edit Couple &amp; Date</h4>
                      <p className="text-xs text-[#A8978A]">Names, date, time, and city</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('rsvps')}
                      className="p-4 rounded-2xl bg-white border border-[#D8D0C9] text-left hover:border-[#8EAFA0] transition-colors shadow-xs"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#8EAFA0] mb-2" />
                      <h4 className="font-serif text-base text-[#43362F] font-medium">View Guest RSVPs</h4>
                      <p className="text-xs text-[#A8978A]">Search, check count, export CSV</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="p-4 rounded-2xl bg-white border border-[#D8D0C9] text-left hover:border-[#8EAFA0] transition-colors shadow-xs"
                    >
                      <Image className="h-5 w-5 text-[#BA8FA0] mb-2" />
                      <h4 className="font-serif text-base text-[#43362F] font-medium">Manage Gallery</h4>
                      <p className="text-xs text-[#A8978A]">Add, replace, or remove photos</p>
                    </button>
                  </div>
                </div>

                {/* Cloudinary & Media Assets Status Card */}
                <div className="rounded-3xl bg-[#FAF6F2] border border-[#BFD4CA] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base text-[#43362F] font-medium">
                        Cloudinary Media & Assets Connected
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EE] border border-[#8EAFA0] text-[10px] font-serif uppercase tracking-wider text-[#597B6B] font-semibold">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-[#66564D] font-serif">
                      Cloud: <span className="font-semibold text-[#43362F]">{CLOUDINARY_CONFIG.cloudName}</span> • 
                      Key: <span className="font-mono text-[11px] text-[#597B6B]">{CLOUDINARY_CONFIG.apiKey}</span> • 
                      Folder: <code className="bg-white/80 px-1.5 py-0.5 rounded border border-[#EDE4DC] text-[11px] text-[#597B6B]">{CLOUDINARY_CONFIG.defaultFolder}</code>
                    </p>
                    <p className="text-[11px] text-[#A8978A] italic">
                      Direct signed browser upload active. All uploaded assets are securely delivered with automated WebP format and auto-quality compression.
                    </p>
                  </div>

                  <CloudinaryUploadButton
                    buttonText="Upload Photo Test"
                    onUploadSuccess={(url) => {
                      triggerToast(`Test upload succeeded! URL: ${url}`);
                    }}
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="All Website Settings"
                  onSave={() => handleSaveSection('overview', 'All Website Settings')}
                  isSaving={savingSection === 'overview'}
                  isSaved={savedSection === 'overview'}
                />
              </div>
            )}

            {/* 2. COUPLE & GENERAL TAB */}
            {activeTab === 'couple' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      1st Name (Bride Short Name)
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.brideName}
                      onChange={(e) => {
                        updateCouple({ brideName: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Bride Full Name (Formal)
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.brideFullName}
                      onChange={(e) => {
                        updateCouple({ brideFullName: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      2nd Name (Groom Short Name)
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.groomName}
                      onChange={(e) => {
                        updateCouple({ groomName: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Groom Full Name (Formal)
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.groomFullName}
                      onChange={(e) => {
                        updateCouple({ groomFullName: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Wedding Date (ISO string for countdown)
                    </label>
                    <input
                      type="datetime-local"
                      value={siteData.couple.weddingDate.substring(0, 16)}
                      onChange={(e) => {
                        updateCouple({ weddingDate: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Wedding Date (Formatted Display)
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.weddingDateFormatted}
                      onChange={(e) => {
                        updateCouple({ weddingDateFormatted: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Wedding Time Label
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.weddingTime}
                      onChange={(e) => {
                        updateCouple({ weddingTime: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      City &amp; Country
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.locationCity}
                      onChange={(e) => {
                        updateCouple({ locationCity: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Wedding Core Tagline
                  </label>
                  <input
                    type="text"
                    value={siteData.couple.tagline}
                    onChange={(e) => {
                      updateCouple({ tagline: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Covenant Theme Bible Verse
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.themeVerse?.verse || ''}
                      onChange={(e) => {
                        updateCouple({
                          themeVerse: {
                            verse: e.target.value,
                            reference: siteData.couple.themeVerse?.reference || 'Matthew 19:6',
                          },
                        });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Verse Reference
                    </label>
                    <input
                      type="text"
                      value={siteData.couple.themeVerse?.reference || ''}
                      onChange={(e) => {
                        updateCouple({
                          themeVerse: {
                            verse: siteData.couple.themeVerse?.verse || '',
                            reference: e.target.value,
                          },
                        });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Couples Section Customization */}
                <div className="pt-4 border-t border-[#EDE4DC] space-y-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-[#BA8FA0]" />
                    <h4 className="font-serif text-base text-[#43362F] font-medium">
                      Couples Section Display &amp; Profiles
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Couples Section Subtitle
                      </label>
                      <input
                        type="text"
                        value={siteData.couple.sectionSubtitle || 'United by God in Holy Love'}
                        onChange={(e) => {
                          updateCouple({ sectionSubtitle: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Couples Section Title
                      </label>
                      <input
                        type="text"
                        value={siteData.couple.sectionTitle || 'The Happy Couple'}
                        onChange={(e) => {
                          updateCouple({ sectionTitle: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 1. Bride Profile */}
                  <div className="rounded-2xl bg-[#FDF9FA] border border-[#E9D8DE] p-5 space-y-4 shadow-xs">
                    <span className="font-serif text-sm font-semibold text-[#8E546B] block">
                      1. Bride Profile ({siteData.couple.brideName})
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Bride Role / Title Tag
                        </label>
                        <input
                          type="text"
                          value={siteData.couple.brideTitle || 'The Bride'}
                          onChange={(e) => {
                            updateCouple({ brideTitle: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                            Bride Photo URL
                          </label>
                          <CloudinaryUploadButton
                            buttonText="Upload Bride Photo"
                            onUploadSuccess={(url) => {
                              updateCouple({ bridePhotoUrl: url });
                              triggerToast('Bride photo updated!');
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={siteData.couple.bridePhotoUrl || ''}
                          onChange={(e) => {
                            updateCouple({ bridePhotoUrl: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Bride Qualification(s)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. B.Tech, M.Tech (Computer Science)"
                          value={siteData.couple.brideQualification || ''}
                          onChange={(e) => {
                            updateCouple({ brideQualification: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Bride Parents Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Daughter of Mr. Samuel Joseph & Mrs. Mary Joseph"
                          value={siteData.couple.brideParents || ''}
                          onChange={(e) => {
                            updateCouple({ brideParents: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Bride One-Line Matter / Scripture
                      </label>
                      <input
                        type="text"
                        value={
                          siteData.couple.brideVerse ||
                          '“She is clothed with strength and dignity, and she laughs without fear of the future.” — Proverbs 31:25'
                        }
                        onChange={(e) => {
                          updateCouple({ brideVerse: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 2. Groom Profile */}
                  <div className="rounded-2xl bg-[#F7FAF8] border border-[#DCE8E2] p-5 space-y-4 shadow-xs">
                    <span className="font-serif text-sm font-semibold text-[#597B6B] block">
                      2. Groom Profile ({siteData.couple.groomName})
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Groom Role / Title Tag
                        </label>
                        <input
                          type="text"
                          value={siteData.couple.groomTitle || 'The Groom'}
                          onChange={(e) => {
                            updateCouple({ groomTitle: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                            Groom Photo URL
                          </label>
                          <CloudinaryUploadButton
                            buttonText="Upload Groom Photo"
                            onUploadSuccess={(url) => {
                              updateCouple({ groomPhotoUrl: url });
                              triggerToast('Groom photo updated!');
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={siteData.couple.groomPhotoUrl || ''}
                          onChange={(e) => {
                            updateCouple({ groomPhotoUrl: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Groom Qualification(s)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. B.E, M.S (Software Systems)"
                          value={siteData.couple.groomQualification || ''}
                          onChange={(e) => {
                            updateCouple({ groomQualification: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                          Groom Parents Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Son of Mr. David Prasad & Mrs. Elizabeth Prasad"
                          value={siteData.couple.groomParents || ''}
                          onChange={(e) => {
                            updateCouple({ groomParents: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Groom One-Line Matter / Scripture
                      </label>
                      <input
                        type="text"
                        value={
                          siteData.couple.groomVerse ||
                          '“As for me and my house, we will serve the Lord.” — Joshua 24:15'
                        }
                        onChange={(e) => {
                          updateCouple({ groomVerse: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <SectionSaveFooter
                  sectionTitle="Couple Information"
                  onSave={() => handleSaveSection('couple', 'Couple Information')}
                  isSaving={savingSection === 'couple'}
                  isSaved={savedSection === 'couple'}
                />
              </div>
            )}

            {/* 3. ENVELOPE TAB */}
            {activeTab === 'envelope' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Envelope Top Header
                  </label>
                  <input
                    type="text"
                    value={siteData.envelope.headerText}
                    onChange={(e) => {
                      updateEnvelope({ headerText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Wax Seal Latin / Scripture Border Lettering
                  </label>
                  <input
                    type="text"
                    value={siteData.envelope.sealBorderText}
                    onChange={(e) => {
                      updateEnvelope({ sealBorderText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Open Button Call To Action
                  </label>
                  <input
                    type="text"
                    value={siteData.envelope.buttonText}
                    onChange={(e) => {
                      updateEnvelope({ buttonText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                      Church Sanctuary Blurred Background URL
                    </label>
                    <CloudinaryUploadButton
                      buttonText="Upload Church Photo"
                      onUploadSuccess={(url) => {
                        updateEnvelope({ churchBgUrl: url });
                        triggerToast('Church background uploaded & updated!');
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={siteData.envelope.churchBgUrl}
                    onChange={(e) => {
                      updateEnvelope({ churchBgUrl: e.target.value });
                      triggerToast();
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                  {siteData.envelope.churchBgUrl && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-[#FDFAF7] rounded-xl border border-[#EDE4DC]">
                      <img
                        src={siteData.envelope.churchBgUrl}
                        alt="Church Preview"
                        className="h-12 w-20 rounded-lg object-cover border border-[#D8D0C9] shrink-0"
                      />
                      <span className="text-[11px] font-serif text-[#66564D] truncate">
                        {siteData.envelope.churchBgUrl}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Top-Left Sacred Emblem Text
                    </label>
                    <input
                      type="text"
                      value={siteData.envelope.topLeftBadgeText || 'In Christ We Are United'}
                      onChange={(e) => {
                        updateEnvelope({ topLeftBadgeText: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Bottom-Right Scripture Text
                    </label>
                    <input
                      type="text"
                      value={siteData.envelope.bottomRightBadgeText || 'Matthew 19:6'}
                      onChange={(e) => {
                        updateEnvelope({ bottomRightBadgeText: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Invitation Card Inner Honor Request Text
                  </label>
                  <input
                    type="text"
                    value={siteData.envelope.cardHonorText || 'Request the honor of your presence'}
                    onChange={(e) => {
                      updateEnvelope({ cardHonorText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Envelope Settings"
                  onSave={() => handleSaveSection('envelope', 'Envelope Settings')}
                  isSaving={savingSection === 'envelope'}
                  isSaved={savedSection === 'envelope'}
                />
              </div>
            )}

            {/* 4. HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Divine Calling Top Badge
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.divineCallingText}
                    onChange={(e) => {
                      updateHero({ divineCallingText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Hero Banner Quote / Tagline
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.tagline}
                    onChange={(e) => {
                      updateHero({ tagline: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    "ARE GETTING MARRIED" Label
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.gettingMarriedText}
                    onChange={(e) => {
                      updateHero({ gettingMarriedText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                      Hero Cinematic Background Image URL
                    </label>
                    <CloudinaryUploadButton
                      buttonText="Upload Hero Photo"
                      onUploadSuccess={(url) => {
                        updateHero({ backgroundUrl: url });
                        triggerToast('Hero background uploaded & updated!');
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={siteData.hero.backgroundUrl}
                    onChange={(e) => {
                      updateHero({ backgroundUrl: e.target.value });
                      triggerToast();
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                  {siteData.hero.backgroundUrl && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-[#FDFAF7] rounded-xl border border-[#EDE4DC]">
                      <img
                        src={siteData.hero.backgroundUrl}
                        alt="Hero Preview"
                        className="h-12 w-20 rounded-lg object-cover border border-[#D8D0C9] shrink-0"
                      />
                      <span className="text-[11px] font-serif text-[#66564D] truncate">
                        {siteData.hero.backgroundUrl}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hero Background Overlay Opacity Controller */}
                <div className="rounded-2xl bg-[#FDFAF7] border border-[#BFD4CA] p-5 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sliders className="h-4 w-4 text-[#597B6B]" />
                        <label className="text-xs font-serif uppercase tracking-wider text-[#43362F] font-semibold">
                          Hero Background Overlay Opacity
                        </label>
                      </div>
                      <p className="text-[11px] text-[#A8978A] font-serif mt-0.5">
                        Lower percentage = clearer, sharper background photo. Higher percentage = heavier pastel wash.
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#EBF2EE] border border-[#8EAFA0] text-xs font-serif font-bold text-[#395246] self-start sm:self-auto">
                      {typeof siteData.hero.overlayOpacity === 'number'
                        ? siteData.hero.overlayOpacity
                        : 35}% Opacity
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={
                        typeof siteData.hero.overlayOpacity === 'number'
                          ? siteData.hero.overlayOpacity
                          : 35
                      }
                      onChange={(e) => {
                        updateHero({ overlayOpacity: parseInt(e.target.value, 10) });
                        triggerToast(`Hero overlay set to ${e.target.value}%`);
                      }}
                      className="w-full h-2 bg-[#EDE4DC] rounded-lg appearance-none cursor-pointer accent-[#597B6B]"
                    />

                    <div className="flex justify-between text-[10px] font-serif text-[#A8978A]">
                      <span>0% (100% Clear Photo)</span>
                      <span>35% (Recommended)</span>
                      <span>70% (Muted)</span>
                      <span>100% (Solid Ivory)</span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-serif text-[#A8978A] mr-1">Quick Presets:</span>
                    {[
                      { label: 'Crystal Clear (15%)', val: 15 },
                      { label: 'Balanced (30%)', val: 30 },
                      { label: 'Recommended (35%)', val: 35 },
                      { label: 'Soft Tint (50%)', val: 50 },
                      { label: 'Pastel Wash (70%)', val: 70 },
                    ].map((p) => {
                      const isCurr = (siteData.hero.overlayOpacity ?? 35) === p.val;
                      return (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => {
                            updateHero({ overlayOpacity: p.val });
                            triggerToast(`Overlay set to ${p.val}%`);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                            isCurr
                              ? 'bg-[#597B6B] text-white shadow-xs font-medium'
                              : 'bg-white border border-[#D8D0C9] text-[#66564D] hover:border-[#8EAFA0] hover:bg-[#EBF2EE]'
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Live In-CMS Preview */}
                  {siteData.hero.backgroundUrl && (
                    <div className="pt-2">
                      <span className="text-[10px] font-serif uppercase tracking-wider text-[#A8978A] block mb-1.5">
                        Live In-CMS Overlay Preview
                      </span>
                      <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-[#D8D0C9]">
                        <img
                          src={siteData.hero.backgroundUrl}
                          alt="Hero Live Preview"
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-[#F8F3EE] transition-opacity duration-200 pointer-events-none"
                          style={{
                            opacity: (siteData.hero.overlayOpacity ?? 35) / 100,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-3 text-center pointer-events-none">
                          <p className="font-script text-2xl sm:text-3xl text-[#43362F] drop-shadow-sm font-semibold">
                            {siteData.couple.brideName} &amp; {siteData.couple.groomName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Button 1 Label
                    </label>
                    <input
                      type="text"
                      value={siteData.hero.eventsButtonText}
                      onChange={(e) => {
                        updateHero({ eventsButtonText: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Button 2 Label
                    </label>
                    <input
                      type="text"
                      value={siteData.hero.rsvpButtonText}
                      onChange={(e) => {
                        updateHero({ rsvpButtonText: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Church Name / Location Subtitle in Date Bar
                  </label>
                  <input
                    type="text"
                    value={siteData.hero.churchNameShort || ''}
                    onChange={(e) => {
                      updateHero({ churchNameShort: e.target.value });
                      triggerToast();
                    }}
                    placeholder="St. Mark's Cathedral, Bengaluru"
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Hero Section"
                  onSave={() => handleSaveSection('hero', 'Hero Section')}
                  isSaving={savingSection === 'hero'}
                  isSaved={savedSection === 'hero'}
                />
              </div>
            )}

            {/* 5. BLESSINGS & SCRIPTURE TAB */}
            {activeTab === 'blessings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.blessings.sectionSubtitle}
                      onChange={(e) => {
                        updateBlessings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.blessings.sectionTitle}
                      onChange={(e) => {
                        updateBlessings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Main Scripture Verse (e.g. Matthew 19:6)
                  </label>
                  <textarea
                    rows={3}
                    value={siteData.blessings.mainVerse}
                    onChange={(e) => {
                      updateBlessings({ mainVerse: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Main Scripture Reference
                  </label>
                  <input
                    type="text"
                    value={siteData.blessings.mainVerseRef}
                    onChange={(e) => {
                      updateBlessings({ mainVerseRef: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Secondary Scripture Verse (e.g. 1 Corinthians 13:4, 8)
                  </label>
                  <textarea
                    rows={2}
                    value={siteData.blessings.secondaryVerse}
                    onChange={(e) => {
                      updateBlessings({ secondaryVerse: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Secondary Scripture Reference
                  </label>
                  <input
                    type="text"
                    value={siteData.blessings.secondaryVerseRef}
                    onChange={(e) => {
                      updateBlessings({ secondaryVerseRef: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Couple's Prayer Title
                  </label>
                  <input
                    type="text"
                    value={siteData.blessings.prayerTitle}
                    onChange={(e) => {
                      updateBlessings({ prayerTitle: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Couple's Prayer of Dedication Text
                  </label>
                  <textarea
                    rows={4}
                    value={siteData.blessings.prayerText}
                    onChange={(e) => {
                      updateBlessings({ prayerText: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Scripture & Prayer"
                  onSave={() => handleSaveSection('blessings', 'Scripture & Prayer')}
                  isSaving={savingSection === 'blessings'}
                  isSaved={savedSection === 'blessings'}
                />
              </div>
            )}

            {/* 6. LOVE STORY TIMELINE TAB */}
            {activeTab === 'story' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Story Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.storySettings?.sectionSubtitle || 'Guided By Faith'}
                      onChange={(e) => {
                        updateStorySettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Story Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.storySettings?.sectionTitle || 'Our Love Story'}
                      onChange={(e) => {
                        updateStorySettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Story Section Intro Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      siteData.storySettings?.sectionDescription ||
                      'How the Lord wrote every chapter of our lives, weaving two paths into one eternal purpose.'
                    }
                    onChange={(e) => {
                      updateStorySettings({ sectionDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="font-serif italic text-xs text-[#A8978A]">
                    Manage individual chapters and photographs along the vertical timeline:
                  </p>
                  <button
                    onClick={() => setShowAddStory(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#8EAFA0] px-4 py-2 text-xs font-serif text-white hover:bg-[#597B6B] transition-colors shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {siteData.story.map((m, idx) => (
                    <div
                      key={m.id}
                      className="rounded-2xl bg-white border border-[#D8D0C9] p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EE] border border-[#BFD4CA] text-[11px] font-serif uppercase text-[#597B6B]">
                          Step {idx + 1}: {m.phase}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete milestone "${m.title}"?`)) {
                              deleteStoryMilestone(m.id);
                              triggerToast('Milestone deleted');
                            }
                          }}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete Milestone"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">
                            Phase Name
                          </label>
                          <input
                            type="text"
                            value={m.phase}
                            onChange={(e) => {
                              updateStoryMilestone(m.id, { phase: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => {
                              updateStoryMilestone(m.id, { title: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">
                            Date / Season
                          </label>
                          <input
                            type="text"
                            value={m.date}
                            onChange={(e) => {
                              updateStoryMilestone(m.id, { date: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">
                          Story Description
                        </label>
                        <textarea
                          rows={2}
                          value={m.description}
                          onChange={(e) => {
                            updateStoryMilestone(m.id, { description: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-lg border border-[#EDE4DC] p-2 text-xs text-[#43362F]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">
                            Scripture Reflection
                          </label>
                          <input
                            type="text"
                            value={m.verse || ''}
                            onChange={(e) => {
                              updateStoryMilestone(m.id, { verse: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-serif uppercase text-[#A8978A]">
                              Photo URL
                            </label>
                            <CloudinaryUploadButton
                              buttonText="Upload"
                              className="px-2.5 py-0.5 text-[10px]"
                              onUploadSuccess={(url) => {
                                updateStoryMilestone(m.id, { image: url });
                                triggerToast('Milestone photo uploaded!');
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            {m.image && (
                              <img
                                src={m.image}
                                alt={m.title}
                                className="h-7 w-7 rounded-md object-cover border border-[#D8D0C9] shrink-0"
                              />
                            )}
                            <input
                              type="text"
                              value={m.image}
                              onChange={(e) => {
                                updateStoryMilestone(m.id, { image: e.target.value });
                                triggerToast();
                              }}
                              className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Story Modal */}
                {showAddStory && (
                  <div className="p-5 rounded-2xl bg-[#EBF2EE] border border-[#8EAFA0] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-medium text-[#395246]">
                        Add New Story Milestone
                      </h4>
                      <CloudinaryUploadButton
                        buttonText="Upload Milestone Photo"
                        onUploadSuccess={(url) => {
                          setNewStoryPhotoUrl(url);
                          triggerToast('Photo uploaded to Cloudinary!');
                        }}
                      />
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const img = (formData.get('image') as string) || newStoryPhotoUrl;
                        if (!img) {
                          alert('Please provide a milestone photo URL or upload one with Cloudinary.');
                          return;
                        }
                        addStoryMilestone({
                          phase: formData.get('phase') as string,
                          title: formData.get('title') as string,
                          date: formData.get('date') as string,
                          description: formData.get('description') as string,
                          verse: formData.get('verse') as string,
                          image: img,
                        });
                        setShowAddStory(false);
                        setNewStoryPhotoUrl('');
                        triggerToast('New milestone added!');
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <input name="phase" required placeholder="Phase (e.g. In His Time)" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="title" required placeholder="Title" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="date" required placeholder="Date / Year" className="rounded-lg bg-white p-2 text-xs" />
                      </div>
                      <textarea name="description" required placeholder="Description of this sacred milestone..." rows={2} className="w-full rounded-lg bg-white p-2 text-xs" />
                      <div className="grid grid-cols-2 gap-3">
                        <input name="verse" placeholder="Scripture quote (optional)" className="rounded-lg bg-white p-2 text-xs" />
                        <input
                          name="image"
                          value={newStoryPhotoUrl}
                          onChange={(e) => setNewStoryPhotoUrl(e.target.value)}
                          placeholder="Photo URL (or upload via button above)"
                          className="rounded-lg bg-white p-2 text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="rounded-full bg-[#597B6B] px-4 py-1.5 text-xs text-white">Save</button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddStory(false);
                            setNewStoryPhotoUrl('');
                          }}
                          className="rounded-full bg-white px-4 py-1.5 text-xs text-[#66564D]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <SectionSaveFooter
                  sectionTitle="Love Story Timeline"
                  onSave={() => handleSaveSection('story', 'Love Story Timeline')}
                  isSaving={savingSection === 'story'}
                  isSaved={savedSection === 'story'}
                />
              </div>
            )}

            {/* COUNTDOWN & CALENDAR TAB */}
            {activeTab === 'countdown' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.countdown.sectionTitle}
                      onChange={(e) => {
                        updateCountdown({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.countdown.sectionSubtitle}
                      onChange={(e) => {
                        updateCountdown({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Scripture Reflection Verse
                    </label>
                    <input
                      type="text"
                      value={siteData.countdown.scriptureVerse}
                      onChange={(e) => {
                        updateCountdown({ scriptureVerse: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Verse Reference
                    </label>
                    <input
                      type="text"
                      value={siteData.countdown.scriptureRef}
                      onChange={(e) => {
                        updateCountdown({ scriptureRef: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Google Calendar Event Title
                  </label>
                  <input
                    type="text"
                    value={siteData.countdown.googleCalendarTitle}
                    onChange={(e) => {
                      updateCountdown({ googleCalendarTitle: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Calendar Event Description
                  </label>
                  <textarea
                    rows={2}
                    value={siteData.countdown.googleCalendarDescription}
                    onChange={(e) => {
                      updateCountdown({ googleCalendarDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Calendar Event Location
                  </label>
                  <input
                    type="text"
                    value={siteData.countdown.calendarLocation}
                    onChange={(e) => {
                      updateCountdown({ calendarLocation: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Countdown & Calendar"
                  onSave={() => handleSaveSection('countdown', 'Countdown & Calendar')}
                  isSaving={savingSection === 'countdown'}
                  isSaved={savedSection === 'countdown'}
                />
              </div>
            )}

            {/* 7. EVENTS TAB */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.eventsSettings?.sectionSubtitle || 'Celebration of Covenant'}
                      onChange={(e) => {
                        updateEventsSettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.eventsSettings?.sectionTitle || 'Wedding Events'}
                      onChange={(e) => {
                        updateEventsSettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Section Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      siteData.eventsSettings?.sectionDescription ||
                      'We cordially invite you to join us in prayer, thanksgiving, and fellowship as we celebrate our holy union.'
                    }
                    onChange={(e) => {
                      updateEventsSettings({ sectionDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="font-serif italic text-xs text-[#A8978A]">
                    Manage Holy Matrimony, Wedding Reception, and other sacred services:
                  </p>
                  <button
                    onClick={() => setShowAddEvent(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#8EAFA0] px-4 py-2 text-xs font-serif text-white hover:bg-[#597B6B] transition-colors shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Ceremony Event</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {siteData.events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-3xl bg-white border border-[#D8D0C9] p-6 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-[#EDE4DC] pb-3">
                        <div>
                          <span className="font-serif text-xs uppercase tracking-wider text-[#A8978A]">
                            {event.type}
                          </span>
                          <h4 className="font-serif text-2xl text-[#43362F] font-normal">
                            {event.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete event "${event.title}"?`)) {
                              deleteEvent(event.id);
                              triggerToast('Event deleted');
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Title</label>
                          <input
                            type="text"
                            value={event.title}
                            onChange={(e) => {
                              updateEvent(event.id, { title: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={event.subtitle}
                            onChange={(e) => {
                              updateEvent(event.id, { subtitle: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Date</label>
                          <input
                            type="text"
                            value={event.date}
                            onChange={(e) => {
                              updateEvent(event.id, { date: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Time</label>
                          <input
                            type="text"
                            value={event.time}
                            onChange={(e) => {
                              updateEvent(event.id, { time: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Venue Name</label>
                          <input
                            type="text"
                            value={event.venueName}
                            onChange={(e) => {
                              updateEvent(event.id, { venueName: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Dress Code / Attire</label>
                          <input
                            type="text"
                            value={event.attire}
                            onChange={(e) => {
                              updateEvent(event.id, { attire: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Full Venue Address</label>
                        <input
                          type="text"
                          value={event.address}
                          onChange={(e) => {
                            updateEvent(event.id, { address: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={event.description || ''}
                          onChange={(e) => {
                            updateEvent(event.id, { description: e.target.value });
                            triggerToast();
                          }}
                          className="w-full rounded-xl border border-[#EDE4DC] p-2.5 text-xs text-[#43362F]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-serif uppercase text-[#A8978A] block">Cover Image URL</label>
                            <CloudinaryUploadButton
                              buttonText="Upload Photo"
                              onUploadSuccess={(url) => {
                                updateEvent(event.id, { imageUrl: url });
                                triggerToast('Event photo updated!');
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/... or Cloudinary URL"
                            value={event.imageUrl || ''}
                            onChange={(e) => {
                              updateEvent(event.id, { imageUrl: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Google Maps Direct URL</label>
                          <input
                            type="text"
                            value={event.googleMapsUrl}
                            onChange={(e) => {
                              updateEvent(event.id, { googleMapsUrl: e.target.value });
                              triggerToast();
                            }}
                            className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                          />
                        </div>
                      </div>

                      {event.imageUrl && (
                        <div className="pt-2">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-24 w-40 object-cover rounded-xl border border-[#EDE4DC]"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {showAddEvent && (
                  <div className="p-5 rounded-2xl bg-[#EBF2EE] border border-[#8EAFA0] space-y-3">
                    <h4 className="font-serif text-sm font-medium text-[#395246]">Add New Wedding Event</h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        addEvent({
                          type: 'ceremony',
                          title: formData.get('title') as string,
                          subtitle: formData.get('subtitle') as string,
                          date: formData.get('date') as string,
                          time: formData.get('time') as string,
                          venueName: formData.get('venueName') as string,
                          address: formData.get('address') as string,
                          attire: formData.get('attire') as string,
                          description: formData.get('description') as string,
                          googleMapsUrl: formData.get('googleMapsUrl') as string,
                          embedMapQuery: formData.get('venueName') as string,
                          highlights: ['Sacred Service', 'Praise & Fellowship'],
                          imageUrl: (formData.get('imageUrl') as string) || '',
                        });
                        setShowAddEvent(false);
                        triggerToast('New event created!');
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input name="title" required placeholder="Event Title (e.g. Haldi)" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="subtitle" required placeholder="Subtitle" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="date" required placeholder="Date" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="time" required placeholder="Time" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="venueName" required placeholder="Venue Name" className="rounded-lg bg-white p-2 text-xs" />
                        <input name="attire" required placeholder="Attire" className="rounded-lg bg-white p-2 text-xs" />
                      </div>
                      <input name="imageUrl" placeholder="Cover Image URL (https://...)" className="w-full rounded-lg bg-white p-2 text-xs" />
                      <input name="address" required placeholder="Full Address" className="w-full rounded-lg bg-white p-2 text-xs" />
                      <input name="googleMapsUrl" required placeholder="Google Maps link" className="w-full rounded-lg bg-white p-2 text-xs" />
                      <textarea name="description" required placeholder="Description..." rows={2} className="w-full rounded-lg bg-white p-2 text-xs" />
                      <div className="flex gap-2">
                        <button type="submit" className="rounded-full bg-[#597B6B] px-4 py-1.5 text-xs text-white">Save Event</button>
                        <button type="button" onClick={() => setShowAddEvent(false)} className="rounded-full bg-white px-4 py-1.5 text-xs text-[#66564D]">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <SectionSaveFooter
                  sectionTitle="Wedding Events"
                  onSave={() => handleSaveSection('events', 'Wedding Events')}
                  isSaving={savingSection === 'events'}
                  isSaved={savedSection === 'events'}
                />
              </div>
            )}

            {/* 8. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.gallerySettings?.sectionSubtitle || 'Cherished Moments'}
                      onChange={(e) => {
                        updateGallerySettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.gallerySettings?.sectionTitle || 'Wedding Gallery'}
                      onChange={(e) => {
                        updateGallerySettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Section Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      siteData.gallerySettings?.sectionDescription ||
                      'Capturing the smiles, sacred prayers, and quiet grace leading up to our forever.'
                    }
                    onChange={(e) => {
                      updateGallerySettings({ sectionDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="font-serif italic text-xs text-[#A8978A]">
                    Add, edit, or delete photographs from the responsive masonry gallery:
                  </p>
                  <div className="flex items-center gap-2">
                    <CloudinaryUploadButton
                      buttonText="Quick Upload to Gallery"
                      className="bg-[#597B6B] text-white hover:bg-[#476356] border-none"
                      onUploadSuccess={(url) => {
                        addPhoto({
                          title: 'Wedding Moment',
                          category: 'ceremony',
                          imageUrl: url,
                          thumbnailUrl: getCloudinaryThumbnail(url, 600),
                          aspectRatio: 'portrait',
                        });
                        triggerToast('Photo uploaded directly to Cloudinary & added to Gallery!');
                      }}
                    />
                    <button
                      onClick={() => setShowAddPhoto(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#EBF2EE] border border-[#BFD4CA] px-3.5 py-2 text-xs font-serif text-[#395246] hover:bg-[#DCE8E2] transition-colors shadow-xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Custom Photo Form</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {siteData.gallery.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl bg-white border border-[#D8D0C9] overflow-hidden shadow-xs flex flex-col group"
                    >
                      <div className="relative h-44 w-full bg-stone-100">
                        <img src={p.thumbnailUrl} alt={p.title} className="h-full w-full object-cover" />
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete photo "${p.title}"?`)) {
                              deletePhoto(p.id);
                              triggerToast('Photo deleted');
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 shadow-xs transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <span className="absolute bottom-2 left-2 rounded-md bg-black/50 backdrop-blur-xs px-2 py-0.5 text-[10px] text-white capitalize">
                          {p.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="font-serif text-sm text-[#43362F] font-medium truncate">{p.title}</p>
                        <p className="text-[10px] text-[#A8978A] truncate mt-0.5">{p.imageUrl}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {showAddPhoto && (
                  <div className="p-5 rounded-2xl bg-[#EBF2EE] border border-[#8EAFA0] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-medium text-[#395246]">Add New Photo</h4>
                      <CloudinaryUploadButton
                        buttonText="Upload to Cloudinary"
                        onUploadSuccess={(url) => {
                          setNewAddPhotoUrl(url);
                          triggerToast('Image uploaded! You can now save.');
                        }}
                      />
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const url = (formData.get('url') as string) || newAddPhotoUrl;
                        if (!url) {
                          alert('Please provide an image URL or upload one with Cloudinary.');
                          return;
                        }
                        addPhoto({
                          title: (formData.get('title') as string) || 'Wedding Memory',
                          category: (formData.get('category') as any) || 'ceremony',
                          imageUrl: url,
                          thumbnailUrl: getCloudinaryThumbnail(url, 600),
                          aspectRatio: 'portrait',
                        });
                        setShowAddPhoto(false);
                        setNewAddPhotoUrl('');
                        triggerToast('Photo added to gallery!');
                      }}
                      className="space-y-3"
                    >
                      <input name="title" required placeholder="Photo Caption / Title" className="w-full rounded-lg bg-white p-2 text-xs text-[#43362F]" />
                      <div className="grid grid-cols-2 gap-3">
                        <select name="category" className="rounded-lg bg-white p-2 text-xs text-[#43362F]">
                          <option value="ceremony">Ceremony &amp; Church</option>
                          <option value="engagement">Engagement</option>
                          <option value="candid">Candid Joy</option>
                        </select>
                        <input
                          name="url"
                          value={newAddPhotoUrl}
                          onChange={(e) => setNewAddPhotoUrl(e.target.value)}
                          placeholder="Image URL or upload via button above"
                          className="rounded-lg bg-white p-2 text-xs text-[#43362F]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="rounded-full bg-[#597B6B] px-4 py-1.5 text-xs text-white">Save Photo</button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddPhoto(false);
                            setNewAddPhotoUrl('');
                          }}
                          className="rounded-full bg-white px-4 py-1.5 text-xs text-[#66564D]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <SectionSaveFooter
                  sectionTitle="Photo Gallery"
                  onSave={() => handleSaveSection('gallery', 'Photo Gallery')}
                  isSaving={savingSection === 'gallery'}
                  isSaved={savedSection === 'gallery'}
                />
              </div>
            )}

            {/* 9. FAMILY TAB */}
            {activeTab === 'family' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.familySettings?.sectionSubtitle || 'Honoring Our Heritage'}
                      onChange={(e) => {
                        updateFamilySettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.familySettings?.sectionTitle || 'Family Blessings'}
                      onChange={(e) => {
                        updateFamilySettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Proverb Scripture Quote
                  </label>
                  <input
                    type="text"
                    value={
                      siteData.familySettings?.proverbVerse ||
                      '“Children’s children are a crown to the aged, and parents are the pride of their children.” — Proverbs 17:6'
                    }
                    onChange={(e) => {
                      updateFamilySettings({ proverbVerse: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <p className="font-serif italic text-xs text-[#A8978A] mb-3">
                    Edit names and heartfelt blessings from parents:
                  </p>
                </div>

                {siteData.family.map((f, idx) => (
                  <div key={idx} className="rounded-2xl bg-white border border-[#D8D0C9] p-5 shadow-xs space-y-3">
                    <span className="font-serif text-xs uppercase tracking-wider text-[#8EAFA0] font-medium block">
                      {f.role} ({f.familySide === 'groom' ? "Groom's Family" : "Bride's Family"})
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Father's Name</label>
                        <input
                          type="text"
                          value={f.names[0] || ''}
                          onChange={(e) => {
                            const newNames = [e.target.value, f.names[1] || ''];
                            updateFamilyMember(idx, { names: newNames });
                            triggerToast();
                          }}
                          className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Mother's Name</label>
                        <input
                          type="text"
                          value={f.names[1] || ''}
                          onChange={(e) => {
                            const newNames = [f.names[0] || '', e.target.value];
                            updateFamilyMember(idx, { names: newNames });
                            triggerToast();
                          }}
                          className="w-full rounded-lg border border-[#EDE4DC] px-3 py-1.5 text-xs text-[#43362F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Heartfelt Parental Blessing Message</label>
                      <textarea
                        rows={3}
                        value={f.blessingMessage}
                        onChange={(e) => {
                          updateFamilyMember(idx, { blessingMessage: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-lg border border-[#EDE4DC] p-2 text-xs text-[#43362F]"
                      />
                    </div>
                  </div>
                ))}

                <SectionSaveFooter
                  sectionTitle="Family Blessings"
                  onSave={() => handleSaveSection('family', 'Family Blessings')}
                  isSaving={savingSection === 'family'}
                  isSaved={savedSection === 'family'}
                />
              </div>
            )}

            {/* WARM REGARDS (BRIDE FAMILY INVITATION) TAB */}
            {activeTab === 'warm-regards' && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-[#FDF9FA] border border-[#E9D8DE] p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-[#BA8FA0]" />
                    <h3 className="font-serif text-base text-[#43362F] font-semibold">
                      Warm Regards &amp; Bride's Family Invitation
                    </h3>
                  </div>
                  <p className="text-xs text-[#66564D] font-serif">
                    Customize the cordial invitation, bride's parents names, family members &amp; well-wishers, and quotes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.warmRegards?.sectionSubtitle || 'Cordial Invitation'}
                      onChange={(e) => {
                        updateWarmRegards({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.warmRegards?.sectionTitle || 'With Warm Regards'}
                      onChange={(e) => {
                        updateWarmRegards({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Bride's Family Badge / Ribbon Title
                    </label>
                    <input
                      type="text"
                      value={siteData.warmRegards?.brideFamilyTitle || "Invited by the Bride's Family"}
                      onChange={(e) => {
                        updateWarmRegards({ brideFamilyTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      City / Warm Welcoming Note
                    </label>
                    <input
                      type="text"
                      value={siteData.warmRegards?.footerNote || 'Warmly welcoming you from Bengaluru, Karnataka'}
                      onChange={(e) => {
                        updateWarmRegards({ footerNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 space-y-4 shadow-xs">
                  <span className="font-serif text-sm font-semibold text-[#43362F] block">
                    Bride's Parents Showcase
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Parents Names
                      </label>
                      <input
                        type="text"
                        value={siteData.warmRegards?.parentsNames || 'Mr. Samuel Joseph & Mrs. Mary Joseph'}
                        onChange={(e) => {
                          updateWarmRegards({ parentsNames: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Relation Subtitle
                      </label>
                      <input
                        type="text"
                        value={siteData.warmRegards?.parentsRelation || 'Loving Parents of Sunitha Grace'}
                        onChange={(e) => {
                          updateWarmRegards({ parentsRelation: e.target.value });
                          triggerToast();
                        }}
                        className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Heartfelt Invitation Quote (Welcoming Message)
                  </label>
                  <textarea
                    rows={3}
                    value={
                      siteData.warmRegards?.invitationQuote ||
                      '“With prayerful hearts and joyous praise to Almighty God, we cordially invite you and your family to witness and celebrate the Holy Matrimony of our beloved daughter Sunitha with Prasad. Your gracious presence and prayers will make our joy complete.”'
                    }
                    onChange={(e) => {
                      updateWarmRegards({ invitationQuote: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Invited By — Family Members, Siblings &amp; Well-Wishers (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={
                      siteData.warmRegards?.familyMembersList ||
                      'Alan Joseph (Brother)\nLate Mr. P. Joseph & Mrs. Annamma Joseph (Grandparents)\nWith Best Compliments from Uncles, Aunts, Cousins, and the entire Joseph Family & Well-wishers'
                    }
                    onChange={(e) => {
                      updateWarmRegards({ familyMembersList: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none font-mono"
                    placeholder="Enter each family member or group on a new line"
                  />
                  <p className="text-[11px] text-[#A8978A] mt-1 italic">
                    Each new line will display as a distinct, elegant family compliment card.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Sacred Scripture Verse / Quote
                  </label>
                  <input
                    type="text"
                    value={
                      siteData.warmRegards?.scriptureVerse ||
                      '“The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.” — Numbers 6:24-26'
                    }
                    onChange={(e) => {
                      updateWarmRegards({ scriptureVerse: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Warm Regards &amp; Bride Family Invitation"
                  onSave={() => handleSaveSection('warm-regards', 'Warm Regards & Bride Family Invitation')}
                  isSaving={savingSection === 'warm-regards'}
                  isSaved={savedSection === 'warm-regards'}
                />
              </div>
            )}

            {/* 10. REELS TAB */}
            {activeTab === 'reels' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.reelsSettings?.sectionSubtitle || 'Social Celebrations'}
                      onChange={(e) => {
                        updateReelsSettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.reelsSettings?.sectionTitle || 'Instagram Reels & Highlights'}
                      onChange={(e) => {
                        updateReelsSettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Section Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      siteData.reelsSettings?.sectionDescription ||
                      'Watch our pre-wedding teasers, engagement clips, and prayer gatherings on Instagram.'
                    }
                    onChange={(e) => {
                      updateReelsSettings({ sectionDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Official Wedding Hashtag
                    </label>
                    <input
                      type="text"
                      value={siteData.social.weddingHashtag}
                      onChange={(e) => {
                        updateSocial({ weddingHashtag: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Instagram Handle (Optional)
                    </label>
                    <input
                      type="text"
                      value={siteData.social.instagramHandle || ''}
                      onChange={(e) => {
                        updateSocial({ instagramHandle: e.target.value });
                        triggerToast();
                      }}
                      placeholder="@sunitha_and_prasad"
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <h4 className="font-serif text-sm text-[#43362F] font-medium">Reels Showcase Items</h4>
                  <button
                    onClick={() => setShowAddReel(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#8EAFA0] px-4 py-1.5 text-xs font-serif text-white hover:bg-[#597B6B]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Reel</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {siteData.reels.map((r) => (
                    <div key={r.id} className="rounded-xl bg-white border border-[#D8D0C9] p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={r.thumbnail} alt={r.title} className="h-12 w-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-serif text-sm text-[#43362F] font-medium">{r.title}</p>
                          <a href={r.url} target="_blank" rel="noreferrer" className="text-[11px] text-[#8EAFA0] hover:underline flex items-center gap-1">
                            <span>{r.url}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          deleteReel(r.id);
                          triggerToast('Reel deleted');
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {showAddReel && (
                  <div className="p-4 rounded-xl bg-[#EBF2EE] border border-[#8EAFA0] space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-serif text-xs font-medium text-[#395246]">New Instagram Reel</h5>
                      <CloudinaryUploadButton
                        buttonText="Upload Cover"
                        className="px-2.5 py-1 text-[11px]"
                        onUploadSuccess={(url) => {
                          setNewReelThumbUrl(url);
                          triggerToast('Reel cover uploaded!');
                        }}
                      />
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const fd = new FormData(form);
                        const thumb = (fd.get('thumbnail') as string) || newReelThumbUrl;
                        if (!thumb) {
                          alert('Please provide a reel thumbnail or upload one with Cloudinary.');
                          return;
                        }
                        addReel({
                          title: fd.get('title') as string,
                          url: fd.get('url') as string,
                          thumbnail: thumb,
                          views: '12K',
                          likes: '1.2K',
                          caption: fd.get('caption') as string,
                        });
                        setShowAddReel(false);
                        setNewReelThumbUrl('');
                        triggerToast('Reel added!');
                      }}
                      className="space-y-2"
                    >
                      <input name="title" required placeholder="Reel Title" className="w-full rounded bg-white p-2 text-xs text-[#43362F]" />
                      <input name="url" required placeholder="Instagram Reel URL" className="w-full rounded bg-white p-2 text-xs text-[#43362F]" />
                      <input
                        name="thumbnail"
                        value={newReelThumbUrl}
                        onChange={(e) => setNewReelThumbUrl(e.target.value)}
                        placeholder="Thumbnail Image URL (or upload via button above)"
                        className="w-full rounded bg-white p-2 text-xs text-[#43362F]"
                      />
                      <input name="caption" placeholder="Short caption" className="w-full rounded bg-white p-2 text-xs text-[#43362F]" />
                      <div className="flex gap-2 pt-1">
                        <button type="submit" className="rounded-full bg-[#597B6B] px-3 py-1 text-xs text-white">Save</button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddReel(false);
                            setNewReelThumbUrl('');
                          }}
                          className="rounded-full bg-white px-3 py-1 text-xs text-[#66564D]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <SectionSaveFooter
                  sectionTitle="Reels & Social"
                  onSave={() => handleSaveSection('reels', 'Reels & Social')}
                  isSaving={savingSection === 'reels'}
                  isSaved={savedSection === 'reels'}
                />
              </div>
            )}

            {/* LOCATIONS & LOGISTICS TAB */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.locations.sectionSubtitle || 'Getting There'}
                      onChange={(e) => {
                        updateLocations({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.locations.sectionTitle || 'Wedding Locations & Directions'}
                      onChange={(e) => {
                        updateLocations({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Section Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      siteData.locations.sectionDescription ||
                      'Find your way to the sacred church ceremony and celebratory evening reception.'
                    }
                    onChange={(e) => {
                      updateLocations({ sectionDescription: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 shadow-xs space-y-4">
                  <h4 className="font-serif text-base text-[#43362F] font-medium">Church Ceremony Logistics</h4>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Parking Instructions</label>
                    <input
                      type="text"
                      value={siteData.locations.churchParkingNote}
                      onChange={(e) => {
                        updateLocations({ churchParkingNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Transit / Metro Instructions</label>
                    <input
                      type="text"
                      value={siteData.locations.churchTransitNote}
                      onChange={(e) => {
                        updateLocations({ churchTransitNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Cathedral Etiquette Instructions</label>
                    <input
                      type="text"
                      value={siteData.locations.churchEtiquetteNote}
                      onChange={(e) => {
                        updateLocations({ churchEtiquetteNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#D8D0C9] p-5 shadow-xs space-y-4">
                  <h4 className="font-serif text-base text-[#43362F] font-medium">Reception Pavilion Logistics</h4>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Valet / Parking Instructions</label>
                    <input
                      type="text"
                      value={siteData.locations.receptionParkingNote}
                      onChange={(e) => {
                        updateLocations({ receptionParkingNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Cab / Ride Drop Instructions</label>
                    <input
                      type="text"
                      value={siteData.locations.receptionTransitNote}
                      onChange={(e) => {
                        updateLocations({ receptionTransitNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-serif uppercase text-[#A8978A] block mb-1">Photography &amp; Social Sharing Advice</label>
                    <input
                      type="text"
                      value={siteData.locations.receptionPhotoNote}
                      onChange={(e) => {
                        updateLocations({ receptionPhotoNote: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#EDE4DC] px-3.5 py-2 text-xs text-[#43362F]"
                    />
                  </div>
                </div>

                <SectionSaveFooter
                  sectionTitle="Locations & Logistics"
                  onSave={() => handleSaveSection('locations', 'Locations & Logistics')}
                  isSaving={savingSection === 'locations'}
                  isSaved={savedSection === 'locations'}
                />
              </div>
            )}

            {/* FINAL SECTION & BENEDICTION TAB */}
            {activeTab === 'final' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Closing Tagline
                  </label>
                  <input
                    type="text"
                    value={siteData.final.tagline}
                    onChange={(e) => {
                      updateFinal({ tagline: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Final Section Headline
                  </label>
                  <input
                    type="text"
                    value={siteData.final.sectionTitle}
                    onChange={(e) => {
                      updateFinal({ sectionTitle: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                      Closing Couple Portrait Image URL
                    </label>
                    <CloudinaryUploadButton
                      buttonText="Upload Couple Portrait"
                      onUploadSuccess={(url) => {
                        updateFinal({ closingPhotoUrl: url });
                        triggerToast('Closing portrait uploaded & updated!');
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={siteData.final.closingPhotoUrl}
                    onChange={(e) => {
                      updateFinal({ closingPhotoUrl: e.target.value });
                      triggerToast();
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                  {siteData.final.closingPhotoUrl && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-[#FDFAF7] rounded-xl border border-[#EDE4DC]">
                      <img
                        src={siteData.final.closingPhotoUrl}
                        alt="Closing Portrait"
                        className="h-12 w-20 rounded-lg object-cover border border-[#D8D0C9] shrink-0"
                      />
                      <span className="text-[11px] font-serif text-[#66564D] truncate">
                        {siteData.final.closingPhotoUrl}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Priestly Benediction Scripture (Numbers 6:24-26)
                  </label>
                  <textarea
                    rows={3}
                    value={siteData.final.benedictionVerse}
                    onChange={(e) => {
                      updateFinal({ benedictionVerse: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white p-3 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Benediction Reference
                  </label>
                  <input
                    type="text"
                    value={siteData.final.benedictionRef}
                    onChange={(e) => {
                      updateFinal({ benedictionRef: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Footer Note
                  </label>
                  <input
                    type="text"
                    value={siteData.final.footerNote}
                    onChange={(e) => {
                      updateFinal({ footerNote: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <SectionSaveFooter
                  sectionTitle="Final Benediction"
                  onSave={() => handleSaveSection('final', 'Final Benediction')}
                  isSaving={savingSection === 'final'}
                  isSaved={savedSection === 'final'}
                />
              </div>
            )}

            {/* MUSIC & AUDIO TAB */}
            {activeTab === 'music' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Audio Track Title
                  </label>
                  <input
                    type="text"
                    value={siteData.music.trackTitle}
                    onChange={(e) => {
                      updateMusic({ trackTitle: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                      Custom Audio Stream / MP3 URL (Optional)
                    </label>
                    <CloudinaryUploadButton
                      buttonText="Upload Audio Track"
                      accept="audio/*"
                      resourceType="auto"
                      onUploadSuccess={(url) => {
                        updateMusic({ customAudioUrl: url });
                        triggerToast('Audio track uploaded & set!');
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com/wedding-hymn.mp3"
                    value={siteData.music.customAudioUrl || ''}
                    onChange={(e) => {
                      updateMusic({ customAudioUrl: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F]"
                  />
                  <p className="text-[11px] text-[#A8978A] mt-1">
                    Upload an MP3/WAV file directly to Cloudinary or leave blank to use the built-in, peaceful romantic Web Audio synth melody.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="autoPlayCheck"
                    checked={siteData.music.autoPlayAfterEnvelope}
                    onChange={(e) => {
                      updateMusic({ autoPlayAfterEnvelope: e.target.checked });
                      triggerToast();
                    }}
                    className="h-4 w-4 rounded border-[#D8D0C9] text-[#8EAFA0] focus:ring-[#8EAFA0]"
                  />
                  <label htmlFor="autoPlayCheck" className="text-xs font-serif text-[#43362F]">
                    Auto-start peaceful music when user opens the invitation envelope
                  </label>
                </div>

                {/* In-CMS Live Audio Test Widget */}
                {siteData.music.customAudioUrl && (
                  <div className="rounded-2xl bg-[#FDFAF7] border border-[#BFD4CA] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-[#EBF2EE] text-[#597B6B] shrink-0">
                        <Music className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-serif text-sm font-semibold text-[#43362F] block">
                          Preview Active Audio Track
                        </span>
                        <p className="text-[11px] text-[#A8978A] truncate max-w-xs font-mono">
                          {siteData.music.trackTitle} • {siteData.music.customAudioUrl}
                        </p>
                      </div>
                    </div>

                    <audio
                      controls
                      src={siteData.music.customAudioUrl}
                      className="h-9 w-full sm:w-64"
                    />
                  </div>
                )}

                <SectionSaveFooter
                  sectionTitle="Audio & Music Settings"
                  onSave={() => handleSaveSection('music', 'Audio & Music Settings')}
                  isSaving={savingSection === 'music'}
                  isSaved={savedSection === 'music'}
                />
              </div>
            )}

            {/* 11. LIVE RSVP MANAGER TAB */}
            {activeTab === 'rsvps' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      RSVP Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteData.rsvpSettings?.sectionSubtitle || 'Celebrate With Us'}
                      onChange={(e) => {
                        updateRsvpSettings({ sectionSubtitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                      RSVP Section Title
                    </label>
                    <input
                      type="text"
                      value={siteData.rsvpSettings?.sectionTitle || 'Wedding RSVP'}
                      onChange={(e) => {
                        updateRsvpSettings({ sectionTitle: e.target.value });
                        triggerToast();
                      }}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-1.5">
                    RSVP Response Deadline Notice Text
                  </label>
                  <input
                    type="text"
                    value={
                      siteData.rsvpSettings?.deadlineNotice ||
                      'Kindly respond by October 25, 2026. Your presence and prayers mean the world to us.'
                    }
                    onChange={(e) => {
                      updateRsvpSettings({ deadlineNotice: e.target.value });
                      triggerToast();
                    }}
                    className="w-full rounded-xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none"
                  />
                </div>

                {/* Search, Filter, Export Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
                    <input
                      type="text"
                      placeholder="Search guest name or email..."
                      value={rsvpSearch}
                      onChange={(e) => setRsvpSearch(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-white pl-10 pr-4 py-2 text-xs text-[#43362F] focus:outline-none focus:border-[#8EAFA0]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={rsvpFilter}
                      onChange={(e) => setRsvpFilter(e.target.value as any)}
                      className="rounded-xl border border-[#D8D0C9] bg-white px-3 py-2 text-xs text-[#43362F]"
                    >
                      <option value="all">All Responses ({rsvps.length})</option>
                      <option value="accept">Joyfully Accepted</option>
                      <option value="decline">Regretfully Declined</option>
                    </select>

                    <button
                      onClick={exportRsvpsCsv}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#8EAFA0] px-4 py-2 text-xs font-serif text-white hover:bg-[#597B6B] shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="rounded-2xl bg-white border border-[#D8D0C9] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#66564D]">
                      <thead className="bg-[#F8F3EE] font-serif uppercase tracking-wider text-[11px] text-[#A8978A] border-b border-[#D8D0C9]">
                        <tr>
                          <th className="p-3.5">Guest Name</th>
                          <th className="p-3.5">Attendance</th>
                          <th className="p-3.5">Party Size</th>
                          <th className="p-3.5">Contact</th>
                          <th className="p-3.5">Blessing</th>
                          <th className="p-3.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EDE4DC]">
                        {filteredRsvps.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-[#A8978A] font-serif italic">
                              No RSVP submissions match your query.
                            </td>
                          </tr>
                        ) : (
                          filteredRsvps.map((r) => (
                            <tr key={r.id || r.email} className="hover:bg-[#FDFAF7] transition-colors">
                              <td className="p-3.5 font-medium text-[#43362F] font-serif text-sm">
                                {r.fullName}
                              </td>
                              <td className="p-3.5">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-serif uppercase ${
                                    r.attendance === 'accept'
                                      ? 'bg-[#EBF2EE] text-[#597B6B] border border-[#BFD4CA]'
                                      : 'bg-[#F8F2F5] text-[#8E546B] border border-[#D7BAC5]'
                                  }`}
                                >
                                  {r.attendance === 'accept' ? 'Attending' : 'Declined'}
                                </span>
                              </td>
                              <td className="p-3.5">{r.attendance === 'accept' ? `${r.guestCount} Guest(s)` : '—'}</td>
                              <td className="p-3.5">
                                <span className="block">{r.email}</span>
                                {r.phone && <span className="text-[10px] text-[#A8978A]">{r.phone}</span>}
                              </td>
                              <td className="p-3.5 max-w-xs truncate font-serif italic">
                                {r.blessingMessage ? `"${r.blessingMessage}"` : '—'}
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => {
                                    if (r.id && window.confirm(`Delete RSVP for ${r.fullName}?`)) {
                                      deleteRsvp(r.id);
                                      triggerToast('RSVP removed');
                                    }
                                  }}
                                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-md"
                                  title="Delete RSVP"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <SectionSaveFooter
                  sectionTitle="RSVP Configuration"
                  onSave={() => handleSaveSection('rsvps', 'RSVP Configuration')}
                  isSaving={savingSection === 'rsvps'}
                  isSaved={savedSection === 'rsvps'}
                />
              </div>
            )}

            {/* 12. BACKUP & SECURITY TAB */}
            {activeTab === 'system' && (
              <div className="space-y-8">
                {/* Change PIN Box */}
                <div className="rounded-2xl bg-white border border-[#D8D0C9] p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-[#8EAFA0]" />
                    <h4 className="font-serif text-lg text-[#43362F] font-medium">Change Admin Access PIN</h4>
                  </div>
                  <p className="text-xs text-[#A8978A]">
                    Set a new 4+ digit PIN used to unlock this CMS dashboard. Default PIN is <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700">grace2026</code>.
                  </p>
                  <div className="flex items-center gap-3 max-w-sm">
                    <input
                      type="password"
                      placeholder="Enter new 4+ digit PIN"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] px-4 py-2 text-xs text-[#43362F]"
                    />
                    <button
                      onClick={() => {
                        if (newPinInput.length >= 4) {
                          changePin(newPinInput);
                          setNewPinInput('');
                          triggerToast('Admin PIN updated successfully!');
                        } else {
                          alert('PIN must be at least 4 characters long.');
                        }
                      }}
                      className="rounded-xl bg-[#8EAFA0] px-4 py-2 text-xs font-serif text-white hover:bg-[#597B6B] shrink-0"
                    >
                      Update PIN
                    </button>
                  </div>
                </div>

                {/* Backup & Restore Box */}
                <div className="rounded-2xl bg-white border border-[#D8D0C9] p-6 shadow-xs space-y-4">
                  <h4 className="font-serif text-lg text-[#43362F] font-medium">JSON Backup &amp; Restore</h4>
                  <p className="text-xs text-[#A8978A]">
                    Export your complete wedding configuration as a JSON file, or restore from a previous backup.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={exportJson}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#8EAFA0] px-5 py-2.5 text-xs font-serif text-white hover:bg-[#597B6B] shadow-xs"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#EDE4DC] space-y-2">
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#A8978A]">
                      Paste JSON To Restore
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Paste exported wedding site JSON here..."
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] p-2 text-xs font-mono"
                    />
                    <button
                      onClick={() => {
                        if (importJson(importJsonText)) {
                          setImportJsonText('');
                          triggerToast('Wedding configuration restored from JSON!');
                        } else {
                          alert('Invalid JSON structure. Please verify the file.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8D0C9] bg-white px-4 py-2 text-xs font-serif text-[#66564D] hover:border-[#8EAFA0]"
                    >
                      <Upload className="h-3.5 w-3.5 text-[#8EAFA0]" />
                      <span>Apply Restored Configuration</span>
                    </button>
                  </div>
                </div>

                {/* Factory Reset */}
                <div className="rounded-2xl bg-rose-50/50 border border-rose-200/60 p-6 space-y-3">
                  <h4 className="font-serif text-base text-rose-800 font-medium">Reset to Default Factory Template</h4>
                  <p className="text-xs text-rose-700/80">
                    Reverts all names, verses, timeline milestones, and photos back to the original John &amp; Sriya Christian wedding template.
                  </p>
                  <button
                    onClick={resetToDefaults}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-serif text-rose-700 hover:bg-rose-100/50 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset All Content</span>
                  </button>
                </div>

                <SectionSaveFooter
                  sectionTitle="Security & System Settings"
                  onSave={() => handleSaveSection('system', 'Security & System Settings')}
                  isSaving={savingSection === 'system'}
                  isSaved={savedSection === 'system'}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
