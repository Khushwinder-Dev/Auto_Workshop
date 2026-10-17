import React from "react";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import FeatureSection from "@/components/Home/FeatureSection";
import WhyUsSection from "@/components/Home/WhyUsSection";
import AppointmentFormSection from "@/components/Home/AppointmentFormSection";
import WorkProcessSection from "@/components/Home/WorkProcessSection";
import RecentWorkSection from "@/components/Home/RecentWorkSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import FaqSection from "@/components/Home/FaqSection";
import StatsSection from "@/components/Home/StatsSection";
import LatestInsightsSection from "@/components/Home/LatestInsightsSection";
import FourStepProcessSection from "@/components/Home/FourStepProcessSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section with Glass Stats */}
      <HeroSection />

      {/* 2. Professional Services Grid */}
      <ServicesSection />

      {/* 3. "We Go Beyond Just a Car Maintenance" */}
      <FeatureSection />

      {/* 4. "Professional Car Maintenance in Sharjah" */}
      <WhyUsSection />

      {/* 5. Appointment Quote Form & Assurance Banner */}
      <AppointmentFormSection />

      {/* 6. Work Process ("How We Work") */}
      <WorkProcessSection />

      {/* 7. "Our Recent Work" Portfolio Carousel */}
      <RecentWorkSection />

      {/* 8. Brand Partnerships */}
      <PartnershipSection />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />

      {/* 10. Experience & Satisfaction Counters */}
      <StatsSection />

      {/* 11. Latest Insights & Technical Guides */}
      <LatestInsightsSection />

      {/* 12. Simple 4-Step Process & Bottom Banner */}
      <FourStepProcessSection />
    </div>
  );
}
