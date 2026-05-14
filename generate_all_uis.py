import os
import shutil

# Clean up existing routes 1-10
for i in range(1, 11):
    path = f"src/app/{i}"
    if os.path.exists(path):
        shutil.rmtree(path)

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# --- UNIQUE CONTENT PER THEME ---
THEMES = {
    "1": { # OpenClaw Dark/Red (Rebel, disruptive)
        "name": "OpenClaw Red", "mode": "dark",
        "bg": "bg-[#09090b] text-white", "nav_btn": "text-white hover:text-red-400 font-bold",
        "hero_bg": '<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>',
        "primary_btn_class": "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full",
        "card": "bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl",
        "input": "bg-[#1a1a1e] border-white/10 focus:border-red-500/50 text-white rounded-xl",
        "role_card": "bg-[#1a1a1e] border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-2xl",
        "section_bg": "bg-[#111113]", "text_muted": "text-stone-400", "text_heading": "text-white",
        
        # Unique Copy
        "hero_title": "Credit that scales with your ambition.",
        "hero_subtitle": "Turn your everyday payments into financial power. We securely analyze your digital footprint to unlock better loan terms every time you pay on time. No surveillance, just smart trust.",
        "btn_text": "Claim Your Score",
        "f1_title": "Privacy-First Analytics", "f1_desc": "Your data never leaves the vault. We securely connect to your accounts just to extract the trust.",
        "f2_title": "The Repayment Multiplier", "f2_desc": "Clear your balance, watch your limit grow. Good habits are instantly rewarded with premium tiers.",
        "f3_title": "One Unified Identity", "f3_desc": "No more fragmented histories. Your entire financial life consolidated into one undeniable score."
    },
    "2": { # T3 Monochrome Grid (Infrastructure, dev-focused)
        "name": "T3 Grid", "mode": "dark",
        "bg": "bg-[#0a0a0a] text-white", "nav_btn": "bg-white text-black font-bold rounded hover:bg-gray-200 px-4 py-2",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-lg",
        "card": "bg-black border border-[#222] rounded-lg shadow-2xl",
        "input": "bg-[#111] border-[#333] focus:border-white text-white rounded-lg font-mono",
        "role_card": "bg-[#111] border-[#222] hover:border-white rounded-lg",
        "section_bg": "bg-black border-t border-[#222]", "text_muted": "text-[#888]", "text_heading": "text-white",

        # Unique Copy
        "hero_title": "The unified protocol for personal credit.",
        "hero_subtitle": "Consolidate your financial history into a single, portable trust score. Private by design. Unlock premium financing tiers dynamically as you build your repayment streak.",
        "btn_text": "Initialize Profile",
        "f1_title": "Data Aggregation", "f1_desc": "Safely map your transaction nodes. We process the metadata locally to ensure zero privacy leaks.",
        "f2_title": "Dynamic Limits", "f2_desc": "Your borrowing capacity isn't static. It auto-scales upward upon successful mandate fulfillments.",
        "f3_title": "Global Consolidation", "f3_desc": "One system for all your finances. Bridge your fiat, mobile money, and salary endpoints seamlessly."
    },
    "3": { # CodeRabbit Gray/Orange (Analytical)
        "name": "Rabbit Tech", "mode": "dark",
        "bg": "bg-[#0d1117] text-gray-200", "nav_btn": "border border-gray-600 rounded hover:border-gray-400 text-sm font-semibold px-4 py-2",
        "hero_bg": '<div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff7b72] to-amber-500"></div>',
        "primary_btn_class": "bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)]",
        "card": "bg-[#161b22] border border-gray-800 rounded-lg shadow-xl",
        "input": "bg-[#0d1117] border-gray-800 focus:border-[#ff7b72] text-white rounded",
        "role_card": "bg-[#0d1117] border-gray-800 hover:border-[#ff7b72] rounded",
        "section_bg": "bg-[#0d1117] border-t border-gray-800", "text_muted": "text-gray-400", "text_heading": "text-white",

        # Unique Copy
        "hero_title": "Smart scoring for smarter borrowing.",
        "hero_subtitle": "Stop guessing your limits. Our engine safely reads your transaction habits to offer loans you can actually afford—growing your capacity safely with every repayment.",
        "btn_text": "Analyze My Score",
        "f1_title": "Secure Read-Only Access", "f1_desc": "We evaluate your financial footprint without ever touching your funds. 100% read-only, 100% secure.",
        "f2_title": "Automated Progression", "f2_desc": "Hit your payment milestones and the system automatically unlocks lower rates and higher limits.",
        "f3_title": "Holistic Dashboard", "f3_desc": "View your entire financial trajectory in one place. Understand exactly what impacts your trust score."
    },
    "4": { # Dropbox Pure Black/Blue (Bold, simple)
        "name": "DropBox Bold", "mode": "dark",
        "bg": "bg-black text-white", "nav_btn": "bg-white text-black font-semibold rounded-full hover:bg-gray-200 px-5 py-2.5",
        "hero_bg": '',
        "primary_btn_class": "bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full",
        "card": "bg-[#111] p-8",
        "input": "bg-transparent border-b-2 border-gray-800 focus:border-[#0061FE] text-white text-xl rounded-none",
        "role_card": "bg-[#111] border border-transparent hover:border-[#0061FE] rounded-[2rem]",
        "section_bg": "bg-[#0a0a0a]", "text_muted": "text-gray-400", "text_heading": "text-white",

        # Unique Copy
        "hero_title": "Borrow. Repay. Level up.",
        "hero_subtitle": "One platform to rule your financial life. We securely connect the dots of your everyday spending to give you a fair score, opening doors to top-tier lenders without the hassle.",
        "btn_text": "Get Started",
        "f1_title": "Safe Connections", "f1_desc": "Link your bank and mobile money securely. We use bank-grade encryption to protect your privacy.",
        "f2_title": "Climb the Ladder", "f2_desc": "Start small, dream big. Every on-time payment automatically bumps your tier and lowers your interest.",
        "f3_title": "Everything in Sync", "f3_desc": "Finally, a single home for your financial reputation. One score that lenders universally trust."
    },
    "5": { # Aceternity Glow (Glass, luxury)
        "name": "Aceter Glow", "mode": "dark",
        "bg": "bg-black text-white", "nav_btn": "border border-white/20 rounded-md hover:bg-white/10 px-4 py-1.5",
        "hero_bg": '<div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)]",
        "card": "bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl",
        "input": "bg-transparent border-white/10 focus:border-white/40 text-white rounded-md",
        "role_card": "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05] rounded-lg",
        "section_bg": "bg-black border-t border-white/10", "text_muted": "text-gray-500", "text_heading": "text-white",

        # Unique Copy
        "hero_title": "Invisible data. Visible freedom.",
        "hero_subtitle": "A new standard for trust. We privately synthesize your payment history to unlock a credit profile that rewards your reliability with continuously better rates.",
        "btn_text": "Unlock Access",
        "f1_title": "Synthesized Trust", "f1_desc": "We run complex models on your transaction metadata locally, meaning your sensitive data stays yours.",
        "f2_title": "Rewarding Reliability", "f2_desc": "Consistency pays. Watch your borrowing power expand algorithmically as you clear your obligations.",
        "f3_title": "Unified Ecosystem", "f3_desc": "All your accounts acting in harmony to vouch for you. One sophisticated system, boundless opportunities."
    },

    # --- LIGHT MODES ---
    "6": { # Clean Fintech (Neumorphic)
        "name": "Clean Fintech", "mode": "light",
        "bg": "bg-[#f8fafc] text-slate-900", "nav_btn": "bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 px-5 py-2",
        "hero_bg": '<div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>',
        "primary_btn_class": "bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30",
        "card": "bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        "input": "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 rounded-xl",
        "role_card": "bg-white border-slate-200 hover:border-blue-500 hover:shadow-md rounded-2xl",
        "section_bg": "bg-white", "text_muted": "text-slate-500", "text_heading": "text-slate-900",

        # Unique Copy
        "hero_title": "Good habits deserve great credit.",
        "hero_subtitle": "Your everyday transactions tell a story of reliability. We help you securely use that story to access safe loans, stepping up to bigger amounts as you pay them back.",
        "btn_text": "Get Your Score",
        "f1_title": "Bank-Grade Security", "f1_desc": "We connect with your banks via secure tokens. We can't see your passwords, and we never share your data.",
        "f2_title": "Grow Together", "f2_desc": "Pay back a small loan today, unlock a bigger one tomorrow. We actively reward your good behavior.",
        "f3_title": "All-in-One Finance", "f3_desc": "Link your salary account, your side-hustle wallet, and your bills. We calculate the big picture."
    },
    "7": { # Brutalist Editorial
        "name": "Brutalist Editorial", "mode": "light",
        "bg": "bg-[#f4f4f0] text-[#111]", "nav_btn": "border-2 border-[#111] font-bold rounded-none hover:bg-[#111] hover:text-[#f4f4f0] px-6 py-2 uppercase tracking-wide",
        "hero_bg": '',
        "primary_btn_class": "bg-[#FF4F00] text-white hover:bg-[#e64600] rounded-none border-2 border-[#111] uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all",
        "card": "bg-white border-4 border-[#111] rounded-none shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]",
        "input": "bg-white border-2 border-[#111] focus:border-[#FF4F00] text-[#111] rounded-none font-mono p-4",
        "role_card": "bg-[#f4f4f0] border-2 border-[#111] hover:bg-[#FF4F00] hover:text-white rounded-none",
        "section_bg": "bg-white border-t-4 border-[#111]", "text_muted": "text-[#555]", "text_heading": "text-[#111]",

        # Unique Copy
        "hero_title": "OWN YOUR TRUST SCORE.",
        "hero_subtitle": "The old credit system is broken. We securely aggregate your real-world financial behavior into a single, undeniable metric. Prove your worth. Access better capital.",
        "btn_text": "INITIATE NOW",
        "f1_title": "RADICAL PRIVACY", "f1_desc": "We don't sell your data. We use encrypted hashes to verify your cash flow. You remain completely in control.",
        "f2_title": "THE UPWARD SPIRAL", "f2_desc": "Lenders respect proof. Repay your active balances and watch your financing limits aggressively expand.",
        "f3_title": "THE MASTER RECORD", "f3_desc": "Stop submitting paper statements. One verified digital identity unlocks the entire lending ecosystem."
    },
    "8": { # Playful Pop
        "name": "Playful Pop", "mode": "light",
        "bg": "bg-[#fff9e6] text-[#0f172a]", "nav_btn": "bg-[#8b5cf6] text-white font-bold rounded-xl hover:bg-[#7c3aed] px-6 py-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
        "hero_bg": '<div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full border-4 border-slate-900 -z-10"></div><div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-400 rounded-lg rotate-12 border-4 border-slate-900 -z-10"></div>',
        "primary_btn_class": "bg-[#10b981] text-slate-900 font-black hover:bg-[#059669] rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1 transition-all text-xl",
        "card": "bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
        "input": "bg-[#f8fafc] border-4 border-slate-200 focus:border-[#8b5cf6] text-slate-900 rounded-xl font-bold p-4",
        "role_card": "bg-white border-4 border-slate-200 hover:border-slate-900 rounded-2xl",
        "section_bg": "bg-[#e0e7ff] border-t-4 border-slate-900", "text_muted": "text-slate-600", "text_heading": "text-slate-900",

        # Unique Copy
        "hero_title": "Level up your borrowing power! 🚀",
        "hero_subtitle": "Why settle for bad loans? Safely link your accounts, get your personalized trust score, and unlock bigger, better loan offers every time you clear a balance.",
        "btn_text": "Let's Go!",
        "f1_title": "Super Safe & Secure 🔒", "f1_desc": "Your info is locked in a digital vault. We only use it to prove to lenders that you're awesome.",
        "f2_title": "Unlock New Tiers 📈", "f2_desc": "Treat your credit like a game. Pay on time, earn XP, and unlock massive lending limits!",
        "f3_title": "All Your Money in One Place 💰", "f3_desc": "We connect your banks, wallets, and apps so you have one epic score that everyone trusts."
    },
    "9": { # Enterprise Trust
        "name": "Enterprise Trust", "mode": "light",
        "bg": "bg-gray-50 text-gray-900", "nav_btn": "text-indigo-600 font-semibold hover:text-indigo-800",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>',
        "primary_btn_class": "bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-sm font-medium",
        "card": "bg-white border border-gray-200 rounded-xl shadow-lg",
        "input": "bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 rounded-md shadow-sm",
        "role_card": "bg-white border-gray-200 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow",
        "section_bg": "bg-white border-t border-gray-200", "text_muted": "text-gray-500", "text_heading": "text-gray-900",

        # Unique Copy
        "hero_title": "Comprehensive credit intelligence.",
        "hero_subtitle": "A secure, unified view of your financial health. By safely evaluating your transaction patterns, we connect you with premium lenders and reward consistent repayment.",
        "btn_text": "Create Account",
        "f1_title": "NDPR Compliant Parsing", "f1_desc": "Your financial data is processed in isolated, encrypted containers to ensure maximum compliance and security.",
        "f2_title": "Tiered Limit Expansion", "f2_desc": "Our algorithms automatically negotiate higher credit limits and reduced APYs upon consecutive mandate settlements.",
        "f3_title": "Unified Data Infrastructure", "f3_desc": "Seamlessly integrate your payroll, corporate accounts, and tax records into one actionable trust metric."
    },
    "10": { # Minimalist Zen
        "name": "Zen Minimal", "mode": "light",
        "bg": "bg-white text-black", "nav_btn": "text-black hover:opacity-50 text-sm tracking-widest uppercase font-medium",
        "hero_bg": '',
        "primary_btn_class": "bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8",
        "card": "bg-white border-0 shadow-[0_0_50px_rgba(0,0,0,0.05)] rounded-3xl",
        "input": "bg-[#f5f5f7] border-transparent focus:border-black focus:bg-white text-black rounded-2xl px-5 py-4 transition-colors",
        "role_card": "bg-[#f5f5f7] border-transparent hover:bg-black hover:text-white rounded-2xl transition-colors duration-300",
        "section_bg": "bg-[#fcfcfc]", "text_muted": "text-gray-500", "text_heading": "text-black",

        # Unique Copy
        "hero_title": "Simply better credit.",
        "hero_subtitle": "Your financial life, beautifully consolidated. We use a privacy-first approach to understand your habits, ensuring your good behavior translates directly into superior loan access.",
        "btn_text": "Begin",
        "f1_title": "Designed for Privacy", "f1_desc": "We believe your data is yours. We only access the patterns necessary to build your trust score.",
        "f2_title": "Effortless Growth", "f2_desc": "Borrow. Repay. Expand. The system naturally adapts to give you more freedom as you prove reliability.",
        "f3_title": "A Single Truth", "f3_desc": "Leave the fragmented systems behind. One elegant score that speaks for your entire financial capability."
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
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold {text_heading} mb-6">Built to connect, not to gatekeep.</h2>
          <p className="{text_muted} text-lg leading-relaxed">
            By unifying your fragmented financial history securely, CreditGo acts as the ultimate bridge. Borrowers unlock fair capital with ascending limits, while our 100+ partner lenders access verified, high-trust individuals without the risk.
          </p>
        </div>
      </section>
    </div>
  );
}
"""

ROLE_SELECT = """
import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="min-h-screen {bg} p-6 font-sans">
      <div className="{card} max-w-3xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/{id}" className="{text_muted} hover:opacity-70 mb-6 inline-block text-sm font-medium">← Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold {text_heading} mb-3">How do you earn?</h1>
          <p className="{text_muted}">We customize your profiling to ensure the most accurate trust score.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/{id}/onboarding/freelancer" className="block h-full">
            <div className="{role_card} p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="font-bold {text_heading} mb-2 text-lg">Freelancer</h3>
              <p className="{text_muted} text-sm">Independent creator or gig worker</p>
            </div>
          </Link>
          
          <Link href="/{id}/onboarding/worker" className="block h-full">
            <div className="{role_card} p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="font-bold {text_heading} mb-2 text-lg">Corporate</h3>
              <p className="{text_muted} text-sm">Full-time employee at a registered company</p>
            </div>
          </Link>

          <Link href="/{id}/onboarding/government" className="block h-full">
            <div className="{role_card} p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
              <h3 className="font-bold {text_heading} mb-2 text-lg">Government</h3>
              <p className="{text_muted} text-sm">Public sector or civil service employee</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
