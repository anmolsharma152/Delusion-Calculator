'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '../types';
import { formatHeight } from '../utils/format';
import {
  Calendar,
  Ruler,
  Users,
  GraduationCap,
  DollarSign,
  HeartHandshake,
  Sparkles,
  Flame,
  Check,
  MapPin
} from 'lucide-react';

interface CriteriaFormProps {
  criteria: CriteriaState;
  onChange: (newCriteria: CriteriaState) => void;
  onCalculate: () => void;
  isAnalyzing?: boolean;
}

// Income steps for slider jumps
const INCOME_STEPS = [0, 25000, 50000, 80000, 100000, 150000, 200000, 250000, 350000, 500000];

const getIncomeIndex = (income: number): number => {
  const idx = INCOME_STEPS.indexOf(income);
  if (idx !== -1) return idx;
  let closest = 0;
  let minDiff = Infinity;
  INCOME_STEPS.forEach((val, i) => {
    const diff = Math.abs(val - income);
    if (diff < minDiff) {
      minDiff = diff;
      closest = i;
    }
  });
  return closest;
};

// Standard Heights (inches and formatted)
const HEIGHT_OPTIONS = [
  { value: 60, label: "5'0\" (152 cm)" },
  { value: 62, label: "5'2\" (157 cm)" },
  { value: 64, label: "5'4\" (163 cm)" },
  { value: 66, label: "5'6\" (168 cm)" },
  { value: 68, label: "5'8\" (173 cm)" },
  { value: 69, label: "5'9\" (175 cm) — US Average" },
  { value: 70, label: "5'10\" (178 cm)" },
  { value: 71, label: "5'11\" (180 cm)" },
  { value: 72, label: "6'0\" (183 cm) — 6-Foot Standard" },
  { value: 73, label: "6'1\" (185 cm)" },
  { value: 74, label: "6'2\" (188 cm)" },
  { value: 75, label: "6'3\" (191 cm)" },
  { value: 76, label: "6'4\" (193 cm)" },
  { value: 78, label: "6'6\"+ (198 cm)" },
];

