import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  isBreaking: boolean;
  isBroken: boolean;
  onClick: () => void;
  borderText?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  isBreaking,
  isBroken,
  onClick,
  borderText = 'LOVE NEVER FAILS • 1 COR 13:8 •',
}) => {
  return (
    <div className="relative cursor-pointer select-none" onClick={onClick}>
      {/* Outer Glow on hover */}
      <motion.div
        className="absolute -inset-3 rounded-full bg-[#E9D8DE]/40 blur-md pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full"
        animate={
          isBreaking
            ? {
                scale: [1, 1.15, 0.8],
                opacity: [1, 1, 0],
                rotate: [0, -8, 12],
              }
            : isBroken
            ? { opacity: 0, scale: 0 }
            : { scale: 1 }
        }
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.45 }}
      >
        {/* Realistic Melted Wax Edge with SVG */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full drop-shadow-[0_8px_16px_rgba(102,86,77,0.35)]"
        >
          <defs>
            <radialGradient id="waxGradient" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F5ECF0" />
              <stop offset="25%" stopColor="#E9D8DE" />
              <stop offset="65%" stopColor="#BA8FA0" />
              <stop offset="100%" stopColor="#8E546B" />
            </radialGradient>
            <filter id="waxEmboss">
              <feDropShadow dx="-1" dy="-1" stdDeviation="1" floodColor="#FFFFFF" floodOpacity="0.6" />
              <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodColor="#5A2C3E" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Melted organic wax drops outline */}
          <path
            d="M 50,4
               C 62,3 74,7 82,16
               C 91,25 96,37 96,50
               C 97,63 92,76 83,84
               C 74,93 61,97 49,96
               C 36,97 23,92 15,83
               C 6,74 3,61 4,48
               C 3,36 8,24 17,15
               C 26,6 38,3 50,4 Z"
            fill="url(#waxGradient)"
            stroke="#7D445B"
            strokeWidth="0.8"
          />

          {/* Inner ring ridge */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#8E546B"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Embossed Latin & Scripture lettering along border */}
          <path
            id="textPathSeal"
            d="M 20,50 A 30,30 0 1,1 80,50 A 30,30 0 1,1 20,50"
            fill="none"
          />
          <text fontSize="5.5" fill="#5A283B" letterSpacing="2" opacity="0.85" className="font-serif">
            <textPath href="#textPathSeal" startOffset="8%">
              {borderText}
            </textPath>
          </text>

          {/* Embossed Floral Monogram Medallion in center (No Cross) */}
          <g filter="url(#waxEmboss)">
            <circle cx="50" cy="50" r="16" fill="#F5ECF0" stroke="#683447" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="12" fill="none" stroke="#BA8FA0" strokeWidth="0.8" strokeDasharray="2 2" />
            <path
              d="M 50,42 C 46,38 42,42 42,46 C 42,52 50,58 50,58 C 50,58 58,52 58,46 C 58,42 54,38 50,42 Z"
              fill="#BA8FA0"
              stroke="#683447"
              strokeWidth="0.6"
            />
          </g>
        </svg>

        {/* Realistic crack lines during break */}
        {isBreaking && (
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none z-20">
            <path
              d="M 50,4 L 48,32 L 53,50 L 46,70 L 51,96"
              stroke="#3D1825"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 48,32 L 28,40"
              stroke="#3D1825"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 53,50 L 78,56"
              stroke="#3D1825"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.div>
    </div>
  );
};

