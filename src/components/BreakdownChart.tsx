'use client';

import { motion } from 'framer-motion';
import { FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';

interface BreakdownChartProps {
  breakdown: FilterBreakdown[];
}

export default function BreakdownChart({ breakdown }: BreakdownChartProps) {
  return (
    <div className="w-full bg-[#180e38]/80 border border-[#FF007F]/30 rounded-xl p-5 space-y-3">
      <h3 className="font-display tracking-wider text-xs uppercase text-[#B3A0D2] border-b border-[#FF007F]/20 pb-2">
        Demographic Filter Breakdown
      </h3>

      <div className="space-y-3">
        {breakdown.map((item, idx) => {
          const pct = Math.round(item.probability * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#F5D8F2]">{item.filterName}: <span className="text-white font-bold">{item.label}</span></span>
                <span className="text-[#00F5FF] font-bold text-glow-cyan">{formatPercentage(item.probability)}</span>
              </div>
              <div className="w-full h-2.5 bg-[#0c0721] rounded-full overflow-hidden border border-[#FF007F]/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8A2BE2] to-[#FF007F] rounded-full shadow-[0_0_8px_#FF007F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
