import React from "react";
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
