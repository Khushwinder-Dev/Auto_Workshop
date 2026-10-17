"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  column: number;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "What types of vehicles do you service?",
    answer:
      "We specialize in servicing and repairing a wide range of vehicles, including luxury, German, and premium cars, using advanced tools and expert technicians.",
    column: 1,
  },
  {
    id: 2,
    question: "How often should I service my car?",
    answer:
      "Regular maintenance is key. We typically recommend a minor service every 5,000–10,000 km and a major service every 20,000–40,000 km, depending on your vehicle's make and model.",
    column: 1,
  },
  {
    id: 3,
    question: "Do you offer same-day service?",
    answer:
      "Yes, for most minor repairs and routine maintenance, we offer same-day service to get you back on the road as quickly as possible.",
    column: 1,
  },
  {
    id: 4,
    question: "Is there a warranty on repairs?",
    answer:
      "Absolutely. We provide a warranty on both our parts and workmanship to ensure you have total peace of mind after leaving our workshop.",
    column: 1,
  },
  {
    id: 5,
    question: "Do you provide vehicle diagnostics?",
    answer:
      "Yes, we use the latest computerized diagnostic tools to accurately identify issues within your vehicle's engine, transmission, and electrical systems.",
    column: 1,
  },
  {
    id: 6,
    question: "Do you offer free pickup and drop-off?",
    answer:
      "Yes, we provide free pickup and drop-off services across selected areas in Sharjah for customer convenience.",
    column: 2,
  },
  {
    id: 7,
    question: "Can I get a cost estimate before repairs?",
    answer:
      "Yes, we provide a detailed inspection and a transparent quote before starting any work, so there are never any hidden costs.",
    column: 2,
  },
  {
    id: 8,
    question: "Do you service air conditioning systems?",
    answer:
      "Our technicians are experts in AC diagnostics, gas refilling, and component repairs to keep your cabin cool during the hottest months.",
    column: 2,
  },
  {
    id: 9,
    question: "How do I book an appointment?",
    answer:
      "You can book via our website, call our hotline, or message us on WhatsApp for an immediate booking confirmation.",
    column: 2,
  },
  {
    id: 10,
    question: "Where can I get satisfactory car service?",
    answer:
      "Bab Al Bustan Auto Maintenance Workshop is the top choice in Sharjah for reliable, expert, and affordable automotive care.",
    column: 2,
  },
];

function FaqAccordionItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-100 last:border-0 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group transition-all"
      >
        <span className="text-zinc-900 font-bold text-lg pr-4 transition-colors group-hover:text-red-600">
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-zinc-900 shadow-lg" : "bg-red-600"
          }`}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-white" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-8 text-zinc-500 text-base leading-relaxed max-w-xl">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([1, 6]);

  const toggle = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-5xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight">
            Most Popular Questions About Car Repair in Sharjah
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0 items-start">
          <div className="flex flex-col">
            {faqs
              .filter((faq) => faq.column === 1)
              .map((faq) => (
                <FaqAccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.includes(faq.id)}
                  toggle={() => toggle(faq.id)}
                />
              ))}
          </div>
          <div className="flex flex-col">
            {faqs
              .filter((faq) => faq.column === 2)
              .map((faq) => (
                <FaqAccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.includes(faq.id)}
                  toggle={() => toggle(faq.id)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
