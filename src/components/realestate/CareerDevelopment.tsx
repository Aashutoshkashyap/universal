"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { getSiteIcon } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type CareerDevelopmentContent = SiteContent["careerDevelopment"];
type CareerTone = CareerDevelopmentContent["steps"][number]["tone"];

const toneClasses: Record<CareerTone, { color: string; bg: string }> = {
  blue: { color: "text-blue-600", bg: "bg-blue-50" },
  emerald: { color: "text-emerald-600", bg: "bg-emerald-50" },
  orange: { color: "text-orange-600", bg: "bg-orange-50" },
  red: { color: "text-red-600", bg: "bg-red-50" },
  navy: { color: "text-[#0A3073]", bg: "bg-blue-50" },
};

/** Each step gets 70vh of scrollable space; the sticky panel fills the rest */
const STEP_VH = 70;

function getScrollGeometry(
  section: HTMLElement,
  stickyPanel: HTMLElement,
) {
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const stickyTop =
    Number.parseFloat(window.getComputedStyle(stickyPanel).top) || 0;

  return {
    scrollStart: sectionTop - stickyTop,
    stickyTravel: Math.max(
      section.offsetHeight - stickyPanel.offsetHeight,
      1,
    ),
  };
}

export default function CareerDevelopment({
  content,
}: {
  content: CareerDevelopmentContent;
}) {
  const steps = content.steps;
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const activeStep = steps[activeIndex];
  const ActiveIcon = getSiteIcon(activeStep.iconKey);
  const activeTone = toneClasses[activeStep.tone];

  /* ── Scroll listener: maps scroll-progress → active step ── */
  useEffect(() => {
    const section = sectionRef.current;
    const stickyPanel = stickyPanelRef.current;
    if (!section || !stickyPanel) return;

    let scrollStart = 0;
    let stickyTravel = 1;
    let animationFrame: number | null = null;
    let listenersActive = false;

    const measure = () => {
      ({ scrollStart, stickyTravel } = getScrollGeometry(
        section,
        stickyPanel,
      ));
    };

    const onScroll = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const scrolledIn = window.scrollY - scrollStart;
        if (scrolledIn < 0) return;
        const progress = Math.min(Math.max(scrolledIn / stickyTravel, 0), 1);
        const idx = Math.min(
          Math.floor(progress * steps.length),
          steps.length - 1,
        );
        setActiveIndex((current) => (current === idx ? current : idx));
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    const activate = () => {
      if (listenersActive) return;
      listenersActive = true;
      measure();
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
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
        window.removeEventListener("resize", onResize);
      }
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [steps.length]);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    const stickyPanel = stickyPanelRef.current;
    if (!section || !stickyPanel) return;

    const { scrollStart, stickyTravel } = getScrollGeometry(
      section,
      stickyPanel,
    );
    const stepCenter = (index + 0.5) / steps.length;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setActiveIndex(index);
    window.scrollTo({
      top: scrollStart + stickyTravel * stepCenter,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!content.enabled) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative bg-[#fafafa]"
      style={{ height: `${steps.length * STEP_VH}vh` }}
    >
      {/* ── Sticky panel that locks while user scrolls through the section ── */}
      <div
        ref={stickyPanelRef}
        className="sticky top-[96px] flex h-[calc(100vh-96px)] items-stretch overflow-hidden"
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-stretch gap-0 px-8 py-10 sm:px-12 lg:gap-10 lg:px-16 lg:py-14">

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
                  {content.eyebrow}
                </span>
              </div>

              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl xl:text-4xl text-black leading-tight"
              >
                {content.heading.split("\n").map((line, index) => (
                  <Fragment key={`${line}-${index}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </h2>

              <p className="text-[13px] text-black/60 font-light leading-relaxed">
                {content.description}
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
                  height: `calc(${(activeIndex / Math.max(steps.length - 1, 1)) * 100}% )`,
                }}
              />

              {steps.map((s, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToStep(i)}
                    aria-current={isActive ? "step" : undefined}
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
              key={activeStep.id}
              aria-live="polite"
              className="absolute w-full max-w-xl"
            >
              {/* Icon */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm lg:mb-8 lg:h-20 lg:w-20 lg:rounded-3xl ${activeTone.bg} mb-4 [@media(max-height:500px)]:mb-2 [@media(max-height:500px)]:h-10 [@media(max-height:500px)]:w-10`}
              >
                <ActiveIcon className={`h-7 w-7 lg:h-10 lg:w-10 ${activeTone.color} [@media(max-height:500px)]:h-5 [@media(max-height:500px)]:w-5`} />
              </div>

              {/* Stage badge */}
              <div className="mb-2 inline-flex items-center gap-2 lg:mb-4 [@media(max-height:500px)]:mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                  {activeStep.stage}
                </span>
              </div>

              <h3
                style={{ fontFamily: "var(--font-serif)" }}
                className="mb-3 text-3xl leading-tight text-black lg:mb-6 lg:text-5xl [@media(max-height:500px)]:mb-2 [@media(max-height:500px)]:text-2xl"
              >
                {activeStep.title}
              </h3>

              <p className="mb-4 text-sm font-light leading-relaxed text-black/65 lg:mb-8 lg:text-[15px] [@media(max-height:500px)]:mb-2 [@media(max-height:500px)]:text-xs [@media(max-height:500px)]:leading-normal">
                {activeStep.description}
              </p>

              <div className="flex items-center gap-3">
                {steps.map((step, dotIdx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToStep(dotIdx)}
                    className="flex h-7 min-w-7 items-center justify-center rounded-full"
                    aria-label={content.stepButtonAriaLabelTemplate.replaceAll(
                      "{stage}",
                      step.stage,
                    )}
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
              <div className="mt-2 flex flex-col gap-0.5 lg:hidden [@media(max-height:700px)]:hidden">
                {steps.map((s, btnIdx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToStep(btnIdx)}
                    aria-current={btnIdx === activeIndex ? "step" : undefined}
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
