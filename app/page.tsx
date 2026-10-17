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
      <main>
        {/* 1. Hero Section with Glass Stats */}
        <div>
          <HeroSection />
        </div>

        {/* 2. Professional Services Grid */}
        <div data-aos="fade-up" data-aos-delay="100">
          <ServicesSection />
        </div>

        {/* 3. "We Go Beyond Just a Car Maintenance" */}
        <div data-aos="fade-up" data-aos-delay="200">
          <FeatureSection />
        </div>

        {/* 4. "Professional Car Maintenance in Sharjah" */}
        <div data-aos="fade-up" data-aos-delay="100">
          <WhyUsSection />
        </div>

        {/* 5. Appointment Quote Form & Assurance Banner */}
        <div data-aos="fade-up" data-aos-delay="100">
          <AppointmentFormSection />
        </div>

        {/* 6. Work Process ("How We Work") */}
        <div data-aos="fade-up" data-aos-delay="200">
          <WorkProcessSection />
        </div>

        {/* 7. "Our Recent Work" Portfolio Carousel */}
        <div data-aos="fade-up" data-aos-delay="200">
          <RecentWorkSection />
        </div>

        {/* 8. Brand Partnerships */}
        <div data-aos="fade-up" data-aos-delay="100">
          <PartnershipSection />
        </div>

        {/* 9. Frequently Asked Questions */}
        <div data-aos="fade-up" data-aos-delay="200">
          <FaqSection />
        </div>

        {/* 10. Experience & Satisfaction Counters */}
        <div data-aos="fade-up" data-aos-delay="100">
          <StatsSection />
        </div>

        {/* 11. Latest Insights & Technical Guides */}
        <div data-aos="fade-up" data-aos-delay="100">
          <LatestInsightsSection />
        </div>

        {/* 12. Simple 4-Step Process & Bottom Banner */}
        <div data-aos="fade-up" data-aos-delay="200">
          <FourStepProcessSection />
        </div>
      </main>
    </div>
  );
}
