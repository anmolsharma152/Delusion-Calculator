'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '../types';
import { useCalculator } from '../hooks/useCalculator';
import CriteriaForm from './CriteriaForm';
import ResultsPanel from './ResultsPanel';
import AnticipationOverlay from './AnticipationOverlay';
import SoundboardBar from './SoundboardBar';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Tv, Moon, Sun, Minimize2, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const initialCriteria: CriteriaState = {
  minAge: 22,
  maxAge: 35,
  minHeight: 72, // 6'0"
  minIncome: 80000, // $80k default
  maritalPref: MaritalPreference.DONT_CARE,
  excludeObese: false,
  selectedRaces: [Race.ANY],
  minEducation: EducationLevel.HIGH_SCHOOL,
  location: LocationScope.SAME_COUNTRY,
};

export default function StreamMode() {
  const router = useRouter();
  const [criteria, setCriteria] = useState<CriteriaState>(initialCriteria);
  const [activeCriteria, setActiveCriteria] = useState<CriteriaState>(initialCriteria);
  const [viewState, setViewState] = useState<'INPUT' | 'RESULTS'>('INPUT');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [bgMode, setBgMode] = useState<'VAPORWAVE' | 'OBSIDIAN'>('VAPORWAVE');
  const [isMinimized, setIsMinimized] = useState(false);

  const { result, breakdown } = useCalculator(activeCriteria);

  // Spacebar Hotkey -> Exit Stream Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore hotkeys when typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleStartCalculation = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setActiveCriteria(criteria);
    setViewState('RESULTS');
    setIsAnalyzing(false);
  };

  const handleResetToInput = () => {
    setViewState('INPUT');
  };

  const getBgStyle = () => {
    if (bgMode === 'OBSIDIAN') return 'bg-[#05020c]';
    return 'bg-[#080414] vaporwave-grid-container';
  };

  return (
    <div className={`min-h-screen w-full ${getBgStyle()} text-white flex flex-col justify-between select-none relative overflow-hidden transition-colors duration-300`}>
      {bgMode === 'VAPORWAVE' && (
        <>
          <div className="vaporwave-grid-bg" />
          <div className="vaporwave-grid-floor" />
          <div className="retro-sun" />
        </>
      )}

      {/* Top Control Bar (Collapsible / Auto-Minimizable for OBS) */}
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-6 pb-0 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#FF007F]/40 pb-3 mb-2 z-20 bg-[#0c0721]/80 backdrop-blur-md px-4 py-2 rounded-xl">
              <Link
                href="/"
                className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] hover:underline font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>EXIT STREAM MODE [SPACE]</span>
              </Link>

              <div className="flex items-center gap-3">
                {/* 2 Clean Background Modes Selector: 80s Vaporwave vs Obsidian Dark */}
                <div className="flex items-center gap-1.5 bg-[#180e38] p-1 rounded-xl border border-[#FF007F]/30 text-xs font-mono">
                  <span className="text-[10px] text-[#B3A0D2] uppercase font-bold mr-1 hidden sm:inline">THEME:</span>
                  <button
                    onClick={() => setBgMode('VAPORWAVE')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      bgMode === 'VAPORWAVE' ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]' : 'text-[#B3A0D2] hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>80s Vaporwave</span>
                  </button>
                  <button
                    onClick={() => setBgMode('OBSIDIAN')}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      bgMode === 'OBSIDIAN' ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]' : 'text-[#B3A0D2] hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Obsidian Dark</span>
                  </button>
                </div>

                {/* Auto-Minimize Control Toggle Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#180e38] border border-[#FF007F]/40 text-xs font-mono font-bold text-[#FF007F] hover:bg-[#FF007F]/20 transition-all cursor-pointer"
                  title="Minimize panels for clean OBS view"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">MINIMIZE PANELS</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007F]/20 border border-[#FF007F]/50 text-[#FF007F] font-mono text-xs font-bold animate-pulse shadow-[0_0_15px_#FF007F]">
                  <Tv className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">🔴 LIVE OBS BROADCAST</span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-[#180e38] hover:bg-[#2a0845] text-white transition-colors border border-[#00F5FF]/40 cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-[#00F5FF]" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="absolute top-3 right-4 z-40">
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0721]/90 border border-[#00F5FF] text-[#00F5FF] font-mono text-xs font-bold shadow-[0_0_15px_#00F5FF] hover:bg-[#00F5FF]/20 transition-all cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>EXPAND BROADCAST CONTROLS</span>
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Main Single-Panel Centered Stream Interface */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 z-10 relative flex flex-col justify-center my-auto min-h-[calc(100vh-8.5rem)]">
        <AnimatePresence mode="wait" initial={false}>
          {viewState === 'INPUT' ? (
            <motion.div
              key="stream-input"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full my-auto"
            >
              <CriteriaForm
                criteria={criteria}
                onChange={setCriteria}
                onCalculate={handleStartCalculation}
                isAnalyzing={isAnalyzing}
              />
            </motion.div>
          ) : (
            <motion.div
              key="stream-results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full my-auto"
            >
              <ResultsPanel
                result={result}
                breakdown={breakdown}
                onReset={handleResetToInput}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Bottom Soundboard Panel */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SoundboardBar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anticipation Build-Up Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnticipationOverlay onComplete={handleAnalysisComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
