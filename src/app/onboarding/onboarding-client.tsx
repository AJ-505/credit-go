"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Landmark,
  LinkIcon,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/server/better-auth/client";
import { api } from "@/trpc/react";

type TelcoProvider = "mtn" | "airtel" | "glo" | "9mobile";

const telcoProviders: TelcoProvider[] = ["mtn", "airtel", "glo", "9mobile"];

type Step =
  | "identity"
  | "phone"
  | "bvn"
  | "register"
  | "role"
  | "freelancer-bank"
  | "freelancer-income"
  | "freelancer-linkedin"
  | "corporate-email"
  | "corporate-payslip"
  | "corporate-bank"
  | "corporate-linkedin"
  | "government-details"
  | "government-payslip"
  | "government-bank"
  | "reveal";

type LenderStep =
  | "lender-register"
  | "lender-kyc"
  | "lender-config"
  | "lender-settlement"
  | "lender-complete";

const borrowerNext: Record<string, string> = {
  identity: "/onboarding/phone",
  phone: "/onboarding/bvn",
  bvn: "/onboarding/register",
  register: "/onboarding/role",
  role: "/onboarding/role",
  "freelancer-bank": "/onboarding/freelancer/income",
  "freelancer-income": "/onboarding/freelancer/linkedin",
  "freelancer-linkedin": "/onboarding/reveal",
  "corporate-email": "/onboarding/corporate/payslip",
  "corporate-payslip": "/onboarding/corporate/bank",
  "corporate-bank": "/onboarding/corporate/linkedin",
  "corporate-linkedin": "/onboarding/reveal",
  "government-details": "/onboarding/government/payslip",
  "government-payslip": "/onboarding/government/bank",
  "government-bank": "/onboarding/reveal",
  reveal: "/dashboard",
};

const flowSteps = [
  { id: "identity", label: "Identity", icon: ShieldCheck },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "bvn", label: "Vault", icon: Banknote },
  { id: "register", label: "Account", icon: BadgeCheck },
  { id: "role", label: "Role", icon: BriefcaseBusiness },
  { id: "reveal", label: "Score", icon: CheckCircle2 },
];

const allSteps = new Set(flowSteps.map((s) => s.id));

function stepIndex(step: string): number {
  return flowSteps.findIndex((s) => s.id === step);
}

function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    timer.current = setTimeout(onDismiss, 8000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [message, onDismiss]);
  return (
    <div className="mb-5 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span className="mt-0.5">!</span>
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="font-bold">
        &times;
      </button>
    </div>
  );
}

