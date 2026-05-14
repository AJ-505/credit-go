import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 p-6 font-sans flex items-center justify-center">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-8 md:p-12">
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Score Column */}
          <div className="md:w-1/3 text-center border-r border-black/10 dark:border-white/10 pr-0 md:pr-12">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-xl font-bold text-white mb-2">Trust Score</h2>
            <p className="text-gray-400 text-sm mb-8">AI-Synthesized Profile</p>
            
            <div className="inline-block p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full">
              <p className="text-5xl font-black text-white">785</p>
              <p className="text-emerald-500 font-bold mt-3 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Excellent Profile
              </p>
            </div>
          </div>
          
          {/* Details Column */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-white mb-3">Welcome to CreditGo.</h1>
            <p className="text-gray-400 mb-10 leading-relaxed">Your financial footprint has been securely analyzed. By maintaining your positive repayment habits, these limits will automatically scale upward.</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Available Capacity</p>
                <p className="text-2xl font-bold text-white">₦250,000</p>
              </div>
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Current Tier</p>
                <p className="text-2xl font-bold text-white">Tier 1 (Premium)</p>
              </div>
            </div>

            <h3 className="font-bold text-white mb-4 text-lg">Curated Opportunities</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 dark:border-white/10">
                <span className="font-medium text-white">💻 Equipment Financing (0% down)</span>
                <button className="text-emerald-500 font-bold text-sm hover:underline">Apply</button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 dark:border-white/10">
                <span className="font-medium text-white">☀️ Solar Installment Plan</span>
                <button className="text-emerald-500 font-bold text-sm hover:underline">Apply</button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 text-right">
               <Link href="/3" className="text-gray-400 hover:opacity-70 font-medium text-sm">Return to Home</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
