import React from 'react';
import { motion } from 'framer-motion';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';
import { Heart } from 'lucide-react';

export const FamilyBlessingsSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const familyBlessings = siteData.family;
  return (
    <section id="family" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.familySettings?.sectionSubtitle || 'Honoring Our Heritage'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {siteData.familySettings?.sectionTitle || 'Family Blessings'}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-lg mx-auto mt-2">
            {siteData.familySettings?.proverbVerse ||
              '“Children’s children are a crown to the aged, and parents are the pride of their children.” — Proverbs 17:6'}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Parents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {familyBlessings.map((family, index) => {
            const isGroomSide = family.familySide === 'groom';
            return (
              <motion.div
                key={family.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative rounded-3xl bg-[#F8F3EE] border border-[#DCE8E2] card-shadow p-8 sm:p-10 text-center flex flex-col justify-between group hover:border-[#BA8FA0]/40 transition-all duration-300"
              >
                {/* Top Badge */}
                <div>
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#FDFAF7] border border-[#EDE4DC] shadow-xs mb-4">
                    <Heart
                      className={`h-5 w-5 ${
                        isGroomSide ? 'text-[#8EAFA0] fill-[#8EAFA0]/20' : 'text-[#BA8FA0] fill-[#BA8FA0]/20'
                      }`}
                    />
                  </div>

                  <p className="font-serif text-xs tracking-[0.25em] uppercase text-[#A8978A] mb-1 font-medium">
                    {family.title}
                  </p>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-normal mb-1">
                    {family.names[0]}
                  </h3>
                  <p className="font-serif text-sm text-[#8EAFA0] italic mb-1">&amp;</p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-normal mb-6">
                    {family.names[1]}
                  </h3>

                  <div className="h-[1px] w-16 bg-[#A8978A]/25 mx-auto mb-6" />

                  {/* Parental Blessing Message */}
                  <blockquote className="font-serif italic text-base text-[#66564D] leading-relaxed relative px-3">
                    <span className="text-3xl font-serif text-[#BA8FA0]/40 absolute -top-3 left-0">“</span>
                    {family.blessingMessage}
                    <span className="text-3xl font-serif text-[#BA8FA0]/40 absolute -bottom-4 right-0">”</span>
                  </blockquote>
                </div>

                <div className="mt-8 pt-4 border-t border-[#A8978A]/15">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#8EAFA0]">
                    In Christ's Eternal Love
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

