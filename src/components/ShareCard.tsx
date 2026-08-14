'use client';

import { DelusionResult, CriteriaState } from '../types';
import { formatPercentage, formatHeight, formatIncome } from '../utils/format';
import { X, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareCardProps {
  result: DelusionResult;
  criteria: CriteriaState;
  onClose: () => void;
}

export default function ShareCard({ result, criteria, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const textToShare = `My Delusion Score is ${result.delusionScore}/5 (${formatPercentage(result.matchPercentage)} match). Test your standards on the Female Delusion Calculator: ${window.location.href}`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Female Delusion Calculator',
        text: `My Delusion Score is ${result.delusionScore}/5 (${formatPercentage(result.matchPercentage)} match). How delusional are your standards?`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0c0721] border-2 border-[#FF007F] rounded-2xl p-6 shadow-[0_0_50px_rgba(255,0,127,0.4)] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E0E0E0] hover:text-white transition-colors cursor-pointer p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Share Card Content */}
        <div id="share-card-graphic" className="bg-[#180e38] border border-[#FF007F]/40 rounded-xl p-6 space-y-4 text-center">
          {/* Header Branding */}
          <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-3">
            <span className="font-display text-xl text-white">
              DELUSION <span className="text-[#FF007F] text-glow-pink">CALCULATOR</span>
            </span>
            <span className="text-[10px] font-mono text-[#00F5FF] uppercase font-bold">
              Miami 80s Edition
            </span>
          </div>

          {/* Big Score */}
          <div className="py-2 space-y-1">
            <div className="text-xs uppercase font-mono text-[#E0E0E0] font-bold">
              Demographic Match Score
            </div>
            <div className="font-display text-5xl sm:text-6xl text-[#FF007F] text-glow-pink">
              {formatPercentage(result.matchPercentage)}
            </div>
            <div className="text-sm font-mono font-bold text-[#00F5FF]">
              {result.matchRatio}
            </div>
          </div>

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF007F]/20 border border-[#FF007F] text-white font-display tracking-wider text-base uppercase">
            <span>{result.tierEmoji}</span>
            <span>{result.tierLabel} (Score: {result.delusionScore}/5)</span>
          </div>

          {/* Summary Criteria */}
          <div className="text-xs font-mono text-[#E0E0E0] bg-[#0c0721] p-3 rounded-lg text-left space-y-1 border border-[#FF007F]/20">
            <p><span className="text-white font-bold">Age:</span> {criteria.minAge} - {criteria.maxAge}</p>
            <p><span className="text-white font-bold">Min Height:</span> {formatHeight(criteria.minHeight)}</p>
            <p><span className="text-white font-bold">Min Income:</span> {formatIncome(criteria.minIncome)}/yr</p>
            <p><span className="text-white font-bold">Status:</span> {criteria.maritalPref}</p>
          </div>

          {/* Roast Quote */}
          <p className="font-mono text-xs text-white italic font-bold bg-[#0c0721]/60 p-2.5 rounded-lg border border-[#00F5FF]/30">
            "{result.catchphrase}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#FF007F] to-[#8A2BE2] hover:opacity-90 text-white font-display text-base uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Result</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#180e38] border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 font-display text-base uppercase tracking-wider font-bold transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
