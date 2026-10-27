"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Wrench,
  Car,
  FileText,
  Video,
  HelpCircle,
  Phone,
  Calendar,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Droplets,
  Disc,
  Fan,
  X,
} from "lucide-react";
import { WORKSHOP_SERVICES, CAR_BRANDS, WORKSHOP_VIDEOS } from "@/data/workshopData";
import { BLOG_POSTS } from "@/data/blogs";

interface SitemapSection {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  links: {
    title: string;
    description?: string;
    href: string;
    badge?: string;
  }[];
}

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sitemapSections: SitemapSection[] = useMemo(() => [
    {
      title: "Core Pages",
      description: "Essential company and informational pages",
      icon: Compass,
      links: [
        {
          title: "Home",
          description: "Leading car repair & maintenance workshop in Sharjah Industrial Area 5",
          href: "/",
          badge: "Main",
        },
        {
          title: "About Us",
          description: "Over 15+ years of automotive excellence and certified master mechanics",
          href: "/about-us",
        },
        {
          title: "All Services Overview",
          description: "Complete list of mechanical, electrical, and AC automotive services",
          href: "/services",
          badge: "Hub",
        },
        {
          title: "Book Appointment",
          description: "Priority online service bay booking and quick consultation",
          href: "/booking",
          badge: "Action",
        },
        {
          title: "Brands We Service",
          description: "Specialized repairs for German, Japanese, and American makes",
          href: "/brands",
        },
        {
          title: "Workshop Video Gallery",
          description: "Real repair tours: engine rebuilds, AC overhauls, and rotor skimming",
          href: "/gallery",
        },
        {
          title: "Maintenance Blogs & Guides",
          description: "Expert advice on driving, heat protection, and fluid intervals in the UAE",
          href: "/blogs",
        },
        {
          title: "Contact Us & Location Map",
          description: "Workshop address in Industrial Area 5, phone numbers, and WhatsApp",
          href: "/contact",
        },
        {
          title: "Frequently Asked Questions",
          description: "Answers about estimates, turnaround time, warranty, and pricing",
          href: "/faqs",
        },
      ],
    },
    {
      title: "Automotive Services",
      description: "Detailed workshop service pages and technical specs",
      icon: Wrench,
      links: WORKSHOP_SERVICES.map((s) => ({
        title: s.title,
        description: s.shortDesc,
        href: `/services-details?service=${s.id}`,
        badge: s.duration || "Service",
      })),
    },
    {
      title: "Vehicle Brands Serviced",
      description: "Luxury German, Japanese, American and Korean auto care",
      icon: Car,
      links: CAR_BRANDS.map((b) => ({
        title: `${b.name} (${b.category})`,
        description: b.specialty,
        href: "/brands",
        badge: b.category.split(" ")[0],
      })),
    },
    {
      title: "Car Care Blogs & Articles",
      description: "UAE driving tips, troubleshooting, and preventive guides",
      icon: FileText,
      links: BLOG_POSTS.map((p) => ({
        title: p.title,
        description: `${p.category} • ${p.readTime}`,
        href: `/blogs/${p.slug}`,
        badge: p.category,
      })),
    },
    {
      title: "Workshop Video Tours",
      description: "Behind-the-scenes mechanical repairs and diagnostic walk-throughs",
      icon: Video,
      links: WORKSHOP_VIDEOS.map((v) => ({
        title: v.title,
        description: v.description,
        href: "/gallery",
        badge: v.category,
      })),
    },
    {
      title: "Customer Support & Actions",
      description: "Direct customer portals, inquiries, and advisor channels",
      icon: HelpCircle,
      links: [
        {
          title: "Online Appointment Scheduler",
          description: "Reserve your slot with priority bay access",
          href: "/booking",
          badge: "Book",
        },
        {
          title: "General Inquiries & Directions",
          description: "Speak with our service reception",
          href: "/contact",
        },
        {
          title: "Frequently Asked Questions",
          description: "Warranty, parts authenticity, and diagnostic estimates",
          href: "/faqs",
        },
      ],
    },
  ], []);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sitemapSections;
    const q = searchQuery.toLowerCase().trim();

    return sitemapSections
      .map((sec) => {
        const matchingLinks = sec.links.filter(
          (link) =>
            link.title.toLowerCase().includes(q) ||
            (link.description && link.description.toLowerCase().includes(q))
        );
        return {
          ...sec,
          links: matchingLinks,
        };
      })
      .filter((sec) => sec.links.length > 0);
  }, [sitemapSections, searchQuery]);

  const totalLinks = useMemo(
    () => sitemapSections.reduce((acc, s) => acc + s.links.length, 0),
    [sitemapSections]
  );

  return (
    <main className="min-h-screen bg-zinc-50 pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-black text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Sitemap Hero"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Complete Website Directory</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
            HTML <span className="text-red-600">Sitemap</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-8">
            Easily navigate every service, car brand, technical repair guide, and customer support page at Bab Al Bustan Auto Maintenance Workshop.
          </p>

          {/* Search Bar for Sitemap */}
          <div className="max-w-xl mx-auto relative flex items-center">
            <Search className="w-5 h-5 text-red-500 absolute left-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sitemap pages, services, or brands..."
              className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 text-white placeholder-zinc-500 rounded-full pl-12 pr-10 py-3.5 text-sm outline-none transition-all shadow-xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-zinc-400 hover:text-white"
                aria-label="Clear sitemap search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-4 text-xs text-zinc-400 font-medium">
            Showing {filteredSections.reduce((acc, s) => acc + s.links.length, 0)} of {totalLinks} total pages
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 flex flex-col group"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-zinc-100">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                      {sec.title}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      {sec.links.length} pages available
                    </p>
                  </div>
                </div>

                {/* Section Links List */}
                <div className="space-y-2.5 flex-grow">
                  {sec.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.href}
                      className="group/item flex items-start justify-between p-2.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-zinc-800 group-hover/item:text-red-600 transition-colors truncate">
                            {link.title}
                          </h3>
                          {link.badge && (
                            <span className="text-[9px] font-black uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/60 px-2 py-0.5 rounded-full shrink-0">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        {link.description && (
                          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-300 group-hover/item:text-red-600 group-hover/item:translate-x-1 transition-all shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* If search query has 0 results */}
        {filteredSections.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 max-w-lg mx-auto shadow-sm">
            <HelpCircle className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-800">
              No matching pages found for "{searchQuery}"
            </h3>
            <p className="text-xs text-zinc-500 mt-1 mb-5">
              Try searching for general terms like "oil", "brakes", "Mercedes", "ac", or "booking".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
