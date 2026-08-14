'use client';

import { useState } from 'react';
import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '../types';
import { useCalculator } from '../hooks/useCalculator';
import CriteriaForm from './CriteriaForm';
import ResultsPanel from './ResultsPanel';
import AnticipationOverlay from './AnticipationOverlay';
import SoundboardBar from './SoundboardBar';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Tv } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const initialCriteria: CriteriaState = {
  minAge: 22,
  maxAge: 35,
  minHeight: 72, // 6'0"
  minIncome: 100000, // $100k
  maritalPref: MaritalPreference.SINGLE_ONLY,
  excludeObese: true,
  selectedRaces: [Race.ANY],
  minEducation: EducationLevel.ANY,
  location: LocationScope.SAME_COUNTRY,
};

export default function StreamMode() {
  const [criteria, setCriteria] = useState<CriteriaState>(initialCriteria);
  const [activeCriteria, setActiveCriteria] = useState<CriteriaState>(initialCriteria);
  const [viewState, setViewState] = useState<'INPUT' | 'RESULTS'>('INPUT');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { result, breakdown } = useCalculator(activeCriteria);

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

  return (
    <div className="min-h-screen w-full bg-[#080414] text-white p-4 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between border-b border-[#FF007F]/40 pb-3 mb-4 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>EXIT STREAM MODE</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007F]/20 border border-[#FF007F]/50 text-[#FF007F] font-mono text-xs font-bold animate-pulse shadow-[0_0_15px_#FF007F]">
            <Tv className="w-3.5 h-3.5" />
            <span>🔴 LIVE OBS BROADCAST OVERLAY</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#180e38] hover:bg-[#2a0845] text-white transition-colors border border-[#00F5FF]/40"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4 text-[#00F5FF]" />
          </button>
        </div>
      </div>

      <SoundboardBar />

      {/* Main Single-Panel Centered Stream Interface */}
      <main className="flex-1 max-w-5xl w-full mx-auto py-6 z-10 relative flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {viewState === 'INPUT' ? (
            <motion.div
              key="stream-input"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full"
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

      {/* Anticipation Build-Up Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnticipationOverlay onComplete={handleAnalysisComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
