import type { Metadata } from "next";
import { SERVICE_KEYWORDS, CORE_LOCATION_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Auto Repair & Car Maintenance Services Sharjah | Bab Al Bustan",
  description:
    "Explore our complete range of certified car services in Sharjah Industrial Area 5: Computer Diagnostics, AC Repair & Gas Refill, Synthetic Oil Change, Ceramic Brake Service, Suspension Repair, and ECU Programming.",
  keywords: [
    ...CORE_LOCATION_KEYWORDS.slice(0, 15),
    ...Object.values(SERVICE_KEYWORDS).flat().slice(0, 25),
  ],
  alternates: {
    canonical: "https://babalbustan.ae/services",
  },
  openGraph: {
    title: "Auto Repair & Car Maintenance Services Sharjah | Bab Al Bustan",
    description:
      "Full car service and mechanical repair in Sharjah Industrial Area 5. Certified technicians, transparent pricing, and fast turnaround.",
    url: "https://babalbustan.ae/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

