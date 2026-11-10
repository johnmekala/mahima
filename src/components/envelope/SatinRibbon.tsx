import React from 'react';
import { motion } from 'framer-motion';

interface SatinRibbonProps {
  isReleased: boolean;
}

export const SatinRibbon: React.FC<SatinRibbonProps> = ({ isReleased }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
      {/* Horizontal Silk Ribbon Band */}
      <motion.div
        className="absolute top-1/2 left-0 h-8 sm:h-9 w-full -translate-y-1/2 shadow-xs"
        style={{
          background:
            'linear-gradient(180deg, #FFFFFF 0%, #F5ECF0 25%, #E9D8DE 50%, #BA8FA0 85%, #8E546B 100%)',
        }}
        animate={
          isReleased
            ? {
                scaleY: 0,
                opacity: 0,
                filter: 'blur(4px)',
              }
            : {
                scaleY: 1,
                opacity: 0.96,
                filter: 'blur(0px)',
              }
        }
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Silk sheen highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-85" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E8D19F]" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#6C3E52]/35" />
      </motion.div>

      {/* Vertical Silk Ribbon Band */}
      <motion.div
        className="absolute top-0 left-1/2 w-8 sm:w-9 h-full -translate-x-1/2 shadow-xs"
        style={{
          background:
            'linear-gradient(90deg, #FFFFFF 0%, #F5ECF0 25%, #E9D8DE 50%, #BA8FA0 85%, #8E546B 100%)',
        }}
        animate={
          isReleased
            ? {
                scaleX: 0,
                opacity: 0,
                filter: 'blur(4px)',
              }
            : {
                scaleX: 1,
                opacity: 0.96,
                filter: 'blur(0px)',
              }
        }
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Silk sheen highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/55 to-transparent opacity-85" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-[#E8D19F]" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-[#6C3E52]/35" />
      </motion.div>
    </div>
  );
};

export default SatinRibbon;
