import { 
  CriteriaState, 
  AgeRange, 
  Race, 
  EducationLevel, 
  MaritalPreference, 
  ReligionPreference,
  PoliticalPreference,
  FilterBreakdown 
} from '../types';
import { 
  AGE_DISTRIBUTION, 
  HEIGHT_PARAMS, 
  INCOME_BY_AGE, 
  MARITAL_BY_AGE, 
  OBESITY_BY_AGE, 
  RACE_DISTRIBUTION, 
  EDUCATION_LEVELS,
  RELIGION_CHRISTIAN_BY_AGE,
  POLITICS_REPUBLICAN_BY_AGE,
  CHILDLESS_BY_AGE,
  NO_DRUG_USE_BY_AGE,
  NO_RECORD_BY_AGE
} from '../data/distributions';
import { normalCDF, interpolateIncome, clamp } from '../utils/math';

export function getRelevantAgeRanges(minAge: number, maxAge: number): AgeRange[] {
  const ranges: AgeRange[] = [];
  const rangeDefinitions: { id: AgeRange, min: number, max: number }[] = [
    { id: '18-24', min: 18, max: 24 },
    { id: '25-29', min: 25, max: 29 },
    { id: '30-34', min: 30, max: 34 },
    { id: '35-39', min: 35, max: 39 },
    { id: '40-44', min: 40, max: 44 },
    { id: '45-49', min: 45, max: 49 },
    { id: '50-54', min: 50, max: 54 },
    { id: '55-59', min: 55, max: 59 },
    { id: '60-64', min: 60, max: 64 },
    { id: '65+', min: 65, max: 100 }
  ];

  for (const def of rangeDefinitions) {
    if (minAge <= def.max && maxAge >= def.min) {
      ranges.push(def.id);
    }
  }
  return ranges;
}

export function calcAgeProbability(minAge: number, maxAge: number): number {
  const ranges = getRelevantAgeRanges(minAge, maxAge);
  return ranges.reduce((sum, range) => sum + AGE_DISTRIBUTION[range], 0);
}

export function calcHeightProbability(minHeight: number, maxHeight?: number): number {
  const minProb = normalCDF(minHeight, HEIGHT_PARAMS.mean, HEIGHT_PARAMS.stdDev);
  if (maxHeight) {
    const maxProb = normalCDF(maxHeight, HEIGHT_PARAMS.mean, HEIGHT_PARAMS.stdDev);
    return Math.max(0, maxProb - minProb);
  }
  return 1 - minProb;
}

export function calcIncomeProbability(minIncome: number, ageRanges: AgeRange[]): number {
  if (minIncome <= 0) return 1.0;
  
  let totalPop = 0;
  let probSum = 0;

  for (const range of ageRanges) {
    const popWeight = AGE_DISTRIBUTION[range];
    totalPop += popWeight;
    const brackets = INCOME_BY_AGE[range];
    probSum += interpolateIncome(minIncome, brackets) * popWeight;
  }

  return totalPop > 0 ? probSum / totalPop : 0;
}

function ageWeightedAverage(ageRanges: AgeRange[], distribution: Record<AgeRange, number>): number {
  let totalPop = 0;
  let probSum = 0;

  for (const range of ageRanges) {
    const popWeight = AGE_DISTRIBUTION[range];
    totalPop += popWeight;
    probSum += distribution[range] * popWeight;
  }

  return totalPop > 0 ? probSum / totalPop : 0;
}

export function calcMaritalProbability(pref: MaritalPreference, ageRanges: AgeRange[]): number {
  if (pref === MaritalPreference.DONT_CARE) return 1.0;

  let totalPop = 0;
  let probSum = 0;

  for (const range of ageRanges) {
    const popWeight = AGE_DISTRIBUTION[range];
    totalPop += popWeight;
    const stats = MARITAL_BY_AGE[range];
    probSum += (stats.neverMarried + stats.divorced) * popWeight;
  }

  return totalPop > 0 ? probSum / totalPop : 0;
}

export function calcObesityProbability(excludeObese: boolean, ageRanges: AgeRange[]): number {
  if (!excludeObese) return 1.0;

  let totalPop = 0;
  let probSum = 0;

  for (const range of ageRanges) {
    const popWeight = AGE_DISTRIBUTION[range];
    totalPop += popWeight;
    probSum += OBESITY_BY_AGE[range].notObese * popWeight;
  }

  return totalPop > 0 ? probSum / totalPop : 0;
}

export function calcReligionProbability(pref: ReligionPreference, ageRanges: AgeRange[]): number {
  if (pref === ReligionPreference.ANY) return 1.0;
  return ageWeightedAverage(ageRanges, RELIGION_CHRISTIAN_BY_AGE);
}

