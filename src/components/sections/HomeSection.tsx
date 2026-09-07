import React, { useState, useEffect } from 'react';
import { GitCommit, ExternalLink, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

interface ContributionsApiResponse {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: ContributionDay[];
}

export const HomeSection: React.FC = () => {
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    // Fetch live public contribution data dynamically
    fetch('https://github-contributions-api.jogruber.de/v4/recallmabika?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('API response failed');
        return res.json();
      })
      .then((data: ContributionsApiResponse) => {
        if (data && data.total) {
          setTotalContributions(data.total.lastYear);
        }

        if (data && Array.isArray(data.contributions)) {
          const allDays = data.contributions;
          const chunkedWeeks: ContributionDay[][] = [];
          let currentWeek: ContributionDay[] = [];

          allDays.forEach((day, index) => {
            currentWeek.push(day);
            if (currentWeek.length === 7 || index === allDays.length - 1) {
              chunkedWeeks.push(currentWeek);
              currentWeek = [];
            }
          });

          // Show the last 24 weeks for a crisp, wide radar grid
          setWeeks(chunkedWeeks.slice(-24));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching live GitHub contributions:', err);
        setLoading(false);
      });
  }, []);

  // Pure Black & Snow-White monochrome scale
  // Level 0: Pure pitch dark tile with subtle border
  // Level 1: Subtle white/25 tint
  // Level 2: Medium white/50 glow
  // Level 3: Bright white/80
  // Level 4: Pure snow-white (#ffffff) with intense bloom
  const getDotColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-white/20 border-white/30';
      case 2:
        return 'bg-white/45 border-white/60 shadow-[0_0_6px_rgba(255,255,255,0.4)]';
      case 3:
        return 'bg-white/75 border-white/80 shadow-[0_0_10px_rgba(255,255,255,0.7)]';
      case 4:
        return 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,1)]';
      default:
        return 'bg-[#0d0f12] border-white/10';
    }
  };

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
        <div className="relative group select-none border border-white/40 bg-black/95 backdrop-blur-md p-3.5 shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:border-white transition-all duration-300">
          {/* HUD Crosshairs */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

          {/* Graph Header: Live Commit Count & Profile Link */}
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/15 mb-2.5">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-white animate-pulse" />
              <span className="text-xs font-mono font-black tracking-wider text-white uppercase">
                {totalContributions !== null ? (
                  <span className="text-white font-extrabold">{totalContributions} COMMITS</span>
                ) : (
                  <span>LIVE COMMITS</span>
                )}
              </span>
              <span className="text-[10px] font-mono text-white/50 uppercase hidden sm:inline">
                IN LAST YEAR
              </span>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-mono text-white/60 hover:text-white transition-colors"
            >
              <span>@recallmabika</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Live GitHub Matrix Grid with Pure Monochrome Snow-White Dots */}
          <div className="py-1">
            {loading ? (
              <div className="h-20 flex items-center justify-center text-xs font-mono text-white/40">
                <span className="animate-pulse">STREAMING LIVE GITHUB MATRIX...</span>
              </div>
            ) : (
              <div className="flex gap-1 overflow-x-auto pb-1 max-w-[340px] sm:max-w-[420px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1 flex-shrink-0">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-none border ${getDotColor(
                          day.level
                        )} transition-all duration-150 hover:scale-125 cursor-pointer`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Telemetry Footer: Tooltip info & Live Status */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50 uppercase">
            <div>
              {hoveredDay ? (
                <span className="text-white font-bold">
                  {hoveredDay.count} {hoveredDay.count === 1 ? 'commit' : 'commits'} on {hoveredDay.date}
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2 h-2 bg-[#0d0f12] border border-white/10 inline-block" />
                  <span className="w-2 h-2 bg-white/20 border border-white/30 inline-block" />
                  <span className="w-2 h-2 bg-white/45 border border-white/60 inline-block" />
                  <span className="w-2 h-2 bg-white/75 border border-white/80 inline-block" />
                  <span className="w-2 h-2 bg-white border border-white inline-block shadow-[0_0_4px_#fff]" />
                  <span>More</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-white/80 animate-pulse" />
              <span className="text-white font-bold">Live Stream</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};