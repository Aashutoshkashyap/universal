"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import { getSiteImage } from "@/lib/site-assets";

const SLIDE_INTERVAL_MS = 8000;

type HeroCarouselProps = {
  content: SiteContent["hero"]["carousel"];
};

export default function HeroCarousel({ content }: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideCount = content.slides.length;
  const safeActiveSlide = activeSlide % slideCount;
  const activeImage = content.slides[safeActiveSlide].image;

  const nextSlide = useCallback(() => {
    setActiveSlide((previous) => (previous + 1) % slideCount);
  }, [slideCount]);

  const previousSlide = useCallback(() => {
    setActiveSlide(
      (previous) => (previous - 1 + slideCount) % slideCount,
    );
  }, [slideCount]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isPaused) {
      autoplayRef.current = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    }
  };

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setIsPaused(motionPreference.matches);

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    return () => motionPreference.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, nextSlide]);

  const changeSlide = (direction: "previous" | "next") => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (direction === "next") {
      nextSlide();
    } else {
      previousSlide();
    }
    if (!isPaused) {
      autoplayRef.current = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          key={activeImage.alt}
          src={getSiteImage(activeImage.key)}
          alt={activeImage.alt}
          fill
          sizes="100vw"
          quality={25}
          loading={safeActiveSlide === 0 ? "eager" : "lazy"}
          fetchPriority={safeActiveSlide === 0 ? "high" : "auto"}
          className={`${safeActiveSlide === 0 ? "" : "hero-slide "}absolute inset-0 h-full w-full object-cover object-center`}
        />
      </div>

      <button
        onClick={() => changeSlide("previous")}
        className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        aria-label={content.previousAriaLabel}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => changeSlide("next")}
        className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        aria-label={content.nextAriaLabel}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-[128px] left-0 right-0 z-30 flex justify-center sm:bottom-[150px] lg:bottom-[108px]">
        <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
          {content.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="flex h-7 min-w-7 items-center justify-center rounded-full"
              aria-label={content.slideAriaLabelTemplate.replace(
                /\{number\}/g,
                String(index + 1),
              )}
              aria-current={index === safeActiveSlide ? "true" : undefined}
            >
              <span
                aria-hidden="true"
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === safeActiveSlide ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
            aria-label={
              isPaused ? content.playAriaLabel : content.pauseAriaLabel
            }
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
}
