"use client";

import React from "react";
import { Award, UserCog, ClipboardCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      icon: <Award className="w-6 h-6 text-white" strokeWidth={2.5} />,
      val: "15",
      hasPlus: true,
      label: "YEAR EXPERIENCE",
    },
    {
      icon: <UserCog className="w-6 h-6 text-white" strokeWidth={2.5} />,
      val: "50",
      hasPlus: true,
      label: "EXPERT TECHNICIANS",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-white" strokeWidth={2.5} />,
      val: "5000",
      hasPlus: false,
      label: "COMPLETE PROJECTS",
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-white" strokeWidth={2.5} />,
      val: "4800",
      hasPlus: false,
      label: "HAPPY CUSTOMERS",
    },
  ];

  return (
    <section className="py-24 bg-[#fdfaf9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-10">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-14">
                <div className="w-24 h-24 bg-white rotate-45 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-50" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-red-600 rotate-45 rounded-lg shadow-[0_8px_20px_rgba(220,38,38,0.4)] flex items-center justify-center">
                  <div className="-rotate-45">{item.icon}</div>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl md:text-[44px] font-[900] text-zinc-900 leading-none">
                  {item.val}
                </span>
                {item.hasPlus && (
                  <span className="font-display text-3xl font-black text-zinc-900">
                    +
                  </span>
                )}
              </div>
              <p className="mt-4 text-[11px] md:text-xs font-black text-zinc-500 tracking-[0.15em] uppercase">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
