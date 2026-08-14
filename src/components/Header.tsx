'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tv, Moon, Sun, Eye, EyeOff, Maximize2, Music, Layers } from 'lucide-react';

interface HeaderProps {
  onGoHome?: () => void;
  isStreamMode?: boolean;
  onToggleStreamMode?: () => void;
  bgMode?: 'VAPORWAVE' | 'OBSIDIAN';
  onSetBgMode?: (mode: 'VAPORWAVE' | 'OBSIDIAN') => void;
  activeBank?: 1 | 2;
  onToggleBank?: () => void;
  onOpenSoundVault?: () => void;
  autoHideMode?: boolean;
  onToggleAutoHide?: () => void;
  isAutoHidden?: boolean;
}

export default function Header({
  onGoHome,
  isStreamMode = false,
  onToggleStreamMode,
  bgMode = 'VAPORWAVE',
  onSetBgMode,
  activeBank = 1,
  onToggleBank,
  onOpenSoundVault,
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
      className={`w-full z-40 transition-transform duration-300 ease-in-out bg-[#0c0721]/95 backdrop-blur-xl border-b-2 border-[#FF007F]/40 shadow-[0_4px_30px_rgba(255,0,127,0.25)] ${
        isStreamMode
          ? `fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-2.5 ${
              isAutoHidden
                ? '-translate-y-full opacity-0 pointer-events-none'
                : 'translate-y-0 opacity-100 pointer-events-auto'
            }`
          : 'sticky top-0 px-4 sm:px-6 lg:px-8 h-16 flex items-center'
      }`}
    >
      <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand / Logo with Official Cover Art (Takes user home) */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center gap-3 group cursor-pointer text-left shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-[#FF007F] shadow-lg shadow-[#FF007F]/30 group-hover:shadow-[#00F5FF]/50 transition-all duration-300 relative shrink-0">
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
              DELUSION <span className="text-[#FF007F] text-glow-pink">CALCULATOR</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#00F5FF] tracking-widest uppercase font-mono font-bold mt-0.5">
              FRESH & FIT MIAMI AFTER HOURS
            </p>
          </div>
        </button>

        {/* Center: Soundboard Quick Controls & Vault Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sampler Bank Toggle Button */}
          {onToggleBank && (
            <button
              type="button"
              onClick={onToggleBank}
              className="px-3 py-1.5 rounded-xl bg-[#180e38] border border-[#FF007F]/40 hover:border-[#FF007F] text-xs font-mono font-bold flex items-center gap-1.5 transition-all text-[#FFE600] hover:text-white cursor-pointer shadow-[0_0_10px_rgba(255,0,127,0.2)]"
              title="Toggle Bank 1 & Bank 2 (Shortcut: Tab or `)"
            >
              <Layers className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span className="hidden sm:inline">SAMPLER:</span>
              <span className={activeBank === 1 ? 'text-[#FF007F]' : 'text-[#00F5FF]'}>
                BANK {activeBank} [1–0]
              </span>
            </button>
          )}

          {/* Sound Vault Modal Button */}
          {onOpenSoundVault && (
            <button
              type="button"
              onClick={onOpenSoundVault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF007F]/30 to-[#8A2BE2]/30 hover:from-[#FF007F]/60 hover:to-[#8A2BE2]/60 border border-[#FF007F]/50 text-white text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(255,0,127,0.3)] cursor-pointer whitespace-nowrap"
            >
              <Music className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="hidden md:inline">SOUND VAULT (45+)</span>
              <span className="md:hidden">VAULT</span>
            </button>
          )}
        </div>

        {/* Right Side: Theme, Stream Mode, Auto-Hide & Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Selector */}
          {onSetBgMode && (
            <div className="flex items-center gap-1 bg-[#180e38] p-0.5 rounded-xl border border-[#FF007F]/30 text-xs font-mono">
              <button
                type="button"
                onClick={() => onSetBgMode('VAPORWAVE')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  bgMode === 'VAPORWAVE'
                    ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
                title="80s Vaporwave Theme"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Vaporwave</span>
              </button>
              <button
                type="button"
                onClick={() => onSetBgMode('OBSIDIAN')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  bgMode === 'OBSIDIAN'
                    ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
                title="Obsidian Dark Theme"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Obsidian</span>
              </button>
            </div>
          )}

          {/* Stream Mode Toggle Button */}
          {onToggleStreamMode ? (
            <button
              type="button"
              onClick={onToggleStreamMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,245,255,0.3)] whitespace-nowrap ${
                isStreamMode
                  ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_15px_#FF007F] animate-pulse'
                  : 'border-[#00F5FF]/40 bg-[#00F5FF]/15 text-[#00F5FF] hover:bg-[#00F5FF]/30'
              }`}
              title="Toggle Stream Mode (Shortcut: Spacebar)"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{isStreamMode ? 'STREAM MODE: ON [SPACE]' : 'STREAM MODE [SPACE]'}</span>
              <span className="lg:hidden">OBS</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#00F5FF]/40 bg-[#00F5FF]/15 text-[#00F5FF] hover:bg-[#00F5FF]/30 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,245,255,0.3)]"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Calculator</span>
            </Link>
          )}

          {/* Auto-Hide Toggle Button (Visible in Stream Mode) */}
          {isStreamMode && onToggleAutoHide && (
            <button
              type="button"
              onClick={onToggleAutoHide}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                autoHideMode
                  ? 'bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F]/50 shadow-[0_0_10px_#FF007F]'
                  : 'bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF]/50 shadow-[0_0_10px_#00F5FF]'
              }`}
              title="Toggle Auto-Hide Header on Hover"
            >
              {autoHideMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#00F5FF]" />}
              <span className="hidden xl:inline">{autoHideMode ? 'AUTO-HIDE: ON' : 'AUTO-HIDE: OFF'}</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-[#180e38] hover:bg-[#2a0845] text-white transition-colors border border-[#00F5FF]/40 cursor-pointer shrink-0"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4 text-[#00F5FF]" />
          </button>
        </div>
      </div>
    </header>
  );
}
