import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Background track (nearly invisible whisper) */}
      <div className="w-full h-[3px] bg-black/5" />

      {/* Active Glowing Scroll Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#8EAFA0] via-[#BA8FA0] via-60% to-[#E9D8DE] shadow-[0_1px_6px_rgba(186,143,160,0.4)]"
      />
    </div>
  );
};

export default ScrollProgressBar;

