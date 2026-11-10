import React from 'react';

// Delicate embossed Christian Cross with floral accent
export const ChristianCross: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#A8978A]',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* Soft drop shadow */}
    <filter id="softCrossGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#66564D" floodOpacity="0.15" />
    </filter>
    {/* Cross beam vertical */}
    <rect
      x="22"
      y="6"
      width="4"
      height="36"
      rx="2"
      fill="currentColor"
      filter="url(#softCrossGlow)"
    />
    {/* Cross beam horizontal */}
    <rect
      x="12"
      y="16"
      width="24"
      height="4"
      rx="2"
      fill="currentColor"
      filter="url(#softCrossGlow)"
    />
    {/* Delicate center floral diamond */}
    <circle cx="24" cy="18" r="3" fill="#DCE8E2" stroke="currentColor" strokeWidth="1" />
    {/* Tiny olive leaf accents */}
    <path
      d="M27 15C30 14 31 12 31 12C31 12 29 14 28 17"
      stroke="#8EAFA0"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M21 15C18 14 17 12 17 12C17 12 19 14 20 17"
      stroke="#8EAFA0"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// Vintage ornamental floral divider
export const FloralDivider: React.FC<{ className?: string; showCross?: boolean }> = ({
  className = '',
  showCross = true,
}) => (
  <div className={`flex items-center justify-center gap-3 my-6 opacity-85 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#A8978A]/40 to-[#A8978A]/80" />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A8978A]">
      <path
        d="M12 2C12 2 13.5 8 18 8C22.5 8 22 12 22 12C22 12 18 11.5 18 16C18 20.5 12 22 12 22C12 22 12 16 7.5 16C3 16 2 12 2 12C2 12 6.5 12 6.5 7.5C6.5 3 12 2 12 2Z"
        fill="#E9D8DE"
        stroke="#A8978A"
        strokeWidth="0.8"
      />
    </svg>
    {showCross && (
      <div className="relative -top-[1px]">
        <ChristianCross size={20} className="text-[#66564D]" />
      </div>
    )}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A8978A] rotate-180">
      <path
        d="M12 2C12 2 13.5 8 18 8C22.5 8 22 12 22 12C22 12 18 11.5 18 16C18 20.5 12 22 12 22C12 22 12 16 7.5 16C3 16 2 12 2 12C2 12 6.5 12 6.5 7.5C6.5 3 12 2 12 2Z"
        fill="#E9D8DE"
        stroke="#A8978A"
        strokeWidth="0.8"
      />
    </svg>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#A8978A]/40 to-[#A8978A]/80" />
  </div>
);

// Open Bible SVG Motif
export const OpenBibleIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#66564D]',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Page */}
    <path
      d="M32 14C24 10 12 10 8 12V48C12 46 24 46 32 50V14Z"
      fill="#FDFAF7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Right Page */}
    <path
      d="M32 14C40 10 52 10 56 12V48C52 46 40 46 32 50V14Z"
      fill="#FDFAF7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Page spine & depth */}
    <path d="M32 14V50" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 48C12 46 24 46 32 50" stroke="currentColor" strokeWidth="2" />
    <path d="M56 48C52 46 40 46 32 50" stroke="currentColor" strokeWidth="2" />
    {/* Scripture lines on left */}
    <line x1="14" y1="20" x2="26" y2="20" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="26" x2="26" y2="26" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="32" x2="24" y2="32" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="38" x2="22" y2="38" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    {/* Scripture lines on right */}
    <line x1="38" y1="20" x2="50" y2="20" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="38" y1="26" x2="50" y2="26" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="38" y1="32" x2="48" y2="32" stroke="#A8978A" strokeWidth="1.5" strokeLinecap="round" />
    {/* Cross Bookmark hanging down */}
    <path
      d="M32 14L32 54"
      stroke="#BA8FA0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />
    <rect x="30" y="52" width="4" height="7" rx="1" fill="#BA8FA0" />
    <rect x="28" y="54" width="8" height="2" rx="0.5" fill="#BA8FA0" />
  </svg>
);

// Intertwined Wedding Rings SVG Motif
export const WeddingRingsIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#A8978A]',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left ring */}
    <circle
      cx="24"
      cy="24"
      r="16"
      stroke="#A8978A"
      strokeWidth="3.5"
      fill="none"
      className="drop-shadow-sm"
    />
    <circle
      cx="24"
      cy="24"
      r="12"
      stroke="#DCE8E2"
      strokeWidth="1.2"
      strokeDasharray="2 3"
      fill="none"
    />
    {/* Right ring intertwined */}
    <circle
      cx="40"
      cy="24"
      r="16"
      stroke="#8EAFA0"
      strokeWidth="3.5"
      fill="none"
      className="drop-shadow-sm"
    />
    <circle
      cx="40"
      cy="24"
      r="12"
      stroke="#E9D8DE"
      strokeWidth="1.2"
      strokeDasharray="2 3"
      fill="none"
    />
    {/* Small sparkling diamond on bride's ring */}
    <polygon
      points="24,6 27,10 24,14 21,10"
      fill="#FDFAF7"
      stroke="#66564D"
      strokeWidth="1"
    />
    <circle cx="24" cy="10" r="1.5" fill="#BA8FA0" />
  </svg>
);

