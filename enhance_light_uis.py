import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

THEMES = {
    # ---------------------------------------------------------
    # ENHANCED LIGHT MODES
    # ---------------------------------------------------------
    "6": { # Clean Fintech (Hyper-polished Monzo/Kuda style)
        "mode": "light", "bg": "bg-[#fafcff] text-[#0f172a]", "nav_btn": "bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 px-6 py-2.5 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]",
        "hero_bg": '<div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-[120px] opacity-80 pointer-events-none"></div><div className="absolute top-40 left-0 -ml-40 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-50 to-emerald-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>',
        "primary_btn": "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_30px_rgb(37,99,235,0.3)] rounded-full border border-blue-500",
        "card": "bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]",
        "section_bg": "bg-white", "text_muted": "text-slate-500", "text_heading": "text-slate-900 tracking-tight", "accent": "text-blue-600",

        "hero_title": "The fair way to get loans.",
        "hero_subtitle": "Forget predatory loan sharks. Connect your bank account, get a fair Trust Score based on how you handle your money, and access low-interest loans from verified lenders.",
        "btn_text": "Get Your Score",
        "social_text": "Regulated, secure, and entirely transparent.",
        
        "big_statement": "Good financial habits should pay off. Now they do.",
        "big_statement_sub": "Your everyday transactions tell a story of reliability. We help you securely use that story to access safe loans, stepping up to bigger amounts as you pay them back.",
        
        "f1_h": "Your data is locked down, your credit is unlocked.",
        "f1_t": "Bank-Grade Security",
        "f1_d": "We connect with your banks via secure Open Banking tokens. We cannot see your passwords, we cannot move your money without permission, and we never sell your data.",
        
        "f2_h": "Start small. Grow massive.",
        "f2_t": "Grow Together",
        "f2_d": "Start with a ₦20,000 limit. Pay it back on time, and your limit increases to ₦50,000 automatically. Keep going to unlock millions in low-interest credit.",
        
        "f3_h": "We look at the whole picture.",
        "f3_t": "All-in-One Finance",
        "f3_d": "Traditional banks only care about salary slips. We care about your side-hustle inflows, your consistent airtime purchases, and your utility payments.",
        
        "step_title": "Three steps to financial freedom.",
        "s1": "Secure Link", "s1_d": "Connect your bank app safely.",
        "s2": "Get Scored", "s2_d": "See your fair, data-driven limit.",
        "s3": "Get Funded", "s3_d": "Access cash or finance purchases.",
        
        "usecase_title": "Whatever life throws at you, we're here.",
        "uc1": "New Laptops", "uc1_d": "Spread the cost",
        "uc2": "Solar Batteries", "uc2_d": "Light up your home",
        "uc3": "School Fees", "uc3_d": "Keep the kids in class",
        
        "lender_title": "Grow your loan book safely.",
        "lender_desc": "Are you a lender tired of high NPLs? CreditGo gives you access to a marketplace of users who have proven their intent and ability to repay through alternative data analysis.",
        
        "bottom_cta": "Join thousands building better credit."
    },
    "7": { # Brutalist Editorial (High-end print, sharp lines, aggressive typography)
        "mode": "light", "bg": "bg-[#EAE8E3] text-[#111111]", "nav_btn": "border-[3px] border-[#111] font-black rounded-none hover:bg-[#111] hover:text-[#EAE8E3] px-8 py-2.5 uppercase tracking-widest transition-all",
        "hero_bg": '<div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none"></div>',
        "primary_btn": "bg-[#FF3E00] text-white hover:bg-[#CC3200] rounded-none border-[3px] border-[#111] uppercase tracking-widest font-black shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,17,17,1)] hover:translate-y-1 hover:translate-x-1 transition-all",
        "card": "bg-white border-[3px] border-[#111] rounded-none shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]",
        "section_bg": "bg-[#F5F4F0] border-t-[3px] border-[#111]", "text_muted": "text-[#444] font-medium", "text_heading": "text-[#111] font-black uppercase tracking-tighter", "accent": "text-[#FF3E00] font-black",

        "hero_title": "DATA IS CAPITAL. USE YOURS.",
        "hero_subtitle": "You generate valuable financial data every day. Stop giving it away for free. Aggregate it here to prove your creditworthiness and force lenders to give you the rates you deserve.",
        "btn_text": "INITIATE NOW",
        "social_text": "NO MORE PAPERWORK. NO MORE MIDDLEMEN.",
        
        "big_statement": "THE SYSTEM IS FINALLY FAIR.",
        "big_statement_sub": "The old credit system is broken. We securely aggregate your real-world financial behavior into a single, undeniable metric. Prove your worth. Access better capital.",
        
        "f1_h": "WE PROTECT YOUR LEVERAGE.",
        "f1_t": "RADICAL PRIVACY",
        "f1_d": "We don't sell your data to marketers. We use encrypted hashes to verify your cash flow strictly for credit underwriting. You remain completely in control of who sees what.",
        
        "f2_h": "FORCE LENDERS TO COMPETE FOR YOU.",
        "f2_t": "THE UPWARD SPIRAL",
        "f2_d": "Lenders respect one thing: proof. Repay your active balances and watch your financing limits aggressively expand week by week. You set the terms by being reliable.",
        
        "f3_h": "YOUR UNDENIABLE FINANCIAL IDENTITY.",
        "f3_t": "THE MASTER RECORD",
        "f3_d": "Stop submitting 6 months of bank statements to every new app. One verified digital identity unlocks the entire lending ecosystem instantly.",
        
        "step_title": "HOW TO COMMAND CAPITAL.",
        "s1": "AGGREGATE", "s1_d": "Sync your financial data.",
        "s2": "VERIFY", "s2_d": "Generate your undeniable score.",
        "s3": "DEPLOY", "s3_d": "Access top-tier financing.",
        
        "usecase_title": "PROCURE ASSETS. DEFER PAYMENTS.",
        "uc1": "HARDWARE", "uc1_d": "MacBooks / PCs",
        "uc2": "INFRASTRUCTURE", "uc2_d": "Solar / Inverters",
        "uc3": "EDUCATION", "uc3_d": "Tuition / Certifications",
        
        "lender_title": "UNDERWRITE WITH MATHEMATICS.",
        "lender_desc": "Discard legacy credit bureau reports that exclude the informal sector. We provide real-time trust scoring based on active cash flow and utility payments.",
        
        "bottom_cta": "TAKE CONTROL OF YOUR FINANCES."
    },
    "8": { # Playful Pop (Neo-brutalist / Gumroad style, extremely vibrant)
        "mode": "light", "bg": "bg-[#FFF4D4] text-[#0f172a]", "nav_btn": "bg-[#A78BFA] text-black font-black rounded-xl hover:bg-[#8B5CF6] px-6 py-2.5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all",
        "hero_bg": '<div className="absolute top-20 left-10 w-40 h-40 bg-[#F472B6] rounded-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10 animate-bounce" style={{animationDuration: "3s"}}></div><div className="absolute bottom-40 right-20 w-32 h-32 bg-[#34D399] rounded-2xl rotate-12 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10"></div><div className="absolute top-1/2 right-10 w-20 h-20 bg-[#60A5FA] rounded-full border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -z-10"></div>',
        "primary_btn": "bg-[#34D399] text-black font-black hover:bg-[#10B981] rounded-2xl border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1.5 hover:translate-x-1.5 transition-all",
        "card": "bg-white border-[4px] border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden",
        "section_bg": "bg-[#E0E7FF] border-y-[4px] border-black", "text_muted": "text-slate-700 font-bold", "text_heading": "text-black font-black", "accent": "text-[#8B5CF6] bg-black px-3 py-1 rounded-lg inline-block border-2 border-black rotate-[-2deg]",

        "hero_title": "Level up your borrowing power! 🚀",
        "hero_subtitle": "Why settle for tiny, expensive loans? Safely link your bank app, get your epic Trust Score, and unlock massive lending limits just by paying your bills on time!",
        "btn_text": "Let's Go!",
        "social_text": "Join 50,000+ players winning the credit game.",
        
        "big_statement": "Treat your credit like a video game.",
        "big_statement_sub": "Pay on time, earn XP, and watch your loan limits shoot through the roof. We make building credit actually fun.",
        
        "f1_h": "Your info is locked in a digital vault.",
        "f1_t": "Super Safe & Secure 🔒",
        "f1_d": "We don't play around with your privacy. We only use your data to prove to our lender friends that you're awesome at managing money.",
        
        "f2_h": "Hit milestones, get rewarded.",
        "f2_t": "Unlock New Tiers 📈",
        "f2_d": "Every time you clear a balance, you level up. Higher levels mean access to bigger loans, cheaper interest rates, and exclusive perks.",
        
        "f3_h": "One epic score to rule them all.",
        "f3_t": "All Your Cash in One Place 💰",
        "f3_d": "We connect your banks, wallets, and mobile money so you have one unified score that gets you the best deals everywhere you go.",
        
        "step_title": "How to play and win.",
        "s1": "Link Up", "s1_d": "Connect your accounts securely.",
        "s2": "Get Scored", "s2_d": "See your starting limit instantly.",
        "s3": "Level Up", "s3_d": "Borrow, repay, and unlock more!",
        
        "usecase_title": "Grab life's upgrades today! ⚡",
        "uc1": "New Phones & Laptops", "uc1_d": "Pay small small",
        "uc2": "Solar Power Setup", "uc2_d": "Never sleep in darkness",
        "uc3": "School Fees", "uc3_d": "Sorted in minutes",
        
        "lender_title": "Meet your best customers here. 👋",
        "lender_desc": "Tired of chasing bad debt? We gamify repayment so borrowers actually want to pay you back on time. Access our pool of highly motivated, trust-scored users.",
        
        "bottom_cta": "Ready to play the credit game and win?"
    },
    "9": { # Enterprise Trust (SaaS style, highly polished gradients, subtle shadows)
        "mode": "light", "bg": "bg-[#F9FAFB] text-gray-900", "nav_btn": "bg-indigo-600/10 text-indigo-700 font-bold rounded-lg hover:bg-indigo-600/20 px-5 py-2 transition-colors",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px]"></div><div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>',
        "primary_btn": "bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all hover:-translate-y-0.5",
        "card": "bg-white border border-gray-200/60 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02]",
        "section_bg": "bg-white border-t border-gray-200/50", "text_muted": "text-gray-500", "text_heading": "text-gray-900 tracking-tight", "accent": "text-indigo-600 font-bold",

        "hero_title": "Institutional-grade credit intelligence.",
        "hero_subtitle": "We provide a secure, unified view of your financial health. By safely evaluating your transaction patterns, we connect you with premium institutional lenders for significant capital access.",
        "btn_text": "Create Account",
        "social_text": "Compliant with CBN Data Protection Regulations.",
        
        "big_statement": "Sophisticated analysis. Simple outcomes.",
        "big_statement_sub": "A secure, unified view of your financial health that accurately reflects your creditworthiness to premium financial institutions.",
        
        "f1_h": "Maximum compliance and security.",
        "f1_t": "NDPR Compliant Parsing",
        "f1_d": "Your financial data is processed in isolated, encrypted containers to ensure absolute privacy. No human ever reviews your personal statements.",
        
        "f2_h": "Automated rate negotiation.",
        "f2_t": "Tiered Limit Expansion",
        "f2_d": "Our algorithms automatically negotiate higher credit limits and reduced Annual Percentage Rates (APY) upon consecutive direct debit settlements.",
        
        "f3_h": "Actionable trust metrics.",
        "f3_t": "Unified Data Infrastructure",
        "f3_d": "Seamlessly integrate your payroll, corporate accounts, and utility records into one undeniable trust metric recognized by leading institutions.",
        
        "step_title": "The underwriting process.",
        "s1": "Data Integration", "s1_d": "Securely aggregate financial records.",
        "s2": "Risk Analysis", "s2_d": "Algorithmic evaluation of capability.",
        "s3": "Capital Deployment", "s3_d": "Instant routing of approved funds.",
        
        "usecase_title": "Financing for professionals.",
        "uc1": "Workstation Procurement", "uc1_d": "Low APY leasing",
        "uc2": "Residential Power", "uc2_d": "12-24 month terms",
        "uc3": "Executive Education", "uc3_d": "Direct disbursement",
        
        "lender_title": "Enterprise risk management.",
        "lender_desc": "Leverage our XGBoost-powered API to underwrite retail and SME loans with unprecedented accuracy. We utilize over 300 alternative data points to predict default probability.",
        
        "bottom_cta": "Establish your verified financial profile."
    },
    "10": { # Zen Minimal (Apple-esque, huge margins, extremely fine typography, pure white)
        "mode": "light", "bg": "bg-white text-black", "nav_btn": "text-black hover:opacity-50 text-xs tracking-[0.2em] uppercase font-medium",
        "hero_bg": '',
        "primary_btn": "bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8 transition-transform hover:scale-[1.02] shadow-xl",
        "card": "bg-[#FAFAFA] border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem]",
        "section_bg": "bg-[#FCFCFC] border-y border-black/[0.03]", "text_muted": "text-gray-500 font-light", "text_heading": "text-black font-medium tracking-tight", "accent": "text-gray-400 font-light tracking-[0.1em]",

        "hero_title": "Credit, simplified.",
        "hero_subtitle": "Your financial life, beautifully consolidated. We use a privacy-first approach to understand your habits, ensuring your reliable behavior translates directly into superior loan access.",
        "btn_text": "Begin",
        "social_text": "Designed for clarity and peace of mind.",
        
        "big_statement": "Everything just works.",
        "big_statement_sub": "No forms, no waiting, no hidden fees. Just a clear understanding of your financial capability, granting you access to the capital you deserve.",
        
        "f1_h": "Your data is yours.",
        "f1_t": "Designed for Privacy",
        "f1_d": "We believe privacy is a fundamental right. We only access the patterns necessary to build your trust score, and nothing more. Clean, secure, transparent.",
        
        "f2_h": "Grow without trying.",
        "f2_t": "Effortless Expansion",
        "f2_d": "Borrow what you need. Repay it smoothly. The system naturally adapts to give you more freedom and better rates as you prove your reliability over time.",
        
        "f3_h": "One elegant score.",
        "f3_t": "A Single Truth",
        "f3_d": "Leave fragmented banking systems behind. Experience one beautifully simple score that speaks for your entire financial capability across all platforms.",
        
        "step_title": "The elegant way to borrow.",
        "s1": "Connect", "s1_d": "Sync accounts effortlessly.",
        "s2": "Understand", "s2_d": "View your clear capability.",
        "s3": "Proceed", "s3_d": "Access funds immediately.",
        
        "usecase_title": "Access what you need, effortlessly.",
        "uc1": "Personal Technology", "uc1_d": "Simple monthly terms",
        "uc2": "Home Energy", "uc2_d": "Sustainable financing",
        "uc3": "Family Education", "uc3_d": "Stress-free tuition",
        
        "lender_title": "Clarity in underwriting.",
        "lender_desc": "We strip away the noise. Access a curated pool of individuals whose financial behaviors have been verified through our elegant, high-precision models.",
        
        "bottom_cta": "Experience better financial access."
    }
}

