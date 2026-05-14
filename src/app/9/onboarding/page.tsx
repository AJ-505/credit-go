import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg max-w-3xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/9" className="text-gray-500 hover:opacity-70 mb-6 inline-block text-sm font-medium">← Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How do you earn?</h1>
          <p className="text-gray-500">We customize your profiling to ensure the most accurate trust score.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/9/onboarding/freelancer" className="block h-full">
            <div className="bg-white border-gray-200 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Freelancer</h3>
              <p className="text-gray-500 text-sm">Independent creator or gig worker</p>
            </div>
          </Link>
          
          <Link href="/9/onboarding/worker" className="block h-full">
            <div className="bg-white border-gray-200 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Corporate</h3>
              <p className="text-gray-500 text-sm">Full-time employee at a registered company</p>
            </div>
          </Link>

          <Link href="/9/onboarding/government" className="block h-full">
            <div className="bg-white border-gray-200 hover:border-indigo-500 rounded-lg shadow-sm hover:shadow p-6 h-full flex flex-col items-center text-center transition-all group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🏛️</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Government</h3>
              <p className="text-gray-500 text-sm">Public sector or civil service employee</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
