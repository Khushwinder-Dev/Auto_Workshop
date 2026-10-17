import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ThumbsUp,
  Award,
  UserCheck,
  Handshake,
  Tag,
  Zap,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Bab Al Bustan Auto Maintenance Workshop",
  description:
    "Learn more about Bab Al Bustan Auto Maintenance Workshop in Sharjah. With over 12+ years of experience, we provide honest, professional car repairs and maintenance.",
};

export default function AboutUsPage() {
  const reasons = [
    {
      icon: <UserCheck className="w-6 h-6 text-red-600" />,
      title: "Certified Mechanics",
      desc: "ASE and factory-certified technicians with years of hands-on experience in European, Japanese, and American vehicle platforms.",
    },
    {
      icon: <Handshake className="w-6 h-6 text-red-600" />,
      title: "Honest Pricing",
      desc: "Transparent estimates with zero surprise fees. You receive a full price breakdown before any technician begins work.",
    },
    {
      icon: <Tag className="w-6 h-6 text-red-600" />,
      title: "Transparent Pricing",
      desc: "Clear upfront quotes, OEM parts pricing disclosure, and no unnecessary upsells.",
    },
    {
      icon: <Zap className="w-6 h-6 text-red-600" />,
      title: "Express Service",
      desc: "Routine maintenance and minor repairs executed in under 60 minutes in our dedicated express service lanes.",
    },
    {
      icon: <Star className="w-6 h-6 text-red-600" />,
      title: "Quality Products",
      desc: "We exclusively utilize top-tier synthetic lubricants, genuine filters, and certified components on every automobile.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      title: "Satisfaction Guarantee",
      desc: "100% satisfaction guarantee on all mechanical and electrical work. If something isn't right, we resolve it promptly and free.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="About Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Our Story & Heritage
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            About <span className="text-red-500">Us</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Learn more about our Sharjah workshop, certified mechanics, and our mission to provide premier automotive service.
          </p>
        </div>
      </section>

      {/* Story & Dual Photos Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Dual Photos & Counters */}
          <div className="space-y-10">
            <div className="flex gap-4 h-[360px] sm:h-[420px]">
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl border border-zinc-200">
                <Image
                  src="/images/service-7.png"
                  alt="Bab Al Bustan workshop view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl border border-zinc-200">
                <Image
                  src="/images/service-3.png"
                  alt="Technician pouring synthetic oil"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-3.5 rounded-xl border border-red-100">
                  <ThumbsUp className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black text-zinc-900 leading-none">
                    1,600+
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1 uppercase font-semibold">
                    Happy Customers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-3.5 rounded-xl border border-red-100">
                  <Award className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black text-zinc-900 leading-none">
                    12+
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1 uppercase font-semibold">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Story */}
          <div className="max-w-xl">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-4 block">
              Sharjah Industrial Area 5
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 leading-[1.1] uppercase tracking-tight mb-6">
              Keeping Your Drive Smooth & Safe
            </h2>
            <div className="space-y-4 text-zinc-600 text-sm md:text-base leading-relaxed">
              <p>
                Bab Al Bustan Auto Maintenance Workshop provides expert automotive maintenance and repair services including computer diagnostics, precision oil service, brake repairs, suspension overhauls, battery testing, AC servicing, tires, and scheduled periodic maintenance.
              </p>
              <p>
                We work on all major car brands with certified technicians, high-grade parts, and fast turnaround times. Customer satisfaction, transparent reporting, and honest pricing have built our reputation as a trusted workshop in Sharjah.
              </p>
              <p>
                Whether you drive an everyday family SUV, a high-performance German sports coupe, or a rugged Japanese 4WD, our shop is fitted with OEM diagnostic tools and heavy-duty lifts to maintain your car in showroom condition.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 text-center"
              >
                Schedule an Appointment
              </Link>
              <Link
                href="/services"
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-colors text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Banner Section */}
      <section className="bg-[#0a0a0a] py-24 px-6 overflow-hidden border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-red-500 text-xs font-black uppercase tracking-[0.25em]">
                Real Results
              </span>
              <div className="h-[2px] w-full bg-red-600 mt-1" />
            </div>

            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-display font-black leading-[1.1] tracking-tight uppercase max-w-lg">
              Before &amp; After: Complete Auto Transformations
            </h2>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
              See the dramatic difference professional care makes — restoring engine responsiveness, brake efficiency, and icy AC cooling. Every mechanical and electrical detail counts, and our results speak for themselves.
            </p>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 btn-primary text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-red-600/30 transition-all hover:scale-105"
            >
              <span>View Our Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] md:aspect-[1.4/1] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
              <Image
                src="/images/back-sec.jpg"
                alt="Technicians working on car at Bab Al Bustan"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 6 Reasons to Choose Us Section */}
      <section className="py-24 bg-[#fcfcfc] px-6 border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold uppercase tracking-[0.25em] text-xs">
              <span>✦</span>
              <span>Why Choose Us</span>
              <span>✦</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 tracking-tight leading-tight uppercase max-w-4xl mx-auto">
              Reasons to Choose Bab Al Bustan Auto Maintenance Workshop
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto">
              We stand apart through our certified technicians, honest estimates, and modern workshop tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded-2xl border-t-4 border-red-600 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
