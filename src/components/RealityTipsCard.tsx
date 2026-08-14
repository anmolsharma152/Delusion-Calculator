'use client';

import { FilterBreakdown, DelusionResult } from '../types';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

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
    <div className="bg-[#0e0726] border border-[#00F5FF]/40 rounded-2xl p-4 space-y-2.5 shadow-[0_0_20px_rgba(0,245,255,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00F5FF]/20 pb-1.5">
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-[#00F5FF]" />
          <h3 className="font-display text-sm uppercase tracking-wider text-white">
            HOW TO IMPROVE YOUR ODDS
          </h3>
        </div>
        <span className="text-[9px] font-mono text-[#FFE600] font-bold px-1.5 py-0.5 rounded bg-[#FFE600]/10 border border-[#FFE600]/30">
          BOTTLENECK ANALYSIS
        </span>
      </div>

      {/* Primary Bottleneck Alert */}
      {primaryBottleneck && (
        <div className="bg-[#180e38] p-2 rounded-xl border border-[#FF007F]/40 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#FF007F] shrink-0" />
          <div className="text-[11px] font-mono leading-tight">
            <span className="font-bold text-[#FF007F] uppercase">
              #1 Bottleneck: {primaryBottleneck.filterName}
            </span>
            <span className="text-[#B3A0D2] ml-1">
              (Pass rate: {(primaryBottleneck.probability * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      )}

      {/* Actionable Reality Optimization Tips */}
      <div className="space-y-1.5 text-[11px] font-mono">
        <div className="flex items-start gap-1.5 text-[#E0E0E0] bg-[#180e38]/70 p-2 rounded-xl border border-[#00F5FF]/20">
          <TrendingUp className="w-3.5 h-3.5 text-[#00F5FF] shrink-0 mt-0.5" />
          <p className="leading-tight">
            <strong className="text-white">Height & Age:</strong> Lowering height standard by 2" (6'0" $\rightarrow$ 5'10") increases candidate pool by <span className="text-[#00F5FF] font-bold">+40%</span>.
          </p>
        </div>
      </div>

      {/* Host Quote Footer */}
      <div className="border-t border-[#00F5FF]/15 pt-1 flex items-center justify-between text-[9px] font-mono text-[#8B8B8B]">
        <span>Fresh & Fit Axiom:</span>
        <span className="text-[#00F5FF] font-bold">"Comforting lies vs. harsh truths."</span>
      </div>
    </div>
  );
}
