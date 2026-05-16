"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { authClient } from "@/server/better-auth/client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[1fr_420px]">
        <section className="hidden lg:block">
          <Link
            href="/"
            className="mb-14 inline-flex items-center gap-2 text-2xl font-black tracking-tighter"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">
              C
            </span>
            CreditGo
          </Link>
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Secure account access
            </div>
            <h1 className="text-5xl leading-tight font-black tracking-tight">
              Continue where your trust profile left off.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              Sign in to view your Safe Limit, vault status, marketplace offers,
              and lender dashboard.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/70 sm:p-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xl font-black tracking-tighter lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">
              C
            </span>
            CreditGo
          </Link>

          <div className="mb-8">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <LogIn className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Log in</h2>
            <p className="mt-2 text-sm text-stone-500">
              Use the email and password you created during onboarding.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              setLoading(true);
              try {
                const result = await authClient.signIn.email({
                  email,
                  password,
                  callbackURL: "/dashboard",
                });
                if ("error" in result && result.error) {
                  throw new Error(result.error.message ?? "Login failed");
                }
                router.push("/dashboard");
                router.refresh();
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : "Unable to log in. Check your details and try again.",
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="block text-sm font-bold text-stone-700">
              Email
              <input
                className="mt-2 h-12 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-base transition outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="block text-sm font-bold text-stone-700">
              Password
              <input
                className="mt-2 h-12 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-base transition outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl text-base font-bold"
            >
              {loading ? "Logging in..." : "Log In"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 border-t border-stone-100 pt-6 text-sm text-stone-500">
            New here?{" "}
            <Link
              href="/onboarding"
              className="font-bold text-emerald-700 hover:text-emerald-800"
            >
              Create an account
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
