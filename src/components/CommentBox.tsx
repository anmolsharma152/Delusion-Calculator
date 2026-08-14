'use client';

import { Terminal, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentBoxProps {
  comment: string;
  onRefreshComment?: () => void;
}

export default function CommentBox({ comment, onRefreshComment }: CommentBoxProps) {
  return (
    <div className="w-full relative bg-[#0e0726] p-4 border border-[#FF007F]/40 shadow-[0_0_20px_rgba(255,0,127,0.15)] overflow-hidden rounded-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#FF007F]" />
          <span className="font-mono text-[11px] text-[#FF007F] tracking-wider uppercase font-bold text-glow-pink">
            F&F REALITY CHECK TERMINAL
          </span>
        </div>

        {onRefreshComment && (
          <button
            type="button"
            onClick={onRefreshComment}
            className="flex items-center gap-1 text-[10px] font-mono text-white bg-[#FF007F]/20 hover:bg-[#FF007F]/40 transition-colors px-2 py-0.5 rounded-md border border-[#FF007F]/40 font-bold cursor-pointer"
            title="Generate new roast"
          >
            <RefreshCw className="w-3 h-3 text-[#FFE600]" />
            <span>NEW ROAST</span>
          </button>
        )}
      </div>

      {/* Roast Content */}
      <div className="min-h-[48px] flex items-center justify-center py-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={comment}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs sm:text-sm text-white leading-snug text-center font-bold"
          >
            "{comment}"
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-1 text-right text-[9px] font-mono text-[#8B8B8B]">
        STATUS: <span className="text-[#FF007F] font-bold">UNFILTERED REALITY</span>
      </div>
    </div>
  );
}
