"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  FlaskConical,
  Building2,
  Trophy,
  GraduationCap,
} from "lucide-react";

const steps = [
  {
    stage: "Foundation",
    title: "Strong Academic Foundation",
    description:
      "Build the subject knowledge and study practices required by your chosen program. Each UESC program follows its own Pokhara University curriculum and schedule.",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    stage: "Applied Learning",
    title: "Laboratories & Technical Projects",
    description:
      "Move from theory into hands-on practice through laboratory work, technical exercises, and collaborative projects that strengthen core engineering skills.",
    icon: FlaskConical,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    stage: "Engagement",
    title: "Industry Exposure & Research",
    description:
      "Broaden your perspective through technical activities, workshops, and applied research initiatives, including opportunities connected with ICAS. Activities vary by program and academic year.",
    icon: Building2,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    stage: "Project Stage",
    title: "Capstone Project & Career Preparation",
    description:
      "Bring together your learning in a major project while developing the communication, teamwork, and professional preparation needed for employment or further study.",
    icon: Trophy,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    stage: "Next Step",
    title: "Ready for Industry, Higher Studies & Innovation",
    description:
      "Graduate with technical knowledge, teamwork experience, and a professional mindset that can support a career, postgraduate study, or further innovation.",
    icon: GraduationCap,
    color: "text-[#0A3073]",
    bg: "bg-blue-50",
  },
];

/** Each step gets 70vh of scrollable space; the sticky panel fills the rest */
const STEP_VH = 70;

export default function CareerDevelopment() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  /* ── Scroll listener: maps scroll-progress → active step ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let sectionTop = 0;
    let stepPx = 1;
    let animationFrame: number | null = null;
    let listenersActive = false;

    const measure = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      stepPx = section.offsetHeight / steps.length;
    };

    const onScroll = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const scrolledIn = window.scrollY - sectionTop;
        if (scrolledIn < 0) return;
        const idx = Math.min(
          Math.max(Math.floor(scrolledIn / stepPx), 0),
          steps.length - 1
        );
        setActiveIndex((current) => (current === idx ? current : idx));
      });
    };

    const activate = () => {
      if (listenersActive) return;
      listenersActive = true;
      measure();
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (listenersActive) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", measure);
      }
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative bg-[#fafafa]"
      style={{ height: `${steps.length * STEP_VH}vh` }}
    >
      {/* ── Sticky panel that locks while user scrolls through the section ── */}
      <div
        className="sticky top-[96px] flex h-[calc(100vh-96px)] items-stretch overflow-x-hidden overflow-y-auto overscroll-contain lg:overflow-hidden"
      >
        <div className="max-w-[1400px] w-full mx-auto px-8 sm:px-12 lg:px-16 flex gap-0 lg:gap-10 items-stretch py-10 lg:py-14">

          {/* ════════════════════════════════
              LEFT PANEL — nav + intro copy
          ════════════════════════════════ */}
          <div className="hidden lg:flex flex-col w-[320px] xl:w-[360px] shrink-0 justify-between">

            {/* Intro copy */}
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                  Career Development
                </span>
              </div>

              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl xl:text-4xl text-black leading-tight"
              >
                Preparing You for<br />
                Success Beyond<br />
                Graduation
              </h2>

              <p className="text-[13px] text-black/60 font-light leading-relaxed">
                Your journey at UESC extends far beyond the classroom. Through
                career guidance, practical learning, and industry engagement, we
                help students build the confidence and skills needed to thrive.
              </p>
            </div>

            {/* Step navigation list */}
            <div className="relative flex flex-col gap-0 mt-8">
              {/* Vertical track */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-black/8 rounded-full" />
              {/* Progress fill */}
              <div
                className="absolute left-[7px] top-2 w-[2px] bg-red-600 rounded-full transition-all duration-700 ease-in-out"
                style={{
                  height: `calc(${((activeIndex) / (steps.length - 1)) * 100}% )`,
                }}
              />

              {steps.map((s, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                return (
                  <button
                    key={s.stage}
                    onClick={() => setActiveIndex(i)}
                    className="group relative flex items-center gap-4 py-3.5 text-left"
                  >
                    {/* Dot */}
                    <span
                      className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-500 ${
                        isActive
                          ? "border-red-600 bg-red-600 scale-125"
                          : isPast
                          ? "border-red-600 bg-red-600"
                          : "border-black/20 bg-white"
                      }`}
                    />
                    {/* Label */}
                    <div className="flex flex-col">
                      <span
                        className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 ${
                          isActive ? "text-red-600" : "text-black/70"
                        }`}
                      >
                        {s.stage}
                      </span>
                      <span
                        className={`text-[13px] font-medium leading-snug transition-colors duration-300 ${
                          isActive ? "text-black" : "text-black/65 group-hover:text-black"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ════════════════════════════════
              VERTICAL DIVIDER
          ════════════════════════════════ */}
          <div className="hidden lg:block w-px bg-black/8 mx-2 xl:mx-6 self-stretch" />

          {/* ════════════════════════════════
              RIGHT PANEL — active step content
          ════════════════════════════════ */}
          <div className="relative flex w-full flex-1 items-start justify-center lg:items-center lg:justify-start">
            <div
              key={activeStep.stage}
              aria-live="polite"
              className="absolute w-full max-w-xl"
            >
              {/* Icon */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm lg:mb-8 lg:h-20 lg:w-20 lg:rounded-3xl ${activeStep.bg} mb-4`}
              >
                <ActiveIcon className={`h-7 w-7 lg:h-10 lg:w-10 ${activeStep.color}`} />
              </div>

              {/* Stage badge */}
              <div className="mb-2 inline-flex items-center gap-2 lg:mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                  {activeStep.stage}
                </span>
              </div>

              <h3
                style={{ fontFamily: "var(--font-serif)" }}
                className="mb-3 text-3xl leading-tight text-black lg:mb-6 lg:text-5xl"
              >
                {activeStep.title}
              </h3>

              <p className="mb-4 text-sm font-light leading-relaxed text-black/65 lg:mb-8 lg:text-[15px]">
                {activeStep.description}
              </p>

              <div className="flex items-center gap-3">
                {steps.map((step, dotIdx) => (
                  <button
                    key={step.stage}
                    onClick={() => setActiveIndex(dotIdx)}
                    className="flex h-7 min-w-7 items-center justify-center rounded-full"
                    aria-label={`Show ${step.stage.toLowerCase()} information`}
                    aria-current={dotIdx === activeIndex ? "step" : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 rounded-full transition-all duration-500 ${
                        dotIdx === activeIndex
                          ? "w-8 bg-red-600"
                          : "w-2 bg-black/25"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-[11px] font-medium tabular-nums text-black/70">
                  {activeIndex + 1} / {steps.length}
                </span>
              </div>

              {/* Mobile step nav (only on small screens) */}
              <div className="mt-4 flex flex-col gap-1 lg:hidden">
                {steps.map((s, btnIdx) => (
                  <button
                    key={s.stage}
                    onClick={() => setActiveIndex(btnIdx)}
                    className={`rounded-xl px-4 py-1.5 text-left text-xs font-medium transition-colors ${
                      btnIdx === activeIndex
                        ? "bg-red-50 text-red-700"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    {s.stage} — {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
