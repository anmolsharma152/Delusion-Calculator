'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CatBagMeterProps {
  score: number; // 0 to 5
}

export default function CatBagMeter({ score }: CatBagMeterProps) {
  const totalBags = 5;

  const getGlowStyle = (bagNumber: number) => {
    if (bagNumber <= 1) return 'drop-shadow-[0_0_10px_rgba(0,245,255,0.85)]';
    if (bagNumber === 2) return 'drop-shadow-[0_0_10px_rgba(255,230,0,0.85)]';
    if (bagNumber === 3) return 'drop-shadow-[0_0_12px_rgba(255,0,127,0.9)]';
    return 'drop-shadow-[0_0_14px_rgba(229,9,20,1)]';
  };

  return (
    <div className="w-full bg-[#0e0726] border border-[#FF007F]/40 rounded-2xl p-3.5 flex flex-col items-center gap-2 shadow-md">
      <div className="flex items-center justify-between w-full font-mono text-xs">
        <span className="font-display tracking-wider uppercase text-[#B3A0D2] text-xs">
          Cat Lady Index (Purina Risk Meter)
        </span>
        <span className="text-[#FF007F] font-bold text-glow-pink text-xs">
          {score} / 5 BAGS
        </span>
      </div>

      {/* 5 Bags Row */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 py-1 w-full">
        {Array.from({ length: totalBags }).map((_, index) => {
          const bagNumber = index + 1;
          const isActive = score >= bagNumber;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, -4, 4, 0] } : { scale: 1 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="relative flex flex-col items-center"
            >
              <div
                className={`relative w-9 h-11 sm:w-11 sm:h-13 transition-all duration-300 ${
                  isActive
                    ? `${getGlowStyle(bagNumber)} scale-105 opacity-100`
                    : 'opacity-25 grayscale brightness-50'
                }`}
              >
                <Image
                  src="/Assets/cat_litter_bag.png"
                  alt={`Cat Bag ${bagNumber}`}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className={`text-[9px] font-mono font-bold mt-0.5 ${isActive ? 'text-[#FFE600]' : 'text-gray-600'}`}>
                BAG {bagNumber}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[11px] font-mono text-[#F5D8F2] text-center italic leading-tight">
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
