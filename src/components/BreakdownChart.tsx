'use client';

import { motion } from 'framer-motion';
import { FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';
import { BarChart3, ShieldCheck } from 'lucide-react';

interface BreakdownChartProps {
  breakdown: FilterBreakdown[];
}

export default function BreakdownChart({ breakdown }: BreakdownChartProps) {
  return (
    <div className="w-full bg-[#0e0726] border-2 border-[#FF007F]/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_0_35px_rgba(255,0,127,0.2)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-3">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-[#00F5FF]" />
          <h3 className="font-display text-xl sm:text-2xl tracking-wider uppercase text-white">
            Demographic Filter Breakdown
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#00F5FF] font-bold bg-[#00F5FF]/10 px-3 py-1 rounded-lg border border-[#00F5FF]/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>US CENSUS ACS 2023</span>
        </div>
      </div>

      {/* Filter Bars List */}
      <div className="space-y-4 pt-1">
        {breakdown.map((item, idx) => {
          const pct = Math.round(item.probability * 100);
          return (
            <div key={idx} className="space-y-2 bg-[#180e38]/70 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-[#E0E0E0] font-medium">
                  {item.filterName}: <span className="text-white font-bold text-[#FFE600]">{item.label}</span>
                </span>
                <span className="text-[#00F5FF] font-bold text-base text-glow-cyan">
                  {formatPercentage(item.probability)}
                </span>
              </div>
              <div className="w-full h-3.5 bg-[#0c0721] rounded-full overflow-hidden border border-[#FF007F]/30 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8A2BE2] to-[#FF007F] rounded-full shadow-[0_0_10px_#FF007F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
