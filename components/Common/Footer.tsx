"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export { default as NewsletterSection } from "./NewsletterSection";

export default function Footer() {
  const { isArabic, t } = useLanguage();

  const ArrowIcon = isArabic ? ChevronLeft : ChevronRight;

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribeClick = () => {
    if (typeof document !== "undefined") {
      const el = document.getElementById("newsletter");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        const input = el.querySelector("input");
        input?.focus();
      }
    }
  };

  const serviceLinks = [
    {
      label: isArabic ? "فحص كمبيوتر وبرمجة الأعطال" : "Computer Diagnostics & ECU",
      href: "/services-details?service=diagnostics",
    },
    {
      label: isArabic ? "تبديل زيت المحرك والفلتر" : "Synthetic Oil & Filter Service",
      href: "/services-details?service=oil-change",
    },
    {
      label: isArabic ? "صيانة الفرامل وخرط الديسكات" : "Brake Repair & Rotor Skimming",
      href: "/services-details?service=brakes",
    },
    {
      label: isArabic ? "تصليح وشحن مكيف السيارة" : "Car A/C Repair & Refrigerant Gas",
      href: "/services-details?service=ac-repair",
    },
    {
      label: isArabic ? "صيانة المساعدات ونظام التعليق" : "Suspension & Struts Repair",
      href: "/services-details?service=suspension",
    },
    {
      label: isArabic ? "فحص وتبديل بطارية السيارة" : "Battery Testing & Alternator",
      href: "/services-details?service=battery",
    },
    {
      label: isArabic ? "جميع خدمات الورشة (8+)" : "View All Services (8+)",
      href: "/services",
    },
  ];

  const companyLinks = [
    { label: isArabic ? "عن الورشة" : "About Us", href: "/about-us" },
    { label: isArabic ? "الماركات التي نخدمها" : "Brands We Service", href: "/brands" },
    { label: isArabic ? "معرض الفيديو" : "Video Gallery", href: "/gallery" },
    { label: isArabic ? "مدونة الصيانة" : "Maintenance Blogs", href: "/blogs" },
    { label: isArabic ? "الأسئلة الشائعة" : "Customer FAQs", href: "/faqs" },
    { label: isArabic ? "احجز موعد صيانة" : "Book an Appointment", href: "/booking" },
    { label: isArabic ? "طلب عرض سعر" : "Get a Quote", href: "/quote" },
  ];

  const legalLinks: { label: string; href: string; onClick?: () => void }[] = [
    { label: isArabic ? "خريطة الموقع" : "Site Map", href: "/sitemap" },
    {
      label: isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy",
      href: "/refund-policy",
    },
    { label: isArabic ? "سياسة الخصوصية" : "Privacy Policy", href: "/privacy" },
    { label: isArabic ? "شروط الاستخدام" : "Terms of Use", href: "/terms" },
    {
      label: isArabic ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy",
      href: "/cookies",
    },
    {
      label: isArabic ? "سياسة الضمان والجودة" : "Warranty & Guarantee Policy",
      href: "/refund-policy#warranty",
    },
    {
      label: isArabic ? "الاشتراك بالبريد" : "Subscribe to email",
      href: "#newsletter",
      onClick: handleSubscribeClick,
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-16 pb-8 font-sans border-t border-zinc-800/80">
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14">
        {/* ============================================================
            MAIN 5-COLUMN FOOTER LINKS (Harmonized Same Level Alignment)
            ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8 items-stretch">
          {/* Col 1: About & Social (Pinned to Match Height) */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <Link className="inline-block mb-4" href="/">
                <div className="relative w-[98px] h-14">
                  <Image
                    alt="Bab Al Bustan Logo"
                    fill
                    className="object-contain object-left rtl:object-right"
                    src="/images/logo-new.png"
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                {t.footer.aboutDesc}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <span className="text-sm font-medium text-white shrink-0">{t.footer.followUs}</span>
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

          {/* Col 2: Services (7 Items) */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                {t.footer.servicesTitle}
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                    href={link.href}
                  >
                    <ArrowIcon className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (7 Items) */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                {t.footer.companyTitle}
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                    href={link.href}
                  >
                    <ArrowIcon className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal (7 Items - Exactly Matches Services & Company) */}
          <div>
            <div className="mb-6">
              <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                {t.footer.legalTitle}
              </h4>
              <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
            </div>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      type="button"
                      onClick={link.onClick}
                      className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group text-start cursor-pointer"
                    >
                      <ArrowIcon className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors group"
                      href={link.href}
                    >
                      <ArrowIcon className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact (Compact & Pinned to Match Height) */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h4 className="text-white text-xl uppercase tracking-tight font-display font-bold">
                  {t.footer.contactTitle}
                </h4>
                <div className="h-0.5 w-10 bg-red-600 mt-1"></div>
              </div>
              <div className="space-y-3.5">
                <div className="flex gap-3">
                  <MapPin className="text-red-600 shrink-0 w-4 h-4 mt-0.5" />
                  <p className="text-sm whitespace-pre-line leading-relaxed text-gray-300">
                    {t.footer.address}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone className="text-red-600 shrink-0 w-4 h-4 mt-0.5" />
                  <div className="text-sm space-y-0.5 leading-snug">
                    <p>
                      <a href="tel:+971564406456" className="hover:text-white transition-colors" dir="ltr">
                        +971 56 440 6456
                      </a>
                    </p>
                    <p>
                      <a href="tel:+971557636994" className="hover:text-white transition-colors" dir="ltr">
                        +971 55 763 6994
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="text-red-600 shrink-0 w-4 h-4 mt-0.5" />
                  <div className="text-sm space-y-0.5 leading-snug">
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

            {/* Working Hours pinned neatly at the bottom baseline */}
            <div className="pt-3.5 border-t border-zinc-800/80 mt-3.5">
              <div className="flex gap-3">
                <Clock className="text-red-600 shrink-0 w-4 h-4 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="text-gray-300 font-semibold leading-tight">
                    {t.footer.hoursWeekdays}
                  </p>
                  <p className="text-red-500 font-bold leading-tight">
                    {t.footer.hoursFriday}{" "}
                    <span className="text-gray-400 font-normal text-[11px]">
                      ({t.footer.hoursBreak})
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative border-t border-zinc-800/80 mt-16 pt-7 pb-4">
          {/* Scroll-to-top — sits centered ON the divider line with hover tooltip */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
            <div className="group relative flex flex-col items-center">
              {/* Tooltip */}
              <div
                role="tooltip"
                className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-30"
              >
                <div className="relative bg-zinc-900 border border-zinc-700/80 text-white text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                  <span>{isArabic ? "العودة إلى الأعلى" : "Back to top"}</span>
                  {/* Tooltip arrow pointing down */}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-900" />
                </div>
              </div>

              {/* Button Outer Ring */}
              <div className="w-11 h-11 rounded-full bg-[#0a0a0a] ring-4 ring-[#0a0a0a] border border-zinc-800 flex items-center justify-center shadow-lg">
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label={isArabic ? "العودة إلى الأعلى" : "Back to top"}
                  className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-red-950/40"
                >
                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-center px-4">
            {/* Copyright Text */}
            <p className="text-xs lg:text-[13px] text-zinc-400 font-normal leading-normal">
              {isArabic
                ? "© 2026 ورشة باب البستان لصيانة السيارات. جميع الحقوق محفوظة."
                : "© 2026 Bab Al Bustan Auto Maintenance Workshop. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
