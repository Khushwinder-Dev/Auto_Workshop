import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Cpu,
  Droplets,
  ShieldCheck,
  Car,
  Battery,
  Fan,
  Disc,
  Code,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { WORKSHOP_SERVICES, WORKSHOP_FAQS } from "@/data/workshopData";

export const metadata: Metadata = {
  title: "Auto Repair & Car Maintenance Services in Sharjah | Bab Al Bustan",
  description:
    "Explore full auto services at Bab Al Bustan in Sharjah Industrial Area 5. Oil change, computer diagnostics, brake repairs, AC service, battery replacement, and suspension tuning.",
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cpu":
        return <Cpu className="w-6 h-6 text-white" />;
      case "droplets":
        return <Droplets className="w-6 h-6 text-white" />;
      case "shield-check":
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case "car":
        return <Car className="w-6 h-6 text-white" />;
      case "battery":
        return <Battery className="w-6 h-6 text-white" />;
      case "fan":
        return <Fan className="w-6 h-6 text-white" />;
      case "disc":
        return <Disc className="w-6 h-6 text-white" />;
      default:
        return <Code className="w-6 h-6 text-white" />;
    }
  };

  const steps = [
    {
      num: "01",
      title: "Book Your Service",
      desc: "Select the required maintenance service and choose an appointment time online or via WhatsApp.",
    },
    {
      num: "02",
      title: "Professional Inspection",
      desc: "Our certified technicians conduct a comprehensive digital inspection and provide a full upfront quote.",
    },
    {
      num: "03",
      title: "Expert Service",
      desc: "Repairs are executed using OEM or certified replacement parts and precision workshop equipment.",
    },
    {
      num: "04",
      title: "Quality Check",
      desc: "Each vehicle undergoes quality check and road verification to ensure maximum reliability and safety.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Services at Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Workshop Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            Our <span className="text-red-500">Services</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Professional car maintenance and repair services in Sharjah Industrial Area 5 with certified technicians and guaranteed workmanship.
          </p>
        </div>
      </section>

      {/* Services Detailed Cards Grid */}
      <section className="py-24 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-3 block">
              Complete Automotive Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 uppercase tracking-tight leading-tight">
              Professional car maintenance services in Sharjah with certified technicians
            </h2>
            <p className="text-zinc-500 text-sm md:text-base mt-3">
              Explore our full range of automotive repair and preventative maintenance capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKSHOP_SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-black">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors" />

                  {/* Icon badge floating top right */}
                  <div className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    {getIcon(s.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-black text-zinc-900 mb-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4">
                      {s.shortDesc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 pt-3 border-t border-zinc-100">
                      {s.features.slice(0, 3).map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/services-details?service=${s.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 inline-flex items-center gap-1 transition-colors"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>

                    <Link
                      href={`/booking?service=${s.id}`}
                      className="btn-primary text-xs font-black uppercase tracking-wider px-4 py-2 rounded-lg text-white shadow-md shadow-red-600/20"
                    >
                      Book Service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white px-6 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-3 block">
              Transparent Service Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 uppercase tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 flex flex-col items-center text-center hover:border-red-600/40 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-display font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/30">
                  {st.num}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 uppercase mb-2">
                  {st.title}
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ */}
      <section className="py-24 bg-zinc-50 px-6 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-3 block">
              Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {WORKSHOP_FAQS.slice(0, 4).map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm"
              >
                <h3 className="font-bold text-base sm:text-lg text-zinc-900 mb-2 uppercase tracking-tight">
                  {faq.q}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner with bottomcar.jpg */}
      <section className="relative w-full py-20 px-6 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bottomcar.jpg"
            alt="Car repair in Sharjah"
            fill
            className="object-cover opacity-35"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase mb-4 tracking-tight">
            Need Immediate Repair or Scheduled Maintenance?
          </h2>
          <p className="text-zinc-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Speak directly with our technical advisors or book an inspection slot online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full border border-white/20 transition-all"
            >
              Contact Workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
