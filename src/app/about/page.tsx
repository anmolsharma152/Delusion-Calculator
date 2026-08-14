'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Database, Calculator, Award, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-[#E0E0E0] gradient-mesh">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#00E5FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Calculator</span>
        </Link>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">
            METHODOLOGY & <span className="text-[#E50914] text-glow-crimson">DATA STRATEGY</span>
          </h1>
          <p className="text-sm sm:text-base font-mono text-[#8B8B8B]">
            How the Delusion Calculator processes demographic probabilities using official US government data.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="space-y-8">
          {/* Section 1: Data Sources */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#333333] pb-3">
              <Database className="w-6 h-6 text-[#00E5FF]" />
              <h2 className="font-display text-2xl text-white uppercase tracking-wider">
                1. Authoritative Data Sources
              </h2>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                The calculator uses empirical microdata and aggregated statistics from official US government surveys:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-[#8B8B8B]">
                <li>
                  <strong className="text-white">US Census Bureau (ACS 2023 1-Year Estimates):</strong> Individual income distributions by age bracket, marital status by age, educational attainment, and total population counts.
                </li>
                <li>
                  <strong className="text-white">CDC NHANES (2021-2023 Cycle):</strong> Measured height distributions (Mean = 5'9.1", σ = 2.9") and body mass index (BMI / obesity rates) for adult males.
                </li>
                <li>
                  <strong className="text-white">Bureau of Labor Statistics (BLS):</strong> Employment status and income cross-tabulations.
                </li>
                <li>
                  <strong className="text-white">US Census Bureau CPS (Current Population Survey):</strong> Monthly labor force and demographic data tables.{" "}
                  <a
                    href="https://www.census.gov/programs-surveys/cps/data/tables.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00E5FF] underline underline-offset-2 hover:text-white"
                  >
                    census.gov/programs-surveys/cps/data/tables.html
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Mathematical Approach */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#333333] pb-3">
              <Calculator className="w-6 h-6 text-[#E50914]" />
              <h2 className="font-display text-2xl text-white uppercase tracking-wider">
                2. Age-Conditional Probability Model
              </h2>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                Unlike naive calculators that simply multiply independent probabilities, our model accounts for the strongest demographic correlation: <strong className="text-[#00E5FF]">Age</strong>.
              </p>
              <div className="bg-[#0D0D0D] p-4 rounded-lg font-mono text-xs text-[#00E5FF] border border-[#252525] space-y-1">
                <p>P(Match) = P(Age) × P(Race) × P(Height ≥ H) × P(Not Obese | Age) × P(Income ≥ I | Age) × P(Single | Age) × P(Edu ≥ E)</p>
              </div>
              <p className="text-xs text-[#8B8B8B]">
                Because income, marital status, and BMI are heavily dependent on age (e.g., only ~5% of men aged 18-24 earn over $100k vs ~33% of men aged 35-54), calculating these variables conditioned on the selected age brackets ensures accuracy.
              </p>
            </div>
          </section>

          {/* Section 3: Cat Lady Index */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#333333] pb-3">
              <Award className="w-6 h-6 text-[#FFCC00]" />
              <h2 className="font-display text-2xl text-white uppercase tracking-wider">
                3. The Cat Lady Meter (0 - 5 Score)
              </h2>
            </div>
            <div className="text-sm space-y-3 text-[#E0E0E0]">
              <p>
                The 0 to 5 Cat Lady Meter assigns a rating based on the total qualifying match percentage:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#00E5FF]/30">
                  <span className="text-[#00E5FF] font-bold">Score 0 (Grounded):</span> &gt; 30% match. Realistic expectations.
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#00E5FF]/30">
                  <span className="text-[#00E5FF] font-bold">Score 1 (Reasonable):</span> 10% - 30% match. Selective but doable.
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#FFCC00]/30">
                  <span className="text-[#FFCC00] font-bold">Score 2 (Selective):</span> 3% - 10% match. Standards getting high.
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#FF007F]/30">
                  <span className="text-[#FF007F] font-bold">Score 3 (Picky):</span> 0.5% - 3% match. Needle in a haystack.
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#E50914]/30">
                  <span className="text-[#E50914] font-bold">Score 4 (Unicorn Hunter):</span> 0.05% - 0.5% match. Very rare.
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded border border-[#E50914]">
                  <span className="text-[#E50914] font-bold">Score 5 (Delusional):</span> &lt; 0.05% match. 5 Bags max.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
