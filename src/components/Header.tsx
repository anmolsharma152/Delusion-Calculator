'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tv, Moon, Sun, Eye, EyeOff, Maximize2, Music, Layers, CircleHelp } from 'lucide-react';

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
  autoHideMode?: boolean;
  onToggleAutoHide?: () => void;
  isAutoHidden?: boolean;
}

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
  autoHideMode = true,
  onToggleAutoHide,
  isAutoHidden = false,
}: HeaderProps) {
  const router = useRouter();

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
    <header
      className={`w-full z-40 transition-transform duration-300 ease-in-out bg-[#0c0721] border-b-2 border-[#FF007F]/40 ${
        isStreamMode
          ? `fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-2.5 ${
              isAutoHidden
                ? '-translate-y-full opacity-0 pointer-events-none'
                : 'translate-y-0 opacity-100 pointer-events-auto'
            }`
          : 'sticky top-0 px-4 sm:px-6 lg:px-8 h-16 flex items-center'
      }`}
    >
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4">
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
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#180e38] border flex items-center justify-center transition-all cursor-pointer shadow-[0_0_10px_rgba(255,0,127,0.2)] ${
                activeBank === 1
                  ? 'border-[#FF007F] shadow-[0_0_12px_rgba(255,0,127,0.45)] hover:border-[#FF007F]'
                  : 'border-[#00F5FF] shadow-[0_0_12px_rgba(0,245,255,0.45)] hover:border-[#00F5FF]'
              }`}
              title={`Sampler Bank ${activeBank} [Keys 1–0] (Press Tab to switch)`}
            >
              <Layers
                className={`w-4 h-4 transition-colors ${
                  activeBank === 1 ? 'text-[#FF007F]' : 'text-[#00F5FF]'
                }`}
              />
            </button>
          )}

          {/* Sound Vault Modal Button (Icon Only) */}
          {onOpenSoundVault && (
            <button
              type="button"
              onClick={onOpenSoundVault}
              className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-[#FF007F]/30 to-[#8A2BE2]/30 hover:from-[#FF007F]/60 hover:to-[#8A2BE2]/60 border border-[#FF007F]/50 text-[#FFE600] hover:text-white transition-all shadow-[0_0_12px_rgba(255,0,127,0.3)] cursor-pointer"
              title="Sound Vault (45+ Audio Effects)"
            >
              <Music className="w-4 h-4 text-[#FFE600]" />
            </button>
          )}

          {/* Theme Switcher (Sun & Moon Icons Only) */}
          {onSetBgMode && (
            <div className="flex items-center gap-1 bg-[#180e38] p-1 rounded-xl border border-[#FF007F]/30">
              <button
                type="button"
                onClick={() => onSetBgMode('VAPORWAVE')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  bgMode === 'VAPORWAVE'
                    ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]'
                    : 'text-[#B3A0D2] hover:text-white'
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
                    : 'text-[#B3A0D2] hover:text-white'
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
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer shadow-[0_0_12px_rgba(0,245,255,0.3)] ${
                isStreamMode
                  ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_15px_#FF007F] animate-pulse'
                  : 'border-[#00F5FF]/40 bg-[#00F5FF]/15 text-[#00F5FF] hover:bg-[#00F5FF]/30'
              }`}
              title="Toggle Stream Mode [Spacebar]"
            >
              <Tv className="w-4 h-4" />
            </button>
          )}

          {/* Auto-Hide Toggle (Icon Only, in Stream Mode) */}
          {isStreamMode && onToggleAutoHide && (
            <button
              type="button"
              onClick={onToggleAutoHide}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                autoHideMode
                  ? 'bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F]/50 shadow-[0_0_10px_#FF007F]'
                  : 'bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF]/50 shadow-[0_0_10px_#00F5FF]'
              }`}
              title={autoHideMode ? 'Auto-Hide: ON' : 'Auto-Hide: OFF'}
            >
              {autoHideMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#00F5FF]" />}
            </button>
          )}

          {/* Keyboard Shortcuts Help Button (Icon Only) */}
          {onOpenShortcuts && (
            <button
              type="button"
              onClick={onOpenShortcuts}
              className="p-2 sm:p-2.5 rounded-xl bg-[#180e38] hover:bg-[#2a0845] text-[#FFE600] hover:text-white transition-colors border border-[#FFE600]/40 cursor-pointer"
              title="Keyboard Shortcuts [/]"
            >
              <CircleHelp className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen Toggle (Icon Only) */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-[#180e38] hover:bg-[#2a0845] text-[#00F5FF] hover:text-white transition-colors border border-[#00F5FF]/40 cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
