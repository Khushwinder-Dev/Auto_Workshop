"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function FourStepProcessSection() {
  const steps = [
    {
      num: "01",
      emoji: "🗓️",
      title: "Book Online",
      desc: "Choose your service and pick a convenient date and time from our booking form.",
    },
    {
      num: "02",
      emoji: "🚗",
      title: "Drop Your Car",
      desc: "Drive in or we'll arrange pickup. Our team greets you and takes over.",
    },
    {
      num: "03",
      emoji: "⚙️",
      title: "Expert Service",
      desc: "Our certified technicians complete the job with precision and care.",
    },
    {
      num: "04",
      emoji: "✅",
      title: "Pick Up & Go",
      desc: "Get your car back sparkling clean and perfectly maintained.",
    },
  ];

  return (
    <section className="bg-[#050505] py-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        <div className="inline-block px-5 py-1.5 rounded-full border border-red-900/40 bg-red-900/10 mb-8">
          <span className="text-red-600 text-[10px] font-black tracking-[0.25em] uppercase">
            How It Works
          </span>
        </div>
        <h2 className="font-display text-2xl md:text-5xl text-white leading-tight uppercase tracking-tight mb-20 text-center">
          Simple 4-Step Process
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 w-full">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex-1 w-full max-w-[320px] bg-[#111111] border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-red-600/30 hover:translate-y-[-5px]">
                <span className="font-display text-4xl font-black text-red-900/40 mb-4 tracking-tighter">
                  {step.num}
                </span>
                <div className="text-3xl mb-6 flex items-center justify-center h-12">
                  {step.emoji}
                </div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-12 xl:w-16">
                  <ArrowRight className="text-red-600 w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
