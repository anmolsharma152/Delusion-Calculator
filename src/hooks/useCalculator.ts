'use client';

import { useState, useEffect, useMemo } from 'react';
import { CriteriaState, DelusionResult, FilterBreakdown } from '../types';
import { calcCombinedProbability } from '../engine/probability';
import { getDelusionScore } from '../engine/scoring';

export function useCalculator(criteria: CriteriaState) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [debouncedCriteria, setDebouncedCriteria] = useState<CriteriaState>(criteria);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setDebouncedCriteria(criteria);
      setIsCalculating(false);
    }, 16); // 16ms debounce for ~60fps

    return () => clearTimeout(timer);
  }, [criteria]);

  const { result, breakdown } = useMemo(() => {
    const { matchPercentage, breakdown } = calcCombinedProbability(debouncedCriteria);
    const scoreResult = getDelusionScore(matchPercentage);
    
    return {
      result: scoreResult,
      breakdown
    };
  }, [debouncedCriteria]);

  return {
    result,
    breakdown,
    comment: result.catchphrase,
    isCalculating
  };
}
