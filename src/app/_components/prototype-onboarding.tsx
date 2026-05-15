import Link from "next/link";

import { Button } from "@/components/ui/button";

type PrototypeId = "1" | "2" | "3" | "4" | "5";
type FlowType = "freelancer" | "corporate" | "government";

const roles: Array<{
  title: string;
  href: FlowType;
  label: string;
  description: string;
  proof: string;
}> = [
  {
    title: "Freelancer",
    href: "freelancer",
    label: "Variable income",
    description:
      "For creators, contractors, traders, drivers, and self-employed operators.",
    proof: "Bank activity, invoices, platform earnings, repeat clients",
  },
  {
    title: "Corporate worker",
    href: "corporate",
    label: "Private payroll",
    description:
      "For employees paid by a registered company or private institution.",
    proof: "Work email, payslips, salary account, employer verification",
  },
  {
    title: "Government worker",
    href: "government",
    label: "Public payroll",
    description:
      "For local, state, federal, school, health, and agency employees.",
    proof: "Agency details, staff ID, grade level, pension and salary records",
  },
];

const flowProfiles: Record<
  FlowType,
  {
    title: string;
    eyebrow: string;
    description: string;
    outcome: string;
    fields: Array<{ label: string; placeholder: string; type?: string }>;
    signals: string[];
    documents: string[];
  }
> = {
  freelancer: {
    title: "Map your real cash flow",
    eyebrow: "Freelancer onboarding",
    description:
      "Collect earning channels first, then attach evidence. The score should understand seasonality, client concentration, and how often money actually lands.",
    outcome:
      "Income confidence from bank inflows, invoices, and platform earnings.",
    fields: [
      {
        label: "Trade or business name",
        placeholder: "e.g. Ada Studio, Bolt driver, Shopify store",
      },
      {
        label: "Primary earning channel",
        placeholder: "Upwork, direct clients, ride hailing, POS shop",
      },
      {
        label: "Average monthly inflow",
        placeholder: "NGN 850,000",
        type: "text",
      },
      {
        label: "Largest client share",
        placeholder: "e.g. 35% from one client",
      },
    ],
    signals: [
      "Repeat inflows",
      "Expense stability",
      "Client spread",
      "Recent activity",
    ],
    documents: [
      "6 months bank statement",
      "Top 3 invoices or receipts",
      "Platform payout screenshot",
    ],
  },
  corporate: {
    title: "Verify salary",
    eyebrow: "Corporate worker onboarding",
    description: "Start with employment context and salary cadence.",
    outcome:
      "Affordability from net pay, payday rhythm, employer confidence, and deductions.",
    fields: [
      {
        label: "Employer name",
        placeholder: "e.g. Flutterwave, GTBank, Andela",
      },
      { label: "Work email", placeholder: "you@company.com", type: "email" },
      { label: "Net monthly salary", placeholder: "NGN 620,000" },
      { label: "Payday", placeholder: "25th of every month" },
    ],
    signals: [
      "Employer domain",
      "Salary account",
      "Payslip match",
      "Debt-to-income",
    ],
    documents: [
      "Latest payslip",
      "Salary account statement",
      "Optional HR confirmation",
    ],
  },
  government: {
    title: "Public-sector proof",
    eyebrow: "Government worker onboarding",
    description:
      "Government workers need a different path: agency, grade level, staff identifier, salary account, deductions, and pension signals.",
    outcome:
      "Public payroll confidence from agency records, grade level, staff ID, and salary continuity.",
    fields: [
      {
        label: "Agency, ministry, or parastatal",
        placeholder: "e.g. Lagos State Health Service Commission",
      },
      { label: "Staff or IPPIS number", placeholder: "IPPIS / staff ID" },
      { label: "Grade level or band", placeholder: "GL 10 Step 3" },
      { label: "Salary bank", placeholder: "Bank receiving monthly salary" },
    ],
    signals: [
      "Payroll continuity",
      "Grade level",
      "Pension activity",
      "Deduction load",
    ],
    documents: [
      "Recent payslip",
      "Appointment or confirmation letter",
      "Salary account statement",
    ],
  },
};

function pathForRole(prototype: PrototypeId, href: FlowType) {
  return href === "corporate"
    ? `/${prototype}/worker`
    : `/${prototype}/${href}`;
}

