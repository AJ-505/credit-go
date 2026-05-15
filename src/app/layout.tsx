import "@/styles/globals.css";

import { type Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "CreditGo | Smarter Credit Access",
  description: "Credit eligibility and asset financing based on true cash flow.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased text-foreground bg-background transition-colors duration-300">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
