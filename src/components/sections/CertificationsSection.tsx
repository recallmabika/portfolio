import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [activeCertModal, setActiveCertModal] = useState<string | null>(null);

  return (
    <div className="space-y-3 max-w-4xl text-white">
      <div className="border-l-2 border-white pl-4 py-0.5 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">
            Certifications & Industry Credentials
          </h2>
          <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
            Verified Accreditations from CyberEd, arcX, Deep Learning IndabaX, Cisco & Microsoft
          </p>
        </div>
      </div>

      {/* Grid of Verified Certifications */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
        {PERSONAL_INFO.certifications.map((cert, idx) => (
          <div 
            key={idx} 
            className="border border-white/20 p-3 bg-black/70 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-white hover:bg-white/[0.04]"
          >
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-white/50 mb-1">
                <span>{cert.date}</span>
                {cert.id && <span className="text-white/80 font-bold">{cert.id}</span>}
              </div>
              <h4 className="font-bold text-xs text-white leading-tight mb-1">
                {cert.title}
              </h4>
              <p className="text-[10px] font-mono text-white/60 mb-2">
                {cert.issuer}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {cert.image && (
                <button
                  onClick={() => setActiveCertModal(cert.image!)}
                  className="text-[10px] font-mono underline hover:text-white text-white/80 cursor-pointer"
                >
                  View Image
                </button>
              )}
              {cert.file && (
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono underline hover:text-white text-white/80"
                >
                  PDF Document
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal Preview */}
      {activeCertModal && (
        <div 
          onClick={() => setActiveCertModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] border-2 border-white bg-black p-2 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            <button
              onClick={() => setActiveCertModal(null)}
              className="absolute -top-4 -right-4 bg-white text-black font-mono font-bold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/80"
            >
              ✕
            </button>
            <img 
              src={activeCertModal} 
              alt="Certificate verification preview" 
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};