export function calcPoliticsProbability(pref: PoliticalPreference, ageRanges: AgeRange[]): number {
  if (pref === PoliticalPreference.ANY) return 1.0;
  const republican = ageWeightedAverage(ageRanges, POLITICS_REPUBLICAN_BY_AGE);
  if (pref === PoliticalPreference.REPUBLICAN) return republican;
  return clamp(1 - republican, 0, 1);
}

export function calcChildlessProbability(noChildren: boolean, ageRanges: AgeRange[]): number {
  if (!noChildren) return 1.0;
  return ageWeightedAverage(ageRanges, CHILDLESS_BY_AGE);
}

export function calcNoDrugUseProbability(noDrugUse: boolean, ageRanges: AgeRange[]): number {
  if (!noDrugUse) return 1.0;
  return ageWeightedAverage(ageRanges, NO_DRUG_USE_BY_AGE);
}

export function calcNoRecordProbability(noCriminalRecord: boolean, ageRanges: AgeRange[]): number {
  if (!noCriminalRecord) return 1.0;
  return ageWeightedAverage(ageRanges, NO_RECORD_BY_AGE);
}

export function calcRaceProbability(selectedRaces: Race[]): number {
  if (selectedRaces.includes(Race.ANY) || selectedRaces.length === 0) return 1.0;
  
  let prob = 0;
  for (const race of selectedRaces) {
    prob += RACE_DISTRIBUTION[race] || 0;
  }
  return clamp(prob, 0, 1);
}

export function calcEducationProbability(minEducation: EducationLevel): number {
  if (minEducation === EducationLevel.ANY) return 1.0;
  
  const level = EDUCATION_LEVELS.find(l => l.level === minEducation);
  return level ? level.cumulativeAtOrAbove : 1.0;
}

export function calcCombinedProbability(criteria: CriteriaState): { matchPercentage: number, breakdown: FilterBreakdown[] } {
  const breakdown: FilterBreakdown[] = [];
  const ageRanges = getRelevantAgeRanges(criteria.minAge, criteria.maxAge);
  
  const pAge = calcAgeProbability(criteria.minAge, criteria.maxAge);
  breakdown.push({ filterName: 'Age', probability: pAge, label: `${criteria.minAge}-${criteria.maxAge}` });

  const pHeight = calcHeightProbability(criteria.minHeight, criteria.maxHeight);
  breakdown.push({ filterName: 'Height', probability: pHeight, label: criteria.maxHeight ? `${criteria.minHeight}" - ${criteria.maxHeight}"` : `${criteria.minHeight}"+` });
  
  const pIncome = calcIncomeProbability(criteria.minIncome, ageRanges);
  breakdown.push({ filterName: 'Income', probability: pIncome, label: `$${criteria.minIncome}+` });

  const pRace = calcRaceProbability(criteria.selectedRaces);
  breakdown.push({ filterName: 'Race', probability: pRace, label: criteria.selectedRaces.join(', ') });

  const pEdu = calcEducationProbability(criteria.minEducation);
  breakdown.push({ filterName: 'Education', probability: pEdu, label: criteria.minEducation });

  const pMarital = calcMaritalProbability(criteria.maritalPref, ageRanges);
  breakdown.push({ filterName: 'Marital Status', probability: pMarital, label: criteria.maritalPref });

  const pObese = calcObesityProbability(criteria.excludeObese, ageRanges);
  breakdown.push({ filterName: 'Not Obese', probability: pObese, label: criteria.excludeObese ? 'Required' : 'Any' });

  const pReligion = calcReligionProbability(criteria.religion, ageRanges);
  breakdown.push({ filterName: 'Religion', probability: pReligion, label: criteria.religion });

  const pPolitics = calcPoliticsProbability(criteria.politics, ageRanges);
  breakdown.push({ filterName: 'Politics', probability: pPolitics, label: criteria.politics });

  const pChildless = calcChildlessProbability(criteria.noChildren, ageRanges);
  breakdown.push({ filterName: 'No Children', probability: pChildless, label: criteria.noChildren ? 'Required' : 'Any' });

  const pNoDrugs = calcNoDrugUseProbability(criteria.noDrugUse, ageRanges);
  breakdown.push({ filterName: 'No Drug Use', probability: pNoDrugs, label: criteria.noDrugUse ? 'Required' : 'Any' });

  const pNoRecord = calcNoRecordProbability(criteria.noCriminalRecord, ageRanges);
  breakdown.push({ filterName: 'No Criminal Record', probability: pNoRecord, label: criteria.noCriminalRecord ? 'Required' : 'Any' });

  const matchPercentage = pAge * pHeight * pIncome * pRace * pEdu * pMarital * pObese * pReligion * pPolitics * pChildless * pNoDrugs * pNoRecord;

  return {
    matchPercentage,
    breakdown
  };
}
