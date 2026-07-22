"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Download, BookOpen, Wrench, Award, Lightbulb } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
];

const FEATURES = [
  { icon: <BookOpen className="w-6 h-6 text-red-600" />, label: "Research-Driven Learning" },
  { icon: <Wrench className="w-6 h-6 text-red-600" />, label: "Hands-on Engineering" },
  { icon: <Award className="w-6 h-6 text-red-600" />, label: "Industry-Ready Skills" },
  { icon: <Lightbulb className="w-6 h-6 text-red-600" />, label: "Innovation & Student Communities" },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  const goToSlide = (i: number) => {
    setActiveSlide(i);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(nextSlide, 5000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [nextSlide]);

  const handleArrow = (dir: "prev" | "next") => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    dir === "next" ? nextSlide() : prevSlide();
    autoplayRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <section className="relative w-full h-[88vh] flex flex-col overflow-visible">
      {/* ── Image Carousel ── */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Campus view ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${i === activeSlide ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      {/* Simple dark overlay for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

      {/* ── Arrow Controls ── */}
      <button
        onClick={() => handleArrow("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleArrow("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Hero Text ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-28 pt-20 pb-4">
        <div className="max-w-3xl space-y-6">
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.06] text-white drop-shadow-md font-semibold"
          >
            Where Future Engineers, Innovators, and Leaders Begin Their Journey.
          </h1>
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl">
            Build a strong foundation through academic excellence, practical learning, research, and industry collaboration—preparing you for a future of innovation, leadership, and lifelong success.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
            <a
              href="#contacts"
              className="inline-flex items-center gap-4 px-9 py-4 rounded-full bg-blue-600 hover:bg-red-600 text-white text-[13px] uppercase tracking-[0.16em] font-semibold transition-all shadow-lg group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#prospectus"
              className="inline-flex items-center gap-3.5 px-7 py-4 rounded-full bg-blue-600/30 hover:bg-red-600/90 backdrop-blur-md border border-white/30 hover:border-red-500/50 text-[13px] uppercase tracking-[0.14em] font-medium text-white transition-all shadow-lg group"
            >
              <Download className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Download Prospectus</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Dots: absolutely positioned above the feature box ── */}
      <div className="absolute bottom-[108px] left-0 right-0 z-35 flex justify-center">
        <div className="flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-white w-6" : "bg-white/40 w-2"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Feature Box: anchored at hero bottom, bleeds 50% into About section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-6 sm:px-10 lg:px-16 translate-y-1/2">
        <div className="ml-0 lg:ml-[28%] bg-white text-black rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-black/8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            {FEATURES.map(({ icon: rawIcon, label }, i) => (
              <div key={i} className="flex items-center gap-5 px-7 py-8 lg:py-10">
                <div className="w-14 h-14 rounded-full bg-black/6 flex items-center justify-center flex-none shrink-0">
                  <span className="scale-125">{rawIcon}</span>
                </div>
                <span className="text-[15px] lg:text-base text-black/80 font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
