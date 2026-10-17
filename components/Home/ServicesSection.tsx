"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Cpu, Droplets, ShieldCheck, Car, Battery, Fan, Disc, Code, ArrowRight } from "lucide-react";
import { WORKSHOP_SERVICES } from "@/data/workshopData";

export default function ServicesSection() {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case "cpu":
        return <Cpu className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "droplets":
        return <Droplets className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "shield-check":
        return <ShieldCheck className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "car":
        return <Car className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "battery":
        return <Battery className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "fan":
        return <Fan className="w-6 h-6 text-white relative z-20 mt-4" />;
      case "disc":
        return <Disc className="w-6 h-6 text-white relative z-20 mt-4" />;
      default:
        return <Code className="w-6 h-6 text-white relative z-20 mt-4" />;
    }
  };

  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-[0.25em] mb-4">
            <span className="text-[9px]">▲</span>
            OUR SERVICES
            <span className="text-[9px]">▲</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-zinc-900 leading-[1.1] uppercase tracking-tight">
            Professional car maintenance services in Sharjah with certified technicians
          </h2>
          <p className="mt-4 text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
            From computerized diagnostics to complete brake, AC, and suspension overhauls, our workshop delivers factory-standard results on all vehicle brands.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKSHOP_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-zinc-200/80 hover:-translate-y-1.5"
            >
              {/* Service Card Image */}
              <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* Triangle Badge & Content */}
              <div className="relative pt-12 pb-8 px-6 text-center flex-grow flex flex-col justify-between">
                {/* Triangular SVG Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[-36px] w-[72px] h-[72px] z-10 flex items-center justify-center filter drop-shadow-md">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 72 72" fill="none">
                    <path d="M36 5L68 65H4L36 5Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
                  </svg>
                  {getServiceIcon(service.iconName)}
                </div>

                <div>
                  <h3 className="text-xl font-black text-zinc-900 mb-3 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <Link
                    href={`/services-details?service=${service.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 inline-flex items-center gap-1 transition-colors"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/booking?service=${service.id}`}
                    className="text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-600/20"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
