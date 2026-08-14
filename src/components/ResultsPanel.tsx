'use client';

import { useState, useRef } from 'react';
import { DelusionResult, FilterBreakdown } from '../types';
import { formatPercentage } from '../utils/format';
import { getRandomComment } from '../engine/commentPool';
import GaugeMeter from './GaugeMeter';
import CatBagMeter from './CatBagMeter';
import BreakdownChart from './BreakdownChart';
import CommentBox from './CommentBox';
import RealityTipsCard from './RealityTipsCard';
import { Share2, Users, RotateCcw, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsPanelProps {
  result: DelusionResult;
  breakdown: FilterBreakdown[];
  onOpenShareModal?: () => void;
  onReset?: () => void;
}

export default function ResultsPanel({ result, breakdown, onOpenShareModal, onReset }: ResultsPanelProps) {
  const [currentComment, setCurrentComment] = useState<string>(result.catchphrase);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleRefreshRoast = () => {
    const newRoast = getRandomComment(result.tier);
    setCurrentComment(newRoast);
  };

  const handleToggleDetails = () => {
    const nextState = !showDetails;
    setShowDetails(nextState);
    if (nextState) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="w-full space-y-6 max-w-6xl mx-auto my-auto pb-6">
      {/* Primary Hero Stage: 3 Core Components (Scorecard, Cat Lady Index, Reality Terminal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main Scorecard (7 cols on large screens) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Main Verdict Scorecard */}
          <div className="bg-[#0e0726] p-6 sm:p-7 flex flex-col items-center justify-between text-center border-t-4 border-t-[#FF007F] border-x border-b border-[#FF007F]/40 shadow-[0_0_40px_rgba(255,0,127,0.3)] space-y-4 rounded-2xl">
            <div className="w-full flex items-center justify-between border-b border-[#FF007F]/30 pb-2.5">
              <span className="font-mono text-xs text-[#00F5FF] uppercase font-bold text-glow-cyan">
                Step 3: Reality Verdict Reveal
              </span>
              <span className="font-mono text-xs text-[#FF007F] uppercase font-bold">
                Official US Census Math
              </span>
            </div>

            {/* Large Animated Semi-Circle Gauge */}
            <GaugeMeter
              score={result.delusionScore}
              tierLabel={result.tierLabel}
              tierColor={result.tierColor}
              tierEmoji={result.tierEmoji}
            />

            {/* Big Match Percentage Display */}
            <div className="space-y-1 my-1">
              <div className="text-xs uppercase tracking-widest text-[#E0E0E0] font-mono font-bold">
                Qualifying Population Match
              </div>
              <div className="font-display text-6xl sm:text-7xl text-[#FF007F] text-glow-pink tracking-tight leading-none">
                {formatPercentage(result.matchPercentage)}
              </div>
              <div className="text-lg font-mono font-bold text-[#FFE600] text-glow-gold flex items-center justify-center gap-1.5 mt-2">
                <Users className="w-5 h-5 text-[#FFE600]" />
                <span>{result.matchRatio}</span>
              </div>
            </div>

            {/* Action Buttons: SHARE & RESET */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              {onOpenShareModal && (
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#E50914] to-[#8A2BE2] hover:opacity-95 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#FFE600]" />
                  <span>SHARE / SAVE CARD</span>
                </button>
              )}

              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="py-3 px-4 rounded-xl bg-[#180e38] border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>TEST NEW STANDARDS</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Cat Lady Meter & Reality Terminal (5 cols on large screens) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          {/* Card 2: Fresh & Fit Reality Check Terminal */}
          <CommentBox comment={currentComment} onRefreshComment={handleRefreshRoast} />

          {/* Card 3: Cat Lady Index (Purina Risk Meter) */}
          <CatBagMeter score={result.delusionScore} />

          {/* More Details Collapsible Trigger Button */}
          <button
            type="button"
            onClick={handleToggleDetails}
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#180e38] to-[#25154d] hover:from-[#25154d] hover:to-[#35156d] border border-[#00F5FF]/50 text-[#00F5FF] hover:text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-between transition-all shadow-[0_0_20px_rgba(0,245,255,0.25)] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-[#FFE600]" />
              <span className="tracking-wide">
                {showDetails ? 'HIDE STATISTICAL BREAKDOWN' : 'VIEW STATISTICAL BREAKDOWN & TIPS'}
              </span>
            </div>
            {showDetails ? <ChevronUp className="w-5 h-5 text-[#FF007F]" /> : <ChevronDown className="w-5 h-5 text-[#00F5FF]" />}
          </button>
        </div>
      </div>

      {/* Expandable Deep Dive Section: Spacious Demographic Breakdown & Odds Optimizer */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden pt-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 4: Per-Filter Demographic Breakdown Chart (Spacious & Bold) */}
              <BreakdownChart breakdown={breakdown} />

              {/* Card 5: How To Improve Your Odds (Bottleneck Analysis) */}
              <RealityTipsCard result={result} breakdown={breakdown} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
