import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 font-sans">
      <div className="bg-[#111113]/90 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl max-w-3xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/1" className="text-stone-400 hover:opacity-70 mb-6 inline-block text-sm font-medium">← Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">How do you earn?</h1>
          <p className="text-stone-400">We customize your profiling to ensure the most accurate trust score.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/1/onboarding/freelancer" className="block h-full">
            <div className="bg-[#1a1a1e] border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="font-bold text-white mb-2 text-lg">Freelancer</h3>
              <p className="text-stone-400 text-sm">Independent creator or gig worker</p>
            </div>
          </Link>
          
          <Link href="/1/onboarding/worker" className="block h-full">
            <div className="bg-[#1a1a1e] border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="font-bold text-white mb-2 text-lg">Corporate</h3>
              <p className="text-stone-400 text-sm">Full-time employee at a registered company</p>
            </div>
          </Link>

          <Link href="/1/onboarding/government" className="block h-full">
            <div className="bg-[#1a1a1e] border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
              <h3 className="font-bold text-white mb-2 text-lg">Government</h3>
              <p className="text-stone-400 text-sm">Public sector or civil service employee</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
