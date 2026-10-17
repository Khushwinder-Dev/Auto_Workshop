"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserCog, Handshake } from "lucide-react";
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
      toast.success("Thank you! Your message has been sent.");
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
      <div className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header.png"
            alt="Bab Al Bustan Auto Workshop Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 md:bg-linear-to-r md:from-black/40 md:via-black/40 md:to-black/60" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="max-w-2xl">
            <h2 className="font-medium text-4xl md:text-6xl font-black text-white leading-[1.1] uppercase tracking-tight drop-shadow-lg">
              Experience Premium Care –<span className="text-display italic font-bold text-red-500"> Bab Al Bustan</span> <br className="hidden md:block" />
              Auto Maintenance Workshop
            </h2>
          </div>
          <div className="relative flex justify-end">
            <div className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 rounded-lg border border-white/5 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone"
                    className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Vehicle & Model"
                    className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Subject"
                  className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={3}
                  className="w-full bg-zinc-800/50 border border-white/10 rounded p-3.5 text-white text-sm outline-none focus:border-red-500 transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 px-10 py-4 text-white font-black text-xs uppercase tracking-widest transition-all rounded active:scale-95 shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-600 py-8">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-10 md:gap-24">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <UserCog className="text-white w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">Certified Expertise</h4>
              <p className="text-white/80 text-sm">Specialized in luxury and quality vehicles</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <Handshake className="text-white w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">Trusted Excellence</h4>
              <p className="text-white/80 text-sm">Transparent process with guaranteed workmanship</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
