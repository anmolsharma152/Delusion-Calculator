'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-[#FF007F]/40 bg-[#0c0721] text-[#B3A0D2] py-8 px-4 sm:px-6 lg:px-8 mt-auto z-10 relative shadow-[0_-10px_30px_rgba(255,0,127,0.15)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        {/* Left: Authoritative Citation */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-[#F5D8F2] font-bold text-sm flex items-center justify-center md:justify-start gap-2">
            <span className="text-white font-display text-lg tracking-wider">FRESH & FIT</span>
            <span className="text-[#FF007F]">•</span>
            <span className="text-[#00F5FF]">OFFICIAL DELUSION CALCULATOR</span>
          </p>
          <p className="text-[11px] text-[#B3A0D2]">
            Data Sources: US Census Bureau (ACS 2023 1-Yr Microdata) & CDC NHANES (2021-2023 Cycle)
          </p>
        </div>

        {/* Center: Interactive Crew Badges */}
        <div className="flex items-center gap-3 bg-[#180e38] px-4 py-2 rounded-2xl border border-[#FF007F]/30 text-[11px]">
          <span className="text-[#FF007F] font-bold">MYRON & FRESH</span>
          <span>•</span>
          <span className="text-[#00F5FF]">PRODUCED BY CHRIS</span>
          <span>•</span>
          <span className="text-[#FFE600]">AUDIO BY BIG MO</span>
          <span>•</span>
          <span className="text-[#FF2AA3]">BILLZ TECH</span>
        </div>

        {/* Right: Quick Nav */}
        <div className="flex items-center gap-4 text-[#B3A0D2] font-bold">
          <Link href="/about" className="hover:text-[#00F5FF] transition-colors">
            METHODOLOGY
          </Link>
          <span>•</span>
          <Link href="/stream" className="hover:text-[#FF007F] transition-colors">
            OBS STREAM MODE
          </Link>
        </div>
      </div>
    </footer>
  );
}
