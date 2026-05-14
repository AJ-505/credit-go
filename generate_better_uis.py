import os

# Helper to write files
def write_file(path, content):
    with open(path, "w") as f:
        f.write(content)

# Common SVG icons to avoid dependency issues
ICONS = {
    "mail": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    "lock": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    "briefcase": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    "building": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
    "user": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    "upload": '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
    "arrow_right": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    "check_circle": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
}

themes = {
    "1": {
        "name": "Linear Vibe",
        "layout": "min-h-screen bg-neutral-50 flex flex-col justify-center items-center p-4 font-sans text-neutral-900 selection:bg-black selection:text-white",
        "card": "w-full max-w-[440px] bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.05)] p-8 md:p-10",
        "input_wrapper": "relative group",
        "input": "w-full bg-white text-neutral-900 border border-neutral-200 rounded-lg px-4 py-3 pl-11 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900",
        "input_icon": "absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors",
        "btn": "w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]",
        "title": "text-2xl font-semibold tracking-tight text-neutral-900",
        "subtitle": "text-sm text-neutral-500 mt-2",
        "role_card": "flex items-start gap-4 p-5 rounded-xl border border-neutral-200 hover:border-neutral-900 hover:shadow-sm transition-all cursor-pointer bg-white group",
        "role_icon": "p-3 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors",
        "upload_zone": "mt-6 border-2 border-dashed border-neutral-200 rounded-xl p-10 flex flex-col items-center justify-center gap-4 hover:border-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer group",
    },
    "2": {
        "name": "Glassmorphism",
        "layout": "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center p-4 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden",
        "card": "w-full max-w-[440px] bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.07)] border border-white/80 p-8 md:p-10 relative z-10",
        "input_wrapper": "relative group",
        "input": "w-full bg-white/50 text-indigo-950 border border-white/60 rounded-2xl px-4 py-3.5 pl-11 outline-none transition-all placeholder:text-indigo-300 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 shadow-sm",
        "input_icon": "absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors",
        "btn": "w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-[0.98]",
        "title": "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600",
        "subtitle": "text-sm text-indigo-400/80 mt-2 font-medium",
        "role_card": "flex items-start gap-4 p-5 rounded-2xl border border-white bg-white/40 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group",
        "role_icon": "p-3 rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors shadow-sm",
        "upload_zone": "mt-6 border-2 border-dashed border-indigo-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-white/50 transition-all cursor-pointer group bg-white/30",
    },
    "3": {
        "name": "Dark Tech",
        "layout": "min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center p-4 font-mono text-zinc-100 selection:bg-emerald-500 selection:text-black",
        "card": "w-full max-w-[440px] bg-[#111] rounded-none border border-zinc-800 p-8 md:p-10 relative before:absolute before:inset-0 before:border before:border-emerald-500/20 before:pointer-events-none before:-m-1",
        "input_wrapper": "relative group",
        "input": "w-full bg-[#0a0a0a] text-zinc-100 border border-zinc-800 rounded-none px-4 py-3.5 pl-11 outline-none transition-all placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)]",
        "input_icon": "absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors",
        "btn": "w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-none transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98]",
        "title": "text-2xl font-bold tracking-tight text-zinc-100 uppercase",
        "subtitle": "text-sm text-zinc-500 mt-2",
        "role_card": "flex items-start gap-4 p-5 rounded-none border border-zinc-800 hover:border-emerald-500 hover:bg-[#1a1a1a] transition-all cursor-pointer bg-[#0a0a0a] group",
        "role_icon": "p-3 border border-zinc-800 text-zinc-500 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors",
        "upload_zone": "mt-6 border border-dashed border-zinc-700 bg-[#0a0a0a] rounded-none p-10 flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all cursor-pointer group",
    },
    "4": {
        "name": "Neobrutalist",
        "layout": "min-h-screen bg-[#FFE500] flex flex-col justify-center items-center p-4 font-sans text-black selection:bg-pink-500 selection:text-white",
        "card": "w-full max-w-[440px] bg-white rounded-none border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)]",
        "input_wrapper": "relative group",
        "input": "w-full bg-white text-black border-4 border-black rounded-none px-4 py-3.5 pl-12 outline-none transition-all placeholder:text-gray-500 focus:bg-pink-50 font-bold",
        "input_icon": "absolute left-4 top-1/2 -translate-y-1/2 text-black transition-colors",
        "btn": "w-full bg-pink-500 hover:bg-pink-400 text-black font-black uppercase tracking-wider py-4 rounded-none border-4 border-black transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        "title": "text-4xl font-black tracking-tighter text-black uppercase",
        "subtitle": "text-base font-bold text-gray-700 mt-2",
        "role_card": "flex items-start gap-4 p-5 border-4 border-black hover:bg-[#00E5FF] transition-all cursor-pointer bg-white group shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]",
        "role_icon": "p-2 border-2 border-black bg-white text-black transition-colors",
        "upload_zone": "mt-6 border-4 border-dashed border-black bg-white p-10 flex flex-col items-center justify-center gap-4 hover:bg-yellow-50 transition-all cursor-pointer group shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]",
    },
    "5": {
        "name": "Split Screen Premium",
        "layout": "min-h-screen bg-white flex font-serif text-slate-900 selection:bg-slate-200",
        "card": "w-full max-w-[440px] bg-white p-8 md:p-12 mx-auto flex flex-col justify-center h-full",
        "input_wrapper": "relative group pt-4",
        "input": "w-full bg-transparent text-slate-900 border-b border-slate-300 rounded-none px-0 py-2.5 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 font-sans",
        "input_icon": "hidden",
        "btn": "w-full bg-slate-900 hover:bg-black text-white font-sans font-medium uppercase tracking-widest text-sm py-4 rounded-none transition-all flex items-center justify-center gap-2 mt-4",
        "title": "text-4xl lg:text-5xl font-normal tracking-tight text-slate-900 mb-2",
        "subtitle": "text-lg text-slate-500 font-sans font-light",
        "role_card": "flex flex-col gap-2 p-6 border border-slate-200 hover:border-slate-900 transition-all cursor-pointer bg-white group font-sans text-center items-center justify-center",
        "role_icon": "text-slate-400 group-hover:text-slate-900 transition-colors mb-2",
        "upload_zone": "mt-6 border border-slate-200 bg-slate-50 p-12 flex flex-col items-center justify-center gap-4 hover:border-slate-900 transition-all cursor-pointer group font-sans",
    }
}