export default function CriteriaForm({ criteria, onChange, onCalculate, isAnalyzing }: CriteriaFormProps) {
  const updateCriteria = <K extends keyof CriteriaState>(key: K, value: CriteriaState[K]) => {
    onChange({
      ...criteria,
      [key]: value,
    });
  };

  // Enter Key Listener to calculate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isAnalyzing) {
        e.preventDefault();
        onCalculate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnalyzing, onCalculate]);

  const handleRaceToggle = (race: Race) => {
    if (race === Race.ANY) {
      updateCriteria('selectedRaces', [Race.ANY]);
      return;
    }

    let updated: Race[] = criteria.selectedRaces.filter((r) => r !== Race.ANY);
    if (updated.includes(race)) {
      updated = updated.filter((r) => r !== race);
    } else {
      updated.push(race);
    }

    if (updated.length === 0) {
      updated = [Race.ANY];
    }

    updateCriteria('selectedRaces', updated);
  };

  const currentIncomeIndex = getIncomeIndex(criteria.minIncome);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center my-auto px-2 sm:px-4 py-2">
      {/* 3x2 Spacious Card Form Container (100% Solid & Opaque Background) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCalculate();
        }}
        className="w-full bg-[#0e0726] p-5 sm:p-7 md:p-8 space-y-6 border-2 border-[#FF007F]/50 shadow-[0_0_55px_rgba(0,0,0,0.9)] relative overflow-hidden rounded-3xl"
      >
        {/* Fresh & Fit Delusion Banner Logo Header */}
        <div className="flex flex-col items-center justify-center border-b border-[#FF007F]/30 pb-4 text-center space-y-1.5">
          <div className="relative w-full max-w-lg h-20 sm:h-24 md:h-28 drop-shadow-[0_0_25px_rgba(255,0,127,0.6)]">
            <Image
              src="/Assets/fnf_delusion_banner.png"
              alt="Fresh & Fit Podcast - Female Delusion Calculator"
              fill
              priority
              className="object-contain"
            />
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#00F5FF] font-bold tracking-wider uppercase text-glow-cyan">
            "YOUR STANDARDS FOR YOUR IDEAL PARTNER" — THE NUMBERS DON'T LIE
          </p>
        </div>

        {/* 3 x 2 Spacious Grid (6 Distinct, Completely Solid Opaque Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* CARD 1: AGE */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00F5FF]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Age Range
                </h3>
              </div>
              <span className="text-[#00F5FF] font-mono font-extrabold text-base sm:text-lg text-glow-cyan">
                {criteria.minAge} – {criteria.maxAge >= 65 ? '65+' : criteria.maxAge} YRS
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold text-[#E0E0E0]">
                    <span>MIN AGE</span>
                    <span className="text-[#00F5FF]">{criteria.minAge}</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    step="1"
                    value={criteria.minAge}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateCriteria('minAge', Math.min(val, criteria.maxAge - 1));
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold text-[#E0E0E0]">
                    <span>MAX AGE</span>
                    <span className="text-[#00F5FF]">{criteria.maxAge}</span>
                  </div>
                  <input
                    type="range"
                    min="19"
                    max="65"
                    step="1"
                    value={criteria.maxAge}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateCriteria('maxAge', Math.max(val, criteria.minAge + 1));
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-[#B3A0D2]">
                <span>18 Yrs</span>
                <span>25 Yrs</span>
                <span>35 Yrs</span>
                <span>50 Yrs</span>
                <span>65+ Yrs</span>
              </div>
            </div>
          </div>

          {/* CARD 2: HEIGHT */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#FF007F]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Minimum Height
                </h3>
              </div>
              <span className="text-[#FF007F] font-mono font-extrabold text-base sm:text-lg text-glow-pink">
                {formatHeight(criteria.minHeight)}
              </span>
            </div>

            <div className="space-y-3">
              {/* Clean Dropdown Select */}
              <div className="relative">
                <select
                  value={criteria.minHeight}
                  onChange={(e) => updateCriteria('minHeight', parseInt(e.target.value))}
                  className="w-full bg-[#0c0721] border border-[#FF007F]/40 text-white font-mono text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 outline-none focus:border-[#00F5FF] cursor-pointer"
                >
                  {HEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#180e38] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Slider for quick adjustments */}
              <input
                type="range"
                min="60"
                max="78"
                step="1"
                value={Math.min(78, criteria.minHeight)}
                onChange={(e) => updateCriteria('minHeight', parseInt(e.target.value))}
              />

              <div className="flex justify-between text-[11px] font-mono text-[#00F5FF] font-bold">
                <span>5'0"</span>
                <span>5'6"</span>
                <span>5'9" (Avg)</span>
                <span>6'0"</span>
                <span>6'6"+</span>
              </div>
            </div>
          </div>

          {/* CARD 3: RACE / ETHNICITY */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FFE600]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Race / Ethnicity
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#FFE600]">
                {criteria.selectedRaces.includes(Race.ANY)
                  ? 'All Included'
                  : `${criteria.selectedRaces.length} Selected`}
              </span>
            </div>

            {/* Checkbox Style Multi-Select Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: Race.ANY, label: 'Any Race' },
                { id: Race.WHITE, label: 'White' },
                { id: Race.BLACK, label: 'Black' },
                { id: Race.HISPANIC, label: 'Hispanic / Latino' },
                { id: Race.ASIAN, label: 'Asian' },
                { id: Race.OTHER, label: 'Other / Mixed' },
              ].map((r) => {
                const isSelected = criteria.selectedRaces.includes(r.id);
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => handleRaceToggle(r.id)}
                    className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#00F5FF] bg-[#00F5FF]/25 text-white shadow-[0_0_10px_rgba(0,245,255,0.4)]'
                        : 'border-[#FF007F]/20 bg-[#0c0721] text-[#E0E0E0] hover:text-white hover:border-[#00F5FF]/40'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#00F5FF] bg-[#00F5FF] text-black'
                          : 'border-[#FF007F]/40 bg-[#0c0721]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARD 4: EDUCATION */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00F5FF]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Minimum Education
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* Dropdown for zero button clipping & clean scannability */}
              <select
                value={criteria.minEducation}
                onChange={(e) => updateCriteria('minEducation', e.target.value as EducationLevel)}
                className="w-full bg-[#0c0721] border border-[#00F5FF]/40 text-white font-mono text-xs sm:text-sm font-bold rounded-xl px-3.5 py-3 outline-none focus:border-[#FF007F] cursor-pointer shadow-[0_0_10px_rgba(0,245,255,0.15)]"
              >
                <option value={EducationLevel.ANY} className="bg-[#180e38]">Any Education Level (No Requirement)</option>
                <option value={EducationLevel.HIGH_SCHOOL} className="bg-[#180e38]">High School Diploma or Higher</option>
                <option value={EducationLevel.SOME_COLLEGE} className="bg-[#180e38]">Some College / Associate Degree</option>
                <option value={EducationLevel.BACHELORS} className="bg-[#180e38]">Bachelor's Degree or Higher</option>
                <option value={EducationLevel.MASTERS} className="bg-[#180e38]">Master's Degree or Higher</option>
                <option value={EducationLevel.DOCTORATE} className="bg-[#180e38]">Doctorate / PhD / MD</option>
              </select>

              <div className="p-3 bg-[#0c0721] rounded-xl border border-[#FF007F]/20 text-[11px] font-mono text-[#B3A0D2] leading-relaxed">
                ℹ️ Only <strong className="text-white">~35% of US adult men</strong> hold a Bachelor's degree or higher.
              </div>
            </div>
          </div>

          {/* CARD 5: INCOME */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#FFE600]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Minimum Income
                </h3>
              </div>

              {/* Number Input without arrows */}
              <div className="flex items-center gap-1 bg-[#0c0721] px-3 py-1 rounded-lg border border-[#FFE600]/40 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                <span className="text-[#FFE600] font-bold text-xs sm:text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  step="5000"
                  value={criteria.minIncome || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateCriteria('minIncome', Math.max(0, val));
                  }}
                  placeholder="80000"
                  className="w-24 bg-transparent text-[#FFE600] font-bold text-xs sm:text-sm font-mono outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={INCOME_STEPS.length - 1}
                step="1"
                value={currentIncomeIndex}
                onChange={(e) => {
                  const idx = parseInt(e.target.value);
                  updateCriteria('minIncome', INCOME_STEPS[idx]);
                }}
              />

              <div className="flex justify-between text-[11px] font-mono text-[#00F5FF] font-bold">
                <span>$0</span>
                <span>$50k</span>
                <span>$80k</span>
                <span>$150k</span>
                <span>$250k</span>
                <span>$500k+</span>
              </div>
            </div>
          </div>

          {/* CARD 6: MARITAL, FITNESS & LOCATION */}
          <div className="bg-[#180e38] p-5 sm:p-6 rounded-2xl border border-[#FF007F]/35 shadow-md flex flex-col justify-between space-y-4 hover:border-[#FF007F]/60 transition-colors">
            <div className="flex items-center justify-between border-b border-[#FF007F]/25 pb-2.5">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#FF007F]" />
                <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                  Status & Fitness
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Single Only Checkbox */}
                <button
                  type="button"
                  onClick={() =>
                    updateCriteria(
                      'maritalPref',
                      criteria.maritalPref === MaritalPreference.SINGLE_ONLY
                        ? MaritalPreference.DONT_CARE
                        : MaritalPreference.SINGLE_ONLY
                    )
                  }
                  className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    criteria.maritalPref === MaritalPreference.SINGLE_ONLY
                      ? 'border-[#FF007F] bg-[#FF007F]/25 text-white shadow-[0_0_10px_#FF007F]'
                      : 'border-[#FF007F]/20 bg-[#0c0721] text-[#E0E0E0] hover:text-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                      criteria.maritalPref === MaritalPreference.SINGLE_ONLY
                        ? 'border-[#FF007F] bg-[#FF007F] text-white'
                        : 'border-[#FF007F]/40 bg-[#0c0721]'
                    }`}
                  >
                    {criteria.maritalPref === MaritalPreference.SINGLE_ONLY && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">Must Be Single</span>
                </button>

                {/* Exclude Obese Checkbox */}
                <button
                  type="button"
                  onClick={() => updateCriteria('excludeObese', !criteria.excludeObese)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    criteria.excludeObese
                      ? 'border-[#00F5FF] bg-[#00F5FF]/25 text-white shadow-[0_0_10px_#00F5FF]'
                      : 'border-[#FF007F]/20 bg-[#0c0721] text-[#E0E0E0] hover:text-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                      criteria.excludeObese
                        ? 'border-[#00F5FF] bg-[#00F5FF] text-black'
                        : 'border-[#FF007F]/40 bg-[#0c0721]'
                    }`}
                  >
                    {criteria.excludeObese && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">Exclude Obese</span>
                </button>
              </div>

              {/* Location Scope Selector */}
              <div className="flex items-center gap-2 bg-[#0c0721] p-2 rounded-xl border border-[#FF007F]/30 text-xs font-mono">
                <MapPin className="w-4 h-4 text-[#FFE600] shrink-0" />
                <select
                  value={criteria.location}
                  onChange={(e) => updateCriteria('location', e.target.value as LocationScope)}
                  className="bg-transparent text-white font-bold outline-none w-full cursor-pointer"
                >
                  <option value={LocationScope.SAME_COUNTRY} className="bg-[#180e38]">Same Country (US Wide)</option>
                  <option value={LocationScope.SAME_STATE} className="bg-[#180e38]">Same State</option>
                  <option value={LocationScope.SAME_CITY} className="bg-[#180e38]">Same City / Metro</option>
                  <option value={LocationScope.OPEN} className="bg-[#180e38]">Open / Worldwide</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Delusion Score CTA Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full max-w-lg py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E50914] via-[#8A2BE2] to-[#00F5FF] hover:opacity-95 text-white font-display text-xl sm:text-2xl uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(229,9,20,0.4)] hover:shadow-[0_0_35px_rgba(0,245,255,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Flame className="w-5 h-5 text-[#FFE600] animate-bounce" />
                <span>ANALYZING CENSUS DATA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#FFE600] animate-spin" />
                <span>CALCULATE DELUSION SCORE</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
