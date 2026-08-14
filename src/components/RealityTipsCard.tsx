'use client';

import { FilterBreakdown, DelusionResult } from '../types';
import { Target, TrendingUp, AlertTriangle, Lightbulb, Compass } from 'lucide-react';

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
  const secondaryBottleneck = bottlenecks[1];

  return (
    <div className="w-full bg-[#0e0726] border-2 border-[#00F5FF]/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_0_35px_rgba(0,245,255,0.2)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00F5FF]/30 pb-3">
        <div className="flex items-center gap-2.5">
          <Target className="w-6 h-6 text-[#00F5FF]" />
          <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white">
            HOW TO IMPROVE YOUR ODDS
          </h3>
        </div>
        <span className="text-xs font-mono text-[#FFE600] font-bold px-3 py-1 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/40">
          BOTTLENECK ANALYSIS
        </span>
      </div>

      {/* Primary & Secondary Bottleneck Callouts */}
      <div className="space-y-3">
        {primaryBottleneck && (
          <div className="bg-[#180e38] p-4 rounded-xl border border-[#FF007F]/50 flex items-start gap-3.5 shadow-md">
            <AlertTriangle className="w-5 h-5 text-[#FF007F] shrink-0 mt-0.5" />
            <div className="text-sm font-mono space-y-1">
              <div className="font-bold text-[#FF007F] uppercase tracking-wide">
                #1 CRITICAL BOTTLENECK: {primaryBottleneck.filterName} ({primaryBottleneck.label})
              </div>
              <p className="text-[#E0E0E0] text-xs sm:text-sm leading-relaxed">
                This single filter eliminates <strong className="text-white">{(100 - primaryBottleneck.probability * 100).toFixed(1)}%</strong> of adult US men from your pool.
              </p>
            </div>
          </div>
        )}

        {secondaryBottleneck && (
          <div className="bg-[#180e38] p-4 rounded-xl border border-[#FFE600]/40 flex items-start gap-3.5 shadow-md">
            <Compass className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
            <div className="text-sm font-mono space-y-1">
              <div className="font-bold text-[#FFE600] uppercase tracking-wide">
                #2 BOTTLENECK: {secondaryBottleneck.filterName} ({secondaryBottleneck.label})
              </div>
              <p className="text-[#E0E0E0] text-xs sm:text-sm leading-relaxed">
                Filters out an additional <strong className="text-white">{(100 - secondaryBottleneck.probability * 100).toFixed(1)}%</strong> of candidates in this age bracket.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actionable Reality Optimization Tips */}
      <div className="space-y-3 pt-1 text-sm font-mono">
        <div className="flex items-start gap-3 bg-[#180e38]/80 p-4 rounded-xl border border-[#00F5FF]/30">
          <TrendingUp className="w-5 h-5 text-[#00F5FF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block text-sm">Height & Age Bracket Optimization:</span>
            <p className="text-xs sm:text-sm text-[#E0E0E0] leading-relaxed">
              Lowering your height requirement by just 2 inches (e.g. from 6'0" to 5'10") immediately expands your qualifying pool by <span className="text-[#00F5FF] font-bold text-glow-cyan">+40%</span>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-[#180e38]/80 p-4 rounded-xl border border-[#FF007F]/30">
          <Lightbulb className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block text-sm">Income Potential vs. Immediate Peak:</span>
            <p className="text-xs sm:text-sm text-[#E0E0E0] leading-relaxed">
              Only ~8% of men in their 20s earn $100k+. Look for ambition, trajectory, and work ethic rather than filtering out 92% of good men.
            </p>
          </div>
        </div>
      </div>

      {/* Host Quote Footer */}
      <div className="border-t border-[#00F5FF]/20 pt-3 flex items-center justify-between text-xs font-mono text-[#B3A0D2]">
        <span>Fresh & Fit Law:</span>
        <span className="text-[#00F5FF] font-bold text-sm">"Comforting lies vs. harsh truths."</span>
      </div>
    </div>
  );
}