export function BorrowerOnboarding({ step }: { step: Step }) {
  const router = useRouter();
  const [draftId, setDraftId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const draft = api.general.getDraft.useQuery(
    { draftId },
    { enabled: Boolean(draftId) },
  );

  useEffect(() => {
    setDraftId(localStorage.getItem("creditgo_draft_id") ?? "");
  }, []);

  const saveDraftId = (value: string) => {
    localStorage.setItem("creditgo_draft_id", value);
    setDraftId(value);
  };

  const fail = (error: unknown) => {
    const msg = error instanceof Error ? error.message : "Request failed";
    setMessages((prev) => [...prev, msg]);
  };

  const dismiss = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const currentIdx = stepIndex(step);
  const prevStep = currentIdx > 0 ? flowSteps[currentIdx - 1] : null;
  const prevPath = prevStep
    ? `/onboarding/${prevStep.id === "role" ? "" : prevStep.id}`
    : null;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-block text-xl font-black tracking-tight text-emerald-800"
          >
            CreditGo
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {!allSteps.has(step) ? null : (
          <nav className="mt-6 mb-8">
            <ol className="flex items-center gap-1 text-sm">
              {flowSteps.map((s, idx) => {
                const done = idx < currentIdx;
                const active = idx === currentIdx;
                return (
                  <li key={s.id} className="flex items-center gap-1">
                    {idx > 0 && (
                      <ChevronRight className="h-3 w-3 text-stone-300" />
                    )}
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        active
                          ? "bg-emerald-100 text-emerald-800"
                          : done
                            ? "text-emerald-600"
                            : "text-stone-400"
                      }`}
                    >
                      <s.icon className="h-3 w-3" />
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm md:p-10">
          {prevPath && step !== "role" ? (
            <button
              onClick={() => router.push(prevPath!)}
              className="mb-6 flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : null}

          {messages.map((msg, idx) => (
            <ErrorBanner
              key={idx}
              message={msg}
              onDismiss={() => dismiss(idx)}
            />
          ))}

          {step === "identity" ? (
            <IdentityStep onDone={saveDraftId} onError={fail} />
          ) : step === "phone" ? (
            <PhoneStep
              draftId={draftId}
              phone={draft.data?.phone ?? ""}
              onError={fail}
            />
          ) : step === "bvn" ? (
            <BvnStep
              draftId={draftId}
              email={draft.data?.email ?? ""}
              onError={fail}
            />
          ) : step === "register" ? (
            <RegisterStep draftId={draftId} draft={draft.data} onError={fail} />
          ) : step === "role" ? (
            <RoleStep onError={fail} />
          ) : step.includes("bank") ? (
            <BankStep step={step} onError={fail} />
          ) : step === "freelancer-income" ? (
            <GigIncomeStep onError={fail} />
          ) : step.includes("linkedin") ? (
            <LinkedInStep next={borrowerNext[step] ?? "/onboarding/reveal"} />
          ) : step === "corporate-email" ? (
            <WorkEmailStep onError={fail} />
          ) : step.includes("payslip") ? (
            <PayslipStep
              government={step.startsWith("government")}
              onError={fail}
            />
          ) : step === "government-details" ? (
            <GovernmentDetailsStep onError={fail} />
          ) : (
            <RevealStep onError={fail} />
          )}
        </section>
      </div>
    </main>
  );
}

function IdentityStep({
  onDone,
  onError,
}: {
  onDone: (draftId: string) => void;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [nin, setNin] = useState("");
  const [showNin, setShowNin] = useState(false);
  const mutation = api.identification.verifyNin.useMutation();

  return (
    <StepShell
      icon={<ShieldCheck />}
      title="Verify your identity"
      subtitle="Enter your 11-digit National Identification Number (NIN) to get started."
    >
      <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your NIN is printed on your NIMC slip or linked to your SIM
        registration.
      </div>
      <Field
        label="NIN"
        value={nin}
        onChange={setNin}
        type={showNin ? "text" : "password"}
        inputMode="numeric"
        maxLength={11}
        placeholder="e.g. 12345678901"
        trailing={
          <button
            type="button"
            aria-label={showNin ? "Hide NIN" : "Show NIN"}
            onClick={() => setShowNin((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800"
          >
            {showNin ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
      />
      <PrimaryAction
        label="Verify & Continue"
        loading={mutation.isPending}
        disabled={nin.length !== 11}
        onClick={async () => {
          try {
            const result = await mutation.mutateAsync({ nin });
            onDone(result.draftId);
            router.push("/onboarding/phone");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function PhoneStep({
  draftId,
  phone,
  onError,
}: {
  draftId: string;
  phone: string;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [number, setNumber] = useState(phone);
  const [provider, setProvider] = useState<TelcoProvider>("mtn");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const start = api.identification.initiateTelco.useMutation();
  const verify = api.identification.verifyTelco.useMutation();

  useEffect(() => setNumber(phone), [phone]);

  return (
    <StepShell
      icon={<Phone />}
      title="Confirm your phone number"
      subtitle="We'll send a one-time code to verify your mobile line."
    >
      <Field
        label="Phone number"
        value={number}
        onChange={setNumber}
        inputMode="numeric"
        maxLength={11}
        placeholder="e.g. 08012345678"
      />
      <div>
        <div className="mb-2 text-sm font-semibold text-stone-700">
          Network provider
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {telcoProviders.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setProvider(item)}
              className={`rounded-lg border px-4 py-3 text-left font-semibold uppercase transition-colors ${
                provider === item
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <PrimaryAction
          label={sent ? "Resend OTP" : "Send OTP"}
          loading={start.isPending}
          disabled={number.length !== 11}
          onClick={async () => {
            try {
              await start.mutateAsync({ draftId, phone: number, provider });
              setSent(true);
            } catch (error) {
              onError(error);
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full px-5 text-base sm:w-auto"
          onClick={() => router.push("/onboarding/identity")}
        >
          Back
        </Button>
      </div>
      {sent ? (
        <div className="space-y-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-800">
            A 6-digit code was sent to your phone.
          </p>
          <Field
            label="OTP"
            value={otp}
            onChange={setOtp}
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
          />
          <PrimaryAction
            label="Verify Phone"
            loading={verify.isPending}
            disabled={otp.length !== 6}
            onClick={async () => {
              try {
                await verify.mutateAsync({ draftId, otp });
                router.push("/onboarding/bvn");
              } catch (error) {
                onError(error);
              }
            }}
          />
        </div>
      ) : null}
    </StepShell>
  );
}

function BvnStep({
  draftId,
  email,
  onError,
}: {
  draftId: string;
  email: string;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [bvn, setBvn] = useState("");
  const [emailValue, setEmailValue] = useState(email);
  const create = api.payment.createVault.useMutation();
  const skip = api.payment.skipVault.useMutation();

  useEffect(() => setEmailValue(email), [email]);

  return (
    <StepShell
      icon={<Banknote />}
      title="Set up your repayment vault"
      subtitle="Squad validates BVN details while creating your virtual repayment account."
    >
      <Field
        label="Email for vault"
        value={emailValue}
        onChange={setEmailValue}
        type="email"
      />
      <Field
        label="11-digit BVN"
        value={bvn}
        onChange={setBvn}
        inputMode="numeric"
        maxLength={11}
      />
      <PrimaryAction
        label="Create Vault"
        loading={create.isPending}
        onClick={async () => {
          try {
            await create.mutateAsync({ draftId, bvn, email: emailValue });
            router.push("/onboarding/register");
          } catch (error) {
            onError(error);
          }
        }}
      />
      <button
        type="button"
        className="text-sm font-semibold text-stone-500"
        onClick={async () => {
          await skip.mutateAsync({ draftId, email: emailValue || undefined });
          router.push("/onboarding/register");
        }}
      >
        Skip for now
      </button>
    </StepShell>
  );
}

function RegisterStep({
  draftId,
  draft,
  onError,
}: {
  draftId: string;
  draft:
    | {
        firstName?: string | null;
        lastName?: string | null;
        phone?: string | null;
        email?: string | null;
      }
    | null
    | undefined;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(draft?.email ?? "");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const complete = api.general.completeRegistration.useMutation();

  useEffect(() => setEmail(draft?.email ?? ""), [draft?.email]);

  return (
    <StepShell
      icon={<BadgeCheck />}
      title="Create your account"
      subtitle="Your verified identity details will be attached to this login."
    >
      <ReadOnly
        label="Name"
        value={`${draft?.firstName ?? ""} ${draft?.lastName ?? ""}`.trim()}
      />
      <ReadOnly label="Phone" value={draft?.phone ?? ""} />
      <Field label="Email" value={email} onChange={setEmail} type="email" />
      <Field
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
        />
        I agree to the Terms and Privacy Policy.
      </label>
      <PrimaryAction
        label="Create Account"
        loading={complete.isPending}
        onClick={async () => {
          try {
            if (!accepted)
              throw new Error("Accept the Terms and Privacy Policy.");
            if (
              !/[A-Z]/.test(password) ||
              !/\d/.test(password) ||
              password.length < 8
            ) {
              throw new Error(
                "Password must be 8+ characters with one uppercase letter and one number.",
              );
            }
            const name =
              `${draft?.firstName ?? ""} ${draft?.lastName ?? ""}`.trim() ||
              email;
            const result = await authClient.signUp.email({
              email,
              password,
              name,
            });
            if ("error" in result && result.error)
              throw new Error(result.error.message ?? "Sign up failed");
            await complete.mutateAsync({ draftId });
            router.push("/onboarding/role");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function RoleStep({ onError }: { onError: (error: unknown) => void }) {
  const router = useRouter();
  const mutation = api.general.selectPersona.useMutation();
  const roles = [
    [
      "freelancer",
      "Freelancer / Gig Worker",
      "Variable income from platforms, clients, or self-employment",
      "/onboarding/freelancer/bank",
      BriefcaseBusiness,
    ],
    [
      "corporate_worker",
      "Corporate Employee",
      "Private payroll and salary account verification",
      "/onboarding/corporate/email",
      Building2,
    ],
    [
      "government_official",
      "Government Worker",
      "Public payroll, agency details, grade level, and salary account",
      "/onboarding/government/details",
      Landmark,
    ],
  ] as const;

  return (
    <StepShell
      icon={<BriefcaseBusiness />}
      title="Choose how you earn"
      subtitle="This sets the verification path and scoring baseline."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map(([persona, title, description, href, Icon]) => (
          <button
            key={persona}
            type="button"
            className="rounded-lg border border-stone-200 p-5 text-left transition hover:border-emerald-500 hover:bg-emerald-50"
            onClick={async () => {
              try {
                await mutation.mutateAsync({ persona });
                router.push(href);
              } catch (error) {
                onError(error);
              }
            }}
          >
            <Icon className="mb-4 h-6 w-6 text-emerald-700" />
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm text-stone-500">{description}</p>
          </button>
        ))}
      </div>
    </StepShell>
  );
}

function BankStep({
  step,
  onError,
}: {
  step: Step;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const mutation = api.general.linkMonoBank.useMutation();
  const next = borrowerNext[step] ?? "/onboarding/reveal";
  const publicKey = process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY;

  const openMono = () => {
    const win = window as Window & {
      MonoConnect?: new (config: Record<string, unknown>) => {
        setup: () => void;
        open: () => void;
      };
    };
    if (!publicKey || !win.MonoConnect) return;
    const mono = new win.MonoConnect({
      key: publicKey,
      onSuccess: async ({ code: authCode }: { code: string }) => {
        await mutation.mutateAsync({ code: authCode });
        router.push(next);
      },
    });
    mono.setup();
    mono.open();
  };

  return (
    <StepShell
      icon={<LinkIcon />}
      title="Link your bank account"
      subtitle="Mono Connect returns an authorization code which is exchanged server-side for the account ID."
    >
      <ScriptNotice />
      <Button
        type="button"
        onClick={openMono}
        disabled={!publicKey || mutation.isPending}
      >
        Open Mono Connect
      </Button>
      <div className="border-t border-stone-100 pt-4">
        <Field
          label="Mono authorization code"
          value={code}
          onChange={setCode}
        />
        <PrimaryAction
          label="Submit Code"
          loading={mutation.isPending}
          onClick={async () => {
            try {
              await mutation.mutateAsync({ code });
              router.push(next);
            } catch (error) {
              onError(error);
            }
          }}
        />
      </div>
    </StepShell>
  );
}

function GigIncomeStep({ onError }: { onError: (error: unknown) => void }) {
  const router = useRouter();
  const [platformId, setPlatformId] = useState("1");
  const platforms = api.general.listGigPlatforms.useQuery();
  const mutation = api.general.createGigIncomeSession.useMutation();
  const options = useMemo(() => {
    if (!Array.isArray(platforms.data) || platforms.data.length === 0) {
      return [{ id: 1, name: "Upwork / Fiverr / Deel / Shopify" }];
    }
    return platforms.data.map((item, index) => {
      const value = item as Record<string, unknown>;
      return {
        id: Number(value.id ?? value.platformId ?? index + 1),
        name: String(value.name ?? value.title ?? `Platform ${index + 1}`),
      };
    });
  }, [platforms.data]);

  return (
    <StepShell
      icon={<BadgeCheck />}
      title="Verify your income sources"
      subtitle="Cr3dentials creates a secure browser session and posts proof results by webhook."
    >
      <label className="space-y-2 text-sm font-semibold">
        Platform
        <select
          className="w-full rounded-md border border-stone-300 px-3 py-2"
          value={platformId}
          onChange={(event) => setPlatformId(event.target.value)}
        >
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <PrimaryAction
        label="Create Verification Session"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            const session = await mutation.mutateAsync({
              platformId: Number(platformId),
            });
            if (session.embedUrl)
              window.open(session.embedUrl, "_blank", "noopener,noreferrer");
            router.push("/onboarding/freelancer/linkedin");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function WorkEmailStep({ onError }: { onError: (error: unknown) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devCode, setDevCode] = useState<string | undefined>();
  const send = api.general.sendWorkEmailOtp.useMutation();
  const verify = api.general.verifyWorkEmailOtp.useMutation();

  return (
    <StepShell
      icon={<Mail />}
      title="Verify your work email"
      subtitle="Personal email domains are rejected for this step."
    >
      <Field
        label="Work email"
        value={email}
        onChange={setEmail}
        type="email"
      />
      <PrimaryAction
        label="Send OTP"
        loading={send.isPending}
        onClick={async () => {
          try {
            const result = await send.mutateAsync({ email });
            setDevCode(result.devCode);
          } catch (error) {
            onError(error);
          }
        }}
      />
      {devCode ? (
        <p className="text-sm text-stone-500">Development OTP: {devCode}</p>
      ) : null}
      <Field
        label="6-digit OTP"
        value={otp}
        onChange={setOtp}
        inputMode="numeric"
        maxLength={6}
      />
      <PrimaryAction
        label="Verify Email"
        loading={verify.isPending}
        onClick={async () => {
          try {
            await verify.mutateAsync({ email, otp });
            router.push("/onboarding/corporate/payslip");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function PayslipStep({
  government,
  onError,
}: {
  government: boolean;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const mutation = api.general.analyzePayslip.useMutation();

  return (
    <StepShell
      icon={<Upload />}
      title="Upload your latest payslip"
      subtitle="Paste OCR text or extracted PDF text. The server parser validates name, salary, date, and government deduction patterns where applicable."
    >
      <textarea
        className="min-h-52 w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Employer: ...&#10;Employee: ...&#10;Net Salary: ...&#10;Pay Date: ..."
      />
      <PrimaryAction
        label="Analyze Payslip"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            await mutation.mutateAsync({ text, government });
            router.push(
              government
                ? "/onboarding/government/bank"
                : "/onboarding/corporate/bank",
            );
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function GovernmentDetailsStep({
  onError,
}: {
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [agencyName, setAgencyName] = useState("");
  const [staffIdentifier, setStaffIdentifier] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const mutation = api.general.saveGovernmentDetails.useMutation();
  return (
    <StepShell
      icon={<Landmark />}
      title="Tell us about your role"
      subtitle="IPPIS or staff ID is stored for reference only."
    >
      <Field
        label="Agency, ministry, or parastatal"
        value={agencyName}
        onChange={setAgencyName}
      />
      <Field
        label="Staff ID / IPPIS Number"
        value={staffIdentifier}
        onChange={setStaffIdentifier}
      />
      <Field
        label="Grade Level & Step"
        value={gradeLevel}
        onChange={setGradeLevel}
      />
      <PrimaryAction
        label="Continue"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            await mutation.mutateAsync({
              agencyName,
              staffIdentifier,
              gradeLevel,
            });
            router.push("/onboarding/government/payslip");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function LinkedInStep({ next }: { next: string }) {
  return (
    <StepShell
      icon={<LinkIcon />}
      title="Connect LinkedIn"
      subtitle="Optional score boost when the professional identity matches your verified profile."
    >
      <Button asChild>
        <a href={`/api/linkedin/start?next=${encodeURIComponent(next)}`}>
          Connect LinkedIn
        </a>
      </Button>
      <Button asChild variant="outline">
        <Link href={next}>Skip for now</Link>
      </Button>
    </StepShell>
  );
}

function RevealStep({ onError }: { onError: (error: unknown) => void }) {
  const router = useRouter();
  const mutation = api.ml.scoreMe.useMutation();
  const score = mutation.data;
  return (
    <StepShell
      icon={<CheckCircle2 />}
      title={score ? "Congratulations" : "Calculate your Trust Score"}
      subtitle="The ML service is tried first; if it is unavailable, the server applies the rule-based fallback."
    >
      {score ? (
        <div className="space-y-5">
          <div className="flex items-end gap-4">
            <div className="text-7xl font-black text-emerald-700">
              {score.trust_score}
            </div>
            <div className="pb-2 text-lg font-bold text-stone-500 uppercase">
              {score.tier}
            </div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4 text-2xl font-black text-emerald-900">
            Safe Limit: ₦{score.safe_limit_ngn.toLocaleString()}
          </div>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <PrimaryAction
          label="Reveal Score"
          loading={mutation.isPending}
          onClick={async () => {
            try {
              await mutation.mutateAsync();
            } catch (error) {
              onError(error);
            }
          }}
        />
      )}
    </StepShell>
  );
}

export function LenderOnboarding({ step }: { step: LenderStep }) {
  const router = useRouter();
  const [lenderId, setLenderId] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(
    () => setLenderId(localStorage.getItem("creditgo_lender_id") ?? ""),
    [],
  );
  const save = (id: string) => {
    localStorage.setItem("creditgo_lender_id", id);
    setLenderId(id);
  };
  const onError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : "Request failed";
    setMessages((prev) => [...prev, msg]);
  };

  const lendersSteps = [
    { id: "lender-register", label: "Register", icon: Building2 },
    { id: "lender-kyc", label: "KYC", icon: ShieldCheck },
    { id: "lender-config", label: "Config", icon: BriefcaseBusiness },
    { id: "lender-settlement", label: "Settlement", icon: Banknote },
    { id: "lender-complete", label: "Done", icon: CheckCircle2 },
  ];
  const currentIdx = lendersSteps.findIndex((s) => s.id === step);
  const prevStep = currentIdx > 0 ? lendersSteps[currentIdx - 1] : null;
  const prevPath = prevStep
    ? `/onboarding/lender/${prevStep.id.replace("lender-", "")}`
    : null;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Link
          href="/"
          className="inline-block text-xl font-black tracking-tight text-blue-900"
        >
          CreditGo Partners
        </Link>

        <nav className="mt-6 mb-8">
          <ol className="flex items-center gap-1 text-sm">
            {lendersSteps.map((s, idx) => {
              const done = idx < currentIdx;
              const active = idx === currentIdx;
              return (
                <li key={s.id} className="flex items-center gap-1">
                  {idx > 0 && (
                    <ChevronRight className="h-3 w-3 text-stone-300" />
                  )}
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      active
                        ? "bg-blue-100 text-blue-800"
                        : done
                          ? "text-blue-600"
                          : "text-stone-400"
                    }`}
                  >
                    <s.icon className="h-3 w-3" />
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm md:p-10">
          {prevPath ? (
            <button
              onClick={() => router.push(prevPath!)}
              className="mb-6 flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : null}

          {messages.map((msg, idx) => (
            <ErrorBanner
              key={idx}
              message={msg}
              onDismiss={() =>
                setMessages((prev) => prev.filter((_, i) => i !== idx))
              }
            />
          ))}

          {step === "lender-register" ? (
            <LenderRegister onDone={save} onError={onError} />
          ) : step === "lender-kyc" ? (
            <LenderKyc lenderId={lenderId} onError={onError} />
          ) : step === "lender-config" ? (
            <LenderConfig lenderId={lenderId} onError={onError} />
          ) : step === "lender-settlement" ? (
            <LenderSettlement lenderId={lenderId} onError={onError} />
          ) : (
            <StepShell
              icon={<CheckCircle2 />}
              title="Partner account ready"
              subtitle="Your dashboard and API access are ready once your saved API key is configured in your systems."
            >
              <Button onClick={() => router.push("/")}>Return Home</Button>
            </StepShell>
          )}
        </section>
      </div>
    </main>
  );
}

function LenderRegister({
  onDone,
  onError,
}: {
  onDone: (id: string) => void;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const mutation = api.general.verifyCac.useMutation();
  return (
    <StepShell
      icon={<Building2 />}
      title="Register your business"
      subtitle="Enter your CAC registration number to verify an active company."
    >
      <Field
        label="Business email"
        value={email}
        onChange={setEmail}
        type="email"
      />
      <Field
        label="CAC registration number"
        value={rcNumber}
        onChange={setRcNumber}
      />
      <PrimaryAction
        label="Verify Business"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            const result = await mutation.mutateAsync({ email, rcNumber });
            onDone(result.lenderId);
            router.push("/onboarding/lender/kyc");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function LenderKyc({
  lenderId,
  onError,
}: {
  lenderId: string;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");
  const mutation = api.general.verifyDirectorKyc.useMutation();
  return (
    <StepShell
      icon={<ShieldCheck />}
      title="Verify the business director"
      subtitle="Director NIN is checked with LumiID. BVN is stored for Squad validation/account setup."
    >
      <Field
        label="Director NIN"
        value={nin}
        onChange={setNin}
        inputMode="numeric"
        maxLength={11}
      />
      <Field
        label="Director BVN"
        value={bvn}
        onChange={setBvn}
        inputMode="numeric"
        maxLength={11}
      />
      <PrimaryAction
        label="Verify Director"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            await mutation.mutateAsync({ lenderId, nin, bvn });
            router.push("/onboarding/lender/config");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function LenderConfig({
  lenderId,
  onError,
}: {
  lenderId: string;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [minTrustScore, setMinTrustScore] = useState(40);
  const [maxPerBorrower, setMaxPerBorrower] = useState(5000000);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(500000);
  const mutation = api.general.saveLenderConfig.useMutation();
  const assetCategories = [
    "Laptops",
    "Phones",
    "Solar Panels",
    "Home Appliances",
    "Rent",
    "School Fees",
  ];
  const targetNiches = [
    "Freelancers",
    "Corporate Workers",
    "Government Workers",
    "All",
  ];
  return (
    <StepShell
      icon={<BriefcaseBusiness />}
      title="Platform configuration"
      subtitle="Set borrower filters and approval guardrails."
    >
      <Checklist
        title="Asset categories"
        options={assetCategories}
        storageKey="creditgo_lender_assets"
      />
      <Checklist
        title="Target niches"
        options={targetNiches}
        storageKey="creditgo_lender_niches"
      />
      <NumberField
        label="Minimum Trust Score"
        value={minTrustScore}
        onChange={setMinTrustScore}
      />
      <NumberField
        label="Max loan amount per borrower"
        value={maxPerBorrower}
        onChange={setMaxPerBorrower}
      />
      <NumberField
        label="Auto-approve under"
        value={autoApproveThreshold}
        onChange={setAutoApproveThreshold}
      />
      <PrimaryAction
        label="Save Configuration"
        loading={mutation.isPending}
        onClick={async () => {
          try {
            await mutation.mutateAsync({
              lenderId,
              assetCategories: readList(
                "creditgo_lender_assets",
                assetCategories,
              ),
              targetNiches: readList("creditgo_lender_niches", ["All"]),
              minTrustScore,
              maxPerBorrower,
              autoApproveThreshold,
            });
            router.push("/onboarding/lender/settlement");
          } catch (error) {
            onError(error);
          }
        }}
      />
    </StepShell>
  );
}

function LenderSettlement({
  lenderId,
  onError,
}: {
  lenderId: string;
  onError: (error: unknown) => void;
}) {
  const router = useRouter();
  const [bankName, setBankName] = useState("GTBank");
  const [bankCode, setBankCode] = useState("058");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const lookup = api.payment.resolveNuban.useMutation();
  const save = api.general.saveLenderSettlement.useMutation();
  return (
    <StepShell
      icon={<Banknote />}
      title="Where should we send payouts?"
      subtitle="Squad resolves the account name; mismatches require explicit override."
    >
      <Field label="Bank name" value={bankName} onChange={setBankName} />
      <Field label="Bank code" value={bankCode} onChange={setBankCode} />
      <Field
        label="Account number"
        value={accountNumber}
        onChange={setAccountNumber}
        inputMode="numeric"
        maxLength={10}
      />
      <PrimaryAction
        label="Verify Account"
        loading={lookup.isPending}
        onClick={async () => {
          try {
            const result = await lookup.mutateAsync({
              bankCode,
              accountNumber,
            });
            setAccountName(result.accountName);
          } catch (error) {
            onError(error);
          }
        }}
      />
      <Field
        label="Resolved account name"
        value={accountName}
        onChange={setAccountName}
      />
      <PrimaryAction
        label="Complete Partner Setup"
        loading={save.isPending}
        onClick={async () => {
          try {
            const result = await save.mutateAsync({
              lenderId,
              bankName,
              bankCode,
              accountNumber,
              accountName,
              overrideNameMismatch: true,
            });
            setApiKey(result.apiKey);
            router.push("/onboarding/lender/complete");
          } catch (error) {
            onError(error);
          }
        }}
      />
      {apiKey ? (
        <pre className="overflow-auto rounded-md bg-stone-950 p-4 text-xs text-white">
          {apiKey}
        </pre>
      ) : null}
    </StepShell>
  );
}

function StepShell({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <div>
        <h1 className="text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-stone-500">{subtitle}</p>
      </div>
      <div className="max-w-2xl space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  maxLength,
  placeholder,
  trailing,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  placeholder?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-semibold text-stone-700">
      {label}
      <span className="relative block">
        <input
          className={`w-full rounded-lg border border-stone-300 px-3.5 py-2.5 font-normal transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${trailing ? "pr-12" : ""}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {trailing ? (
          <span className="absolute top-1/2 right-1.5 -translate-y-1/2">
            {trailing}
          </span>
        ) : null}
      </span>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Field
      label={label}
      value={String(value)}
      onChange={(next) => onChange(Number(next.replace(/[^\d]/g, "")))}
      inputMode="numeric"
    />
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2">
      <div className="text-xs font-bold text-stone-400 uppercase">{label}</div>
      <div className="font-semibold">{value || "Pending"}</div>
    </div>
  );
}

function PrimaryAction({
  label,
  loading,
  disabled,
  onClick,
}: {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void | Promise<void>;
}) {
  return (
    <Button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="h-11 w-full px-5 text-base sm:w-auto"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Working...
        </span>
      ) : (
        label
      )}
    </Button>
  );
}

function Checklist({
  title,
  options,
  storageKey,
}: {
  title: string;
  options: string[];
  storageKey: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    setSelected(readList(storageKey, []));
  }, [storageKey]);
  return (
    <div>
      <div className="mb-2 text-sm font-bold">{title}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 rounded-md border border-stone-200 px-3 py-2 text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(event) => {
                const next = event.target.checked
                  ? [...selected, option]
                  : selected.filter((item) => item !== option);
                localStorage.setItem(storageKey, JSON.stringify(next));
                setSelected(next);
              }}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

function readList(key: string, fallback: string[]) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "null") as unknown;
    return Array.isArray(parsed) && parsed.length
      ? parsed.map(String)
      : fallback;
  } catch {
    return fallback;
  }
}

function ScriptNotice() {
  useEffect(() => {
    if (document.querySelector("script[data-mono-connect]")) return;
    const script = document.createElement("script");
    script.src = "https://connect.withmono.com/connect.js";
    script.async = true;
    script.dataset.monoConnect = "true";
    document.body.appendChild(script);
  }, []);
  return null;
}
