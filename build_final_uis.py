import os
import shutil

# Clean up first
for i in range(1, 6):
    path = f"src/app/{i}"
    if os.path.exists(path):
        shutil.rmtree(path)

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# --- SHARED COMPONENTS ---
NAV = """
      <nav className="flex items-center justify-between p-6 w-full max-w-7xl mx-auto relative z-20">
        <div className="font-black text-xl tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-current text-black flex items-center justify-center text-xs">C</div>
          CreditGo
        </div>
        <div className="flex gap-4">
          <Link href="/{id}/onboarding" className="{nav_btn_class}">Get Started</Link>
        </div>
      </nav>
"""

# ==========================================
# UNIQUE LANDING PAGES
# ==========================================

# 1. OpenClaw Inspired (Dark, Red/Orange Glow, Center Focus)
L1 = """
import Link from 'next/link';

export default function Landing1() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Red glowing alien-like orb background */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      """ + NAV.replace("{id}", "1").replace("{nav_btn_class}", "text-sm font-bold text-white hover:text-red-400 transition-colors") + """

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 -mt-20">
        <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-b from-red-500 to-red-900 shadow-[0_0_50px_rgba(239,68,68,0.5)] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20"></div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
          Credit<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Go</span>
        </h1>
        <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-8">
          The credit system that actually works.
        </p>
        <p className="text-stone-400 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
          Access better loans the more you pay. We observe your history and provide intelligent trust scoring to keep you out of debt traps.
        </p>
        
        <Link href="/1/onboarding" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
          Start Onboarding Now
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </main>
    </div>
  );
}
"""

# 2. T3 Code Inspired (Grid background, monochrome, stark, floating badges)
L2 = """
import Link from 'next/link';

export default function Landing2() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans relative">
      {/* Graph Paper Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      """ + NAV.replace("{id}", "2").replace("{nav_btn_class}", "px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors") + """

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pb-32">
        {/* Floating tech badges (visual flavor) */}
        <div className="absolute left-[15%] top-[30%] w-16 h-16 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center rotate-[-12deg] shadow-2xl hidden lg:flex text-2xl">🏦</div>
        <div className="absolute right-[15%] top-[40%] w-16 h-16 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center rotate-[12deg] shadow-2xl hidden lg:flex text-2xl">⚡</div>
        <div className="absolute left-[20%] bottom-[20%] w-16 h-16 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center rotate-[6deg] shadow-2xl hidden lg:flex text-2xl">📊</div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight mb-8 max-w-4xl leading-[1.1]">
          The intelligent <br/>
          control plane <br/>
          for credit.
        </h1>
        <p className="text-[#888] max-w-2xl text-xl mb-10">
          Orchestrate your financial identity from one surface. Bring your history. Unlock 100+ lenders instantly.
        </p>
        
        <div className="flex gap-4">
          <Link href="/2/onboarding" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            Start Onboarding
          </Link>
          <Link href="#lenders" className="px-8 py-4 bg-transparent border border-[#333] text-white font-bold rounded-lg hover:bg-[#111] transition-colors flex items-center gap-2">
            View for Lenders
          </Link>
        </div>
      </main>
    </div>
  );
}
"""

