'use client';

import { motion } from 'framer-motion';
import { FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';

interface BreakdownChartProps {
  breakdown: FilterBreakdown[];
}

export default function BreakdownChart({ breakdown }: BreakdownChartProps) {
  return (
    <div className="w-full bg-[#0e0726] border border-[#FF007F]/30 rounded-2xl p-4 space-y-2.5 shadow-md">
      <div className="flex items-center justify-between border-b border-[#FF007F]/20 pb-1.5">
        <h3 className="font-display tracking-wider text-xs uppercase text-[#B3A0D2]">
          Demographic Filter Breakdown
        </h3>
        <span className="text-[10px] font-mono text-[#00F5FF]">CENSUS ACS 2023</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {breakdown.map((item, idx) => {
          const pct = Math.round(item.probability * 100);
          return (
            <div key={idx} className="space-y-0.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#F5D8F2] truncate max-w-[130px]" title={item.label}>
                  {item.filterName}
                </span>
                <span className="text-[#00F5FF] font-bold text-glow-cyan">
                  {formatPercentage(item.probability)}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#180e38] rounded-full overflow-hidden border border-[#FF007F]/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8A2BE2] to-[#FF007F] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
