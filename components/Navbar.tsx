"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { WORKSHOP_INFO } from "@/data/workshopData";

const NAV_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navBackground = !isHomePage || isScrolled
    ? "bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    : "bg-transparent";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${navBackground}`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <div className="relative h-12 lg:h-16 w-36 lg:w-44">
                  <Image
                    src="/images/logo.png"
                    alt="Bab Al Bustan Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 group ${
                      isActive ? "text-red-500" : "text-white hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transition-transform duration-300 ease-out origin-center ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${WORKSHOP_INFO.phones[0]}`}
                className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mr-2"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call Us</span>
              </a>

              <Link
                href="/booking"
                className="btn-primary hover:bg-red-700 text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest cursor-pointer shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
              >
                APPOINTMENT
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-red-500" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/90 backdrop-blur-xl transition-all duration-300 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-black uppercase tracking-wider text-white hover:text-red-500 transition-colors"
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-wider text-white hover:text-red-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-4 pt-8 border-t border-white/10">
          <Link
            href="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn-primary py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book an Appointment
          </Link>

          <a
            href={`tel:${WORKSHOP_INFO.phones[0]}`}
            className="w-full bg-white/10 text-white py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-red-500" />
            Call: {WORKSHOP_INFO.phones[0]}
          </a>
        </div>
      </div>
    </>
  );
}
