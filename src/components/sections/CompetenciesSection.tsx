import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const CompetenciesSection: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl text-white">
      <div className="border-l-4 border-white pl-4 py-1">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
          Technical Competencies & Systems Expertise
        </h2>
        <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest mt-0.5">
          Verified Proficiencies from Midlands State University & Enterprise Deployments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {PERSONAL_INFO.competencies.map((cat, idx) => (
          <div 
            key={idx} 
            className="border border-white/25 p-4 bg-black/70 backdrop-blur-sm transition-all duration-300 hover:border-white/70"
          >
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/15">
              <span className="w-2 h-2 bg-white rounded-full" />
              <h3 className="font-mono font-bold text-xs md:text-sm tracking-wider text-white uppercase">
                {cat.category}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-2.5 py-1 text-xs md:text-sm font-mono border border-white/25 bg-white/5 text-white/95 hover:border-white hover:text-white transition-colors cursor-default font-medium"
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