import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fafcff] text-[#0f172a] flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-[120px] opacity-80 pointer-events-none"></div><div className="absolute top-40 left-0 -ml-40 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-50 to-emerald-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/6/onboarding" className="bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 px-6 py-2.5 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          Regulated, secure, and entirely transparent.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] text-slate-900 tracking-tight">
          The fair way to get loans.
        </h1>
        
        <p className="text-slate-500 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          Forget predatory loan sharks. Connect your bank account, get a fair Trust Score based on how you handle your money, and access low-interest loans from verified lenders.
        </p>
        
        <Link href="/6/onboarding" className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] rounded-full border border-blue-500 inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          Get Your Score
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-white py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            Good financial habits should pay off. Now they do.
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed">
            Your everyday transactions tell a story of reliability. We help you securely use that story to access safe loans, stepping up to bigger amounts as you pay them back.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-blue-600">Bank-Grade Security</div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">Your data is locked down, your credit is unlocked.</h3>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed">We connect with your banks via secure Open Banking tokens. We cannot see your passwords, we cannot move your money without permission, and we never sell your data.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-blue-600">Grow Together</div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">Start small. Grow massive.</h3>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed">Start with a ₦20,000 limit. Pay it back on time, and your limit increases to ₦50,000 automatically. Keep going to unlock millions in low-interest credit.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-blue-600">All-in-One Finance</div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">We look at the whole picture.</h3>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed">Traditional banks only care about salary slips. We care about your side-hustle inflows, your consistent airtime purchases, and your utility payments.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-white py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">Three steps to financial freedom.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-16 left-[20%] right-[20%] h-0.5 bg-black/10 dark:bg-white/10 hidden md:block"></div>
            
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-3xl font-black text-slate-900 tracking-tight mb-8 shadow-md">1</div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Secure Link</h3>
              <p className="text-slate-500 text-lg px-4">Connect your bank app safely.</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-3xl font-black text-slate-900 tracking-tight mb-8 shadow-md">2</div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Get Scored</h3>
              <p className="text-slate-500 text-lg px-4">See your fair, data-driven limit.</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-3xl font-black text-slate-900 tracking-tight mb-8 shadow-md">3</div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Get Funded</h3>
              <p className="text-slate-500 text-lg px-4">Access cash or finance purchases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">Whatever life throws at you, we're here.</h2>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/6/onboarding" className="inline-flex items-center gap-3 font-bold text-xl text-blue-600 hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">New Laptops</span>
               </div>
               <span className="text-slate-500 font-medium">Spread the cost</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">Solar Batteries</span>
               </div>
               <span className="text-slate-500 font-medium">Light up your home</span>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">School Fees</span>
               </div>
               <span className="text-slate-500 font-medium">Keep the kids in class</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-white py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-slate-500">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">Grow your loan book safely.</h2>
            <p className="text-slate-500 text-xl leading-relaxed mb-12">Are you a lender tired of high NPLs? CreditGo gives you access to a marketplace of users who have proven their intent and ability to repay through alternative data analysis.</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-slate-900 tracking-tight hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tight mb-12 leading-tight tracking-tight">Join thousands building better credit.</h2>
           <Link href="/6/onboarding" className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] rounded-full border border-blue-500 inline-block px-14 py-6 text-2xl font-black transition-transform">
              Get Your Score
           </Link>
         </div>
      </section>
    </div>
  );
}
