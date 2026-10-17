import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Common/Footer";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Car Workshop in Sharjah | Bab Al Bustan Auto Maintenance",
  description:
    "Professional auto repair & car maintenance in Sharjah Industrial Area 5. We specialize in oil changes, brake repair, AC service, and computer diagnostics.",
  keywords: [
    "car maintenance Sharjah",
    "auto repair Sharjah",
    "car workshop Sharjah",
    "car AC repair Sharjah",
    "oil change Sharjah",
    "brake repair Sharjah",
    "Bab Al Bustan auto workshop"
  ],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Best Car Workshop in Sharjah | Bab Al Bustan Auto Maintenance",
    description:
      "Professional auto repair & car maintenance in Sharjah Industrial Area 5. We specialize in oil changes, brake repair, AC service, and computer diagnostics.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="antialiased bg-white text-zinc-900 font-sans selection:bg-red-600 selection:text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#18181b",
              color: "#fff",
              border: "1px solid #27272a",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#fff",
              },
            },
          }}
        />

        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingChatWidget />
      </body>
    </html>
  );
}
