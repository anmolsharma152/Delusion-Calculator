'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Database, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface AnticipationOverlayProps {
  onComplete: () => void;
}

const STAGES = [
  { text: "CROSS-REFERENCING US CENSUS ACS 2023 MICRODATA...", icon: Database, color: "text-[#00F5FF]" },
  { text: "CROSS-REFERENCING CDC NHANES HEIGHT & BMI STATS...", icon: Cpu, color: "text-[#FF007F]" },
  { text: "CALCULATING HYPERGAMY CORRELATIONS...", icon: ShieldAlert, color: "text-[#FFE600]" },
  { text: "COMPUTING CAT LADY PROBABILITY METER...", icon: Flame, color: "text-[#FF2AA3]" },
  { text: "CONSULTING MYRON'S STATISTICAL DATABASE...", icon: Sparkles, color: "text-[#00F5FF]" }
];

// Single global audio manager with preloading & custom start trim to guarantee zero initial delay
class GlobalAudio {
  private static currentAudio: HTMLAudioElement | null = null;
  private static audioCache: Map<string, HTMLAudioElement> = new Map();

  static preload(file: string) {
    if (typeof window === 'undefined') return;
    const uri = encodeURI(file);
    if (!this.audioCache.has(uri)) {
      const audio = new Audio(uri);
      audio.preload = 'auto';
      this.audioCache.set(uri, audio);
    }
  }

  static play(file: string, onEnded?: () => void, startTime: number = 0) {
    if (typeof window === 'undefined') return;

    // Pause & reset any actively playing clip
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    try {
      const uri = encodeURI(file);
      let audio = this.audioCache.get(uri);
      if (!audio) {
        audio = new Audio(uri);
        audio.preload = 'auto';
        this.audioCache.set(uri, audio);
      }

      // Seek past leading dead silence if custom startTime offset is specified
      audio.currentTime = startTime;
      this.currentAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }

      audio.onended = () => {
        if (onEnded) onEnded();
      };
    } catch (e) {}
  }

  static stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
  }
}

// Preload the result losing horn asset immediately on client load
if (typeof window !== 'undefined') {
  GlobalAudio.preload('/Soundbites/losing-horn.mp3');
}

export { GlobalAudio };

export default function AnticipationOverlay({ onComplete }: AnticipationOverlayProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasFinished = useRef(false);

  useEffect(() => {
    // Preload losing horn asset when overlay mounts
    GlobalAudio.preload('/Soundbites/losing-horn.mp3');

    // 2.5s total calculation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          if (!hasFinished.current) {
            hasFinished.current = true;
            // Play single preloaded instance of losing horn ONCE when reveal completes
            GlobalAudio.play('/Soundbites/losing-horn.mp3');
          }

          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  useEffect(() => {
    const stageIndex = Math.min(
      STAGES.length - 1,
      Math.floor((progress / 100) * STAGES.length)
    );
    setCurrentStage(stageIndex);
  }, [progress]);

  const StageIcon = STAGES[currentStage].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg glass-card-vapor p-8 border-2 border-[#FF007F] shadow-[0_0_50px_rgba(255,0,127,0.5)] rounded-2xl flex flex-col items-center space-y-6 text-center relative overflow-hidden"
      >
        {/* Retro Scanlines */}
        <div className="scanlines" />

        {/* Pulsing Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF007F] via-[#8A2BE2] to-[#00F5FF] p-1 animate-pulse">
            <div className="w-full h-full bg-[#0c0721] rounded-full flex items-center justify-center">
              <StageIcon className={`w-10 h-10 ${STAGES[currentStage].color} animate-bounce`} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-display text-2xl sm:text-3xl tracking-widest text-white uppercase text-glow-pink">
            RUNNING REALITY CHECK
          </h3>
          <p className="text-xs font-mono text-[#F5D8F2]">
            The Numbers Don't Lie • Standby
          </p>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-10 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`font-mono text-sm sm:text-base font-bold ${STAGES[currentStage].color}`}
            >
              {STAGES[currentStage].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Vaporwave Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="w-full h-3 bg-[#180e38] rounded-full border border-[#FF007F]/40 p-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF] rounded-full shadow-[0_0_12px_#00F5FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs text-[#B3A0D2]">
            <span>SCANNING DEMOGRAPHICS</span>
            <span className="text-[#00F5FF] font-bold">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
