import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { GiftBow } from './GiftBow';
import { SatinRibbon } from './SatinRibbon';
import { soundService } from '../../services/soundService';
import { useWeddingCms } from '../../context/CmsContext';

interface OpeningEnvelopeProps {
  onOpened: () => void;
}

type AnimationStage = 'wrapped' | 'untying' | 'unwrapping' | 'card_reveal' | 'card_expand' | 'done';

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpened }) => {
  const { siteData } = useWeddingCms();
  const [stage, setStage] = useState<AnimationStage>('wrapped');

  const handleOpen = () => {
    if (stage !== 'wrapped') return;

    // Step 1: Untie the gift bow & release silk ribbons
    setStage('untying');
    soundService.playWaxSealBreak();

    // Step 2: Unwrap gift wrapper flaps in 3D
    setTimeout(() => {
      setStage('unwrapping');
      soundService.playPaperSlide();
    }, 450);

    // Step 3: Elevation & slide out of wedding invitation card
    setTimeout(() => {
      setStage('card_reveal');
    }, 1000);

    // Step 4: Expand invitation card into full website
    setTimeout(() => {
      setStage('card_expand');
      soundService.playChime();
      soundService.startBackgroundMusic();
    }, 2200);

    // Step 5: Complete transition
    setTimeout(() => {
      setStage('done');
      onOpened();
    }, 2950);
  };

  if (stage === 'done') return null;

  const isUntying = stage === 'untying';
  const isUnwrapped = stage === 'unwrapping' || stage === 'card_reveal' || stage === 'card_expand';
  const isCardRevealing = stage === 'card_reveal' || stage === 'card_expand';
  const isCardExpanding = stage === 'card_expand';

  return (
    <AnimatePresence>
      <motion.div
        key="gift-wrapper-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: isCardExpanding ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F8F3EE] p-4 sm:p-6 select-none"
      >
        {/* Cinematic Blurred Ambient Sanctuary Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-md scale-105 opacity-35"
            style={{
              backgroundImage: `url(${siteData.envelope.churchBgUrl})`,
            }}
          />
          {/* Warm Candlelight Radial Vignettes */}
          <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E9D8DE]/35 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#DCE8E2]/35 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F3EE]/85 via-[#F8F3EE]/60 to-[#F8F3EE]/90" />
        </div>

        {/* Ambient Candlelight Warm Flicker Glow Behind Gift Wrapper */}
        <motion.div
          animate={{
            scale: [1, 1.05, 0.98, 1.03],
            opacity: [0.35, 0.55, 0.4, 0.55],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-[520px] w-[520px] rounded-full bg-gradient-to-r from-[#E9D8DE] via-[#DCE8E2] to-[#FDFAF7] blur-3xl pointer-events-none"
        />

        {/* Top-Left & Bottom-Right Ambient Blessings Badges (Zero Crosses!) */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 pointer-events-none opacity-85 select-none hidden sm:block">
          <div className="flex items-center gap-2 text-[#A8978A]/80 font-serif italic text-sm">
            <Sparkles size={16} className="text-[#8EAFA0]" />
            <span>{siteData.envelope.topLeftBadgeText || 'United in Sacred Love'}</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 pointer-events-none opacity-85 select-none hidden sm:block">
          <div className="flex items-center gap-2 text-[#A8978A]/80 font-serif italic text-sm">
            <span>{siteData.envelope.bottomRightBadgeText || 'Matthew 19:6'}</span>
            <Heart size={14} className="text-[#BA8FA0] fill-[#BA8FA0]" />
          </div>
        </div>

        {/* Outer 3D Perspective Stage */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-xl perspective-1500">
          {/* Header Typography Above Gift Wrapper (No Cross!) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: stage === 'wrapped' ? 1 : 0, y: stage === 'wrapped' ? 0 : -20 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center select-none"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-[#A8978A]/50" />
              <Sparkles className="h-4 w-4 text-[#BA8FA0]" />
              <span className="h-[1px] w-8 bg-[#A8978A]/50" />
            </div>
            <p className="font-serif tracking-[0.25em] text-xs uppercase text-[#A8978A]">
              {siteData.envelope.headerText}
            </p>
            <h1 className="mt-1 font-script text-4xl sm:text-5xl text-[#43362F] font-normal drop-shadow-sm">
              {siteData.couple.brideName} &amp; {siteData.couple.groomName}
            </h1>
          </motion.div>

          {/* Interactive Gift Wrapper Main Container */}
          <div
            onClick={handleOpen}
            className="relative w-full max-w-[440px] aspect-[1.45/1] cursor-pointer preserve-3d"
            style={{
              filter: 'drop-shadow(0 25px 40px rgba(102, 86, 77, 0.22))',
            }}
          >
            {/* 1. Gift Wrapper Interior Base / Box Lining */}
            <div
              className="absolute inset-0 rounded-2xl bg-[#EDE4DC] border border-[#D8D0C9] overflow-hidden"
              style={{
                backgroundImage:
                  'radial-gradient(#66564D12 1px, transparent 1px), linear-gradient(135deg, #F8F3EE 0%, #EDE4DC 100%)',
                backgroundSize: '12px 12px, 100% 100%',
              }}
            >
              {/* Soft interior pearl lining */}
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#BA8FA0_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* 2. Pristine Royal Wedding Invitation Card (Lifting up from within wrapper) */}
            <motion.div
              className="absolute inset-x-4 top-3 bottom-3 rounded-xl bg-[#FDFAF7] border border-[#A8978A]/40 card-shadow p-5 flex flex-col items-center justify-between text-center select-none"
              style={{
                zIndex: isCardRevealing ? 35 : 12,
                backgroundImage:
                  'radial-gradient(#66564D08 1px, transparent 1px), linear-gradient(180deg, #FFFFFF 0%, #FDFAF7 100%)',
                backgroundSize: '14px 14px, 100% 100%',
              }}
              initial={false}
              animate={
                isCardExpanding
                  ? {
                      scale: 2.2,
                      opacity: 0,
                      y: -240,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }
                  : isCardRevealing
                  ? {
                      y: -190,
                      scale: 1.04,
                      boxShadow: '0 30px 60px -15px rgba(102, 86, 77, 0.32)',
                      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    }
                  : {
                      y: 0,
                      scale: 0.96,
                    }
              }
            >
              {/* Card Inner Floral Foil Border */}
              <div className="absolute inset-2 border border-[#A8978A]/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 border border-[#DCE8E2] rounded-md pointer-events-none" />

              {/* Card Header (NO Cross!) */}
              <div className="relative pt-1">
                <Sparkles size={18} className="text-[#BA8FA0] mx-auto mb-1" />
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#A8978A]">
                  {siteData.envelope.subHeaderText}
                </p>
              </div>

              {/* Card Names */}
              <div className="my-auto py-2">
                <h2 className="font-script text-3xl sm:text-4xl text-[#43362F] leading-tight">
                  {siteData.couple.brideName} &amp; {siteData.couple.groomName}
                </h2>
                <div className="h-[1px] w-16 bg-[#BA8FA0]/40 mx-auto my-1.5" />
                <p className="font-serif italic text-xs text-[#66564D]">
                  {siteData.envelope.cardHonorText || 'Request the honor of your presence'}
                </p>
              </div>

              {/* Card Footer Details */}
              <div className="pb-1 w-full text-[11px] font-sans text-[#66564D] border-t border-[#A8978A]/20 pt-2 flex items-center justify-between px-3">
                <span className="font-serif">{siteData.couple.weddingDateFormatted.split(',')[1] || 'Nov 28, 2026'}</span>
                <span className="text-[#8EAFA0]">✦</span>
                <span className="font-serif">{siteData.couple.locationCity.split(',')[0]}</span>
              </div>
            </motion.div>

            {/* 3. Gift Wrapper Unfolding Flaps (Left, Right, Bottom in 3D) */}
            {/* Bottom Flap */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-full origin-bottom preserve-3d pointer-events-none z-20"
              initial={false}
              animate={
                isUnwrapped
                  ? {
                      rotateX: -140,
                      opacity: 0,
                      transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                    }
                  : { rotateX: 0, opacity: 1 }
              }
            >
              <div
                className="absolute inset-x-0 bottom-0 h-full bg-[#F8F3EE] border-t border-[#D8D0C9]/70"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
                  backgroundImage:
                    'linear-gradient(to top, #EDE4DC 0%, #FDFAF7 100%)',
                  boxShadow: '0 -4px 12px rgba(102, 86, 77, 0.08)',
                }}
              />
            </motion.div>

            {/* Left Flap */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left preserve-3d pointer-events-none z-20"
              initial={false}
              animate={
                isUnwrapped
                  ? {
                      rotateY: -130,
                      opacity: 0,
                      transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                    }
                  : { rotateY: 0, opacity: 1 }
              }
            >
              <div
                className="absolute inset-y-0 left-0 w-full bg-[#F8F3EE] border-r border-[#D8D0C9]/60"
                style={{
                  clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                  backgroundImage:
                    'linear-gradient(to right, #EDE4DC 0%, #FDFAF7 100%)',
                  boxShadow: '4px 0 12px rgba(102, 86, 77, 0.06)',
                }}
              />
            </motion.div>

            {/* Right Flap */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full origin-right preserve-3d pointer-events-none z-20"
              initial={false}
              animate={
                isUnwrapped
                  ? {
                      rotateY: 130,
                      opacity: 0,
                      transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                    }
                  : { rotateY: 0, opacity: 1 }
              }
            >
              <div
                className="absolute inset-y-0 right-0 w-full bg-[#F8F3EE] border-l border-[#D8D0C9]/60"
                style={{
                  clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                  backgroundImage:
                    'linear-gradient(to left, #EDE4DC 0%, #FDFAF7 100%)',
                  boxShadow: '-4px 0 12px rgba(102, 86, 77, 0.06)',
                }}
              />
            </motion.div>

            {/* 4. Crossed Silk Satin Ribbons (Horizontal & Vertical) */}
            <SatinRibbon isReleased={stage !== 'wrapped'} />

            {/* 5. Top Gift Wrapper Flap (Folds open in 3D when clicked) */}
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top preserve-3d"
              style={{
                zIndex: isUnwrapped ? 10 : 30,
              }}
              initial={false}
              animate={
                isUnwrapped
                  ? {
                      rotateX: 180,
                      transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] },
                    }
                  : {
                      rotateX: 0,
                    }
              }
            >
              {/* Front Face of Top Wrapper Flap */}
              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                  background:
                    'linear-gradient(180deg, #FDFAF7 0%, #F5ECF0 50%, #EDE4DC 100%)',
                  filter: 'drop-shadow(0 8px 14px rgba(102, 86, 77, 0.16))',
                }}
              >
                {/* Flap Gold Embossed Seam Lines */}
                <svg viewBox="0 0 440 280" className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 6,6 L 220,148 L 434,6"
                    fill="none"
                    stroke="#BA8FA0"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                  <path
                    d="M 12,6 L 220,142 L 428,6"
                    fill="none"
                    stroke="#E8D19F"
                    strokeWidth="0.8"
                    opacity="0.8"
                  />
                </svg>
              </div>

              {/* Back Face of Top Flap (visible when unfolded open) */}
              <div
                className="absolute inset-0 backface-hidden"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
                  background:
                    'linear-gradient(0deg, #EDE4DC 0%, #FDFAF7 100%)',
                  transform: 'rotateX(180deg)',
                }}
              />
            </motion.div>

            {/* 6. Authentic Hanging Luxury Gift Tag Attached to Ribbon */}
            <motion.div
              animate={
                stage !== 'wrapped'
                  ? { scale: 0, opacity: 0, rotate: 35 }
                  : { scale: 1, opacity: 1, rotate: -12 }
              }
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-1/2 ml-14 -mt-16 z-35 pointer-events-none hidden sm:flex flex-col items-center p-2.5 px-3 rounded-xl bg-white/95 border border-[#D7BAC5] shadow-md origin-top-left"
            >
              <div className="h-2 w-2 rounded-full border border-[#C9A86A] bg-white mb-0.5 shadow-2xs" />
              <span className="font-serif text-[9px] uppercase tracking-widest text-[#BA8FA0] font-semibold">
                Wedding Gift
              </span>
              <span className="font-script text-base text-[#43362F] leading-none my-0.5">
                For You
              </span>
              <span className="font-serif text-[8px] text-[#A8978A] tracking-wider">
                Sunitha &amp; Prasad
              </span>
            </motion.div>

            {/* 7. Centerpiece 3D Luxury Gift Ribbon Bow (NO monogram, NO cross!) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <GiftBow
                isUntying={isUntying}
                isUntied={stage !== 'wrapped' && !isUntying}
                onClick={handleOpen}
              />
            </div>

            {/* 8. Burst of Celebration Sparkles on Unwrap */}
            {isUnwrapped && (
              <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 360) / 12;
                  const rad = (angle * Math.PI) / 180;
                  const dist = 140;
                  const x = Math.cos(rad) * dist;
                  const y = Math.sin(rad) * dist;

                  return (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                      animate={{
                        x,
                        y,
                        opacity: 0,
                        scale: [0.5, 1.4, 0],
                        rotate: [0, 180],
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="absolute"
                    >
                      <Sparkles
                        className={`h-4 w-4 ${
                          i % 2 === 0 ? 'text-[#BA8FA0]' : 'text-[#8EAFA0]'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Tap Instruction Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: stage === 'wrapped' ? 1 : 0, y: stage === 'wrapped' ? 0 : 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#DCE8E2] bg-[#FDFAF7]/95 px-7 py-3 text-[#66564D] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#BA8FA0] hover:bg-white hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-[#BA8FA0] transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-serif tracking-widest text-sm uppercase">
                {siteData.envelope.buttonText || 'Tap to Unwrap Our Gift'}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BA8FA0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8EAFA0]" />
              </span>
            </button>
            <p className="mt-2 text-[11px] font-sans text-[#A8978A]/80 tracking-wide">
              {siteData.envelope.subNoticeText || 'An interactive wedding gift invitation'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningEnvelope;
