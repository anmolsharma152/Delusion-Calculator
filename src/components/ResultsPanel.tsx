'use client';

import { useState } from 'react';
import { DelusionResult, FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';
import { getRandomComment } from '../engine/commentPool';
import GaugeMeter from './GaugeMeter';
import CatBagMeter from './CatBagMeter';
import BreakdownChart from './BreakdownChart';
import CommentBox from './CommentBox';
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
    <div className="w-full space-y-6 max-w-7xl mx-auto my-auto">
      {/* Balanced 2-Column Layout (2 cards on Left, 2 cards on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN (2 Cards: Scorecard & Cat Lady Risk Index) */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Card 1: Main Verdict Scorecard */}
          <div className="glass-card-vapor p-6 flex flex-col items-center justify-between text-center border-t-4 border-t-[#FF007F] shadow-[0_0_35px_rgba(255,0,127,0.35)] space-y-4 rounded-2xl">
            <div className="w-full flex items-center justify-between border-b border-[#FF007F]/30 pb-2">
              <span className="font-mono text-xs text-[#00F5FF] uppercase font-bold text-glow-cyan">
                Step 3: Reality Verdict Reveal
              </span>
              <span className="font-mono text-xs text-[#FF007F] uppercase font-bold">
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
            <div className="space-y-1 my-1">
              <div className="text-xs uppercase tracking-widest text-[#E0E0E0] font-mono font-bold">
                Qualifying Population Match
              </div>
              <div className="font-display text-6xl sm:text-7xl text-[#FF007F] text-glow-pink tracking-tight">
                {formatPercentage(result.matchPercentage)}
              </div>
              <div className="text-lg font-mono font-bold text-[#FFE600] text-glow-gold flex items-center justify-center gap-1">
                <Users className="w-5 h-5 text-[#FFE600]" />
                <span>{result.matchRatio}</span>
              </div>
            </div>

            {/* Action Buttons: SHARE & RESET */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF007F] to-[#8A2BE2] hover:opacity-95 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,127,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#FFE600]" />
                  <span>SHARE / SAVE CARD</span>
                </button>
              )}

              {onReset && (
                <button
                  onClick={onReset}
                  className="py-3.5 px-4 rounded-xl bg-[#0c0721] border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>TEST NEW STANDARDS</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Cat Lady Risk Index (Moved below Scorecard on Left Side) */}
          <div className="glass-card-vapor p-5 rounded-2xl border border-[#FF007F]/40 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
            <CatBagMeter score={result.delusionScore} />
          </div>
        </div>

        {/* RIGHT COLUMN (2 Cards: Demographic Breakdown Chart & Reality Check Terminal) */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Card 1: Per-Filter Demographic Breakdown Chart */}
          <BreakdownChart breakdown={breakdown} />

          {/* Card 2: Fresh & Fit Reality Check Terminal */}
          <CommentBox comment={currentComment} onRefreshComment={handleRefreshRoast} />
        </div>
      </div>
    </div>
  );
}
