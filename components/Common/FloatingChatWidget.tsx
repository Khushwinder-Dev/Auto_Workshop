"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Phone,
  Send,
  ArrowUpRight,
  X,
  Sparkles,
  Clock,
  Trash2,
  User,
  Mail,
  MapPin,
  Wrench,
  ShieldCheck,
  Car,
  SquarePen,
  ArrowRightToLine,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VoiceMicButton, useVoiceInput } from "@/components/ui/VoiceMicButton";
import { WORKSHOP_INFO } from "@/data/workshopData";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  createdAt: number;
  messages: Message[];
}

export interface ChatUserInfo {
  name: string;
  email: string;
  phone: string;
}

const STORAGE_KEY = "babalbustan_chat_history_v1";
const USER_INFO_KEY = "babalbustan_chat_user_info_v1";

// Helper to render bolding, bullet points, markdown links, emails, and phone numbers cleanly
function renderMessageContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <span key={idx} className="block h-1.5" />;
    }

    const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-");
    const cleanLine = isBullet ? trimmed.replace(/^[•\-]\s*/, "") : line;

    // Helper to render plain text with emails and phone numbers made clickable
    const renderContactLinks = (raw: string, keyPrefix: string) => {
      const contactRegex =
        /(info@babalbustanuae\.com|babalbustan1@gmail\.com|\+971\s*(?:56|55|50|52|54|4)\s*\d{3}\s*\d{4}|\+971\s*56\s*440\s*6456|\+971\s*55\s*763\s*6994)/gi;
      const parts = raw.split(contactRegex);
      return parts.map((part, cIdx) => {
        if (/info@babalbustanuae\.com|babalbustan1@gmail\.com/i.test(part)) {
          return (
            <a
              key={`${keyPrefix}-email-${cIdx}`}
              href={`mailto:${part.trim()}`}
              className="text-red-600 underline font-medium hover:text-red-700 transition-colors"
            >
              {part}
            </a>
          );
        }
        if (/^\+971/i.test(part.trim())) {
          const cleanPhone = part.replace(/\s+/g, "");
          return (
            <a
              key={`${keyPrefix}-phone-${cIdx}`}
              href={`tel:${cleanPhone}`}
              className="text-red-600 underline font-semibold hover:text-red-700 transition-colors inline-flex items-center gap-0.5 mx-0.5"
            >
              {part}
            </a>
          );
        }
        return part;
      });
    };

    // Helper to render bold and contact links
    const renderBoldAndContacts = (segment: string, segIdx: number) => {
      const boldParts = segment.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith("**") && bPart.endsWith("**")) {
          return (
            <strong key={`b-${segIdx}-${bIdx}`} className="font-semibold text-stone-900">
              {renderContactLinks(bPart.slice(2, -2), `b-${segIdx}-${bIdx}`)}
            </strong>
          );
        }
        return (
          <React.Fragment key={`t-${segIdx}-${bIdx}`}>
            {renderContactLinks(bPart, `t-${segIdx}-${bIdx}`)}
          </React.Fragment>
        );
      });
    };

    // Parse markdown links [label](url)
    const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
    const segments = cleanLine.split(linkRegex);

    return (
      <span
        key={idx}
        className={`block ${
          isBullet
            ? "pl-3 rtl:pl-0 rtl:pr-3 my-0.5 relative before:content-['•'] before:absolute before:left-0 rtl:before:left-auto rtl:before:right-0 before:text-red-600 before:font-bold"
            : "my-0.5"
        }`}
      >
        {segments.map((seg, sIdx) => {
          const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (linkMatch) {
            const label = linkMatch[1];
            const href = linkMatch[2];
            const isInternal = href.startsWith("/");
            return (
              <a
                key={`link-${sIdx}`}
                href={href}
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? undefined : "noopener noreferrer"}
                className="text-red-600 font-semibold underline hover:text-red-700 transition-colors inline-flex items-center gap-0.5 mx-0.5"
              >
                <span>{label}</span>
                <ArrowUpRight className="w-3 h-3 inline-block" />
              </a>
            );
          }
          return renderBoldAndContacts(seg, sIdx);
        })}
      </span>
    );
  });
}