# 3. CodeRabbit Inspired (Top orange banner, Dark Gray, Technical split view)
L3 = """
import Link from 'next/link';

export default function Landing3() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-[#ff7b72] text-black font-bold text-sm py-2 px-4 text-center">
        Introducing CreditGo Trust Scoring - Your financial second brain 
        <Link href="/3/onboarding" className="ml-4 bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">Try it now</Link>
      </div>

      """ + NAV.replace("{id}", "3").replace("{nav_btn_class}", "px-4 py-2 border border-gray-600 rounded hover:border-gray-400 transition-colors text-sm font-semibold") + """

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
          Cut loan defaults & <br/> debt traps in half, instantly.
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          AI-powered credit intelligence for teams and individuals who want to move fast (but don't break things).
        </p>
        
        <Link href="/3/onboarding" className="px-8 py-4 bg-[#ff7b72] hover:bg-[#ff6a5f] text-black font-bold rounded-md transition-colors text-lg mb-16 shadow-[0_0_30px_rgba(255,123,114,0.3)]">
          Try it for free →
        </Link>

        {/* Fake Dashboard Grid for technical vibe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left border-t border-gray-800 pt-16">
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
            <div className="text-[#ff7b72] text-sm font-bold mb-4">▲ Trust Score Analysis</div>
            <p className="text-gray-400 font-mono text-sm">Estimated risk effort<br/>✅ Low (Safe)<br/>⚡ ~Instant approval</p>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#ff7b72] rounded-full"></div>
              <span className="font-bold">creditgo-bot</span>
            </div>
            <p className="text-gray-300 text-sm">Potential issue: High utilization detected. A lower loan limit might be more suitable for your save capacity.</p>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-bold mb-4">Recommended Action</div>
            <p className="text-gray-300 text-sm">Submit corporate payslip to instantly boost trust score by +15 points.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
"""

# 4. Dropbox Inspired (Pure black, massive text, blue button)
L4 = """
import Link from 'next/link';

export default function Landing4() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      """ + NAV.replace("{id}", "4").replace("{nav_btn_class}", "px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm") + """

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-10 pb-32">
        <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tight mb-8 leading-[1.05] max-w-5xl">
          Get financed, <br/> with a lot less friction
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mb-12 leading-relaxed">
          CreditGo delivers intelligent trust scoring that helps you access 100+ lenders instantly, keep your data safe, and borrow with ease.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link href="/4/onboarding" className="px-10 py-5 bg-[#0061FE] hover:bg-[#0050d0] text-white font-semibold rounded-full transition-colors text-xl w-full sm:w-auto">
            Start onboarding →
          </Link>
          <span className="text-gray-500 text-sm">No credit card required.</span>
        </div>
      </main>
    </div>
  );
}
"""

# 5. Aceternity/Vercel (Spotlight, very dark, glowing borders, sleek)
L5 = """
import Link from 'next/link';

export default function Landing5() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      """ + NAV.replace("{id}", "5").replace("{nav_btn_class}", "px-4 py-1.5 border border-white/20 rounded-md hover:bg-white/10 transition-colors text-sm") + """

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Credit Intelligence v2.0 is Live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent max-w-4xl pb-2">
          Where credit becomes clear.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          The ultimate platform for borrowers to access zero-friction loans, and for lenders to reduce defaults to zero. Land within your save limits.
        </p>
        
        <Link href="/5/onboarding" className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-all text-lg flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          Initialize Onboarding
        </Link>
      </main>
    </div>
  );
}
"""

LANDINGS = { "1": L1, "2": L2, "3": L3, "4": L4, "5": L5 }

# ==========================================
# ONBOARDING FLOWS (Role Selection + Forms)
# ==========================================
# We use a theme engine for the onboarding to ensure they match their respective landing pages perfectly.

