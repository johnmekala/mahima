import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface GiftBowProps {
  isUntying: boolean;
  isUntied: boolean;
  onClick: () => void;
}

export const GiftBow: React.FC<GiftBowProps> = ({
  isUntying,
  isUntied,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer select-none group flex items-center justify-center"
      title="Tap to unwrap wedding gift"
    >
      {/* 1. Ambient Breathing Halo Glow */}
      <motion.div
        className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#BA8FA0]/40 via-[#E8D19F]/35 to-[#8EAFA0]/40 blur-xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 2. Main 3D Gift Bow Container */}
      <motion.div
        className="relative z-30 flex items-center justify-center"
        animate={
          isUntying
            ? {
                scale: [1, 1.25, 0.3],
                rotate: [0, -12, 18],
                opacity: [1, 1, 0],
              }
            : isUntied
            ? { opacity: 0, scale: 0 }
            : { scale: 1 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 160 140"
          className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_14px_28px_rgba(102,86,77,0.32)] overflow-visible"
        >
          <defs>
            {/* Silk Satin Dusty Rose & Mauve Multi-stop Gradient */}
            <linearGradient id="ribbonSilkMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#F8ECF2" />
              <stop offset="45%" stopColor="#E9D8DE" />
              <stop offset="75%" stopColor="#BA8FA0" />
              <stop offset="95%" stopColor="#8E546B" />
              <stop offset="100%" stopColor="#6C3E52" />
            </linearGradient>

            <linearGradient id="goldTrimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF9EE" />
              <stop offset="50%" stopColor="#E8D19F" />
              <stop offset="100%" stopColor="#C9A86A" />
            </linearGradient>

            <radialGradient id="centerPearlJewel" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFF7EE" />
              <stop offset="70%" stopColor="#E8D19F" />
              <stop offset="100%" stopColor="#B38E46" />
            </radialGradient>

            <filter id="bowShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#43362F" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Flowing Ribbon Tails with V-notch cuts */}
          <g filter="url(#bowShadow)">
            {/* Left Ribbon Tail */}
            <path
              d="M 72,75
                 C 58,96 38,116 30,136
                 L 45,129
                 L 58,139
                 C 66,118 76,96 78,75 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
            {/* Left tail highlight sheen */}
            <path
              d="M 73,76 C 60,95 44,115 35,132"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Right Ribbon Tail */}
            <path
              d="M 88,75
                 C 102,96 122,116 130,136
                 L 115,129
                 L 102,139
                 C 94,118 84,96 82,75 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
            {/* Right tail highlight sheen */}
            <path
              d="M 87,76 C 100,95 116,115 125,132"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>

          {/* Lower Back Bow Loops */}
          <g filter="url(#bowShadow)">
            {/* Bottom-Left Loop */}
            <path
              d="M 74,68
                 C 44,64 22,78 28,95
                 C 34,107 62,96 76,76 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
            {/* Bottom-Right Loop */}
            <path
              d="M 86,68
                 C 116,64 138,78 132,95
                 C 126,107 98,96 84,76 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
          </g>

          {/* Main Top Upper Bow Loops */}
          <g filter="url(#bowShadow)">
            {/* Top-Left Voluminous Silk Loop */}
            <path
              d="M 76,66
                 C 54,40 20,28 18,52
                 C 16,73 52,77 74,70 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
            {/* Top-Left Silk highlight */}
            <path
              d="M 30,46 C 28,62 48,68 68,67"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.75"
            />
            <path
              d="M 38,54 C 48,62 60,65 72,66"
              fill="none"
              stroke="#5A2C3E"
              strokeWidth="1.5"
              opacity="0.35"
            />

            {/* Top-Right Voluminous Silk Loop */}
            <path
              d="M 84,66
                 C 106,40 140,28 142,52
                 C 144,73 108,77 86,70 Z"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="0.8"
            />
            {/* Top-Right Silk highlight */}
            <path
              d="M 130,46 C 132,62 112,68 92,67"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.75"
            />
            <path
              d="M 122,54 C 112,62 100,65 88,66"
              fill="none"
              stroke="#5A2C3E"
              strokeWidth="1.5"
              opacity="0.35"
            />
          </g>

          {/* Center Tied Ribbon Knot with Luxury Gold & Pearl Jewel (Zero Monogram, Zero Cross) */}
          <g filter="url(#bowShadow)">
            {/* Fabric knot wrap */}
            <ellipse
              cx="80"
              cy="68"
              rx="17"
              ry="15"
              fill="url(#ribbonSilkMain)"
              stroke="#6C3E52"
              strokeWidth="1"
            />
            {/* Knot creases */}
            <path
              d="M 71,61 C 76,68 76,75 71,77"
              stroke="#5A2C3E"
              strokeWidth="1.3"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M 89,61 C 84,68 84,75 89,77"
              stroke="#5A2C3E"
              strokeWidth="1.3"
              fill="none"
              opacity="0.55"
            />

            {/* Central Pearl & Gold Jewel Brooch */}
            <circle
              cx="80"
              cy="68"
              r="11"
              fill="url(#centerPearlJewel)"
              stroke="#C9A86A"
              strokeWidth="1.4"
            />
            {/* Inner Gold Beaded Ring */}
            <circle
              cx="80"
              cy="68"
              r="8"
              fill="none"
              stroke="#E8D19F"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
            />
            {/* Center Crystal Sparkle Core */}
            <circle
              cx="80"
              cy="68"
              r="4.5"
              fill="#FFFFFF"
              stroke="#C9A86A"
              strokeWidth="0.6"
            />
            {/* Gleam Specular Highlight */}
            <circle
              cx="78"
              cy="66"
              r="1.8"
              fill="#FFFFFF"
            />
          </g>
        </svg>

        {/* Small "Tap to Unwrap" floating pill badge */}
        <div className="absolute -bottom-3 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#D7BAC5] shadow-xs text-[11px] font-serif uppercase tracking-wider text-[#8E546B] flex items-center gap-1.5 group-hover:border-[#BA8FA0] transition-colors">
          <Sparkles className="h-3 w-3 text-[#BA8FA0]" />
          <span>Tap to Unwrap</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GiftBow;
