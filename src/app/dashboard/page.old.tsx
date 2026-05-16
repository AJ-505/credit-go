import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect("/onboarding/register");

  const profile = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });
  if (!profile) redirect("/onboarding/register");

  const actions = [
    !profile.squadVirtualAccount && [
      "Set up your repayment vault",
      "/onboarding/bvn",
      "High",
    ],
    !profile.monoBankAccountId && [
      "Link your bank account",
      "/onboarding/role",
      "Medium",
    ],
    profile.persona === "freelancer" &&
      !profile.cr3dentialsSessionId && [
        "Verify your gig income",
        "/onboarding/freelancer/income",
        "Medium",
      ],
    !profile.linkedinConnected && [
      "Connect LinkedIn",
      "/onboarding/freelancer/linkedin",
      "Low",
    ],
    ["Take Credit School", "#", "Medium"],
  ].filter(Boolean) as Array<[string, string, string]>;

  const score = profile.trustScore ?? 0;
  const nextTier =
    score >= 76
      ? "Top tier"
      : score >= 56
        ? "Platinum at 76"
        : score >= 31
          ? "Gold at 56"
          : "Silver at 31";

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-950">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight">
            CreditGo
          </Link>
          <span className="text-sm font-semibold text-stone-500">
            {profile.email}
          </span>
        </div>
        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <div className="text-sm font-bold text-stone-400 uppercase">
              Trust Score
            </div>
            <div className="mt-4 flex items-end gap-4">
              <div className="text-7xl font-black text-emerald-700">
                {score}
              </div>
              <div className="pb-2">
                <div className="font-black uppercase">
                  {profile.tier ?? "unscored"}
                </div>
                <div className="text-sm text-stone-500">{nextTier}</div>
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full bg-emerald-600"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <div className="text-sm font-bold text-stone-400 uppercase">
              Safe Limit
            </div>
            <div className="mt-4 text-4xl font-black">
              ₦{Math.round(profile.safeLimitNgn ?? 0).toLocaleString()}
            </div>
            <p className="mt-3 text-sm text-stone-500">
              Based on verified income, identity, employment and bank data.
            </p>
          </div>
        </section>
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-black">Score Breakdown</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(profile.scoreBreakdown ?? {}).map(
                ([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{key.replaceAll("_", " ")}</span>
                      <span className="font-bold">
                        {value > 0 ? "+" : ""}
                        {value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-100">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.min(Math.abs(value) * 4, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-black">Action Items</h2>
            <div className="mt-4 space-y-3">
              {actions.map(([label, href, priority]) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between rounded-md border border-stone-200 px-4 py-3 text-sm font-semibold hover:border-emerald-500"
                >
                  <span>{label}</span>
                  <span className="text-xs text-stone-400 uppercase">
                    {priority}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
