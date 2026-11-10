import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { useWeddingCms } from '../../context/CmsContext';

export const HeroSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const { couple, hero } = siteData;

  // Custom background overlay opacity (defaults to 35% so image is clear & visible)
  const opacityVal =
    typeof hero.overlayOpacity === 'number'
      ? Math.max(0, Math.min(100, hero.overlayOpacity))
      : 35;
  const overlayDecimal = opacityVal / 100;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-end items-center overflow-hidden px-4 sm:px-6 pt-52 sm:pt-64 md:pt-72 pb-10 sm:pb-14"
    >
      {/* Background Image with Cinematic Ken Burns Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-cover bg-top sm:bg-center"
          style={{
            backgroundImage: `url(${hero.backgroundUrl})`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dynamic Light Romantic Pastel Overlay controlled via CMS (Clearer at top for faces, soft at bottom) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFAF7]/25 via-40% to-[#FDFAF7]/95 transition-opacity duration-300"
          style={{ opacity: overlayDecimal }}
        />

        {/* Soft subtle radial vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#43362F]/20 pointer-events-none" />
      </div>

      {/* Hero Content (Positioned in the lower portion so faces remain unobstructed) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-auto">
        {/* Divine Calling Tag (No Cross Symbols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center px-4 py-1.5 rounded-full border border-white/40 bg-black/25 backdrop-blur-md shadow-sm mb-2 sm:mb-3"
        >
          <span className="font-serif tracking-[0.28em] text-[11px] sm:text-xs uppercase text-white font-semibold drop-shadow-xs">
            {hero.divineCallingText}
          </span>
        </motion.div>

        {/* Sub-Headline: "Two Hearts, One Faith, One Forever" */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-serif italic font-bold text-base sm:text-lg md:text-xl text-white max-w-xl mb-1.5 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-wide"
        >
          "{hero.tagline}"
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="my-1 sm:my-2"
        >
          <h1 className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#43362F] leading-tight select-none drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
            {couple.brideName} <span className="font-serif text-3xl sm:text-5xl text-[#66564D]">&</span> {couple.groomName}
          </h1>

          {/* Full Names: "Sunitha Rani & Vara Prasad" */}
          <p className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-[#43362F] mt-1.5 font-bold drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
            {couple.brideFullName} &amp; {couple.groomFullName}
          </p>
        </motion.div>

        {/* Floral Divider without cross */}
        <div className="flex items-center justify-center gap-2 my-2 sm:my-3">
          <span className="h-[1px] w-12 bg-white/70 drop-shadow-sm" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/90 drop-shadow-sm" />
          <span className="h-[1px] w-12 bg-white/70 drop-shadow-sm" />
        </div>

        {/* "ARE GETTING MARRIED" */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif tracking-[0.3em] text-xs sm:text-sm uppercase text-white font-bold mb-2.5 sm:mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]"
        >
          {hero.gettingMarriedText}
        </motion.p>

        {/* Wedding Date & City */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-base text-[#43362F] font-serif mb-5 sm:mb-6 bg-[#FDFAF7]/95 backdrop-blur-md px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border border-[#DCE8E2] shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#BA8FA0]" />
            <span className="font-medium tracking-wide">{couple.weddingDateFormatted}</span>
          </div>
          <span className="text-[#A8978A] hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8EAFA0]" />
            <span className="tracking-wide font-medium">{hero.churchNameShort || couple.locationCity}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <a
            href="#events"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#8EAFA0] px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-serif tracking-wider text-white shadow-md hover:bg-[#597B6B] transition-all hover:shadow-lg active:scale-95 cursor-pointer"
          >
            {hero.eventsButtonText || 'Wedding Events'}
          </a>
          <a
            href="#location"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#BA8FA0] bg-[#FDFAF7] px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-serif tracking-wider text-[#66564D] shadow-sm hover:bg-[#F8F2F5] transition-all hover:border-[#8E546B] active:scale-95 cursor-pointer"
          >
            Locations &amp; Directions
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#blessings"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hidden sm:flex mt-6 flex-col items-center gap-1 text-[#A8978A] hover:text-[#66564D] transition-colors relative z-10"
        aria-label="Scroll to God's Blessings"
      >
        <span className="font-serif text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-[#8EAFA0]" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;


