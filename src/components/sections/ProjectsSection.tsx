import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

// Minimalist vector GitHub Icon
const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PERSONAL_INFO.projects[0].id);

  const activeProject = PERSONAL_INFO.projects.find((p) => p.id === selectedProjectId) ?? PERSONAL_INFO.projects[0];

  return (
    <div className="space-y-3 max-w-4xl text-white">
      {/* Header */}
      <div className="border-l-4 border-white pl-4 py-1 flex items-baseline justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            Featured Systems & Production Architectures
          </h2>
          <p className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-widest mt-0.5">
            Verified Engineering Deliverables, Production Repositories & System Plans
          </p>
        </div>
      </div>

      {/* Interactive Project Switcher Tabs */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-white/15 pb-2">
        {PERSONAL_INFO.projects.map((proj) => {
          const isCurrent = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 border uppercase ${
                isCurrent
                  ? 'border-white bg-white text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'border-white/20 bg-black/60 text-white/60 hover:text-white hover:border-white/50'
              }`}
            >
              <span>{proj.title.split('—')[0].trim()}</span>
              {isCurrent && <ChevronRight className="w-3 h-3 text-black" />}
            </button>
          );
        })}
      </div>

      {/* Active Project Comprehensive Technical Spotlight */}
      <div className="border border-white/30 bg-black/80 backdrop-blur-md p-5 relative group shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {/* HUD Crosshairs */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

        {/* Project Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-white/15 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                {activeProject.category}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-white border border-white/20">
                {activeProject.date}
              </span>
            </div>
            <h3 className="text-base md:text-xl font-black text-white uppercase tracking-wide">
              {activeProject.title}
            </h3>
          </div>

          {/* GitHub / External Links */}
          <div className="flex items-center gap-3">
            {activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white bg-white text-black font-mono text-xs font-bold uppercase hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Inspect Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Technical Description */}
        <p className="text-xs md:text-sm leading-relaxed text-white/90 font-light mb-4">
          {activeProject.description}
        </p>

        {/* Key Architecture Highlights */}
        {activeProject.highlights && (
          <div className="space-y-1.5 mb-4 bg-white/[0.02] p-3 border border-white/15">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block mb-1">
              Architectural Highlights & Engineering Standards
            </span>
            {activeProject.highlights.map((h, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2 text-xs md:text-sm text-white/85">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/70 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/15">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-1">Stack:</span>
          {activeProject.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] md:text-xs font-mono px-2 py-0.5 border border-white/25 bg-black text-white/90 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};