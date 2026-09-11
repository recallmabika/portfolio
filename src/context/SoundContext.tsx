import React, { createContext, useContext, useEffect, useRef } from 'react';

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playSwitch: () => void;
  playBeep: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playClick: () => {},
  playHover: () => {},
  playSwitch: () => {},
  playBeep: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const isStartedRef = useRef<boolean>(false);
  const chatterTimeoutRef = useRef<any>(null);

  // Initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 1. Precise "tsi-tsi" / "tsi-tsi-tsi" high-frequency crisp datacenter packet / read-head pulse
  const triggerTsiBurst = (ctx: AudioContext, count: number = 3, intervalMs: number = 70) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (!ctx || ctx.state !== 'running') return;
        const now = ctx.currentTime;

        // Bandpass noise pulse for the crisp "ts" friction
        const bufferSize = Math.floor(ctx.sampleRate * 0.035);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        // High frequency bandpass gives that distinct "tsi" metallic tech hiss
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(4500 + Math.random() * 800, now);
        filter.Q.setValueAtTime(4.5, now);

        // Subtle tiny click tone to give the mechanical actuator feel
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2800 + Math.random() * 500, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.025);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.015, now);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.045, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.03);
        noise.stop(now + 0.04);
      }, i * intervalMs);
    }
  };

  // Schedule rhythmic background data-server chatter ("tsi-tsi... tsi-tsi-tsi...")
  const scheduleServerChatter = (ctx: AudioContext) => {
    const runCycle = () => {
      if (!ctx || ctx.state !== 'running') return;

      // Randomly pick: 2 pulses ("tsi-tsi") or 3-4 pulses ("tsi-tsi-tsi")
      const pulseCount = Math.random() > 0.4 ? (Math.random() > 0.5 ? 3 : 2) : 4;
      const speed = 65 + Math.random() * 25;
      triggerTsiBurst(ctx, pulseCount, speed);

      // Next chatter burst in 1.8 to 4.2 seconds
      const nextDelay = 1800 + Math.random() * 2400;
      chatterTimeoutRef.current = setTimeout(runCycle, nextDelay);
    };

    chatterTimeoutRef.current = setTimeout(runCycle, 600);
  };

  // Datacenter ambient foundation (server rack hum + cooling air + automatic tsi-tsi chatter)
  const startDatacenterAmbient = (ctx: AudioContext) => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    try {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.035, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;

      // Server rack low hum
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      const oscGain1 = ctx.createGain();
      oscGain1.gain.setValueAtTime(0.2, ctx.currentTime);
      osc1.connect(oscGain1);
      oscGain1.connect(masterGain);
      osc1.start();

      // Exhaust airflow noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const fanFilter = ctx.createBiquadFilter();
      fanFilter.type = 'bandpass';
      fanFilter.frequency.setValueAtTime(220, ctx.currentTime);
      fanFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.045, ctx.currentTime);

      whiteNoise.connect(fanFilter);
      fanFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      // Start the realistic "tsi-tsi, tsi-tsi-tsi" server network activity chatter
      scheduleServerChatter(ctx);
    } catch (e) {
      console.warn('Audio ambient error', e);
    }
  };

  const ensureAudioActive = () => {
    const ctx = getAudioContext();
    if (ctx) {
      startDatacenterAmbient(ctx);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      ensureAudioActive();
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('wheel', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    ensureAudioActive();

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (chatterTimeoutRef.current) clearTimeout(chatterTimeoutRef.current);
    };
  }, []);

  // UI Interactive Sounds:
  // On hover: crisp single "tsi"
  const playHoverSound = (ctx: AudioContext) => {
    triggerTsiBurst(ctx, 1, 0);
  };

  // On click: double rapid "tsi-tsi"
  const playClickSound = (ctx: AudioContext) => {
    triggerTsiBurst(ctx, 2, 55);
  };

  // On section switch: 3 quick pulses "tsi-tsi-tsi"
  const playSwitchSound = (ctx: AudioContext) => {
    triggerTsiBurst(ctx, 3, 60);
  };

  // On action / download: 4 rhythmic pulses "tsi-tsi-tsi-tsi"
  const playBeepSound = (ctx: AudioContext) => {
    triggerTsiBurst(ctx, 4, 50);
  };

  return (
    <SoundContext.Provider
      value={{
        playClick: () => {
          ensureAudioActive();
          if (audioCtxRef.current) playClickSound(audioCtxRef.current);
        },
        playHover: () => {
          ensureAudioActive();
          if (audioCtxRef.current) playHoverSound(audioCtxRef.current);
        },
        playSwitch: () => {
          ensureAudioActive();
          if (audioCtxRef.current) playSwitchSound(audioCtxRef.current);
        },
        playBeep: () => {
          ensureAudioActive();
          if (audioCtxRef.current) playBeepSound(audioCtxRef.current);
        },
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