THEMES = {
    "1": { # OpenClaw Dark/Red
        "bg": "min-h-screen bg-[#09090b] text-white flex flex-col p-6 font-sans relative",
        "card": "w-full max-w-2xl mx-auto mt-20 bg-[#111113] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10",
        "title": "text-3xl font-bold mb-2",
        "subtitle": "text-stone-400",
        "role_box": "flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-[#1a1a1e] hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer",
        "input": "w-full bg-[#1a1a1e] text-white border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-red-500/50 transition-all mt-2",
        "btn": "w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all mt-8",
    },
    "2": { # T3 Monochrome Grid
        "bg": "min-h-screen bg-[#0a0a0a] text-white flex flex-col p-6 font-sans relative",
        "card": "w-full max-w-2xl mx-auto mt-20 bg-black border border-[#222] rounded-lg p-8 shadow-2xl",
        "title": "text-4xl font-medium tracking-tight mb-2",
        "subtitle": "text-[#888]",
        "role_box": "flex items-center gap-4 p-5 rounded-lg border border-[#222] bg-[#111] hover:border-white transition-all cursor-pointer",
        "input": "w-full bg-[#111] text-white border border-[#333] rounded-lg px-4 py-4 outline-none focus:border-white transition-all font-mono mt-2",
        "btn": "w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all mt-8",
    },
    "3": { # CodeRabbit Gray/Orange
        "bg": "min-h-screen bg-[#0d1117] text-gray-200 flex flex-col p-6 font-sans",
        "card": "w-full max-w-2xl mx-auto mt-20 bg-[#161b22] border border-gray-800 rounded-lg p-8",
        "title": "text-2xl font-bold text-white mb-2",
        "subtitle": "text-gray-400 font-mono text-sm",
        "role_box": "flex items-center gap-4 p-5 rounded border border-gray-800 bg-[#0d1117] hover:border-[#ff7b72] transition-all cursor-pointer",
        "input": "w-full bg-[#0d1117] text-white border border-gray-800 rounded px-4 py-3 outline-none focus:border-[#ff7b72] transition-all mt-2",
        "btn": "w-full bg-[#ff7b72] hover:bg-[#ff6a5f] text-black font-bold py-3 rounded transition-all mt-8",
    },
    "4": { # Dropbox Pure Black/Blue
        "bg": "min-h-screen bg-black text-white flex flex-col p-6 font-sans",
        "card": "w-full max-w-2xl mx-auto mt-20 bg-black p-8",
        "title": "text-4xl font-bold tracking-tight mb-4",
        "subtitle": "text-gray-400 text-xl",
        "role_box": "flex flex-col gap-4 p-8 rounded-[2rem] bg-[#111] hover:bg-[#1a1a1a] transition-all cursor-pointer border border-transparent hover:border-[#0061FE]",
        "input": "w-full bg-transparent text-white border-b-2 border-gray-800 px-0 py-4 outline-none focus:border-[#0061FE] transition-all text-xl mt-2 placeholder:text-gray-700",
        "btn": "w-full bg-[#0061FE] hover:bg-[#0050d0] text-white font-semibold py-5 rounded-xl transition-all mt-12 text-lg",
    },
    "5": { # Aceternity Glow
        "bg": "min-h-screen bg-black text-white flex flex-col p-6 font-sans relative",
        "card": "w-full max-w-2xl mx-auto mt-20 bg-black/40 border border-white/10 rounded-xl p-8 backdrop-blur-xl",
        "title": "text-2xl font-medium tracking-wide mb-2",
        "subtitle": "text-gray-500",
        "role_box": "flex items-center gap-4 p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer",
        "input": "w-full bg-transparent text-white border border-white/10 rounded-md px-4 py-3 outline-none focus:border-white/40 transition-all mt-2",
        "btn": "w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-all mt-8",
    }
}

