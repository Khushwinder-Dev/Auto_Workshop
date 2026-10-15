"use client";

import React from "react";
import NavMenuSitemap from "@/components/sitemap/NavMenuSitemap";
import OldSitemap from "@/components/sitemap/OldSitemap";

const USE_NAV_MENU_SITEMAP = true;

export default function SitemapPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ── Active Sitemap Section (Currently showing the 8 Nav Menu Groups) ── */}
      {USE_NAV_MENU_SITEMAP ? (
        <NavMenuSitemap />
      ) : (
        <OldSitemap />
      )}
    </div>
  );
}