LONG_LANDING_TEMPLATE = """
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen {bg} flex flex-col font-sans relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10">
      {hero_bg}
      
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 {text_heading}">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/{id}/onboarding" className="{nav_btn}">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-24 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 text-sm font-semibold mb-10 backdrop-blur-md shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          {social_text}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[1.05] {text_heading}">
          {hero_title}
        </h1>
        
        <p className="{text_muted} max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          {hero_subtitle}
        </p>
        
        <Link href="/{id}/onboarding" className="{primary_btn} inline-flex px-12 py-5 text-xl font-bold transition-all items-center justify-center gap-2">
          {btn_text}
        </Link>
      </header>

      {/* 2. THE BIG STATEMENT (Why we exist) */}
      <section className="{section_bg} py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black {text_heading} mb-8 leading-tight">
            {big_statement}
          </h2>
          <p className="text-xl md:text-2xl {text_muted} leading-relaxed">
            {big_statement_sub}
          </p>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES (Alternating Layout) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f1_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f1_h}</h3>
              <p className="text-lg md:text-xl {text_muted} leading-relaxed">{f1_d}</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 {card} aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 {card} aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f2_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f2_h}</h3>
              <p className="text-lg md:text-xl {text_muted} leading-relaxed">{f2_d}</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f3_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f3_h}</h3>
              <p className="text-lg md:text-xl {text_muted} leading-relaxed">{f3_d}</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 {card} aspect-square md:aspect-video flex items-center justify-center text-[5rem]">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="{section_bg} py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black {text_heading} mb-6">{step_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-16 left-[20%] right-[20%] h-0.5 bg-black/10 dark:bg-white/10 hidden md:block"></div>
            
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto {card} rounded-full flex items-center justify-center text-3xl font-black {text_heading} mb-8 shadow-md">1</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s1}</h3>
              <p className="{text_muted} text-lg px-4">{s1_d}</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto {card} rounded-full flex items-center justify-center text-3xl font-black {text_heading} mb-8 shadow-md">2</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s2}</h3>
              <p className="{text_muted} text-lg px-4">{s2_d}</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-32 h-32 mx-auto {card} rounded-full flex items-center justify-center text-3xl font-black {text_heading} mb-8 shadow-md">3</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s3}</h3>
              <p className="{text_muted} text-lg px-4">{s3_d}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TANGIBLE USE CASES */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black {text_heading} mb-8 leading-tight">{usecase_title}</h2>
            <p className="{text_muted} text-xl mb-12 leading-relaxed">
              Don't let a temporary cash crunch stall your momentum. Secure financing for the things that matter, at interest rates you can actually afford, by leveraging the trust you've already built.
            </p>
            <Link href="/{id}/onboarding" className="inline-flex items-center gap-3 font-bold text-xl {accent} hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">💻</div>
                  <span className="text-2xl font-bold {text_heading}">{uc1}</span>
               </div>
               <span className="{text_muted} font-medium">{uc1_d}</span>
            </div>
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">☀️</div>
                  <span className="text-2xl font-bold {text_heading}">{uc2}</span>
               </div>
               <span className="{text_muted} font-medium">{uc2_d}</span>
            </div>
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-[1.02]">
               <div className="flex items-center gap-6">
                  <div className="text-4xl bg-black/5 dark:bg-white/5 p-4 rounded-2xl">🎓</div>
                  <span className="text-2xl font-bold {text_heading}">{uc3}</span>
               </div>
               <span className="{text_muted} font-medium">{uc3_d}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR LENDERS */}
      <section className="{section_bg} py-32 relative z-10 border-y border-black/5 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block text-sm font-bold tracking-widest uppercase mb-6 {text_muted}">Partners & Institutions</div>
            <h2 className="text-4xl md:text-5xl font-black {text_heading} mb-8 leading-tight">{lender_title}</h2>
            <p className="{text_muted} text-xl leading-relaxed mb-12">{lender_desc}</p>
            <button className="px-8 py-4 border-2 border-black/20 dark:border-white/20 rounded-full font-bold {text_heading} hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-lg">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black {text_heading} mb-12 leading-tight tracking-tight">{bottom_cta}</h2>
           <Link href="/{id}/onboarding" className="{primary_btn} inline-block px-14 py-6 text-2xl font-black transition-transform">
              {btn_text}
           </Link>
         </div>
      </section>
    </div>
  );
}
"""

for tid, t in THEMES.items():
    res = LONG_LANDING_TEMPLATE
    for k, v in t.items():
        res = res.replace("{" + k + "}", str(v))
    res = res.replace("{id}", tid)
    write_file(f"src/app/{tid}/page.tsx", res)

print("Light mode landing pages enhanced to be incredibly polished and competitive with the dark modes.")
