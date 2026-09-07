import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ProfileFrame: React.FC = () => {
  return (
    <div className="relative group select-none">
      {/* Outer subtle glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-none blur-md opacity-40 group-hover:opacity-100 transition duration-500" />

      <div className="relative w-80 md:w-96 border border-white/50 bg-black/90 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-white flex flex-col justify-between">
        {/* Precision HUD corner crosshairs */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

        {/* TOP: Full Name & Availability status clearly on top of photo */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/15 mb-3">
          <h3 className="text-sm md:text-base font-black tracking-widest text-white uppercase truncate">
            {PERSONAL_INFO.name}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-bold">
              HIRE
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION: Photo on left, Details on right with comfortable spacing */}
        <div className="flex items-center gap-4">
          {/* Profile Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-18 h-18 md:w-20 md:h-20 rounded-none border border-white/80 overflow-hidden bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img 
                src="/profile.jpg" 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Spinning dashed perimeter */}
            <div className="absolute -inset-1 border border-white/30 border-dashed pointer-events-none animate-spin-slow" />
          </div>

          {/* Details Column */}
          <div className="flex-1 min-w-0 space-y-1">
            <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-black bg-white text-black uppercase tracking-wider">
              {PERSONAL_INFO.rolesBadge}
            </span>

            <p className="text-[11px] font-mono text-white/90 tracking-tight leading-snug">
              {PERSONAL_INFO.specialization}
            </p>

            <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase">
              {PERSONAL_INFO.institution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};