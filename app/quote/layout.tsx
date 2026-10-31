import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get an Instant Auto Repair Quote | Bab Al Bustan Auto Maintenance Sharjah",
  description:
    "Request an instant, transparent quote for car repairs, engine diagnostics, oil changes, brake service, AC repairs, and mechanical maintenance in Sharjah Industrial Area 5.",
  alternates: {
    canonical: "https://babalbustan.ae/quote",
  },
  openGraph: {
    title: "Get an Instant Auto Repair Quote | Bab Al Bustan Workshop Sharjah",
    description:
      "Get a free, transparent quote for vehicle repairs and maintenance from certified technicians at Bab Al Bustan Auto Maintenance Workshop.",
    url: "https://babalbustan.ae/quote",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

