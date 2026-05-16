"use client";
import Link from "next/link";
import { useState } from "react";

import { BrandSideProvider } from "@/components/ui/brand-side-provider";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const [view, setView] = useState<"borrower" | "lender">("borrower");

  return (
    <BrandSideProvider side={view === "lender" ? "lender" : "regular"}>
      <div className="relative min-h-screen overflow-x-hidden font-sans selection:bg-emerald-500/30">
        {/* Universal Navigation - White to ground the design */}
        <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md transition-all">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter text-stone-900">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white shadow-sm ${view === "borrower" ? "bg-emerald-600" : "bg-blue-800"}`}
              >
                C
              </div>
              CreditGo
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center rounded-full border border-stone-200 bg-stone-100 p-1 shadow-inner">
                <Button
                  size="unstyled"
                  variant="unstyled"
                  onClick={() => setView("borrower")}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${view === "borrower" ? "bg-white text-emerald-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
                >
                  For Earners
                </Button>
                <Button
                  size="unstyled"
                  variant="unstyled"
                  onClick={() => setView("lender")}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${view === "lender" ? "bg-white text-blue-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
                >
                  For Lenders
                </Button>
              </div>
              <Link
                href="/login"
                className="hidden text-sm font-bold text-stone-600 transition-colors hover:text-stone-900 md:block"
              >
                Log In
              </Link>
              <Button
                asChild
                size="unstyled"
                className={`hidden rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all md:block ${view === "borrower" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-800 hover:bg-blue-900"}`}
              >
                <Link
                  href={
                    view === "lender" ? "/onboarding/lender" : "/onboarding"
                  }
                >
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </nav>

        <main className="flex-1 pt-[73px]">
          {view === "borrower" ? (
            <>
              {/* Section 1: Hero - GREEN */}
              <section className="relative z-10 w-full overflow-hidden bg-emerald-950 py-24 text-white md:py-32">
                <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-40">
                  <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-emerald-500/20 blur-[120px]"></div>
                  <div className="absolute top-[20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-400/10 blur-[150px]"></div>
                </div>
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                  <div className="animate-fade-up text-left">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300 shadow-sm">
                      The No-Gree Credit Protocol
                    </div>

                    <h1 className="mb-8 text-5xl leading-[1.05] font-black tracking-tight text-balance md:text-7xl">
                      Your Income is an{" "}
                      <span className="text-emerald-400">Asset.</span> Not a
                      Limit.
                    </h1>

                    <p className="mb-10 max-w-lg text-xl leading-relaxed font-medium text-balance text-emerald-100/80">
                      Earning ₦300k+ but strapped for cash by mid-month?
                      Leverage your true earning power to finance what matters
                      today. Pay comfortably as you earn.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button
                        asChild
                        size="unstyled"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-bold text-emerald-950 shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1 hover:bg-emerald-400"
                      >
                        <Link href="/onboarding">Check My Safe Limit</Link>
                      </Button>
                      <Button
                        asChild
                        size="unstyled"
                        variant="unstyled"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 bg-emerald-900/50 px-8 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:bg-emerald-900"
                      >
                        <Link href="#how-it-works">See How It Works</Link>
                      </Button>
                    </div>
                  </div>

                  <div
                    className="animate-fade-in relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-3xl border border-emerald-700/50 bg-emerald-900/40 p-8 shadow-2xl backdrop-blur-sm md:aspect-[4/3]"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-[80px]"></div>

                    <div className="z-10 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-600 bg-emerald-800 text-2xl">
                        🏦
                      </div>
                      <div className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                        Excellent Standing
                      </div>
                    </div>

                    <div className="z-10 space-y-6">
                      <div>
                        <p className="mb-1 text-sm font-semibold tracking-wider text-emerald-300/80 uppercase">
                          Available Credit Limit
                        </p>
                        <h3 className="text-4xl font-black text-white md:text-6xl">
                          ₦1,500,000
                        </h3>
                      </div>

                      <div className="h-3 w-full overflow-hidden rounded-full border border-emerald-800 bg-emerald-950">
                        <div className="relative h-full w-[35%] rounded-full bg-emerald-400">
                          <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-emerald-300/80">
                          ₦525,000 Used
                        </span>
                        <span className="font-bold text-emerald-400">
                          10% Savings Streak Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Authority Bar - WHITE */}
              <section className="relative z-10 border-y border-stone-200 bg-white py-16 text-stone-900">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
                  <p className="max-w-xs text-center text-sm font-black tracking-wider text-balance text-stone-400 uppercase md:text-left">
                    Trusted by lenders deploying over ₦150 Billion.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 md:justify-end md:gap-12">
                    {["Sycamore", "Easybuy", "CDCare", "Spleet", "Sunking"].map(
                      (logo) => (
                        <span
                          key={logo}
                          className="text-2xl font-black tracking-tight text-stone-800"
                        >
                          {logo}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </section>

              {/* Section 3: The Problem vs Solution - GREEN */}
              <section className="relative z-10 border-b border-emerald-900 bg-emerald-950 py-32 text-white">
                <div className="mx-auto max-w-7xl px-6">
                  <div className="mx-auto mb-20 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-black tracking-tight md:text-5xl">
                      Stop paying for anxiety. Start financing assets.
                    </h2>
                    <p className="text-lg leading-relaxed text-emerald-100/70">
                      We are fundamentally shifting credit away from predatory
                      payday loans and redirecting it towards life-accelerating
                      assets.
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {/* The Problem */}
                    <div className="flex flex-col justify-center rounded-3xl border border-emerald-800 bg-emerald-900/30 p-10">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900 text-xl text-emerald-400">
                        ✕
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-white">
                        The "Quick Loan" Trap
                      </h3>
                      <ul className="space-y-4 text-emerald-200/80">
                        <li className="flex gap-3">
                          <span className="font-bold text-emerald-500">•</span>{" "}
                          30%+ exorbitant monthly interest rates
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold text-emerald-500">•</span>{" "}
                          Harassment calls to your contacts
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold text-emerald-500">•</span>{" "}
                          Forces you into a cycle of "borrow-to-repay"
                        </li>
                      </ul>
                    </div>

                    {/* The Solution */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-emerald-500 bg-emerald-600 p-10 shadow-2xl">
                      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-[60px]"></div>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl text-white shadow-inner backdrop-blur-sm">
                        ✓
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-white">
                        The CreditGo Standard
                      </h3>
                      <ul className="space-y-4 font-medium text-emerald-50">
                        <li className="flex gap-3">
                          <span className="font-black text-emerald-200">→</span>{" "}
                          Sustainable asset financing (Rent, Laptops, Solar)
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black text-emerald-200">→</span>{" "}
                          Rates that decrease as your savings streak increases
                        </li>
                        <li className="flex gap-3">
                          <span className="font-black text-emerald-200">→</span>{" "}
                          Completely private, automated repayments
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Designed For Your Reality - WHITE */}
              <section className="relative z-10 border-b border-stone-200 bg-stone-50 py-32 text-stone-900">
                <div className="mx-auto max-w-7xl px-6">
                  <div className="mb-20 md:w-1/2">
                    <div className="mb-4 text-sm font-black tracking-widest text-emerald-600 uppercase">
                      Use Cases
                    </div>
                    <h2 className="text-4xl leading-tight font-black text-stone-900 md:text-5xl">
                      Built for the way you actually live & work.
                    </h2>
                  </div>

                  <div className="relative space-y-12">
                    {/* Card 1: The Freelancer */}
                    <div className="sticky-card z-10 transform-gpu overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-8 shadow-xl md:p-12">
                      <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="order-2 md:order-1">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-stone-100 text-2xl text-stone-900 shadow-sm">
                            💻
                          </div>
                          <h3 className="mb-4 text-3xl font-black text-stone-900">
                            The Independent Earner
                          </h3>
                          <p className="mb-8 text-lg leading-relaxed text-stone-600">
                            Waiting on client invoices shouldn't pause your
                            life. Get the gear you need today, and pay flexibly
                            as your USD gigs land. Don't let hardware
                            limitations throttle your earning potential.
                          </p>
                          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
                            <p className="mb-2 text-sm font-bold text-stone-900">
                              Example Use Case:
                            </p>
                            <p className="text-stone-600">
                              Finance a ₦1.8M MacBook Pro 16". Pay back
                              gracefully over 6 months directly from your gig
                              inflows.
                            </p>
                          </div>
                        </div>
                        <div className="relative order-1 flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 p-8 text-center md:order-2 md:h-full">
                          <div className="relative z-10 flex h-32 w-full max-w-[200px] flex-col items-center justify-center gap-3 rounded-t-xl border border-stone-200 bg-white shadow-lg">
                            <div className="h-1 w-16 rounded-full bg-stone-300"></div>
                            <div className="h-2 w-3/4 rounded-full bg-stone-100"></div>
                          </div>
                          <div className="z-20 h-4 w-full max-w-[240px] rounded-b-xl border border-stone-300 bg-stone-300 shadow-lg"></div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: The Corporate */}
                    <div
                      className="sticky-card z-20 mt-12 transform-gpu overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-8 shadow-xl md:p-12"
                      style={{ top: "120px" }}
                    >
                      <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="order-2 md:order-1">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-stone-100 text-2xl text-stone-900 shadow-sm">
                            🏢
                          </div>
                          <h3 className="mb-4 text-3xl font-black text-stone-900">
                            The Career Professional
                          </h3>
                          <p className="mb-8 text-lg leading-relaxed text-stone-600">
                            Annual rent due, but paid monthly? We bridge the
                            gap. We clear your ₦1.2M rent upfront, while you
                            repay in comfortable monthly bits directly from your
                            salary vault. No stress, no shame.
                          </p>
                          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
                            <p className="mb-2 text-sm font-bold text-stone-900">
                              Example Use Case:
                            </p>
                            <p className="text-stone-600">
                              12 months rent cleared instantly. Automated ₦100k
                              deductions tied to your payday.
                            </p>
                          </div>
                        </div>
                        <div className="relative order-1 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 p-8 md:order-2 md:h-full">
                          <div className="z-10 flex aspect-square w-48 flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-xl">
                            <div className="mb-4 flex-1 rounded-xl bg-stone-100"></div>
                            <div className="flex h-6 w-full gap-2">
                              <div className="h-full w-1/2 rounded-md bg-emerald-100"></div>
                              <div className="h-full w-1/2 rounded-md bg-stone-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: The Govt Worker */}
                    <div
                      className="sticky-card z-30 mt-12 transform-gpu overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-8 shadow-xl md:p-12"
                      style={{ top: "140px" }}
                    >
                      <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="order-2 md:order-1">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-stone-100 text-2xl text-stone-900 shadow-sm">
                            🏛️
                          </div>
                          <h3 className="mb-4 text-3xl font-black text-stone-900">
                            The Civil Servant
                          </h3>
                          <p className="mb-8 text-lg leading-relaxed text-stone-600">
                            Steady job, but allocations are delayed. Secure
                            school fees, emergency medical funds, or home
                            repairs instantly against your confirmed grade level
                            and next paycheck.
                          </p>
                          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
                            <p className="mb-2 text-sm font-bold text-stone-900">
                              Example Use Case:
                            </p>
                            <p className="text-stone-600">
                              ₦400k School Fees Advance. Spread over 3-6 months
                              based on your confirmed IPPIS standing.
                            </p>
                          </div>
                        </div>
                        <div className="relative order-1 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 p-8 md:order-2 md:h-full">
                          <div className="z-10 flex aspect-video w-48 flex-col items-center justify-center gap-4 rounded-2xl border border-stone-200 bg-white shadow-xl">
                            <div className="h-16 w-16 rounded-full border border-stone-300 bg-stone-200"></div>
                            <div className="h-3 w-3/4 rounded-full bg-stone-100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: The Engine - GREEN */}
              <section
                id="how-it-works"
                className="relative z-10 overflow-hidden border-b border-emerald-900 bg-emerald-950 py-32 text-white"
              >
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                  <div className="mx-auto mb-20 max-w-3xl text-center">
                    <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                      The Science of Access.
                    </h2>
                    <p className="text-lg text-emerald-100/70">
                      A transparent, automated flow designed to protect both you
                      and the lender.
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-4">
                    {[
                      {
                        num: "01",
                        title: "Connect",
                        desc: "Link banks securely via API. We read signals, not passwords.",
                      },
                      {
                        num: "02",
                        title: "Analyze",
                        desc: "Our AI calculates your 'Safe Limit' based purely on cash flow.",
                      },
                      {
                        num: "03",
                        title: "Finance",
                        desc: "Select your asset. 100+ lenders compete to fund you instantly.",
                      },
                      {
                        num: "04",
                        title: "Grow",
                        desc: "Automate repayments. As you pay, your limits multiply.",
                      },
                    ].map((step, i) => (
                      <div key={i} className="group relative">
                        {i !== 3 && (
                          <div className="absolute top-8 left-1/2 z-0 hidden w-full border-t-2 border-dashed border-emerald-800 md:block"></div>
                        )}
                        <div className="relative z-10 flex h-full flex-col rounded-2xl border border-emerald-800 bg-emerald-900/50 p-6 shadow-lg backdrop-blur-sm transition-colors hover:border-emerald-500">
                          <div className="mb-4 font-mono text-4xl font-black text-emerald-500/40">
                            {step.num}
                          </div>
                          <h4 className="mb-3 text-xl font-bold text-white">
                            {step.title}
                          </h4>
                          <p className="flex-1 text-sm leading-relaxed text-emerald-100/70">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* The 10x Promise Callout */}
                  <div className="relative mt-16 flex flex-col items-center gap-10 overflow-hidden rounded-[2rem] bg-emerald-600 p-10 text-center text-white shadow-2xl md:flex-row md:p-14 md:text-left">
                    <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
                    <div className="z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-4xl shadow-inner backdrop-blur-sm">
                      ⚡
                    </div>
                    <div className="z-10 flex-1">
                      <h4 className="mb-4 text-2xl font-black md:text-3xl">
                        The 10x Promise
                      </h4>
                      <p className="max-w-3xl text-lg leading-relaxed font-medium text-emerald-50 md:text-xl">
                        Maintain a 10% daily saving streak for 24 months and
                        automatically unlock{" "}
                        <strong className="rounded bg-white px-2 py-1 text-emerald-950">
                          10.3x more capital
                        </strong>{" "}
                        at{" "}
                        <strong className="rounded bg-white px-2 py-1 text-emerald-950">
                          40% lower interest rates.
                        </strong>{" "}
                        Your discipline is your equity.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Conclusion - WHITE */}
              <section className="relative z-10 bg-white py-40 text-center text-stone-900">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-6">
                  <h2 className="mb-8 text-5xl leading-tight font-black tracking-tight text-stone-900 md:text-7xl">
                    Start living the life your salary deserves.
                  </h2>
                  <p className="mb-12 text-xl leading-relaxed text-stone-500 md:text-2xl">
                    Move from survival mode to owner mode. Join 50,000+ smart
                    earners building real financial leverage today.
                  </p>
                  <Button
                    asChild
                    size="unstyled"
                    className="inline-block rounded-full bg-emerald-600 px-12 py-5 text-xl font-bold text-white shadow-[0_8px_30px_rgba(16,185,129,0.25)] transition-transform hover:-translate-y-1 hover:bg-emerald-700"
                  >
                    <Link href="/onboarding">Create Your Free Account</Link>
                  </Button>
                </div>
              </section>
            </>
          ) : (
            /* LENDER VIEW (B2B Expansion) - Alternating BLACK/BLUE GRADIENT and WHITE */
            <div className="animate-fade-in bg-white text-stone-900">
              {/* Lender Hero - BLACK/BLUE GRADIENT */}
              <section className="relative z-10 w-full overflow-hidden border-b border-blue-950 bg-gradient-to-br from-black via-slate-950 to-black text-white">
                <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-40">
                  <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-800/20 blur-[120px]"></div>
                  <div className="absolute top-[20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-700/10 blur-[150px]"></div>
                </div>
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
                  <div className="text-left">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-700/10 px-4 py-2 text-sm font-bold text-blue-300 shadow-sm">
                      CreditGo Partner Network
                    </div>

                    <h1 className="mb-8 text-5xl leading-[1.05] font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                      90% Less Default. <br />{" "}
                      <span className="text-blue-300 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                        100% Better Leads.
                      </span>
                    </h1>

                    <p className="mb-10 max-w-lg text-xl leading-relaxed text-balance text-blue-100/70">
                      Lend with unprecedented confidence. Stop lending blindly.
                      We deliver curated pools of prime borrowers whose capacity
                      to pay is continuously monitored through behavioral
                      savings data.
                    </p>

                    <Button
                      size="unstyled"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-8 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgba(30,64,175,0.4)] transition-all hover:-translate-y-1 hover:bg-blue-700"
                    >
                      View API Documentation
                    </Button>
                  </div>

                  {/* B2B Dashboard Mockup */}
                  <div className="flex h-[500px] flex-col overflow-hidden rounded-3xl border border-blue-950/50 bg-black/60 shadow-[0_0_50px_rgba(30,64,175,0.15)] backdrop-blur-md">
                    <div className="flex h-14 items-center gap-4 border-b border-blue-950/50 bg-black/80 px-6">
                      <div className="h-3 w-3 rounded-full bg-blue-700/50 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                      <div className="h-3 w-3 rounded-full bg-stone-700"></div>
                      <div className="h-3 w-3 rounded-full bg-stone-700"></div>
                      <div className="ml-4 h-6 w-48 rounded-md border border-stone-800 bg-stone-900/50"></div>
                    </div>
                    <div className="grid flex-1 grid-cols-2 gap-4 bg-black/40 p-6">
                      <div className="rounded-xl border border-blue-950/30 bg-stone-900/40 p-4 shadow-sm">
                        <p className="mb-1 text-xs font-bold text-blue-200/50 uppercase">
                          Active Loans
                        </p>
                        <p className="text-2xl font-black text-white">₦452M</p>
                      </div>
                      <div className="rounded-xl border border-blue-950/30 bg-stone-900/40 p-4 shadow-sm">
                        <p className="mb-1 text-xs font-bold text-blue-200/50 uppercase">
                          Default Rate
                        </p>
                        <p className="text-2xl font-black text-blue-300 drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                          0.4%
                        </p>
                      </div>
                      <div className="col-span-2 flex h-full flex-col rounded-xl border border-blue-950/30 bg-stone-900/40 p-4 shadow-sm">
                        <p className="mb-4 text-xs font-bold text-blue-200/50 uppercase">
                          Repayment Flow
                        </p>
                        <div className="flex flex-1 items-end gap-2">
                          {[40, 70, 45, 90, 65, 100, 85].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm border-t border-blue-950/50 bg-blue-950/50"
                              style={{ height: `${h}%` }}
                            >
                              <div
                                className="w-full rounded-t-sm bg-blue-800 shadow-[0_0_15px_rgba(30,64,175,0.3)] transition-all"
                                style={{ height: `${h * 0.8}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Risk Mitigation - WHITE */}
              <section className="border-b border-stone-200 bg-stone-50 py-32">
                <div className="mx-auto max-w-7xl px-6">
                  <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="mb-4 text-sm font-black tracking-widest text-blue-800 uppercase">
                      Infrastructure
                    </div>
                    <h2 className="mb-6 text-3xl font-black text-stone-900 md:text-5xl">
                      The Risk Mitigation Protocol
                    </h2>
                    <p className="text-lg text-stone-500">
                      We don't just provide leads; we actively shape borrower
                      behavior to guarantee your returns.
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-[2rem] border border-stone-200 bg-white p-10 transition-shadow hover:shadow-xl">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-2xl text-blue-800 shadow-sm">
                        📡
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-stone-900">
                        Behavioral Early Warning
                      </h3>
                      <p className="leading-relaxed text-stone-600">
                        We track how your borrowers save before they pay you. If
                        a user's daily savings streak drops, our API fires an
                        early warning webhook to your system.
                      </p>
                    </div>
                    <div className="rounded-[2rem] border border-stone-200 bg-white p-10 transition-shadow hover:shadow-xl">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-2xl text-blue-800 shadow-sm">
                        🔗
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-stone-900">
                        Cross-Platform Blacklisting
                      </h3>
                      <p className="leading-relaxed text-stone-600">
                        Our infrastructure automatically shares default data
                        across 100+ institutions. One default here means they
                        are locked out everywhere. The incentive to pay is
                        absolute.
                      </p>
                    </div>
                    <div className="rounded-[2rem] border border-stone-200 bg-white p-10 transition-shadow hover:shadow-xl">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-2xl text-blue-800 shadow-sm">
                        ⚙️
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-stone-900">
                        Automated Vault Deductions
                      </h3>
                      <p className="leading-relaxed text-stone-600">
                        Borrowers are mandated to fund their 'Save-to-Pay'
                        vaults daily or weekly. On repayment day, funds are
                        directly swept to your settlement account. Zero manual
                        transfers.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Ready to scale - BLACK/BLUE GRADIENT */}
              <section className="relative z-10 bg-gradient-to-t from-black via-black to-slate-950 py-40 text-center text-white">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-6">
                  <h2 className="mb-8 text-4xl leading-tight font-black text-white md:text-6xl">
                    Ready to scale your loan book safely?
                  </h2>
                  <p className="mb-12 text-xl text-blue-100/60">
                    Integrate our API in minutes and start receiving pre-vetted,
                    high-intent applications today.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                      asChild
                      size="unstyled"
                      className="rounded-full bg-blue-800 px-8 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgba(30,64,175,0.4)] transition-transform hover:-translate-y-1"
                    >
                      <Link href="/onboarding/lender">
                        Create Partner Account
                      </Link>
                    </Button>
                    <Button
                      size="unstyled"
                      variant="unstyled"
                      className="rounded-full border border-stone-800 bg-stone-900/50 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-stone-800"
                    >
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </BrandSideProvider>
  );
}
