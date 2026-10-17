"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserCog, Handshake, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AppointmentFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your message has been sent. Our workshop advisor will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Section with Form */}
      <div className="relative min-h-[640px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header.png"
            alt="Bab Al Bustan Workshop Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/80 md:via-black/70 md:to-black/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1350px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left Text */}
          <div className="max-w-xl">
            <span className="text-red-500 text-xs font-black tracking-[0.25em] uppercase mb-4 block">
              Direct Workshop Support
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] uppercase tracking-tight drop-shadow-lg mb-6">
              Experience Premium Care –{" "}
              <span className="italic text-red-500">Bab Al Bustan</span> <br className="hidden md:block" />
              Auto Maintenance Workshop
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Have a concern about strange engine sounds, AC failure, worn brakes, or scheduled vehicle servicing? Fill out the form or drop by our Sharjah workshop today.
            </p>
          </div>

          {/* Right Form */}
          <div className="relative flex justify-end">
            <div className="w-full max-w-lg bg-zinc-900/90 backdrop-blur-2xl p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-400"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone (+971)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Vehicle & Model"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-400"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Subject (e.g. Brake Inspection / AC Gas)"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors placeholder:text-zinc-400"
                />

                <textarea
                  rows={3}
                  required
                  placeholder="Your Message / Details of car issue..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-800/70 border border-white/10 rounded-lg p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors resize-none placeholder:text-zinc-400"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto btn-primary px-10 py-4 text-white font-black text-xs uppercase tracking-widest transition-all rounded-lg active:scale-95 shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Red Assurance Banner */}
      <div className="bg-red-600 py-8 px-6 border-t border-red-500/20">
        <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row gap-8 md:gap-20 justify-around">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
              <UserCog className="text-white w-7 h-7" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">
                Certified Expertise
              </h3>
              <p className="text-white/85 text-xs sm:text-sm mt-0.5">
                Specialized in luxury, European, and Japanese vehicles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
              <Handshake className="text-white w-7 h-7" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">
                Trusted Excellence
              </h3>
              <p className="text-white/85 text-xs sm:text-sm mt-0.5">
                Transparent process with 100% guaranteed workmanship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
