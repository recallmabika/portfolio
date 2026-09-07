import React from 'react';
import { Download, Briefcase, ArrowUpRight } from 'lucide-react';

interface ActionButtonsProps {
  onHireClick: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onHireClick }) => {
  return (
    <div className="w-full flex items-center justify-end gap-3 pt-2 pb-1 z-20 select-none">
      {/* Download Official CV */}
      <a
        href="/Recall_Tawanda_Mabika_CV.pdf"
        download="Recall_Tawanda_Mabika_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 border border-white/40 bg-black/70 backdrop-blur-md text-white font-mono text-xs uppercase tracking-wider hover:border-white hover:bg-white hover:text-black transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.06)] group"
      >
        <Download className="w-3.5 h-3.5 text-white/70 group-hover:text-black transition-colors" />
        <span className="font-semibold">Download CV</span>
      </a>

      {/* Hire Now action -> Smoothly switches to Contact Transmission */}
      <button
        onClick={onHireClick}
        className="flex items-center gap-2 px-5 py-2 border border-white bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-200 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
      >
        <Briefcase className="w-3.5 h-3.5 text-black" />
        <span>Hire Now</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};