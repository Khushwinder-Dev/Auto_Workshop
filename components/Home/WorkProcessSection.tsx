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
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
            OUR WORK PROCESS
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight">
            How We Work
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-16 items-center">
          <div className="flex flex-col gap-12 lg:order-1">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Share Requirement</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px]">
                  Let us know what&#x27;s bothering your car
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Receive Up Front Quote</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px]">
                  Transparent pricing catering to your specific needs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Schedule Appointment</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px]">
                  Transparent pricing catering to your specific needs
                </p>
              </div>
            </div>
          </div>
          <div className="lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] h-[580px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-100">
              <Image
                src="/images/ims_b_2.jpg"
                alt="Mechanic working under car"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-12 lg:order-3">
            <div className="flex items-start gap-6 flex-row lg:flex-row-reverse lg:text-right">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Personal Attention</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] lg:ml-auto">
                  Dedicated engineers working exclusively on your car
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 flex-row lg:flex-row-reverse lg:text-right">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Live Tracking &amp; Updates</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] lg:ml-auto">
                  Track your car service visually in real time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 flex-row lg:flex-row-reverse lg:text-right">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">Pay Post Service</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] lg:ml-auto">
                  Pay online, through card or cash, post service completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
