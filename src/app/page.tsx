'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import WelcomeStage from '@/components/WelcomeStage';
import CriteriaForm from '@/components/CriteriaForm';
import ResultsPanel from '@/components/ResultsPanel';
import ShareCard from '@/components/ShareCard';
import AnticipationOverlay, { GlobalAudio } from '@/components/AnticipationOverlay';
import SoundVaultModal, { BANK_1_SOUNDS, BANK_2_SOUNDS, KEY_LABELS, SoundBite } from '@/components/SoundVaultModal';
import ShortcutsCheatsheet from '@/components/ShortcutsCheatsheet';
import MethodologyModal from '@/components/MethodologyModal';
import InteractiveBackground from '@/components/InteractiveBackground';
import { useCalculator } from '@/hooks/useCalculator';
import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Square } from 'lucide-react';

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
  const [criteria, setCriteria] = useState<CriteriaState>(defaultCriteria);
  const [activeCriteria, setActiveCriteria] = useState<CriteriaState>(defaultCriteria);

  // App Flow View State (WELCOME, INPUT, RESULTS)
  const [viewState, setViewState] = useState<'WELCOME' | 'INPUT' | 'RESULTS'>('WELCOME');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Unified Mode Controls: Stream Mode & Theme
  const [isStreamMode, setIsStreamMode] = useState(false);
  const [bgMode, setBgMode] = useState<'VAPORWAVE' | 'OBSIDIAN'>('VAPORWAVE');

  // Soundboard State
  const [activeBank, setActiveBank] = useState<1 | 2>(1);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [playingSound, setPlayingSound] = useState<{ id: string; name: string; hotkey?: string } | null>(null);

  // Hook calculates results based on activeCriteria
  const { result, breakdown } = useCalculator(activeCriteria);

  const playSoundbite = (sound: SoundBite, hotkey?: string) => {
    setPlayingSound({ id: sound.id, name: sound.name, hotkey });
    GlobalAudio.play(
      sound.file,
      () => setPlayingSound(null),
      sound.startTime || 0
    );
  };

  const stopSoundbite = () => {
    GlobalAudio.stop();
    setPlayingSound(null);
  };

  // Unified Global Hotkeys:
  // - [Space]: Toggle Stream Mode in place without losing screen or calculations
  // - [Enter]: Progress forward (WELCOME -> INPUT -> RESULTS -> INPUT)
  // - [Tab]: Toggle Sampler Bank 1 & Bank 2
  // - [1]–[0]: Trigger Sampler Soundbite
  // - [m]: Toggle Sound Vault
  // - [s]: Toggle Stream Mode
  // - [f]: Toggle Fullscreen
  // - [t]: Toggle Theme (Vaporwave <-> Obsidian)
  // - [h]: Go to Home / Landing Page
  // - [c]: Go to Calculator (Input)
  // - [a]: Toggle Methodology / Info Overlay
  // - [/]: Toggle Keyboard Shortcuts Cheatsheet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Never hijack browser shortcuts: Alt+1-0 switches tabs, Ctrl/Cmd+F
      // searches, etc. Only unmodified keys trigger app hotkeys — this
      // prevents soundbites from firing during Alt+1-0 tab switching.
      if (e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      // 0. / -> Toggle Keyboard Shortcuts Cheatsheet (handled first so
      // preventDefault always fires before any browser quick-find behavior)
      if (e.key === '/') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // 1. Spacebar -> In-place Stream Mode Toggle
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        setIsStreamMode((prev) => !prev);
        return;
      }

      // 2. Enter Key -> Navigation & Calculation
      if (e.key === 'Enter' && !isAnalyzing) {
        e.preventDefault();
        if (viewState === 'WELCOME') {
          setViewState('INPUT');
        } else if (viewState === 'RESULTS') {
          setViewState('INPUT');
        }
        return;
      }

      // 3. Tab Key -> Toggle Sampler Bank
      if (e.key === 'Tab') {
        e.preventDefault();
        setActiveBank((prev) => (prev === 1 ? 2 : 1));
        return;
      }

      // 4. Number Keys [1] to [9], [0] -> Trigger Sound Sampler
      const currentBankSounds = activeBank === 1 ? BANK_1_SOUNDS : BANK_2_SOUNDS;
      const keyIndex = KEY_LABELS.indexOf(e.key);
      if (keyIndex !== -1 && keyIndex < currentBankSounds.length) {
        e.preventDefault();
        const sound = currentBankSounds[keyIndex];
        if (playingSound?.id === sound.id) {
          stopSoundbite();
        } else {
          playSoundbite(sound, KEY_LABELS[keyIndex]);
        }
      }

      // 5. m -> Toggle Sound Vault (open/close)
      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsVaultOpen((prev) => !prev);
        return;
      }

      // 6. s -> Toggle Stream Mode (on/off)
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsStreamMode((prev) => !prev);
        return;
      }

      // 7. f -> Toggle Fullscreen (enter/exit)
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        return;
      }

      // 8. t -> Toggle Theme (Vaporwave <-> Obsidian)
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setBgMode((prev) => (prev === 'VAPORWAVE' ? 'OBSIDIAN' : 'VAPORWAVE'));
        return;
      }

      // 9. h -> Go to Home / Landing Page
      if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setViewState('WELCOME');
        return;
      }

      // 10. c -> Go to Calculator (Input)
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setViewState('INPUT');
        return;
      }

      // 11. a -> Toggle Methodology (Info)
      if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsMethodologyOpen((prev) => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, isAnalyzing, activeBank, playingSound]);

  const handleGoHome = useCallback(() => {
    setViewState('WELCOME');
  }, []);

  const handleStartTest = () => {
    setViewState('INPUT');
  };

  const handleStartCalculation = useCallback(() => {
    setIsAnalyzing(true);
  }, []);

  const handleAnalysisComplete = () => {
    setActiveCriteria(criteria);
    setViewState('RESULTS');
    setIsAnalyzing(false);
  };

  const handleResetToInput = () => {
    setViewState('INPUT');
  };

  // Stable handler identities so the memoized Header / CriteriaForm never
  // re-render when unrelated state (e.g. typing income) changes.
  const handleToggleStreamMode = useCallback(() => {
    setIsStreamMode((prev) => !prev);
  }, []);

  const handleToggleBank = useCallback(() => {
    setActiveBank((prev) => (prev === 1 ? 2 : 1));
  }, []);

  const handleOpenSoundVault = useCallback(() => {
    setIsVaultOpen(true);
  }, []);

  const handleOpenShortcuts = useCallback(() => {
    setIsShortcutsOpen(true);
  }, []);

  const handleOpenMethodology = useCallback(() => {
    setIsMethodologyOpen(true);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between select-none relative overflow-x-hidden transition-colors duration-500 ${
        bgMode === 'OBSIDIAN'
          ? 'bg-[#080808]'
          : 'bg-[#080414] vaporwave-grid-container'
      }`}
    >
      {/* Background Interactive Layer: ONLY in 80s Vaporwave mode; in Obsidian Dark mode it is 100% Pitch Black */}
      {bgMode === 'VAPORWAVE' && (
        <>
          <InteractiveBackground />
          <div className="vaporwave-grid-bg" />
          <div className="vaporwave-grid-floor" />
          <div className="retro-sun" />
        </>
      )}

      {/* Unified Top Header with Adaptive Auto-Hide in Stream Mode */}
      <Header
        onGoHome={handleGoHome}
        isStreamMode={isStreamMode}
        onToggleStreamMode={handleToggleStreamMode}
        bgMode={bgMode}
        onSetBgMode={setBgMode}
        activeBank={activeBank}
        onToggleBank={handleToggleBank}
        onOpenSoundVault={handleOpenSoundVault}
        onOpenShortcuts={handleOpenShortcuts}
        onOpenMethodology={handleOpenMethodology}
      />

      {/* Main App Content View Switcher */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 z-10 relative flex flex-col justify-center my-auto transition-[padding-top] duration-300 ${
        isStreamMode
          ? 'pb-3 pt-20'
          : 'py-1 sm:py-1.5'
      }`}>
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

      {/* Floating Audio Playback HUD Toast (Bottom-Right) */}
      <AnimatePresence>
        {playingSound && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-40 bg-[#0e0726] border-2 border-[#FF007F] p-3 rounded-2xl shadow-[0_0_25px_#FF007F] flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#FFE600] animate-bounce" />
              <div>
                <div className="text-[10px] font-mono text-[#00F5FF] font-bold">
                  {playingSound.hotkey ? `HOTKEY [${playingSound.hotkey}]` : 'SOUND PLAYING'}
                </div>
                <div className="font-display text-sm text-white uppercase tracking-wider">
                  {playingSound.name}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={stopSoundbite}
              className="p-1.5 rounded-xl bg-red-600/30 border border-red-500 text-red-400 hover:bg-red-600/60 transition-colors cursor-pointer"
              title="Stop Audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Sound Vault Modal (Stream Deck Grid with 45+ Graded Sounds) */}
      <SoundVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        activeBank={activeBank}
        setActiveBank={setActiveBank}
        playingSoundName={playingSound?.name || null}
        onPlaySound={(s) => playSoundbite(s)}
        onStopSound={stopSoundbite}
      />

      {/* Keyboard Shortcuts Cheatsheet Overlay */}
      <ShortcutsCheatsheet
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Methodology & Data Overlay */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Anticipation Build-Up Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnticipationOverlay onComplete={handleAnalysisComplete} />
        )}
      </AnimatePresence>

      {/* Social Media Share Card Modal */}
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
