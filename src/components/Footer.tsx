import React from 'react';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Minimalist vector icons for GitHub and LinkedIn matching pure black & white design
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/15 px-8 md:px-16 py-3.5 md:py-4 flex flex-wrap items-center justify-between text-xs md:text-sm font-mono tracking-wider text-white/70 bg-black/80 backdrop-blur-md select-none z-30 relative">
      {/* Brand & Year status */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-white font-semibold">@{PERSONAL_INFO.year}</span>
        <span className="hidden sm:inline text-white/40">•</span>
        <span className="hidden sm:inline">{PERSONAL_INFO.name}</span>
      </div>

      {/* External Channels with verified icons */}
      <div className="flex items-center gap-6 md:gap-10">
        <a 
          href={`mailto:${PERSONAL_INFO.email}`}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          title="Direct Email"
        >
          <Mail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white font-mono">
            {PERSONAL_INFO.email}
          </span>
        </a>

        <a 
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group uppercase"
          title="LinkedIn Profile"
        >
          <LinkedInIcon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
          <span>LinkedIn</span>
        </a>

        <a 
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group uppercase"
          title="GitHub Repositories"
        >
          <GitHubIcon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};