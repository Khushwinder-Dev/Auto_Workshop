import type { Metadata } from "next";
import { PAGE_SPECIFIC_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "About Bab Al Bustan Auto Maintenance | Trusted Car Workshop Sharjah",
  description:
    "Learn about Bab Al Bustan Auto Maintenance Workshop in Sharjah Industrial Area 5. Over 15 years of certified multi-brand automotive expertise, precision tools, and honest car service.",
  keywords: PAGE_SPECIFIC_KEYWORDS.about,
  alternates: {
    canonical: "https://babalbustan.ae/about-us",
  },
  openGraph: {
    title: "About Bab Al Bustan Auto Maintenance | Sharjah Industrial Area 5",
    description:
      "Experienced automotive technicians and modern diagnostic facility dedicated to delivering quality, reliable car repairs in Sharjah.",
    url: "https://babalbustan.ae/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

