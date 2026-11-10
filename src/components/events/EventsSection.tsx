import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Shirt,
  Heart,
  Navigation,
  Camera,
} from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';
import type { WeddingEvent } from '../../types/wedding';

type EventTabKey = 'haldi' | 'wedding' | 'reception';

export const EventsSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const weddingEvents = siteData.events || [];
  const [activeTab, setActiveTab] = useState<EventTabKey>('wedding');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamically resolve the 3 events from CMS data
  const haldiEvent: WeddingEvent =
    weddingEvents.find(
      (e) => e.id === 'haldi' || e.type === 'haldi' || e.title.toLowerCase().includes('haldi')
    ) ||
    weddingEvents[0] || {
      id: 'haldi',
      type: 'haldi',
      title: 'Haldi & Roce Ceremony',
      subtitle: 'Traditional Pre-Wedding Blessings & Cleansing',
      date: 'Friday, November 27, 2026',
      time: '4:00 PM – 7:00 PM',
      venueName: 'Grace Heritage Villa & Courtyard',
      address: 'No. 42, Palm Meadows Road, Whitefield, Bengaluru, Karnataka 560066',
      attire: 'Traditional Yellow, Warm Ochre & Floral Attire',
      description:
        'A joyous South Indian pre-wedding celebration of prayer, turmeric and coconut milk blessings (Roce), filled with songs of praise, love, and sweet family traditions.',
      googleMapsUrl: 'https://maps.google.com/?q=Palm+Meadows+Whitefield+Bangalore',
      embedMapQuery: 'Palm Meadows, Whitefield, Bengaluru',
      highlights: [
        'Traditional Roce Blessing & Prayers',
        'Turmeric & Floral Shower',
        'Family Hymns & Thanksgiving',
        'High Tea & South Indian Sweets',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    };

  const weddingEvent: WeddingEvent =
    weddingEvents.find(
      (e) =>
        e.id === 'matrimony' ||
        e.id === 'wedding' ||
        e.type === 'ceremony' ||
        e.title.toLowerCase().includes('matrimony') ||
        e.title.toLowerCase().includes('wedding')
    ) ||
    weddingEvents[1] ||
    weddingEvents[0];

  const receptionEvent: WeddingEvent =
    weddingEvents.find(
      (e) =>
        e.id === 'reception' ||
        e.type === 'reception' ||
        e.title.toLowerCase().includes('reception')
    ) ||
    weddingEvents[2] ||
    weddingEvents[weddingEvents.length - 1];

  // Navigation tab definitions
  const eventTabs: {
    key: EventTabKey;
    label: string;
    badgeLabel: string;
    event: WeddingEvent;
    fallbackImage: string;
    accentColor: string;
    badgeClass: string;
    parkingNote: string;
    transitNote: string;
    etiquetteNote: string;
  }[] = [
    {
      key: 'haldi',
      label: 'Haldi',
      badgeLabel: 'Pre-Wedding Blessing',
      event: haldiEvent,
      fallbackImage:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      accentColor: '#D4A373',
      badgeClass: 'bg-[#FFF9EE] text-[#8C6D23] border border-[#E8D19F]',
      parkingNote: 'Designated guest parking inside the Villa Courtyard gates.',
      transitNote: 'Near Whitefield Hope Farm Junction; easy cab drop-off at entrance.',
      etiquetteNote: 'Traditional pre-wedding celebration; casual floral photography welcome.',
    },
    {
      key: 'wedding',
      label: 'Wedding',
      badgeLabel: 'Holy Matrimony',
      event: weddingEvent,
      fallbackImage:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      accentColor: '#597B6B',
      badgeClass: 'bg-[#EBF2EE] text-[#597B6B] border border-[#BFD4CA]',
      parkingNote:
        siteData.locations?.churchParkingNote ||
        'Designated church premises parking on St. Mark’s Road; attendants will guide vehicles.',
      transitNote:
        siteData.locations?.churchTransitNote ||
        'Mahatma Gandhi Road Metro Station (Purple Line) is a 3-minute walk.',
      etiquetteNote:
        siteData.locations?.churchEtiquetteNote ||
        'Please maintain quiet reverence during holy vows and pastoral benediction.',
    },
    {
      key: 'reception',
      label: 'Reception',
      badgeLabel: 'Celebration Banquet',
      event: receptionEvent,
      fallbackImage:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      accentColor: '#8E546B',
      badgeClass: 'bg-[#FBF0F4] text-[#8E546B] border border-[#D7BAC5]',
      parkingNote:
        siteData.locations?.receptionParkingNote ||
        'Valet parking service available at the Main Grand Rosewood Porch.',
      transitNote:
        siteData.locations?.receptionTransitNote ||
        'Located off Sarjapur Main Road; taxi drop-off directly at main portico.',
      etiquetteNote:
        siteData.locations?.receptionPhotoNote ||
        'Enjoy celebratory dinner, cake cutting, live praise, and cheerful photos with the couple.',
    },
  ];

  const currentTabConfig = eventTabs.find((t) => t.key === activeTab) || eventTabs[1];
  const currentEvent = currentTabConfig.event;
  const currentImage = currentEvent.imageUrl || currentTabConfig.fallbackImage;

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="events" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      {/* Anchor for Location Navigation routing */}
      <div id="location" className="absolute -top-24 pointer-events-none" />

      {/* Background Soft Pastel Glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#E9D8DE]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#DCE8E2]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
          </div>

          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.eventsSettings?.sectionSubtitle || 'Celebration of Covenant & Venues'}
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1.5 tracking-tight">
            {siteData.eventsSettings?.sectionTitle || 'Wedding Events, Locations & Directions'}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#66564D] max-w-xl mx-auto mt-2.5 leading-relaxed">
            {siteData.eventsSettings?.sectionDescription ||
              'We cordially invite you to celebrate these sacred milestones. Explore the event schedule, ceremony venues, interactive maps, and travel directions below.'}
          </p>

          <FloralDivider showCross={false} className="my-4" />
        </div>

        {/* 1. Event Navigation Buttons (Haldi, Wedding, Reception) */}
        <div className="flex items-center justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#F8F3EE] border border-[#DCE8E2] shadow-sm max-w-full overflow-x-auto gap-1.5 sm:gap-2">
            {eventTabs.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-serif tracking-wider uppercase transition-all duration-300 flex items-center gap-2 select-none cursor-pointer ${
                    isSelected
                      ? 'text-[#43362F] font-semibold shadow-sm'
                      : 'text-[#66564D] hover:text-[#43362F] hover:bg-white/60'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`View ${tab.label} Event and Location details`}
                >
                  {/* Active Indicator Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeEventPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className={`absolute inset-0 rounded-full border ${
                        tab.key === 'haldi'
                          ? 'bg-gradient-to-r from-[#FFF9EE] to-white border-[#E8D19F] shadow-sm'
                          : tab.key === 'wedding'
                          ? 'bg-gradient-to-r from-[#EBF2EE] to-white border-[#BFD4CA] shadow-sm'
                          : 'bg-gradient-to-r from-[#FBF0F4] to-white border-[#D7BAC5] shadow-sm'
                      }`}
                    />
                  )}

                  {/* Button Icon & Label */}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.key === 'haldi' && (
                      <Sparkles
                        className={`h-3.5 w-3.5 transition-colors ${
                          isSelected ? 'text-[#8C6D23]' : 'text-[#A8978A]'
                        }`}
                      />
                    )}
                    {tab.key === 'wedding' && (
                      <ChristianCross
                        size={13}
                        className={`transition-colors ${
                          isSelected ? 'text-[#597B6B]' : 'text-[#A8978A]'
                        }`}
                      />
                    )}
                    {tab.key === 'reception' && (
                      <Heart
                        className={`h-3.5 w-3.5 transition-colors ${
                          isSelected ? 'text-[#8E546B]' : 'text-[#A8978A]'
                        }`}
                      />
                    )}
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 & 3. Interactive Event & Location Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl sm:rounded-4xl bg-[#F8F3EE] border border-[#DCE8E2] card-shadow overflow-hidden group hover:border-[#BA8FA0]/40 transition-colors duration-500"
            >
              {/* Top: Large Event Cover Image with Rounded Corners */}
              <div className="relative w-full h-72 sm:h-96 md:h-[420px] overflow-hidden bg-[#EDE4DC]">
                <img
                  src={currentImage}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Soft Romantic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#43362F]/85 via-[#43362F]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#43362F]/40 via-transparent to-transparent" />

                {/* Top Corner Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  {/* Category Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider backdrop-blur-md shadow-sm ${currentTabConfig.badgeClass}`}
                  >
                    {activeTab === 'wedding' ? (
                      <ChristianCross size={13} className="text-[#597B6B]" />
                    ) : activeTab === 'haldi' ? (
                      <Sparkles className="h-3.5 w-3.5 text-[#8C6D23]" />
                    ) : (
                      <Heart className="h-3.5 w-3.5 text-[#8E546B]" />
                    )}
                    <span>{currentTabConfig.badgeLabel}</span>
                  </span>

                  {/* Couple Monogram Tag */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFAF7]/90 backdrop-blur-md border border-white/60 text-[11px] font-serif text-[#43362F]">
                    <span>{siteData.couple.brideName} &amp; {siteData.couple.groomName}</span>
                  </span>
                </div>

                {/* Overlay Title & Subtitle at Bottom of Image */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white">
                  <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#E9D8DE] block mb-1">
                    {currentTabConfig.label} Ceremony
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight drop-shadow-sm text-white">
                    {currentEvent.title}
                  </h3>
                  {currentEvent.subtitle && (
                    <p className="font-serif italic text-sm sm:text-base text-[#FDFAF7]/90 mt-1 drop-shadow-xs max-w-xl">
                      {currentEvent.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Event Details Container */}
              <div className="p-6 sm:p-9 md:p-11 space-y-8">
                {/* Event Description */}
                {currentEvent.description && (
                  <div className="rounded-2xl bg-[#FDFAF7] border border-[#EDE4DC] p-5 sm:p-6 text-center sm:text-left">
                    <p className="font-serif italic text-base sm:text-lg text-[#66564D] leading-relaxed">
                      “{currentEvent.description}”
                    </p>
                  </div>
                )}

                {/* Core Event Grid: Date, Time, Venue, Dress Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* 1. Date */}
                  <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#EDE4DC] shadow-xs hover:border-[#BA8FA0]/40 transition-colors">
                    <div className="p-3 rounded-xl bg-[#FDFAF7] border border-[#DCE8E2] text-[#8EAFA0] shrink-0 mt-0.5">
                      <Calendar className="h-5 w-5 text-[#597B6B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-[11px] uppercase tracking-widest text-[#A8978A] block mb-0.5">
                        Event Date
                      </span>
                      <p className="font-serif text-lg sm:text-xl text-[#43362F] font-medium leading-snug">
                        {currentEvent.date}
                      </p>
                    </div>
                  </div>

                  {/* 2. Time */}
                  <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#EDE4DC] shadow-xs hover:border-[#BA8FA0]/40 transition-colors">
                    <div className="p-3 rounded-xl bg-[#FDFAF7] border border-[#E9D8DE] text-[#BA8FA0] shrink-0 mt-0.5">
                      <Clock className="h-5 w-5 text-[#8E546B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-[11px] uppercase tracking-widest text-[#A8978A] block mb-0.5">
                        Time Schedule
                      </span>
                      <p className="font-sans text-base sm:text-lg text-[#43362F] font-medium leading-snug">
                        {currentEvent.time}
                      </p>
                    </div>
                  </div>

                  {/* 3. Venue & Address */}
                  <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#EDE4DC] shadow-xs hover:border-[#BA8FA0]/40 transition-colors">
                    <div className="p-3 rounded-xl bg-[#FDFAF7] border border-[#DCE8E2] text-[#8EAFA0] shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5 text-[#597B6B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-[11px] uppercase tracking-widest text-[#A8978A] block mb-0.5">
                        Ceremony Venue
                      </span>
                      <p className="font-serif text-lg sm:text-xl text-[#43362F] font-medium leading-snug">
                        {currentEvent.venueName}
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-[#66564D] mt-1 leading-relaxed">
                        {currentEvent.address}
                      </p>
                    </div>
                  </div>

                  {/* 4. Dress Code / Attire */}
                  <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#EDE4DC] shadow-xs hover:border-[#BA8FA0]/40 transition-colors">
                    <div className="p-3 rounded-xl bg-[#FDFAF7] border border-[#E9D8DE] text-[#BA8FA0] shrink-0 mt-0.5">
                      <Shirt className="h-5 w-5 text-[#8E546B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-[11px] uppercase tracking-widest text-[#A8978A] block mb-0.5">
                        Dress Code &amp; Attire
                      </span>
                      <p className="font-serif text-base sm:text-lg text-[#43362F] font-medium leading-snug">
                        {currentEvent.attire || 'Pastel Elegance / Traditional Attire'}
                      </p>
                      <span className="inline-block mt-1 text-[11px] text-[#A8978A] font-serif italic">
                        {activeTab === 'haldi'
                          ? 'Bright yellows, warm creams, or modest floral pastels'
                          : activeTab === 'wedding'
                          ? 'Church modest formal, ivory, sage, or soft blush'
                          : 'Grand evening celebratory, semi-formal pastels'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ceremony Highlights */}
                {currentEvent.highlights && currentEvent.highlights.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#FDFAF7] border border-[#EDE4DC]">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-[#8EAFA0]" />
                      <span className="font-serif text-xs uppercase tracking-widest text-[#A8978A] font-semibold">
                        Ceremony Highlights &amp; Order of Service
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentEvent.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#66564D]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#8EAFA0] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Live Google Map for Venue */}
                <div className="rounded-2xl border border-[#EDE4DC] overflow-hidden bg-white/70 shadow-xs p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#EBF2EE] text-[#597B6B]">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm sm:text-base text-[#43362F] font-medium leading-none">
                          Interactive Location Map: {currentEvent.venueName}
                        </h4>
                        <span className="text-[11px] text-[#A8978A] font-serif">
                          Google Maps Live GPS Coordinates
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-serif text-[#597B6B] bg-[#EBF2EE] px-3 py-1 rounded-full self-start sm:self-auto border border-[#BFD4CA]">
                      Live Navigation
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-[#D8D0C9] bg-[#EDE4DC] h-64 sm:h-80 w-full relative">
                    <iframe
                      title={`Map for ${currentEvent.venueName}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        currentEvent.embedMapQuery ||
                          `${currentEvent.venueName}, ${currentEvent.address}`
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full filter saturate-[0.88] contrast-[1.04]"
                    />
                  </div>
                </div>

                {/* Guest Logistics Advice & Ceremony Etiquette */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FDFAF7] border border-[#EDE4DC] text-xs text-[#66564D]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-[#E9D8DE] text-[#8E546B] shrink-0 mt-0.5">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-serif text-[10px] uppercase tracking-wider text-[#A8978A] block font-medium">
                        Ceremony Etiquette
                      </span>
                      <p className="mt-0.5 leading-relaxed text-[#66564D]">
                        {currentTabConfig.etiquetteNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar: Get Directions Button & Copy Address */}
                <div className="pt-4 border-t border-[#EDE4DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  {/* Google Maps Get Directions Button */}
                  <a
                    href={currentEvent.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#597B6B] hover:bg-[#435e51] text-white px-7 py-3 text-xs sm:text-sm font-serif tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Get Directions in Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </a>

                  {/* Copy Address Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyAddress(
                        currentEvent.id,
                        `${currentEvent.venueName}, ${currentEvent.address}`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8D0C9] bg-white hover:bg-[#FDFAF7] hover:border-[#8EAFA0] text-[#66564D] hover:text-[#43362F] px-5 py-3 text-xs sm:text-sm font-serif tracking-wider transition-all duration-300 shadow-xs active:scale-98 cursor-pointer"
                    title="Copy full venue address to clipboard"
                  >
                    {copiedId === currentEvent.id ? (
                      <>
                        <Check className="h-4 w-4 text-[#597B6B]" />
                        <span className="text-[#597B6B] font-medium">Address Copied! ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#A8978A]" />
                        <span>Copy Venue Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
