import Link from "next/link";
import { Home, Store, PiggyBank, FileText, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", route: "/dashboard" },
  { icon: Store, label: "Marketplace", route: "/dashboard/marketplace" },
  { icon: PiggyBank, label: "Savings Vault", route: "/dashboard/vault" },
  { icon: FileText, label: "My Loans", route: "/dashboard/loans" },
  { icon: User, label: "Profile", route: "/dashboard/profile" },
];

export function DashboardSidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          CreditGo
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.route}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
