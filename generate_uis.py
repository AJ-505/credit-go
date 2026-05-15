import os

themes = {
    "1": {
        "name": "Minimal Corporate",
        "bg": "bg-slate-50",
        "card": "bg-white shadow-sm border border-slate-200 rounded-lg p-8",
        "input": "w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all",
        "btn": "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors",
        "text_primary": "text-slate-900",
        "text_secondary": "text-slate-500",
        "accent": "text-blue-600",
        "layout": "flex items-center justify-center min-h-screen"
    },
    "2": {
        "name": "Playful Fintech",
        "bg": "bg-indigo-50",
        "card": "bg-white shadow-xl shadow-indigo-100 rounded-3xl p-10",
        "input": "w-full bg-slate-50 border-2 border-transparent focus:border-indigo-400 rounded-xl px-5 py-3 outline-none transition-all font-medium text-slate-700",
        "btn": "w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        "text_primary": "text-indigo-950",
        "text_secondary": "text-indigo-400",
        "accent": "text-purple-600",
        "layout": "flex items-center justify-center min-h-screen relative overflow-hidden"
    },
    "3": {
        "name": "Dark Hacker",
        "bg": "bg-zinc-950 text-white",
        "card": "bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl",
        "input": "w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-lg px-4 py-3 outline-none text-white transition-colors focus:shadow-[0_0_10px_rgba(16,185,129,0.2)]",
        "btn": "w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]",
        "text_primary": "text-zinc-100",
        "text_secondary": "text-zinc-500",
        "accent": "text-emerald-400",
        "layout": "flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black"
    },
    "4": {
        "name": "Neobrutalism",
        "bg": "bg-yellow-400",
        "card": "bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]",
        "input": "w-full bg-white border-4 border-black rounded-none px-4 py-3 outline-none font-bold text-black focus:bg-pink-50 transition-colors placeholder-gray-500",
        "btn": "w-full bg-pink-500 hover:bg-pink-400 text-white font-black text-lg py-3 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all",
        "text_primary": "text-black uppercase font-black tracking-tight",
        "text_secondary": "text-black font-bold",
        "accent": "text-blue-700 underline decoration-4 underline-offset-4",
        "layout": "flex items-center justify-center min-h-screen font-mono"
    },
    "5": {
        "name": "Split Screen Premium",
        "bg": "bg-stone-50",
        "card": "bg-white w-full max-w-md mx-auto",
        "input": "w-full bg-transparent border-b-2 border-stone-200 focus:border-stone-800 px-0 py-2 outline-none text-stone-900 transition-colors rounded-none placeholder-stone-400",
        "btn": "w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 uppercase tracking-widest text-sm transition-colors",
        "text_primary": "text-stone-900 font-serif",
        "text_secondary": "text-stone-500",
        "accent": "text-stone-900 font-semibold",
        "layout": "flex min-h-screen"
    }
}

routes = ["login", "signup", "role", "freelancer", "worker"]

for theme_id, t in themes.items():
    # Base layout/page (redirects to login)
    layout_content = f"""
import Link from 'next/link';

export default function Theme{theme_id}Page() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      <div className="{t['card']} max-w-md w-full text-center">
        <h1 className="text-3xl font-bold {t['text_primary']} mb-4">CreditGo</h1>
        <p className="{t['text_secondary']} mb-8">Welcome to the {t['name']} experience.</p>
        <Link href="/{theme_id}/login" className="{t['btn']} inline-block text-center">
          Get Started
        </Link>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/page.tsx", "w") as f:
        f.write(layout_content)
        
    # Login
    login_content = f"""
import Link from 'next/link';

export default function Login{theme_id}() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      {f'<div className="hidden lg:flex w-1/2 bg-stone-900 items-center justify-center p-12 text-white"><h2 className="text-5xl font-serif leading-tight">Empowering your financial future.</h2></div>' if theme_id == '5' else ''}
      <div className="{'w-full lg:w-1/2 flex items-center justify-center' if theme_id == '5' else 'w-full'}">
          <div className="{t['card']} max-w-md w-full">
            <h1 className="text-3xl font-bold {t['text_primary']} mb-2">Welcome Back</h1>
            <p className="{t['text_secondary']} mb-8">Sign in to your account</p>
            
            <form className="space-y-5" action="/{theme_id}/role">
              <div>
                <label className="block text-sm font-medium {t['text_primary']} mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="{t['input']}" required />
              </div>
              <div>
                <label className="block text-sm font-medium {t['text_primary']} mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="{t['input']}" required />
              </div>
              
              <div className="pt-2">
                <button type="submit" className="{t['btn']}">Sign In</button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm {t['text_secondary']}">
              Don't have an account? <Link href="/{theme_id}/signup" className="{t['accent']} hover:underline">Sign up</Link>
            </p>
          </div>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/login/page.tsx", "w") as f:
        f.write(login_content)

    # Signup
    signup_content = f"""
import Link from 'next/link';

export default function Signup{theme_id}() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      {f'<div className="hidden lg:flex w-1/2 bg-stone-900 items-center justify-center p-12 text-white"><h2 className="text-5xl font-serif leading-tight">Join the new era of credit.</h2></div>' if theme_id == '5' else ''}
      <div className="{'w-full lg:w-1/2 flex items-center justify-center' if theme_id == '5' else 'w-full'}">
          <div className="{t['card']} max-w-md w-full">
            <h1 className="text-3xl font-bold {t['text_primary']} mb-2">Create Account</h1>
            <p className="{t['text_secondary']} mb-8">Get started with CreditGo</p>
            
            <form className="space-y-5" action="/{theme_id}/role">
              <div>
                <label className="block text-sm font-medium {t['text_primary']} mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="{t['input']}" required />
              </div>
              <div>
                <label className="block text-sm font-medium {t['text_primary']} mb-1">Password</label>
                <input type="password" placeholder="Create a password" className="{t['input']}" required />
              </div>
              
              <div className="pt-2">
                <button type="submit" className="{t['btn']}">Sign Up</button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm {t['text_secondary']}">
              Already have an account? <Link href="/{theme_id}/login" className="{t['accent']} hover:underline">Log in</Link>
            </p>
          </div>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/signup/page.tsx", "w") as f:
        f.write(signup_content)

    # Role Selection
    role_content = f"""
