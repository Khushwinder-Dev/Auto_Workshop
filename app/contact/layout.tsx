import type { Metadata } from "next";
import { PAGE_SPECIFIC_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Contact Car Garage Sharjah | Bab Al Bustan Auto Maintenance",
  description:
    "Get in touch with Bab Al Bustan Auto Maintenance Workshop in Sharjah Industrial Area 5. Call or visit for fast car repairs, quotes, diagnostic bookings, and direction inquiries.",
  keywords: PAGE_SPECIFIC_KEYWORDS.contact,
  alternates: {
    canonical: "https://babalbustan.ae/contact",
  },
  openGraph: {
    title: "Contact Bab Al Bustan Auto Maintenance Workshop | Sharjah",
    description:
      "Locate our auto repair workshop in Sharjah Industrial Area 5. Fast appointment booking and roadside support.",
    url: "https://babalbustan.ae/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

