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

  // In active section: rotate to point active item toward the horizontal badge
  const rotationDegrees = isHome ? 0 : -(activeIndex * (360 / SECTIONS.length));

  return (
    <div className="relative flex items-center select-none py-2">
      {/* Outer kinetic stage */}
      <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">

        {/* Ambient Glow */}
        <div className="absolute w-64 h-64 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" />

        {/* =========================================================================
            RING 1: DASHED RING - Rotates CLOCKWISE continuously
            In Home mode: Concentric ring (centered, radius matched to image)
            In Section mode: Shifts left to form the classic interlocking dual-ring geometry
           ========================================================================= */}
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
              x: isHome ? 0 : -35,
              width: isHome ? '180px' : '230px',
              height: isHome ? '180px' : '230px',
              borderColor: isHome ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.75)',
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            className="rounded-full border-2 border-dashed border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
        </motion.div>

        {/* =========================================================================
            RING 2: SOLID RING - Rotates ANTI-CLOCKWISE continuously
            In Home mode: Outer concentric ring (centered)
            In Section mode: Shifts right to complete interlocking dual-ring system
           ========================================================================= */}
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
              x: isHome ? 0 : 35,
              width: isHome ? '220px' : '230px',
              height: isHome ? '220px' : '230px',
              borderColor: isHome ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.75)',
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            className="rounded-full border-2 border-solid border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
        </motion.div>

        {/* =========================================================================
            ORBITING SECTION NODES (Navigational layer)
            Only visible when exploring other sections
           ========================================================================= */}
        {!isHome && (
          <motion.div
            animate={{ rotate: rotationDegrees }}
            transition={{ type: 'spring', stiffness: 45, damping: 12, mass: 0.9 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          >
            {SECTIONS.map((sec, idx) => {
              const angleStep = 360 / SECTIONS.length;
              const currentAngle = idx * angleStep;
              const radius = 118;
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
                  className="pointer-events-auto cursor-pointer p-3 rounded-full flex items-center justify-center focus:outline-none group z-20"
                  title={`${sec.label}`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-4 h-4 bg-white shadow-[0_0_15px_#ffffff] ring-4 ring-white/30'
                        : 'w-2.5 h-2.5 bg-white/50 group-hover:bg-white group-hover:shadow-[0_0_10px_#ffffff]'
                    }`}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* =========================================================================
            CENTRAL BLACK CORE ORB
            In Home state: breathes continuously big, small, big, small (pulse scale)
            Clicking cycles / navigates
           ========================================================================= */}
        <motion.div
          animate={
            isHome
              ? {
                  scale: [1, 0.72, 1], // Big -> Small -> Big
                }
              : { scale: 1 }
          }
          transition={
            isHome
              ? {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { type: 'spring', stiffness: 60, damping: 14 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className="relative z-20 w-24 h-24 md:w-28 md:h-28 rounded-full bg-black border-2 border-white flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:border-white"
          onClick={() => {
            if (isHome) {
              onSelectSection(SECTIONS[0].id);
            } else {
              const nextIdx = (activeIndex + 1) % SECTIONS.length;
              onSelectSection(SECTIONS[nextIdx].id);
            }
          }}
          title={isHome ? "Click to start navigation" : "Click core to rotate"}
        >
          {/* Inner core radar indicator */}
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-white/20 animate-ping" />
            <span className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-white/90 uppercase mt-2">
            {isHome ? 'EXPLORE' : 'ROTATE'}
          </span>
        </motion.div>

        {/* =========================================================================
            FOCUSED SECTION INVERTED BADGE
            In Home mode: Shows HOME (matching your reference screenshot)
            In Section mode: Shows the active section badge
           ========================================================================= */}
        <div className="absolute left-[66%] md:left-[70%] z-30 pointer-events-none flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isHome ? 'home-badge' : currentSection?.id}
              initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="bg-black text-white px-7 py-3 font-mono font-black tracking-widest text-sm md:text-base uppercase shadow-[0_0_25px_rgba(255,255,255,0.35)] flex items-center gap-2.5 select-none pointer-events-auto cursor-pointer border-2 border-white hover:bg-white hover:text-black transition-all active:scale-95"
              onClick={() => {
                if (isHome) onSelectSection('about');
              }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>{isHome ? 'HOME' : currentSection?.badge}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};