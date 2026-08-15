'use client';

import { DelusionResult, CriteriaState } from '../types';
import { formatPercentage, formatHeight, formatIncome } from '../utils/format';
import { X, Share2, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';

interface ShareCardProps {
  result: DelusionResult;
  criteria: CriteriaState;
  onClose: () => void;
}

export default function ShareCard({ result, criteria, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Listen for Escape key to close the share card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyLink = () => {
    const textToShare = `My Delusion Score is ${result.delusionScore}/5 (${formatPercentage(result.matchPercentage)} match). Test your standards on the Female Delusion Calculator: ${window.location.href}`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadImage = async () => {
    const node = document.getElementById('share-card-graphic');
    if (!node) return;

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(node, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Delusion-Calculator-${result.tierLabel}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsDownloading(false);
    }
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
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0c0721] border-2 border-[#FF007F] rounded-2xl p-6 shadow-[0_0_50px_rgba(255,0,127,0.4)] space-y-5"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#E0E0E0] hover:text-white transition-colors cursor-pointer p-1.5 rounded-xl bg-[#180e38] border border-[#FF007F]/60 shadow-[0_0_12px_rgba(255,0,127,0.3)] hover:border-[#FF007F]"
          title="Close [Esc]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Share Card Content to Capture */}
        <div id="share-card-graphic" className="bg-gradient-to-b from-[#180e38] to-[#0c0721] border-2 border-[#FF007F]/50 rounded-2xl p-6 space-y-4 text-center shadow-2xl relative overflow-hidden">
          {/* Header Branding */}
          <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-3">
            <span className="font-display text-2xl text-white tracking-wider">
              DELUSION <span className="text-[#FF007F] text-glow-pink">CALCULATOR</span>
            </span>
            <span className="text-xs font-mono text-[#00F5FF] uppercase font-bold text-glow-cyan">
              Fresh & Fit Official
            </span>
          </div>

          {/* Big Score Display */}
          <div className="py-2 space-y-1">
            <div className="text-xs uppercase font-mono text-[#E0E0E0] font-bold tracking-widest">
              Qualifying Population Match
            </div>
            <div className="font-display text-6xl sm:text-7xl text-[#FF007F] text-glow-pink tracking-tight drop-shadow-2xl">
              {formatPercentage(result.matchPercentage)}
            </div>
            <div className="text-base font-mono font-bold text-[#FFE600] text-glow-gold">
              {result.matchRatio}
            </div>
          </div>

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF007F]/25 border-2 border-[#FF007F] text-white font-display tracking-wider text-lg uppercase shadow-[0_0_15px_#FF007F]">
            <span>{result.tierEmoji}</span>
            <span>{result.tierLabel} ({result.delusionScore}/5)</span>
          </div>

          {/* Summary Criteria */}
          <div className="text-xs font-mono text-[#E0E0E0] bg-[#0c0721]/90 p-3.5 rounded-xl text-left space-y-1.5 border border-[#FF007F]/30 shadow-inner">
            <p><span className="text-[#00F5FF] font-bold">Age Range:</span> {criteria.minAge} - {criteria.maxAge} Yrs</p>
            <p><span className="text-[#00F5FF] font-bold">Min Height:</span> {formatHeight(criteria.minHeight)}</p>
            <p><span className="text-[#00F5FF] font-bold">Min Income:</span> {formatIncome(criteria.minIncome)}/yr</p>
            <p><span className="text-[#00F5FF] font-bold">Status:</span> {criteria.maritalPref === 'SINGLE_ONLY' ? 'Single Only' : 'Any'}</p>
          </div>

          {/* Roast Quote */}
          <p className="font-mono text-xs text-white italic font-bold bg-[#180e38]/80 p-3 rounded-xl border border-[#00F5FF]/40">
            "{result.catchphrase}"
          </p>

          <div className="text-[10px] font-mono text-[#B3A0D2] tracking-widest uppercase pt-1">
            female-delusion-calculator.vercel.app
          </div>
        </div>

        {/* Action Buttons: DOWNLOAD HD IMAGE, SHARE, COPY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] hover:opacity-90 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FFE600]" />
            <span>{isDownloading ? 'Exporting...' : 'Save Image'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#FF007F] to-[#8A2BE2] hover:opacity-90 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#180e38] border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
