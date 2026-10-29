import React from "react";
import type { Metadata } from "next";
import FAQPage from "@/app/faq/page";
import { CORE_LOCATION_KEYWORDS } from "@/data/seoKeywords";

export const metadata: Metadata = {
  title: "FAQs | Car Repair & Maintenance Questions Sharjah | Bab Al Bustan",
  description:
    "Find answers to frequently asked questions about vehicle repair costs, oil changes, AC maintenance, warranty coverage, and booking in Sharjah Industrial Area 5.",
  keywords: [
    "car repair FAQs Sharjah",
    "workshop warranty Sharjah",
    "car service price Sharjah",
    ...CORE_LOCATION_KEYWORDS.slice(0, 10),
  ],
  alternates: {
    canonical: "https://babalbustan.ae/faqs",
  },
};

export default function FAQsRoute() {
  return <FAQPage />;
}
