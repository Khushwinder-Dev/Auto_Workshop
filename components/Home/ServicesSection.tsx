"use client";

import React from "react";
import Image from "next/image";
import { Cpu, Droplets, ShieldCheck, Car } from "lucide-react";

const SERVICES_DATA = [
  {
    title: "Diagnostics",
    desc: "Advanced computer diagnostics to identify and resolve engine problems",
    image: "/images/ims_b_3.jpg",
    icon: <Cpu className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Oil Change",
    desc: "Quick and professional oil change service with premium quality oils",
    image: "/images/service-1.png",
    icon: <Droplets className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Brakes",
    desc: "Complete brake system inspection, repair and replacement",
    image: "/images/service-2.png",
    icon: <ShieldCheck className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Suspension",
    desc: "Full suspension inspection, repair and replacement for a smooth ride",
    image: "/images/service-5.png",
    icon: <Car className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Battery",
    desc: "Battery testing, replacement and charging system diagnostics",
    image: "/images/service-8.png",
    icon: <Cpu className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "A/C Repair",
    desc: "Air conditioning repair and maintenance for optimal comfort",
    image: "/images/service-3.png",
    icon: <Droplets className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Tires",
    desc: "Tire inspection, rotation, balancing and replacement service",
    image: "/images/service-6.png",
    icon: <ShieldCheck className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
  {
    title: "Computer Programming",
    desc: "ECU programming, software updates and vehicle system configuration",
    image: "/images/service-7.png",
    icon: <Car className="relative z-20 text-white w-6 h-6 mt-4" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-brand font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
            <span className="text-[8px]">▲</span>
            OUR SERVICES
            <span className="text-[8px]">▲</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-zinc-900 leading-[1.1] max-w-4xl mx-auto">
            Professional car maintenance services in Sharjah with certified technicians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-zinc-100"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
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
                  {service.icon}
                </div>

                <h3 className="text-2xl font-black text-zinc-900 mb-3 uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
