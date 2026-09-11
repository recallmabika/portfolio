import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SectionId } from '../types';
import { SECTIONS } from '../data/sections';

interface KineticRingProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
}

export const KineticRing: React.FC<KineticRingProps> = ({ activeSection, onSelectSection }) => {
  const isHome = activeSection === 'home';
  const activeIndex = isHome ? -1 : SECTIONS.findIndex((s) => s.id === activeSection);
  const currentSection = isHome ? null : SECTIONS[activeIndex];

  const rotationDegrees = isHome ? 0 : -(activeIndex * (360 / SECTIONS.length));

  return (
    <div className="relative flex items-center justify-center select-none py-1 w-full max-w-[320px] sm:max-w-[360px] md:max-w-none">
      {/* Outer kinetic stage with responsive scale */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-84 md:h-84 flex items-center justify-center">

        {/* Ambient Glow */}
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" />

        {/* Outer Orbit */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              x: isHome ? 0 : -25,
              scale: isHome ? 0.8 : 1,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            className="w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border border-dashed border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
        </motion.div>

        {/* Ring 2: Solid Ring - Counter-clockwise */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              x: isHome ? 0 : 25,
              scale: isHome ? 0.8 : 1,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            className="w-48 h-48 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full border border-solid border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
        </motion.div>

        {/* Orbiting Section Nodes */}
        {!isHome && (
          <motion.div
            animate={{ rotate: rotationDegrees }}
            transition={{ type: 'spring', stiffness: 45, damping: 12, mass: 0.9 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          >
            {SECTIONS.map((sec, idx) => {
              const angleStep = 360 / SECTIONS.length;
              const currentAngle = idx * angleStep;
              const radius = 95; // adapted for responsive boundary
              const rad = (currentAngle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const isSelected = sec.id === activeSection;

              return (
                <motion.button
                  key={sec.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSection(sec.id);
                  }}
                  style={{
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  className="pointer-events-auto cursor-pointer p-2.5 rounded-full flex items-center justify-center focus:outline-none group z-20"
                  title={sec.label}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-3.5 h-3.5 bg-white shadow-[0_0_15px_#ffffff] ring-4 ring-white/30'
                        : 'w-2 h-2 bg-white/50 group-hover:bg-white group-hover:shadow-[0_0_10px_#ffffff]'
                    }`}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Central Breathing Core Orb */}
        <motion.div
          animate={
            isHome
              ? { scale: [1, 0.78, 1] }
              : { scale: 1 }
          }
          transition={
            isHome
              ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 60, damping: 14 }
          }
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={playHover}
          className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-full bg-black border-2 border-white flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:border-white"
          onClick={() => {
            playSwitch();
            if (isHome) {
              onSelectSection(SECTIONS[0].id);
            } else {
              const nextIdx = (activeIndex + 1) % SECTIONS.length;
              onSelectSection(SECTIONS[nextIdx].id);
            }
          }}
          title={isHome ? "Explore" : "Next Section"}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-white/20 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-white/90 uppercase mt-1.5">
            {isHome ? 'EXPLORE' : 'ROTATE'}
          </span>
        </motion.div>

        {/* Responsive Focused Badge */}
        <div className="absolute left-[62%] sm:left-[66%] md:left-[68%] z-30 pointer-events-none flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isHome ? 'home-badge' : currentSection?.id}
              initial={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 12, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onMouseEnter={playHover}
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 font-mono font-black tracking-wider sm:tracking-widest text-xs sm:text-sm uppercase shadow-[0_0_20px_rgba(255,255,255,0.35)] flex items-center gap-2 select-none pointer-events-auto cursor-pointer border border-white hover:bg-white hover:text-black transition-all active:scale-95"
              onClick={() => {
                playBeep();
                if (isHome) onSelectSection('about');
              }}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span>{isHome ? 'HOME' : currentSection?.badge}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};