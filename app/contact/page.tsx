"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { WORKSHOP_INFO } from "@/data/workshopData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Thank you! Your message has been received. Our team will get back to you promptly."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Contact Bab Al Bustan Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Reach out to our customer service desk, schedule an in-person diagnostic inspection, or message us on WhatsApp.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Image */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-900">
              <Image
                src="/images/ims_b_2.jpg"
                alt="Bab Al Bustan Workshop Sharjah"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-widest block mb-1">
                  Customer Support
                </span>
                <h3 className="font-bold text-lg uppercase leading-tight">
                  {WORKSHOP_INFO.name}
                </h3>
              </div>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Address
                  </h4>
                  <p className="text-zinc-600 text-sm mt-1 leading-snug">
                    {WORKSHOP_INFO.address}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Call Us
                  </h4>
                  <div className="text-zinc-600 text-sm mt-1 space-y-0.5">
                    {WORKSHOP_INFO.phones.map((p) => (
                      <p key={p}>
                        <a href={`tel:${p}`} className="hover:text-red-600 transition-colors font-medium">
                          {p}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Email Inquiries
                  </h4>
                  <div className="text-zinc-600 text-sm mt-1 space-y-0.5">
                    {WORKSHOP_INFO.emails.map((e) => (
                      <p key={e}>
                        <a href={`mailto:${e}`} className="hover:text-red-600 transition-colors">
                          {e}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Hours of Operation
                  </h4>
                  <p className="text-zinc-600 text-sm mt-1">
                    {WORKSHOP_INFO.hours.weekdays}
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {WORKSHOP_INFO.hours.break}
                  </p>
                  <p className="text-red-600 text-xs font-bold mt-0.5">
                    {WORKSHOP_INFO.hours.friday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-2 block">
                Send a Message
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 uppercase tracking-tight">
                How Can We Help You?
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                Fill in the form below and one of our service supervisors will respond right away.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Phone Number (+971) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiry on Major Service"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-primary text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-xl shadow-xl shadow-red-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>

                <a
                  href={WORKSHOP_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Find Us On Map Section */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-2 block">
              Sharjah Industrial Area 5
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 uppercase tracking-tight">
              Find Us On Map
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Convenient access from all Emirates with spacious customer parking.
            </p>
          </div>

          <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-zinc-300">
            <iframe
              src={WORKSHOP_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bab Al Bustan Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
