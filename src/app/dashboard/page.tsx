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
        <div className="rounded-xl border bg-card p-6 shadow">
          <Wallet className="h-6 w-6 mb-4 text-primary" />
          <h4 className="font-semibold">Get a Loan</h4>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Browse what you qualify for based on your score.</p>
          <Link href="/dashboard/marketplace" className="text-sm text-primary font-medium">Browse →</Link>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow">
          <Target className="h-6 w-6 mb-4 text-primary" />
          <h4 className="font-semibold">Save Faster</h4>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Increase your daily auto-sweep to build your limit.</p>
          <Link href="/dashboard/vault" className="text-sm text-primary font-medium">Adjust →</Link>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow">
          <TrendingUp className="h-6 w-6 mb-4 text-primary" />
          <h4 className="font-semibold">Improve Score</h4>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Take Credit School lessons for +5 points.</p>
          <Link href="#" className="text-sm text-primary font-medium">Start →</Link>
        </div>
      </div>
    </div>
  );
}
