import React from 'react';

interface MonogramSPProps {
  size?: number;
  className?: string;
  bordered?: boolean;
}

export const MonogramSP: React.FC<MonogramSPProps> = ({
  size = 40,
  className = '',
  bordered = true,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full ${
        bordered ? 'border border-[#D7BAC5]/60 shadow-xs' : ''
      } ${className}`}
      aria-label="Sunitha & Prasad Wedding Monogram"
    >
      <img
        src="/monogram.jpg"
        alt="S & P Monogram"
        className="w-full h-full object-cover select-none pointer-events-none"
        loading="eager"
      />
    </div>
  );
};

export default MonogramSP;
