import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl text-white">
      <div className="border-l-4 border-white pl-4 py-1 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            {PERSONAL_INFO.about.headline}
          </h2>
          <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest mt-0.5">
            {PERSONAL_INFO.institution} • {PERSONAL_INFO.location}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-white/80">
          <span className="px-2.5 py-1 border border-white/30 bg-white/5 font-semibold">MSU Level 2.2</span>
          <span className="px-2.5 py-1 border border-white/30 bg-white/5 font-semibold">Expected 2028</span>
        </div>
      </div>

      <p className="text-sm md:text-base leading-relaxed text-white/95 font-normal">
        {PERSONAL_INFO.about.summary}
      </p>

      {/* Grid of Verified Roles & Leadership with larger readable typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {PERSONAL_INFO.about.roles.map((item, idx) => (
          <div 
            key={idx} 
            className="border border-white/25 p-4 bg-black/70 backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/[0.04]"
          >
            <div className="flex justify-between items-start mb-1.5">
              <h4 className="font-bold text-sm md:text-base text-white tracking-wide uppercase">
                {item.role}
              </h4>
              <span className="text-xs font-mono text-white/60 tracking-wider">
                {item.period}
              </span>
            </div>
            <p className="text-xs md:text-sm font-mono text-white/70 mb-2 font-medium">{item.org}</p>
            <p className="text-xs md:text-sm leading-relaxed text-white/90 font-light">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};