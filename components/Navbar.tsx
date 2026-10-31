"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  ArrowRight,
  Cpu,
  Droplets,
  Disc,
  Car,
  Wrench,
  Fan,
  ShieldCheck,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableSearchBar from "@/components/Common/ExpandableSearchBar";
import BookingModal from "@/components/Common/BookingModal";
import { useLanguage } from "@/context/LanguageContext";

interface MegaServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const SERVICES_MEGA_ITEMS: MegaServiceItem[] = [
  {
    id: "diagnostics",
    titleEn: "Diagnostics & ECU Scans",
    titleAr: "فحص كمبيوتر وتشخيص الأعطال",
    subEn: "Pinpoint sensor, engine & gearbox faults with 100% accuracy.",
    subAr: "كشف وفحص شامل لجميع حساسات وكمبيوتر السيارة بدقة متناهية.",
    icon: Cpu,
    href: "/services-details?service=diagnostics",
  },
  {
    id: "oil-change",
    titleEn: "Synthetic Oil & Filter Service",
    titleAr: "تبديل زيت المحرك والفلتر",
    subEn: "Top-tier manufacturer-spec synthetic oils for desert heat.",
    subAr: "زيوت تخليقية كاملة معتمدة لحرارة الصيف وفلتر أصلي مع فحص شامل.",
    icon: Droplets,
    href: "/services-details?service=oil-change",
  },
  {
    id: "brakes",
    titleEn: "Brake Repair & Rotor Skimming",
    titleAr: "صيانة وفحص الفرامل (السفايف)",
    subEn: "Ceramic pad replacements, computerized disk skimming & fluid.",
    subAr: "تبديل فحمات سيراميك وخرط الدسكات إلكترونياً مع فحص زيت البريك.",
    icon: Disc,
    href: "/services-details?service=brakes",
  },
  {
    id: "suspension",
    titleEn: "Suspension, Bushings & Struts",
    titleAr: "صيانة نظام التعليق والمساعدات",
    subEn: "Shock absorbers, control arms, tie rods & NVH road testing.",
    subAr: "تجديد المساعدات، المقصات، الجلب، وميزان الستيرنج لثبات وراحة تامة.",
    icon: Car,
    href: "/services-details?service=suspension",
  },
  {
    id: "battery",
    titleEn: "Battery Test & Alternator Service",
    titleAr: "فحص وتبديل بطارية السيارة",
    subEn: "Digital cranking health test, charging output & AGM batteries.",
    subAr: "فحص قوة الشحن والدينمو مع بطاريات أصلية وضمان استبدال معتمد.",
    icon: Wrench,
    href: "/services-details?service=battery",
  },
  {
    id: "ac-repair",
    titleEn: "A/C Repair & Refrigerant Gas",
    titleAr: "تصليح وشحن مكيف السيارة",
    subEn: "UV dye leak tests, compressor overhauls & ice-cold cooling.",
    subAr: "كشف التسريب بالأشعة فوق البنفسجية وشحن فريون أصلي لصيف الشارقة.",
    icon: Fan,
    href: "/services-details?service=ac-repair",
  },
  {
    id: "tires",
    titleEn: "Tire Fitting & Laser Alignment",
    titleAr: "تبديل وميزان الإطارات بالليزر",
    subEn: "High-speed wheel balancing, laser alignment & tread checks.",
    subAr: "ميزان ليزر دقيق وترصيص عالي السرعة وفحص سلامة الإطارات.",
    icon: ShieldCheck,
    href: "/services-details?service=tires",
  },
  {
    id: "computer-programming",
    titleEn: "ECU Coding & Smart Keys",
    titleAr: "برمجة الكمبيوتر والمفاتيح",
    subEn: "Firmware updates, immobilizer adaptation & key reprogramming.",
    subAr: "معايرة السوفتوير وبرمجة وحدات التحكم والمفاتيح الذكية لجميع الماركات.",
    icon: Code,
    href: "/services-details?service=computer-programming",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesMegaOpen, setIsServicesMegaOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { isArabic, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "/about-us" },
    { label: t.nav.services, href: "/services", hasMega: true },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.brands, href: "/brands" },
    { label: t.nav.contact, href: "/contact" },
    { label: t.nav.blogs, href: "/blogs" },
  ];

  const openMega = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsServicesMegaOpen(true);
  };

  const closeMega = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsServicesMegaOpen(false);
    }, 180);
  };

  const cancelClose = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

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
    setIsServicesMegaOpen(false);
    setMobileServicesExpanded(false);
  }, [pathname]);

  // Outside click listener for mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsServicesMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${isScrolled || isServicesMegaOpen
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
            <div className="hidden lg:flex items-center gap-7 xl:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasMega) {
                  return (
                    <div
                      key={link.href}
                      className="relative py-4"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsServicesMegaOpen(false)}
                        className={`inline-flex items-center gap-1.5 font-bold text-sm tracking-widest uppercase transition-colors duration-300 group ${isActive || isServicesMegaOpen ? "text-red-500" : "text-white"
                          }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isServicesMegaOpen ? "rotate-180 text-red-500" : "text-zinc-400 group-hover:text-white"
                            }`}
                        />
                        <span
                          className={`absolute bottom-2 left-0 w-full h-[2px] bg-red-600 transition-transform duration-300 ease-out origin-center ${isActive || isServicesMegaOpen
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                            }`}
                        />
                      </Link>

                      {/* ─── DESKTOP SERVICES MEGA MENU DROPDOWN (TAJALRAHMAH WHITE THEME) ─── */}
                      <AnimatePresence>
                        {isServicesMegaOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={closeMega}
                            className="absolute top-full -left-48 xl:-left-36 rtl:-left-auto rtl:-right-48 rtl:xl:-right-36 w-[860px] xl:w-[930px] pt-2"
                            dir={isArabic ? "rtl" : "ltr"}
                          >
                            <div className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.14),0_6px_20px_rgba(0,0,0,0.06)] border border-zinc-200/90 overflow-hidden text-left rtl:text-right p-6 sm:p-7">
                              {/* Top Bar (Clean & Seamless - TajAlRahmah Reference Style) */}
                              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                                  <span className="text-[12px] font-extrabold tracking-widest uppercase text-red-600">
                                    {isArabic ? "خدمات الورشة المعتمدة" : "SERVICES WE OFFER"}
                                  </span>
                                </div>
                                <span className="text-xs sm:text-[13px] text-zinc-400 font-normal">
                                  {isArabic
                                    ? "صيانة وإصلاح شامل ومعتمد لجميع أنواع السيارات في الشارقة"
                                    : "Engineering & Technical Automotive Services Across Core Areas"}
                                </span>
                              </div>

                              <div className="flex items-stretch gap-6 xl:gap-8">
                                {/* Left: 2-Column Grid of 8 Services (Clean, open layout without bulky cards) */}
                                <div className="flex-1 grid grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-3.5">
                                  {SERVICES_MEGA_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setIsServicesMegaOpen(false)}
                                        className="group flex items-start gap-3.5 p-2 rounded-2xl hover:bg-zinc-50/90 transition-all duration-200"
                                      >
                                        <div className="w-11 h-11 rounded-xl bg-red-50/70 text-red-600 border border-red-200/70 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 shadow-2xs">
                                          <Icon className="w-5 h-5 stroke-[2]" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-[13.5px] font-bold text-red-600 group-hover:text-red-700 transition-colors leading-tight mb-1 truncate">
                                            {isArabic ? item.titleAr : item.titleEn}
                                          </p>
                                          <p className="text-xs text-zinc-500 line-clamp-1 leading-normal">
                                            {isArabic ? item.subAr : item.subEn}
                                          </p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>

                                {/* Right: Featured Workshop Photo & Explore More Pill Button */}
                                <div className="w-[270px] xl:w-[290px] shrink-0 border-l rtl:border-l-0 rtl:border-r border-zinc-100 pl-6 xl:pl-7 rtl:pl-0 rtl:pr-6 rtl:xl:pr-7 flex flex-col justify-between">
                                  <div className="relative w-full h-40 xl:h-44 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-2xs group/img">
                                    <Image
                                      src="/images/service-1.png"
                                      alt="Bab Al Bustan Workshop"
                                      fill
                                      className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                      <p className="text-xs font-bold leading-tight">
                                        {isArabic ? "كراج باب البستان — الشارقة" : "Bab Al Bustan Workshop"}
                                      </p>
                                      <p className="text-[10px] text-zinc-300 font-medium mt-0.5">
                                        {isArabic ? "المنطقة الصناعية 5" : "Sharjah Industrial Area 5"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="pt-4">
                                    <Link
                                      href="/services"
                                      onClick={() => setIsServicesMegaOpen(false)}
                                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3 rounded-full shadow-md hover:shadow-red-600/30 transition-all active:scale-95 group/btn"
                                    >
                                      <span>{isArabic ? "استكشف المزيد" : "Explore More"}</span>
                                      <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                                                </motion.div>
                        )}
                                              </AnimatePresence>
                                            </div>
                                          );
                                        }

                return (
                                        <Link
                                          key={link.href}
                                          href={link.href}
                                          className="relative py-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 group text-white"
                                        >
                                          {link.label}
                                          <span
                                            className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transition-transform duration-300 ease-out origin-center ${isActive
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

                                        {/* Language Switcher (Simple Text, No Background) */}
                                        <button
                                          type="button"
                                          onClick={toggleLanguage}
                                          className="text-white hover:text-red-500 font-bold text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer py-1.5 px-2 select-none"
                                          title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
                                          aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
                                        >
                                          {isArabic ? "English" : "العربية"}
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => setIsBookingModalOpen(true)}
                                          className="btn-primary hover:bg-red-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all tracking-widest cursor-pointer shadow-md hover:scale-105 active:scale-95"
                                        >
                                          {isArabic ? "حجز موعد" : "BOOKING"}
                                        </button>
                                      </div>

                                      {/* Mobile Actions: Search + Language Switcher + Hamburger Menu */}
                                      <div className="flex items-center gap-2 lg:hidden">
                                        <ExpandableSearchBar isScrolled={isScrolled} />

                                        {/* Mobile Language Switcher (Simple Text, No Background) */}
                                        <button
                                          type="button"
                                          onClick={toggleLanguage}
                                          className="text-white hover:text-red-500 font-bold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer py-1.5 px-1.5 select-none"
                                          title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
                                          aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
                                        >
                                          {isArabic ? "EN" : "عربي"}
                                        </button>

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
                                      <button
                                        type="button"
                                        onClick={toggleLanguage}
                                        className="flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-white/20 rounded-full text-sm font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer mb-6 group"
                                        title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
                                      >
                                        <Globe className="w-4 h-4 text-red-500 transition-transform duration-300 group-hover:rotate-45" />
                                        <span>{isArabic ? "English" : "العربية"}</span>
                                      </button>

                                      {/* Mobile Drawer Search Bar */}
                                      <div className="mb-6">
                                        <ExpandableSearchBar
                                          isDrawer={true}
                                          onCloseMenu={() => setMobileMenuOpen(false)}
                                        />
                                      </div>

                                      {/* Mobile Links */}
                                      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-280px)] slim-scrollbar pr-1">
                                        {navLinks.map((link) => {
                                          if (link.hasMega) {
                                            return (
                                              <div key={link.href} className="border-b border-zinc-800 pb-3">
                                                <div className="flex items-center justify-between">
                                                  <Link
                                                    href={link.href}
                                                    className={`text-xl font-black uppercase tracking-tight hover:text-red-600 transition-colors ${pathname === link.href ? "text-red-600" : "text-white"
                                                      }`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                  >
                                                    {link.label}
                                                  </Link>
                                                  <button
                                                    type="button"
                                                    onClick={() => setMobileServicesExpanded((prev) => !prev)}
                                                    className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                                    aria-label="Toggle subservices"
                                                  >
                                                    <ChevronDown
                                                      className={`w-5 h-5 transition-transform duration-200 ${mobileServicesExpanded ? "rotate-180 text-red-500" : ""
                                                        }`}
                                                    />
                                                  </button>
                                                </div>

                                                {/* Mobile Accordion Subservices */}
                                                <AnimatePresence>
                                                  {mobileServicesExpanded && (
                                                    <motion.div
                                                      initial={{ height: 0, opacity: 0 }}
                                                      animate={{ height: "auto", opacity: 1 }}
                                                      exit={{ height: 0, opacity: 0 }}
                                                      transition={{ duration: 0.2 }}
                                                      className="overflow-hidden mt-3 pl-3 rtl:pl-0 rtl:pr-3 space-y-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-red-600/50"
                                                    >
                                                      {SERVICES_MEGA_ITEMS.map((item) => {
                                                        const Icon = item.icon;
                                                        return (
                                                          <Link
                                                            key={item.id}
                                                            href={item.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors group"
                                                          >
                                                            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                              <Icon className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-bold truncate">
                                                              {isArabic ? item.titleAr : item.titleEn}
                                                            </span>
                                                          </Link>
                                                        );
                                                      })}
                                                      <Link
                                                        href="/services"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 pt-1"
                                                      >
                                                        <span>{isArabic ? "عرض صفحة جميع الخدمات ->" : "View All Services Page ->"}</span>
                                                      </Link>
                                                    </motion.div>
                                                  )}
                                                </AnimatePresence>
                                              </div>
                                            );
                                          }

                                          return (
                                            <Link
                                              key={link.href}
                                              href={link.href}
                                              className={`text-xl font-black uppercase tracking-tight hover:text-red-600 transition-colors ${pathname === link.href ? "text-red-600" : "text-white"
                                                }`}
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {link.label}
                                            </Link>
                                          );
                                        })}

                                        <button
                                          type="button"
                                          onClick={() => {
                                            setIsBookingModalOpen(true);
                                            setMobileMenuOpen(false);
                                          }}
                                          className="mt-4 btn-primary py-4 text-white font-bold uppercase tracking-widest rounded-full cursor-pointer"
                                        >
                                          {isArabic ? "حجز موعد" : "BOOKING"}
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {/* Booking Appointment Modal */}
                                <BookingModal
                                  isOpen={isBookingModalOpen}
                                  onClose={() => setIsBookingModalOpen(false)}
                                />
                              </>
                              );
}
