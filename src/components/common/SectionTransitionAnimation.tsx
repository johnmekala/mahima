import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { ChristianCross, WeddingRingsIcon, OpenBibleIcon } from './FloralDecor';

export type TransitionVariant =
  | 'cross'
  | 'rings'
  | 'floral'
  | 'dove'
  | 'heart'
  | 'scripture';

interface SectionTransitionAnimationProps {
  variant?: TransitionVariant;
  tagline?: string;
  className?: string;
}

export const SectionTransitionAnimation: React.FC<SectionTransitionAnimationProps> = ({
  variant = 'floral',
  tagline,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full py-8 sm:py-12 overflow-hidden flex flex-col items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1.1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-80 h-24 rounded-full bg-gradient-to-r from-[#E9D8DE]/20 via-[#8EAFA0]/20 to-[#E9D8DE]/20 blur-2xl"
        />
      </div>

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15, scale: 0.5 }}
            whileInView={{
              opacity: [0, 0.75, 0],
              y: [-5, -30],
              scale: [0.5, 1, 0.6],
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 2.4,
              delay: i * 0.22,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
            style={{
              left: `${20 + i * 12}%`,
              top: `${50 + (i % 2 === 0 ? 8 : -8)}%`,
            }}
            className="absolute"
          >
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#BA8FA0]/60" />
          </motion.div>
        ))}
      </div>

      {/* Main Animated Ornamental Bar */}
      <div className="relative z-10 max-w-2xl w-full px-6 flex items-center justify-center gap-3 sm:gap-6">
        {/* Left Expanding Filigree Rule */}
        <div className="flex-1 flex items-center gap-1.5 justify-end">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8EAFA0]/40 to-[#A8978A]/80 origin-right"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1.5 w-1.5 rounded-full bg-[#8EAFA0]/70 shrink-0"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="h-2 w-2 rounded-full bg-[#BA8FA0]/80 shrink-0"
          />
        </div>

        {/* Center Animated Medallion Emblem */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative shrink-0 flex items-center justify-center p-3 rounded-full bg-white/95 border border-[#EDE4DC] shadow-xs backdrop-blur-sm group"
        >
          {/* Subtle Rotating Halo Glow */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1 rounded-full border border-dashed border-[#8EAFA0]/30 pointer-events-none"
          />

          {/* Medallion Variant Render */}
          {variant === 'cross' && (
            <div className="relative">
              <ChristianCross size={24} className="text-[#597B6B]" />
            </div>
          )}

          {variant === 'rings' && (
            <div className="relative">
              <WeddingRingsIcon size={26} className="text-[#BA8FA0]" />
            </div>
          )}

          {variant === 'heart' && (
            <div className="relative">
              <Heart className="h-5 w-5 text-[#BA8FA0] fill-[#BA8FA0]/25" />
            </div>
          )}

          {variant === 'dove' && (
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#597B6B"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#597B6B]"
            >
              <path d="M11 20A7 7 0 0 1 4 13V8l4 2a8 8 0 0 0 7-3c0 4 2 6 5 7l-2 1a7 7 0 0 1-7 5Z" />
              <path d="m15 13-3 3" />
              <circle cx="17.5" cy="8.5" r=".5" fill="#597B6B" />
            </svg>
          )}

          {variant === 'scripture' && (
            <div className="relative">
              <OpenBibleIcon size={26} className="text-[#66564D]" />
            </div>
          )}

          {variant === 'floral' && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#8EAFA0]"
            >
              <circle cx="12" cy="12" r="2.5" fill="#BA8FA0" />
              <path
                d="M12 2.5C12 5.5 14 7.5 17 7.5C14 7.5 12 9.5 12 12.5C12 9.5 10 7.5 7 7.5C10 7.5 12 5.5 12 2.5Z"
                fill="#8EAFA0"
                opacity="0.8"
              />
              <path
                d="M12 21.5C12 18.5 14 16.5 17 16.5C14 16.5 12 14.5 12 11.5C12 14.5 10 16.5 7 16.5C10 16.5 12 18.5 12 21.5Z"
                fill="#8EAFA0"
                opacity="0.8"
              />
            </svg>
          )}
        </motion.div>

        {/* Right Expanding Filigree Rule */}
        <div className="flex-1 flex items-center gap-1.5 justify-start">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="h-2 w-2 rounded-full bg-[#BA8FA0]/80 shrink-0"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1.5 w-1.5 rounded-full bg-[#8EAFA0]/70 shrink-0"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#8EAFA0]/40 to-[#A8978A]/80 origin-left"
          />
        </div>
      </div>

      {/* Optional Delicate Script Tagline */}
      {tagline && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative z-10 font-serif italic text-xs sm:text-sm text-[#A8978A] tracking-[0.2em] uppercase mt-2.5 drop-shadow-2xs"
        >
          {tagline}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTransitionAnimation;

