import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl text-white">
      <div className="border-l-4 border-white pl-4 py-1">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
          Key Projects & Field Deployments
        </h2>
        <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest mt-0.5">
          Verifiable Engineering Deliverables & Outage Resolutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {PERSONAL_INFO.projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="border border-white/25 p-4 bg-black/70 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-white hover:bg-white/[0.03]"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-mono tracking-wider text-white/60 uppercase">
                  {proj.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-black font-bold">
                  {proj.date}
                </span>
              </div>
              <h3 className="font-bold text-sm md:text-base text-white tracking-wide uppercase mb-2">
                {proj.title}
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-white/90 font-light mb-3">
                {proj.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/15">
              {proj.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx}
                  className="text-[10px] md:text-xs font-mono px-2 py-0.5 border border-white/25 text-white/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};