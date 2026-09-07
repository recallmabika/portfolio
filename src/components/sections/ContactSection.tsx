import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="space-y-3 max-w-4xl text-white">
      <div className="border-l-2 border-white pl-4 py-0.5">
        <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">
          Direct Communications & Verification
        </h2>
        <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
          Harare / Gweru, Zimbabwe • Open for Internships & High-Impact Engineering Roles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="space-y-2.5">
          <p className="text-xs md:text-sm leading-relaxed text-white/80 font-light">
            {PERSONAL_INFO.contact.status}
          </p>
          
          <div className="p-3 border border-white/30 bg-black/60 backdrop-blur-sm space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-white/50 uppercase">
              <span>Direct Email</span>
              <span className="text-emerald-400">PVI Primary</span>
            </div>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-mono font-bold text-xs md:text-sm text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors block break-all"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 border border-white/20 bg-black/50">
              <span className="text-[9px] font-mono text-white/50 uppercase block">Phone / Call</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-mono text-white hover:underline">
                {PERSONAL_INFO.phone}
              </a>
            </div>
            <div className="p-2.5 border border-white/20 bg-black/50">
              <span className="text-[9px] font-mono text-white/50 uppercase block">WhatsApp</span>
              <a 
                href={`https://wa.me/263779466786`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline"
              >
                +263 77 946 6786
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-2">
          <input
            type="text"
            placeholder="SUBJECT / INQUIRING ORGANIZATION"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider"
          />
          <textarea
            rows={3}
            placeholder="MESSAGE BODY..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider resize-none"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          >
            DISPATCH TRANSMISSION
          </button>
        </form>
      </div>
    </div>
  );
};