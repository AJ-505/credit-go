import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#EAE8E3] text-[#111111] flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-[#111] font-black uppercase tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/7/onboarding" className="border-[3px] border-[#111] font-black rounded-none hover:bg-[#111] hover:text-[#EAE8E3] px-8 py-2.5 uppercase tracking-widest transition-all">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          NO MORE PAPERWORK. NO MORE MIDDLEMEN.
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] text-[#111] font-black uppercase tracking-tighter">
          DATA IS CAPITAL. USE YOURS.
        </h1>
        
        <p className="text-[#444] font-medium max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          You generate valuable financial data every day. Stop giving it away for free. Aggregate it here to prove your creditworthiness and force lenders to give you the rates you deserve.
        </p>
        
        <Link href="/7/onboarding" className="bg-[#FF3E00] text-white hover:bg-[#CC3200] rounded-none border-[3px] border-[#111] uppercase tracking-widest font-black shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:translate-y-1 hover:translate-x-1 transition-all inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          INITIATE NOW
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="bg-[#F5F4F0] border-t-[3px] border-[#111] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#111] font-black uppercase tracking-tighter mb-8 leading-tight">
            THE SYSTEM IS FINALLY FAIR.
          </h2>
          <p className="text-xl md:text-2xl text-[#444] font-medium leading-relaxed">
            The old credit system is broken. We securely aggregate your real-world financial behavior into a single, undeniable metric. Prove your worth. Access better capital.
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#FF3E00] font-black">RADICAL PRIVACY</div>
              <h3 className="text-3xl md:text-5xl font-bold text-[#111] font-black uppercase tracking-tighter mb-6 leading-tight">WE PROTECT YOUR LEVERAGE.</h3>
              <p className="text-lg md:text-xl text-[#444] font-medium leading-relaxed">We don't sell your data to marketers. We use encrypted hashes to verify your cash flow strictly for credit underwriting. You remain completely in control of who sees what.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#FF3E00] font-black">THE UPWARD SPIRAL</div>
              <h3 className="text-3xl md:text-5xl font-bold text-[#111] font-black uppercase tracking-tighter mb-6 leading-tight">FORCE LENDERS TO COMPETE FOR YOU.</h3>
              <p className="text-lg md:text-xl text-[#444] font-medium leading-relaxed">Lenders respect one thing: proof. Repay your active balances and watch your financing limits aggressively expand week by week. You set the terms by being reliable.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-[#FF3E00] font-black">THE MASTER RECORD</div>
              <h3 className="text-3xl md:text-5xl font-bold text-[#111] font-black uppercase tracking-tighter mb-6 leading-tight">YOUR UNDENIABLE FINANCIAL IDENTITY.</h3>
              <p className="text-lg md:text-xl text-[#444] font-medium leading-relaxed">Stop submitting 6 months of bank statements to every new app. One verified digital identity unlocks the entire lending ecosystem instantly.</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="bg-[#F5F4F0] border-t-[3px] border-[#111] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-[#111] font-black uppercase tracking-tighter mb-6">HOW TO COMMAND CAPITAL.</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-black/20">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-white text-black font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Authenticate</h3>
                <p className="text-gray-600 font-medium">Provide secure read-access to your financial nodes.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-[#ff3366] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Compile</h3>
                <p className="text-gray-600 font-medium">Our system generates your algorithmic trust metric.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-[#00cc99] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Execute</h3>
                <p className="text-gray-600 font-medium">Route approved capital to your designated endpoints.</p>
              </div>
            </div>

          </div></div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#111] font-black uppercase tracking-tighter mb-8 leading-tight">PROCURE ASSETS. DEFER PAYMENTS.</h2>
            <p className="text-[#444] font-medium text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/7/onboarding" className="inline-flex items-center gap-3 font-bold text-xl text-[#FF3E00] font-black hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold text-[#111] font-black uppercase tracking-tighter">HARDWARE</span>
               </div>
               <span className="text-[#444] font-medium font-medium">MacBooks / PCs</span>
            </div>
            <div className="bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold text-[#111] font-black uppercase tracking-tighter">INFRASTRUCTURE</span>
               </div>
               <span className="text-[#444] font-medium font-medium">Solar / Inverters</span>
            </div>
            <div className="bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold text-[#111] font-black uppercase tracking-tighter">EDUCATION</span>
               </div>
               <span className="text-[#444] font-medium font-medium">Tuition / Certifications</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="bg-[#F5F4F0] border-t-[3px] border-[#111] py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 text-[#444] font-medium">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111] font-black uppercase tracking-tighter mb-8 leading-tight">UNDERWRITE WITH MATHEMATICS.</h2>
            <p className="text-[#444] font-medium text-xl leading-relaxed mb-12">Discard legacy credit bureau reports that exclude the informal sector. We provide real-time trust scoring based on active cash flow and utility payments.</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold text-[#111] font-black uppercase tracking-tighter hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#111] font-black uppercase tracking-tighter mb-12 leading-tight tracking-tight">TAKE CONTROL OF YOUR FINANCES.</h2>
           <Link href="/7/onboarding" className="bg-[#FF3E00] text-white hover:bg-[#CC3200] rounded-none border-[3px] border-[#111] uppercase tracking-widest font-black shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:translate-y-1 hover:translate-x-1 transition-all inline-block px-14 py-6 text-2xl font-black transition-transform">
              INITIATE NOW
           </Link>
         </div>
      </section>
    </div>
  );
}
