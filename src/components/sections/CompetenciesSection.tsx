import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const CompetenciesSection: React.FC = () => {
  return (
    <div className="space-y-3.5 max-w-4xl text-white">
      <div className="border-l-4 border-white pl-4 py-1">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
          Technical Competencies & Systems Expertise
        </h2>
        <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest mt-0.5">
          Verified Proficiencies from Midlands State University & Enterprise Deployments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {PERSONAL_INFO.competencies.map((cat, idx) => (
          <div 
            key={idx} 
            className="border border-white/20 p-3.5 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-black/50"
          >
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/10">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <h3 className="font-mono font-bold text-xs md:text-sm tracking-wider text-white uppercase">
                {cat.category}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-2 py-0.5 text-[11px] md:text-xs font-mono border border-white/20 bg-white/[0.03] text-white/90 hover:border-white/60 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};