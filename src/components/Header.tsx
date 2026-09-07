import React from 'react';
import type { SectionId } from '../types';
import { SECTIONS } from '../data/sections';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  hideName?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSelectSection, hideName }) => {
  return (
    <header className="w-full flex items-center justify-between px-8 md:px-16 py-6 select-none z-30 relative backdrop-blur-[2px]">
      {/* Brand title */}
      <div 
        onClick={() => onSelectSection('home')} 
        className={`cursor-pointer group flex items-center gap-2.5 transition-opacity duration-300 ${
          hideName ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        title="Return to Home"
      >
        <div className="w-2 h-2 bg-white rounded-full transition-transform group-hover:scale-150 duration-300" />
        <h1 className="text-base md:text-xl font-black tracking-widest text-white transition-opacity group-hover:opacity-80 uppercase">
          {PERSONAL_INFO.name}
        </h1>
      </div>

      {/* Navigation menu - restored to original compact clean size */}
      <nav className="flex items-center text-xs md:text-sm font-mono tracking-wider text-white">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <React.Fragment key={sec.id}>
              <button
                onClick={() => onSelectSection(sec.id)}
                className={`cursor-pointer px-2 py-1 transition-all duration-300 relative uppercase ${
                  isActive 
                    ? 'font-black text-white' 
                    : 'text-white/40 hover:text-white/90'
                }`}
              >
                <span>{sec.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
                )}
              </button>
              {idx < SECTIONS.length - 1 && (
                <span className="mx-1 md:mx-2 text-white/20 select-none font-light">|</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </header>
  );
};