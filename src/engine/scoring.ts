import { DelusionResult, DelusionTier } from '../types';
import { formatRatio } from '../utils/format';
import { getDefaultComment } from './commentPool';

export function getDelusionScore(matchPercentage: number): DelusionResult {
  let tier: DelusionTier;
  let score: number;
  let tierLabel: string;
  let tierEmoji: string;
  let tierColor: string;

  if (matchPercentage >= 0.3) {
    score = 0;
    tier = DelusionTier.GROUNDED;
    tierLabel = 'Grounded';
    tierEmoji = '😌';
    tierColor = 'text-cyan-400';
  } else if (matchPercentage >= 0.1) {
    score = 1;
    tier = DelusionTier.REASONABLE;
    tierLabel = 'Reasonable';
    tierEmoji = '🤔';
    tierColor = 'text-cyan-300';
  } else if (matchPercentage >= 0.03) {
    score = 2;
    tier = DelusionTier.SELECTIVE;
    tierLabel = 'Selective';
    tierEmoji = '🧐';
    tierColor = 'text-yellow-400';
  } else if (matchPercentage >= 0.005) {
    score = 3;
    tier = DelusionTier.PICKY;
    tierLabel = 'Picky';
    tierEmoji = '💅';
    tierColor = 'text-[#FF007F]';
  } else if (matchPercentage >= 0.0005) {
    score = 4;
    tier = DelusionTier.UNICORN_HUNTER;
    tierLabel = 'Unicorn Hunter';
    tierEmoji = '🦄';
    tierColor = 'text-[#FF2AA3]';
  } else {
    score = 5;
    tier = DelusionTier.DELUSIONAL;
    tierLabel = 'Delusional';
    tierEmoji = '🤡';
    tierColor = 'text-[#E50914] animate-pulse';
  }

  return {
    matchPercentage,
    matchRatio: formatRatio(matchPercentage),
    delusionScore: score,
    tier,
    tierLabel,
    tierEmoji,
    tierColor,
    catchphrase: getDefaultComment(tier)
  };
}
