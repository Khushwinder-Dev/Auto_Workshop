import type { Metadata } from "next";
import { ALL_CLIENT_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Service Details | Car Repair & Maintenance Sharjah | Bab Al Bustan",
  description:
    "Detailed specifications, diagnostic process, parts warranty, and service packages for automotive repairs at Bab Al Bustan Auto Maintenance Workshop Sharjah Industrial Area 5.",
  keywords: ALL_CLIENT_KEYWORDS.slice(0, 30),
  alternates: {
    canonical: "https://babalbustan.ae/services-details",
  },
};

export default function ServiceDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

