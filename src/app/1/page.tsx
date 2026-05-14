import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/1/onboarding" className="text-white hover:text-red-400 font-bold">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Over ₦50M disbursed securely this month.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
          Credit that respects your hustle.
        </h1>
        
        <p className="text-stone-400 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Traditional banks look at paperwork. We look at your actual cash flow. Connect your accounts to get a Trust Score that reflects your real earning power.
        </p>
        
        <Link href="/1/onboarding" className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
          Claim Your Limit
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#111113] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Legacy credit bureaus don't know you. We do.
          </h2>
          <p className="text-xl md:text-2xl text-stone-400 leading-relaxed">
            You pay your bills. You buy airtime. You move money. Why isn't that counting towards your credit? Now, it does.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-red-500">Alternative Data Scoring</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Your cash flow is the only proof you need.</h3>
              <p className="text-lg text-stone-400 leading-relaxed">We analyze your utility payments, airtime recharges, and mobile money inflows. No pay slip? No problem. If you earn and spend reliably, you deserve access to capital.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-red-500">The Repayment Multiplier</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Pay it back. Watch your limit explode.</h3>
              <p className="text-lg text-stone-400 leading-relaxed">Start with a baseline limit. Clear your balance on time, and your limit automatically multiplies. Your good habits directly and instantly increase your borrowing power. No manual reviews.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-red-500">Privacy-First Architecture</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Bulletproof security. Zero surveillance.</h3>
              <p className="text-lg text-stone-400 leading-relaxed">Your data never leaves the vault. We securely connect to your accounts using read-only tokens just to extract the trust signals. We don't sell your data, we just use it to get you funded.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#111113] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">From zero to funded in three steps.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-12 left-1/6 right-1/6 h-0.5 bg-black/10 dark:bg-white/10 hidden md:block"></div>
            
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl rounded-full flex items-center justify-center text-2xl font-black text-white mb-8 border-4 border-[color:var(--bg)]">1</div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Accounts</h3>
              <p className="text-stone-400 text-lg">Link your primary bank or mobile money securely.</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl rounded-full flex items-center justify-center text-2xl font-black text-white mb-8 border-4 border-[color:var(--bg)]">2</div>
              <h3 className="text-2xl font-bold text-white mb-4">Extract Trust</h3>
              <p className="text-stone-400 text-lg">Our engine calculates your true borrowing capacity instantly.</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl rounded-full flex items-center justify-center text-2xl font-black text-white mb-8 border-4 border-[color:var(--bg)]">3</div>
              <h3 className="text-2xl font-bold text-white mb-4">Access Capital</h3>
              <p className="text-stone-400 text-lg">Withdraw funds or finance assets immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Stop waiting. Start doing.</h2>
            <p className="text-stone-400 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/1/onboarding" className="inline-flex items-center gap-2 font-bold text-lg text-red-500 hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold text-white">Rent a MacBook Pro</span>
               </div>
               <span className="text-stone-400 font-medium">₦45,000/month</span>
            </div>
            <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold text-white">5KVA Solar Setup</span>
               </div>
               <span className="text-stone-400 font-medium">₦120,000/month</span>
            </div>
            <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold text-white">School Fees Advance</span>
               </div>
               <span className="text-stone-400 font-medium">Up to ₦2M</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#111113] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-stone-400">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">For the Lenders: Zero Guesswork.</h2>
            <p className="text-stone-400 text-xl leading-relaxed mb-12">Stop dealing with defaults. CreditGo provides you with pre-vetted borrowers whose alternative data proves their capacity to pay. We handle the direct debits; you get the returns.</p>
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Ready to build your actual credit profile?</h2>
           <Link href="/1/onboarding" className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
              Claim Your Limit
           </Link>
         </div>
      </section>
    </div>
  );
}
