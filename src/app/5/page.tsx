import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/5/onboarding" className="border border-white/20 rounded-md hover:bg-white/10 px-4 py-1.5">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Integrated with Nigeria's top tier financial infrastructure.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
          Capital, without the friction.
        </h1>
        
        <p className="text-gray-500 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Your digital history is valuable. We synthesize your payments, mobile money usage, and banking data into a powerful Trust Score that opens doors instantly.
        </p>
        
        <Link href="/5/onboarding" className="bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)] inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
          Unlock Access
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-black border-t border-white/10 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Intelligent parsing. Immediate results.
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed">
            No long forms. No waiting days for a decision. Our models understand your capability in seconds based on the data you already generate.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Local Processing</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Your data, synthesized securely.</h3>
              <p className="text-lg text-gray-500 leading-relaxed">We run complex models on your transaction metadata locally to generate an accurate, fair assessment of your capability, meaning your sensitive data stays yours.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Rewarding Reliability</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Consistency pays—literally.</h3>
              <p className="text-lg text-gray-500 leading-relaxed">Watch your borrowing power expand algorithmically as you clear your monthly obligations. We've built a system that actively rewards your financial discipline.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-white">Unified Ecosystem</div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">One metric to prove your worth.</h3>
              <p className="text-lg text-gray-500 leading-relaxed">From buying a phone to financing a car. Your CreditGo score is the only metric you need to prove your reliability to our vast network of partners.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-black border-t border-white/10 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Experience seamless financing.</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto perspective-1000">
            
            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">1</div>
              <h3 className="text-3xl font-bold text-white mb-4">Link Identity</h3>
              <p className="text-gray-300 text-lg">Securely connect your financial data through our encrypted bridges.</p>
            </div>

            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40 md:mt-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">2</div>
              <h3 className="text-3xl font-bold text-white mb-4">Generate Score</h3>
              <p className="text-gray-300 text-lg">Receive your algorithmic trust rating within seconds of connection.</p>
            </div>

            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40 md:mt-24">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">3</div>
              <h3 className="text-3xl font-bold text-white mb-4">Access Funds</h3>
              <p className="text-gray-300 text-lg">Unlock capital instantly across our verified lender ecosystem.</p>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Premium access for reliable people.</h2>
            <p className="text-gray-500 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/5/onboarding" className="inline-flex items-center gap-2 font-bold text-lg text-white hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold text-white">High-End Devices</span>
               </div>
               <span className="text-gray-500 font-medium">Approved in 5 mins</span>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold text-white">Renewable Energy</span>
               </div>
               <span className="text-gray-500 font-medium">Zero down-payment</span>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold text-white">Education Funding</span>
               </div>
               <span className="text-gray-500 font-medium">Direct to institution</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-black border-t border-white/10 py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-gray-500">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Lending, completely de-risked.</h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-12">We don't just score users; we manage the collection lifecycle. Through our robust integrations, we tokenize cards and manage direct debits to ensure your capital is protected.</p>
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Discover your true borrowing power.</h2>
           <Link href="/5/onboarding" className="bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)] inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
              Unlock Access
           </Link>
         </div>
      </section>
    </div>
  );
}
