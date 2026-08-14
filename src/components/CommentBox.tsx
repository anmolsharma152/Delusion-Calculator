'use client';

import { Terminal, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentBoxProps {
  comment: string;
  onRefreshComment?: () => void;
}

export default function CommentBox({ comment, onRefreshComment }: CommentBoxProps) {
  return (
    <div className="w-full relative bg-[#0e0726] p-5 sm:p-6 border-2 border-[#FF007F]/40 shadow-[0_0_25px_rgba(255,0,127,0.2)] overflow-hidden rounded-2xl">
      {/* CRT Scanlines */}
      <div className="scanlines" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FF007F]" />
          <span className="font-mono text-xs text-[#FF007F] tracking-wider uppercase font-bold text-glow-pink">
            F&F REALITY CHECK TERMINAL
          </span>
        </div>

        {onRefreshComment && (
          <button
            type="button"
            onClick={onRefreshComment}
            className="flex items-center gap-1.5 text-xs font-mono text-white bg-[#FF007F]/20 hover:bg-[#FF007F]/40 transition-colors px-3 py-1 rounded-lg border border-[#FF007F]/50 font-bold shadow-[0_0_10px_#FF007F] cursor-pointer"
            title="Generate new roast"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FFE600] animate-spin-slow" />
            <span>NEW ROAST</span>
          </button>
        )}
      </div>

      {/* Roast Content */}
      <div className="min-h-[70px] flex items-center justify-center py-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={comment}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-sm sm:text-base text-white leading-relaxed text-center font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          >
            "{comment}"
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-2 text-right">
        <span className="text-[10px] font-mono text-[#B3A0D2]">
          STATUS: <span className="text-[#FF007F] font-bold">UNFILTERED REALITY</span>
        </span>
      </div>
    </div>
  );
}
