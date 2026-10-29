import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/Common/NewsletterSection";
import Footer from "@/components/Common/Footer";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import { Toaster } from "react-hot-toast";
import AosInit from "@/components/AosInit";
import { LanguageProvider } from "@/context/LanguageContext";
import { ALL_CLIENT_KEYWORDS, WORKSHOP_SCHEMA } from "@/data/seoKeywords";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://babalbustan.ae"),
  title: {
    default: "Bab Al Bustan Auto Maintenance | Best Car Workshop in Sharjah",
    template: "%s | Bab Al Bustan Auto Maintenance Sharjah",
  },
  description:
    "Professional car repair, auto maintenance, computerized diagnostics, car AC repair, brake service, and synthetic oil change in Sharjah Industrial Area 5. Multi-brand German, Japanese & American vehicle specialists.",
  keywords: ALL_CLIENT_KEYWORDS,
  authors: [{ name: "Bab Al Bustan Auto Maintenance Workshop" }],
  creator: "Bab Al Bustan Auto Maintenance",
  publisher: "Bab Al Bustan Auto Maintenance Workshop",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://babalbustan.ae",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Bab Al Bustan Auto Maintenance | Best Car Workshop in Sharjah",
    description:
      "Premier car repair and maintenance workshop in Sharjah Industrial Area 5. Expert diagnostics, brake service, car AC repair, oil change, and full vehicle inspection.",
    url: "https://babalbustan.ae",
    siteName: "Bab Al Bustan Auto Maintenance Workshop",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Bab Al Bustan Auto Maintenance Workshop Sharjah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bab Al Bustan Auto Maintenance | Car Repair Sharjah",
    description:
      "Leading car workshop in Sharjah Industrial Area 5. Computer diagnostics, AC repair, brake service, and oil changes for German, Japanese & American vehicles.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WORKSHOP_SCHEMA) }}
        />
      </head>
      <body className="antialiased bg-white text-zinc-900 font-sans selection:bg-red-600 selection:text-white">
        <LanguageProvider>
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

          <AosInit />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <NewsletterSection />
          <Footer />

          <FloatingChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
