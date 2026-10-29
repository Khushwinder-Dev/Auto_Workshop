import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import FeatureSection from "@/components/Home/FeatureSection";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";
import AppointmentFormSection from "@/components/Home/AppointmentFormSection";
import WorkProcessSection from "@/components/Home/WorkProcessSection";
import RecentWorkSection from "@/components/Home/RecentWorkSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import TestimonialSection from "@/components/Home/TestimonialSection";
import FaqSection from "@/components/Home/FaqSection";
import StatsSection from "@/components/Home/StatsSection";
import LatestInsightsSection from "@/components/Home/LatestInsightsSection";
import FourStepProcessSection from "@/components/Home/FourStepProcessSection";

export const metadata: Metadata = {
  title: "Car Repair Sharjah | Best Car Garage Sharjah Industrial Area 5 | Bab Al Bustan",
  description:
    "Looking for the best car workshop in Sharjah? Bab Al Bustan Auto Maintenance in Industrial Area 5 offers professional auto repair, engine diagnostics, car AC service, brake repair, oil changes, and multi-brand car maintenance.",
  keywords: [
    "car repair Sharjah",
    "car garage Sharjah Industrial Area 5",
    "car maintenance Sharjah",
    "auto repair Sharjah",
    "best car workshop in Sharjah",
    "car mechanic Sharjah",
    "car service Sharjah",
    "full car service Sharjah",
    "car mechanic near me",
    "car garage near me",
    "car workshop near me Sharjah",
    "auto repair workshop Sharjah UAE",
    "car service UAE",
    "صيانة سيارات الشارقة",
    "كراج سيارات الشارقة",
    "إصلاح سيارات الشارقة",
  ],
  alternates: {
    canonical: "https://babalbustan.ae",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div>
          <HeroSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <ServicesSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <FeatureSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <WhyChooseUsSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <AppointmentFormSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <WorkProcessSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <RecentWorkSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <PartnershipSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="150">
          <TestimonialSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <FaqSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <StatsSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <LatestInsightsSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <FourStepProcessSection />
        </div>
      </main>
    </div>
  );
}
