"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Cpu,
  Droplets,
  ShieldCheck,
  Car,
  Search,
  ClipboardList,
  Wrench,
  CircleCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const services = [
    {
      title: "Diagnostics",
      desc: "Advanced computer diagnostics to identify and resolve engine problems",
      image: "/images/ims_b_3.jpg",
      icon: Cpu,
    },
    {
      title: "Oil Change",
      desc: "Quick and professional oil change service with premium quality oils",
      image: "/images/service-1.png",
      icon: Droplets,
    },
    {
      title: "Brakes",
      desc: "Complete brake system inspection, repair and replacement",
      image: "/images/service-2.png",
      icon: ShieldCheck,
    },
    {
      title: "Suspension",
      desc: "Full suspension inspection, repair and replacement for a smooth ride",
      image: "/images/service-5.png",
      icon: Car,
    },
    {
      title: "Battery",
      desc: "Battery testing, replacement and charging system diagnostics",
      image: "/images/service-8.png",
      icon: Cpu,
    },
    {
      title: "A/C Repair",
      desc: "Air conditioning repair and maintenance for optimal comfort",
      image: "/images/service-3.png",
      icon: Droplets,
    },
    {
      title: "Tires",
      desc: "Tire inspection, rotation, balancing and replacement service",
      image: "/images/service-6.png",
      icon: ShieldCheck,
    },
    {
      title: "Computer Programming",
      desc: "ECU programming, software updates and vehicle system configuration",
      image: "/images/service-7.png",
      icon: Car,
    },
  ];

  const steps = [
    {
      icon: Search,
      title: "Book Your Service",
      desc: "Schedule your preferred service. Our friendly staff will guide you through options based on your vehicle type and requirements.",
    },
    {
      icon: ClipboardList,
      title: "Professional Inspection",
      desc: "We provide detailed recommendations and transparent cost estimates before starting any work and diagnose issues accurately.",
    },
    {
      icon: Wrench,
      title: "Expert Service",
      desc: "Our team uses advanced tools, quality parts, and industry-best practices to carry out repairs, maintenance, or modifications.",
    },
    {
      icon: CircleCheck,
      title: "Quality Check",
      desc: "After completing the work, your vehicle undergoes a final quality check to guarantee all services meet our high standards.",
    },
  ];

  const faqs = [
    {
      q: "How long will my vehicle service take?",
      a: "Service times vary depending on the type and complexity of work. Minor repairs or maintenance can take a few hours, while major repairs like engine rebuilds may take a few days.",
    },
    {
      q: "Do you provide warranty on repairs?",
      a: "Yes, we provide a standard warranty on all our mechanical repairs and parts used, ensuring peace of mind for our customers.",
    },
    {
      q: "Can I get a cost estimate before service?",
      a: "Absolutely. We provide a detailed transparent cost estimate after the initial inspection before any work begins on your vehicle.",
    },
    {
      q: "Do you use genuine parts?",
      a: "We use high-quality OEM or genuine parts depending on your preference and vehicle requirements to ensure the best performance.",
    },
    {
      q: "Can you handle luxury or high-performance vehicles?",
      a: "Yes, our technicians are highly skilled and equipped with the latest diagnostic tools to handle luxury, sports, and high-performance cars.",
    },
  ];

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden flex flex-col bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Workshop Hero"
            fill
            className="object-cover"
            src="/images/services-hero.png"
            priority
          />
          <div className="absolute inset-0 bg-[#1a0a05]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
        <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 mt-10">
          <div data-aos="zoom-out" data-aos-delay="200" className="mb-4">
            <h1 className="text-3xl md:text-[50px] font-display font-bold tracking-[-0.04em] leading-[0.9] flex items-center justify-center gap-4 max-w-[800px]">
              <span className="text-white">Our</span>
              <span className="text-[#e11d23]">Services</span>
            </h1>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="max-w-xl text-gray-400 text-xs md:text-sm font-medium tracking-wide opacity-80"
          >
            A look at the quality work we deliver — every car, every time.
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-brand font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
              <span className="text-[8px]">▲</span>OUR SERVICES
              <span className="text-[8px]">▲</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[56px] text-zinc-900 leading-[1.1] max-w-4xl mx-auto">
              Professional car maintenance services in Sharjah with certified technicians
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-zinc-100"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative pt-12 pb-10 px-6 text-center flex-grow">
                  <div className="absolute left-1/2 -translate-x-1/2 top-[-36px] w-[72px] h-[72px] z-10 flex items-center justify-center">
                    <svg
                      className="absolute inset-0 w-full h-full drop-shadow-md"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36 5L68 65H4L36 5Z"
                        fill="#dc2626"
                        stroke="#b91c1c"
                        strokeWidth="1"
                      />
                    </svg>
                    <item.icon className="relative z-20 text-white w-6 h-6 mt-4" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-3 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Banner */}
      <section className="relative py-24 px-6 overflow-hidden min-h-[500px] flex flex-col justify-center bg-black">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            alt="How it works background"
            fill
            className="object-cover object-center"
            src="/images/bottomcar.jpg"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-[#e11d23] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,29,35,0.4)] transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white text-lg font-black mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
                Find quick answers to common questions about our services, pricing, and vehicle care. If you need more help, our team is always happy to assist.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                <Image
                  alt="Workshop view"
                  fill
                  className="object-cover"
                  src="/images/service-1.png"
                />
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                <Image
                  alt="Workshop view"
                  fill
                  className="object-cover"
                  src="/images/service-2.png"
                />
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                <Image
                  alt="Workshop view"
                  fill
                  className="object-cover"
                  src="/images/service-3.png"
                />
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                <Image
                  alt="Workshop view"
                  fill
                  className="object-cover"
                  src="/images/service-4.png"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-zinc-200">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex justify-between items-center w-full py-6 text-left group"
                  >
                    <span
                      className={`text-sm md:text-base font-bold uppercase tracking-tight transition-colors ${
                        isOpen ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? "bg-zinc-900 rotate-0" : "bg-[#e11d23]"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pb-6">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
