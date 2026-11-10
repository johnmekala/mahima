import React from 'react';
import { motion } from 'framer-motion';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';
import { Calendar, Heart } from 'lucide-react';

export const LoveStorySection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const storyMilestones = siteData.story;
  return (
    <section id="story" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.storySettings?.sectionSubtitle || 'Guided By Faith'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {siteData.storySettings?.sectionTitle || 'Our Love Story'}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-lg mx-auto mt-2">
            {siteData.storySettings?.sectionDescription ||
              'How the Lord wrote every chapter of our lives, weaving two paths into one eternal purpose.'}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#DCE8E2] via-[#E9D8DE] to-[#DCE8E2]" />

          <div className="space-y-12 md:space-y-16">
            {storyMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#FDFAF7] border-2 border-[#8EAFA0] shadow-sm">
                    {index === storyMilestones.length - 1 ? (
                      <Heart className="h-4 w-4 text-[#BA8FA0] fill-[#BA8FA0]" />
                    ) : (
                      <ChristianCross size={16} className="text-[#8EAFA0]" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="w-full pl-14 md:pl-0 md:w-1/2 md:px-8">
                    <div className="rounded-2xl bg-[#F8F3EE] border border-[#D8D0C9]/60 card-shadow overflow-hidden group hover:border-[#BA8FA0]/40 transition-all duration-300">
                      {/* Photo Header */}
                      <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EE] via-transparent to-black/10" />
                        
                        {/* Phase Badge */}
                        <div className="absolute top-3 left-3 rounded-full bg-[#FDFAF7]/90 backdrop-blur-xs px-3 py-1 border border-[#DCE8E2] text-xs font-serif tracking-wider uppercase text-[#597B6B]">
                          {milestone.phase}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-1.5 text-xs font-serif text-[#A8978A] mb-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#BA8FA0]" />
                          <span>{milestone.date}</span>
                        </div>

                        <h3 className="font-serif text-2xl text-[#43362F] font-normal mb-2.5">
                          {milestone.title}
                        </h3>

                        <p className="text-sm font-sans text-[#66564D] leading-relaxed mb-4">
                          {milestone.description}
                        </p>

                        {milestone.verse && (
                          <div className="pt-3 border-t border-[#A8978A]/20">
                            <p className="font-serif italic text-xs text-[#8EAFA0] leading-normal">
                              {milestone.verse}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other half on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

