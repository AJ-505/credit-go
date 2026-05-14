import re

def update_file(filepath, new_content_block):
    with open(filepath, 'r') as f:
        content = f.read()

    # Match the entire step section div block in light mode
    # In light mode, it might have slightly different text or container, so let's match the start grid
    pattern = r'<div className="grid md:grid-cols-3 gap-12 relative">.*?(?=</div>\n      </section>\n\n      {/\* 5\. TANGIBLE)'
    
    if not re.search(pattern, content, flags=re.DOTALL):
        print(f"Could not find target block in {filepath}")
        return
        
    updated_content = re.sub(pattern, new_content_block, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(updated_content)
    print(f"Updated {filepath}")

# Route 7 (Brutalist Light) - Vertical stark timeline
route7_replacement = """<div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-black/20">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-white text-black font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Authenticate</h3>
                <p className="text-gray-600 font-medium">Provide secure read-access to your financial nodes.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-[#ff3366] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Compile</h3>
                <p className="text-gray-600 font-medium">Our system generates your algorithmic trust metric.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-black bg-[#00cc99] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Execute</h3>
                <p className="text-gray-600 font-medium">Route approved capital to your designated endpoints.</p>
              </div>
            </div>

          </div>"""

# Route 8 (Warm/Soft Light) - Overlapping clean cards
route8_replacement = """<div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
            
            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">1</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Link Identity</h3>
              <p className="text-slate-500 text-lg">Securely connect your financial data through our encrypted bridges.</p>
            </div>

            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2 md:mt-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">2</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Generate Score</h3>
              <p className="text-slate-500 text-lg">Receive your algorithmic trust rating within seconds of connection.</p>
            </div>

            <div className="flex-1 bg-white border border-orange-100 rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(251,146,60,0.15)] transform transition duration-500 hover:-translate-y-2 md:mt-16">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl font-bold text-orange-600 mb-8">3</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Access Funds</h3>
              <p className="text-slate-500 text-lg">Unlock capital instantly across our verified lender ecosystem.</p>
            </div>

          </div>"""

# Route 9 (Modern Enterprise Light) - Horizontal stack / list
route9_replacement = """<div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl font-black text-indigo-100">01</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ingest Data</h3>
                <p className="text-gray-600 text-lg">Sync your transaction history securely through our API.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center border border-indigo-100">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl font-black text-indigo-100">02</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyze Risk</h3>
                <p className="text-gray-600 text-lg">Our ML models assess your capacity and calculate limits.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center border border-indigo-100">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-indigo-600 border border-indigo-700 rounded-2xl shadow-lg transform md:scale-105">
              <div className="text-5xl font-black text-indigo-400/50">03</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Unlock Tiers</h3>
                <p className="text-indigo-100 text-lg">Access lenders matched precisely to your credit profile.</p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center border border-white/20 text-white">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

          </div>"""

# Route 10 (High-End Minimal Light) - Massive numbers
route10_replacement = """<div className="space-y-16 max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">1</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Connect</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Link your everyday accounts with bank-grade security. We extract only the necessary data points to understand your financial flow.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">2</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Borrow</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Access your initial safe limit instantly. No hidden fees, no compounding traps. Just clear, upfront terms.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-black/5 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-[10rem] leading-none font-black text-gray-100 tracking-tighter">3</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-black mb-4">Expand</h3>
                  <p className="text-gray-500 text-xl max-w-2xl font-light">Repay on time to automatically grow your capacity. It's that simple. Good behavior is immediately rewarded.</p>
               </div>
            </div>
          </div>"""

update_file('src/app/7/page.tsx', route7_replacement)
update_file('src/app/8/page.tsx', route8_replacement)
update_file('src/app/9/page.tsx', route9_replacement)
update_file('src/app/10/page.tsx', route10_replacement)
