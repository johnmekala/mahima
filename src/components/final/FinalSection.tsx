import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Heart } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

interface FinalSectionProps {
  onReplayEnvelope: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onReplayEnvelope }) => {
  const { siteData } = useWeddingCms();
  const { couple, final } = siteData;

  return (
    <footer className="relative py-24 px-4 sm:px-6 overflow-hidden bg-[#FDFAF7] border-t border-[#D8D0C9]/40">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Top Cross Emblem */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-12 bg-[#A8978A]/40" />
          <ChristianCross size={22} className="text-[#8EAFA0]" />
          <span className="h-[1px] w-12 bg-[#A8978A]/40" />
        </div>

        {/* Core Tagline */}
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#8EAFA0] font-semibold mb-3">
          {final.tagline}
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal max-w-2xl mx-auto leading-tight mb-4">
          {final.sectionTitle}
        </h2>

        <FloralDivider showCross={false} className="my-4" />

        {/* Beautiful Closing Photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md mx-auto my-8 rounded-3xl overflow-hidden card-shadow border border-[#DCE8E2] group"
        >
          <img
            src={final.closingPhotoUrl}
            alt={`${couple.groomName} & ${couple.brideName}`}
            className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#43362F]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
            <h3 className="font-script text-4xl sm:text-5xl drop-shadow-sm">
              {couple.brideName} &amp; {couple.groomName}
            </h3>
            <p className="font-serif text-xs tracking-widest uppercase text-[#E9D8DE] mt-1">
              {couple.weddingDateFormatted}
            </p>
          </div>
        </motion.div>

        {/* Closing Priestly Benediction (Numbers 6:24-26) */}
        <div className="max-w-xl mx-auto my-8 p-6 rounded-2xl bg-[#F8F3EE] border border-[#EDE4DC]">
          <p className="font-serif italic text-base sm:text-lg text-[#66564D] leading-relaxed">
            “{final.benedictionVerse}”
          </p>
          <p className="font-serif text-xs tracking-[0.2em] uppercase text-[#A8978A] mt-2 font-medium">
            — {final.benedictionRef}
          </p>
        </div>

        {/* Replay Envelope Trigger */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onReplayEnvelope}
            className="inline-flex items-center gap-2 rounded-full border border-[#DCE8E2] bg-[#FDFAF7] px-6 py-2.5 text-xs font-serif tracking-wider text-[#66564D] hover:border-[#BA8FA0] hover:text-[#43362F] transition-all shadow-xs active:scale-95"
          >
            <MailOpen className="h-4 w-4 text-[#8EAFA0]" />
            <span>Replay Invitation Envelope</span>
          </button>
        </div>

        {/* Footer Credit & Love Note */}
        <div className="mt-16 pt-8 border-t border-[#A8978A]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-serif text-[#A8978A] gap-3">
          <p>
            {final.footerNote}
          </p>
          <a
            href="https://wa.me/916304043014"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#A8978A] hover:text-[#43362F] transition-colors group cursor-pointer"
            title="Chat on WhatsApp (+91 6304043014)"
          >
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#BA8FA0] fill-[#BA8FA0] transition-transform duration-300 group-hover:scale-125 group-hover:text-rose-500 group-hover:fill-rose-500" />
            <span>for our sacred covenant</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

