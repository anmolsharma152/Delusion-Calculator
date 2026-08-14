'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tv } from 'lucide-react';

interface HeaderProps {
  onGoHome?: () => void;
}

export default function Header({ onGoHome }: HeaderProps) {
  return (
    <header className="w-full border-b border-[#FF007F]/30 bg-[#0c0721]/90 backdrop-blur-xl sticky top-0 z-40 shadow-[0_4px_20px_rgba(255,0,127,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo with Official Cover Art (Takes user home) */}
        <Link
          href="/"
          onClick={(e) => {
            if (onGoHome) {
              e.preventDefault();
              onGoHome();
            }
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#FF007F] shadow-lg shadow-[#FF007F]/30 group-hover:shadow-[#00F5FF]/50 transition-all duration-300 relative shrink-0">
            <Image
              src="/Assets/FreshnFit After Hours - Cover Art.jpg"
              alt="Fresh & Fit After Hours"
              fill
              sizes="44px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <h1 className="font-display text-2xl tracking-wider text-white flex items-center gap-2">
              DELUSION <span className="text-[#FF007F] text-glow-pink">CALCULATOR</span>
            </h1>
            <p className="text-[10px] text-[#00F5FF] tracking-widest uppercase -mt-1 font-mono font-bold">
              FRESH & FIT MIAMI AFTER HOURS
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/stream"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#00F5FF]/40 bg-[#00F5FF]/10 text-[#00F5FF] hover:bg-[#00F5FF]/25 text-xs sm:text-sm font-mono font-medium transition-all duration-200 shadow-[0_0_12px_rgba(0,245,255,0.3)]"
          >
            <Tv className="w-4 h-4 animate-pulse text-[#00F5FF]" />
            <span className="hidden sm:inline">Stream Mode (OBS)</span>
            <span className="sm:hidden">OBS</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
