"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  X,
  Wrench,
  ShieldCheck,
  Cpu,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── TYPES ──────────────────────────────────────────────────────────── */
interface PhotoItem {
  id: number;
  type: "photo";
  thumbnail: string;
  category: "all" | "diagnostics" | "engine" | "brakes" | "ac" | "lube";
  categoryLabelEn: string;
  categoryLabelAr: string;
  serviceNameEn: string;
  serviceNameAr: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
}

interface VideoItem {
  id: number;
  type: "video";
  thumbnail: string;
  videoSrc: string;
  category: "all" | "ac" | "engine" | "hybrid" | "brakes";
  categoryLabelEn: string;
  categoryLabelAr: string;
  titleEn: string;
  titleAr: string;
  duration?: string;
  locationEn: string;
  locationAr: string;
}

/* ─── CATEGORY DEFINITIONS ───────────────────────────────────────────── */
const PHOTO_CATEGORIES = [
  { id: "all", labelEn: "ALL", labelAr: "الكل" },
  { id: "diagnostics", labelEn: "DIAGNOSTICS & ECU", labelAr: "فحص وبرمجة" },
  { id: "engine", labelEn: "ENGINE & GEARBOX", labelAr: "المحرك والجير" },
  { id: "brakes", labelEn: "BRAKES & SUSPENSION", labelAr: "فرامل ومساعدات" },
  { id: "ac", labelEn: "AC & COOLING", labelAr: "تكييف وتبريد" },
  { id: "lube", labelEn: "EXPRESS LUBE", labelAr: "صيانة دورية" },
];

const VIDEO_CATEGORIES = [
  { id: "all", labelEn: "ALL", labelAr: "الكل" },
  { id: "ac", labelEn: "AC & COOLING", labelAr: "تكييف وتبريد" },
  { id: "engine", labelEn: "ENGINE CARE", labelAr: "المحركات" },
  { id: "hybrid", labelEn: "HYBRID & WORKSHOP", labelAr: "هايبرد والورشة" },
  { id: "brakes", labelEn: "BRAKES & CHASSIS", labelAr: "الفرامل والشاسيه" },
];

