import React, { createContext, useContext, useState, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playSwitch: () => void;
  playBeep: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playClick: () => {},
  playHover: () => {},
  playSwitch: () => {},
  playBeep: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const isStartedRef = useRef<boolean>(false);

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

  // Synthesize realistic datacenter rack hum & airflow white noise
  const startDatacenterAmbient = (ctx: AudioContext) => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    try {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.045, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;

      // 1. Primary Low Server Hum (55Hz + 110Hz harmonics)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);

      const oscGain1 = ctx.createGain();
      oscGain1.gain.setValueAtTime(0.25, ctx.currentTime);

      const oscGain2 = ctx.createGain();
      oscGain2.gain.setValueAtTime(0.08, ctx.currentTime);

      osc1.connect(oscGain1);
      osc2.connect(oscGain2);

      // 2. Airflow / cooling fan white noise through bandpass filter
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
      fanFilter.frequency.setValueAtTime(240, ctx.currentTime);
      fanFilter.Q.setValueAtTime(1.2, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, ctx.currentTime);

      whiteNoise.connect(fanFilter);
      fanFilter.connect(noiseGain);

      // Connect all into master ambient
      oscGain1.connect(masterGain);
      oscGain2.connect(masterGain);
      noiseGain.connect(masterGain);

      osc1.start();
      osc2.start();
      whiteNoise.start();
    } catch (e) {
      console.warn('Audio ambient error', e);
    }
  };

  const toggleMute = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (isMuted) {
      startDatacenterAmbient(ctx);
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        ambientGainRef.current.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.5);
      }
      setIsMuted(false);
      playSwitchSound(ctx);
    } else {
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      }
      setIsMuted(true);
    }
  };

  // High-tech terminal button click sound
  const playClickSound = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  // Subtle optic radar hover chirp
  const playHoverSound = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  };

  // Section orbit switch sound
  const playSwitchSound = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  };

  // Datacenter console blip / telemetry beep
  const playBeepSound = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick: () => {
          if (!isMuted && audioCtxRef.current) playClickSound(audioCtxRef.current);
        },
        playHover: () => {
          if (!isMuted && audioCtxRef.current) playHoverSound(audioCtxRef.current);
        },
        playSwitch: () => {
          if (!isMuted && audioCtxRef.current) playSwitchSound(audioCtxRef.current);
        },
        playBeep: () => {
          if (!isMuted && audioCtxRef.current) playBeepSound(audioCtxRef.current);
        },
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
