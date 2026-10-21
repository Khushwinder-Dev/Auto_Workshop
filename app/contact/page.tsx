"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  ExternalLink,
  Navigation,
  Star,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

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
      toast.success("Thank you! Your message has been sent. We will respond promptly.");
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
                <span className="text-white">Contact Us </span>
                <span className="text-[#e11d23]" />
              </h1>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="max-w-xl text-gray-400 text-xs md:text-sm font-medium tracking-wide opacity-80"
            >
              A look at the quality work we deliver — every car, every time.
            </p>
          </div>
        </section>

        <div className="bg-white py-16 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b pb-12">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-lg text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">
                    Address
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Industrial Area No 5, Sharjah, UAE
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-lg text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">
                    Call Us
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">+971564406456</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-lg text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">
                    Hours
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Sat-Thu: 8am - 9pm</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  alt="Workshop"
                  fill
                  className="object-cover"
                  src="/images/ims_b_2.jpg"
                />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-display text-gray-900 mb-8">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-lg p-4 text-zinc-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-600"
                    name="name"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-lg p-4 text-zinc-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-600"
                      name="email"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-lg p-4 text-zinc-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-600"
                      name="phone"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-lg p-4 text-zinc-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-600"
                    name="subject"
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="How can we help you?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-lg p-4 text-zinc-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-600 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-[18px] h-[18px]" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Find Us On Map
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Visit our workshop in Sharjah. Professional auto maintenance services you can trust.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative group">
              <div className="h-[400px] md:h-[600px] w-full">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src="https://maps.google.com/maps?q=BAB%20AL%20BUSTAN%20AUTO%20MAINTENANCE%20WORKSHOP%20Industrial%20Area%205%20-%20Industrial%20Area%20-%20Sharjah&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BAB AL BUSTAN AUTO MAINTENANCE WORKSHOP"
                />
              </div>
              <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-lg border border-gray-200 p-4 w-[320px] hidden md:block">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <h3 className="text-[16px] font-semibold text-gray-900 leading-tight">
                      BAB AL BUSTAN AUTO MAINTENANCE WORKSHOP
                    </h3>
                    <p className="text-[13px] text-gray-600 mt-1 leading-normal">
                      Industrial Area 5 - Industrial Area - Sharjah
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=25.320666,55.408305"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                      title="View on Google Maps"
                    >
                      <ExternalLink className="w-[18px] h-[18px]" />
                    </a>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=25.320666,55.408305"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 text-white transition-colors"
                      title="Get Directions"
                    >
                      <Navigation className="w-[18px] h-[18px] text-white fill-white" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[13px]">
                  <span className="text-gray-700">5.0</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#e57e23] fill-[#e57e23]" />
                    ))}
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline border-b border-transparent hover:border-blue-600"
                  >
                    (1)
                  </a>
                  <Info className="w-3.5 h-3.5 text-gray-400 ml-1 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
