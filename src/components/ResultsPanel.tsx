'use client';

import { useState } from 'react';
import { DelusionResult, FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';
import { getRandomComment } from '../engine/commentPool';
import GaugeMeter from './GaugeMeter';
import CatBagMeter from './CatBagMeter';
import BreakdownChart from './BreakdownChart';
import CommentBox from './CommentBox';
import RealityTipsCard from './RealityTipsCard';
import { Share2, Users, RotateCcw } from 'lucide-react';

interface ResultsPanelProps {
  result: DelusionResult;
  breakdown: FilterBreakdown[];
  onOpenShareModal?: () => void;
  onReset?: () => void;
}

export default function ResultsPanel({ result, breakdown, onOpenShareModal, onReset }: ResultsPanelProps) {
  const [currentComment, setCurrentComment] = useState<string>(result.catchphrase);

  const handleRefreshRoast = () => {
    const newRoast = getRandomComment(result.tier);
    setCurrentComment(newRoast);
  };

  return (
    <div className="w-full space-y-4 max-w-7xl mx-auto my-auto">
      {/* Balanced 2x2 Grid (Left Column: Scorecard + Cat Bags; Right Column: Breakdown + Roast + Tips) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* LEFT COLUMN */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Card 1: Main Verdict Scorecard */}
          <div className="bg-[#0e0726] p-4 sm:p-5 flex flex-col items-center justify-between text-center border-t-4 border-t-[#FF007F] border-x border-b border-[#FF007F]/40 shadow-[0_0_30px_rgba(255,0,127,0.2)] space-y-2.5 rounded-2xl flex-1">
            <div className="w-full flex items-center justify-between border-b border-[#FF007F]/25 pb-1.5">
              <span className="font-mono text-[11px] text-[#00F5FF] uppercase font-bold text-glow-cyan">
                Step 3: Reality Verdict Reveal
              </span>
              <span className="font-mono text-[11px] text-[#FF007F] uppercase font-bold">
                Official US Census Math
              </span>
            </div>

            {/* Animated Gauge Meter */}
            <GaugeMeter
              score={result.delusionScore}
              tierLabel={result.tierLabel}
              tierColor={result.tierColor}
              tierEmoji={result.tierEmoji}
            />

            {/* Main Percentage Display */}
            <div className="space-y-0.5">
              <div className="text-[11px] uppercase tracking-wider text-[#E0E0E0] font-mono font-semibold">
                Qualifying Population Match
              </div>
              <div className="font-display text-5xl sm:text-6xl text-[#FF007F] text-glow-pink tracking-tight leading-none">
                {formatPercentage(result.matchPercentage)}
              </div>
              <div className="text-base font-mono font-bold text-[#FFE600] text-glow-gold flex items-center justify-center gap-1 mt-1">
                <Users className="w-4 h-4 text-[#FFE600]" />
                <span>{result.matchRatio}</span>
              </div>
            </div>

            {/* Action Buttons: SHARE & RESET */}
            <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
              {onOpenShareModal && (
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E50914] to-[#8A2BE2] hover:opacity-95 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(229,9,20,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>SHARE / SAVE</span>
                </button>
              )}

              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="py-2.5 px-3 rounded-xl bg-[#180e38] border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(0,245,255,0.25)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>TEST NEW</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Cat Lady Risk Index */}
          <CatBagMeter score={result.delusionScore} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Card 1: Demographic Breakdown Chart */}
          <BreakdownChart breakdown={breakdown} />

          {/* Card 2: Fresh & Fit Reality Check Terminal */}
          <CommentBox comment={currentComment} onRefreshComment={handleRefreshRoast} />

          {/* Card 3: Reality Tips & Odds Optimizer */}
          <RealityTipsCard result={result} breakdown={breakdown} />
        </div>
      </div>
    </div>
  );
}
