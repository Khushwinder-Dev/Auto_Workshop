"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableSearchBar from "@/components/Common/ExpandableSearchBar";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isArabic, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "/about-us" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.brands, href: "/brands" },
    { label: t.nav.contact, href: "/contact" },
    { label: t.nav.blogs, href: "/blogs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <div className="relative h-12 lg:h-16 w-32 lg:w-40">
                  <Image
                    src="/images/logo.png"
                    alt="Bab Al Bustan Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 group text-white"
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transition-transform duration-300 ease-out origin-center ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Actions: Search + Language Switcher + Contact Button */}
            <div className="hidden lg:flex items-center gap-4">
              <ExpandableSearchBar isScrolled={isScrolled} />

              {/* Language Switcher Pill Toggle */}
              <div
                className="flex items-center bg-zinc-900/90 border border-white/20 rounded-full p-1 backdrop-blur-md shadow-md"
                role="group"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    !isArabic
                      ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-pressed={!isArabic}
                  title="Switch to English"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("ar")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isArabic
                      ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-pressed={isArabic}
                  title="التبديل إلى العربية"
                >
                  <span>العربية</span>
                </button>
              </div>

              <button
                onClick={() => router.push("/contact")}
                className="btn-primary hover:bg-red-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all tracking-widest cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                {t.nav.contactBtn}
              </button>
            </div>

            {/* Mobile Actions: Search + Dual Lang Toggle + Hamburger Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <ExpandableSearchBar isScrolled={isScrolled} />

              {/* Mobile Dual Language Switcher (Shows both languages side-by-side) */}
              <div
                className="flex items-center bg-zinc-900/90 border border-white/20 rounded-full p-0.5 backdrop-blur-md shadow-sm"
                role="group"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                    !isArabic
                      ? "bg-red-600 text-white shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-pressed={!isArabic}
                  title="English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("ar")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                    isArabic
                      ? "bg-red-600 text-white shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  aria-pressed={isArabic}
                  title="العربية"
                >
                  عربي
                </button>
              </div>

              <button
                className="text-white p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: isArabic ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isArabic ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 bg-black z-[10002] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="h-10 w-28 relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-full cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X size={30} />
              </button>
            </div>

            {/* Language Switcher in Drawer */}
            <div className="flex items-center justify-center bg-zinc-900 border border-white/15 rounded-full p-1.5 mb-6">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex-1 py-2 text-center rounded-full font-bold text-sm transition-all cursor-pointer ${
                  !isArabic
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={`flex-1 py-2 text-center rounded-full font-bold text-sm transition-all cursor-pointer ${
                  isArabic
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                العربية
              </button>
            </div>

            {/* Mobile Drawer Search Bar */}
            <div className="mb-6">
              <ExpandableSearchBar
                isDrawer={true}
                onCloseMenu={() => setMobileMenuOpen(false)}
              />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-280px)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-black uppercase tracking-tight hover:text-red-600 transition-colors ${
                    pathname === link.href ? "text-red-600" : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  router.push("/contact");
                  setMobileMenuOpen(false);
                }}
                className="mt-6 btn-primary py-4 text-white font-bold uppercase tracking-widest rounded-full cursor-pointer"
              >
                {t.nav.contactBtn}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
