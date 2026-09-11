import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import type { SectionId } from '../types';
import { SECTIONS } from '../data/sections';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  hideName?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSelectSection, hideName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playClick, playHover, playSwitch } = useSound();

  const handleNav = (id: SectionId) => {
    playSwitch();
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 py-3 sm:py-4 md:py-6 select-none z-30 relative backdrop-blur-[2px]">
      {/* Brand title */}
      <div 
        onClick={() => handleNav('home')} 
        onMouseEnter={playHover}
        className={`cursor-pointer group flex items-center gap-2 transition-opacity duration-300 ${
          hideName ? 'opacity-0 pointer-events-none md:opacity-0' : 'opacity-100'
        }`}
        title="Return to Home"
      >
        <div className="w-2 h-2 bg-white rounded-full transition-transform group-hover:scale-150 duration-300" />
        <h1 className="text-sm sm:text-base md:text-xl font-black tracking-wider sm:tracking-widest text-white transition-opacity group-hover:opacity-80 uppercase truncate max-w-[200px] sm:max-w-none">
          {PERSONAL_INFO.name}
        </h1>
      </div>

      {/* Right Controls: Desktop Navigation + Audio Control */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center text-xs md:text-sm font-mono tracking-wider text-white">
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            return (
              <React.Fragment key={sec.id}>
                <button
                  onClick={() => handleNav(sec.id)}
                  onMouseEnter={playHover}
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

        {/* Datacenter Audio Stream Toggle Button */}
        <button
          onClick={() => {
            toggleMute();
            playClick();
          }}
          onMouseEnter={playHover}
          className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
            !isMuted 
              ? 'border-white bg-white text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
              : 'border-white/30 text-white/60 hover:text-white hover:border-white/70 bg-black/40'
          }`}
          title={isMuted ? "Activate Datacenter Ambient Sound" : "Mute Sound"}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">AUDIO: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-60" />
              <span className="hidden sm:inline">AUDIO: OFF</span>
            </>
          )}
        </button>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 border border-white/30 text-white bg-black/60 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/20 p-4 flex flex-col gap-2 backdrop-blur-xl z-50 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          <button
            onClick={() => handleNav('home')}
            className={`text-left px-3 py-2 text-xs font-mono tracking-wider uppercase border border-white/10 ${
              activeSection === 'home' ? 'bg-white text-black font-black' : 'text-white/70'
            }`}
          >
            Home Overview
          </button>
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNav(sec.id)}
                className={`text-left px-3 py-2 text-xs font-mono tracking-wider uppercase border border-white/10 ${
                  isActive ? 'bg-white text-black font-black' : 'text-white/70'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};