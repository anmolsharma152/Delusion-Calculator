'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { SHORTCUT_GROUPS } from '@/lib/shortcuts';

interface ShortcutsCheatsheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsCheatsheet({ isOpen, onClose }: ShortcutsCheatsheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c0721] border-2 border-[#FF007F]/70 rounded-3xl shadow-[0_0_70px_rgba(255,0,127,0.45)] overflow-hidden"
      >
        {/* Top Neon Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF]" />

        {/* Header */}
        <div className="relative flex items-start justify-between px-7 sm:px-9 pt-7 pb-5 border-b border-[#FF007F]/25 bg-gradient-to-b from-[#180e38] to-transparent">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#00F5FF] uppercase tracking-[0.35em] mb-1.5">
              Fresh & Fit · Live Tool
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wide leading-none">
              KEYBOARD <span className="text-[#FF007F] text-glow-pink">SHORTCUTS</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 p-2 rounded-xl bg-[#180e38] border border-[#FF007F]/40 text-[#E0E0E0] hover:text-white hover:border-[#FF007F] transition-colors cursor-pointer"
            title="Close [Esc]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Compact Grid — designed to fit a single screen, no scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5 px-7 sm:px-9 py-6">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#FF007F] to-[#00F5FF] shadow-[0_0_8px_rgba(255,0,127,0.6)]" />
                <h3 className="font-subhead text-sm uppercase tracking-[0.22em] text-[#FFE600] leading-none">
                  {group.title}
                </h3>
              </div>
              <div className="space-y-1.5">
                {group.entries.map((entry) => (
                  <div
                    key={`${group.title}-${entry.label}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#140b2e]/80 px-3.5 py-2"
                  >
                    <span className="text-xs sm:text-[13px] text-[#E0E0E0] font-sans font-medium">
                      {entry.label}
                    </span>
                    <span className="flex items-center gap-1 flex-wrap justify-end">
                      {entry.keys.map((key) => (
                        <kbd
                          key={key}
                          className="min-w-7 px-1.5 py-0.5 rounded-md bg-[#0e0726] border border-[#00F5FF]/50 text-[#00F5FF] font-mono text-[11px] font-bold text-center shadow-[0_0_8px_rgba(0,245,255,0.25)]"
                        >
                          {key}
                        </kbd>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Hint */}
        <div className="px-7 sm:px-9 pb-5 text-center">
          <p className="text-[11px] font-mono text-[#B3A0D2] uppercase tracking-[0.25em]">
            Press <span className="text-[#00F5FF] font-bold">[/]</span> to toggle ·{' '}
            <span className="text-[#FF007F] font-bold">[Esc]</span> to close
          </p>
        </div>
      </div>
    </div>
  );
}