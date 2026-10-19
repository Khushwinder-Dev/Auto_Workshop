"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-16 pb-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link className="inline-block" href="/">
            <div className="relative w-32 h-16">
              <Image
                alt="Bab Al Bustan Logo"
                fill
                className="object-contain"
                src="/images/logo.png"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Bab Al Bustan Auto Maintenance Workshop, our workshop stands as a symbol of precision, quality, and trust for all your car care needs.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Follow us :</span>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/babalbustan2/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/babalbustan2/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@babalbustan2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-zinc-700"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

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
              { label: "Gallery", href: "/gallery" },
              { label: "Brands", href: "/brands" },
              { label: "Book Appointment", href: "/booking" },
              { label: "Contact Us", href: "/contact" },
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

        <div>
          <div className="mb-6">
            <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
              Opening Hours
            </h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
          </div>
          <div className="space-y-2 text-sm text-gray-400 mb-8">
            <p>Saturday-Thursday 8:00 am-9:00 pm</p>
            <p>Break : 1:30 pm–3:30 pm</p>
            <p>Friday : Closed</p>
          </div>
          <div className="mb-6">
            <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
              Support
            </h4>
            <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                href="/contact"
              >
                <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                href="/contact"
              >
                <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform" />
                Terms &amp; Condition
              </Link>
            </li>
          </ul>
        </div>

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
                Industrial Area No 5 ,<br /> Sharjah, UAE
              </p>
            </div>
            <div className="flex gap-4">
              <Phone className="text-red-600 shrink-0 w-5 h-5" />
              <div className="text-sm">
                <p>
                  <a href="tel:+971564406456" className="hover:text-white transition-colors">
                    +971564406456
                  </a>
                </p>
                <p>
                  <a href="tel:+971557636994" className="hover:text-white transition-colors">
                    +971557636994
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

      <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
        <p>
          © Copyright 2026{" "}
          <span className="text-red-600 font-bold">
            Bab Al Bustan Auto Maintenance Workshop
          </span>
          . All rights reserved.
        </p>
        <Link className="hover:text-white transition-colors" href="/admin">
          Admin
        </Link>
      </div>
    </footer>
  );
}