"""

FORM = """
import Link from 'next/link';

export default function OnboardingForm() {
  return (
    <div className="min-h-screen {bg} p-6 font-sans">
      <div className="{card} max-w-2xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/{id}/onboarding" className="{text_muted} hover:opacity-70 mb-6 inline-block text-sm font-medium">← Back</Link>
          <h1 className="text-3xl font-bold {text_heading} mb-3">{role_name} Profile</h1>
          <p className="{text_muted}">Securely provide your details to calculate your initial score.</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold {text_muted} block mb-2">Legal Full Name</label>
              <input type="text" placeholder="John Doe" className="{input} w-full p-3 border outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold {text_muted} block mb-2">BVN (Encrypted)</label>
              <input type="text" placeholder="22*********" className="{input} w-full p-3 border outline-none transition-all" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-bold {text_muted} block mb-2">{field_2_label}</label>
            <input type="text" placeholder="{field_2_ph}" className="{input} w-full p-3 border outline-none transition-all" />
          </div>

          <div className="p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <h3 className="font-bold {text_heading} mb-2">Connect Financial History</h3>
            <p className="{text_muted} text-sm mb-4">Privately link your transaction history. We only extract the necessary trust signals to build your score.</p>
            <button type="button" className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md text-sm transition-opacity hover:opacity-80">
              Link via Open Banking
            </button>
          </div>

          <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-8 text-center transition-colors cursor-pointer hover:border-emerald-500 bg-transparent">
            <div className="text-3xl mb-3 opacity-80">📄</div>
            <p className="font-medium {text_heading}">Upload {doc_req}</p>
            <p className="text-sm {text_muted} mt-1">PDF or Image (Max 5MB)</p>
          </div>

          <Link href="/{id}/dashboard" className="block pt-6">
            <button type="button" className="{primary_btn_class} w-full py-4 text-lg font-bold transition-all text-center">
              Generate Trust Score
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
"""

DASHBOARD = """
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen {bg} p-6 font-sans flex items-center justify-center">
      <div className="{card} w-full max-w-4xl p-8 md:p-12">
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Score Column */}
          <div className="md:w-1/3 text-center border-r border-black/10 dark:border-white/10 pr-0 md:pr-12">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-xl font-bold {text_heading} mb-2">Trust Score</h2>
            <p className="{text_muted} text-sm mb-8">AI-Synthesized Profile</p>
            
            <div className="inline-block p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full">
              <p className="text-5xl font-black {text_heading}">785</p>
              <p className="text-emerald-500 font-bold mt-3 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Excellent Profile
              </p>
            </div>
          </div>
          
          {/* Details Column */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold {text_heading} mb-3">Welcome to CreditGo.</h1>
            <p className="{text_muted} mb-10 leading-relaxed">Your financial footprint has been securely analyzed. By maintaining your positive repayment habits, these limits will automatically scale upward.</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <p className="{text_muted} text-xs font-bold uppercase tracking-wider mb-2">Available Capacity</p>
                <p className="text-2xl font-bold {text_heading}">₦250,000</p>
              </div>
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <p className="{text_muted} text-xs font-bold uppercase tracking-wider mb-2">Current Tier</p>
                <p className="text-2xl font-bold {text_heading}">Tier 1 (Premium)</p>
              </div>
            </div>

            <h3 className="font-bold {text_heading} mb-4 text-lg">Curated Opportunities</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 dark:border-white/10">
                <span className="font-medium {text_heading}">💻 Equipment Financing (0% down)</span>
                <button className="text-emerald-500 font-bold text-sm hover:underline">Apply</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 dark:border-white/10">
                <span className="font-medium {text_heading}">☀️ Solar Installment Plan</span>
                <button className="text-emerald-500 font-bold text-sm hover:underline">Apply</button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 text-right">
               <Link href="/{id}" className="{text_muted} hover:opacity-70 font-medium text-sm">Return to Home</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
"""

for tid, t in THEMES.items():
    def apply_theme(template):
        res = template
        for k, v in t.items():
            res = res.replace("{" + k + "}", str(v))
        res = res.replace("{id}", tid)
        return res
    
    write_file(f"src/app/{tid}/page.tsx", apply_theme(LANDING_TEMPLATE))
    write_file(f"src/app/{tid}/onboarding/page.tsx", apply_theme(ROLE_SELECT))
    
    f_form = apply_theme(FORM).replace("{role_name}", "Freelancer").replace("{field_2_label}", "Primary Skill / Profession").replace("{field_2_ph}", "e.g. Graphic Designer").replace("{doc_req}", "Utility Bill or Bank Statement")
    write_file(f"src/app/{tid}/onboarding/freelancer/page.tsx", f_form)
    
    w_form = apply_theme(FORM).replace("{role_name}", "Corporate Worker").replace("{field_2_label}", "Employer Name").replace("{field_2_ph}", "e.g. Paystack").replace("{doc_req}", "Employment Letter & Payslip")
    write_file(f"src/app/{tid}/onboarding/worker/page.tsx", w_form)

    g_form = apply_theme(FORM).replace("{role_name}", "Government Worker").replace("{field_2_label}", "Agency / MDA Name").replace("{field_2_ph}", "e.g. Ministry of Finance").replace("{doc_req}", "Government ID & Posting Letter")
    write_file(f"src/app/{tid}/onboarding/government/page.tsx", g_form)

    write_file(f"src/app/{tid}/dashboard/page.tsx", apply_theme(DASHBOARD))

print("SUCCESS: 10 absolutely unique content variations built.")
