import Link from "next/link";
import { User, Shield, FileText, Building, Settings, LogOut } from "lucide-react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const profileLinks = [
    { icon: User, label: "Personal Info", href: "/dashboard/profile" },
    { icon: Shield, label: "Security", href: "/dashboard/profile/security" },
    { icon: FileText, label: "Documents", href: "/dashboard/profile/documents" },
    { icon: Building, label: "Bank Links", href: "/dashboard/profile/banks" },
    { icon: Settings, label: "Settings", href: "/dashboard/profile/settings" },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1 overflow-x-auto pb-2 md:pb-0">
            {profileLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            <div className="md:pt-4 md:mt-4 md:border-t">
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 w-full border rounded-xl bg-card p-6 shadow">
          {children}
        </main>
      </div>
    </div>
  );
}