/* ─── PHOTOS DATA (Bab Al Bustan Real Workshop Projects) ─────────────── */
const PHOTO_ITEMS: PhotoItem[] = [
  {
    id: 101,
    type: "photo",
    thumbnail: "/images/hero-workshop-new.jpg",
    category: "diagnostics",
    categoryLabelEn: "Diagnostics & ECU",
    categoryLabelAr: "فحص وبرمجة الكمبيوتر",
    serviceNameEn: "Computerized Health Scan",
    serviceNameAr: "فحص كمبيوتر شامل",
    titleEn: "Toyota Camry & Mercedes Diagnostic Bay",
    titleAr: "قسم الفحص الإلكتروني لتويوتا ومرسيدس",
    locationEn: "Sharjah Industrial Area 5",
    locationAr: "المنطقة الصناعية 5، الشارقة",
  },
  {
    id: 102,
    type: "photo",
    thumbnail: "/images/hero-slide-2.jpg",
    category: "engine",
    categoryLabelEn: "Engine & Transmission",
    categoryLabelAr: "المحرك والجيربوكس",
    serviceNameEn: "Engine Overhaul & Timing",
    serviceNameAr: "توضيب وصيانة المحركات",
    titleEn: "Mercedes-Benz V8 BiTurbo Precision Care",
    titleAr: "صيانة محرك مرسيدس بنز V8 بايتيربو",
    locationEn: "German & Luxury Care",
    locationAr: "صيانة السيارات الألمانية",
  },
  {
    id: 103,
    type: "photo",
    thumbnail: "/images/hero-brakes-new.jpg",
    category: "brakes",
    categoryLabelEn: "Brakes & Suspension",
    categoryLabelAr: "الفرامل والمساعدات",
    serviceNameEn: "Brake Rotor Skimming",
    serviceNameAr: "خرط الدسكات وفحمات سيراميك",
    titleEn: "Precision Disc Skimming & Ceramic Pads",
    titleAr: "خرط هوبات إلكتروني وتركيب سفايف سيراميك",
    locationEn: "Brake Safety Bay",
    locationAr: "قسم سلامة الفرامل",
  },
  {
    id: 104,
    type: "photo",
    thumbnail: "/images/service-3.png",
    category: "ac",
    categoryLabelEn: "AC & Climate Control",
    categoryLabelAr: "تكييف وتبريد",
    serviceNameEn: "Compressor & Leak Diagnostics",
    serviceNameAr: "كمبروسر وفحص تسريب الغاز",
    titleEn: "High-Pressure AC Evaporator & Compressor Service",
    titleAr: "صيانة مكيف وضغط الفريون وثلاجة التكييف",
    locationEn: "Climate Control Bay",
    locationAr: "قسم التكييف المتخصص",
  },
  {
    id: 105,
    type: "photo",
    thumbnail: "/images/hero-slide-3.jpg",
    category: "lube",
    categoryLabelEn: "Express Maintenance",
    categoryLabelAr: "صيانة دورية سريعة",
    serviceNameEn: "Multi-Point Service Bay",
    serviceNameAr: "فحص وصيانة شاملة",
    titleEn: "Toyota Corolla Periodic Maintenance & Lube",
    titleAr: "صيانة دورية وتبديل زيوت لتويوتا كورولا",
    locationEn: "Express Maintenance",
    locationAr: "صيانة دورية معتمدة",
  },
  {
    id: 106,
    type: "photo",
    thumbnail: "/images/service-5.png",
    category: "brakes",
    categoryLabelEn: "Brakes & Suspension",
    categoryLabelAr: "الفرامل والمساعدات",
    serviceNameEn: "Suspension Arms & Bushings",
    serviceNameAr: "مقصات ومساعدات وبوشات",
    titleEn: "Hydraulic Shock Absorbers & Control Arm Renewal",
    titleAr: "تبديل المساعدات الهيدروليكية وبوشات المقصات",
    locationEn: "Chassis & Ride Bay",
    locationAr: "أنظمة التعليق والشاسيه",
  },
  {
    id: 107,
    type: "photo",
    thumbnail: "/images/service-7.png",
    category: "diagnostics",
    categoryLabelEn: "Diagnostics & ECU",
    categoryLabelAr: "فحص وبرمجة الكمبيوتر",
    serviceNameEn: "Module Coding & Smart Keys",
    serviceNameAr: "برمجة كمبيوتر ومفاتيح ذكية",
    titleEn: "OEM ECU Software Calibration & Adaptation",
    titleAr: "برمجة ومعايرة وحدات التحكم الإلكتروني ECU",
    locationEn: "Coding Laboratory",
    locationAr: "مختبر البرمجة الإلكترونية",
  },
  {
    id: 108,
    type: "photo",
    thumbnail: "/images/service-1.png",
    category: "lube",
    categoryLabelEn: "Express Maintenance",
    categoryLabelAr: "صيانة دورية سريعة",
    serviceNameEn: "Synthetic Engine Lube",
    serviceNameAr: "زيوت محرك تخليقية كاملة",
    titleEn: "Desert-Grade Synthetic Oil & OEM Filter Exchange",
    titleAr: "تغيير زيت المحرك التخليقي وفلتر أصلي للحرارة العالية",
    locationEn: "Lube & Oil Center",
    locationAr: "مركز الزيوت التخليقية",
  },
  {
    id: 109,
    type: "photo",
    thumbnail: "/images/service-8.png",
    category: "diagnostics",
    categoryLabelEn: "Diagnostics & ECU",
    categoryLabelAr: "فحص وبرمجة الكمبيوتر",
    serviceNameEn: "Electrical & Battery Load",
    serviceNameAr: "كهرباء وفحص بطاريات",
    titleEn: "Digital Alternator & AGM Battery Load Testing",
    titleAr: "فحص دينامو الشحن وبطاريات AGM الرقمي",
    locationEn: "Auto Electrical Bay",
    locationAr: "قسم كهرباء السيارات",
  },
  {
    id: 110,
    type: "photo",
    thumbnail: "/images/service-4.png",
    category: "engine",
    categoryLabelEn: "Engine & Transmission",
    categoryLabelAr: "المحرك والجيربوكس",
    serviceNameEn: "Cylinder Compression Test",
    serviceNameAr: "فحص ضغط السلندرات والصبابات",
    titleEn: "Combustion Pressure & Valve Timing Analysis",
    titleAr: "قياس ضغط غرف الاحتراق وتوافق الصمامات",
    locationEn: "Precision Engine Bay",
    locationAr: "قسم هندسة المحركات",
  },
  {
    id: 111,
    type: "photo",
    thumbnail: "/images/service-6.png",
    category: "brakes",
    categoryLabelEn: "Brakes & Suspension",
    categoryLabelAr: "الفرامل والمساعدات",
    serviceNameEn: "3D Laser Wheel Alignment",
    serviceNameAr: "ميزان ليزر ثلاثي الأبعاد",
    titleEn: "Computerized High-Speed Balancing & Camber Tuning",
    titleAr: "ترصيص إلكتروني وميزان إطارات ليزر للسرعات العالية",
    locationEn: "Tire & Alignment Bay",
    locationAr: "قسم الإطارات والميزان",
  },
  {
    id: 112,
    type: "photo",
    thumbnail: "/images/service-9.png",
    category: "engine",
    categoryLabelEn: "Engine & Transmission",
    categoryLabelAr: "المحرك والجيربوكس",
    serviceNameEn: "Gearbox Flush & Valve Body",
    serviceNameAr: "غسيل جيربوكس ومخ القير",
    titleEn: "Automatic Transmission Fluid Flush & Mechatronics",
    titleAr: "تبديل زيت القير الأوتوماتيكي وفحص مخ الجير",
    locationEn: "Drivetrain & Gearbox Bay",
    locationAr: "قسم الجيربوكس ونقل الحركة",
  },
];

