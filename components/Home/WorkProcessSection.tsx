"use client";

import React from "react";
import Image from "next/image";
import {
  ClipboardList,
  Receipt,
  CalendarDays,
  UserCheck,
  MapPin,
  CreditCard,
} from "lucide-react";

export default function WorkProcessSection() {
  const leftSteps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-red-600" />,
      title: "Share Requirement",
      desc: "Let us know what's bothering your car or what maintenance it needs.",
    },
    {
      icon: <Receipt className="w-6 h-6 text-red-600" />,
      title: "Receive Up Front Quote",
      desc: "Transparent, itemized pricing catering to your specific vehicle needs.",
    },
    {
      icon: <CalendarDays className="w-6 h-6 text-red-600" />,
      title: "Schedule Appointment",
      desc: "Pick a date and convenient time slot at our Sharjah workshop.",
    },
  ];

  const rightSteps = [
    {
      icon: <UserCheck className="w-6 h-6 text-red-600" />,
      title: "Personal Attention",
      desc: "Dedicated certified technicians working exclusively on your vehicle.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Live Tracking & Updates",
      desc: "Receive photo & status updates throughout the repair process.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-red-600" />,
      title: "Pay Post Service",
      desc: "Pay easily through card or cash only after quality inspection is approved.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-xs uppercase tracking-[0.25em] mb-4">
            OUR WORK PROCESS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 leading-tight uppercase tracking-tight">
            How We Work
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto mt-3">
            A hassle-free, transparent automotive repair process designed for speed and complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16 items-center">
          {/* Left 3 Steps */}
          <div className="flex flex-col gap-12 lg:order-1">
            {leftSteps.map((step) => (
              <div key={step.title} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 bg-red-50 group-hover:bg-red-600 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                    {step.icon}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-zinc-900 font-bold text-xl mb-1.5 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-[280px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Showcase Image */}
          <div className="lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-200 group">
              <Image
                src="/images/ims_b_2.jpg"
                alt="Mechanic working under car at Bab Al Bustan"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right 3 Steps */}
          <div className="flex flex-col gap-12 lg:order-3">
            {rightSteps.map((step) => (
              <div
                key={step.title}
                className="flex items-start gap-6 flex-row lg:flex-row-reverse lg:text-right group"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-red-50 group-hover:bg-red-600 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                    {step.icon}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-zinc-900 font-bold text-xl mb-1.5 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-[280px] lg:ml-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
