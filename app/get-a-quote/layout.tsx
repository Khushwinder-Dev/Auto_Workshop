import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Bab Al Bustan Auto Maintenance Workshop Sharjah",
  description:
    "Request a free quote for car repairs, computer diagnostics, oil changes, brake replacement, and full maintenance in Sharjah.",
  alternates: {
    canonical: "https://babalbustan.ae/quote",
  },
};

export default function GetAQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
