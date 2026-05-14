import re

def update_file(filepath, new_content_block):
    with open(filepath, 'r') as f:
        content = f.read()

    # The block starts at `<div className="grid md:grid-cols-3 gap-12 relative">`
    # and ends at the `</div>` right before `</div>\n      </section>\n\n      {/* 5. TANGIBLE USE CASES */}`
    
    # We can use regex to find the whole grid block.
    # We look for the grid start, and replace everything until the end of the section container.
    
    pattern = r'<div className="grid md:grid-cols-3 gap-12 relative">.*?(?=</div>\n      </section>\n\n      {/\* 5\. TANGIBLE)'
    
    if not re.search(pattern, content, flags=re.DOTALL):
        print(f"Could not find target block in {filepath}")
        return
        
    updated_content = re.sub(pattern, new_content_block, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(updated_content)
    print(f"Updated {filepath}")


# Route 2: Stark vertical timeline
route2_replacement = """<div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Authenticate</h3>
                <p className="text-[#888]">Provide secure read-access to your financial nodes.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Compile</h3>
                <p className="text-[#888]">Our system generates your algorithmic trust metric.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-black text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-[#222] bg-black/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Execute</h3>
                <p className="text-[#888]">Route approved capital to your designated endpoints.</p>
              </div>
            </div>

          </div>"""

# Route 3: Sticky left header, vertical stack on right
# We also need to change the header div so it flows nicely
# We'll just replace the whole section inner for route 3 specifically in the bash script, but let's just do a wide horizontal scroll or flex wrap for simplicity in regex replacement.
route3_replacement = """<div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">01</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Ingest Data</h3>
                <p className="text-gray-400 text-lg">Sync your transaction history securely through our API.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gray-800">
                 <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">02</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Analyze Risk</h3>
                <p className="text-gray-400 text-lg">Our ML models assess your capacity and calculate limits.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gray-800">
                 <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#161b22] border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
              <div className="text-5xl font-black text-gray-800 dark:text-gray-700">03</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Unlock Tiers</h3>
                <p className="text-gray-400 text-lg">Access lenders matched precisely to your credit profile.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-500">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

          </div>"""

# Route 4: Minimalist massive numbers, wide rows
route4_replacement = """<div className="space-y-16 max-w-5xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">1</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Connect</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Link your everyday accounts with bank-grade security. We extract only the necessary data points to understand your financial flow.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">2</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Borrow</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Access your initial safe limit instantly. No hidden fees, no compounding traps. Just clear, upfront terms.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10 pt-16">
               <div className="col-span-1 md:col-span-3">
                  <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">3</span>
               </div>
               <div className="col-span-1 md:col-span-9">
                  <h3 className="text-3xl font-bold text-white mb-4">Expand</h3>
                  <p className="text-gray-400 text-xl max-w-2xl">Repay on time to automatically grow your capacity. It's that simple. Good behavior is immediately rewarded.</p>
               </div>
            </div>
          </div>"""

# Route 5: Overlapping Glass Cards
route5_replacement = """<div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto perspective-1000">
            
            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">1</div>
              <h3 className="text-3xl font-bold text-white mb-4">Link Identity</h3>
              <p className="text-gray-300 text-lg">Securely connect your financial data through our encrypted bridges.</p>
            </div>

            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40 md:mt-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">2</div>
              <h3 className="text-3xl font-bold text-white mb-4">Generate Score</h3>
              <p className="text-gray-300 text-lg">Receive your algorithmic trust rating within seconds of connection.</p>
            </div>

            <div className="flex-1 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-md shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:border-white/40 md:mt-24">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 shadow-inner">3</div>
              <h3 className="text-3xl font-bold text-white mb-4">Access Funds</h3>
              <p className="text-gray-300 text-lg">Unlock capital instantly across our verified lender ecosystem.</p>
            </div>

          </div>"""

update_file('src/app/2/page.tsx', route2_replacement)
update_file('src/app/3/page.tsx', route3_replacement)
update_file('src/app/4/page.tsx', route4_replacement)
update_file('src/app/5/page.tsx', route5_replacement)