/* ─── VIDEOS DATA (Bab Al Bustan Real Workshop MP4s) ─────────────────── */
const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 1,
    type: "video",
    thumbnail: "/images/hero-slide-2.jpg",
    videoSrc: "/videos/mercedes-engine-rebuild.mp4",
    category: "engine",
    categoryLabelEn: "Engine Overhaul",
    categoryLabelAr: "توضيب محركات",
    titleEn: "Mercedes-Benz V8 Engine Teardown & Rebuild",
    titleAr: "توضيب وتجديد محرك مرسيدس بنز V8 بالكامل",
    duration: "1:45",
    locationEn: "German & Luxury Care",
    locationAr: "صيانة السيارات الألمانية",
  },
  {
    id: 2,
    type: "video",
    thumbnail: "/images/service-3.png",
    videoSrc: "/videos/nissan-ac-evaporator.mp4",
    category: "ac",
    categoryLabelEn: "AC & Cooling",
    categoryLabelAr: "تكييف وتبريد",
    titleEn: "Nissan Patrol AC Evaporator Core Replacement",
    titleAr: "استبدال ثلاجة مكيف نيسان باترول بفك الطبلون",
    duration: "1:30",
    locationEn: "AC Master Service",
    locationAr: "قسم التكييف المتخصص",
  },
  {
    id: 3,
    type: "video",
    thumbnail: "/images/hero-slide-1.jpg",
    videoSrc: "/videos/toyota-hybrid-repair.mp4",
    category: "hybrid",
    categoryLabelEn: "Hybrid & Workshop",
    categoryLabelAr: "هايبرد والورشة",
    titleEn: "Toyota Hybrid Inverter & High-Voltage Service",
    titleAr: "فحص محول الهايبرد ونظام الجهد العالي لتويوتا",
    duration: "1:20",
    locationEn: "Hybrid Diagnostics",
    locationAr: "فحص وبرمجة الهايبرد",
  },
  {
    id: 4,
    type: "video",
    thumbnail: "/images/service-3.png",
    videoSrc: "/videos/ac-gas-remove.mp4",
    category: "ac",
    categoryLabelEn: "AC & Cooling",
    categoryLabelAr: "تكييف وتبريد",
    titleEn: "Automated AC Refrigerant Recovery & Vacuum",
    titleAr: "سحب غاز المكيف وتفريغ الهواء وفحص التسريب الآلي",
    duration: "1:15",
    locationEn: "Precision Climate Control",
    locationAr: "شحن غاز أصلي ومعتمد",
  },
  {
    id: 5,
    type: "video",
    thumbnail: "/images/service-3.png",
    videoSrc: "/videos/ac-system-flush.mp4",
    category: "ac",
    categoryLabelEn: "AC & Cooling",
    categoryLabelAr: "تكييف وتبريد",
    titleEn: "Complete AC Loop Flush & Debris Extraction",
    titleAr: "غسيل دورة التكييف وتنظيف الشوائب قبل تركيب الكمبروسر",
    duration: "1:40",
    locationEn: "Cooling Circuit Flush",
    locationAr: "تنظيف متكامل لدورة التبريد",
  },
  {
    id: 6,
    type: "video",
    thumbnail: "/images/hero-slide-2.jpg",
    videoSrc: "/videos/mercedes-timing-chain.mp4",
    category: "engine",
    categoryLabelEn: "Engine Overhaul",
    categoryLabelAr: "توضيب محركات",
    titleEn: "Mercedes Camshaft Phaser & Timing Chain Calibration",
    titleAr: "ضبط سنتر الجنزير وتروس الكامات لمحرك مرسيدس",
    duration: "1:35",
    locationEn: "Timing & Camshafts",
    locationAr: "توقيت المحرك الميكانيكي",
  },
  {
    id: 7,
    type: "video",
    thumbnail: "/images/hero-slide-3.jpg",
    videoSrc: "/videos/toyota-corolla-red.mp4",
    category: "hybrid",
    categoryLabelEn: "Hybrid & Workshop",
    categoryLabelAr: "هايبرد والورشة",
    titleEn: "Toyota Corolla Workshop Bay Express Inspection",
    titleAr: "فحص وصيانة سريعة لسيارة تويوتا كورولا على الرافعة",
    duration: "1:10",
    locationEn: "Express Bay Service",
    locationAr: "صيانة سريعة معتمدة",
  },
  {
    id: 8,
    type: "video",
    thumbnail: "/images/service-4.png",
    videoSrc: "/videos/ToyotaEngine.mp4",
    category: "engine",
    categoryLabelEn: "Engine Overhaul",
    categoryLabelAr: "توضيب محركات",
    titleEn: "Toyota V6 Dual VVT-i Valve & Spark Diagnostics",
    titleAr: "فحص بواجي وكويلات محرك تويوتا V6 Dual VVT-i",
    duration: "1:25",
    locationEn: "Engine Bay Scans",
    locationAr: "فحص المحرك المتقدم",
  },
  {
    id: 9,
    type: "video",
    thumbnail: "/images/hero-workshop-new.jpg",
    videoSrc: "/videos/workshop-video-1.mp4",
    category: "hybrid",
    categoryLabelEn: "Hybrid & Workshop",
    categoryLabelAr: "هايبرد والورشة",
    titleEn: "Workshop Tour & Vehicle Lift Diagnostic Overview",
    titleAr: "جولة داخل ورشة باب البستان وفحص السيارات على الرافعات",
    duration: "1:50",
    locationEn: "Sharjah Facility Tour",
    locationAr: "جولة مرافق الورشة بالشارقة",
  },
  {
    id: 10,
    type: "video",
    thumbnail: "/images/hero-brakes-new.jpg",
    videoSrc: "/videos/workshop-video-2.mp4",
    category: "brakes",
    categoryLabelEn: "Brakes & Chassis",
    categoryLabelAr: "الفرامل والشاسيه",
    titleEn: "On-Car Brake Rotor Skimming & Caliper Calibration",
    titleAr: "خرط دسكات الفرامل على السيارة وضبط كليبرات الفرامل",
    duration: "1:30",
    locationEn: "Brake Safety Center",
    locationAr: "مركز صيانة الفرامل",
  },
  {
    id: 11,
    type: "video",
    thumbnail: "/images/service-5.png",
    videoSrc: "/videos/workshop-video-3.mp4",
    category: "brakes",
    categoryLabelEn: "Brakes & Chassis",
    categoryLabelAr: "الفرامل والشاسيه",
    titleEn: "Suspension Arm Hydraulic Bushing Press Installation",
    titleAr: "كبس وتركيب بوشات المقصات الهيدروليكية بالمكبس",
    duration: "1:20",
    locationEn: "Suspension & Ride",
    locationAr: "صيانة أنظمة التعليق",
  },
  {
    id: 12,
    type: "video",
    thumbnail: "/images/ims_b_3.jpg",
    videoSrc: "/videos/workshop-video-5.mp4",
    category: "engine",
    categoryLabelEn: "Engine Overhaul",
    categoryLabelAr: "توضيب محركات",
    titleEn: "Computerized Trouble Code Clearing & Road Testing",
    titleAr: "مسح أكواد الأعطال الإلكترونية واختبار القيادة الميداني",
    duration: "1:15",
    locationEn: "Road Test Verification",
    locationAr: "اختبار الأداء على الطريق",
  },
];

