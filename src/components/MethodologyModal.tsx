'use client';

import { useEffect } from 'react';
import { X, Database, Calculator, Award } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c0721] border-2 border-[#FF007F]/70 rounded-3xl shadow-[0_0_70px_rgba(255,0,127,0.45)] overflow-hidden"
      >
        {/* Top Neon Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF007F] via-[#8A2BE2] to-[#00F5FF]" />

        {/* Header */}
        <div className="relative flex items-start justify-between px-7 sm:px-10 pt-8 pb-6 border-b border-[#FF007F]/25 bg-gradient-to-b from-[#180e38] to-transparent">
          <div>
            <div className="text-xs font-mono font-bold text-[#00F5FF] uppercase tracking-[0.35em] mb-2">
              Fresh & Fit · The Numbers Don't Lie
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wide leading-none">
              METHODOLOGY & <span className="text-[#00F5FF] text-glow-cyan">DATA STRATEGY</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 p-2.5 rounded-xl bg-[#180e38] border border-[#FF007F]/40 text-[#E0E0E0] hover:text-white hover:border-[#FF007F] transition-colors cursor-pointer"
            title="Close [Esc]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-7 sm:px-10 py-7 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Section 1: Data Sources */}
          <section className="glass-card-vapor p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#FF007F]/30 pb-3">
              <Database className="w-6 h-6 text-[#00F5FF]" />
              <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                1. Authoritative Data Sources
              </h3>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                The calculator uses empirical microdata and aggregated statistics from official US government surveys and major research organizations:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-[#B3A0D2]">
                <li>
                  <strong className="text-white">US Census Bureau — ACS 2024 1-Year Estimates:</strong>{' '}
                  Age distribution and race/ethnicity shares for adult males (B01001 tables), individual income distributions by age bracket, marital status by age, and educational attainment.
                </li>
                <li>
                  <strong className="text-white">CDC NHANES — 2021–2023 Cycle (most recent released cycle):</strong>{' '}
                  Measured height distributions (Mean = 5'9.1", σ = 2.9") and body mass index (BMI / obesity rates) for adult males.
                </li>
                <li>
                  <strong className="text-white">Pew Research Center — Religious Landscape Study 2023-24:</strong>{' '}
                  Religious affiliation of US men. 59% identify as Christian; ~1-2% identify as Jewish, Muslim, Hindu, or Buddhist (non-Christian faiths are survey-based and flat by age).
                </li>
                <li>
                  <strong className="text-white">Pew Research Center — 2024 Political Affiliation:</strong>{' '}
                  Party identification and leaning among US men by age. 52% identify as Republican / lean Republican, 46% as Democratic / lean Democratic, ~4% as strict independents (no lean).
                </li>
                <li>
                  <strong className="text-white">SAMHSA — NSDUH 2023 (National Survey on Drug Use and Health):</strong>{' '}
                  Past-year illicit drug use among US men by age (~24.9% of adults 12+ report past-year use; rates peak in the 18-25 cohort). Also past-month cigarette use (10.6% of 18-25, ~17-20% of 26-49) used for the non-smoker filter.
                </li>
                <li>
                  <strong className="text-white">Gallup — 2024 LGBTQ+ Identification:</strong>{' '}
                  Share of US men identifying as straight by age (6% of men overall identify as LGBTQ+; 12% of Gen Z men, 9% of millennials, lower among older cohorts).
                </li>
                <li>
                  <strong className="text-white">US Census Bureau SIPP (P70-162) & NSFG 2017-2019:</strong>{' '}
                  Share of adult men who have never fathered a child, by age (70% childless at 25-29, falling to ~24% by 40-49).
                </li>
                <li>
                  <strong className="text-white">Brennan Center for Justice & SEARCH/BJS national criminal records survey (2018):</strong>{' '}
                  Share of working-age adults with a criminal record (~1 in 3) and male-specific estimates by age.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Mathematical Approach */}
          <section className="glass-card-vapor p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#FF007F]/30 pb-3">
              <Calculator className="w-6 h-6 text-[#FF007F]" />
              <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                2. Age-Conditional Probability Model
              </h3>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                Unlike naive calculators that simply multiply independent probabilities, our model accounts for the strongest demographic correlation:{' '}
                <strong className="text-[#00F5FF]">Age</strong>.
              </p>
              <div className="bg-[#0c0721] p-4 rounded-lg font-mono text-xs text-[#00F5FF] border border-[#00F5FF]/30 space-y-1">
                <p>P(Match) = P(Age) × P(Race) × P(Height ≥ H) × P(Not Obese | Age) × P(Income ≥ I | Age) × P(Single | Age) × P(Edu ≥ E)</p>
                <p className="text-[#FF007F]">× P(Religion | Age) × P(Party | Age) × P(No Children | Age) × P(No Drugs | Age) × P(No Record | Age) × P(Non-Smoker | Age) × P(Straight | Age)</p>
              </div>
              <p className="text-xs text-[#B3A0D2]">
                Because income, marital status, BMI, and the Tier-2/3 lifestyle factors (religion, politics, children, drug use, criminal history, smoking, sexual orientation) are heavily dependent on age (e.g., only ~5% of men aged 18-24 earn over $100k vs ~33% of men aged 35-54), calculating these variables conditioned on the selected age brackets ensures accuracy. Filters left at "Any" contribute a probability of 1.0 and do not affect the result. Non-Christian religion shares are survey-based and treated as flat by age.
              </p>
            </div>
          </section>

          {/* Section 3: Cat Lady Index */}
          <section className="glass-card-vapor p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#FF007F]/30 pb-3">
              <Award className="w-6 h-6 text-[#FFE600]" />
              <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                3. The Cat Lady Meter (0 - 5 Score)
              </h3>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                The 0 to 5 Cat Lady Meter assigns a rating based on the total qualifying match percentage:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#180e38] p-3 rounded border border-[#00F5FF]/40">
                  <span className="text-[#00F5FF] font-bold">Score 0 (Grounded):</span> &gt; 30% match. Realistic expectations.
                </div>
                <div className="bg-[#180e38] p-3 rounded border border-[#00F5FF]/40">
                  <span className="text-[#00F5FF] font-bold">Score 1 (Reasonable):</span> 10% - 30% match. Selective but doable.
                </div>
                <div className="bg-[#180e38] p-3 rounded border border-[#FFE600]/40">
                  <span className="text-[#FFE600] font-bold">Score 2 (Selective):</span> 3% - 10% match. Standards getting high.
                </div>
                <div className="bg-[#180e38] p-3 rounded border border-[#FF007F]/40">
                  <span className="text-[#FF007F] font-bold">Score 3 (Picky):</span> 0.5% - 3% match. Needle in a haystack.
                </div>
                <div className="bg-[#180e38] p-3 rounded border border-[#E50914]/50">
                  <span className="text-[#E50914] font-bold">Score 4 (Unicorn Hunter):</span> 0.05% - 0.5% match. Very rare.
                </div>
                <div className="bg-[#180e38] p-3 rounded border border-[#E50914]">
                  <span className="text-[#E50914] font-bold">Score 5 (Delusional):</span> &lt; 0.05% match. 5 Bags max.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Pack Footer */}
          <section className="flex items-center justify-between gap-4 px-2 pb-1">
            <div className="text-[11px] font-mono text-[#B3A0D2]">
              DATA PACK <span className="text-[#00F5FF] font-bold">2026.2</span> · ACS 2024 · NHANES 2021-2023 · Pew RLS 2023-24 · NSDUH 2023 · Gallup 2024 · released Aug 2026
            </div>
            <div className="text-[11px] font-mono text-[#B3A0D2]">All probabilities conditioned on age</div>
          </section>
        </div>
      </div>
    </div>
  );
}
