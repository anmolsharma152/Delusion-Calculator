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
        className="relative w-full max-w-2xl bg-[#0c0721] border-2 border-[#FF007F] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,127,0.4)] max-h-[85vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E0E0E0] hover:text-white transition-colors cursor-pointer p-1"
          title="Close [Esc]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wider">
            KEYBOARD <span className="text-[#00F5FF] text-glow-cyan">SHORTCUTS</span>
          </h2>
          <p className="text-xs font-mono text-[#B3A0D2] uppercase tracking-widest mt-1.5">
            Press [/] any time to toggle this overlay
          </p>
        </div>

        <div className="space-y-5">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-mono font-bold text-[#FF007F] uppercase tracking-widest mb-2">
                {group.title}
              </div>
              <div className="space-y-2">
                {group.entries.map((entry) => (
                  <div
                    key={`${group.title}-${entry.label}`}
                    className="flex items-center justify-between gap-3 bg-[#180e38] border border-[#FF007F]/30 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-xs sm:text-sm text-[#E0E0E0] font-sans">{entry.label}</span>
                    <span className="flex items-center gap-1 flex-wrap justify-end">
                      {entry.keys.map((key) => (
                        <kbd
                          key={key}
                          className="px-2 py-1 rounded-lg bg-[#0e0726] border border-[#00F5FF]/50 text-[#00F5FF] font-mono text-xs font-bold shadow-[0_0_8px_rgba(0,245,255,0.3)]"
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
      </div>
    </div>
  );
}
