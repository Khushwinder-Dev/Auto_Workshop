"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Common/Footer";
import NewsletterSection from "@/components/Common/NewsletterSection";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import VisitorTracker from "@/components/VisitorTracker";

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-zinc-950 text-zinc-100">{children}</div>;
  }

  return (
    <>
      <VisitorTracker />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <NewsletterSection />
      <Footer />
      <FloatingChatWidget />
    </>
  );
}

