import React from 'react';
import { motion } from 'framer-motion';
import { OpenBibleIcon, WeddingRingsIcon, ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

export const GodsBlessingsSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const { blessings } = siteData;

  return (
    <section id="blessings" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#F8F3EE]">
      {/* Decorative ambient background spots */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-[#E9D8DE]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 rounded-full bg-[#DCE8E2]/35 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {blessings.sectionSubtitle}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {blessings.sectionTitle}
          </h2>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Main Sacred Scripture Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-[#FDFAF7] border border-[#DCE8E2] card-shadow p-8 sm:p-12 md:p-16 text-center"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-3 border border-[#A8978A]/25 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 border border-[#E9D8DE]/60 rounded-xl pointer-events-none" />

          {/* Central Motifs: Open Bible & Wedding Rings */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-2xl bg-[#F8F3EE] border border-[#EDE4DC] shadow-xs"
            >
              <OpenBibleIcon size={56} className="text-[#66564D]" />
            </motion.div>
            <div className="hidden sm:block h-10 w-[1px] bg-[#A8978A]/30" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-2xl bg-[#F8F3EE] border border-[#EDE4DC] shadow-xs"
            >
              <WeddingRingsIcon size={56} className="text-[#A8978A]" />
            </motion.div>
          </div>

          {/* Main Scripture Text: Matthew 19:6 */}
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#43362F] leading-relaxed max-w-2xl mx-auto italic font-normal">
            “{blessings.mainVerse}”
          </blockquote>

          <p className="mt-4 font-serif text-sm tracking-[0.25em] uppercase text-[#8EAFA0] font-semibold">
            — {blessings.mainVerseRef}
          </p>

          <div className="h-[1px] w-24 bg-[#BA8FA0]/40 mx-auto my-8" />

          {/* Secondary Verse (1 Corinthians 13) */}
          <p className="font-serif italic text-base text-[#66564D] max-w-xl mx-auto mb-2">
            “{blessings.secondaryVerse}”
          </p>
          <p className="font-serif text-xs tracking-wider uppercase text-[#A8978A]">
            {blessings.secondaryVerseRef}
          </p>

          {/* Covenant Prayer Box */}
          <div className="mt-8 pt-6 border-t border-[#A8978A]/15 max-w-xl mx-auto">
            <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#A8978A] mb-2 font-medium">
              {blessings.prayerTitle}
            </p>
            <p className="font-serif italic text-sm text-[#66564D]/90 leading-relaxed">
              "{blessings.prayerText}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

