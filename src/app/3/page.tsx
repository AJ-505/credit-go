import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff7b72] to-amber-500"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/3/onboarding" className="border border-gray-600 rounded hover:border-gray-400 text-sm font-semibold px-4 py-2">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Backed by data. Built for absolute transparency.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
          Know exactly what you can borrow.
        </h1>
        
        <p className="text-gray-400 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          No more blind applications. Our diagnostic engine analyzes your read-only bank data to show you exactly which loans you qualify for, before you even apply.
        </p>
        
        <Link href="/3/onboarding" className="bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)] inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
          Analyze My Score
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#0d1117] border-t border-gray-800 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Borrow safely. Never fall into a debt trap.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            We don't just give you a number. We calculate your exact safe borrowing capacity based on your monthly cash flow, so you never over-leverage.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#ff7b72]">Diagnostic Dashboard</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Understand your financial health instantly.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">See exactly why your score is what it is. High utilization? Missed a utility bill? We pinpoint the exact metrics affecting your rate and tell you how to fix them.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#161b22] border border-gray-800 rounded-lg shadow-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-[#161b22] border border-gray-800 rounded-lg shadow-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#ff7b72]">Milestone Tracking</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Automate your progression to better rates.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">Every milestone hit drops your risk profile. As you clear your balances automatically via our mandate system, your available credit pool expands in real-time.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#ff7b72]">Read-Only Access</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Zero-risk evaluation process.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">We evaluate your financial footprint without ever touching your funds. Our analysis is 100% read-only and 100% secure, leaving no hard inquiries on your traditional records.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#161b22] border border-gray-800 rounded-lg shadow-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#0d1117] border-t border-gray-800 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">How we calculate your capacity.</h2>
          </div>
          <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">01</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Ingest Data</h3>
                <p className="text-gray-400 text-lg">Sync your transaction history securely through our API.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gray-800">
                 <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">02</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Analyze Risk</h3>
                <p className="text-gray-400 text-lg">Our ML models assess your capacity and calculate limits.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gray-800">
                 <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">03</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Unlock Tiers</h3>
                <p className="text-gray-400 text-lg">Access lenders matched precisely to your credit profile.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-500">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Practical financing for real life.</h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/3/onboarding" className="inline-flex items-center gap-2 font-bold text-lg text-[#ff7b72] hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-[#161b22] border border-gray-800 rounded-lg shadow-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold text-white">Device Upgrades</span>
               </div>
               <span className="text-gray-400 font-medium">From ₦25,000/mo</span>
            </div>
            <div className="bg-[#161b22] border border-gray-800 rounded-lg shadow-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold text-white">Inverter Batteries</span>
               </div>
               <span className="text-gray-400 font-medium">From ₦40,000/mo</span>
            </div>
            <div className="bg-[#161b22] border border-gray-800 rounded-lg shadow-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold text-white">Emergency Funds</span>
               </div>
               <span className="text-gray-400 font-medium">Same-day disbursal</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#0d1117] border-t border-gray-800 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-gray-400">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Filter out the noise. Fund the reliable.</h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12">Our dashboard provides lenders with a clear, algorithmic breakdown of borrower risk. Stop relying on incomplete bureau data and start lending based on real-time cash flow intelligence.</p>
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Take control of your credit capacity.</h2>
           <Link href="/3/onboarding" className="bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)] inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
              Analyze My Score
           </Link>
         </div>
      </section>
    </div>
  );
}
