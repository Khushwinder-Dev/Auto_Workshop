"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableSearchBar from "@/components/Common/ExpandableSearchBar";

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
  const router = useRouter();

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
            ? "bg-black/95 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <div className="relative h-12 lg:h-16 w-32 lg:w-40">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {NAV_LINKS.map((link) => {
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

            <div className="hidden lg:flex items-center gap-4">
              <ExpandableSearchBar isScrolled={isScrolled} />
              <button
                onClick={() => router.push("/contact")}
                className="btn-primary hover:bg-red-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-colors tracking-widest cursor-pointer"
              >
                CONTACT
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ExpandableSearchBar isScrolled={isScrolled} />
              <button
                className="text-white p-1.5 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-black z-[10002] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="h-10 w-24 relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Close Navigation Menu"
              >
                <X size={32} />
              </button>
            </div>

            {/* Mobile Drawer Search Bar */}
            <div className="mb-6">
              <ExpandableSearchBar
                isDrawer={true}
                onCloseMenu={() => setMobileMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-250px)]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-3xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors ${
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
                className="mt-8 btn-primary py-5 text-white font-bold uppercase tracking-widest rounded-full"
              >
                CONTACT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
