import os
import shutil

# Remove old versions to avoid conflicts
for i in range(1, 6):
    path = f"src/app/{i}"
    if os.path.exists(path):
        shutil.rmtree(path)

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# --- SVG ICONS ---
SVG_ARROW_RIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
SVG_BRIEFCASE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
SVG_BUILDING = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>'
SVG_USER = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
SVG_UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>'

# --- THEMES ---
# 1 = OpenClaw (Dark, Glowing Red)
# 2 = T3 (Dark, Grid, Monochrome)
# 3 = CodeRabbit (Dark Gray, Orange)
# 4 = Dropbox (Pure Black, Blue)
# 5 = Aceternity (Black, Glowing White/Glass)

themes = {
    "1": {
        "bg": "min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center p-6 font-sans relative overflow-hidden",
        "bg_extra": '<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>',
        "card": "w-full max-w-md bg-[#111113]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10",
        "title": "text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent",
        "subtitle": "text-stone-400 mt-2 text-sm",
        "input": "w-full bg-[#1a1a1e] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all",
        "btn": "w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 mt-6",
        "role_card": "flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-[#1a1a1e] hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer group",
        "role_icon": "p-3 rounded-xl bg-white/5 text-stone-400 group-hover:text-red-400 transition-colors",
        "upload_zone": "mt-6 border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center gap-4 hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-pointer bg-[#1a1a1e]",
    },
    "2": {
        "bg": "min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center p-6 font-sans relative",
        "bg_extra": '<div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>',
        "card": "w-full max-w-md bg-black border border-[#222] rounded-2xl p-8 shadow-2xl relative z-10",
        "title": "text-4xl font-black tracking-tight",
        "subtitle": "text-stone-400 mt-2 font-medium",
        "input": "w-full bg-[#111] text-white border border-[#333] rounded-lg px-4 py-3 outline-none focus:border-white transition-all font-mono text-sm",
        "btn": "w-full bg-white text-black font-bold py-3.5 rounded-lg transition-all hover:bg-stone-200 flex justify-center items-center gap-2 mt-6",
        "role_card": "flex items-start gap-4 p-5 rounded-lg border border-[#222] bg-[#0a0a0a] hover:border-white transition-all cursor-pointer group",
        "role_icon": "p-3 rounded bg-[#111] text-stone-500 group-hover:text-white transition-colors",
        "upload_zone": "mt-6 border border-dashed border-[#444] rounded-lg p-10 flex flex-col items-center gap-4 hover:border-white transition-all cursor-pointer bg-[#0a0a0a]",
    },
    "3": {
        "bg": "min-h-screen bg-[#141518] text-gray-200 flex flex-col justify-center items-center p-6 font-sans relative",
        "bg_extra": '<div className="absolute top-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>',
        "card": "w-full max-w-md bg-[#1d1f23] border border-gray-800 rounded-lg p-8 shadow-xl relative z-10",
        "title": "text-2xl font-bold text-white",
        "subtitle": "text-gray-400 mt-2 text-sm font-mono",
        "input": "w-full bg-[#141518] text-white border border-gray-700 rounded px-4 py-3 outline-none focus:border-orange-500 transition-all",
        "btn": "w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded transition-all flex justify-center items-center gap-2 mt-6",
        "role_card": "flex items-start gap-4 p-5 rounded border border-gray-800 bg-[#141518] hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all cursor-pointer group",
        "role_icon": "p-3 rounded bg-gray-800 text-gray-400 group-hover:text-orange-500 transition-colors",
        "upload_zone": "mt-6 border-2 border-dashed border-gray-700 rounded p-10 flex flex-col items-center gap-4 hover:border-orange-500 bg-[#141518] transition-all cursor-pointer",
    },
    "4": {
        "bg": "min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 font-sans",
        "bg_extra": "",
        "card": "w-full max-w-lg bg-black p-8 md:p-12 relative z-10",
        "title": "text-5xl font-bold tracking-tight mb-4",
        "subtitle": "text-xl text-gray-400 mt-2",
        "input": "w-full bg-[#111] text-white border-b-2 border-gray-800 px-0 py-4 outline-none focus:border-[#0061FE] transition-all text-lg placeholder:text-gray-600",
        "btn": "w-full bg-[#0061FE] hover:bg-[#0050d0] text-white font-semibold py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-lg mt-8",
        "role_card": "flex flex-col gap-4 p-8 rounded-[2rem] bg-[#111] hover:bg-[#1a1a1a] transition-all cursor-pointer group",
        "role_icon": "p-4 rounded-full bg-black text-white w-16 h-16 flex items-center justify-center group-hover:bg-[#0061FE] transition-colors",
        "upload_zone": "mt-8 border-2 border-dashed border-gray-800 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-[#0061FE] transition-all cursor-pointer bg-[#0a0a0a]",
    },
    "5": {
        "bg": "min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 font-sans relative",
        "bg_extra": '<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>',
        "card": "w-full max-w-md bg-black/50 border border-white/10 rounded-xl p-8 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.03)] relative z-10",
        "title": "text-2xl font-medium tracking-wide",
        "subtitle": "text-gray-500 mt-2 text-sm",
        "input": "w-full bg-transparent text-white border border-white/10 rounded-md px-4 py-3 outline-none focus:border-white/50 transition-all",
        "btn": "w-full bg-white text-black hover:bg-gray-200 font-medium py-3 rounded-md transition-all flex justify-center items-center gap-2 mt-6",
        "role_card": "flex items-center gap-4 p-4 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer group",
        "role_icon": "p-2 rounded bg-white/10 text-gray-300 group-hover:text-white transition-colors",
        "upload_zone": "mt-6 border border-dashed border-white/20 rounded-md p-10 flex flex-col items-center gap-4 hover:bg-white/[0.02] transition-all cursor-pointer",
    }
}

