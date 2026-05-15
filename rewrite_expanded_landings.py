import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# Deep, detailed, non-cringe copy inspired by real fintechs (Monzo, Kuda, Float, Stripe)
THEMES = {
    "1": { 
        "mode": "dark", "bg": "bg-[#09090b] text-white", "nav_btn": "text-white hover:text-red-400 font-bold",
        "hero_bg": '<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>',
        "primary_btn_class": "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full",
        "card": "bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl",
        "section_bg": "bg-[#111113]", "text_muted": "text-stone-400", "text_heading": "text-white",
        
        "hero_title": "Credit that respects your hustle.",
        "hero_subtitle": "Traditional banks look at paperwork. We look at your actual cash flow. Connect your OPay, Moniepoint, or bank accounts to get a Trust Score that reflects your real earning power.",
        "btn_text": "Claim Your Limit",
        
        "social_text": "Over ₦50M disbursed securely this month.",
        
        "feat_title": "Stop getting rejected by outdated algorithms.",
        "f1_title": "Alternative Data Scoring", "f1_desc": "We analyze your utility payments, airtime recharges, and mobile money inflows. No pay slip? No problem.",
        "f2_title": "The Repayment Multiplier", "f2_desc": "Start with a ₦50,000 limit. Pay it back on time, and your limit automatically doubles. Your good habits directly increase your borrowing power.",
        "f3_title": "Squadco Infrastructure", "f3_desc": "Built on bank-grade security. We use automated direct debits so you never miss a repayment date and always grow your score.",
        
        "usecase_title": "Get exactly what you need. Today.",
        "uc1": "Rent a MacBook Pro", "uc1_d": "₦45,000/month",
        "uc2": "5KVA Solar Setup", "uc2_d": "₦120,000/month",
        "uc3": "School Fees Advance", "uc3_d": "Up to ₦2M",
        
        "lender_title": "For the Lenders: Zero Guesswork.",
        "lender_desc": "Stop dealing with defaults. CreditGo provides you with pre-vetted borrowers whose alternative data proves their capacity to pay. You get the insights; they get the cash.",
        
        "bottom_cta": "Ready to build your actual credit profile?"
    },
    "2": { 
        "mode": "dark", "bg": "bg-[#0a0a0a] text-white", "nav_btn": "bg-white text-black font-bold rounded hover:bg-gray-200 px-4 py-2",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-lg",
        "card": "bg-black border border-[#222] rounded-lg shadow-2xl",
        "section_bg": "bg-black border-t border-[#222]", "text_muted": "text-[#888]", "text_heading": "text-white",

        "hero_title": "The financial protocol for modern workers.",
        "hero_subtitle": "Aggregate your fragmented financial history. Generate a unified Trust Score. Access top-tier financing for your personal and professional growth.",
        "btn_text": "Initialize Profile",
        
        "social_text": "Trusted by 100+ institutional lenders and credit providers.",
        
        "feat_title": "Engineered for maximum financial leverage.",
        "f1_title": "Data Aggregation", "f1_desc": "We securely hash your transaction history from GTBank, Access, and mobile wallets. You control what data is used to build your score.",
        "f2_title": "Dynamic Limits", "f2_desc": "Your capacity isn't static. It scales linearly. A successful ₦100k repayment immediately provisions a ₦250k tranche at a lower interest rate.",
        "f3_title": "Global Consolidation", "f3_desc": "One system for all your finances. Stop submitting PDF statements to different apps. Provide your CreditGo ID and get instant approvals.",
        
        "usecase_title": "Deploy capital where it matters.",
        "uc1": "Developer Equipment", "uc1_d": "Instant approval",
        "uc2": "Home Office Power", "uc2_d": "Tier 1 interest",
        "uc3": "Professional Courses", "uc3_d": "Deferred payments",
        
        "lender_title": "Lending APIs with built-in risk mitigation.",
        "lender_desc": "We run XGBoost models on millions of alternative data points. Integrate our Trust Score API to instantly route high-quality borrowers to your loan book with near-zero default risk.",
        
        "bottom_cta": "Compile your financial identity today."
    },
    "3": { 
        "mode": "dark", "bg": "bg-[#0d1117] text-gray-200", "nav_btn": "border border-gray-600 rounded hover:border-gray-400 text-sm font-semibold px-4 py-2",
        "hero_bg": '<div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff7b72] to-amber-500"></div>',
        "primary_btn_class": "bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)]",
        "card": "bg-[#161b22] border border-gray-800 rounded-lg shadow-xl",
        "section_bg": "bg-[#0d1117] border-t border-gray-800", "text_muted": "text-gray-400", "text_heading": "text-white",

        "hero_title": "Know exactly what you can borrow.",
        "hero_subtitle": "No more blind applications. Our diagnostic engine analyzes your read-only bank data to show you exactly which loans you qualify for, before you even apply.",
        "btn_text": "Analyze My Score",
        
        "social_text": "Backed by data. Built for transparency.",
        
        "feat_title": "Borrow safely. Never fall into a debt trap.",
        "f1_title": "Safe Limits Calculation", "f1_desc": "We don't just give you a number. We calculate your exact safe borrowing capacity based on your monthly cash flow, so you never over-leverage.",
        "f2_title": "Automated Progression", "f2_desc": "Clear your balances automatically via mandate. Every milestone hit drops your risk profile and expands your available credit pool.",
        "f3_title": "Holistic Dashboard", "f3_desc": "See why your score is what it is. High utilization? Missed utility bill? We tell you exactly how to fix it to get better rates.",
        
        "usecase_title": "Practical financing for real life.",
        "uc1": "Device Upgrades", "uc1_d": "From ₦25,000/mo",
        "uc2": "Inverter Batteries", "uc2_d": "From ₦40,000/mo",
        "uc3": "Emergency Funds", "uc3_d": "Same-day disbursal",
        
        "lender_title": "Filter out the noise. Fund the reliable.",
        "lender_desc": "Our dashboard provides lenders with a clear, algorithmic breakdown of borrower risk. Stop relying on incomplete bureau data and start lending based on real-time cash flow intelligence.",
        
        "bottom_cta": "Take control of your credit capacity."
    },
    "4": { 
        "mode": "dark", "bg": "bg-black text-white", "nav_btn": "bg-white text-black font-semibold rounded-full hover:bg-gray-200 px-5 py-2.5",
        "hero_bg": '',
        "primary_btn_class": "bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full",
        "card": "bg-[#111] p-8",
        "section_bg": "bg-[#0a0a0a]", "text_muted": "text-gray-400", "text_heading": "text-white",

        "hero_title": "Borrow. Repay. Expand.",
        "hero_subtitle": "Start with what you can handle. Pay it back on time. Access massive credit limits. It really is that simple. Welcome to the new standard of personal finance.",
        "btn_text": "Start Now",
        
        "social_text": "Over 10,000 users have upgraded their limits this year.",
        
        "feat_title": "A system designed to help you grow.",
        "f1_title": "Connect Your Bank", "f1_desc": "Log in with your existing bank securely. We scan your history for positive payment behavior—like paying your rent or electricity on time.",
        "f2_title": "Climb the Ladder", "f2_desc": "You aren't stuck with bad rates forever. Three months of perfect repayments will automatically move you to our premium lender tiers.",
        "f3_title": "Everything in Sync", "f3_desc": "We track your entire financial reputation. One score that gives you access to a massive network of verified lenders and merchants.",
        
        "usecase_title": "Get the things that move you forward.",
        "uc1": "Work Laptops", "uc1_d": "Pay over 6 months",
        "uc2": "Solar Panels", "uc2_d": "Pay over 12 months",
        "uc3": "Rent Advance", "uc3_d": "Pay over 3 months",
        
        "lender_title": "High-quality leads, delivered daily.",
        "lender_desc": "Partner with CreditGo to access a pool of borrowers actively climbing the trust ladder. Our mandate system ensures you get paid back on time, every time.",
        
        "bottom_cta": "Ready to unlock better financing?"
    },
    "5": { 
        "mode": "dark", "bg": "bg-black text-white", "nav_btn": "border border-white/20 rounded-md hover:bg-white/10 px-4 py-1.5",
        "hero_bg": '<div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>',
        "primary_btn_class": "bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)]",
        "card": "bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl",
        "section_bg": "bg-black border-t border-white/10", "text_muted": "text-gray-500", "text_heading": "text-white",

        "hero_title": "Capital, without the friction.",
        "hero_subtitle": "Your digital history is valuable. We synthesize your payments, mobile money usage, and banking data into a powerful Trust Score that opens doors instantly.",
        "btn_text": "Unlock Access",
        
        "social_text": "Integrated with Nigeria's top tier financial infrastructure.",
        
        "feat_title": "Intelligent parsing. Immediate results.",
        "f1_title": "Synthesized Trust", "f1_desc": "No long forms. We run complex models on your transaction metadata locally to generate an accurate, fair assessment of your capability.",
        "f2_title": "Rewarding Reliability", "f2_desc": "Consistency pays literally. Watch your borrowing power expand algorithmically as you clear your monthly obligations.",
        "f3_title": "Unified Ecosystem", "f3_desc": "From buying a phone to financing a car. Your CreditGo score is the only metric you need to prove your reliability.",
        
        "usecase_title": "Premium access for reliable people.",
        "uc1": "High-End Devices", "uc1_d": "Approved in 5 mins",
        "uc2": "Renewable Energy", "uc2_d": "Zero down-payment",
        "uc3": "Education Funding", "uc3_d": "Direct to institution",
        
        "lender_title": "Lending, de-risked.",
        "lender_desc": "We don't just score users; we manage the collection lifecycle. Through our Squadco integration, we tokenize cards and manage direct debits to ensure your capital is protected.",
        
        "bottom_cta": "Discover your true borrowing power."
    },
    "6": { 
        "mode": "light", "bg": "bg-[#f8fafc] text-slate-900", "nav_btn": "bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 px-5 py-2",
        "hero_bg": '<div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>',
        "primary_btn_class": "bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30",
        "card": "bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        "section_bg": "bg-white", "text_muted": "text-slate-500", "text_heading": "text-slate-900",

        "hero_title": "The fair way to get loans in Nigeria.",
        "hero_subtitle": "Forget predatory loan sharks. Connect your bank account, get a fair Trust Score based on how you handle your money, and access low-interest loans from verified lenders.",
        "btn_text": "Get Your Score",
        
        "social_text": "Regulated, secure, and entirely transparent.",
        
        "feat_title": "We reward your good habits.",
        "f1_title": "Bank-Grade Security", "f1_desc": "We connect with your banks via secure Open Banking tokens. We can't see your passwords, and we never ever sell your data.",
        "f2_title": "Grow Together", "f2_desc": "Start with a ₦20,000 limit. Pay it back on time, and your limit increases to ₦50,000. Keep going to unlock millions.",
        "f3_title": "All-in-One Finance", "f3_desc": "We look at the whole picture. Your salary, your side-hustle inflows, even your consistent airtime purchases count towards your score.",
        
        "usecase_title": "Whatever life throws at you, we're here.",
        "uc1": "New Laptops", "uc1_d": "Spread the cost",
        "uc2": "Solar Batteries", "uc2_d": "Light up your home",
        "uc3": "School Fees", "uc3_d": "Keep the kids in class",
        
        "lender_title": "Grow your loan book safely.",
        "lender_desc": "Are you a lender tired of high NPLs? CreditGo gives you access to a marketplace of users who have proven their intent and ability to repay through alternative data analysis.",
        
        "bottom_cta": "Join thousands building better credit."
    },
    "7": { 
        "mode": "light", "bg": "bg-[#f4f4f0] text-[#111]", "nav_btn": "border-2 border-[#111] font-bold rounded-none hover:bg-[#111] hover:text-[#f4f4f0] px-6 py-2 uppercase tracking-wide",
        "hero_bg": '',
        "primary_btn_class": "bg-[#FF4F00] text-white hover:bg-[#e64600] rounded-none border-2 border-[#111] uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all",
        "card": "bg-white border-4 border-[#111] rounded-none shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]",
        "section_bg": "bg-white border-t-4 border-[#111]", "text_muted": "text-[#555]", "text_heading": "text-[#111]",

        "hero_title": "DATA IS CAPITAL. USE YOURS.",
        "hero_subtitle": "You generate valuable financial data every day. Stop giving it away for free. Aggregate it here to prove your creditworthiness and force lenders to give you the rates you actually deserve.",
        "btn_text": "INITIATE NOW",
        
        "social_text": "NO MORE PAPERWORK. NO MORE MIDDLEMEN.",
        
        "feat_title": "THE SYSTEM IS FINALLY FAIR.",
        "f1_title": "RADICAL PRIVACY", "f1_desc": "We don't sell your data to marketers. We use encrypted hashes to verify your cash flow strictly for credit underwriting.",
        "f2_title": "THE UPWARD SPIRAL", "f2_desc": "Lenders respect one thing: proof. Repay your active balances and watch your financing limits aggressively expand week by week.",
        "f3_title": "THE MASTER RECORD", "f3_desc": "Stop submitting 6 months of bank statements to every app. One verified digital identity unlocks the entire ecosystem.",
        
        "usecase_title": "PROCURE ASSETS. DEFER PAYMENTS.",
        "uc1": "HARDWARE", "uc1_d": "MacBooks / PCs",
        "uc2": "INFRASTRUCTURE", "uc2_d": "Solar / Inverters",
        "uc3": "EDUCATION", "uc3_d": "Tuition / Certifications",
        
        "lender_title": "UNDERWRITE WITH MATHEMATICS.",
        "lender_desc": "Discard legacy credit bureau reports that exclude the informal sector. We provide real-time trust scoring based on active cash flow and utility payments.",
        
        "bottom_cta": "TAKE CONTROL OF YOUR FINANCES."
    },
    "8": { 
        "mode": "light", "bg": "bg-[#fff9e6] text-[#0f172a]", "nav_btn": "bg-[#8b5cf6] text-white font-bold rounded-xl hover:bg-[#7c3aed] px-6 py-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
        "hero_bg": '<div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full border-4 border-slate-900 -z-10"></div><div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-400 rounded-lg rotate-12 border-4 border-slate-900 -z-10"></div>',
        "primary_btn_class": "bg-[#10b981] text-slate-900 font-black hover:bg-[#059669] rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1 transition-all text-xl",
        "card": "bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
        "section_bg": "bg-[#e0e7ff] border-t-4 border-slate-900", "text_muted": "text-slate-600", "text_heading": "text-slate-900",

        "hero_title": "Unlock your money superpowers! 🚀",
        "hero_subtitle": "Why settle for tiny, expensive loans? Safely link your bank app, get your epic Trust Score, and unlock massive lending limits just by paying your bills on time!",
        "btn_text": "Let's Go!",
        
        "social_text": "Join 50,000+ players winning the credit game.",
        
        "feat_title": "Level up your finances.",
        "f1_title": "Super Safe & Secure 🔒", "f1_desc": "Your info is locked in a digital vault. We only use it to prove to our lender friends that you're awesome at managing money.",
        "f2_title": "Unlock New Tiers 📈", "f2_desc": "Treat your credit like a video game. Pay on time, earn XP, and watch your loan limits shoot through the roof!",
        "f3_title": "All Your Cash in One Place 💰", "f3_desc": "We connect your banks, wallets, and mobile money so you have one epic score that gets you the best deals.",
        
        "usecase_title": "Grab life's upgrades today! ⚡",
        "uc1": "New Phones & Laptops", "uc1_d": "Pay small small",
        "uc2": "Solar Power Setup", "uc2_d": "Never sleep in darkness",
        "uc3": "School Fees", "uc3_d": "Sorted in minutes",
        
        "lender_title": "Meet your best customers here. 👋",
        "lender_desc": "Tired of chasing bad debt? We gamify repayment so borrowers actually want to pay you back on time. Access our pool of highly motivated, trust-scored users.",
        
        "bottom_cta": "Ready to play the credit game and win?"
    },
    "9": { 
        "mode": "light", "bg": "bg-gray-50 text-gray-900", "nav_btn": "text-indigo-600 font-semibold hover:text-indigo-800",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>',
        "primary_btn_class": "bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-sm font-medium",
        "card": "bg-white border border-gray-200 rounded-xl shadow-lg",
        "section_bg": "bg-white border-t border-gray-200", "text_muted": "text-gray-500", "text_heading": "text-gray-900",

        "hero_title": "Institutional-grade credit intelligence.",
        "hero_subtitle": "We provide a secure, unified view of your financial health. By safely evaluating your transaction patterns, we connect you with premium institutional lenders for significant capital access.",
        "btn_text": "Create Account",
        
        "social_text": "Compliant with CBN Data Protection Regulations.",
        
        "feat_title": "Sophisticated analysis. Simple outcomes.",
        "f1_title": "NDPR Compliant Parsing", "f1_desc": "Your financial data is processed in isolated, encrypted containers to ensure maximum compliance. No human ever sees your statements.",
        "f2_title": "Tiered Limit Expansion", "f2_desc": "Our algorithms automatically negotiate higher credit limits and reduced APYs upon consecutive direct debit settlements.",
        "f3_title": "Unified Data Infrastructure", "f3_desc": "Seamlessly integrate your payroll, corporate accounts, and tax records into one actionable, undeniable trust metric.",
        
        "usecase_title": "Financing for professionals.",
        "uc1": "Workstation Procurement", "uc1_d": "Low APY leasing",
        "uc2": "Residential Power", "uc2_d": "12-24 month terms",
        "uc3": "Executive Education", "uc3_d": "Direct disbursement",
        
        "lender_title": "Enterprise risk management.",
        "lender_desc": "Leverage our XGBoost-powered API to underwrite retail and SME loans with unprecedented accuracy. We utilize over 300 alternative data points to predict default probability.",
        
        "bottom_cta": "Establish your verified financial profile."
    },
    "10": { 
        "mode": "light", "bg": "bg-white text-black", "nav_btn": "text-black hover:opacity-50 text-sm tracking-widest uppercase font-medium",
        "hero_bg": '',
        "primary_btn_class": "bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8",
        "card": "bg-white border-0 shadow-[0_0_50px_rgba(0,0,0,0.05)] rounded-3xl",
        "section_bg": "bg-[#fcfcfc]", "text_muted": "text-gray-500", "text_heading": "text-black",

        "hero_title": "Credit, simplified.",
        "hero_subtitle": "Your financial life, beautifully consolidated. We use a privacy-first approach to understand your habits, ensuring your reliable behavior translates directly into superior loan access.",
        "btn_text": "Begin",
        
        "social_text": "Designed for clarity and peace of mind.",
        
        "feat_title": "Everything just works.",
        "f1_title": "Designed for Privacy", "f1_desc": "We believe your data is yours. We only access the patterns necessary to build your trust score, and nothing more.",
        "f2_title": "Effortless Growth", "f2_desc": "Borrow what you need. Repay it smoothly. The system naturally adapts to give you more freedom as you prove reliability.",
        "f3_title": "A Single Truth", "f3_desc": "Leave fragmented systems behind. One elegant score that speaks for your entire financial capability across all platforms.",
        
        "usecase_title": "Access what you need, effortlessly.",
        "uc1": "Personal Technology", "uc1_d": "Simple monthly terms",
        "uc2": "Home Energy", "uc2_d": "Sustainable financing",
        "uc3": "Family Education", "uc3_d": "Stress-free tuition",
        
        "lender_title": "Clarity in underwriting.",
        "lender_desc": "We strip away the noise. Access a curated pool of individuals whose financial behaviors have been verified through our elegant, high-precision models.",
        
        "bottom_cta": "Experience better financial access."
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
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pt-16 pb-24 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {social_text}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] {text_heading}">
          {hero_title}
        </h1>
        
        <p className="{text_muted} max-w-3xl text-lg md:text-xl mb-12 leading-relaxed">
          {hero_subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link href="/{id}/onboarding" className="{primary_btn_class} px-8 py-4 text-lg transition-all flex items-center justify-center gap-2 min-w-[200px]">
            {btn_text}
          </Link>
        </div>
      </main>

      {/* Feature Breakdown */}
      <section className="{section_bg} py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-bold {text_heading} mb-6">{feat_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="{card} p-8 text-left transition-transform hover:-translate-y-1">
              <div className="text-3xl mb-4 opacity-80">🔒</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f1_title}</h3>
              <p className="{text_muted} leading-relaxed">{f1_desc}</p>
            </div>
            <div className="{card} p-8 text-left transition-transform hover:-translate-y-1">
              <div className="text-3xl mb-4 opacity-80">📈</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f2_title}</h3>
              <p className="{text_muted} leading-relaxed">{f2_desc}</p>
            </div>
            <div className="{card} p-8 text-left transition-transform hover:-translate-y-1">
              <div className="text-3xl mb-4 opacity-80">🌐</div>
              <h3 className="text-xl font-bold {text_heading} mb-3">{f3_title}</h3>
              <p className="{text_muted} leading-relaxed">{f3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Show them what they can actually get */}
      <section className="py-24 relative z-10 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold {text_heading} mb-6">{usecase_title}</h2>
            <p className="{text_muted} text-lg mb-8 leading-relaxed">
              Don't let a temporary cash crunch stall your life. Secure financing for the things that matter, at interest rates you can actually afford.
            </p>
          </div>
          <div className="space-y-4">
            <div className="{card} p-6 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="text-2xl">💻</div>
                  <span className="font-bold {text_heading}">{uc1}</span>
               </div>
               <span className="{text_muted} text-sm font-medium">{uc1_d}</span>
            </div>
            <div className="{card} p-6 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="text-2xl">☀️</div>
                  <span className="font-bold {text_heading}">{uc2}</span>
               </div>
               <span className="{text_muted} text-sm font-medium">{uc2_d}</span>
            </div>
            <div className="{card} p-6 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="text-2xl">🎓</div>
                  <span className="font-bold {text_heading}">{uc3}</span>
               </div>
               <span className="{text_muted} text-sm font-medium">{uc3_d}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lender section */}
      <section className="{section_bg} py-24 relative z-10 text-center border-t border-black/5 dark:border-white/5">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold {text_heading} mb-4">{lender_title}</h2>
            <p className="{text_muted} text-lg leading-relaxed mb-8">{lender_desc}</p>
         </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 relative z-10 text-center border-t border-black/5 dark:border-white/5">
         <h2 className="text-4xl font-bold {text_heading} mb-8">{bottom_cta}</h2>
         <Link href="/{id}/onboarding" className="{primary_btn_class} inline-block px-10 py-4 text-lg font-bold transition-all">
            {btn_text}
         </Link>
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

print("Expanded, highly-detailed, non-cringe landing pages successfully written for all 10 themes.")
