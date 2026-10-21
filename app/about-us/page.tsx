"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ThumbsUp,
  Award,
  X,
  UserCheck,
  Handshake,
  Tag,
  Zap,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function AboutUsPage() {
  const reasons = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Certified Mechanics",
      desc: "ASE certified technicians with years of hands-on experience in all vehicle types.",
    },
    {
      icon: <Handshake className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Honest Pricing",
      desc: "Transparent process with no hidden charges. Full quote provided before we begin.",
    },
    {
      icon: <Tag className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Transparent Pricing",
      desc: "No hidden fees, no surprises — full cost disclosure before any work begins.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Express Service",
      desc: "Most services completed under 60 minutes without compromising on quality.",
    },
    {
      icon: <Star className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Quality Products",
      desc: "We use only top-brand lubricants, parts, and materials on every vehicle.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#e11d23]" strokeWidth={2.5} />,
      title: "Satisfaction Guarantee",
      desc: "100% satisfaction guaranteed — not happy with the result? We redo it free.",
    },
  ];

  return (
    <main>
      <div>
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
                <span className="text-white">About</span>
                <span className="text-[#e11d23]">Us</span>
              </h1>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="max-w-xl text-gray-400 text-xs md:text-sm font-medium tracking-wide opacity-80"
            >
              Learn more about our company and our mission
            </p>
          </div>
        </section>

        <section className="py-20 bg-white px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="flex gap-4 h-[400px]">
                <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    alt="Workshop view"
                    fill
                    className="object-cover"
                    src="/images/service-7.png"
                  />
                </div>
                <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    alt="Technician pouring oil"
                    fill
                    className="object-cover"
                    src="/images/service-3.png"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <ThumbsUp className="w-8 h-8 text-[#e11d23]" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 leading-none">
                      1,600+
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Happy Customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <Award className="w-8 h-8 text-[#e11d23]" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 leading-none">
                      12+
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-xl">
              <span className="text-[#e11d23] text-xs font-bold uppercase tracking-[0.2em]">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4 leading-[1.1] tracking-tight">
                Keeping Your Drive Smooth
              </h2>
              <div className="mt-8 space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  Provides expert automotive maintenance and repair services including diagnostics, oil change, brakes, suspension, battery, A/C repair, tires, and periodic servicing.
                </p>
                <p>
                  We work on all major car brands with skilled technicians, high-quality parts, and fast turnaround times. Customer satisfaction and honest pricing are our top priorities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-[#e11d23] text-xs font-display uppercase tracking-[0.2em]">
                  Real Results
                </span>
                <div className="h-[2px] w-full bg-[#e11d23] mt-1" />
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-display leading-[1.1] tracking-tight max-w-md">
                Before &amp; After: Complete Auto Transformations
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg opacity-90">
                See the dramatic difference professional care makes — restoring clarity, depth, and shine while adding a durable layer of protection. Every detail counts, and the results speak for themselves.
              </p>
              <Link
                className="inline-block bg-[#e11d23] hover:bg-[#c1181d] text-white font-black uppercase text-xs md:text-sm tracking-widest px-10 py-4 rounded-sm transition-all duration-300"
                href="/gallery"
              >
                View Our Gallery
              </Link>
            </div>
            <div className="relative group">
              <div className="relative aspect-[4/3] md:aspect-[1.4/1] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-900">
                <Image
                  alt="Technicians working on a red racing car"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  src="/images/back-sec.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#fcfcfc] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2 text-[#e11d23] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                <X className="w-3.5 h-3.5" strokeWidth={3} />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-slate-900 tracking-tight leading-tight max-w-5xl mx-auto">
                Reasons to Choose Bab Al Bustan Auto Maintenance Workshop
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((r, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border-t-4 border-[#e11d23] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                    {r.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