PAGE_TEMPLATE = """
import Link from 'next/link';
import React from 'react';

export default function Page() {{
  return (
    <div className="{bg}">
      {bg_extra}
      <div className="{card}">
        <div className="mb-8">
          <h1 className="{title}">Get Started</h1>
          <p className="{subtitle}">Sign in to access your credit intelligence platform.</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <input type="email" placeholder="Email address" className="{input}" />
          </div>
          <div>
            <input type="password" placeholder="Password" className="{input}" />
          </div>
          <Link href="/{id}/role" className="block mt-6">
            <button type="button" className="{btn}">
              Continue {SVG_ARROW_RIGHT}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}}
"""

ROLE_TEMPLATE = """
import Link from 'next/link';
import React from 'react';

export default function RoleSelection() {{
  return (
    <div className="{bg}">
      {bg_extra}
      <div className="{card}" style={{{{ maxWidth: '600px' }}}}>
        <div className="mb-8">
          <h1 className="{title}">Select your profile</h1>
          <p className="{subtitle}">We tailor your credit journey based on your employment.</p>
        </div>
        
        <div className="grid gap-4">
          <Link href="/{id}/freelancer">
            <div className="{role_card}">
              <div className="{role_icon}">{SVG_USER}</div>
              <div>
                <h3 className="text-white font-bold">Freelancer</h3>
                <p className="text-stone-400 text-sm mt-1">Independent professional or creator</p>
              </div>
            </div>
          </Link>
          <Link href="/{id}/worker">
            <div className="{role_card}">
              <div className="{role_icon}">{SVG_BRIEFCASE}</div>
              <div>
                <h3 className="text-white font-bold">Corporate Worker</h3>
                <p className="text-stone-400 text-sm mt-1">Employed at a registered company</p>
              </div>
            </div>
          </Link>
          <Link href="/{id}/government">
            <div className="{role_card}">
              <div className="{role_icon}">{SVG_BUILDING}</div>
              <div>
                <h3 className="text-white font-bold">Government Worker</h3>
                <p className="text-stone-400 text-sm mt-1">Public sector employee</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}}
"""

