import type { Metadata } from "next";
import { BRAND_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "Car Brands Serviced in Sharjah | German, Japanese & American Specialists",
  description:
    "Expert multi-brand car repair and service in Sharjah Industrial Area 5. Specialists in BMW, Mercedes-Benz, Audi, Porsche, Land Rover, Toyota, Nissan, Lexus, Honda, Ford, and American vehicles.",
  keywords: [
    ...BRAND_KEYWORDS.general,
    ...BRAND_KEYWORDS.bmw,
    ...BRAND_KEYWORDS.mercedes,
    ...BRAND_KEYWORDS.toyota,
    ...BRAND_KEYWORDS.nissan,
    ...BRAND_KEYWORDS.lexus,
    ...BRAND_KEYWORDS.landrover,
  ],
  alternates: {
    canonical: "https://babalbustan.ae/brands",
  },
  openGraph: {
    title: "Car Brands Serviced in Sharjah | Bab Al Bustan Auto Maintenance",
    description:
      "OEM-standard maintenance and diagnostics for German, Japanese, American and European car brands in Sharjah UAE.",
    url: "https://babalbustan.ae/brands",
  },
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

