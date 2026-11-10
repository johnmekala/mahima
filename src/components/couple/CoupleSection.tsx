import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

export const CoupleSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const { couple } = siteData;

  const bridePhoto =
    couple.bridePhotoUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
  const groomPhoto =
    couple.groomPhotoUrl ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80';

  return (
    <section id="couples" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      {/* Anchor alias so #couple or #couples both scroll here */}
      <div id="couple" className="absolute -top-24 pointer-events-none" />

      {/* Ambient Pastel Background Lighting */}
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#E9D8DE]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-[#DCE8E2]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
          </div>

          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {couple.sectionSubtitle || 'United by God in Holy Love'}
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1.5 tracking-tight">
            {couple.sectionTitle || 'The Happy Couple'}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#66564D] max-w-xl mx-auto mt-2 leading-relaxed">
            Two distinct paths, ordained by grace, journeying together toward an eternity of worship, love, and purpose in Christ.
          </p>

          <FloralDivider showCross={false} className="my-4" />
        </div>

        {/* 2-Column Couple Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* 1. The Bride: Sunitha Grace */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#FDF9FA] to-[#F8F2F5] border border-[#E9D8DE] card-shadow overflow-hidden p-6 sm:p-9 flex flex-col justify-between group hover:border-[#BA8FA0]/60 transition-all duration-300"
          >
            <div>
              {/* Photo Container */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 bg-[#E9D8DE]/40">
                <img
                  src={bridePhoto}
                  alt={couple.brideFullName}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#43362F]/65 via-transparent to-transparent pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#8E546B] border border-[#D7BAC5] shadow-xs">
                    <Heart className="h-3.5 w-3.5 text-[#BA8FA0] fill-[#BA8FA0]" />
                    <span>{couple.brideTitle || 'The Bride'}</span>
                  </span>
                </div>

                {/* Overlay Name on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#E9D8DE] block mb-0.5">
                    {couple.brideTitle || 'The Bride'}
                  </span>
                  <h3 className="font-script text-4xl sm:text-5xl drop-shadow-sm leading-tight">
                    {couple.brideName}
                  </h3>
                </div>
              </div>

              {/* Name, Qualification & Parents Details */}
              <div className="mb-2">
                <h4 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-medium tracking-tight">
                  {couple.brideFullName || couple.brideName}
                </h4>

                {couple.brideQualification && (
                  <p className="font-serif text-sm sm:text-base text-[#597B6B] font-medium mt-1">
                    {couple.brideQualification}
                  </p>
                )}

                {couple.brideParents && (
                  <p className="font-serif italic text-xs sm:text-sm text-[#66564D] mt-1.5">
                    {couple.brideParents}
                  </p>
                )}
              </div>
            </div>

            {/* At last one line matter */}
            {couple.brideVerse && (
              <div className="mt-6 pt-4 border-t border-[#E9D8DE] flex items-start gap-2.5">
                <Quote className="h-3.5 w-3.5 text-[#BA8FA0] shrink-0 mt-0.5 opacity-70" />
                <p className="font-serif italic text-xs sm:text-sm text-[#43362F] leading-relaxed">
                  {couple.brideVerse}
                </p>
              </div>
            )}
          </motion.div>

          {/* 2. The Groom: Prasad Mathew */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#F7FAF8] to-[#EBF2EE] border border-[#DCE8E2] card-shadow overflow-hidden p-6 sm:p-9 flex flex-col justify-between group hover:border-[#8EAFA0]/60 transition-all duration-300"
          >
            <div>
              {/* Photo Container */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 bg-[#DCE8E2]/40">
                <img
                  src={groomPhoto}
                  alt={couple.groomFullName}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#43362F]/65 via-transparent to-transparent pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#597B6B] border border-[#BFD4CA] shadow-xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#597B6B]" />
                    <span>{couple.groomTitle || 'The Groom'}</span>
                  </span>
                </div>

                {/* Overlay Name on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#DCE8E2] block mb-0.5">
                    {couple.groomTitle || 'The Groom'}
                  </span>
                  <h3 className="font-script text-4xl sm:text-5xl drop-shadow-sm leading-tight">
                    {couple.groomName}
                  </h3>
                </div>
              </div>

              {/* Name, Qualification & Parents Details */}
              <div className="mb-2">
                <h4 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-medium tracking-tight">
                  {couple.groomFullName}
                </h4>

                {couple.groomQualification && (
                  <p className="font-serif text-sm sm:text-base text-[#597B6B] font-medium mt-1">
                    {couple.groomQualification}
                  </p>
                )}

                {couple.groomParents && (
                  <p className="font-serif italic text-xs sm:text-sm text-[#66564D] mt-1.5">
                    {couple.groomParents}
                  </p>
                )}
              </div>
            </div>

            {/* At last one line matter */}
            {couple.groomVerse && (
              <div className="mt-6 pt-4 border-t border-[#DCE8E2] flex items-start gap-2.5">
                <Quote className="h-3.5 w-3.5 text-[#8EAFA0] shrink-0 mt-0.5 opacity-70" />
                <p className="font-serif italic text-xs sm:text-sm text-[#43362F] leading-relaxed">
                  {couple.groomVerse}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Center Covenant Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#F8F3EE] border border-[#EDE4DC] shadow-xs"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChristianCross size={16} className="text-[#8EAFA0]" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#A8978A]">
              Sacred Matrimonial Covenant
            </span>
            <ChristianCross size={16} className="text-[#8EAFA0]" />
          </div>
          <h4 className="font-script text-3xl sm:text-4xl text-[#43362F] my-1">
            {couple.brideName} &amp; {couple.groomName}
          </h4>
          <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
            {couple.themeVerse?.verse ||
              '“So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.”'}
          </p>
          <span className="inline-block mt-2 font-serif text-[11px] uppercase tracking-wider text-[#A8978A] font-medium">
            — {couple.themeVerse?.reference || 'Matthew 19:6'}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
