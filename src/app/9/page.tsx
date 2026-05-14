import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px]"></div><div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-gray-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/9/onboarding" className="bg-indigo-600/10 text-indigo-700 font-bold rounded-lg hover:bg-indigo-600/20 px-5 py-2 transition-colors">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          Compliant with CBN Data Protection Regulations.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] text-gray-900 tracking-tight">
          Institutional-grade credit intelligence.
        </h1>
        
        <p className="text-gray-500 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          We provide a secure, unified view of your financial health. By safely evaluating your transaction patterns, we connect you with premium institutional lenders for significant capital access.
        </p>
        
        <Link href="/9/onboarding" className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all hover:-translate-y-0.5 inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          Create Account
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-white border-t border-gray-200/50 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-8 leading-tight">
            Sophisticated analysis. Simple outcomes.
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed">
            A secure, unified view of your financial health that accurately reflects your creditworthiness to premium financial institutions.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-indigo-600 font-bold">NDPR Compliant Parsing</div>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">Maximum compliance and security.</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">Your financial data is processed in isolated, encrypted containers to ensure absolute privacy. No human ever reviews your personal statements.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-indigo-600 font-bold">Tiered Limit Expansion</div>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">Automated rate negotiation.</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">Our algorithms automatically negotiate higher credit limits and reduced Annual Percentage Rates (APY) upon consecutive direct debit settlements.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-indigo-600 font-bold">Unified Data Infrastructure</div>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">Actionable trust metrics.</h3>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">Seamlessly integrate your payroll, corporate accounts, and utility records into one undeniable trust metric recognized by leading institutions.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-white border-t border-gray-200/50 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">The underwriting process.</h2>
          </div>
          <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl font-black text-indigo-100">01</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ingest Data</h3>
                <p className="text-gray-600 text-lg">Sync your transaction history securely through our API.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center border border-indigo-100">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl font-black text-indigo-100">02</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyze Risk</h3>
                <p className="text-gray-600 text-lg">Our ML models assess your capacity and calculate limits.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center border border-indigo-100">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-indigo-600 border border-indigo-700 rounded-2xl shadow-lg transform md:scale-105">
              <div className="text-5xl font-black text-indigo-400/50">03</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Unlock Tiers</h3>
                <p className="text-indigo-100 text-lg">Access lenders matched precisely to your credit profile.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center border border-white/20 text-white">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-8 leading-tight">Financing for professionals.</h2>
            <p className="text-gray-500 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/9/onboarding" className="inline-flex items-center gap-3 font-bold text-xl text-indigo-600 font-bold hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">Workstation Procurement</span>
               </div>
               <span className="text-gray-500 font-medium">Low APY leasing</span>
            </div>
            <div className="bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">Residential Power</span>
               </div>
               <span className="text-gray-500 font-medium">12-24 month terms</span>
            </div>
            <div className="bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">Executive Education</span>
               </div>
               <span className="text-gray-500 font-medium">Direct disbursement</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-white border-t border-gray-200/50 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-gray-500">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8 leading-tight">Enterprise risk management.</h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-12">Leverage our XGBoost-powered API to underwrite retail and SME loans with unprecedented accuracy. We utilize over 300 alternative data points to predict default probability.</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-gray-900 tracking-tight hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-gray-900 tracking-tight mb-12 leading-tight tracking-tight">Establish your verified financial profile.</h2>
           <Link href="/9/onboarding" className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all hover:-translate-y-0.5 inline-block px-14 py-6 text-2xl font-black transition-transform">
              Create Account
           </Link>
         </div>
      </section>
    </div>
  );
}
