import Link from 'next/link';

export default function OnboardingForm() {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="bg-[#111] p-8 max-w-2xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/4/onboarding" className="text-gray-400 hover:opacity-70 mb-6 inline-block text-sm font-medium">← Back</Link>
          <h1 className="text-3xl font-bold text-white mb-3">Freelancer Profile</h1>
          <p className="text-gray-400">Securely provide your details to calculate your initial score.</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-2">Legal Full Name</label>
              <input type="text" placeholder="John Doe" className="bg-transparent border-b-2 border-gray-800 focus:border-[#0061FE] text-white text-xl rounded-none w-full p-3 border outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-2">BVN (Encrypted)</label>
              <input type="text" placeholder="22*********" className="bg-transparent border-b-2 border-gray-800 focus:border-[#0061FE] text-white text-xl rounded-none w-full p-3 border outline-none transition-all" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2">Primary Skill / Profession</label>
            <input type="text" placeholder="e.g. Graphic Designer" className="bg-transparent border-b-2 border-gray-800 focus:border-[#0061FE] text-white text-xl rounded-none w-full p-3 border outline-none transition-all" />
          </div>

          <div className="p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <h3 className="font-bold text-white mb-2">Connect Financial History</h3>
            <p className="text-gray-400 text-sm mb-4">Privately link your transaction history. We only extract the necessary trust signals to build your score.</p>
            <button type="button" className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md text-sm transition-opacity hover:opacity-80">
              Link via Open Banking
            </button>
          </div>

          <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-8 text-center transition-colors cursor-pointer hover:border-emerald-500 bg-transparent">
            <div className="text-3xl mb-3 opacity-80">📄</div>
            <p className="font-medium text-white">Upload Utility Bill or Bank Statement</p>
            <p className="text-sm text-gray-400 mt-1">PDF or Image (Max 5MB)</p>
          </div>

          <Link href="/4/dashboard" className="block pt-6">
            <button type="button" className="bg-[#0061FE] text-white hover:bg-[#0050d0] rounded-full w-full py-4 text-lg font-bold transition-all text-center">
              Generate Trust Score
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
