"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { WORKSHOP_INFO } from "@/data/workshopData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-16 pb-8 px-4 font-sans border-t border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <div className="relative w-36 h-16">
              <Image
                src="/images/logo.png"
                alt="Bab Al Bustan Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Bab Al Bustan Auto Maintenance Workshop stands as a symbol of precision, quality, and trust for all your car care needs in Sharjah Industrial Area 5.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Follow us :</span>
            <div className="flex gap-2">
              <a
                href={WORKSHOP_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg fill="currentColor" viewBox="0 0 320 512" className="w-3.5 h-3.5">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>

              <a
                href={WORKSHOP_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg fill="currentColor" viewBox="0 0 448 512" className="w-3.5 h-3.5">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>

              <a
                href={WORKSHOP_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg fill="currentColor" viewBox="0 0 448 512" className="w-3.5 h-3.5">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">Quick Links</h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1" />
          </div>
          <ul className="space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Services", href: "/services" },
              { label: "Gallery", href: "/gallery" },
              { label: "Brands", href: "/brands" },
              { label: "Book Appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group text-gray-400"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Operating Hours Column */}
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">Opening Hours</h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1" />
          </div>
          <div className="space-y-2 text-sm text-gray-400 mb-8">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>Saturday - Thursday: 8:00 am - 9:00 pm</span>
            </p>
            <p className="text-xs text-gray-500 pl-6">Break : 1:30 pm – 3:30 pm</p>
            <p className="text-red-500 font-semibold pl-6">Friday : Closed</p>
          </div>

          <div className="mb-4">
            <h4 className="text-white text-lg uppercase tracking-tight font-display font-bold">Support</h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1" />
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-red-500 transition-colors text-gray-400 flex items-center gap-2 group">
                <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500 transition-colors text-gray-400 flex items-center gap-2 group">
                <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                Terms & Condition
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">Contact Info</h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1" />
          </div>
          <div className="space-y-5 text-sm">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-gray-300 leading-snug">
                {WORKSHOP_INFO.address}
              </p>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-gray-300 space-y-1">
                {WORKSHOP_INFO.phones.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-gray-300 space-y-1">
                {WORKSHOP_INFO.emails.map((email) => (
                  <p key={email}>
                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                      {email}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-gray-500">
        <p>
          © Copyright {currentYear} <span className="text-red-600 font-bold">{WORKSHOP_INFO.name}</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/booking" className="hover:text-white transition-colors">
            Book Appointment
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
