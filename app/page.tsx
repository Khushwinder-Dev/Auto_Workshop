"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/components/HeroSection";
import AboutCompanySection from "@/components/AboutCompanySection";
import OurProcessSection from "@/components/OurProcessSection";
import ProtectionServicesSection from "@/components/ProtectionServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import OurProjectsSection from "@/components/OurProjectsSection";
import IndustriesSection from "@/components/IndustriesSection";
import ConsultationSection from "@/components/ConsultationSection";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import ProjectsClients from "@/components/Project/ProjectsClients";
import WelcomeOfferModal from "@/components/WelcomeOfferModal";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });

    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    scrollToHash();
    const t1 = setTimeout(scrollToHash, 250);
    const t2 = setTimeout(scrollToHash, 700);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <div data-aos="fade-up" data-aos-delay="100">
          <AboutCompanySection />
        </div>
        <div data-aos="fade-up" data-aos-delay="125">
          <OurProcessSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
          <ProtectionServicesSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <ExperienceSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="250">
          <OurProjectsSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <IndustriesSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="350">
          <ConsultationSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <TrustedClientsSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="450">
          <ProjectsClients themeBg={false} showPauseButton={true} />
        </div>

        {/* Welcome Offer Popup Modal */}
        <WelcomeOfferModal />
      </main>
    </div>
  );
}