import Link from 'next/link';

export default function Role{theme_id}() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      {f'<div className="hidden lg:flex w-1/2 bg-stone-900 items-center justify-center p-12 text-white"><h2 className="text-5xl font-serif leading-tight">Tell us about your work.</h2></div>' if theme_id == '5' else ''}
      <div className="{'w-full lg:w-1/2 flex items-center justify-center' if theme_id == '5' else 'w-full'}">
          <div className="{t['card']} max-w-lg w-full">
            <h1 className="text-3xl font-bold {t['text_primary']} mb-2">Who are you?</h1>
            <p className="{t['text_secondary']} mb-8">Select your employment type to personalize your experience.</p>
            
            <div className="space-y-4">
              <Link href="/{theme_id}/freelancer" className="block w-full text-left p-6 border-2 border-transparent {t['input'].replace('w-full', '')} hover:border-blue-500 bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer group">
                <h3 className="text-lg font-bold {t['text_primary']} group-hover:{t['accent']} mb-1">Freelancer</h3>
                <p className="text-sm {t['text_secondary']}">Independent contractor, gig worker, or self-employed.</p>
              </Link>
              
              <Link href="/{theme_id}/worker" className="block w-full text-left p-6 border-2 border-transparent {t['input'].replace('w-full', '')} hover:border-blue-500 bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer group">
                <h3 className="text-lg font-bold {t['text_primary']} group-hover:{t['accent']} mb-1">Government Officer</h3>
                <p className="text-sm {t['text_secondary']}">Employed by a local, state, or federal government agency.</p>
              </Link>

              <Link href="/{theme_id}/worker" className="block w-full text-left p-6 border-2 border-transparent {t['input'].replace('w-full', '')} hover:border-blue-500 bg-opacity-50 hover:bg-opacity-100 transition-all cursor-pointer group">
                <h3 className="text-lg font-bold {t['text_primary']} group-hover:{t['accent']} mb-1">Formal Worker</h3>
                <p className="text-sm {t['text_secondary']}">Employed by a registered private company.</p>
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/role/page.tsx", "w") as f:
        f.write(role_content)

    # Freelancer Upload
    freelancer_content = f"""
export default function Freelancer{theme_id}() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      {f'<div className="hidden lg:flex w-1/2 bg-stone-900 items-center justify-center p-12 text-white"><h2 className="text-5xl font-serif leading-tight">Verify your income.</h2></div>' if theme_id == '5' else ''}
      <div className="{'w-full lg:w-1/2 flex items-center justify-center' if theme_id == '5' else 'w-full'}">
          <div className="{t['card']} max-w-md w-full">
            <h1 className="text-3xl font-bold {t['text_primary']} mb-2">Upload Bank Statement</h1>
            <p className="{t['text_secondary']} mb-8">As a freelancer, we need 6 months of bank statements to build your trust score.</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mb-8 hover:bg-black/5 hover:border-gray-400 transition-colors cursor-pointer">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-medium {t['text_primary']}">Click to upload or drag and drop</p>
              <p className="text-xs {t['text_secondary']} mt-1">PDF up to 10MB</p>
            </div>
            
            <button className="{t['btn']}">Submit Documents</button>
          </div>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/freelancer/page.tsx", "w") as f:
        f.write(freelancer_content)

    # Worker Verify
    worker_content = f"""
export default function Worker{theme_id}() {{
  return (
    <div className="{t['layout']} {t['bg']} p-4">
      {f'<div className="hidden lg:flex w-1/2 bg-stone-900 items-center justify-center p-12 text-white"><h2 className="text-5xl font-serif leading-tight">Verify your workplace.</h2></div>' if theme_id == '5' else ''}
      <div className="{'w-full lg:w-1/2 flex items-center justify-center' if theme_id == '5' else 'w-full'}">
          <div className="{t['card']} max-w-md w-full">
            <h1 className="text-3xl font-bold {t['text_primary']} mb-2">Work Email Verification</h1>
            <p className="{t['text_secondary']} mb-8">Enter your work email address. We'll use your company domain to automatically tailor your credit options.</p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium {t['text_primary']} mb-1">Work Email</label>
                <input type="email" placeholder="you@company.com" className="{t['input']}" required />
              </div>
              
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-800 leading-relaxed">
                  We will send a verification link to this email. Your domain helps us instantly verify your employment status.
                </p>
              </div>
              
              <button type="submit" className="{t['btn']}">Send Verification Link</button>
            </form>
          </div>
      </div>
    </div>
  );
}}
"""
    with open(f"src/app/{theme_id}/worker/page.tsx", "w") as f:
        f.write(worker_content)

print("Generated all UI variations successfully.")
