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
                The calculator uses empirical microdata and aggregated statistics from official US government surveys:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-[#B3A0D2]">
                <li>
                  <strong className="text-white">US Census Bureau — ACS 2023 1-Year Estimates:</strong>{' '}
                  Individual income distributions by age bracket, marital status by age, educational attainment, and total population counts.
                </li>
                <li>
                  <strong className="text-white">CDC NHANES — 2021–2023 Cycle (most recent released cycle):</strong>{' '}
                  Measured height distributions (Mean = 5'9.1", σ = 2.9") and body mass index (BMI / obesity rates) for adult males.
                </li>
                <li>
                  <strong className="text-white">Bureau of Labor Statistics (BLS):</strong> Employment status and income cross-tabulations.
                </li>
                <li>
                  <strong className="text-white">US Census Bureau — CPS (Current Population Survey):</strong> Monthly labor force and demographic data tables.{' '}
                  <a
                    href="https://www.census.gov/programs-surveys/cps/data/tables.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00F5FF] underline underline-offset-2 hover:text-white"
                  >
                    census.gov/programs-surveys/cps/data/tables.html
                  </a>
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
              </div>
              <p className="text-xs text-[#B3A0D2]">
                Because income, marital status, and BMI are heavily dependent on age (e.g., only ~5% of men aged 18-24 earn over $100k vs ~33% of men aged 35-54), calculating these variables conditioned on the selected age brackets ensures accuracy.
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
        </div>
      </div>
    </div>
  );
}