for theme_id, t in themes.items():
    
    # ROOT REDIRECT
    root_page = f"""import {{ redirect }} from 'next/navigation';

export default function RedirectPage() {{
  redirect('/{theme_id}/login');
}}
"""
    write_file(f"src/app/{theme_id}/page.tsx", root_page)

    # LOGIN
    split_left = f'<div className="hidden lg:flex w-1/2 bg-slate-900 p-16 flex-col justify-between text-white"><div className="text-2xl font-sans tracking-widest uppercase">CreditGo.</div><h2 className="text-6xl font-light leading-[1.1]">Elevate your<br/>financial identity.</h2><p className="font-sans text-slate-400">Secure. Fast. Trustworthy.</p></div>' if theme_id == '5' else ''
    layout_class = "flex-1 flex" if theme_id == '5' else t['layout']

    login_page = f"""import Link from 'next/link';

export default function Login{theme_id}() {{
  return (
    <div className="{t['layout']}">
      {split_left}
      <div className="{layout_class}">
        <div className="{t['card']}">
          <div className="mb-8">
            <h1 className="{t['title']}">Welcome back</h1>
            <p className="{t['subtitle']}">Enter your credentials to access your account.</p>
          </div>
          
          <form className="space-y-5" action="/{theme_id}/role">
            <div className="{t['input_wrapper']}">
              {t['input_icon'].replace('<svg', '<svg className="' + t['input_icon'].split('class="')[-1] if 'class="' in t['input_icon'] else t['input_icon'])}
              {ICONS['mail'].replace('<svg', '<svg className="'+t.get('input_icon', '')+'"') if theme_id != '5' else ''}
              <input type="email" placeholder="Email address" className="{t['input']}" required />
            </div>
            
            <div className="{t['input_wrapper']}">
              {ICONS['lock'].replace('<svg', '<svg className="'+t.get('input_icon', '')+'"') if theme_id != '5' else ''}
              <input type="password" placeholder="Password" className="{t['input']}" required />
            </div>
            
            <div className="flex items-center justify-between mt-2 font-sans">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-neutral-900" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium hover:underline text-gray-900">Forgot password?</a>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="{t['btn']}">
                Sign In {ICONS['arrow_right'].replace('<svg', '<svg className="w-5 h-5"')}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-center text-sm font-sans text-gray-500">
            Don't have an account? <Link href="/{theme_id}/signup" className="font-semibold text-gray-900 hover:underline decoration-2 underline-offset-4">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}}
"""
    write_file(f"src/app/{theme_id}/login/page.tsx", login_page)

    # SIGNUP
    signup_page = f"""import Link from 'next/link';

export default function Signup{theme_id}() {{
  return (
    <div className="{t['layout']}">
      {split_left.replace('Elevate your', 'Start building').replace('Welcome back', 'Create account')}
      <div className="{layout_class}">
        <div className="{t['card']}">
          <div className="mb-8">
            <h1 className="{t['title']}">Create account</h1>
            <p className="{t['subtitle']}">Start building your smart credit profile today.</p>
          </div>
          
          <form className="space-y-5" action="/{theme_id}/role">
            <div className="grid grid-cols-2 gap-4">
               <div className="{t['input_wrapper']}">
                 <input type="text" placeholder="First name" className="{t['input']}" style={{{{paddingLeft: '{'0' if theme_id == '5' else '1rem'}'}}}} required />
               </div>
               <div className="{t['input_wrapper']}">
                 <input type="text" placeholder="Last name" className="{t['input']}" style={{{{paddingLeft: '{'0' if theme_id == '5' else '1rem'}'}}}} required />
               </div>
            </div>

            <div className="{t['input_wrapper']}">
              {ICONS['mail'].replace('<svg', '<svg className="'+t.get('input_icon', '')+'"') if theme_id != '5' else ''}
              <input type="email" placeholder="Email address" className="{t['input']}" required />
            </div>
            
            <div className="{t['input_wrapper']}">
              {ICONS['lock'].replace('<svg', '<svg className="'+t.get('input_icon', '')+'"') if theme_id != '5' else ''}
              <input type="password" placeholder="Create password" className="{t['input']}" required />
            </div>
            
            <div className="pt-4">
              <button type="submit" className="{t['btn']}">
                Continue {ICONS['arrow_right'].replace('<svg', '<svg className="w-5 h-5"')}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-center text-sm font-sans text-gray-500">
            Already have an account? <Link href="/{theme_id}/login" className="font-semibold text-gray-900 hover:underline decoration-2 underline-offset-4">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}}
"""
    write_file(f"src/app/{theme_id}/signup/page.tsx", signup_page)

    # ROLE
    role_page = f"""import Link from 'next/link';

export default function Role{theme_id}() {{
  return (
    <div className="{t['layout']}">
      {split_left.replace('Elevate your', 'Tell us').replace('financial identity.', 'about your work.')}
      <div className="{layout_class}">
        <div className="{t['card'].replace('max-w-[440px]', 'max-w-[540px]')}">
          <div className="mb-8">
            <h1 className="{t['title']}">How do you earn?</h1>
            <p className="{t['subtitle']}">Select your primary employment type to tailor your credit scoring model.</p>
          </div>
          
          <div className="space-y-4 font-sans {'grid grid-cols-1 md:grid-cols-3 gap-4 space-y-0' if theme_id == '5' else ''}">
            
            <Link href="/{theme_id}/freelancer" className="{t['role_card']}">
              <div className="{t['role_icon']}">{ICONS['user']}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg {'text-slate-900' if theme_id=='5' else ''} mb-0.5 group-hover:underline decoration-2 underline-offset-2">Freelancer</h3>
                <p className="text-sm text-gray-500">Independent contractor, gig worker, or self-employed.</p>
              </div>
            </Link>

            <Link href="/{theme_id}/worker" className="{t['role_card']}">
              <div className="{t['role_icon']}">{ICONS['building']}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg {'text-slate-900' if theme_id=='5' else ''} mb-0.5 group-hover:underline decoration-2 underline-offset-2">Formal Worker</h3>
                <p className="text-sm text-gray-500">Employed by a registered private company.</p>
              </div>
            </Link>

            <Link href="/{theme_id}/worker" className="{t['role_card']}">
              <div className="{t['role_icon']}">{ICONS['briefcase']}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg {'text-slate-900' if theme_id=='5' else ''} mb-0.5 group-hover:underline decoration-2 underline-offset-2">Govt Officer</h3>
                <p className="text-sm text-gray-500">Employed by a local, state, or federal agency.</p>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}}
"""
    write_file(f"src/app/{theme_id}/role/page.tsx", role_page)

    # FREELANCER (Upload)
    freelancer_page = f"""
export default function Freelancer{theme_id}() {{
  return (
    <div className="{t['layout']}">
      {split_left.replace('Elevate your', 'Verify your').replace('financial identity.', 'income stream.')}
      <div className="{layout_class}">
        <div className="{t['card'].replace('max-w-[440px]', 'max-w-[500px]')}">
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-4 font-sans uppercase tracking-wider">Freelancer Setup</span>
            <h1 className="{t['title']}">Upload Statements</h1>
            <p className="{t['subtitle']}">We need 6 months of bank statements to build your trust score accurately using our AI model.</p>
          </div>
          
          <div className="{t['upload_zone']}">
            <div className="text-gray-400 group-hover:text-black transition-colors transform group-hover:-translate-y-1 group-hover:scale-110 duration-200">
              {ICONS['upload']}
            </div>
            <div className="text-center font-sans">
              <p className="font-semibold text-gray-900 text-lg">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-500 mt-1">PDF or CSV files (max 10MB)</p>
            </div>
          </div>
          
          <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-blue-50/50 border border-blue-100 font-sans">
            <div className="text-blue-500 mt-0.5">{ICONS['check_circle']}</div>
            <p className="text-sm text-blue-800 leading-relaxed">
              Your data is encrypted and securely processed. We do not store your raw banking files after generating your trust score.
            </p>
          </div>
          
          <div className="pt-6">
            <button className="{t['btn']}">Analyze Statements</button>
          </div>
        </div>
      </div>
    </div>
  );
}}
"""
    write_file(f"src/app/{theme_id}/freelancer/page.tsx", freelancer_page)

    # WORKER
    worker_page = f"""
export default function Worker{theme_id}() {{
  return (
    <div className="{t['layout']}">
      {split_left.replace('Elevate your', 'Verify your').replace('financial identity.', 'workplace.')}
      <div className="{layout_class}">
        <div className="{t['card']}">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-4 font-sans uppercase tracking-wider">Employee Setup</span>
            <h1 className="{t['title']}">Work Email</h1>
            <p className="{t['subtitle']}">Enter your company email address. We use your domain to automatically verify employment and tailor credit limits.</p>
          </div>
          
          <form className="space-y-6" action="#">
            <div className="{t['input_wrapper']}">
              {ICONS['mail'].replace('<svg', '<svg className="'+t.get('input_icon', '')+'"') if theme_id != '5' else ''}
              <input type="email" placeholder="you@company.com" className="{t['input']}" required />
            </div>
            
            <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 flex items-start space-x-3 font-sans mt-6">
              <div className="text-green-600 mt-0.5">{ICONS['check_circle']}</div>
              <p className="text-xs text-green-800 leading-relaxed font-medium">
                We'll send a magic link to this email. Click it to verify your employment status instantly.
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
    write_file(f"src/app/{theme_id}/worker/page.tsx", worker_page)

print("Generated deeply polished Next.js React UI structures.")
