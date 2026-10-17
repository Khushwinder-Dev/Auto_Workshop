"use client";

import React from "react";
import { Award, Users, ShieldCheck, Headphones } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Award className="w-6 h-6 text-white" />,
      number: "15",
      suffix: "+",
      label: "YEAR EXPERIENCE",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      number: "5,000",
      suffix: "+",
      label: "HAPPY CUSTOMERS",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      number: "100",
      suffix: "%",
      label: "GUARANTEED WORKS",
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      number: "24/7",
      suffix: "",
      label: "ROAD SUPPORT",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 border-t border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              {/* Rotated Diamond Badge */}
              <div className="relative mb-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rotate-45 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-zinc-200" />
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rotate-45 rounded-xl shadow-[0_8px_20px_rgba(220,38,38,0.35)] flex items-center justify-center">
                  <div className="-rotate-45">
                    {s.icon}
                  </div>
                </div>
              </div>

              {/* Number and Label */}
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl sm:text-5xl font-[900] text-zinc-900 leading-none">
                  {s.number}
                </span>
                {s.suffix && (
                  <span className="font-display text-2xl sm:text-3xl font-black text-red-600">
                    {s.suffix}
                  </span>
                )}
              </div>

              <p className="mt-3 text-[11px] sm:text-xs font-black text-zinc-500 tracking-[0.18em] uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
