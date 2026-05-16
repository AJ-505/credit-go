"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Home, Store, PiggyBank, FileText, LogOut, User } from "lucide-react";
import { authClient } from "@/server/better-auth/client";

const navItems = [
  { icon: Home, label: "Dashboard", route: "/dashboard" },
  { icon: Store, label: "Marketplace", route: "/dashboard/marketplace" },
  { icon: PiggyBank, label: "Savings Vault", route: "/dashboard/vault" },
  { icon: FileText, label: "My Loans", route: "/dashboard/loans" },
  { icon: User, label: "Profile", route: "/dashboard/profile" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold">
          CreditGo
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.route || pathname.startsWith(item.route + "/");
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all hover:bg-emerald-50 hover:text-emerald-700 ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t px-4 py-4">
        <button
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-stone-500 transition-all hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
