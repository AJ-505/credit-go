import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FFF4D4] text-[#0f172a] flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#F472B6] rounded-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10 animate-bounce" style={{animationDuration: "3s"}}></div><div className="absolute bottom-40 right-20 w-32 h-32 bg-[#34D399] rounded-2xl rotate-12 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10"></div><div className="absolute top-1/2 right-10 w-20 h-20 bg-[#60A5FA] rounded-full border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -z-10"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-black font-black">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/8/onboarding" className="bg-[#A78BFA] text-black font-black rounded-xl hover:bg-[#8B5CF6] px-6 py-2.5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          Join 50,000+ players winning the credit game.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] text-black font-black">
          Level up your borrowing power! 🚀
        </h1>
        
        <p className="text-slate-700 font-bold max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Why settle for tiny, expensive loans? Safely link your bank app, get your epic Trust Score, and unlock massive lending limits just by paying your bills on time!
        </p>
        
        <Link href="/8/onboarding" className="bg-[#34D399] text-black font-black hover:bg-[#10B981] rounded-2xl border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1.5 hover:translate-x-1.5 transition-all inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          Let's Go!
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#E0E7FF] border-y-[4px] border-black py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black font-black mb-8 leading-tight">
            Treat your credit like a video game.
          </h2>
          <p className="text-xl md:text-2xl text-slate-700 font-bold leading-relaxed">
            Pay on time, earn XP, and watch your loan limits shoot through the roof. We make building credit actually fun.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#8B5CF6] bg-black px-3 py-1 rounded-lg inline-block border-2 border-black rotate-[-2deg]">Super Safe & Secure 🔒</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-black mb-6 leading-tight">Your info is locked in a digital vault.</h3>
              <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed">We don't play around with your privacy. We only use your data to prove to our lender friends that you're awesome at managing money.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#8B5CF6] bg-black px-3 py-1 rounded-lg inline-block border-2 border-black rotate-[-2deg]">Unlock New Tiers 📈</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-black mb-6 leading-tight">Hit milestones, get rewarded.</h3>
              <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed">Every time you clear a balance, you level up. Higher levels mean access to bigger loans, cheaper interest rates, and exclusive perks.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#8B5CF6] bg-black px-3 py-1 rounded-lg inline-block border-2 border-black rotate-[-2deg]">All Your Cash in One Place 💰</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-black mb-6 leading-tight">One epic score to rule them all.</h3>
              <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed">We connect your banks, wallets, and mobile money so you have one unified score that gets you the best deals everywhere you go.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#E0E7FF] border-y-[4px] border-black py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-black font-black mb-6">How to play and win.</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
            
            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">1</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Link Identity</h3>
              <p className="text-slate-500 text-lg">Securely connect your financial data through our encrypted bridges.</p>
            </div>

            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2 md:mt-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">2</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Generate Score</h3>
              <p className="text-slate-500 text-lg">Receive your algorithmic trust rating within seconds of connection.</p>
            </div>

            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2 md:mt-16">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">3</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Access Funds</h3>
              <p className="text-slate-500 text-lg">Unlock capital instantly across our verified lender ecosystem.</p>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-black font-black mb-8 leading-tight">Grab life's upgrades today! ⚡</h2>
            <p className="text-slate-700 font-bold text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/8/onboarding" className="inline-flex items-center gap-3 font-bold text-xl text-[#8B5CF6] bg-black px-3 py-1 rounded-lg inline-block border-2 border-black rotate-[-2deg] hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold text-black font-black">New Phones & Laptops</span>
               </div>
               <span className="text-slate-700 font-bold font-medium">Pay small small</span>
            </div>
            <div className="bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold text-black font-black">Solar Power Setup</span>
               </div>
               <span className="text-slate-700 font-bold font-medium">Never sleep in darkness</span>
            </div>
            <div className="bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold text-black font-black">School Fees</span>
               </div>
               <span className="text-slate-700 font-bold font-medium">Sorted in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#E0E7FF] border-y-[4px] border-black py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-slate-700 font-bold">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-black font-black mb-8 leading-tight">Meet your best customers here. 👋</h2>
            <p className="text-slate-700 font-bold text-xl leading-relaxed mb-12">Tired of chasing bad debt? We gamify repayment so borrowers actually want to pay you back on time. Access our pool of highly motivated, trust-scored users.</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-black font-black hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-black font-black mb-12 leading-tight tracking-tight">Ready to play the credit game and win?</h2>
           <Link href="/8/onboarding" className="bg-[#34D399] text-black font-black hover:bg-[#10B981] rounded-2xl border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1.5 hover:translate-x-1.5 transition-all inline-block px-14 py-6 text-2xl font-black transition-transform">
              Let's Go!
           </Link>
         </div>
      </section>
    </div>
  );
}
