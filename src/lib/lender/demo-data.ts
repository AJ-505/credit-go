import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FileText,
  Home,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

export const lenderNavItems = [
  { label: "Dashboard", href: "/dashboard/lender", icon: Home },
  { label: "Leads", href: "/dashboard/lender/leads", icon: Users },
  { label: "Approvals", href: "/dashboard/lender/approvals", icon: CheckCircle2 },
  { label: "My Borrowers", href: "/dashboard/lender/borrowers", icon: ShieldAlert },
  { label: "Portfolio", href: "/dashboard/lender/portfolio", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/lender/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/lender/settings", icon: Settings },
] as const;

export const lenderProfile = {
  businessName: "BlueBridge Credit",
  settlement: "Providus Bank • 1034••••89",
  apiKey: "cg_live_84hf••••9abd",
  webhook: "https://bluebridge.creditgo.ng/webhooks/alerts",
};

export const kpis = [
  { label: "Active Loans", value: "₦452.0M", detail: "1,247 borrowers", trend: "+8.4%" },
  { label: "Total Disbursed", value: "₦482.0M", detail: "This month: +₦52M", trend: "+12.1%" },
  { label: "Interest Earned", value: "₦38.2M", detail: "This month: +₦4.1M", trend: "+11.8%" },
  { label: "Default Rate", value: "1.3%", detail: "vs 1.5% last month", trend: "-0.2%" },
  { label: "Avg Trust Score", value: "68", detail: "Gold median book", trend: "+2 pts" },
] as const;

export const leads = [
  {
    id: "ce-001",
    name: "C. E.",
    persona: "Corporate",
    score: 81,
    tier: "Platinum",
    niche: "Laptops",
    seeking: "₦2.7M",
    state: "Lagos",
    risk: "Low",
    product: 'MacBook Pro 14" M4',
    tenor: "12 months",
    monthly: "₦225,000",
    signals: ["Savings streak: 34 days", "Bank history: 8 months", "Income stability: High", "Linked accounts: 1 bank + LinkedIn"],
  },
  {
    id: "jo-002",
    name: "J. O.",
    persona: "Freelancer",
    score: 72,
    tier: "Gold",
    niche: "Solar",
    seeking: "₦3.4M",
    state: "Abuja",
    risk: "Moderate",
    product: "Home solar kit",
    tenor: "18 months",
    monthly: "₦188,900",
    signals: ["Savings streak: 21 days", "Bank history: 14 months", "Income stability: Medium", "Linked accounts: 2 banks"],
  },
  {
    id: "fa-003",
    name: "F. A.",
    persona: "Government",
    score: 65,
    tier: "Gold",
    niche: "Rent",
    seeking: "₦800K",
    state: "Rivers",
    risk: "Low",
    product: "Rent financing",
    tenor: "10 months",
    monthly: "₦80,000",
    signals: ["Savings streak: 45 days", "Bank history: 10 months", "Income stability: High", "Linked accounts: Payroll + bank"],
  },
  {
    id: "ya-004",
    name: "Y. A.",
    persona: "Corporate",
    score: 58,
    tier: "Silver",
    niche: "Devices",
    seeking: "₦520K",
    state: "Oyo",
    risk: "Watch",
    product: "Phone bundle",
    tenor: "6 months",
    monthly: "₦86,700",
    signals: ["Savings streak: 8 days", "Bank history: 5 months", "Income stability: Medium", "Linked accounts: 1 bank"],
  },
] as const;

export const approvals = [
  { id: "app-jo", applicant: "James O.", product: "Rent", amount: "₦800K", score: 72, vault: "₦200K", status: "Pending", income: "₦620,000/month", dti: "0.24", probability: "8.2%", safeLimit: "₦1.5M" },
  { id: "app-ce", applicant: "Chioma E.", product: "Laptop", amount: "₦2.7M", score: 81, vault: "₦500K", status: "Pending", income: "₦1,100,000/month", dti: "0.20", probability: "5.6%", safeLimit: "₦4.2M" },
  { id: "app-ya", applicant: "Yusuf A.", product: "Solar", amount: "₦3.4M", score: 58, vault: "₦100K", status: "Flagged", income: "₦780,000/month", dti: "0.31", probability: "15.9%", safeLimit: "₦2.4M" },
] as const;

export const borrowers = [
  { id: "bor-ce", name: "Chioma Eze", masked: "C. E.", phone: "+234 803 442 1980", email: "chioma.eze@flutterwave.com", product: "Laptop", score: "81 → 83", vault: "₦500K", streak: "45 days", health: "Good", remaining: "₦1.8M", lastPayment: "2 days ago" },
  { id: "bor-jo", name: "James Okafor", masked: "J. O.", phone: "+234 706 221 8804", email: "james@studiojo.co", product: "Rent", score: "72 → 68", vault: "₦200K", streak: "12 days", health: "Watch", remaining: "₦640K", lastPayment: "5 days ago" },
  { id: "bor-fa", name: "Funke Adeleke", masked: "F. A.", phone: "+234 809 117 4408", email: "funke.adeleke@finance.gov.ng", product: "Solar", score: "65 → 45", vault: "₦100K", streak: "0 days", health: "Alert", remaining: "₦2.9M", lastPayment: "11 days ago" },
] as const;

export const activities = [
  "Loan approved: James O. - ₦520,000 device financing",
  "Alert: Chioma E. - score recovered 4pts after vault top-up",
  "Default flagged: Yusuf A. - missed third installment",
  "New lead: Freelancer in Lagos, Trust 72, seeking ₦800K",
  "Borrower caught up: Funke A. - paid 2 missed installments",
] as const;

export const upsells = [
  { borrower: "C. E.", tier: "Gold 81", product: "Solar", amount: "₦3.4M", window: "42h left" },
  { borrower: "J. O.", tier: "Gold 72", product: "Laptop", amount: "₦1.8M", window: "28h left" },
] as const;

export const registry = [
  { borrower: "J. A.", amount: "₦200K", product: "Laptop", date: "May 2026", origin: "EasyBuy", reported: "Ready" },
  { borrower: "K. O.", amount: "₦1.2M", product: "Rent", date: "Apr 2026", origin: "Spleet", reported: "Submitted" },
] as const;

export function findById<T extends { id: string }>(items: readonly T[], id: string) {
  const fallback = items[0];
  if (!fallback) {
    throw new Error("Demo dataset must include at least one item.");
  }

  return items.find((item) => item.id === id) ?? fallback;
}