/* ─── TAJALRAHMAH-STYLE CUSTOM VIDEO CARD COMPONENT ──────────────────── */
function VideoCard({
  video,
  isArabic,
  onOpenModal,
}: {
  video: VideoItem;
  isArabic: boolean;
  onOpenModal: (video: VideoItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getEffectiveDuration = () => {
    if (duration > 0) return duration;
    if (video.duration) {
      const parts = video.duration.split(":");
      if (parts.length === 2) {
        const m = parseInt(parts[0], 10);
        const s = parseInt(parts[1], 10);
        if (!isNaN(m) && !isNaN(s)) return m * 60 + s;
      }
    }
    return 84;
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = cardRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any)?.webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === cardRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const updateSeekFromEvent = (clientX: number) => {
    if (!seekerRef.current || !videoRef.current) return;
    const rect = seekerRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const totalDuration = getEffectiveDuration();
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * totalDuration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateSeekFromEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSeekFromEvent(e.clientX);
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const effectiveDuration = getEffectiveDuration();
  const progressPercentage =
    effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden aspect-video bg-zinc-950 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 select-none border border-zinc-200/80 ${isFullscreen ? "w-full h-full" : ""
        }`}
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={video.videoSrc}
        poster={video.thumbnail}
        preload="metadata"
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Thumbnail Overlay when not playing */}
      {!isPlaying && video.thumbnail && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
        >
          <Image
            src={video.thumbnail}
            alt={isArabic ? video.titleAr : video.titleEn}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
        </div>
      )}

      {/* Top Header Overlay: Maximize Button */}
      <div
        className={`absolute top-0 inset-x-0 p-3 sm:p-4 z-20 flex items-center justify-end pointer-events-none transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
      >
        {/* Maximize Button to open full video modal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(video);
          }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-all pointer-events-auto cursor-pointer shrink-0"
          title={isArabic ? "تكبير الفيديو" : "Expand Video"}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Big Play Button: White BG + Red Icon (Taj Al Rahmah Reference Layout) */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white hover:bg-zinc-100 text-red-600 flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 active:scale-95 group/playbtn"
            title={isArabic ? "تشغيل الفيديو" : "Play Video"}
          >
            <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-red-600 text-red-600 ml-1 rtl:ml-0 rtl:mr-1 transition-transform group-hover/playbtn:scale-105" />
          </div>
        </div>
      )}

      {/* Bottom Controls Bar: Time, Volume, Fullscreen, Scrubber */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 inset-x-0 z-30 px-3.5 sm:px-4 pb-2.5 sm:pb-3 pt-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${!isPlaying ? "opacity-100" : "opacity-100 sm:opacity-0 group-hover:opacity-100"
          }`}
      >
        {/* Row 1: Time, Volume & Fullscreen */}
        <div className="flex items-center justify-between text-white mb-1.5 sm:mb-2">
          <div className="flex items-center">
            <span className="font-mono font-medium tracking-wide text-white text-xs sm:text-sm drop-shadow-sm select-none">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : (video.duration || "1:24")}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="p-1 text-white/90 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
              title={isMuted ? (isArabic ? "تشغيل الصوت" : "Unmute") : (isArabic ? "كتم الصوت" : "Mute")}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-1 text-white/90 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
              title={isFullscreen ? (isArabic ? "إنهاء ملء الشاشة" : "Exit Fullscreen") : (isArabic ? "ملء الشاشة" : "Fullscreen")}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Full-width Scrubber Progress Bar */}
        <div
          ref={seekerRef}
          onClick={handleSeekClick}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
            updateSeekFromEvent(e.clientX);
          }}
          className="relative w-full py-1.5 cursor-pointer flex items-center group/seeker select-none"
        >
          <div className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>

          <div
            className="absolute top-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-md pointer-events-none transition-transform group-hover/seeker:scale-125 border border-red-600"
            style={{
              left: `${Math.min(100, Math.max(0, progressPercentage))}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN GALLERY PAGE COMPONENT ────────────────────────────────────── */
export default function GalleryPage() {
  const router = useRouter();
  const { isArabic } = useLanguage();

  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("all");
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("all");

  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // ── Filtered Photos ──────────────────────────────────────────
  const filteredPhotos = useMemo(() => {
    if (selectedPhotoCategory === "all") return PHOTO_ITEMS;
    return PHOTO_ITEMS.filter((p) => p.category === selectedPhotoCategory);
  }, [selectedPhotoCategory]);

  // ── Filtered & Displayed Videos ──────────────────────────────
  const filteredVideos = useMemo(() => {
    if (selectedVideoCategory === "all") return VIDEO_ITEMS;
    return VIDEO_ITEMS.filter((v) => v.category === selectedVideoCategory);
  }, [selectedVideoCategory]);

  // 2-row Stacked Video Columns for Taj Al Rahmah Layout
  const videoColumns = useMemo(() => {
    const cols: VideoItem[][] = [];
    for (let i = 0; i < filteredVideos.length; i += 2) {
      cols.push(filteredVideos.slice(i, i + 2));
    }
    return cols;
  }, [filteredVideos]);

  // ── Photo Slider Scroll Ref & Actions ────────────────────────
  const photoSliderRef = useRef<HTMLDivElement>(null);

  const scrollPhotos = (direction: "left" | "right") => {
    if (photoSliderRef.current) {
      const container = photoSliderRef.current;
      const card = container.querySelector<HTMLElement>(".photo-gallery-slide");
      const cardWidth = card ? card.offsetWidth : 350;
      const scrollStep = cardWidth + 24;
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollStep : factor * scrollStep;

      container.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  // ── Video Slider Scroll Ref & Actions ────────────────────────
  const videoSliderRef = useRef<HTMLDivElement>(null);

  const scrollVideos = (direction: "left" | "right") => {
    if (videoSliderRef.current) {
      const container = videoSliderRef.current;
      const col = container.querySelector<HTMLElement>(".video-gallery-col");
      const colWidth = col ? col.offsetWidth : 350;
      const scrollStep = colWidth + 24;
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollStep : factor * scrollStep;

      container.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  // ── Lightbox Navigation ──────────────────────────────────────
  const handleOpenPhoto = (photo: PhotoItem) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setActivePhotoIndex(idx >= 0 ? idx : 0);
    setActivePhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!filteredPhotos.length) return;
    const nextIdx = (activePhotoIndex + 1) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!filteredPhotos.length) return;
    const prevIdx = (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIndex(prevIdx);
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        if (activePhoto) (isArabic ? handlePrevPhoto() : handleNextPhoto());
      } else if (e.key === "ArrowLeft") {
        if (activePhoto) (isArabic ? handleNextPhoto() : handlePrevPhoto());
      }
    };
    if (activeVideo || activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo, activePhoto, activePhotoIndex, filteredPhotos, isArabic]);

  return (
    <div
      className="min-h-screen bg-white text-zinc-900 overflow-x-hidden selection:bg-red-600/15 selection:text-red-600"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HERO HEADER SECTION (High-Impact Hero with Workshop Banner)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[600px] min-h-[600px] overflow-hidden flex flex-col justify-center items-center bg-zinc-950">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Bab Al Bustan Workshop Media Gallery"
            fill
            className="object-cover object-center"
            src="/images/banners/banner-gallery.jpg"
            priority
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 text-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-600/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>{isArabic ? "ورشة باب البستان • الشارقة" : "Bab Al Bustan • Sharjah Industrial 5"}</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight text-white mb-4">
            {isArabic ? (
              <>
                معرض صيانة السيارات <span className="text-red-600">والأعمال الميدانية</span>
              </>
            ) : (
              <>
                Workshop Gallery & <span className="text-red-600">Project Media</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-zinc-300 text-xs sm:text-sm md:text-base font-normal leading-relaxed opacity-95">
            {isArabic
              ? "استكشف أحدث عمليات فحص الكمبيوتر، توضيب المحركات، صيانة التكييف، وخرط الدسكات التي ينفذها فنيونا المعتمدون داخل ورشتنا بالشارقة."
              : "Explore our real workshop bays in action: ECU computerized scanning, precision engine rebuilds, high-pressure AC flush, and brake skimming."}
          </p>

          {/* Breadcrumb Navigation */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-red-500 font-bold">
              {isArabic ? "معرض الأعمال" : "Gallery"}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          QUICK HIGHLIGHTS STRIP (Light Theme 4 Pillars)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-zinc-200/90 shadow-xl shadow-zinc-900/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
                {isArabic ? "فحص كمبيوتر 100%" : "100% ECU Scanning"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {isArabic ? "أحدث أجهزة الوكالات" : "OEM Dealership Scanners"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
                {isArabic ? "فنيون معتمدون" : "Master Mechanics"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {isArabic ? "ألماني وياباني وأمريكي" : "German & Japanese Experts"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
                {isArabic ? "قطع غيار أصلية" : "Genuine OEM Parts"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {isArabic ? "بضمان الجودة والأداء" : "Factory Certified Quality"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
                {isArabic ? "تسليم سريع" : "Same-Day Delivery"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {isArabic ? "للصيانة الدورية والفحص" : "For Express Lube & Brakes"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: A CLOSER LOOK AT OUR WORK (PHOTO GALLERY - LIGHT THEME)
          (Taj Al Rahmah Reference Layout)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 bg-[#F8FAFC] border-b border-zinc-200/80 overflow-hidden mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-10 text-left rtl:text-right">
            {/* Tagline: — IMAGE GALLERY */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[2px] bg-red-600 inline-block" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-red-600">
                {isArabic ? "معرض الصور" : "IMAGE GALLERY"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
              {isArabic ? (
                <>
                  نظرة عن قرب على <span className="text-red-600">أعمالنا الميدانية</span>
                </>
              ) : (
                <>
                  A Closer Look At <span className="text-red-600">Our Work</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-zinc-600 max-w-2xl leading-relaxed">
              {isArabic
                ? "استكشف صوراً حية لعمليات الإصلاح الميكانيكي، فحص الحساسات، توضيب الجير والمحركات، وتجهيز السيارات في ورشتنا بالمنطقة الصناعية 5."
                : "Explore high-resolution captures of our certified technicians rebuilding engines, skimming brake rotors, and calibrating advanced ECUs."}
            </p>
          </div>

          {/* Filter Bar with Carousel Arrow Controls (Light Theme) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {PHOTO_CATEGORIES.map((cat) => {
                const isActive = selectedPhotoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPhotoCategory(cat.id)}
                    className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 scale-100"
                        : "bg-white text-zinc-700 hover:text-red-600 border border-zinc-200/90 shadow-2xs hover:border-red-600/40"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => scrollPhotos("left")}
                aria-label={isArabic ? "السابق" : "Previous Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-zinc-200/90 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollPhotos("right")}
                aria-label={isArabic ? "التالي" : "Next Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-zinc-200/90 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {/* Photo Slider Carousel (Light Theme Cards) */}
          <div className="relative group/carousel">
            <div
              ref={photoSliderRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 sm:gap-6 pb-4 pt-1 px-0.5 no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto(photo)}
                  className="photo-gallery-slide flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] snap-start flex flex-col group cursor-pointer"
                >
                  {/* Image Container (Landscape Rectangle aspect-[16/10]) */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/90 group-hover:border-red-600/60 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={photo.thumbnail}
                      alt={isArabic ? photo.titleAr : photo.titleEn}
                      fill
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 380px, 410px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-300" />

                    {/* Center Hover Action Button (View Details / Lightbox) */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold tracking-wide shadow-xl shadow-red-600/40 hover:scale-105 transition-all">
                        <span>{isArabic ? "عرض الصورة كاملة" : "View Photo"}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] rtl:rotate-180 shrink-0" />
                      </span>
                    </div>

                    {/* Category Tag Badge at Top */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                        {isArabic ? photo.categoryLabelAr : photo.categoryLabelEn}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Outside the Card (Clean Light Theme) */}
                  <div className="mt-3.5 sm:mt-4 flex flex-col text-left rtl:text-right">
                    <span className="text-xs sm:text-[13px] text-red-600 font-semibold tracking-wide truncate">
                      {isArabic ? photo.serviceNameAr : photo.serviceNameEn}
                    </span>

                    <h3 className="mt-1 text-sm sm:text-base font-bold text-zinc-900 group-hover:text-red-600 transition-colors leading-snug truncate">
                      {isArabic ? photo.titleAr : photo.titleEn}
                    </h3>

                    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                      {isArabic ? photo.locationAr : photo.locationEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: VIDEO GALLERY (LIGHT THEME - NO HEADING/SUBHEADING)
          (Taj Al Rahmah Reference Layout: 2-Row Stacked Carousel)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Tagline */}
          <div className="flex items-center gap-2 mb-6 text-left rtl:text-right">
            <span className="w-5 sm:w-6 h-[2px] bg-red-600 inline-block" />
            <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-red-600">
              {isArabic ? "معرض الفيديو" : "VIDEO GALLERY"}
            </span>
          </div>

          {/* Filter Bar with Carousel Arrow Controls (Light Theme) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {VIDEO_CATEGORIES.map((cat) => {
                const isActive = selectedVideoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedVideoCategory(cat.id)}
                    className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 scale-100"
                        : "bg-zinc-100 text-zinc-700 hover:text-red-600 border border-zinc-200/90 shadow-2xs hover:border-red-600/40"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => scrollVideos("left")}
                aria-label={isArabic ? "السابق" : "Previous Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-zinc-200/90 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollVideos("right")}
                aria-label={isArabic ? "التالي" : "Next Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md border border-zinc-200/90 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {/* 2-Row Video Columns Carousel (Exact Taj Al Rahmah Layout) */}
          <div className="relative group/carousel">
            <div
              ref={videoSliderRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 sm:gap-6 pb-4 pt-1 px-0.5 no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videoColumns.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className="video-gallery-col flex-shrink-0 flex flex-col gap-5 sm:gap-6 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] snap-start"
                >
                  {col.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isArabic={isArabic}
                      onOpenModal={(v) => setActiveVideo(v)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VIDEO MODAL PLAYER (Taj Al Rahmah Reference Layout)
      ══════════════════════════════════════════════════════════════ */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {isArabic ? activeVideo.titleAr : activeVideo.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PHOTO LIGHTBOX MODAL (Taj Al Rahmah Reference Layout)
      ══════════════════════════════════════════════════════════════ */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-zinc-900 border-b border-zinc-800 text-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-600 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  {isArabic ? activePhoto.categoryLabelAr : activePhoto.categoryLabelEn}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {isArabic ? activePhoto.titleAr : activePhoto.titleEn}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-mono">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close photo lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Res Photo Display */}
            <div className="relative w-full aspect-[16/10] bg-black flex items-center justify-center">
              <Image
                src={activePhoto.thumbnail}
                alt={isArabic ? activePhoto.titleAr : activePhoto.titleEn}
                fill
                priority
                className="object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 shadow-lg hover:scale-110"
                aria-label="Previous Photo"
              >
                <ChevronLeft className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 shadow-lg hover:scale-110"
                aria-label="Next Photo"
              >
                <ChevronRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
