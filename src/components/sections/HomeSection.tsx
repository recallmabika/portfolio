import React, { useState, useEffect } from 'react';
import { GitCommit, ExternalLink, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface LiveEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

export const HomeSection: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [recentEvents, setRecentEvents] = useState<LiveEvent[]>([]);
  const [latestCommitTime, setLatestCommitTime] = useState<string>('Live');

  // Fetch live contribution calendar SVG dynamically on mount
  useEffect(() => {
    // 1. Fetch live SVG from dynamic chart service with cache-busting timestamp
    const timestamp = Date.now();
    fetch(`https://ghchart.rshah.org/ffffff/recallmabika?t=${timestamp}`)
      .then((res) => {
        if (!res.ok) throw new Error('Live chart fetch failed');
        return res.text();
      })
      .then((svg) => {
        if (svg && svg.includes('<svg')) {
          setSvgContent(svg);
        }
      })
      .catch(() => {
        // Fallback to locally bundled verified SVG if offline or network error
        fetch('/github-contributions.svg')
          .then((res) => res.text())
          .then((fallbackSvg) => setSvgContent(fallbackSvg))
          .catch(() => {});
      });

    // 2. Fetch live recent commit / activity events from official GitHub REST API (No auth token required)
    fetch('https://api.github.com/users/recallmabika/events?per_page=5')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRecentEvents(data.slice(0, 2));
          const latest = data[0];
          if (latest?.created_at) {
            const date = new Date(latest.created_at);
            setLatestCommitTime(date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row items-end justify-between gap-6 text-white">
      {/* Left Column: Academic & Specialization headline */}
      <div className="space-y-2.5 max-w-2xl flex-1">
        <div className="border-l-4 border-white pl-4 py-0.5">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-wider text-white">
            {PERSONAL_INFO.title}
          </h2>
          <p className="text-xs md:text-sm font-mono text-white/70 uppercase tracking-widest mt-0.5 font-medium">
            {PERSONAL_INFO.institution} • {PERSONAL_INFO.location}
          </p>
        </div>

        <p className="text-sm md:text-base leading-relaxed text-white/90 font-light">
          {PERSONAL_INFO.about.headline}. Specializing in InfoSec threat intelligence, enterprise network bridging, and database administration with PostgreSQL & MySQL.
        </p>

        <div className="pt-0.5 flex items-center gap-2">
          <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-white/40 uppercase">
            [USE SCROLL OR NAVIGATION MENU TO EXPLORE]
          </span>
        </div>
      </div>

      {/* Right Column: Live GitHub Contribution / Activity Graph HUD Panel */}
      <div className="w-full md:w-auto flex-shrink-0">
        <div className="relative group select-none border border-white/30 bg-black/90 backdrop-blur-md p-3 shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:border-white transition-all duration-300">
          {/* HUD Crosshairs */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

          {/* Graph Header */}
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/15 mb-2">
            <div className="flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-white/80 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-white uppercase">
                GitHub Telemetry
              </span>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>@recallmabika</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Live Dynamic Contribution Matrix */}
          <div className="overflow-hidden max-w-[340px] md:max-w-[420px] flex items-center justify-center py-1 bg-black">
            {svgContent ? (
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="w-full h-auto flex items-center justify-center filter invert contrast-150 transition-opacity duration-300 [&>svg]:w-full [&>svg]:h-auto"
              />
            ) : (
              <img
                src="/github-contributions.svg"
                alt="Recall Tawanda Mabika GitHub Contributions"
                className="w-full h-auto object-contain filter invert contrast-150"
              />
            )}
          </div>

          {/* Live Recent Event Feed & Sync Status */}
          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50 uppercase">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-white/80 truncate max-w-[200px]">
                {recentEvents[0]
                  ? `${recentEvents[0].type.replace('Event', '')} on ${recentEvents[0].repo.name.replace('recallmabika/', '')}`
                  : 'Live GitHub Pipeline'}
              </span>
            </div>
            <span className="text-emerald-400 font-semibold">{latestCommitTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};