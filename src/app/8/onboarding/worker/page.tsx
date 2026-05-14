import Link from 'next/link';

export default function OnboardingForm() {
  return (
    <div className="min-h-screen bg-[#fff9e6] text-[#0f172a] p-6 font-sans">
      <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] max-w-2xl mx-auto mt-12 p-8 md:p-12">
        <div className="mb-10">
          <Link href="/8/onboarding" className="text-slate-600 hover:opacity-70 mb-6 inline-block text-sm font-medium">← Back</Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Corporate Worker Profile</h1>
          <p className="text-slate-600">Securely provide your details to calculate your initial score.</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">Legal Full Name</label>
              <input type="text" placeholder="John Doe" className="bg-[#f8fafc] border-4 border-slate-200 focus:border-[#8b5cf6] text-slate-900 rounded-xl font-bold p-4 w-full p-3 border outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2">BVN (Encrypted)</label>
              <input type="text" placeholder="22*********" className="bg-[#f8fafc] border-4 border-slate-200 focus:border-[#8b5cf6] text-slate-900 rounded-xl font-bold p-4 w-full p-3 border outline-none transition-all" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-bold text-slate-600 block mb-2">Employer Name</label>
            <input type="text" placeholder="e.g. Paystack" className="bg-[#f8fafc] border-4 border-slate-200 focus:border-[#8b5cf6] text-slate-900 rounded-xl font-bold p-4 w-full p-3 border outline-none transition-all" />
          </div>

          <div className="p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <h3 className="font-bold text-slate-900 mb-2">Connect Financial History</h3>
            <p className="text-slate-600 text-sm mb-4">Privately link your transaction history. We only extract the necessary trust signals to build your score.</p>
            <button type="button" className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md text-sm transition-opacity hover:opacity-80">
              Link via Open Banking
            </button>
          </div>

          <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-8 text-center transition-colors cursor-pointer hover:border-emerald-500 bg-transparent">
            <div className="text-3xl mb-3 opacity-80">📄</div>
            <p className="font-medium text-slate-900">Upload Employment Letter & Payslip</p>
            <p className="text-sm text-slate-600 mt-1">PDF or Image (Max 5MB)</p>
          </div>

          <Link href="/8/dashboard" className="block pt-6">
            <button type="button" className="bg-[#10b981] text-slate-900 font-black hover:bg-[#059669] rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1 transition-all text-xl w-full py-4 text-lg font-bold transition-all text-center">
              Generate Trust Score
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
