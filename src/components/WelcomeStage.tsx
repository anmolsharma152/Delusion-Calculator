'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Award, DollarSign, CheckCircle2, Users, ExternalLink } from 'lucide-react';

interface WelcomeStageProps {
  onStart: () => void;
}

export default function WelcomeStage({ onStart }: WelcomeStageProps) {
  return (
    <div className="w-full py-0.5 sm:py-1 relative flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full space-y-2.5 sm:space-y-3">
        {/* Main Banner Card */}
        <div className="bg-[#0e0726] p-4 sm:p-4 rounded-2xl border-2 border-[#FF007F]/40 shadow-[0_0_45px_rgba(255,0,127,0.35)] text-center space-y-3 relative overflow-hidden">
          {/* Title - Official banner image with clockwise rotating cat litter bag */}
          <div className="space-y-1.5 py-0 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Main Banner */}
              <Image
                src="/Assets/fnf_delusion_banner.png"
                alt="Fresh & Fit Podcast - Female Delusion Calculator"
                width={1280}
                height={488}
                priority
                className="block w-auto h-24 sm:h-32 md:h-32 object-contain drop-shadow-[0_0_25px_rgba(255,0,127,0.5)]"
              />

              {/* Exactly 1 Clockwise Rotating Cat Litter Bag */}
              <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-4 sm:-ml-5 w-14 h-16 sm:w-20 sm:h-24 drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] animate-spin-clockwise">
                <Image
                  src="/Assets/cat_litter_bag.png"
                  alt="Cat Litter Bag"
                  fill
                  sizes="(max-width: 640px) 56px, 80px"
                  className="object-contain"
                />
              </div>
            </div>

            <p className="font-mono text-[11px] sm:text-xs text-[#00F5FF] font-bold text-glow-cyan">
              "HOW DELUSIONAL ARE YOUR STANDARDS IN A MAN?" — THE NUMBERS DON'T LIE
            </p>
          </div>

          {/* Side-by-Side Central Host Profile Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto pt-0.5">
            {/* Myron Gaines Badge */}
            <div className="bg-[#180e38] border border-[#FF007F]/40 p-3 rounded-xl flex items-center gap-3 text-left shadow-lg">
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
                <div className="text-xs font-mono text-[#E0E0E0] space-y-0 pt-0.5">
                  <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FF007F]" /> Ex-HSI Special Agent</p>
                  <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#FFE600]" /> Real Estate Investor & Author</p>
                </div>
              </div>
            </div>

            {/* Walter Weekes (Fresh) Badge */}
            <div className="bg-[#180e38] border border-[#00F5FF]/40 p-3 rounded-xl flex items-center gap-3 text-left shadow-lg">
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
                <div className="text-xs font-mono text-[#E0E0E0] space-y-0 pt-0.5">
                  <p className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#00F5FF]" /> Tech Entrepreneur</p>
                  <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#FFE600]" /> Real Estate Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview & Government Data Methodology Card */}
        <div className="bg-[#0e0726] p-4 sm:p-4 rounded-2xl border border-[#FF007F]/30 space-y-3 text-left font-mono shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 text-[#FFE600] font-bold text-sm sm:text-base border-b border-[#FF007F]/20 pb-1.5">
            <Users className="w-5 h-5 text-[#FFE600]" />
            <span>THE FRESH & FIT REALITY CHECK METHODOLOGY</span>
          </div>

          {/* Government Data Sources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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

            {/* CPS Data Tables Citation */}
            <a
              href="https://www.census.gov/programs-surveys/cps/data/tables.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 bg-[#180e38] p-3 rounded-xl border border-[#FFE600]/30 hover:border-[#FFE600]/70 transition-colors sm:col-span-2 group"
            >
              <ExternalLink className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <span className="font-bold text-white block text-xs sm:text-sm">US Census Bureau CPS Data Tables</span>
                <span className="text-[#B3A0D2] text-xs">Monthly labor force, income & demographic statistics. <span className="text-[#FFE600] underline underline-offset-2">census.gov/programs-surveys/cps/data/tables.html</span></span>
              </div>
            </a>
          </div>

          {/* Action Button */}
          <div className="pt-1">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={onStart}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF] text-white font-display text-xl uppercase tracking-widest font-bold shadow-[0_0_35px_rgba(255,0,127,0.6)] hover:shadow-[0_0_45px_rgba(0,245,255,0.8)] transition-all flex items-center justify-center gap-3 cursor-pointer"
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