WORKER_TEMPLATE = """
import Link from 'next/link';
import React from 'react';

export default function DataCollection() {{
  return (
    <div className="{bg}">
      {bg_extra}
      <div className="{card}" style={{{{ maxWidth: '600px' }}}}>
        <div className="mb-8 flex items-center gap-4">
          <Link href="/{id}/role" className="text-stone-500 hover:text-white transition-colors">← Back</Link>
          <div>
            <h1 className="{title}">{role_name} Onboarding</h1>
            <p className="{subtitle}">Please provide your details to calculate your trust score.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="{input}" />
          <input type="text" placeholder="{company_placeholder}" className="{input}" />
          <input type="text" placeholder="Monthly Income / Revenue (NGN)" className="{input}" />
          
          <div className="{upload_zone}">
            <div className="text-stone-400">{SVG_UPLOAD}</div>
            <div className="text-center">
              <p className="text-white font-medium">Upload {doc_type}</p>
              <p className="text-stone-500 text-sm mt-1">PDF, JPG or PNG (max. 10MB)</p>
            </div>
          </div>
          
          <button className="{btn} mt-6">
            Submit & Generate Score
          </button>
        </div>
      </div>
    </div>
  );
}}
"""

for tid, t in themes.items():
    write_file(f"src/app/{tid}/page.tsx", PAGE_TEMPLATE.replace("{bg}", t["bg"]).replace("{bg_extra}", t["bg_extra"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{btn}", t["btn"]).replace("{id}", tid).replace("{SVG_ARROW_RIGHT}", SVG_ARROW_RIGHT))
    
    write_file(f"src/app/{tid}/role/page.tsx", ROLE_TEMPLATE.replace("{bg}", t["bg"]).replace("{bg_extra}", t["bg_extra"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{role_card}", t["role_card"]).replace("{role_icon}", t["role_icon"]).replace("{id}", tid).replace("{SVG_USER}", SVG_USER).replace("{SVG_BRIEFCASE}", SVG_BRIEFCASE).replace("{SVG_BUILDING}", SVG_BUILDING))
    
    write_file(f"src/app/{tid}/freelancer/page.tsx", WORKER_TEMPLATE.replace("{bg}", t["bg"]).replace("{bg_extra}", t["bg_extra"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{upload_zone}", t["upload_zone"]).replace("{btn}", t["btn"]).replace("{id}", tid).replace("{role_name}", "Freelancer").replace("{company_placeholder}", "Business Name (Optional)").replace("{doc_type}", "Recent Bank Statement").replace("{SVG_UPLOAD}", SVG_UPLOAD))
    
    write_file(f"src/app/{tid}/worker/page.tsx", WORKER_TEMPLATE.replace("{bg}", t["bg"]).replace("{bg_extra}", t["bg_extra"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{upload_zone}", t["upload_zone"]).replace("{btn}", t["btn"]).replace("{id}", tid).replace("{role_name}", "Corporate Worker").replace("{company_placeholder}", "Employer Name").replace("{doc_type}", "Employment Letter & Payslip").replace("{SVG_UPLOAD}", SVG_UPLOAD))
    
    write_file(f"src/app/{tid}/government/page.tsx", WORKER_TEMPLATE.replace("{bg}", t["bg"]).replace("{bg_extra}", t["bg_extra"]).replace("{card}", t["card"]).replace("{title}", t["title"]).replace("{subtitle}", t["subtitle"]).replace("{input}", t["input"]).replace("{upload_zone}", t["upload_zone"]).replace("{btn}", t["btn"]).replace("{id}", tid).replace("{role_name}", "Government Worker").replace("{company_placeholder}", "MDA / Agency Name").replace("{doc_type}", "Government ID & Payslip").replace("{SVG_UPLOAD}", SVG_UPLOAD))

print("Regenerated absolutely beautiful, class-leak-free UI variants.")
