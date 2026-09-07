import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, MessageCircle, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // If real EmailJS environment variables are provided in .env
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: senderName,
            from_email: senderEmail,
            reply_to: senderEmail,
            subject: subject,
            message: message,
            to_name: PERSONAL_INFO.name,
          },
          publicKey
        );
        setStatus('success');
        setStatusMessage('Transmission delivered successfully. I will review and reply to your email shortly.');
        setSenderName('');
        setSenderEmail('');
        setSubject('');
        setMessage('');
        return;
      } catch (err: any) {
        console.error('EmailJS error:', err);
      }
    }

    // Default mailto protocol fallback
    const formattedBody = `Sender Name: ${senderName}\nReply-To Email: ${senderEmail}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
    window.location.href = mailtoUrl;

    setStatus('success');
    setStatusMessage('Transmission dispatched via mail client. Awaiting response.');
  };

  return (
    <div className="space-y-3 max-w-4xl text-white">
      {/* Header */}
      <div className="border-l-4 border-white pl-4 py-0.5">
        <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-white">
          Direct Communications & Verification
        </h2>
        <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
          Harare / Gweru, Zimbabwe • Available for InfoSec, Networking & Database Roles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Left Info Column */}
        <div className="space-y-2.5">
          <p className="text-xs md:text-sm leading-relaxed text-white/80 font-light">
            {PERSONAL_INFO.contact.status}
          </p>

          {/* Direct Email Display */}
          <div className="p-3 border border-white/30 bg-black/60 backdrop-blur-sm space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-white/50 uppercase">
              <span>Primary Transmission Line</span>
              <span className="text-emerald-400">PVI Monitored</span>
            </div>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-mono font-bold text-xs md:text-sm text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors block break-all"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          {/* Quick Contact Numbers Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {/* WhatsApp */}
            <div className="p-2.5 border border-white/20 bg-black/50">
              <span className="text-[9px] font-mono text-white/50 uppercase flex items-center gap-1 mb-0.5">
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp</span>
              </span>
              <a 
                href="https://wa.me/263779466786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline block truncate"
              >
                {PERSONAL_INFO.whatsapp}
              </a>
            </div>

            {/* Direct Call */}
            <div className="p-2.5 border border-white/20 bg-black/50">
              <span className="text-[9px] font-mono text-white/50 uppercase flex items-center gap-1 mb-0.5">
                <Phone className="w-3 h-3 text-white/70" />
                <span>Call Line</span>
              </span>
              <a 
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="text-xs font-bold text-white hover:underline block truncate"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Transmission Form */}
        <form onSubmit={handleSend} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Sender Name */}
            <input
              type="text"
              placeholder="YOUR NAME / ENTITY"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
              className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider"
            />

            {/* Sender Email (Requested Field) */}
            <input
              type="email"
              placeholder="YOUR EMAIL (FOR REPLY)"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              required
              className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider"
            />
          </div>

          {/* Subject */}
          <input
            type="text"
            placeholder="SUBJECT / INQUIRY TOPIC"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider"
          />

          {/* Message */}
          <textarea
            rows={3}
            placeholder="TRANSMISSION MESSAGE..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-white/30 p-2 text-xs bg-black/80 text-white placeholder-white/30 outline-none focus:border-white font-mono tracking-wider resize-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-2.5 px-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
          >
            {status === 'sending' ? (
              <span>DISPATCHING...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH TRANSMISSION</span>
              </>
            )}
          </button>

          {/* Feedback message */}
          {status === 'success' && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono pt-1">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};