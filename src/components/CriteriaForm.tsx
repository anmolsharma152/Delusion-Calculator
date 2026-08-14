'use client';

import { CriteriaState, Race, EducationLevel, MaritalPreference, LocationScope } from '../types';
import { formatHeight, formatIncome } from '../utils/format';
import { Sliders, DollarSign, UserCheck, ShieldAlert, GraduationCap, MapPin, Sparkles, Flame } from 'lucide-react';

interface CriteriaFormProps {
  criteria: CriteriaState;
  onChange: (newCriteria: CriteriaState) => void;
  onCalculate: () => void;
  isAnalyzing?: boolean;
}

// Income steps for quick slider jumps
const INCOME_STEPS = [0, 25000, 50000, 80000, 100000, 150000, 200000, 300000, 500000];

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

export default function CriteriaForm({ criteria, onChange, onCalculate, isAnalyzing }: CriteriaFormProps) {
  const updateCriteria = <K extends keyof CriteriaState>(key: K, value: CriteriaState[K]) => {
    onChange({
      ...criteria,
      [key]: value,
    });
  };

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
    <div className="w-full space-y-6 max-w-6xl mx-auto">
      {/* Calculator Card */}
      <div className="w-full glass-card-vapor p-6 sm:p-8 space-y-6 border-2 border-[#FF007F]/40 shadow-[0_0_45px_rgba(255,0,127,0.3)] relative overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-4">
          <div className="flex items-center gap-3">
            <Sliders className="w-6 h-6 text-[#00F5FF] drop-shadow-[0_0_10px_#00F5FF]" />
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-white uppercase text-glow-pink">
              YOUR PARTNER STANDARDS & REQUIREMENTS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#00F5FF] bg-[#00F5FF]/10 px-4 py-1.5 rounded-full border border-[#00F5FF]/30 font-bold">
            Step 2: Set Preferences
          </span>
        </div>

        {/* Form Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {/* Column 1: Age & Height Sliders */}
          <div className="space-y-6 bg-[#180e38]/70 p-5 rounded-2xl border border-[#FF007F]/30 shadow-inner flex flex-col justify-between">
            {/* Age Range Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono border-b border-[#FF007F]/20 pb-1.5">
                <label className="font-bold text-white text-sm sm:text-base uppercase tracking-wider">
                  Age Range
                </label>
                <span className="text-[#00F5FF] font-bold text-base sm:text-lg text-glow-cyan">
                  {criteria.minAge} – {criteria.maxAge >= 65 ? '65+' : criteria.maxAge} YRS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs text-[#E0E0E0] font-mono block mb-1 font-bold">MIN AGE: {criteria.minAge}</span>
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
                <div>
                  <span className="text-xs text-[#E0E0E0] font-mono block mb-1 font-bold">MAX AGE: {criteria.maxAge}</span>
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
            </div>

            {/* Minimum Height Slider - 60" (5'0") to 78" (6'6") */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center font-mono border-b border-[#FF007F]/20 pb-1.5">
                <label className="font-bold text-white text-sm sm:text-base uppercase tracking-wider">
                  Minimum Height
                </label>
                <span className="text-[#FF007F] font-bold text-xl text-glow-pink">
                  {formatHeight(criteria.minHeight)}
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="78"
                step="1"
                value={Math.min(78, criteria.minHeight)}
                onChange={(e) => updateCriteria('minHeight', parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-[#E0E0E0] font-mono pt-1 font-bold">
                <span>5'0"</span>
                <span>5'4"</span>
                <span className="text-[#FF007F]">6'0"</span>
                <span className="text-[#FF007F]">6'3"</span>
                <span>6'6"</span>
              </div>
            </div>
          </div>

          {/* Column 2: Income Input (Custom & Slider) & Toggles */}
          <div className="space-y-6 bg-[#180e38]/70 p-5 rounded-2xl border border-[#FF007F]/30 shadow-inner flex flex-col justify-between">
            {/* Minimum Annual Income Control (With Custom Dollar Input & Stepped Slider) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono border-b border-[#FF007F]/20 pb-1.5">
                <label className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#FFE600]" />
                  <span>Min Yearly Income</span>
                </label>

                {/* Custom Income Number Input */}
                <div className="flex items-center gap-1 bg-[#0c0721] px-2.5 py-1 rounded-lg border border-[#FFE600]/40 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                  <span className="text-[#FFE600] font-bold text-xs">$</span>
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
                    placeholder="Custom $"
                    className="w-24 bg-transparent text-[#FFE600] font-bold text-sm font-mono outline-none text-right"
                  />
                </div>
              </div>

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
              <div className="relative w-full h-5 text-xs text-[#E0E0E0] font-mono font-bold">
                <span className="absolute left-0">$0</span>
                <span className="absolute left-[25%] -translate-x-1/2">$50k</span>
                <span className="absolute left-[37.5%] -translate-x-1/2 text-[#FFE600]">$80k</span>
                <span className="absolute left-[75%] -translate-x-1/2">$200k</span>
                <span className="absolute right-0">$500k+</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-1">
              {/* Single Only */}
              <div className="bg-[#0c0721]/90 p-3.5 rounded-xl border border-[#FF007F]/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#00F5FF]" />
                  <span className="text-xs sm:text-sm font-bold text-white">Must Be Single / Unmarried</span>
                </div>
                <button
                  onClick={() =>
                    updateCriteria(
                      'maritalPref',
                      criteria.maritalPref === MaritalPreference.SINGLE_ONLY
                        ? MaritalPreference.DONT_CARE
                        : MaritalPreference.SINGLE_ONLY
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    criteria.maritalPref === MaritalPreference.SINGLE_ONLY ? 'bg-[#FF007F] shadow-[0_0_8px_#FF007F]' : 'bg-[#2a0845]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      criteria.maritalPref === MaritalPreference.SINGLE_ONLY ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Exclude Obese */}
              <div className="bg-[#0c0721]/90 p-3.5 rounded-xl border border-[#FF007F]/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#FF007F]" />
                  <span className="text-xs sm:text-sm font-bold text-white">Exclude Obese (BMI &lt; 30)</span>
                </div>
                <button
                  onClick={() => updateCriteria('excludeObese', !criteria.excludeObese)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    criteria.excludeObese ? 'bg-[#FF007F] shadow-[0_0_8px_#FF007F]' : 'bg-[#2a0845]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      criteria.excludeObese ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Race, Education, Location Button Grids */}
          <div className="space-y-5 bg-[#180e38]/70 p-5 rounded-2xl border border-[#FF007F]/30 shadow-inner md:col-span-2 lg:col-span-1 flex flex-col justify-between">
            {/* Race Selection */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono font-bold text-white block uppercase tracking-wider border-b border-[#FF007F]/20 pb-1">
                Race / Ethnicity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: Race.ANY, label: 'Any' },
                  { id: Race.WHITE, label: 'White' },
                  { id: Race.BLACK, label: 'Black' },
                  { id: Race.HISPANIC, label: 'Latino' },
                  { id: Race.ASIAN, label: 'Asian' },
                  { id: Race.OTHER, label: 'Other' },
                ].map((r) => {
                  const isSelected = criteria.selectedRaces.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRaceToggle(r.id)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-[#00F5FF] bg-[#00F5FF]/25 text-white shadow-[0_0_10px_rgba(0,245,255,0.5)]'
                          : 'border-[#FF007F]/20 bg-[#0c0721]/70 text-[#E0E0E0] hover:text-white hover:border-[#00F5FF]/40'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Education Level Selection */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono font-bold text-white block uppercase tracking-wider flex items-center gap-1.5 border-b border-[#FF007F]/20 pb-1">
                <GraduationCap className="w-4 h-4 text-[#00F5FF]" />
                <span>Min Education</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: EducationLevel.ANY, label: 'Any' },
                  { id: EducationLevel.HIGH_SCHOOL, label: 'High School' },
                  { id: EducationLevel.SOME_COLLEGE, label: 'College' },
                  { id: EducationLevel.BACHELORS, label: 'Bachelor' },
                  { id: EducationLevel.MASTERS, label: 'Master' },
                  { id: EducationLevel.DOCTORATE, label: 'Doctorate' },
                ].map((e) => {
                  const isSelected = criteria.minEducation === e.id;
                  return (
                    <button
                      key={e.id}
                      onClick={() => updateCriteria('minEducation', e.id)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-[#FF007F] bg-[#FF007F]/25 text-white shadow-[0_0_10px_#FF007F]'
                          : 'border-[#FF007F]/20 bg-[#0c0721]/70 text-[#E0E0E0] hover:text-white hover:border-[#FF007F]/40'
                      }`}
                    >
                      {e.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location Scope Selection */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-mono font-bold text-white block uppercase tracking-wider flex items-center gap-1.5 border-b border-[#FF007F]/20 pb-1">
                <MapPin className="w-4 h-4 text-[#FF007F]" />
                <span>Location Scope</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: LocationScope.SAME_CITY, label: 'Same City' },
                  { id: LocationScope.SAME_STATE, label: 'Same State' },
                  { id: LocationScope.SAME_COUNTRY, label: 'Same Country' },
                  { id: LocationScope.OPEN, label: 'Open' },
                ].map((l) => {
                  const isSelected = criteria.location === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => updateCriteria('location', l.id)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-[#FFE600] bg-[#FFE600]/25 text-white shadow-[0_0_10px_#FFE600]'
                          : 'border-[#FF007F]/20 bg-[#0c0721]/70 text-[#E0E0E0] hover:text-white hover:border-[#FFE600]/40'
                      }`}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onCalculate}
            disabled={isAnalyzing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF] hover:opacity-95 text-white font-display text-xl sm:text-2xl uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:shadow-[0_0_40px_rgba(0,245,255,0.8)] hover:scale-[1.005] active:scale-[0.995] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Flame className="w-6 h-6 text-[#FFE600] animate-bounce" />
                <span>ANALYZING CENSUS DATA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-[#FFE600] animate-spin" />
                <span>CALCULATE DELUSION SCORE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
