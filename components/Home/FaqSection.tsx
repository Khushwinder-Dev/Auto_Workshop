"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WORKSHOP_FAQS } from "@/data/workshopData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-4 block">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight max-w-4xl mx-auto">
            Most Popular Questions About Car Repair in Sharjah
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto mt-3">
            Find quick answers about our vehicle servicing, pricing policies, turnaround times, and warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
          {WORKSHOP_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border border-zinc-200 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm bg-zinc-50/50"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-zinc-900 font-bold text-base sm:text-lg pr-4 transition-colors group-hover:text-red-600">
                    {faq.q}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-red-600 text-white rotate-180" : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-zinc-200 text-zinc-600 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