ROLE_SELECT = """
import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="{bg}">
      <div className="{card}">
        <div className="mb-10">
          <Link href="/{id}" className="text-gray-500 hover:text-white mb-6 inline-block text-sm">← Back to Home</Link>
          <h1 className="{title}">Select your profile</h1>
          <p className="{subtitle}">Your trust scoring journey begins here.</p>
        </div>
        
        <div className="grid gap-4">
          <Link href="/{id}/onboarding/freelancer">
            <div className="{role_box}">
              <div className="text-2xl">🎨</div>
              <div>
                <h3 className="font-bold text-white">Freelancer</h3>
                <p className="text-gray-400 text-sm mt-1">Independent creator or gig worker</p>
              </div>
            </div>
          </Link>
          
          <Link href="/{id}/onboarding/worker">
            <div className="{role_box}">
              <div className="text-2xl">🏢</div>
              <div>
                <h3 className="font-bold text-white">Corporate Worker</h3>
                <p className="text-gray-400 text-sm mt-1">Full-time employee at a registered company</p>
              </div>
            </div>
          </Link>

          <Link href="/{id}/onboarding/government">
            <div className="{role_box}">
              <div className="text-2xl">🏛️</div>
              <div>
                <h3 className="font-bold text-white">Government Worker</h3>
                <p className="text-gray-400 text-sm mt-1">Public sector or civil service employee</p>
              </div>
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
    <div className="{bg}">
      <div className="{card}">
        <div className="mb-10">
          <Link href="/{id}/onboarding" className="text-gray-500 hover:text-white mb-6 inline-block text-sm">← Back to Roles</Link>
          <h1 className="{title}">{role_name} Onboarding</h1>
          <p className="{subtitle}">Provide details to unlock your credit profile.</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-400 ml-1">Legal Full Name</label>
            <input type="text" placeholder="John Doe" className="{input}" />
          </div>
          
          <div>
            <label className="text-sm font-bold text-gray-400 ml-1">{field_2_label}</label>
            <input type="text" placeholder="{field_2_ph}" className="{input}" />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-400 ml-1">Monthly Income (NGN)</label>
            <input type="number" placeholder="e.g. 500000" className="{input}" />
          </div>

          <div className="mt-8 border border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white/[0.02]">
            <div className="text-3xl mb-2">📄</div>
            <p className="font-medium text-white">Upload {doc_req}</p>
            <p className="text-sm text-gray-500 mt-1">PDF or Image (Max 5MB)</p>
          </div>

          <Link href="/{id}/dashboard" className="block">
            <button type="button" className="{btn}">Generate Trust Score</button>
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
    <div className="{bg}">
      <div className="{card} text-center py-20">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="{title}">Trust Score Generated</h1>
        <p className="{subtitle} mb-8">You are successfully onboarded to CreditGo.</p>
        <div className="inline-block p-8 border border-gray-700 rounded-2xl bg-white/[0.02] mb-10">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Your Score</p>
          <p className="text-6xl font-black text-white">785</p>
          <p className="text-emerald-400 text-sm font-bold mt-2">Excellent (Low Risk)</p>
        </div>
        <div>
          <Link href="/{id}" className="text-gray-500 hover:text-white underline">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
"""

for tid in ["1", "2", "3", "4", "5"]:
    t = THEMES[tid]
    
    # Write Landing Page
    write_file(f"src/app/{tid}/page.tsx", LANDINGS[tid])
    
    # Write Role Selection
    content_role = ROLE_SELECT.replace("{bg}", t["bg"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{role_box}", t["role_box"]).replace("{id}", tid)
    write_file(f"src/app/{tid}/onboarding/page.tsx", content_role)
    
    # Write Freelancer Form
    f_form = FORM.replace("{bg}", t["bg"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{btn}", t["btn"]).replace("{id}", tid)
    write_file(f"src/app/{tid}/onboarding/freelancer/page.tsx", f_form.replace("{role_name}", "Freelancer").replace("{field_2_label}", "Main Profession / Skill").replace("{field_2_ph}", "e.g. Software Developer").replace("{doc_req}", "Recent Bank Statement"))
    
    # Write Worker Form
    w_form = FORM.replace("{bg}", t["bg"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{btn}", t["btn"]).replace("{id}", tid)
    write_file(f"src/app/{tid}/onboarding/worker/page.tsx", w_form.replace("{role_name}", "Corporate Worker").replace("{field_2_label}", "Company Name").replace("{field_2_ph}", "e.g. Paystack").replace("{doc_req}", "Employment Letter & Payslip"))

    # Write Government Form
    g_form = FORM.replace("{bg}", t["bg"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{btn}", t["btn"]).replace("{id}", tid)
    write_file(f"src/app/{tid}/onboarding/government/page.tsx", g_form.replace("{role_name}", "Government Worker").replace("{field_2_label}", "Agency / MDA Name").replace("{field_2_ph}", "e.g. Ministry of Finance").replace("{doc_req}", "Government ID & Posting Letter"))

    # Write Dashboard (End of flow)
    dash = DASHBOARD.replace("{bg}", t["bg"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{id}", tid)
    write_file(f"src/app/{tid}/dashboard/page.tsx", dash)

print("SUCCESS: Full generation of 5 completely distinct flows completed.")
