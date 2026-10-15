"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  title?: string;
  maxImages?: number;
}

export default function GallerySlider({ images, title, maxImages }: GallerySliderProps) {
  // 1. Strictly deduplicate images by full path and by filename
  const base = useMemo(() => {
    if (!images || !Array.isArray(images)) return [];
    const seen = new Set<string>();
    const result: string[] = [];

    for (const img of images) {
      if (!img || typeof img !== "string") continue;
      const trimmed = img.trim();
      const fileName = trimmed.split("/").pop()?.toLowerCase() || trimmed;

      if (!seen.has(trimmed) && !seen.has(fileName)) {
        seen.add(trimmed);
        seen.add(fileName);
        result.push(trimmed);
      }
    }

    if (maxImages && maxImages > 0) {
      return result.slice(0, maxImages);
    }
    return result;
  }, [images, maxImages]);

  const total = base.length;

  // Responsive visible count: 4 on desktop, 3 on tablet, 2 on mobile
  const [visibleCount, setVisibleCount] = useState(4);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(4);
      else if (window.innerWidth >= 640) setVisibleCount(3);
      else setVisibleCount(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Compute maximum scroll index so we never overscroll and stop at the end
  const effectiveVisible = Math.max(1, Math.min(visibleCount, total));
  const maxIndex = Math.max(0, total - effectiveVisible);

  // Keep current in valid range when resized or data changes
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [maxIndex, current]);

  // Navigation handlers: stop at ends
  const goPrev = useCallback(() => {
    setCurrent((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Autoplay timer: smoothly slides until reaching the end, then stops
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (maxIndex <= 0 || isHovered || lightbox !== null || current >= maxIndex) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= maxIndex) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [maxIndex, isHovered, lightbox, current]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45 && current < maxIndex) {
      goNext();
    } else if (diff < -45 && current > 0) {
      goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowLeft") {
        setLightbox((p) => (p === null ? 0 : Math.max(0, p - 1)));
      } else if (e.key === "ArrowRight") {
        setLightbox((p) => (p === null ? 0 : Math.min(total - 1, p + 1)));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, total]);

  if (total === 0) return null;

  const slideWidth = 100 / effectiveVisible;

  return (
    <>
      <section
        className="mb-10 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider wrapper */}
        <div className="relative px-6 sm:px-8">
          {/* Track */}
          <div
            className="overflow-hidden"
            dir="ltr"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex transition-transform duration-500 ease-out ${
                total <= effectiveVisible ? "justify-center" : ""
              }`}
              style={{
                transform: `translateX(-${current * slideWidth}%)`,
              }}
            >
              {base.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="flex-shrink-0 px-1.5 cursor-pointer"
                  style={{ width: `${slideWidth}%` }}
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 shadow-xs hover:shadow-md transition-all duration-300 border border-stone-200/80 group">
                    <Image
                      src={src}
                      alt={`${title ?? "Gallery"} ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-white/80 text-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows: disabled when reaching start or end */}
          {maxIndex > 0 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={current <= 0}
                aria-label="Previous gallery image"
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shadow-md transition-all duration-200 ${
                  current <= 0
                    ? "opacity-30 cursor-not-allowed pointer-events-none"
                    : "hover:bg-[#008f88] cursor-pointer hover:scale-110 active:scale-95"
                }`}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={current >= maxIndex}
                aria-label="Next gallery image"
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shadow-md transition-all duration-200 ${
                  current >= maxIndex
                    ? "opacity-30 cursor-not-allowed pointer-events-none"
                    : "hover:bg-[#008f88] cursor-pointer hover:scale-110 active:scale-95"
                }`}
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators: corresponds to each scroll step */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-1.5 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide position ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 h-1.5 bg-[#01a9a0]"
                    : "w-1.5 h-1.5 bg-stone-300 hover:bg-[#01a9a0]/60"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          {total > 1 && (
            <button
              type="button"
              disabled={lightbox <= 0}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => (p === null ? 0 : Math.max(0, p - 1)));
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#01a9a0] text-white flex items-center justify-center transition-all shadow-lg z-20 ${
                lightbox <= 0
                  ? "opacity-30 cursor-not-allowed pointer-events-none"
                  : "hover:bg-[#008f88] cursor-pointer hover:scale-105 active:scale-95"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}

          {/* Main enlarged image */}
          <div
            className="relative max-w-5xl w-full max-h-[82vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={base[lightbox]}
              alt={`${title ?? "Gallery"} ${lightbox + 1}`}
              width={1400}
              height={900}
              unoptimized
              className="w-full h-auto max-h-[82vh] object-contain mx-auto"
            />
          </div>

          {/* Next button */}
          {total > 1 && (
            <button
              type="button"
              disabled={lightbox >= total - 1}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => (p === null ? 0 : Math.min(total - 1, p + 1)));
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#01a9a0] text-white flex items-center justify-center transition-all shadow-lg z-20 ${
                lightbox >= total - 1
                  ? "opacity-30 cursor-not-allowed pointer-events-none"
                  : "hover:bg-[#008f88] cursor-pointer hover:scale-105 active:scale-95"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}

          {/* Counter badge */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 text-xs sm:text-sm font-semibold bg-black/60 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/10">
            {lightbox + 1} / {total}
          </div>
        </div>
      )}
    </>
  );
}
