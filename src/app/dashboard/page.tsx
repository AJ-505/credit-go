import Link from "next/link";
import { ArrowRight, Wallet, Target, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here's your platform summary.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Trust Score Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Trust Score</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-yellow-500">
                <span className="text-2xl font-bold">72</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">GOLD</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Limit Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-between">
          <div className="p-6">
            <h3 className="tracking-tight text-sm font-medium">Safe Limit</h3>
            <div className="mt-2 text-4xl font-bold">₦650,000</div>
            <p className="text-xs text-muted-foreground mt-1">Available to borrow</p>
          </div>
          <div className="p-6 pt-0">
            <Link href="/dashboard/marketplace" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View Marketplace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Savings Vault Summary */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Savings Vault</h3>
          <Link href="/dashboard/vault" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            Manage <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="p-6 pt-0 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Vault Balance</p>
            <p className="text-2xl font-bold">₦245,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-xl font-semibold">12 days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Auto-sweep</p>
            <p className="text-lg font-medium">₦5,000/day</p>
            <p className="text-xs text-muted-foreground">Next: Today 6pm</p>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/marketplace" className="group rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 block">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4 group-hover:bg-emerald-200 transition-colors">
            <Wallet className="h-6 w-6 text-emerald-600" />
          </div>
          <h4 className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Get a Loan</h4>
          <p className="text-sm text-stone-600 mt-2 mb-4 leading-relaxed">Browse what you qualify for based on your score.</p>
          <span className="text-sm text-emerald-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Browse <ArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/dashboard/vault" className="group rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 block">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4 group-hover:bg-emerald-200 transition-colors">
            <Target className="h-6 w-6 text-emerald-600" />
          </div>
          <h4 className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Save Faster</h4>
          <p className="text-sm text-stone-600 mt-2 mb-4 leading-relaxed">Increase your daily auto-sweep to build your limit.</p>
          <span className="text-sm text-emerald-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Adjust <ArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/dashboard/profile" className="group rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 block">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4 group-hover:bg-emerald-200 transition-colors">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <h4 className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Improve Score</h4>
          <p className="text-sm text-stone-600 mt-2 mb-4 leading-relaxed">Take Credit School lessons for +5 points.</p>
          <span className="text-sm text-emerald-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Start <ArrowRight className="h-4 w-4" /></span>
        </Link>
      </div>
    </div>
  );
}
