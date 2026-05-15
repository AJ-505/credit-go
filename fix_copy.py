import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

THEMES = {
    "1": { 
        "name": "OpenClaw Red", "mode": "dark", "bg": "bg-[#09090b] text-white", "nav_btn": "text-white hover:text-red-400 font-bold",
        "hero_bg": '<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>',
        "primary_btn_class": "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full",
        "card": "bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl",
        "input": "bg-[#1a1a1e] border-white/10 focus:border-red-500/50 text-white rounded-xl",
        "role_card": "bg-[#1a1a1e] border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-2xl",
        "section_bg": "bg-[#111113]", "text_muted": "text-stone-400", "text_heading": "text-white",
        
        "hero_title": "Credit that scales with your ambition.",
        "hero_subtitle": "Turn your everyday payments into financial power. We securely analyze your digital footprint to unlock better loan terms every time you pay on time. No surveillance, just smart trust.",
        "btn_text": "Claim Your Score",
        "f1_title": "Privacy-First Analytics", "f1_desc": "Your data never leaves the vault. We securely connect to your accounts just to extract the trust.",
        "f2_title": "The Repayment Multiplier", "f2_desc": "Clear your balance, watch your limit grow. Good habits are instantly rewarded with premium tiers.",
        "f3_title": "One Unified Identity", "f3_desc": "No more fragmented histories. Your entire financial life consolidated into one undeniable score.",
        
        "bottom_title": "Get exactly what you need, exactly when you need it.",
        "bottom_desc": "Don't let a temporary cash crunch stall your momentum. Rent devices, handle school fees, or go solar today. By paying back on your own terms, you prove your reliability and instantly unlock even better limits for tomorrow."
    },
    "2": { 
        "name": "T3 Grid", "mode": "dark", "bg": "bg-[#0a0a0a] text-white", "nav_btn": "bg-white text-black font-bold rounded hover:bg-gray-200 px-4 py-2",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-lg",
        "card": "bg-black border border-[#222] rounded-lg shadow-2xl",
        "input": "bg-[#111] border-[#333] focus:border-white text-white rounded-lg font-mono",
        "role_card": "bg-[#111] border-[#222] hover:border-white rounded-lg",
        "section_bg": "bg-black border-t border-[#222]", "text_muted": "text-[#888]", "text_heading": "text-white",

        "hero_title": "The unified protocol for personal credit.",
        "hero_subtitle": "Consolidate your financial history into a single, portable trust score. Private by design. Unlock premium financing tiers dynamically as you build your repayment streak.",
        "btn_text": "Initialize Profile",
        "f1_title": "Data Aggregation", "f1_desc": "Safely map your transaction nodes. We process the metadata locally to ensure zero privacy leaks.",
        "f2_title": "Dynamic Limits", "f2_desc": "Your borrowing capacity isn't static. It auto-scales upward upon successful mandate fulfillments.",
        "f3_title": "Global Consolidation", "f3_desc": "One system for all your finances. Bridge your fiat, mobile money, and salary endpoints seamlessly.",

        "bottom_title": "One system. All your finances.",
        "bottom_desc": "We map the fragmented data points of your financial life into a single, highly trustworthy profile. It's not about tracking you—it's about mathematically proving your capacity to top-tier lenders so you get the best rates possible."
    },
    "3": { 
        "name": "Rabbit Tech", "mode": "dark", "bg": "bg-[#0d1117] text-gray-200", "nav_btn": "border border-gray-600 rounded hover:border-gray-400 text-sm font-semibold px-4 py-2",
        "hero_bg": '<div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff7b72] to-amber-500"></div>',
        "primary_btn_class": "bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)]",
        "card": "bg-[#161b22] border border-gray-800 rounded-lg shadow-xl",
        "input": "bg-[#0d1117] border-gray-800 focus:border-[#ff7b72] text-white rounded",
        "role_card": "bg-[#0d1117] border-gray-800 hover:border-[#ff7b72] rounded",
        "section_bg": "bg-[#0d1117] border-t border-gray-800", "text_muted": "text-gray-400", "text_heading": "text-white",

        "hero_title": "Smart scoring for smarter borrowing.",
        "hero_subtitle": "Stop guessing your limits. Our engine safely reads your transaction habits to offer loans you can actually afford—growing your capacity safely with every repayment.",
        "btn_text": "Analyze My Score",
        "f1_title": "Secure Read-Only Access", "f1_desc": "We evaluate your financial footprint without ever touching your funds. 100% read-only, 100% secure.",
        "f2_title": "Automated Progression", "f2_desc": "Hit your payment milestones and the system automatically unlocks lower rates and higher limits.",
        "f3_title": "Holistic Dashboard", "f3_desc": "View your entire financial trajectory in one place. Understand exactly what impacts your trust score.",

        "bottom_title": "Pay back. Get better loans. Repeat.",
        "bottom_desc": "It's a simple equation. We use alternative data to get you through the door safely. As you clear your balances, our system automatically recalibrates your trust score, continuously upgrading you to premium lender tiers."
    },
    "4": { 
        "name": "DropBox Bold", "mode": "dark", "bg": "bg-black text-white", "nav_btn": "bg-white text-black font-semibold rounded-full hover:bg-gray-200 px-5 py-2.5",
        "hero_bg": '',
        "primary_btn_class": "bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full",
        "card": "bg-[#111] p-8",
        "input": "bg-transparent border-b-2 border-gray-800 focus:border-[#0061FE] text-white text-xl rounded-none",
        "role_card": "bg-[#111] border border-transparent hover:border-[#0061FE] rounded-[2rem]",
        "section_bg": "bg-[#0a0a0a]", "text_muted": "text-gray-400", "text_heading": "text-white",

        "hero_title": "Borrow. Repay. Level up.",
        "hero_subtitle": "One platform to rule your financial life. We securely connect the dots of your everyday spending to give you a fair score, opening doors to top-tier lenders without the hassle.",
        "btn_text": "Get Started",
        "f1_title": "Safe Connections", "f1_desc": "Link your bank and mobile money securely. We use bank-grade encryption to protect your privacy.",
        "f2_title": "Climb the Ladder", "f2_desc": "Start small, dream big. Every on-time payment automatically bumps your tier and lowers your interest.",
        "f3_title": "Everything in Sync", "f3_desc": "Finally, a single home for your financial reputation. One score that lenders universally trust.",

        "bottom_title": "Access funds without the friction.",
        "bottom_desc": "Need capital for a project or an emergency? We've got you covered. Get what you need, right now. As you establish a solid repayment history, we automatically drop your interest rates and expand your capacity."
    },
    "5": { 
        "name": "Aceter Glow", "mode": "dark", "bg": "bg-black text-white", "nav_btn": "border border-white/20 rounded-md hover:bg-white/10 px-4 py-1.5",
        "hero_bg": '<div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)]",
        "card": "bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl",
        "input": "bg-transparent border-white/10 focus:border-white/40 text-white rounded-md",
        "role_card": "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05] rounded-lg",
        "section_bg": "bg-black border-t border-white/10", "text_muted": "text-gray-500", "text_heading": "text-white",

        "hero_title": "Invisible data. Visible freedom.",
        "hero_subtitle": "A new standard for trust. We privately synthesize your payment history to unlock a credit profile that rewards your reliability with continuously better rates.",
        "btn_text": "Unlock Access",
        "f1_title": "Synthesized Trust", "f1_desc": "We run complex models on your transaction metadata locally, meaning your sensitive data stays yours.",
        "f2_title": "Rewarding Reliability", "f2_desc": "Consistency pays. Watch your borrowing power expand algorithmically as you clear your obligations.",
        "f3_title": "Unified Ecosystem", "f3_desc": "All your accounts acting in harmony to vouch for you. One sophisticated system, boundless opportunities.",

        "bottom_title": "Your financial footprint, finally working for you.",
        "bottom_desc": "By synthesizing a complete picture of your financial habits, we eliminate the guesswork for lenders. The result? You get instant access to capital when it matters most, governed by a score that actively rewards your consistency."
    },
    "6": { 
        "name": "Clean Fintech", "mode": "light", "bg": "bg-[#f8fafc] text-slate-900", "nav_btn": "bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 px-5 py-2",
        "hero_bg": '<div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>',
        "primary_btn_class": "bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30",
        "card": "bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        "input": "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 rounded-xl",
        "role_card": "bg-white border-slate-200 hover:border-blue-500 hover:shadow-md rounded-2xl",
        "section_bg": "bg-white", "text_muted": "text-slate-500", "text_heading": "text-slate-900",

        "hero_title": "Good habits deserve great credit.",
        "hero_subtitle": "Your everyday transactions tell a story of reliability. We help you securely use that story to access safe loans, stepping up to bigger amounts as you pay them back.",
        "btn_text": "Get Your Score",
        "f1_title": "Bank-Grade Security", "f1_desc": "We connect with your banks via secure tokens. We can't see your passwords, and we never share your data.",
        "f2_title": "Grow Together", "f2_desc": "Pay back a small loan today, unlock a bigger one tomorrow. We actively reward your good behavior.",
        "f3_title": "All-in-One Finance", "f3_desc": "Link your salary account, your side-hustle wallet, and your bills. We calculate the big picture.",

        "bottom_title": "Everything you need, whenever life happens.",
        "bottom_desc": "From a new laptop for work to installing solar panels at home—get it sorted today. We look at the big picture of your finances to offer a fair starting point, and we celebrate your on-time payments with access to bigger, better loans."
    },
    "7": { 
        "name": "Brutalist Editorial", "mode": "light", "bg": "bg-[#f4f4f0] text-[#111]", "nav_btn": "border-2 border-[#111] font-bold rounded-none hover:bg-[#111] hover:text-[#f4f4f0] px-6 py-2 uppercase tracking-wide",
        "hero_bg": '',
        "primary_btn_class": "bg-[#FF4F00] text-white hover:bg-[#e64600] rounded-none border-2 border-[#111] uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all",
        "card": "bg-white border-4 border-[#111] rounded-none shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]",
        "input": "bg-white border-2 border-[#111] focus:border-[#FF4F00] text-[#111] rounded-none font-mono p-4",
        "role_card": "bg-[#f4f4f0] border-2 border-[#111] hover:bg-[#FF4F00] hover:text-white rounded-none",
        "section_bg": "bg-white border-t-4 border-[#111]", "text_muted": "text-[#555]", "text_heading": "text-[#111]",

        "hero_title": "OWN YOUR TRUST SCORE.",
        "hero_subtitle": "The old credit system is broken. We securely aggregate your real-world financial behavior into a single, undeniable metric. Prove your worth. Access better capital.",
        "btn_text": "INITIATE NOW",
        "f1_title": "RADICAL PRIVACY", "f1_desc": "We don't sell your data. We use encrypted hashes to verify your cash flow. You remain completely in control.",
        "f2_title": "THE UPWARD SPIRAL", "f2_desc": "Lenders respect proof. Repay your active balances and watch your financing limits aggressively expand.",
        "f3_title": "THE MASTER RECORD", "f3_desc": "Stop submitting paper statements. One verified digital identity unlocks the entire lending ecosystem.",

        "bottom_title": "THE CYCLE OF TRUST.",
        "bottom_desc": "Pay back a loan, unlock a better one. It's that simple. We aggregate your financial data to give lenders undeniable proof of your reliability. You get total control over your borrowing power without predatory traps."
    },
    "8": { 
        "name": "Playful Pop", "mode": "light", "bg": "bg-[#fff9e6] text-[#0f172a]", "nav_btn": "bg-[#8b5cf6] text-white font-bold rounded-xl hover:bg-[#7c3aed] px-6 py-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
        "hero_bg": '<div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full border-4 border-slate-900 -z-10"></div><div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-400 rounded-lg rotate-12 border-4 border-slate-900 -z-10"></div>',
        "primary_btn_class": "bg-[#10b981] text-slate-900 font-black hover:bg-[#059669] rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1 transition-all text-xl",
        "card": "bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
        "input": "bg-[#f8fafc] border-4 border-slate-200 focus:border-[#8b5cf6] text-slate-900 rounded-xl font-bold p-4",
        "role_card": "bg-white border-4 border-slate-200 hover:border-slate-900 rounded-2xl",
        "section_bg": "bg-[#e0e7ff] border-t-4 border-slate-900", "text_muted": "text-slate-600", "text_heading": "text-slate-900",

        "hero_title": "Level up your borrowing power! 🚀",
        "hero_subtitle": "Why settle for bad loans? Safely link your accounts, get your personalized trust score, and unlock bigger, better loan offers every time you clear a balance.",
        "btn_text": "Let's Go!",
        "f1_title": "Super Safe & Secure 🔒", "f1_desc": "Your info is locked in a digital vault. We only use it to prove to lenders that you're awesome.",
        "f2_title": "Unlock New Tiers 📈", "f2_desc": "Treat your credit like a game. Pay on time, earn XP, and unlock massive lending limits!",
        "f3_title": "All Your Money in One Place 💰", "f3_desc": "We connect your banks, wallets, and apps so you have one epic score that everyone trusts.",

        "bottom_title": "Unlock life's upgrades instantly! ⚡",
        "bottom_desc": "Need a new phone? Have to sort out school fees? Grab what you need today. Every time you successfully pay back, our system levels up your trust score, granting you VIP access to our best lending partners."
    },
    "9": { 
        "name": "Enterprise Trust", "mode": "light", "bg": "bg-gray-50 text-gray-900", "nav_btn": "text-indigo-600 font-semibold hover:text-indigo-800",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>',
        "primary_btn_class": "bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-sm font-medium",
        "card": "bg-white border border-gray-200 rounded-xl shadow-lg",
        "input": "bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 rounded-md shadow-sm",
        "role_card": "bg-white border-gray-200 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow",
        "section_bg": "bg-white border-t border-gray-200", "text_muted": "text-gray-500", "text_heading": "text-gray-900",

        "hero_title": "Comprehensive credit intelligence.",
        "hero_subtitle": "A secure, unified view of your financial health. By safely evaluating your transaction patterns, we connect you with premium lenders and reward consistent repayment.",
        "btn_text": "Create Account",
        "f1_title": "NDPR Compliant Parsing", "f1_desc": "Your financial data is processed in isolated, encrypted containers to ensure maximum compliance and security.",
        "f2_title": "Tiered Limit Expansion", "f2_desc": "Our algorithms automatically negotiate higher credit limits and reduced APYs upon consecutive mandate settlements.",
        "f3_title": "Unified Data Infrastructure", "f3_desc": "Seamlessly integrate your payroll, corporate accounts, and tax records into one actionable trust metric.",

        "bottom_title": "A unified view of your financial health.",
        "bottom_desc": "By intelligently consolidating your fragmented accounts, we generate a highly accurate trust score. This secure approach guarantees that your consistent repayment history directly translates into expanded financial leverage and superior terms."
    },
    "10": { 
        "name": "Zen Minimal", "mode": "light", "bg": "bg-white text-black", "nav_btn": "text-black hover:opacity-50 text-sm tracking-widest uppercase font-medium",
        "hero_bg": '',
        "primary_btn_class": "bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8",
        "card": "bg-white border-0 shadow-[0_0_50px_rgba(0,0,0,0.05)] rounded-3xl",
        "input": "bg-[#f5f5f7] border-transparent focus:border-black focus:bg-white text-black rounded-2xl px-5 py-4 transition-colors",
        "role_card": "bg-[#f5f5f7] border-transparent hover:bg-black hover:text-white rounded-2xl transition-colors duration-300",
        "section_bg": "bg-[#fcfcfc]", "text_muted": "text-gray-500", "text_heading": "text-black",

        "hero_title": "Simply better credit.",
        "hero_subtitle": "Your financial life, beautifully consolidated. We use a privacy-first approach to understand your habits, ensuring your good behavior translates directly into superior loan access.",
        "btn_text": "Begin",
        "f1_title": "Designed for Privacy", "f1_desc": "We believe your data is yours. We only access the patterns necessary to build your trust score.",
        "f2_title": "Effortless Growth", "f2_desc": "Borrow. Repay. Expand. The system naturally adapts to give you more freedom as you prove reliability.",
        "f3_title": "A Single Truth", "f3_desc": "Leave the fragmented systems behind. One elegant score that speaks for your entire financial capability.",

        "bottom_title": "Access capital effortlessly.",
        "bottom_desc": "Procure what you need at the exact moment you need it. By respectfully analyzing your complete financial flow, we create a transparent profile that continually rewards your reliability with unparalleled loan offers."
    }
}