export default function FloatingChatWidget() {
  const { isArabic } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "services" | "history">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [quickActions, setQuickActions] = useState<string[]>([]);

  // User Lead Capture State
  const [userInfo, setUserInfo] = useState<ChatUserInfo | null>(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [infoForm, setInfoForm] = useState({ name: "", email: "", phone: "" });
  const [infoErrors, setInfoErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Speech-to-text integration
  const voice = useVoiceInput({
    isArabic,
    onResult: (_field, text) => {
      setInputValue((prev) => {
        const trimmed = prev.trim();
        return trimmed ? `${trimmed} ${text}` : text;
      });
    },
  });

  // Load chat history & user info on mount
  useEffect(() => {
    try {
      const savedInfo = localStorage.getItem(USER_INFO_KEY);
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        if (parsed?.name && parsed?.phone) {
          setUserInfo(parsed);
          setInfoForm(parsed);
        }
      }

      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setChatHistory(parsedHistory);
          if (parsedHistory[0]?.messages?.length > 0) {
            setMessages(parsedHistory[0].messages);
          }
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // Save conversation to history when message length updates
  useEffect(() => {
    if (messages.length >= 2) {
      const userFirst = messages.find((m) => m.sender === "user")?.text || "Workshop Inquiry";
      const lastAi = messages.filter((m) => m.sender === "ai").slice(-1)[0]?.text || "";
      const sessionId = messages[0]?.id || String(Date.now());

      setChatHistory((prev) => {
        const existingIdx = prev.findIndex((s) => s.id === sessionId);
        const updatedSession: ChatSession = {
          id: sessionId,
          title: userFirst.length > 34 ? userFirst.slice(0, 34) + "..." : userFirst,
          lastMessage: lastAi.length > 55 ? lastAi.slice(0, 55) + "..." : lastAi,
          timestamp: "Just now",
          createdAt: Date.now(),
          messages,
        };

        let newHistory: ChatSession[];
        if (existingIdx >= 0) {
          newHistory = [...prev];
          newHistory[existingIdx] = updatedSession;
        } else {
          newHistory = [updatedSession, ...prev].slice(0, 15);
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        } catch {
          // ignore storage error
        }
        return newHistory;
      });
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (activeTab === "chat" && isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, activeTab, isOpen]);

  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuickActions([]);
    setActiveTab("chat");
    setShowInfoForm(false);
  };

  // Submit User Info Lead Form
  const handleUserInfoSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!infoForm.name.trim()) {
      errors.name = isArabic ? "يرجى إدخال اسمك الكريم" : "Please enter your name";
    }

    if (!infoForm.phone.trim()) {
      errors.phone = isArabic ? "يرجى إدخال رقم الهاتف للتواصل" : "Please enter your phone number";
    }

    if (infoForm.email.trim() && !/\S+@\S+\.\S+/.test(infoForm.email)) {
      errors.email = isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      return;
    }

    setInfoErrors({});
    const newUserData = {
      name: infoForm.name.trim(),
      email: infoForm.email.trim(),
      phone: infoForm.phone.trim(),
    };

    setUserInfo(newUserData);
    setShowInfoForm(false);

    try {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUserData));
    } catch {
      // ignore
    }

    // Dispatch lead immediately to backend API (Google Sheets + Gmail)
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "5_Chatbot_Leads",
          name: newUserData.name,
          phone: newUserData.phone,
          email: newUserData.email || "",
          message: `New AI Chatbot inquiry started by ${newUserData.name} (${newUserData.phone})`,
          subject: "AI Chatbot Customer Lead",
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    // Greet user
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: `${Date.now()}-ai-welcome`,
        sender: "ai",
        text: isArabic
          ? `أهلاً بك يا ${newUserData.name}! 👋 يسعدنا خدمتك في ورشة باب البستان لصيانة السيارات بالشارقة. كيف يمكننا مساعدتك اليوم؟`
          : `Hello ${newUserData.name}! 👋 Welcome to Bab Al Bustan Auto Maintenance in Sharjah. How can our certified mechanics assist with your car today?`,
        timestamp: getCurrentTime(),
      };
      setMessages([welcomeMsg]);
      setQuickActions(
        isArabic
          ? [
              "فحص كمبيوتر وتشخيص الأعطال",
              "صيانة المكيف وتعبئة غاز فريون",
              "خرط ديسكات وتبديل سفايف سيراميك",
              "حجز موعد صيانة بالورشة",
            ]
          : [
              "Check Engine Light Diagnostic",
              "AC Gas Recharge & UV Leak Test",
              "Brake Pad & Rotor Skimming",
              "Book Workshop Appointment",
            ]
      );
    }
  };

  // Handle Quick Action clicks
  const handleActionClick = (action: string) => {
    const actionLower = action.toLowerCase();

    // Direct WhatsApp
    if (actionLower.includes("whatsapp") || action.includes("واتساب")) {
      const waText = encodeURIComponent(
        isArabic
          ? `مرحباً ورشة باب البستان، أود الاستفسار بخصوص: ${action}`
          : `Hello Bab Al Bustan, I would like to inquire about: ${action}`
      );
      window.open(`https://wa.me/971564406456?text=${waText}`, "_blank");
      return;
    }

    // Direct Phone Call
    if (actionLower.includes("call") || action.includes("اتصل") || action.includes("+971")) {
      window.location.href = "tel:+971564406456";
      return;
    }

    // Direct Booking Navigation
    if (
      actionLower.includes("book") ||
      action.includes("حجز") ||
      actionLower.includes("appointment")
    ) {
      window.location.href = "/booking";
      return;
    }

    // Normal chat message
    handleSend(action);
  };

  // Send message
  const handleSend = async (textToSend?: string) => {
    if (!userInfo) {
      setShowInfoForm(true);
      return;
    }

    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: query,
      timestamp: getCurrentTime(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          userInfo,
          isArabic,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const data = await res.json();
      const aiMsg: Message = {
        id: `${Date.now()}-ai`,
        sender: "ai",
        text:
          data.reply ||
          (isArabic
            ? "يسعدنا الرد على استفسارك، يرجى التواصل معنا هاتفياً أو عبر واتساب على الرقم +971 56 440 6456."
            : "We are glad to assist you. Please reach our workshop team directly at +971 56 440 6456 or on WhatsApp."),
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      if (Array.isArray(data.quickActions) && data.quickActions.length > 0) {
        setQuickActions(data.quickActions);
      }
    } catch {
      const fallbackAiMsg: Message = {
        id: `${Date.now()}-ai-fallback`,
        sender: "ai",
        text: isArabic
          ? "أهلاً بك! يمكنك زيارة ورشتنا في الشارقة، المنطقة الصناعية 5، أو التواصل معنا مباشرة عبر الاتصال أو واتساب على الرقم +971 56 440 6456 لخدمتك على الفور."
          : "Welcome! You can visit our workshop in Sharjah Industrial Area 5, or reach our service manager directly at +971 56 440 6456 for immediate assistance.",
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
      setQuickActions(
        isArabic
          ? ["اتصل الآن +971 56 440 6456", "تواصل عبر واتساب", "حجز موعد صيانة"]
          : ["Call +971 56 440 6456", "Chat on WhatsApp", "Book Service Slot"]
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (confirm(isArabic ? "هل أنت متأكد من مسح المحادثة الحالية؟" : "Are you sure you want to clear this conversation?")) {
      setMessages([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  // Categories
  const categories = isArabic
    ? [
        { label: "الكل", value: "All" },
        { label: "فحص كمبيوتر", value: "Diagnostics" },
        { label: "المكيف", value: "AC" },
        { label: "الفرامل", value: "Brakes" },
        { label: "الزيوت", value: "Oil" },
        { label: "الموقع والاتصال", value: "Contact" },
      ]
    : [
        { label: "All", value: "All" },
        { label: "Diagnostics", value: "Diagnostics" },
        { label: "A/C Repair", value: "AC" },
        { label: "Brakes", value: "Brakes" },
        { label: "Oil Change", value: "Oil" },
        { label: "Contact & Location", value: "Contact" },
      ];

  // Default Prompts
  const defaultPrompts = isArabic
    ? [
        "فحص كمبيوتر وتشخيص أعطال لمبة المحرك",
        "صيانة مكيف السيارة وتعبئة غاز فريون أصلي",
        "خرط ديسكات ليزري وتبديل سفايف سيراميك",
        "تغيير زيت تخليقي مع فلتر وفحص شامل",
        "حجز موعد فحص سريع في الورشة بالشارقة",
        "موقع الورشة في صناعية 5 وأوقات العمل",
      ]
    : [
        "Computer diagnostics & check engine scan",
        "Car A/C gas recharge & UV leak test",
        "Brake pad replacement & rotor skimming",
        "Fully synthetic oil change & 30-point check",
        "Book an express service slot in Sharjah",
        "Workshop location in Industrial Area 5 & timings",
      ];

  return (
    <>
      {/* ── CHATBOT WINDOW (WHITE THEME - TAJ AL RAHMAH STYLE) ── */}
      {isOpen && (
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={`fixed bottom-6 ${
            isArabic ? "left-4 sm:left-6" : "right-4 sm:right-6"
          } z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[610px] max-h-[86vh] bg-white rounded-3xl shadow-2xl shadow-stone-900/25 border border-stone-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200`}
        >
          {/* ── TOP HEADER BAR (WHITE THEME) ── */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-100 bg-white select-none">
            {/* Pill Tab Switcher: Chat | Services | History */}
            <div className="flex items-center bg-stone-100 rounded-full p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("chat");
                  setShowInfoForm(false);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {isArabic ? "المحادثة" : "Chat"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "services"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {isArabic ? "خدماتنا" : "Services"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "history"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {isArabic ? "السجل" : "History"}
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 text-stone-600">
              {/* WhatsApp Quick Link */}
              <a
                href={WORKSHOP_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <div className="w-4 h-4 font-bold text-xs flex items-center justify-center">WA</div>
              </a>

              {/* Call Hotline */}
              <a
                href="tel:+971564406456"
                title="Call Workshop"
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* User Profile / Edit Info */}
              {userInfo && (
                <button
                  type="button"
                  onClick={() => setShowInfoForm((prev) => !prev)}
                  title={isArabic ? "تعديل البيانات" : "Edit details"}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showInfoForm
                      ? "bg-red-50 text-red-600"
                      : "hover:bg-stone-100 hover:text-stone-900 text-stone-500"
                  }`}
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* New Chat Button */}
              <button
                type="button"
                onClick={handleNewChat}
                title={isArabic ? "محادثة جديدة" : "New Chat"}
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <SquarePen className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title={isArabic ? "إغلاق" : "Close"}
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <ArrowRightToLine className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* ── TAB 1: CHAT ── */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col min-h-0 bg-white relative">
              {/* ── FIRST-TIME USER INTAKE FORM (WHITE THEME) ── */}
              {(!userInfo || showInfoForm) ? (
                <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-center">
                  <div className="max-w-md mx-auto w-full">
                    {/* Centered Logo */}
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-center p-2 shadow-xs">
                        <Image
                          src="/images/logo-new.png"
                          alt="Bab Al Bustan"
                          width={48}
                          height={48}
                          className="w-auto h-auto max-h-10 object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center mb-5">
                      <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                        {isArabic ? "أهلاً بك في كراج باب البستان 👋" : "Welcome to Bab Al Bustan 👋"}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        {isArabic
                          ? "يرجى إدخال بياناتك لبدء المحادثة الفورية مع مستشار الصيانة الذكي"
                          : "Please enter your details to start chatting with our AI advisor"}
                      </p>
                    </div>

                    <form onSubmit={handleUserInfoSubmit} className="space-y-3.5">
                      {/* Name Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "الاسم الكريم *" : "Your Full Name *"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={infoForm.name}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, name: e.target.value }));
                              if (infoErrors.name) setInfoErrors((p) => ({ ...p, name: undefined }));
                            }}
                            placeholder={isArabic ? "مثال: محمد الشامسي" : "e.g. John Smith"}
                            className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50/70 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                              infoErrors.name
                                ? "border-red-500 bg-red-50/20"
                                : "border-stone-200 focus:border-red-600 focus:ring-1 focus:ring-red-600/30"
                            }`}
                          />
                        </div>
                        {infoErrors.name && (
                          <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{infoErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            value={infoForm.phone}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, phone: e.target.value }));
                              if (infoErrors.phone) setInfoErrors((p) => ({ ...p, phone: undefined }));
                            }}
                            placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                            className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50/70 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                              infoErrors.phone
                                ? "border-red-500 bg-red-50/20"
                                : "border-stone-200 focus:border-red-600 focus:ring-1 focus:ring-red-600/30"
                            }`}
                          />
                        </div>
                        {infoErrors.phone && (
                          <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{infoErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "البريد الإلكتروني (اختياري)" : "Email Address (Optional)"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            value={infoForm.email}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, email: e.target.value }));
                              if (infoErrors.email) setInfoErrors((p) => ({ ...p, email: undefined }));
                            }}
                            placeholder="name@example.com"
                            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600/30 transition-all"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full mt-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isArabic ? "ابدأ المحادثة الآن" : "Start Conversation"}</span>
                      </button>

                      {userInfo && showInfoForm && (
                        <button
                          type="button"
                          onClick={() => setShowInfoForm(false)}
                          className="w-full text-center text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 cursor-pointer"
                        >
                          {isArabic ? "إلغاء والعودة للمحادثة" : "Cancel & Return to Chat"}
                        </button>
                      )}
                    </form>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[10px] text-stone-400 text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>
                        {isArabic
                          ? "بياناتك في أمان تام وتُستخدم فقط لخدمتكم والتواصل المهني."
                          : "Your information is secure and used solely for workshop communication."}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── STANDARD CHAT & WELCOME STREAM (WHITE THEME) ── */
                <>
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.length === 0 ? (
                      /* ── Welcome Screen (White Theme) ── */
                      <div className="flex flex-col items-center pt-2 pb-2 text-center">
                        {/* Company Logo */}
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 mb-2 bg-stone-50 border border-stone-200/80 shadow-xs">
                          <Image
                            src="/images/logo-new.png"
                            alt="Bab Al Bustan"
                            width={54}
                            height={54}
                            className="w-auto h-auto max-h-12 object-contain"
                          />
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                          {isArabic ? `مرحباً بك يا ${userInfo.name} 👋` : `Hello ${userInfo.name} 👋`}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 mt-0.5 mb-4">
                          {isArabic ? "كيف يمكن لمستشار الصيانة مساعدتك اليوم؟" : "How can our auto advisor help you today?"}
                        </p>

                        {/* Suggestion Prompts */}
                        <div className="w-full space-y-2 mb-4">
                          {defaultPrompts.map((prompt, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSend(prompt)}
                              className="w-full flex items-center justify-between text-left rtl:text-right px-3.5 py-2.5 rounded-xl border border-stone-200/80 hover:border-red-500 hover:bg-stone-50/70 text-stone-700 hover:text-stone-900 transition-all duration-200 group cursor-pointer text-xs sm:text-sm"
                            >
                              <span className="flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span>{prompt}</span>
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Category Filter Chips */}
                        <div className="w-full flex items-center justify-start gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {categories.map((cat) => (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => {
                                setActiveCategory(cat.value);
                                if (cat.value === "Diagnostics") {
                                  handleSend(
                                    isArabic
                                      ? "ما هي تفاصيل وأجهزة فحص كمبيوتر السيارة وكشف الأعطال؟"
                                      : "Tell me about your computer diagnostic scan and check engine light diagnosis."
                                  );
                                } else if (cat.value === "AC") {
                                  handleSend(
                                    isArabic ? "ما هي خدمات فحص مكيف السيارة وتعبئة الغاز؟" : "Tell me about car AC repair and gas refill."
                                  );
                                } else if (cat.value === "Brakes") {
                                  handleSend(
                                    isArabic ? "أود معرفة تفاصيل خرط الديسكات وتبديل السفايف" : "Tell me about brake pad replacement and rotor skimming."
                                  );
                                } else if (cat.value === "Oil") {
                                  handleSend(
                                    isArabic ? "ما هي أنواع الزيوت التخليقية وخدمة تبديل الفلتر؟" : "Tell me about synthetic oil change service."
                                  );
                                } else if (cat.value === "Contact") {
                                  handleSend(
                                    isArabic ? "أين موقع الورشة بالشارقة وما هي أوقات العمل وأرقام الاتصال؟" : "Where are you located in Sharjah and what are your contact numbers?"
                                  );
                                }
                              }}
                              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all cursor-pointer ${
                                activeCategory === cat.value
                                  ? "border border-red-600 text-red-600 bg-red-50 font-medium"
                                  : "border border-stone-200 text-stone-600 hover:border-stone-300"
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* ── Active Conversation Stream (White Theme) ── */
                      <div className="space-y-3.5">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${
                              msg.sender === "user" ? "items-end" : "items-start"
                            }`}
                          >
                            {msg.sender === "user" ? (
                              <div className="max-w-[85%] bg-red-50 text-stone-900 border border-red-100 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed">
                                {msg.text}
                              </div>
                            ) : (
                              <div className="flex items-start gap-2 max-w-[92%]">
                                <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200/70 flex items-center justify-center shrink-0 mt-0.5 p-1">
                                  <Image
                                    src="/images/logo-new.png"
                                    alt="AI"
                                    width={20}
                                    height={20}
                                    className="w-auto h-auto max-h-5 object-contain"
                                  />
                                </div>
                                <div className="bg-stone-50 border border-stone-200/80 text-stone-800 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed">
                                  {renderMessageContent(msg.text)}
                                </div>
                              </div>
                            )}
                            <span className="text-[10px] text-stone-400 mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        ))}

                        {/* Typing Indicator (White Theme) */}
                        {isTyping && (
                          <div className="flex items-center gap-2 max-w-[85%]">
                            <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200/70 flex items-center justify-center shrink-0 p-1">
                              <Image
                                src="/images/logo-new.png"
                                alt="AI"
                                width={20}
                                height={20}
                                className="w-auto h-auto max-h-5 object-contain"
                              />
                            </div>
                            <div className="bg-stone-100 rounded-2xl px-3.5 py-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce" />
                              <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]" />
                              <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        )}

                        {/* Quick action chips (White Theme) */}
                        {quickActions.length > 0 && !isTyping && (
                          <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                                {isArabic ? "إجراءات سريعة" : "Quick actions"}
                              </span>
                              <div className="h-px bg-stone-200 flex-1" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {quickActions.map((action, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleActionClick(action)}
                                  className="text-left rtl:text-right px-3.5 py-2 rounded-xl bg-red-50/70 hover:bg-red-100/70 text-stone-800 text-xs sm:text-sm font-normal transition-colors cursor-pointer border border-red-200/60"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* ── BOTTOM INPUT BAR (WHITE THEME) ── */}
                  <div className="p-3 border-t border-stone-100 bg-white">
                    <div className="relative rounded-2xl border border-stone-200 bg-stone-50/70 p-2.5 focus-within:border-red-600 focus-within:bg-white focus-within:shadow-md transition-all">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder={
                          isArabic
                            ? "اسأل الذكاء الاصطناعي عن صيانة سيارتك..."
                            : "Ask AI about repair, prices, diagnostics..."
                        }
                        className="w-full bg-transparent text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none pr-20 rtl:pr-0 rtl:pl-20"
                      />

                      {/* Right Input Actions: Voice Mic + Send */}
                      <div className="absolute right-2 rtl:right-auto rtl:left-2 bottom-1.5 flex items-center gap-1">
                        <VoiceMicButton
                          isListening={voice.listeningField === "chat-input"}
                          onClick={() => voice.toggleListening("chat-input")}
                          isArabic={isArabic}
                          size="sm"
                          theme="light"
                        />

                        <button
                          type="button"
                          onClick={() => handleSend()}
                          disabled={!inputValue.trim()}
                          aria-label={isArabic ? "إرسال" : "Send message"}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
                            inputValue.trim()
                              ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer active:scale-95"
                              : "bg-stone-200 text-stone-400 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <Send className="w-3.5 h-3.5 rtl:-scale-x-100" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-stone-400 px-1 select-none">
                      <span>{isArabic ? "مدعوم بنموذج Google Gemini 3.5 Flash" : "Powered by Google Gemini 3.5 Flash"}</span>
                      <Link href="/booking" className="text-red-600 font-semibold hover:underline">
                        {isArabic ? "حجز موعد فحص" : "Book Online"}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── TAB 2: SERVICES (WHITE THEME) ── */}
          {activeTab === "services" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
              <div className="text-xs text-stone-500 mb-1">
                {isArabic
                  ? "اختر خدمة للاستفسار أو الحجز المباشر بالورشة:"
                  : "Select a service for instant pricing or booking:"}
              </div>

              {/* Diagnostics */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 hover:border-red-500 hover:shadow-xs transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">
                        {isArabic ? "فحص كمبيوتر وكشف أعطال" : "Computer Diagnostics Scan"}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {isArabic ? "كشف لمبة المحرك والحساسات" : "Check engine light & ECU codes"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSend(isArabic ? "أود الاستفسار عن فحص الكمبيوتر وكشف الأعطال" : "I need a computer diagnostic scan")}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {isArabic ? "استفسار" : "Inquire"}
                  </button>
                </div>
              </div>

              {/* AC Service */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 hover:border-red-500 hover:shadow-xs transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">
                        {isArabic ? "صيانة وتعبئة مكيف السيارة" : "Car A/C Gas Refill & Leak Test"}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {isArabic ? "كشف تسريب UV وفريون أمريكي R134a" : "UV leak check & R134a recovery"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSend(isArabic ? "كم سعر فحص وتعبئة غاز المكيف؟" : "What is the price for AC gas refill?")}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {isArabic ? "استفسار" : "Inquire"}
                  </button>
                </div>
              </div>

              {/* Brake Service */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 hover:border-red-500 hover:shadow-xs transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">
                        {isArabic ? "خرط ديسكات وسفايف سيراميك" : "Brake Skimming & Ceramic Pads"}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {isArabic ? "معالجة رجة الفرامل وصوت الصفير" : "Eliminate brake pedal vibration"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSend(isArabic ? "أود صيانة الفرامل وخرط الديسكات" : "I need brake pad replacement and rotor skimming")}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {isArabic ? "استفسار" : "Inquire"}
                  </button>
                </div>
              </div>

              {/* Workshop Location & Timings Card */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>{isArabic ? "موقع الورشة وأوقات العمل" : "Workshop Location & Timings"}</span>
                </div>
                <p className="text-[11px] text-stone-700">
                  {isArabic
                    ? "الشارقة، المنطقة الصناعية 5، بالقرب من شارع مليحة وتقاطع ناشيونال بينتس."
                    : "Industrial Area 5, Sharjah, UAE (Near Maliha Road & National Paints)."}
                </p>
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Sat–Thu: 8:00 AM – 8:30 PM | Fri: 8:00 AM – 12:30 PM & 2:30 PM – 8:30 PM</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <a
                    href={WORKSHOP_INFO.mapEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 rounded-lg text-[11px] text-center font-semibold transition-colors"
                  >
                    {isArabic ? "خرائط Google" : "Google Maps"}
                  </a>
                  <Link
                    href="/booking"
                    className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] text-center font-bold transition-colors"
                  >
                    {isArabic ? "حجز موعد" : "Book Slot"}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: HISTORY (WHITE THEME) ── */}
          {activeTab === "history" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-white">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>{isArabic ? "المحادثات السابقة المحفوظة:" : "Saved Previous Conversations:"}</span>
                {chatHistory.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="text-red-600 hover:underline text-[11px]"
                  >
                    {isArabic ? "مسح السجل" : "Clear History"}
                  </button>
                )}
              </div>

              {chatHistory.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  {isArabic ? "لا توجد محادثات سابقة بعد" : "No saved conversations yet"}
                </div>
              ) : (
                chatHistory.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      setMessages(session.messages);
                      setActiveTab("chat");
                    }}
                    className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 hover:border-red-500 hover:bg-white hover:shadow-xs cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-stone-900 text-xs truncate max-w-[200px]">
                        {session.title}
                      </h4>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">{session.lastMessage}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER FLOATING TRIGGER & 3 OPTIONS POPOVER (TAJ AL RAHMAH STYLE)
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={menuRef}
        className={`fixed bottom-6 ${
          isArabic ? "left-6 items-start" : "right-6 items-end"
        } z-50 flex flex-col gap-2.5`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Menu Popover Card (3 Options: Chat Now, WhatsApp, Call Now) */}
        {isMenuOpen && !isOpen && (
          <div className="flex flex-col gap-1.5 p-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/90 animate-in fade-in slide-in-from-bottom-2 duration-200 min-w-[205px]">
            {/* 1. Chat Now (AI Assistant) */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-stone-800 hover:text-red-700 font-medium text-xs sm:text-sm transition-all duration-200 text-left rtl:text-right cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 leading-tight">
                  {isArabic ? "المحادثة الآن" : "Chat Now"}
                </span>
                <span className="text-[10px] text-stone-500">
                  {isArabic ? "المستشار الذكي (24/7)" : "Ask AI assistant"}
                </span>
              </div>
            </button>

            {/* 2. WhatsApp */}
            <a
              href={WORKSHOP_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 font-medium text-xs sm:text-sm transition-all duration-200 text-left rtl:text-right cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 leading-tight">
                  {isArabic ? "واتساب" : "WhatsApp"}
                </span>
                <span className="text-[10px] text-stone-500">+971 56 440 6456</span>
              </div>
            </a>

            {/* 3. Call Now */}
            <a
              href="tel:+971564406456"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-stone-800 hover:text-emerald-700 font-medium text-xs sm:text-sm transition-all duration-200 text-left rtl:text-right cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 leading-tight">
                  {isArabic ? "اتصل الآن" : "Call Now"}
                </span>
                <span className="text-[10px] text-stone-500">+971 56 440 6456</span>
              </div>
            </a>
          </div>
        )}

        {/* Floating Trigger Button (Round Button with Popover Toggle) */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isArabic ? "خيارات التواصل" : "Contact options"}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-red-500 text-white shadow-[0_10px_35px_rgba(220,38,38,0.45)] hover:shadow-[0_15px_45px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Pulsating Ping Ring */}
            <span className="absolute -inset-1 rounded-full bg-red-600 opacity-40 animate-ping pointer-events-none" />

            {/* Online Status Dot */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />

            <div className="relative flex items-center justify-center">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white stroke-[2.2] rotate-90 animate-in duration-200" />
              ) : (
                <MessageSquare className="w-6 h-6 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
              )}
            </div>

            {/* Hover Tooltip / Hint */}
            {!isMenuOpen && (
              <div
                className={`absolute ${
                  isArabic ? "left-full ml-3" : "right-full mr-3"
                } opacity-0 group-hover:opacity-100 ${
                  isArabic ? "-translate-x-1 group-hover:translate-x-0" : "translate-x-1 group-hover:translate-x-0"
                } transition-all duration-200 pointer-events-none hidden sm:block whitespace-nowrap`}
              >
                <div className="bg-white text-stone-900 border border-stone-200 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>{isArabic ? "محادثة أو اتصال" : "Chat, WhatsApp or Call"}</span>
                </div>
              </div>
            )}
          </button>
        )}
      </div>
    </>
  );
}
