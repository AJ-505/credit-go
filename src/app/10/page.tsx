import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-black font-medium tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/10/onboarding" className="text-black hover:opacity-50 text-xs tracking-[0.2em] uppercase font-medium">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          Designed for clarity and peace of mind.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] text-black font-medium tracking-tight">
          Credit, simplified.
        </h1>
        
        <p className="text-gray-500 font-light max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Your financial life, beautifully consolidated. We use a privacy-first approach to understand your habits, ensuring your reliable behavior translates directly into superior loan access.
        </p>
        
        <Link href="/10/onboarding" className="bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8 transition-transform hover:scale-[1.02] shadow-xl inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          Begin
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#FCFCFC] border-y border-black/[0.03] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black font-medium tracking-tight mb-8 leading-tight">
            Everything just works.
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            No forms, no waiting, no hidden fees. Just a clear understanding of your financial capability, granting you access to the capital you deserve.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-gray-400 font-light tracking-[0.1em]">Designed for Privacy</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-medium tracking-tight mb-6 leading-tight">Your data is yours.</h3>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">We believe privacy is a fundamental right. We only access the patterns necessary to build your trust score, and nothing more. Clean, secure, transparent.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-gray-400 font-light tracking-[0.1em]">Effortless Expansion</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-medium tracking-tight mb-6 leading-tight">Grow without trying.</h3>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">Borrow what you need. Repay it smoothly. The system naturally adapts to give you more freedom and better rates as you prove your reliability over time.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-gray-400 font-light tracking-[0.1em]">A Single Truth</div>
              <h3 className="text-3xl md:text-5xl font-bold text-black font-medium tracking-tight mb-6 leading-tight">One elegant score.</h3>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">Leave fragmented banking systems behind. Experience one beautifully simple score that speaks for your entire financial capability across all platforms.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#FCFCFC] border-y border-black/[0.03] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-black font-medium tracking-tight mb-6">The elegant way to borrow.</h2>
          </div>
          <div className="space-y-16 max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">1</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Connect</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Link your everyday accounts with bank-grade security. We extract only the necessary data points to understand your financial flow.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">2</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Borrow</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Access your initial safe limit instantly. No hidden fees, no compounding traps. Just clear, upfront terms.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">3</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Expand</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Repay on time to automatically grow your capacity. It's that simple. Good behavior is immediately rewarded.</p>
               </div>
            </div>
          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-black font-medium tracking-tight mb-8 leading-tight">Access what you need, effortlessly.</h2>
            <p className="text-gray-500 font-light text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/10/onboarding" className="inline-flex items-center gap-3 font-bold text-xl text-gray-400 font-light tracking-[0.1em] hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold text-black font-medium tracking-tight">Personal Technology</span>
               </div>
               <span className="text-gray-500 font-light font-medium">Simple monthly terms</span>
            </div>
            <div className="bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold text-black font-medium tracking-tight">Home Energy</span>
               </div>
               <span className="text-gray-500 font-light font-medium">Sustainable financing</span>
            </div>
            <div className="bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold text-black font-medium tracking-tight">Family Education</span>
               </div>
               <span className="text-gray-500 font-light font-medium">Stress-free tuition</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#FCFCFC] border-y border-black/[0.03] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-gray-500 font-light">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-black font-medium tracking-tight mb-8 leading-tight">Clarity in underwriting.</h2>
            <p className="text-gray-500 font-light text-xl leading-relaxed mb-12">We strip away the noise. Access a curated pool of individuals whose financial behaviors have been verified through our elegant, high-precision models.</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-black font-medium tracking-tight hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-black font-medium tracking-tight mb-12 leading-tight tracking-tight">Experience better financial access.</h2>
           <Link href="/10/onboarding" className="bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8 transition-transform hover:scale-[1.02] shadow-xl inline-block px-14 py-6 text-2xl font-black transition-transform">
              Begin
           </Link>
         </div>
      </section>
    </div>
  );
}
