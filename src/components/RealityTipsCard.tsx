'use client';

import { FilterBreakdown, DelusionResult } from '../types';
import { Target, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RealityTipsCardProps {
  result: DelusionResult;
  breakdown: FilterBreakdown[];
}

export default function RealityTipsCard({ result, breakdown }: RealityTipsCardProps) {
  // Sort filters by lowest probability (biggest bottlenecks)
  const bottlenecks = [...breakdown]
    .filter((f) => f.probability < 0.95)
    .sort((a, b) => a.probability - b.probability);

  const primaryBottleneck = bottlenecks[0];

  return (
    <div className="bg-[#0e0726] border border-[#00F5FF]/40 rounded-2xl p-5 space-y-4 shadow-[0_0_25px_rgba(0,245,255,0.15)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00F5FF]/25 pb-2.5">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00F5FF]" />
          <h3 className="font-display text-lg sm:text-xl text-white uppercase tracking-wider">
            HOW TO IMPROVE YOUR ODDS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#FFE600] font-bold px-2 py-0.5 rounded bg-[#FFE600]/10 border border-[#FFE600]/30">
          BOTTLENECK ANALYSIS
        </span>
      </div>

      {/* Primary Bottleneck Alert */}
      {primaryBottleneck && (
        <div className="bg-[#180e38] p-3 rounded-xl border border-[#FF007F]/40 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#FF007F] shrink-0 mt-0.5" />
          <div className="text-xs font-mono">
            <span className="font-bold text-[#FF007F] block uppercase">
              #1 FILTER BOTTLENECK: {primaryBottleneck.filterName}
            </span>
            <span className="text-[#E0E0E0] text-[11px] leading-tight">
              Only {(primaryBottleneck.probability * 100).toFixed(1)}% of adult US men pass this single criterion.
            </span>
          </div>
        </div>
      )}

      {/* Actionable Reality Optimization Tips */}
      <div className="space-y-2 text-xs font-mono">
        <div className="flex items-start gap-2 text-[#E0E0E0] bg-[#180e38]/70 p-2.5 rounded-xl border border-[#00F5FF]/20">
          <TrendingUp className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Expand Height & Age Brackets:</strong> Lowering height standard by just 2 inches (e.g. from 6'0" to 5'10") increases the eligible dating pool by <span className="text-[#00F5FF] font-bold">+40%</span>.
          </p>
        </div>

        <div className="flex items-start gap-2 text-[#E0E0E0] bg-[#180e38]/70 p-2.5 rounded-xl border border-[#FFE600]/20">
          <ShieldCheck className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-white">Realistic Income Compounding:</strong> A man earning $100k+ in his 20s is in the top ~8%. Consider potential over immediate peak earning status.
          </p>
        </div>
      </div>

      {/* Host Quote Footer */}
      <div className="pt-1 border-t border-[#00F5FF]/15 flex items-center justify-between text-[10px] font-mono text-[#B3A0D2]">
        <span>Fresh & Fit Golden Rule:</span>
        <span className="text-[#00F5FF] font-bold">"Comforting lies vs. harsh truths."</span>
      </div>
    </div>
  );
}
