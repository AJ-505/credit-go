import { LenderShell } from "@/components/lender/lender-shell";

export default function LenderLayout({ children }: { children: React.ReactNode }) {
  return <LenderShell>{children}</LenderShell>;
}
