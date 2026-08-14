'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Award, DollarSign, CheckCircle2, Users } from 'lucide-react';

interface WelcomeStageProps {
  onStart: () => void;
}

export default function WelcomeStage({ onStart }: WelcomeStageProps) {
  return (
    <div className="w-full py-2 sm:py-3 relative flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full space-y-4 sm:space-y-5">
        {/* Main Banner Card */}
        <div className="bg-[#0e0726] p-5 sm:p-7 rounded-2xl border-2 border-[#FF007F]/40 shadow-[0_0_45px_rgba(255,0,127,0.35)] text-center space-y-4 relative overflow-hidden">
          {/* Title - Official banner image with clockwise rotating cat litter bag */}
          <div className="space-y-2 py-1 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
              {/* Main Banner */}
              <div className="relative w-full max-w-xl h-24 sm:h-32 md:h-36 drop-shadow-[0_0_25px_rgba(255,0,127,0.5)]">
                <Image
                  src="/Assets/fnf_delusion_banner.png"
                  alt="Fresh & Fit Podcast - Female Delusion Calculator"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Exactly 1 Clockwise Rotating Cat Litter Bag */}
              <div className="relative w-14 h-16 sm:w-20 sm:h-24 shrink-0 drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] animate-spin-clockwise">
                <Image
                  src="/Assets/cat_litter_bag.png"
                  alt="Cat Litter Bag"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#00F5FF] font-bold text-glow-cyan">
              "HOW DELUSIONAL ARE YOUR STANDARDS IN A MAN?" — THE NUMBERS DON'T LIE
            </p>
          </div>

          {/* Side-by-Side Central Host Profile Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-1">
            {/* Myron Gaines Badge */}
            <div className="bg-[#180e38] border border-[#FF007F]/40 p-3.5 rounded-xl flex items-center gap-3.5 text-left shadow-lg">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#FF007F] shadow-[0_0_15px_#FF007F] relative shrink-0">
                <Image src="/Assets/myron2.jpg" alt="Myron Gaines" fill sizes="(max-width: 640px) 64px, 80px" className="object-cover object-top" priority />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl text-white tracking-wider uppercase text-glow-pink leading-none">
                  MYRON GAINES
                </h3>
                <span className="text-xs font-mono text-[#00F5FF] font-bold block">
                  LEAD ANALYST & HOST
                </span>
                <div className="text-xs font-mono text-[#E0E0E0] space-y-0.5 pt-0.5">
                  <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FF007F]" /> Ex-HSI Special Agent</p>
                  <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#FFE600]" /> Real Estate Investor & Author</p>
                </div>
              </div>
            </div>

            {/* Walter Weekes (Fresh) Badge */}
            <div className="bg-[#180e38] border border-[#00F5FF]/40 p-3.5 rounded-xl flex items-center gap-3.5 text-left shadow-lg">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#00F5FF] shadow-[0_0_15px_#00F5FF] relative shrink-0">
                <Image src="/Assets/fresh.jpg" alt="Walter Weekes (Fresh)" fill sizes="(max-width: 640px) 64px, 80px" className="object-cover object-top" priority />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl text-white tracking-wider uppercase text-glow-cyan leading-none">
                  WALTER WEEKES
                </h3>
                <span className="text-xs font-mono text-[#FF007F] font-bold block">
                  CO-HOST & CONNECTOR
                </span>
                <div className="text-xs font-mono text-[#E0E0E0] space-y-0.5 pt-0.5">
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#00F5FF]" /> Tech Entrepreneur</p>
                  <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#FFE600]" /> Real Estate Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview & Government Data Methodology Card */}
        <div className="bg-[#0e0726] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/30 space-y-4 text-left font-mono shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 text-[#FFE600] font-bold text-base sm:text-lg border-b border-[#FF007F]/20 pb-2">
            <Users className="w-5 h-5 text-[#FFE600]" />
            <span>THE FRESH & FIT REALITY CHECK METHODOLOGY</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-[#E0E0E0] leading-relaxed">
            <p>
              On <strong className="text-white">Fresh & Fit After Hours</strong>, Myron Gaines and Walter Weekes test female podcast guests on their expectations for a partner (6'0"+ height, $100k-$250k+ income, single, fit, educated).
            </p>
            <p>
              This calculator cross-references real US government microdata (~100M+ adult men) to reveal the exact mathematical probability of finding a partner matching your criteria.
            </p>
          </div>

          {/* Government Data Sources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 bg-[#180e38] p-3 rounded-xl border border-[#00F5FF]/30">
              <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-xs sm:text-sm">US Census Bureau ACS (2023)</span>
                <span className="text-[#B3A0D2] text-xs">Income distributions, age brackets, race, & marriage stats.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-[#180e38] p-3 rounded-xl border border-[#FF007F]/30">
              <CheckCircle2 className="w-4 h-4 text-[#FF007F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-xs sm:text-sm">CDC NHANES (2021-2023)</span>
                <span className="text-[#B3A0D2] text-xs">Physical height percentiles (Mean = 5'9.1") & BMI non-obesity rates.</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-1.5">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={onStart}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF] text-white font-display text-2xl uppercase tracking-widest font-bold shadow-[0_0_35px_rgba(255,0,127,0.6)] hover:shadow-[0_0_45px_rgba(0,245,255,0.8)] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-6 h-6 text-[#FFE600] animate-spin" />
              <span>START DELUSION TEST</span>
              <ArrowRight className="w-6 h-6 text-white animate-pulse" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
