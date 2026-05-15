'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Landing() {
  const [view, setView] = useState<'borrower' | 'lender'>('borrower');

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-red-500/30">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-white/10 rounded-full p-1 flex items-center mr-4">
            <button 
              onClick={() => setView('borrower')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${view === 'borrower' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'}`}
            >
              For Earners
            </button>
            <button 
              onClick={() => setView('lender')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${view === 'lender' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'}`}
            >
              For Lenders
            </button>
          </div>
          <Link href="/onboarding" className="text-white hover:text-red-400 font-bold hidden md:block">Get Started</Link>
        </div>
      </nav>

      {view === 'borrower' ? (
        <>
          {/* Section 1: The Hero */}
          <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-sm font-medium mb-10 backdrop-blur-sm text-red-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              The No-Gree Credit Protocol
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
              Your Salary is a Tool,<br/> Not a Limit.
            </h1>
            
            <p className="text-stone-400 max-w-3xl text-xl md:text-2xl mb-6 leading-relaxed font-medium">
              Earning ₦300k to ₦1.5M but still "broke" by mid-month? It’s not your income; it’s your access.
            </p>
            <p className="text-stone-300 max-w-3xl text-lg md:text-xl mb-12 leading-relaxed font-medium">
              CreditGo gives you the leverage to own your life today and pay small-small as you earn. Stop living "Middle-Class Poverty."
            </p>
            
            <Link href="/onboarding" className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95">
              Check My Safe Limit
            </Link>
          </header>

          {/* Section 2: The Authority (Trust Bar) */}
          <section className="border-y border-white/5 bg-white/[0.02] py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm font-bold tracking-widest uppercase mb-8 text-stone-500">
                Backed by the heavyweights. Over 100+ Lenders deploying ₦150 Billion ($100M+) on CreditGo.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['Sycamore', 'UleHomes', 'Easybuy', 'CDCare', 'MyItura', 'Spleet', 'Sunking'].map((logo) => (
                  <span key={logo} className="text-xl md:text-2xl font-black tracking-tighter text-white">{logo}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: The Problem & The Pivot */}
          <section className="py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-red-500">The Problem</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Tired of "Quick Loans"?</h3>
                <p className="text-lg text-stone-400 leading-relaxed mb-8">
                  Sick of quick loans that end in 30% interest, harassment calls to your mother, and endless debt traps?
                </p>
              </div>
              <div className="bg-[#111113]/90 border border-red-500/20 rounded-[2rem] shadow-2xl backdrop-blur-xl p-10 md:p-12">
                <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-emerald-500">The CreditGo Pivot</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">We don't do "loans for consumption." We do Asset Financing.</h3>
                <p className="text-lg text-stone-300 leading-relaxed">
                  We help you pay for what actually moves the needle in your life, without the "sapa" that follows. Build assets, not anxiety.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Scenarios (The Three Pathways) */}
          <section className="bg-[#111113] py-32 relative z-10 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Designed for your reality.</h2>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Path 1 */}
                <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 hover:border-red-500/30 transition-all group">
                  <div className="text-4xl mb-6">💻</div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Freelancer</h3>
                  <p className="text-stone-500 text-sm font-bold tracking-widest uppercase mb-6">(The Tech Bro/SME)</p>
                  <div className="mb-6">
                    <span className="text-red-400 font-bold block mb-2">The Vibe:</span>
                    <p className="text-stone-400 italic">"Your USD gigs are coming in, but you need a MacBook Pro 16" now to finish a $5k project. You can't wait 3 months to save."</p>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block mb-2">The Fix:</span>
                    <p className="text-white font-medium">Get the laptop today. Your consistent daily income saves you into a higher credit tier.</p>
                  </div>
                </div>

                {/* Path 2 */}
                <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 hover:border-red-500/30 transition-all group">
                  <div className="text-4xl mb-6">🏠</div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Corporate Pro</h3>
                  <p className="text-stone-500 text-sm font-bold tracking-widest uppercase mb-6">(The 9-5er)</p>
                  <div className="mb-6">
                    <span className="text-red-400 font-bold block mb-2">The Vibe:</span>
                    <p className="text-stone-400 italic">"Landlord is knocking for ₦1.2M rent. If you pay it all once, you'll be eating '0-1-0' for months."</p>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block mb-2">The Fix:</span>
                    <p className="text-white font-medium">We pay the ₦1.2M. You pay back ₦100k monthly through our 'Save-to-Pay' vault. No stress, no shame.</p>
                  </div>
                </div>

                {/* Path 3 */}
                <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl p-8 hover:border-red-500/30 transition-all group">
                  <div className="text-4xl mb-6">🏛️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Govt Worker</h3>
                  <p className="text-stone-500 text-sm font-bold tracking-widest uppercase mb-6">(The Stable Hand)</p>
                  <div className="mb-6">
                    <span className="text-red-400 font-bold block mb-2">The Vibe:</span>
                    <p className="text-stone-400 italic">"School fees for the kids are due, but 'Allocations' are delayed. You need a steady hand."</p>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold block mb-2">The Fix:</span>
                    <p className="text-white font-medium">Access school fee financing instantly based on your grade level. Spread the cost until the next pay cycle.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: How It Works (The Engine) */}
          <section className="py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20 max-w-3xl mx-auto">
                <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 text-red-500">The Engine</div>
                <h2 className="text-4xl md:text-5xl font-black text-white">The Science of "Small-Small"</h2>
              </div>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                {[
                  { title: "Onboard", desc: "Fill a 2-minute form and connect your banks via secure API." },
                  { title: "The Safe Limit", desc: "Our AI analyzes your cash flow to give you a Safe Limit and a Trust Score. No over-borrowing." },
                  { title: "The Guide", desc: "Take a 60-second crash course on credit health and how to avoid the 'Debt Trap.'" },
                  { title: "1-Click Apply", desc: "Choose your asset (Solar, Rent, Device) and get approved instantly by 100+ lenders." },
                  { title: "The Save-to-Pay Ritual", desc: "Set up an automated 10% daily/weekly saving. As you save to pay, your Trust Score climbs." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start bg-[#111113]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-black text-xl border border-red-500/30">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-stone-400 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-12 bg-gradient-to-br from-red-900/40 to-black border border-red-500/30 rounded-2xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full"></div>
                  <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="text-red-500">⚡</span> The 10x Promise
                  </h4>
                  <p className="text-stone-300 text-lg leading-relaxed relative z-10">
                    <strong className="text-white">Fact:</strong> Users who maintain a 10% daily saving streak for 24 months unlock <strong className="text-emerald-400">10.3x more capital at 40% lower interest rates.</strong> We turn your discipline into your greatest asset.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: The Conclusion */}
          <section className="bg-[#111113] py-40 relative z-10 border-t border-white/5 text-center">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                Enough of "My income is not enough."
              </h2>
              <p className="text-2xl text-stone-400 mb-12 leading-relaxed">
                Move from survival mode to owner mode. Start living the life your salary actually deserves.
              </p>
              <Link href="/onboarding" className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
                Join 50,000+ Smart Earners
              </Link>
            </div>
          </section>
        </>
      ) : (
        /* LENDER VIEW */
        <div className="flex-1 flex flex-col justify-center">
          <header className="w-full px-6 py-32 max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm font-medium mb-10 backdrop-blur-sm text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              CreditGo Lender Network
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] text-white">
              90% Less Default. <br/>
              <span className="text-emerald-400">100% Better Leads.</span>
            </h1>
            
            <p className="text-stone-300 max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              Stop lending to "strangers." Lend to "Savers." We deliver Prime borrowers trained by our platform to manage their limits.
            </p>
            
            <button className="bg-white hover:bg-stone-200 text-black rounded-full inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 shadow-xl">
              Become a Partner
            </button>
          </header>

          <section className="py-20 relative z-10 max-w-6xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] p-8">
                <div className="text-3xl mb-4">👁️</div>
                <h3 className="text-xl font-bold text-white mb-4">The Behavioral Edge</h3>
                <p className="text-stone-400">We track how your borrowers save before they pay you. If their savings drop, you get an early warning signal.</p>
              </div>
              <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] p-8">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-xl font-bold text-white mb-4">Zero-Friction Reporting</h3>
                <p className="text-stone-400">Our infrastructure automatically blacklists defaulters across the industry. One default here means they are locked out everywhere.</p>
              </div>
              <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] p-8">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-white mb-4">Quality Over Quantity</h3>
                <p className="text-stone-400">We deliver "Prime" and "Near-Prime" borrowers who have already been "trained" by our platform's Save-to-Pay ritual.</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
