'use client';

import { motion } from 'framer-motion';

interface CatBagMeterProps {
  score: number; // 0 to 5
}

function CatFoodBagIcon({ active, colorClass }: { active: boolean; colorClass: string }) {
  return (
    <div className={`relative flex flex-col items-center transition-all duration-300 ${active ? 'scale-110' : 'opacity-25 grayscale'}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-9 h-9 sm:w-11 sm:h-11 transition-all duration-300 ${active ? colorClass : 'text-gray-600'}`}
      >
        {/* Cat Bag Outline */}
        <path
          d="M16 16C16 12 24 8 32 8C40 8 48 12 48 16L52 54C52 57.3137 43.0457 60 32 60C20.9543 60 12 57.3137 12 54L16 16Z"
          fill={active ? 'currentColor' : '#180e38'}
          fillOpacity={active ? '0.3' : '0.5'}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Bag Top Fold */}
        <path
          d="M16 16C16 18.5 23.1634 20 32 20C40.8366 20 48 18.5 48 16"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Cat Face Silhouette on Bag */}
        <path
          d="M26 36L29 30L32 33L35 30L38 36C38 41 26 41 26 36Z"
          fill="currentColor"
        />
        {/* Bag Label */}
        <rect
          x="20"
          y="44"
          width="24"
          height="8"
          rx="2"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <text
          x="32"
          y="49.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="bold"
          fill="currentColor"
          fontFamily="sans-serif"
        >
          CAT FOOD
        </text>
      </svg>
    </div>
  );
}

export default function CatBagMeter({ score }: CatBagMeterProps) {
  const totalBags = 5;

  const getGlowColor = (bagIndex: number) => {
    if (bagIndex <= 1) return 'text-[#00F5FF] drop-shadow-[0_0_12px_rgba(0,245,255,0.9)]';
    if (bagIndex === 2) return 'text-[#FFE600] drop-shadow-[0_0_12px_rgba(255,230,0,0.9)]';
    if (bagIndex === 3) return 'text-[#FF007F] drop-shadow-[0_0_12px_rgba(255,0,127,0.9)]';
    return 'text-[#FF2AA3] drop-shadow-[0_0_14px_rgba(255,42,163,1)]';
  };

  return (
    <div className="w-full bg-[#180e38]/80 border border-[#FF007F]/30 rounded-xl p-4 flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full font-mono text-xs">
        <span className="font-display tracking-wider uppercase text-[#B3A0D2]">
          Cat Lady Index (Purina Meter)
        </span>
        <span className="text-[#FF007F] font-bold text-glow-pink">
          {score} / 5 BAGS
        </span>
      </div>

      {/* Bags Row */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 w-full">
        {Array.from({ length: totalBags }).map((_, index) => {
          const bagNumber = index + 1;
          const isActive = score >= bagNumber;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, -6, 6, 0] } : { scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <CatFoodBagIcon active={isActive} colorClass={getGlowColor(bagNumber)} />
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] font-mono text-[#F5D8F2] text-center italic">
        {score === 0 && "Zero bags! Safe from the cat lady prophecy."}
        {score === 1 && "1 Bag. Dipping your toes into picky territory."}
        {score === 2 && "2 Bags. Stocking up on Purina just in case."}
        {score === 3 && "3 Bags. The cat shelter knows you by first name."}
        {score === 4 && "4 Bags. High-level cat lady energy detected."}
        {score === 5 && "5 BAGS MAX! 🐱 Full cat lady mode unlocked."}
      </p>
    </div>
  );
}