LANDING_TEMPLATE = """
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen {bg} flex flex-col font-sans relative overflow-x-hidden">
      {hero_bg}
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 {text_heading}">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/{id}/onboarding" className="{nav_btn}">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20 pb-32 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight mb-8 leading-[1.1] {text_heading}">
          {hero_title}
        </h1>
        
        <p className="{text_muted} max-w-3xl text-lg md:text-xl mb-12 leading-relaxed">
          {hero_subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link href="/{id}/onboarding" className="{primary_btn_class} px-8 py-4 text-lg transition-all flex items-center gap-2">
            {btn_text}
          </Link>
        </div>
      </main>

      {/* Value Props Section */}
      <section className="{section_bg} py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="{card} p-8 text-left">
              <div className="text-3xl mb-4 opacity-80">🔒</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f1_title}</h3>
              <p className="{text_muted} leading-relaxed">{f1_desc}</p>
            </div>
            <div className="{card} p-8 text-left">
              <div className="text-3xl mb-4 opacity-80">📈</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f2_title}</h3>
              <p className="{text_muted} leading-relaxed">{f2_desc}</p>
            </div>
            <div className="{card} p-8 text-left">
              <div className="text-3xl mb-4 opacity-80">🌐</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f3_title}</h3>
              <p className="{text_muted} leading-relaxed">{f3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lenders / Context Section */}
      <section className="py-24 relative z-10 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold {text_heading} mb-6">{bottom_title}</h2>
          <p className="{text_muted} text-lg leading-relaxed">
            {bottom_desc}
          </p>
        </div>
      </section>
    </div>
  );
}
"""

for tid, t in THEMES.items():
    res = LANDING_TEMPLATE
    for k, v in t.items():
        res = res.replace("{" + k + "}", str(v))
    res = res.replace("{id}", tid)
    write_file(f"src/app/{tid}/page.tsx", res)

print("Updated bottom copy successfully across all 10 files.")
