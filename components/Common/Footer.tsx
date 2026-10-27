"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Thank you for subscribing! Check your email for car care tips & exclusive offers.");
      setEmail("");
    }, 700);
  };

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-16 pb-8 px-4 font-sans border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            NEWSLETTER SUBSCRIPTION FORM BANNER
            ============================================================ */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Stay Ahead On Maintenance</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
                Subscribe for Car Care Tips &amp; Special Offers
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Receive UAE seasonal checklists, synthetic oil interval reminders, and VIP repair discount coupons directly to your inbox.
              </p>
            </div>

            {/* Form */}
            <div className="w-full lg:max-w-md">
              {isSubscribed ? (
                <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-800 p-4 rounded-2xl text-emerald-400 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>You're subscribed! Welcome to the Bab Al Bustan VIP Club.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 text-white placeholder-zinc-500 rounded-full pl-11 pr-4 py-3.5 text-xs sm:text-sm outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shrink-0 hover:scale-105 active:scale-95"
                  >
                    <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            MAIN 4-COLUMN FOOTER LINKS
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: About & Social */}
          <div className="space-y-6">
            <Link className="inline-block" href="/">
              <div className="relative w-36 h-16">
                <Image
                  alt="Bab Al Bustan Logo"
                  fill
                  className="object-contain"
                  src="/images/logo.png"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Bab Al Bustan Auto Maintenance Workshop in Sharjah Industrial Area 5 stands as a trusted symbol of precision, genuine spare parts, and customer care for all your car repair needs.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">Follow us:</span>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/babalbustan2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
                  aria-label="Facebook"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 320 512"
                    height="14"
                    width="14"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/babalbustan2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
                  aria-label="Instagram"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="14"
                    width="14"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@babalbustan2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
                  aria-label="TikTok"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="14"
                    width="14"
                  >
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                Quick Links
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Brands We Service", href: "/brands" },
                { label: "Video Gallery", href: "/gallery" },
                { label: "Maintenance Blogs", href: "/blogs" },
                { label: "Book Appointment", href: "/booking" },
                { label: "Contact Us", href: "/contact" },
                { label: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                    href={link.href}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Policies */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                Opening Hours
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <div className="space-y-2 text-sm text-gray-400 mb-8">
              <p>Saturday – Thursday: 8:00 AM – 9:00 PM</p>
              <p>Break: 1:30 PM – 3:30 PM</p>
              <p className="text-red-500 font-bold">Friday: Closed</p>
            </div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                Support &amp; FAQs
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                  href="/faqs"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                  href="/contact"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                  Privacy &amp; Terms Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                Contact Info
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-red-600 shrink-0 w-5 h-5" />
                <p className="text-sm">
                  Industrial Area No 5,<br /> Sharjah, United Arab Emirates
                </p>
              </div>
              <div className="flex gap-4">
                <Phone className="text-red-600 shrink-0 w-5 h-5" />
                <div className="text-sm">
                  <p>
                    <a href="tel:+971564406456" className="hover:text-white transition-colors">
                      +971 56 440 6456
                    </a>
                  </p>
                  <p>
                    <a href="tel:+971557636994" className="hover:text-white transition-colors">
                      +971 55 763 6994
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-red-600 shrink-0 w-5 h-5" />
                <div className="text-sm">
                  <p>
                    <a href="mailto:info@babalbustanuae.com" className="hover:text-white transition-colors">
                      info@babalbustanuae.com
                    </a>
                  </p>
                  <p>
                    <a href="mailto:babalbustan1@gmail.com" className="hover:text-white transition-colors">
                      babalbustan1@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-gray-500">
        <p>
          © Copyright 2026{" "}
          <span className="text-red-600 font-bold">
            Bab Al Bustan Auto Maintenance Workshop
          </span>
          . All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link className="hover:text-white transition-colors" href="/sitemap">
            Sitemap
          </Link>
          <Link className="hover:text-white transition-colors" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-white transition-colors" href="/booking">
            Appointment
          </Link>
        </div>
      </div>
    </footer>
  );
}
