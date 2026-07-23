"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import hero1 from "../../../assets/images/hero1.webp";
import hero2 from "../../../assets/images/hero2.webp";
import hero3 from "../../../assets/images/hero3.webp";
import hero4 from "../../../assets/images/hero4.webp";

const HERO_IMAGES = [
  {
    src: hero1,
    alt: "Aerial view of the UESC campus and courtyard in Chakupat, Lalitpur",
  },
  {
    src: hero2,
    alt: "UESC campus garden surrounded by academic buildings",
  },
  {
    src: hero3,
    alt: "Reception area at Universal Engineering and Science College",
  },
  {
    src: hero4,
    alt: "UESC students learning together in a computer laboratory",
  },
];

const SLIDE_INTERVAL_MS = 8000;

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeImage = HERO_IMAGES[activeSlide];

  const nextSlide = useCallback(() => {
    setActiveSlide((previous) => (previous + 1) % HERO_IMAGES.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveSlide(
      (previous) => (previous - 1 + HERO_IMAGES.length) % HERO_IMAGES.length,
    );
  }, []);

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
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="100vw"
          quality={35}
          loading={activeSlide === 0 ? "eager" : "lazy"}
          fetchPriority={activeSlide === 0 ? "high" : "auto"}
          className={`${activeSlide === 0 ? "" : "hero-slide "}absolute inset-0 h-full w-full object-cover object-center`}
        />
      </div>

      <button
        onClick={() => changeSlide("previous")}
        className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => changeSlide("next")}
        className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-[128px] left-0 right-0 z-30 flex justify-center sm:bottom-[150px] lg:bottom-[108px]">
        <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image.alt}
              onClick={() => goToSlide(index)}
              className="flex h-7 min-w-7 items-center justify-center rounded-full"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            >
              <span
                aria-hidden="true"
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-white/20"
            aria-label={isPaused ? "Play campus slideshow" : "Pause campus slideshow"}
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
}
