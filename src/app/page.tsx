'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import WelcomeStage from '@/components/WelcomeStage';
import CriteriaForm from '@/components/CriteriaForm';
import ResultsPanel from '@/components/ResultsPanel';
import ShareCard from '@/components/ShareCard';
import AnticipationOverlay from '@/components/AnticipationOverlay';
import SoundboardBar from '@/components/SoundboardBar';
import { useCalculator } from '@/hooks/useCalculator';
import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

// Default Criteria: $80k Income Baseline, 6'0" Height, Unmarked Toggles
const defaultCriteria: CriteriaState = {
  minAge: 22,
  maxAge: 35,
  minHeight: 72, // 6'0" (72 inches)
  minIncome: 80000, // $80k default baseline
  maritalPref: MaritalPreference.DONT_CARE, // Unmarked by default
  excludeObese: false, // Unmarked by default
  selectedRaces: [Race.ANY],
  minEducation: EducationLevel.HIGH_SCHOOL,
  location: LocationScope.SAME_COUNTRY,
};

export default function Home() {
  const router = useRouter();
  const [criteria, setCriteria] = useState<CriteriaState>(defaultCriteria);
  const [activeCriteria, setActiveCriteria] = useState<CriteriaState>(defaultCriteria);

  // 3-Step Flow: 'WELCOME' -> 'INPUT' -> 'RESULTS'
  const [viewState, setViewState] = useState<'WELCOME' | 'INPUT' | 'RESULTS'>('WELCOME');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hook receives activeCriteria
  const { result, breakdown } = useCalculator(activeCriteria);

  // Spacebar Hotkey -> Enter OBS Stream Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore hotkeys when typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        router.push('/stream');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleGoHome = () => {
    setViewState('WELCOME');
  };

  const handleStartTest = () => {
    setViewState('INPUT');
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
    // Preserve current entered criteria when adjusting standards
    setViewState('INPUT');
  };

  return (
    <div className="min-h-screen flex flex-col relative vaporwave-grid-container bg-[#0c0721] overflow-x-hidden">
      {/* 80s Vaporwave Background Elements */}
      <div className="vaporwave-grid-bg" />
      <div className="vaporwave-grid-floor" />
      <div className="retro-sun" />

      <Header onGoHome={handleGoHome} />

      <main className="flex-1 max-w-6xl sm:max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10 relative flex flex-col justify-center min-h-[calc(100vh-8.5rem)] my-auto">
        {/* 3-Step App Flow View Switcher */}
        <AnimatePresence mode="wait" initial={false}>
          {viewState === 'WELCOME' && (
            <motion.div
              key="welcome-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full my-auto"
            >
              <WelcomeStage onStart={handleStartTest} />
            </motion.div>
          )}

          {viewState === 'INPUT' && (
            <motion.div
              key="input-stage"
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
          )}

          {viewState === 'RESULTS' && (
            <motion.div
              key="results-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full my-auto"
            >
              <ResultsPanel
                result={result}
                breakdown={breakdown}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onReset={handleResetToInput}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Bottom Soundboard Panel */}
      <SoundboardBar />

      {/* Anticipation Build-Up Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnticipationOverlay onComplete={handleAnalysisComplete} />
        )}
      </AnimatePresence>

      {/* Social Export Share Modal */}
      {isShareModalOpen && (
        <ShareCard
          result={result}
          criteria={activeCriteria}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}
