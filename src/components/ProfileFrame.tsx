import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ProfileFrame: React.FC = () => {
  return (
    <div className="relative group select-none w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px]">
      {/* Outer subtle glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-none blur-md opacity-40 group-hover:opacity-100 transition duration-500" />

      <div className="relative border border-white/50 bg-black/90 backdrop-blur-md p-3 sm:p-4 shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-white flex flex-col justify-between">
        {/* Precision HUD corner crosshairs */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

        {/* TOP BAR: Full Name & Availability status */}
        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15 mb-2.5">
          <h3 className="text-xs sm:text-sm md:text-base font-black tracking-wider sm:tracking-widest text-white uppercase truncate">
            {PERSONAL_INFO.name}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-bold">
              HIRE
            </span>
          </div>
        </div>

        {/* MIDDLE: Photo on left, Details on right */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2.5">
          {/* Profile Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-none border border-white/80 overflow-hidden bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img 
                src="/profile.jpg" 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -inset-1 border border-white/30 border-dashed pointer-events-none animate-spin-slow" />
          </div>

          {/* Details Column */}
          <div className="flex-1 min-w-0 space-y-1">
            <span className="inline-block px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-black bg-white text-black uppercase tracking-wider truncate max-w-full">
              {PERSONAL_INFO.rolesBadge}
            </span>

            <p className="text-[10px] sm:text-[11px] font-mono text-white/90 tracking-tight leading-snug truncate">
              {PERSONAL_INFO.specialization}
            </p>

            <p className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-wider uppercase truncate">
              {PERSONAL_INFO.institution}
            </p>
          </div>
        </div>

        {/* BOTTOM BOTTOM BAR: Direct Contact Numbers (sm font size) */}
        <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2 text-xs sm:text-sm font-mono">
          {/* WhatsApp */}
          <a
            href="https://wa.me/263779466786"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/85 hover:text-emerald-400 transition-colors group/wa truncate"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">{PERSONAL_INFO.whatsapp}</span>
          </a>

          {/* Call Line */}
          <a
            href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors group/phone truncate"
            title="Direct Call"
          >
            <Phone className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
            <span className="font-semibold">{PERSONAL_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};