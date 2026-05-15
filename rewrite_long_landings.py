import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

THEMES = {
    # ---------------------------------------------------------
    # DARK MODES
    # ---------------------------------------------------------
    "1": { 
        "mode": "dark", "bg": "bg-[#09090b] text-white", "nav_btn": "text-white hover:text-red-400 font-bold",
        "hero_bg": '<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>',
        "primary_btn": "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full",
        "card": "bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl",
        "section_bg": "bg-[#111113]", "text_muted": "text-stone-400", "text_heading": "text-white", "accent": "text-red-500",
        
        "hero_title": "Credit that respects your hustle.",
        "hero_subtitle": "Traditional banks look at paperwork. We look at your actual cash flow. Connect your accounts to get a Trust Score that reflects your real earning power.",
        "btn_text": "Claim Your Limit",
        "social_text": "Over ₦50M disbursed securely this month.",
        
        "big_statement": "Legacy credit bureaus don't know you. We do.",
        "big_statement_sub": "You pay your bills. You buy airtime. You move money. Why isn't that counting towards your credit? Now, it does.",
        
        "f1_h": "Your cash flow is the only proof you need.",
        "f1_t": "Alternative Data Scoring",
        "f1_d": "We analyze your utility payments, airtime recharges, and mobile money inflows. No pay slip? No problem. If you earn and spend reliably, you deserve access to capital.",
        
        "f2_h": "Pay it back. Watch your limit explode.",
        "f2_t": "The Repayment Multiplier",
        "f2_d": "Start with a baseline limit. Clear your balance on time, and your limit automatically multiplies. Your good habits directly and instantly increase your borrowing power. No manual reviews.",
        
        "f3_h": "Bulletproof security. Zero surveillance.",
        "f3_t": "Privacy-First Architecture",
        "f3_d": "Your data never leaves the vault. We securely connect to your accounts using read-only tokens just to extract the trust signals. We don't sell your data, we just use it to get you funded.",
        
        "step_title": "From zero to funded in three steps.",
        "s1": "Connect Accounts", "s1_d": "Link your primary bank or mobile money securely.",
        "s2": "Extract Trust", "s2_d": "Our engine calculates your true borrowing capacity instantly.",
        "s3": "Access Capital", "s3_d": "Withdraw funds or finance assets immediately.",
        
        "usecase_title": "Stop waiting. Start doing.",
        "uc1": "Rent a MacBook Pro", "uc1_d": "₦45,000/month",
        "uc2": "5KVA Solar Setup", "uc2_d": "₦120,000/month",
        "uc3": "School Fees Advance", "uc3_d": "Up to ₦2M",
        
        "lender_title": "For the Lenders: Zero Guesswork.",
        "lender_desc": "Stop dealing with defaults. CreditGo provides you with pre-vetted borrowers whose alternative data proves their capacity to pay. We handle the direct debits; you get the returns.",
        
        "bottom_cta": "Ready to build your actual credit profile?"
    },
    "2": { 
        "mode": "dark", "bg": "bg-[#0a0a0a] text-white", "nav_btn": "bg-white text-black font-bold rounded hover:bg-gray-200 px-4 py-2",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>',
        "primary_btn": "bg-white text-black hover:bg-gray-200 rounded-lg",
        "card": "bg-black border border-[#222] rounded-lg shadow-2xl",
        "section_bg": "bg-black border-t border-[#222]", "text_muted": "text-[#888]", "text_heading": "text-white", "accent": "text-white",

        "hero_title": "The financial protocol for modern workers.",
        "hero_subtitle": "Aggregate your fragmented financial history. Generate a unified Trust Score. Access top-tier financing for your personal and professional growth.",
        "btn_text": "Initialize Profile",
        "social_text": "Trusted by 100+ institutional lenders and credit providers.",
        
        "big_statement": "Engineered for maximum financial leverage.",
        "big_statement_sub": "Stop submitting PDF statements to a dozen different apps. Provide your CreditGo ID once and get instant approvals everywhere.",
        
        "f1_h": "Consolidate your financial footprint.",
        "f1_t": "Data Aggregation",
        "f1_d": "We securely hash your transaction history from traditional banks and mobile wallets. You completely control what data is used to compile your master Trust Score.",
        
        "f2_h": "Algorithmic limit expansion.",
        "f2_t": "Dynamic Scaling",
        "f2_d": "Your borrowing capacity isn't static; it scales linearly with your reliability. A successful repayment automatically provisions a larger credit tranche at a lower interest rate.",
        
        "f3_h": "Programmable debt management.",
        "f3_t": "Automated Mandates",
        "f3_d": "Through our Squadco infrastructure integration, your repayments are automated via direct debit. You never miss a date, and your score never takes a hit.",
        
        "step_title": "Deploy capital efficiently.",
        "s1": "Authenticate", "s1_d": "Provide secure read-access to your financial nodes.",
        "s2": "Compile", "s2_d": "Our system generates your algorithmic trust metric.",
        "s3": "Execute", "s3_d": "Route approved capital to your designated endpoints.",
        
        "usecase_title": "Finance your infrastructure.",
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
        "primary_btn": "bg-[#ff7b72] text-black hover:bg-[#ff6a5f] rounded-md shadow-[0_0_30px_rgba(255,123,114,0.3)]",
        "card": "bg-[#161b22] border border-gray-800 rounded-lg shadow-xl",
        "section_bg": "bg-[#0d1117] border-t border-gray-800", "text_muted": "text-gray-400", "text_heading": "text-white", "accent": "text-[#ff7b72]",

        "hero_title": "Know exactly what you can borrow.",
        "hero_subtitle": "No more blind applications. Our diagnostic engine analyzes your read-only bank data to show you exactly which loans you qualify for, before you even apply.",
        "btn_text": "Analyze My Score",
        "social_text": "Backed by data. Built for absolute transparency.",
        
        "big_statement": "Borrow safely. Never fall into a debt trap.",
        "big_statement_sub": "We don't just give you a number. We calculate your exact safe borrowing capacity based on your monthly cash flow, so you never over-leverage.",
        
        "f1_h": "Understand your financial health instantly.",
        "f1_t": "Diagnostic Dashboard",
        "f1_d": "See exactly why your score is what it is. High utilization? Missed a utility bill? We pinpoint the exact metrics affecting your rate and tell you how to fix them.",
        
        "f2_h": "Automate your progression to better rates.",
        "f2_t": "Milestone Tracking",
        "f2_d": "Every milestone hit drops your risk profile. As you clear your balances automatically via our mandate system, your available credit pool expands in real-time.",
        
        "f3_h": "Zero-risk evaluation process.",
        "f3_t": "Read-Only Access",
        "f3_d": "We evaluate your financial footprint without ever touching your funds. Our analysis is 100% read-only and 100% secure, leaving no hard inquiries on your traditional records.",
        
        "step_title": "How we calculate your capacity.",
        "s1": "Ingest Data", "s1_d": "Sync your transaction history securely.",
        "s2": "Analyze Risk", "s2_d": "Our ML models assess your capacity.",
        "s3": "Unlock Tiers", "s3_d": "Access lenders matched to your profile.",
        
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
        "primary_btn": "bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full",
        "card": "bg-[#111] p-8",
        "section_bg": "bg-[#0a0a0a]", "text_muted": "text-gray-400", "text_heading": "text-white", "accent": "text-[#0061FE]",

        "hero_title": "Borrow. Repay. Expand.",
        "hero_subtitle": "Start with what you can handle. Pay it back on time. Access massive credit limits. It really is that simple. Welcome to the new standard of personal finance.",
        "btn_text": "Start Now",
        "social_text": "Over 10,000 users have upgraded their limits this year.",
        
        "big_statement": "A system designed to help you actually grow.",
        "big_statement_sub": "You aren't stuck with bad rates forever. Three months of perfect repayments will automatically move you to our premium lender tiers.",
        
        "f1_h": "Link your daily life to your credit limit.",
        "f1_t": "Seamless Connection",
        "f1_d": "Log in with your existing bank securely. We scan your history for positive payment behavior—like paying your rent, electricity, or subscriptions on time.",
        
        "f2_h": "Climb the ladder automatically.",
        "f2_t": "Tiered Upgrades",
        "f2_d": "Your limits aren't locked. As you prove your reliability by paying back small advances, the system automatically graduates you to larger loans with significantly lower interest.",
        
        "f3_h": "One score. Universal access.",
        "f3_t": "Everything in Sync",
        "f3_d": "We track your entire financial reputation. One verified score that gives you instant access to a massive, growing network of verified lenders and merchants.",
        
        "step_title": "The path to better capital.",
        "s1": "Connect", "s1_d": "Link your everyday accounts.",
        "s2": "Borrow", "s2_d": "Access your initial safe limit.",
        "s3": "Expand", "s3_d": "Repay on time to grow your capacity.",
        
        "usecase_title": "Get the things that move you forward.",
        "uc1": "Work Laptops", "uc1_d": "Pay over 6 months",
        "uc2": "Solar Panels", "uc2_d": "Pay over 12 months",
        "uc3": "Rent Advance", "uc3_d": "Pay over 3 months",
        
        "lender_title": "High-quality leads, delivered daily.",
        "lender_desc": "Partner with CreditGo to access a pool of borrowers actively climbing the trust ladder. Our automated mandate system ensures you get paid back on time, every time.",
        
        "bottom_cta": "Ready to unlock better financing?"
    },
    "5": { 
        "mode": "dark", "bg": "bg-black text-white", "nav_btn": "border border-white/20 rounded-md hover:bg-white/10 px-4 py-1.5",
        "hero_bg": '<div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>',
        "primary_btn": "bg-white text-black hover:bg-gray-200 rounded-md shadow-[0_0_40px_rgba(255,255,255,0.2)]",
        "card": "bg-black/40 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl",
        "section_bg": "bg-black border-t border-white/10", "text_muted": "text-gray-500", "text_heading": "text-white", "accent": "text-white",

        "hero_title": "Capital, without the friction.",
        "hero_subtitle": "Your digital history is valuable. We synthesize your payments, mobile money usage, and banking data into a powerful Trust Score that opens doors instantly.",
        "btn_text": "Unlock Access",
        "social_text": "Integrated with Nigeria's top tier financial infrastructure.",
        
        "big_statement": "Intelligent parsing. Immediate results.",
        "big_statement_sub": "No long forms. No waiting days for a decision. Our models understand your capability in seconds based on the data you already generate.",
        
        "f1_h": "Your data, synthesized securely.",
        "f1_t": "Local Processing",
        "f1_d": "We run complex models on your transaction metadata locally to generate an accurate, fair assessment of your capability, meaning your sensitive data stays yours.",
        
        "f2_h": "Consistency pays—literally.",
        "f2_t": "Rewarding Reliability",
        "f2_d": "Watch your borrowing power expand algorithmically as you clear your monthly obligations. We've built a system that actively rewards your financial discipline.",
        
        "f3_h": "One metric to prove your worth.",
        "f3_t": "Unified Ecosystem",
        "f3_d": "From buying a phone to financing a car. Your CreditGo score is the only metric you need to prove your reliability to our vast network of partners.",
        
        "step_title": "Experience seamless financing.",
        "s1": "Link Identity", "s1_d": "Securely connect your financial data.",
        "s2": "Generate Score", "s2_d": "Receive your algorithmic trust rating.",
        "s3": "Access Funds", "s3_d": "Unlock capital across our ecosystem.",
        
        "usecase_title": "Premium access for reliable people.",
        "uc1": "High-End Devices", "uc1_d": "Approved in 5 mins",
        "uc2": "Renewable Energy", "uc2_d": "Zero down-payment",
        "uc3": "Education Funding", "uc3_d": "Direct to institution",
        
        "lender_title": "Lending, completely de-risked.",
        "lender_desc": "We don't just score users; we manage the collection lifecycle. Through our robust integrations, we tokenize cards and manage direct debits to ensure your capital is protected.",
        
        "bottom_cta": "Discover your true borrowing power."
    },
    
    # ---------------------------------------------------------
    # LIGHT MODES
    # ---------------------------------------------------------
    "6": { 
        "mode": "light", "bg": "bg-[#f8fafc] text-slate-900", "nav_btn": "bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 px-5 py-2",
        "hero_bg": '<div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>',
        "primary_btn": "bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30",
        "card": "bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        "section_bg": "bg-white", "text_muted": "text-slate-500", "text_heading": "text-slate-900", "accent": "text-blue-600",

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
    "7": { 
        "mode": "light", "bg": "bg-[#f4f4f0] text-[#111]", "nav_btn": "border-2 border-[#111] font-bold rounded-none hover:bg-[#111] hover:text-[#f4f4f0] px-6 py-2 uppercase tracking-wide",
        "hero_bg": '',
        "primary_btn": "bg-[#FF4F00] text-white hover:bg-[#e64600] rounded-none border-2 border-[#111] uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all",
        "card": "bg-white border-4 border-[#111] rounded-none shadow-[8px_8px_0px_0px_rgba(17,17,17,1)]",
        "section_bg": "bg-white border-t-4 border-[#111]", "text_muted": "text-[#555]", "text_heading": "text-[#111]", "accent": "text-[#FF4F00]",

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
    "8": { 
        "mode": "light", "bg": "bg-[#fff9e6] text-[#0f172a]", "nav_btn": "bg-[#8b5cf6] text-white font-bold rounded-xl hover:bg-[#7c3aed] px-6 py-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]",
        "hero_bg": '<div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full border-4 border-slate-900 -z-10"></div><div className="absolute bottom-40 right-20 w-24 h-24 bg-pink-400 rounded-lg rotate-12 border-4 border-slate-900 -z-10"></div>',
        "primary_btn": "bg-[#10b981] text-slate-900 font-black hover:bg-[#059669] rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1 transition-all text-xl",
        "card": "bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
        "section_bg": "bg-[#e0e7ff] border-t-4 border-slate-900", "text_muted": "text-slate-600", "text_heading": "text-slate-900", "accent": "text-[#8b5cf6]",

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
    "9": { 
        "mode": "light", "bg": "bg-gray-50 text-gray-900", "nav_btn": "text-indigo-600 font-semibold hover:text-indigo-800",
        "hero_bg": '<div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>',
        "primary_btn": "bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-sm font-medium",
        "card": "bg-white border border-gray-200 rounded-xl shadow-lg",
        "section_bg": "bg-white border-t border-gray-200", "text_muted": "text-gray-500", "text_heading": "text-gray-900", "accent": "text-indigo-600",

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
    "10": { 
        "mode": "light", "bg": "bg-white text-black", "nav_btn": "text-black hover:opacity-50 text-sm tracking-widest uppercase font-medium",
        "hero_bg": '',
        "primary_btn": "bg-black text-white hover:bg-gray-800 rounded-full font-medium px-8",
        "card": "bg-white border-0 shadow-[0_0_50px_rgba(0,0,0,0.05)] rounded-3xl",
        "section_bg": "bg-[#fcfcfc]", "text_muted": "text-gray-500", "text_heading": "text-black", "accent": "text-black",

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
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm font-black">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/{id}/onboarding" className="{nav_btn}">Get Started</Link>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="w-full px-6 pt-20 pb-32 max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm font-medium mb-10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {social_text}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.05] {text_heading}">
          {hero_title}
        </h1>
        
        <p className="{text_muted} max-w-3xl text-xl md:text-2xl mb-12 leading-relaxed font-medium">
          {hero_subtitle}
        </p>
        
        <Link href="/{id}/onboarding" className="{primary_btn} inline-flex px-10 py-5 text-xl font-bold transition-all items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl">
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
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f1_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f1_h}</h3>
              <p className="text-lg {text_muted} leading-relaxed">{f1_d}</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 {card} aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🔒
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 {card} aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              📈
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f2_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f2_h}</h3>
              <p className="text-lg {text_muted} leading-relaxed">{f2_d}</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="inline-block text-sm font-bold tracking-widest uppercase mb-4 {accent}">{f3_t}</div>
              <h3 className="text-3xl md:text-5xl font-bold {text_heading} mb-6 leading-tight">{f3_h}</h3>
              <p className="text-lg {text_muted} leading-relaxed">{f3_d}</p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 {card} aspect-square md:aspect-video flex items-center justify-center text-6xl opacity-80">
              🌐
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (Step by step) */}
      <section className="{section_bg} py-32 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black {text_heading} mb-6">{step_title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-12 left-1/6 right-1/6 h-0.5 bg-black/10 dark:bg-white/10 hidden md:block"></div>
            
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto {card} rounded-full flex items-center justify-center text-2xl font-black {text_heading} mb-8 border-4 border-[color:var(--bg)]">1</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s1}</h3>
              <p className="{text_muted} text-lg">{s1_d}</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto {card} rounded-full flex items-center justify-center text-2xl font-black {text_heading} mb-8 border-4 border-[color:var(--bg)]">2</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s2}</h3>
              <p className="{text_muted} text-lg">{s2_d}</p>
            </div>
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto {card} rounded-full flex items-center justify-center text-2xl font-black {text_heading} mb-8 border-4 border-[color:var(--bg)]">3</div>
              <h3 className="text-2xl font-bold {text_heading} mb-4">{s3}</h3>
              <p className="{text_muted} text-lg">{s3_d}</p>
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
            <Link href="/{id}/onboarding" className="inline-flex items-center gap-2 font-bold text-lg {accent} hover:opacity-70 transition-opacity">
              Explore your limits →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">💻</div>
                  <span className="text-xl font-bold {text_heading}">{uc1}</span>
               </div>
               <span className="{text_muted} font-medium">{uc1_d}</span>
            </div>
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">☀️</div>
                  <span className="text-xl font-bold {text_heading}">{uc2}</span>
               </div>
               <span className="{text_muted} font-medium">{uc2_d}</span>
            </div>
            <div className="{card} p-8 flex justify-between items-center transition-transform hover:scale-105">
               <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <span className="text-xl font-bold {text_heading}">{uc3}</span>
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
            <button className="px-8 py-3 border-2 border-black/20 dark:border-white/20 rounded-full font-bold {text_heading} hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View API Documentation
            </button>
         </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-40 relative z-10 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-black {text_heading} mb-12 leading-tight">{bottom_cta}</h2>
           <Link href="/{id}/onboarding" className="{primary_btn} inline-block px-12 py-6 text-2xl font-black transition-transform hover:scale-105 shadow-2xl">
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

print("Massively expanded, high-impact landing pages generated.")