function Icon({ type }: { type: FlowType }) {
  if (type === "freelancer") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 19V8a2 2 0 0 1 2-2h3l2-2h2l2 2h3a2 2 0 0 1 2 2v11" />
        <path d="M8 13h8" />
        <path d="M9 17h6" />
      </svg>
    );
  }

  if (type === "government") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 10h18" />
        <path d="M5 10v9" />
        <path d="M9 10v9" />
        <path d="M15 10v9" />
        <path d="M19 10v9" />
        <path d="M2 19h20" />
        <path d="m12 3 9 5H3l9-5Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
    </svg>
  );
}

/* /1 - Midnight */
function MidnightRoleSelection({ prototype }: { prototype: PrototypeId }) {
  return (
    <main className="min-h-screen bg-[#0d0d19] px-4 py-5 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2rem] border border-[#353555] bg-[#171729]/90 px-5 py-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur md:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link
              href={`/${prototype}`}
              className="text-3xl font-black tracking-[-0.06em]"
            >
              creditgo
            </Link>
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-white/80">
              <span className="underline underline-offset-4">
                For borrowers
              </span>
              <span>How scoring works</span>
              <span>Repayment safety</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#51517c] px-5 py-2 text-sm font-bold">
                Start check
              </span>
            </div>
          </div>
        </div>

        <section className="space-y-14">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-5 text-sm font-bold tracking-[0.28em] text-[#9ba6ff] uppercase">
              Credit eligibility
            </p>
            <h1 className="text-6xl font-light tracking-[-0.08em] text-white sm:text-8xl lg:text-9xl">
              Pay later starts with how you earn.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/65">
              Pick your employment type and we will collect the right proof
              before asking you to create an account.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <Link
                key={role.href}
                href={pathForRole(prototype, role.href)}
                className="group rounded-[2rem] border border-[#6f73b7] bg-[#171729] p-6 transition hover:-translate-y-1 hover:border-[#a5adff] hover:shadow-[0_40px_140px_rgba(81,91,255,0.18)]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9ba6ff] text-[#10101d]">
                  <Icon type={role.href} />
                </div>
                <p className="mb-2 text-xs font-bold tracking-[0.18em] text-[#9ba6ff] uppercase">
                  {role.label}
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {role.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function MidnightFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  const profile = flowProfiles[flow];

  return (
    <main className="min-h-screen bg-[#0d0d19] px-4 py-5 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/${prototype}`}
          className="mb-8 inline-flex rounded-full border border-[#4b4b76] px-5 py-2 text-sm font-bold text-white/75"
        >
          Back
        </Link>
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2.5rem] border border-[#55598f] bg-[#171729] p-7 md:p-10">
            <p className="text-sm font-bold tracking-[0.28em] text-[#9ba6ff] uppercase">
              {profile.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-light tracking-[-0.08em] md:text-7xl">
              {profile.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
              {profile.description}
            </p>
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#94a3ff] via-[#5567ff] to-[#15154a] p-6">
              <p className="text-sm font-bold tracking-[0.18em] text-white/70 uppercase">
                Preview
              </p>
              <p className="mt-8 text-2xl font-semibold tracking-[-0.05em]">
                {profile.outcome}
              </p>
            </div>
          </div>

          <form
            action="#"
            className="rounded-[2.5rem] border border-[#55598f] bg-[#f5f3ff] p-5 text-[#141421] md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {profile.fields.map((field) => (
                <label
                  key={field.label}
                  className="space-y-2 text-sm font-bold"
                >
                  <span>{field.label}</span>
                  <input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-[#d8d7ee] bg-white px-4 py-4 transition outline-none focus:border-[#5967ff] focus:ring-4 focus:ring-[#5967ff]/15"
                  />
                </label>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-[#5967ff]">
              Evidence needed: {profile.documents.join(" / ")}
            </p>
            <Button
              size="unstyled"
              variant="unstyled"
              type="submit"
              className="mt-6 w-full rounded-full bg-[#151529] px-6 py-4 text-base font-black text-white transition hover:bg-black"
            >
              Continue
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}

/* /2 - clean white minimal, single column */
function MinimalRoleSelection({ prototype }: { prototype: PrototypeId }) {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-stone-900 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex items-center justify-between">
          <Link
            href={`/${prototype}`}
            className="text-lg font-semibold tracking-tight"
          >
            creditgo
          </Link>
          <span className="text-sm text-stone-400">Eligibility check</span>
        </div>

        <div className="mb-16 max-w-xl">
          <h1 className="text-5xl font-light tracking-[-0.06em] sm:text-6xl">
            Check your credit eligibility
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-500">
            Select how you earn and we will show you exactly what proof is
            needed for a credit decision.
          </p>
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={pathForRole(prototype, role.href)}
              className="group flex items-center gap-5 border-b border-stone-100 pb-5 transition hover:border-stone-300"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-600 group-hover:bg-stone-900 group-hover:text-white">
                <Icon type={role.href} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{role.title}</h2>
                <p className="text-sm text-stone-500">{role.description}</p>
              </div>
              <span className="text-sm font-medium text-stone-400 group-hover:text-stone-900">
                {role.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function MinimalFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  const profile = flowProfiles[flow];

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-stone-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${prototype}`}
          className="text-sm font-medium text-stone-400 hover:text-stone-900"
        >
          &larr; Back
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase">
              {profile.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.06em]">
              {profile.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-500">
              {profile.description}
            </p>
            <div className="mt-8 rounded-2xl bg-stone-50 p-5">
              <p className="text-sm font-bold tracking-[0.16em] text-stone-400 uppercase">
                What you need
              </p>
              <div className="mt-3 space-y-2 text-sm text-stone-600">
                {profile.documents.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </div>
          </div>

          <form action="#" className="space-y-5">
            {profile.fields.map((field) => (
              <label
                key={field.label}
                className="space-y-2 text-sm font-medium"
              >
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 transition outline-none focus:border-stone-900 focus:bg-white"
                />
              </label>
            ))}
            <Button
              size="unstyled"
              variant="unstyled"
              type="submit"
              className="w-full rounded-xl bg-stone-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-stone-800"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* /3 - dark charcoal, left-right split */
function CharcoalRoleSelection({ prototype }: { prototype: PrototypeId }) {
  return (
    <main className="min-h-screen bg-[#121314] px-6 py-8 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center justify-between">
          <Link href={`/${prototype}`} className="text-lg font-semibold">
            creditgo
          </Link>
          <span className="text-sm text-white/50">Quick check</span>
        </div>

        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-[-0.06em] sm:text-6xl">
              Know your limit in minutes.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/55">
              Choose your income type and we will match you with the right
              verification path.
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((role, i) => (
              <Link
                key={role.href}
                href={pathForRole(prototype, role.href)}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 px-5 py-4 transition hover:border-white/30 hover:bg-white/[0.04]"
              >
                <span className="text-xs font-bold text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 group-hover:bg-white group-hover:text-black">
                  <Icon type={role.href} />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold">{role.title}</h2>
                  <p className="text-sm text-white/45">{role.description}</p>
                </div>
                <span className="text-sm text-white/30 group-hover:text-white/70">
                  {role.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function CharcoalFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  const profile = flowProfiles[flow];

  return (
    <main className="min-h-screen bg-[#121314] px-6 py-8 text-white sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${prototype}`}
          className="text-sm text-white/40 hover:text-white"
        >
          &larr; Back
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-white/40 uppercase">
              {profile.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
              {profile.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/55">
              {profile.description}
            </p>
          </div>

          <form action="#" className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              {profile.fields.map((field) => (
                <label
                  key={field.label}
                  className="space-y-2 text-sm font-medium text-white/80"
                >
                  <span>{field.label}</span>
                  <input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-4 outline-none placeholder:text-white/25 focus:border-white/40 focus:bg-white/10"
                  />
                </label>
              ))}
            </div>
            <p className="text-sm text-white/40">
              {profile.documents.join(" / ")}
            </p>
            <Button
              size="unstyled"
              variant="unstyled"
              type="submit"
              className="w-full rounded-xl bg-white px-6 py-4 text-base font-semibold text-[#121314] transition hover:bg-white/90"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* /4 - warm cream, centered */
function WarmRoleSelection({ prototype }: { prototype: PrototypeId }) {
  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-8 text-[#2c241b] sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-16 flex items-center justify-between text-left">
          <Link
            href={`/${prototype}`}
            className="text-lg font-semibold tracking-tight"
          >
            creditgo
          </Link>
          <span className="text-sm text-[#a08769]">Income check</span>
        </div>

        <h1 className="font-serif text-5xl tracking-[-0.06em] sm:text-6xl">
          Find out what you qualify for.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-[#7a6b59]">
          Tell us about your work and we will show you the credit options
          available to you.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={pathForRole(prototype, role.href)}
              className="group rounded-2xl border border-[#e5d9cb] bg-white px-6 py-8 text-left transition hover:-translate-y-1 hover:border-[#b89e80] hover:shadow-lg"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1e7db] text-[#9a6a3a]">
                <Icon type={role.href} />
              </div>
              <h2 className="font-serif text-xl font-semibold">{role.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#7a6b59]">
                {role.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function WarmFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  const profile = flowProfiles[flow];

  return (
    <main className="min-h-screen bg-[#faf7f2] px-6 py-8 text-[#2c241b] sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${prototype}`}
          className="text-sm font-medium text-[#a08769] hover:text-[#2c241b]"
        >
          &larr; Back
        </Link>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#a08769] uppercase">
              {profile.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-[-0.04em]">
              {profile.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#7a6b59]">
              {profile.description}
            </p>
            <div className="mt-8 rounded-2xl border border-[#e5d9cb] bg-white p-5">
              <p className="text-xs font-bold tracking-[0.16em] text-[#a08769] uppercase">
                Required documents
              </p>
              <div className="mt-3 space-y-2 text-sm text-[#7a6b59]">
                {profile.documents.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </div>
          </div>

          <form action="#" className="space-y-5">
            {profile.fields.map((field) => (
              <label
                key={field.label}
                className="space-y-2 text-sm font-medium"
              >
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#e5d9cb] bg-white px-4 py-4 transition outline-none placeholder:text-[#c7b6a2] focus:border-[#b89e80]"
                />
              </label>
            ))}
            <Button
              size="unstyled"
              variant="unstyled"
              type="submit"
              className="w-full rounded-xl bg-[#2c241b] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#4a3d2f]"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* /5 - clean light gray, two-column */
function AiryRoleSelection({ prototype }: { prototype: PrototypeId }) {
  return (
    <main className="min-h-screen bg-[#f5f5f0] px-6 py-8 text-[#1a1a18] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center justify-between">
          <Link href={`/${prototype}`} className="text-lg font-semibold">
            creditgo
          </Link>
          <span className="text-sm text-[#8a8a80]">Credit assessment</span>
        </div>

        <section className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-[-0.06em] sm:text-6xl">
              See your credit options.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b6b60]">
              We need to understand your income source before we can give you a
              clear picture of your credit limit.
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((role) => (
              <Link
                key={role.href}
                href={pathForRole(prototype, role.href)}
                className="group flex items-center gap-5 rounded-xl bg-white px-5 py-5 transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5f5f0] text-[#6b6b60] group-hover:bg-[#1a1a18] group-hover:text-white">
                  <Icon type={role.href} />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold">{role.title}</h2>
                  <p className="text-sm text-[#8a8a80]">{role.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AiryFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  const profile = flowProfiles[flow];

  return (
    <main className="min-h-screen bg-[#f5f5f0] px-6 py-8 text-[#1a1a18] sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/${prototype}`}
          className="text-sm font-medium text-[#8a8a80] hover:text-[#1a1a18]"
        >
          &larr; Back
        </Link>
        <div className="mt-10">
          <p className="text-sm font-bold tracking-[0.2em] text-[#8a8a80] uppercase">
            {profile.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
            {profile.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6b60]">
            {profile.description}
          </p>
        </div>

        <form action="#" className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            {profile.fields.map((field) => (
              <label
                key={field.label}
                className="space-y-2 text-sm font-medium"
              >
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-4 transition outline-none placeholder:text-[#aaa] focus:border-[#1a1a18]"
                />
              </label>
            ))}
          </div>
          <details className="rounded-xl bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold">
              What you need to provide
            </summary>
            <div className="mt-4 space-y-2 text-sm text-[#6b6b60]">
              {profile.documents.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </details>
          <Button
            size="unstyled"
            variant="unstyled"
            type="submit"
            className="w-full rounded-xl bg-[#1a1a18] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#333]"
          >
            Continue
          </Button>
        </form>
      </div>
    </main>
  );
}

export function RoleSelection({ prototype }: { prototype: PrototypeId }) {
  if (prototype === "1") return <MidnightRoleSelection prototype={prototype} />;
  if (prototype === "2") return <MinimalRoleSelection prototype={prototype} />;
  if (prototype === "3") return <CharcoalRoleSelection prototype={prototype} />;
  if (prototype === "4") return <WarmRoleSelection prototype={prototype} />;
  return <AiryRoleSelection prototype={prototype} />;
}

export function OnboardingFlow({
  prototype,
  flow,
}: {
  prototype: PrototypeId;
  flow: FlowType;
}) {
  if (prototype === "1")
    return <MidnightFlow prototype={prototype} flow={flow} />;
  if (prototype === "2")
    return <MinimalFlow prototype={prototype} flow={flow} />;
  if (prototype === "3")
    return <CharcoalFlow prototype={prototype} flow={flow} />;
  if (prototype === "4") return <WarmFlow prototype={prototype} flow={flow} />;
  return <AiryFlow prototype={prototype} flow={flow} />;
}
