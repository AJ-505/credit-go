import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/2/onboarding" className="bg-white text-black font-bold rounded hover:bg-gray-200 px-4 py-2">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Trusted by 100+ institutional lenders and credit providers.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
          The financial protocol for modern workers.
        </h1>
        
        <p className="text-[#888] max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Aggregate your fragmented financial history. Generate a unified Trust Score. Access top-tier financing for your personal and professional growth.
        </p>
        
        <Link href="/2/onboarding" className="bg-white text-black hover:bg-gray-200 rounded-lg inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
          Initialize Profile
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-black border-t border-[#222] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Engineered for maximum financial leverage.
          </h2>
          <p className="text-xl md:text-2xl text-[#888] leading-relaxed">
            Stop submitting PDF statements to a dozen different apps. Provide your CreditGo ID once and get instant approvals everywhere.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Data Aggregation</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Consolidate your financial footprint.</h3>
              <p className="text-lg text-[#888] leading-relaxed">We securely hash your transaction history from traditional banks and mobile wallets. You completely control what data is used to compile your master Trust Score.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-black border border-[#222] rounded-lg shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-black border border-[#222] rounded-lg shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Dynamic Scaling</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Algorithmic limit expansion.</h3>
              <p className="text-lg text-[#888] leading-relaxed">Your borrowing capacity isn't static; it scales linearly with your reliability. A successful repayment automatically provisions a larger credit tranche at a lower interest rate.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Automated Mandates</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Programmable debt management.</h3>
              <p className="text-lg text-[#888] leading-relaxed">Through our Squadco infrastructure integration, your repayments are automated via direct debit. You never miss a date, and your score never takes a hit.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-black border border-[#222] rounded-lg shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-black border-t border-[#222] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Deploy capital efficiently.</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Authenticate</h3>
                <p className="text-[#888]">Provide secure read-access to your financial nodes.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Compile</h3>
                <p className="text-[#888]">Our system generates your algorithmic trust metric.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Execute</h3>
                <p className="text-[#888]">Route approved capital to your designated endpoints.</p>
              </div>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Finance your infrastructure.</h2>
            <p className="text-[#888] text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/2/onboarding" className="inline-flex items-center gap-2 font-bold text-lg text-white hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-black border border-[#222] rounded-lg shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold text-white">Developer Equipment</span>
               </div>
               <span className="text-[#888] font-medium">Instant approval</span>
            </div>
            <div className="bg-black border border-[#222] rounded-lg shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold text-white">Home Office Power</span>
               </div>
               <span className="text-[#888] font-medium">Tier 1 interest</span>
            </div>
            <div className="bg-black border border-[#222] rounded-lg shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold text-white">Professional Courses</span>
               </div>
               <span className="text-[#888] font-medium">Deferred payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-black border-t border-[#222] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-[#888]">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Lending APIs with built-in risk mitigation.</h2>
            <p className="text-[#888] text-xl leading-relaxed mb-12">We run XGBoost models on millions of alternative data points. Integrate our Trust Score API to instantly route high-quality borrowers to your loan book with near-zero default risk.</p>
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Compile your financial identity today.</h2>
           <Link href="/2/onboarding" className="bg-white text-black hover:bg-gray-200 rounded-lg inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
              Initialize Profile
           </Link>
         </div>
      </section>
    </div>
  );
}
