import type { Metadata } from "next";
import { PAGE_SPECIFIC_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Car Repair Gallery Sharjah | Workshop Photos & Repair Projects",
  description:
    "View our car repair gallery at Bab Al Bustan Auto Maintenance Sharjah Industrial Area 5. Photos of engine diagnostics, AC repairs, suspension work, and luxury vehicle servicing.",
  keywords: PAGE_SPECIFIC_KEYWORDS.gallery,
  alternates: {
    canonical: "https://babalbustan.ae/gallery",
  },
  openGraph: {
    title: "Workshop Photos & Repair Projects | Bab Al Bustan Sharjah",
    description:
      "Explore real photos and videos from inside Bab Al Bustan Auto Maintenance workshop in Sharjah UAE.",
    url: "https://babalbustan.ae/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

