'use client';

import { motion } from 'framer-motion';

interface GaugeMeterProps {
  score: number; // 0 to 5
  tierLabel: string;
  tierColor: string;
  tierEmoji: string;
}

export default function GaugeMeter({ score, tierLabel, tierEmoji }: GaugeMeterProps) {
  // Angle range: -90deg (0 score) to 90deg (5 score)
  const angle = -90 + (score / 5) * 180;

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-64 h-34 sm:w-76 sm:h-40 flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            {/* Vaporwave Gradient for Arc */}
            <linearGradient id="gaugeGradientVapor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="35%" stopColor="#FFE600" />
              <stop offset="70%" stopColor="#FF007F" />
              <stop offset="100%" stopColor="#E50914" />
            </linearGradient>

            {/* Vapor Glow Filter */}
            <filter id="vaporGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#180e38"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Glowing Arc Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradientVapor)"
            strokeWidth="18"
            strokeLinecap="round"
            filter="url(#vaporGlow)"
            opacity="0.95"
          />

          {/* Tick marks */}
          {[0, 1, 2, 3, 4, 5].map((t) => {
            const tickAngle = (-180 + (t / 5) * 180) * (Math.PI / 180);
            const x1 = 100 + 66 * Math.cos(tickAngle);
            const y1 = 100 + 66 * Math.sin(tickAngle);
            const x2 = 100 + 73 * Math.cos(tickAngle);
            const y2 = 100 + 73 * Math.sin(tickAngle);
            return (
              <line
                key={t}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#B3A0D2"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Animated Needle */}
        <motion.div
          className="absolute bottom-2 left-1/2 w-2 h-26 sm:h-30 bg-white origin-bottom rounded-t-full shadow-[0_0_15px_#FF007F]"
          style={{ x: '-50%' }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
        >
          {/* Needle Pivot Cap */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full bg-[#FF007F] border-2 border-white shadow-[0_0_12px_#FF007F]" />
        </motion.div>
      </div>

      {/* Score Number Display */}
      <div className="mt-2 text-center">
        <div className="font-display text-5xl sm:text-6xl text-white tracking-wider flex items-center justify-center gap-2 leading-none">
          <span>{score}</span>
          <span className="text-xl sm:text-2xl text-[#B3A0D2]">/ 5</span>
          <span className="text-3xl sm:text-4xl">{tierEmoji}</span>
        </div>
        <p className="font-display text-xl sm:text-2xl uppercase tracking-wider text-[#FF007F] text-glow-pink mt-1 leading-none">
          {tierLabel}
        </p>
      </div>
    </div>
  );
}
