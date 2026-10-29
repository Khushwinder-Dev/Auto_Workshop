import type { Metadata } from "next";
import { PAGE_SPECIFIC_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Car Maintenance Tips UAE & Repair Guides | Bab Al Bustan Blog",
  description:
    "Expert automotive maintenance tips, advice for UAE weather, AC care, oil change guides, and brake safety from certified mechanics in Sharjah.",
  keywords: PAGE_SPECIFIC_KEYWORDS.blogs,
  alternates: {
    canonical: "https://babalbustan.ae/blogs",
  },
  openGraph: {
    title: "Car Maintenance Tips UAE | Bab Al Bustan Auto Maintenance Blog",
    description:
      "Automotive advice and practical vehicle maintenance tips for motorists in Sharjah and across the UAE.",
    url: "https://babalbustan.ae/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

