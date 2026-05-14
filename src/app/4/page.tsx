import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/4/onboarding" className="bg-white text-black font-semibold rounded-full hover:bg-gray-200 px-5 py-2.5">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Over 10,000 users have upgraded their limits this year.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
          Borrow. Repay. Expand.
        </h1>
        
        <p className="text-gray-400 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Start with what you can handle. Pay it back on time. Access massive credit limits. It really is that simple. Welcome to the new standard of personal finance.
        </p>
        
        <Link href="/4/onboarding" className="bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
          Start Now
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#0a0a0a] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            A system designed to help you actually grow.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            You aren't stuck with bad rates forever. Three months of perfect repayments will automatically move you to our premium lender tiers.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#0061FE]">Seamless Connection</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Link your daily life to your credit limit.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">Log in with your existing bank securely. We scan your history for positive payment behavior—like paying your rent, electricity, or subscriptions on time.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#111] p-8 aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-[#111] p-8 aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#0061FE]">Tiered Upgrades</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Climb the ladder automatically.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">Your limits aren't locked. As you prove your reliability by paying back small advances, the system automatically graduates you to larger loans with significantly lower interest.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#0061FE]">Everything in Sync</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">One score. Universal access.</h3>
              <p className="text-lg text-gray-400 leading-relaxed">We track your entire financial reputation. One verified score that gives you instant access to a massive, growing network of verified lenders and merchants.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#111] p-8 aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#0a0a0a] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The path to better capital.</h2>
          </div>
          <div className="space-y-16 max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">1</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Connect</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Link your everyday accounts with bank-grade security. We extract only the necessary data points to understand your financial flow.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">2</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Borrow</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Access your initial safe limit instantly. No hidden fees, no compounding traps. Just clear, upfront terms.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">3</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Expand</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Repay on time to automatically grow your capacity. It's that simple. Good behavior is immediately rewarded.</p>
               </div>
            </div>
          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Get the things that move you forward.</h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/4/onboarding" className="inline-flex items-center gap-2 font-bold text-lg text-[#0061FE] hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-[#111] p-8 p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold text-white">Work Laptops</span>
               </div>
               <span className="text-gray-400 font-medium">Pay over 6 months</span>
            </div>
            <div className="bg-[#111] p-8 p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold text-white">Solar Panels</span>
               </div>
               <span className="text-gray-400 font-medium">Pay over 12 months</span>
            </div>
            <div className="bg-[#111] p-8 p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold text-white">Rent Advance</span>
               </div>
               <span className="text-gray-400 font-medium">Pay over 3 months</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#0a0a0a] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-gray-400">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">High-quality leads, delivered daily.</h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12">Partner with CreditGo to access a pool of borrowers actively climbing the trust ladder. Our automated mandate system ensures you get paid back on time, every time.</p>
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Ready to unlock better financing?</h2>
           <Link href="/4/onboarding" className="bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
              Start Now
           </Link>
         </div>
      </section>
    </div>
  );
}
