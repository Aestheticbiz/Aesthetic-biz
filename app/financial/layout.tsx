import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What one extra patient a week is worth",
  description:
    "A profit calculator for aesthetic practice owners. Put in your own rent, staff, treatment fees and retail, then see what one extra patient a week does to monthly and annual profit.",
  robots: { index: true, follow: true },
};

export default function FinancialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
