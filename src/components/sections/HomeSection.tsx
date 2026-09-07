import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const HomeSection: React.FC = () => {
  return (
    <div className="space-y-3 max-w-3xl text-white">
      <div className="border-l-4 border-white pl-5 py-1">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white">
          {PERSONAL_INFO.title}
        </h2>
        <p className="text-sm md:text-base font-mono text-white/70 uppercase tracking-widest mt-1 font-medium">
          {PERSONAL_INFO.institution} • {PERSONAL_INFO.location}
        </p>
      </div>

      <p className="text-base md:text-lg leading-relaxed text-white/90 font-light">
        {PERSONAL_INFO.about.headline}. Specializing in InfoSec threat intelligence, enterprise network bridging, and database administration with PostgreSQL & MySQL.
      </p>

      <div className="pt-1 flex items-center gap-2">
        <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-white/40 uppercase">
          [USE SCROLL OR NAVIGATION MENU TO EXPLORE]
        </span>
      </div>
    </div>
  );
};