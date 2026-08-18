'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tv, Moon, Sun, Maximize2, Music, Layers, CircleHelp, Info } from 'lucide-react';

interface HeaderProps {
  onGoHome?: () => void;
  isStreamMode?: boolean;
  onToggleStreamMode?: () => void;
  bgMode?: 'VAPORWAVE' | 'OBSIDIAN';
  onSetBgMode?: (mode: 'VAPORWAVE' | 'OBSIDIAN') => void;
  activeBank?: 1 | 2;
  onToggleBank?: () => void;
  onOpenSoundVault?: () => void;
  onOpenShortcuts?: () => void;
  onOpenMethodology?: () => void;
}

// Uniform chrome for every icon button. Color is reserved for active states.
const CHROME =
  'p-2 sm:p-2.5 rounded-xl bg-[#180e38] border-[#FF007F]/30 text-[#00F5FF] hover:text-white hover:border-[#00F5FF] transition-all cursor-pointer';

function Header({
  onGoHome,
  isStreamMode = false,
  onToggleStreamMode,
  bgMode = 'VAPORWAVE',
  onSetBgMode,
  activeBank = 1,
  onToggleBank,
  onOpenSoundVault,
  onOpenShortcuts,
  onOpenMethodology,
}: HeaderProps) {
  const router = useRouter();
  const [peeking, setPeeking] = useState(false);

  // In stream mode the header is hidden by default and only peeks back when
  // the cursor reaches the very top edge of the screen (mouse leaves -> hide).
  const streamVisible = isStreamMode && peeking;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push('/');
    }
  };

  return (
    <>
      {/* Invisible top-edge reveal strip — active ONLY in stream mode so the
          hidden header can peek back when the cursor reaches the top of the screen. */}
      {isStreamMode && (
        <div
          className="fixed top-0 left-0 right-0 h-2.5 z-50"
          onMouseEnter={() => setPeeking(true)}
        />
      )}

      <header
        className={`w-full z-40 transition-transform duration-300 ease-in-out bg-[#0c0721] border-b-2 border-[#FF007F]/40 ${
          isStreamMode
            ? `fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-2.5 ${
                streamVisible
                  ? 'translate-y-0 pointer-events-auto'
                  : '-translate-y-full pointer-events-none'
              }`
            : 'sticky top-0 px-4 sm:px-6 lg:px-8 h-16 flex items-center'
        }`}
        onMouseEnter={isStreamMode ? () => setPeeking(true) : undefined}
        onMouseLeave={isStreamMode ? () => setPeeking(false) : undefined}
      >
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        {/* Left: Fresh & Fit Logo Cover Art & DELUSION CALCULATOR Branding Only */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center gap-3 group cursor-pointer text-left shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-[#E50914] shadow-lg shadow-[#E50914]/40 group-hover:shadow-[#00F5FF]/50 transition-all duration-300 relative shrink-0">
            <Image
              src="/Assets/FreshnFit After Hours - Cover Art.jpg"
              alt="Fresh & Fit After Hours"
              fill
              sizes="44px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl tracking-wider text-white flex items-center gap-1.5 leading-none">
              DELUSION <span className="text-[#E50914] text-glow-pink">CALCULATOR</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#00F5FF] tracking-widest uppercase font-mono font-bold mt-0.5">
              FRESH & FIT MIAMI AFTER HOURS
            </p>
          </div>
        </button>

        {/* Right: Minimal Icon-Only Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sampler Bank Toggle Icon with Color-Coded Active Bank Indicator */}
          {onToggleBank && (
            <button
              type="button"
              onClick={onToggleBank}
              className={`${CHROME} ${
                activeBank === 1
                  ? 'bg-[#FF007F]/15 border-[#FF007F] text-[#FF007F] hover:border-[#FF007F]'
                  : 'bg-[#00F5FF]/15 border-[#00F5FF] text-[#00F5FF] hover:border-[#00F5FF]'
              }`}
              title={`Sampler Bank ${activeBank} [Keys 1–0] (Press Tab to switch)`}
            >
              <Layers className="w-4 h-4" />
            </button>
          )}

          {/* Sound Vault Modal Button (Icon Only) */}
          {onOpenSoundVault && (
            <button
              type="button"
              onClick={onOpenSoundVault}
              className={CHROME}
              title="Sound Vault (45+ Audio Effects)"
            >
              <Music className="w-4 h-4" />
            </button>
          )}

          {/* Theme Switcher (Sun & Moon Icons Only) */}
          {onSetBgMode && (
            <div className="flex items-center gap-1 bg-[#180e38] p-1 rounded-xl border-[#FF007F]/30 border">
              <button
                type="button"
                onClick={() => onSetBgMode('VAPORWAVE')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  bgMode === 'VAPORWAVE'
                    ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]'
                    : 'text-[#00F5FF] hover:text-white'
                }`}
                title="80s Vaporwave Theme (Sun)"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onSetBgMode('OBSIDIAN')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  bgMode === 'OBSIDIAN'
                    ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]'
                    : 'text-[#00F5FF] hover:text-white'
                }`}
                title="Obsidian Dark Theme (Moon)"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Stream Mode Toggle (TV Icon Only) */}
          {onToggleStreamMode && (
            <button
              type="button"
              onClick={onToggleStreamMode}
              className={`${CHROME} ${
                isStreamMode
                  ? 'bg-[#FF007F] text-white border-[#FF007F] hover:border-[#FF007F] shadow-[0_0_15px_#FF007F] animate-pulse'
                  : ''
              }`}
              title="Toggle Stream Mode [Spacebar]"
            >
              <Tv className="w-4 h-4" />
            </button>
          )}

          {/* Methodology / Info Button (Icon Only) */}
          {onOpenMethodology && (
            <button
              type="button"
              onClick={onOpenMethodology}
              className={CHROME}
              title="Methodology & Data [A]"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          {/* Keyboard Shortcuts Help Button (Icon Only) */}
          {onOpenShortcuts && (
            <button
              type="button"
              onClick={onOpenShortcuts}
              className={CHROME}
              title="Keyboard Shortcuts [/]"
            >
              <CircleHelp className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen Toggle (Icon Only) */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={CHROME}
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
    </>
  );
}

export default memo(Header);