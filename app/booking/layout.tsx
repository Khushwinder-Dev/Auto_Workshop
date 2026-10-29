import type { Metadata } from "next";
import { PAGE_SPECIFIC_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Book Car Service Sharjah | Car Repair Appointment | Bab Al Bustan",
  description:
    "Schedule your vehicle service or repair appointment online with Bab Al Bustan Auto Maintenance in Sharjah Industrial Area 5. Same-day service and pickup/drop available.",
  keywords: PAGE_SPECIFIC_KEYWORDS.booking,
  alternates: {
    canonical: "https://babalbustan.ae/booking",
  },
  openGraph: {
    title: "Book Car Service Sharjah | Bab Al Bustan Auto Maintenance",
    description:
      "Easy online car maintenance and repair appointment in Sharjah. Instant confirmation.",
    url: "https://babalbustan.ae/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

