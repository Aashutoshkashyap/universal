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
    year: "Year 1",
    title: "Strong Academic Foundation",
    description:
      "Build a solid grounding in mathematics, physics, and core engineering principles. First-year students engage in foundational coursework, study-skills workshops, and introductory labs that establish the bedrock for all future specialisation.",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    year: "Year 2",
    title: "Laboratories & Technical Projects",
    description:
      "Transition from theory to hands-on practice. Year 2 students work in state-of-the-art labs, tackle real engineering challenges in group projects, and develop the technical proficiency demanded by today's industry.",
    icon: FlaskConical,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    year: "Year 3",
    title: "Industry Exposure & Research",
    description:
      "Step outside the campus and into the real world. Students participate in industry visits, internship programmes, and research initiatives through ICAS — gaining first-hand insight into professional environments and cutting-edge innovation.",
    icon: Building2,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    year: "Final Year",
    title: "Capstone Project & Career Preparation",
    description:
      "Synthesise four years of learning into a major capstone project that solves a real engineering problem. Alongside, students attend career fairs, mock interviews, and placement drives to launch their professional journeys with confidence.",
    icon: Trophy,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    year: "Graduate",
    title: "Ready for Industry, Higher Studies & Innovation",
    description:
      "UESC graduates enter the world equipped with technical expertise, soft skills, and an innovative mindset. Whether you choose a corporate career, pursue postgraduate study, or launch a startup — you leave prepared to make a difference.",
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

  /* ── Scroll listener: maps scroll-progress → active step ── */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolledIn = -rect.top; // px scrolled past section top
      if (scrolledIn < 0) return;
      const stepPx = (section.offsetHeight / steps.length);
      const idx = Math.min(
        Math.max(Math.floor(scrolledIn / stepPx), 0),
        steps.length - 1
      );
      if (idx !== activeIndex) {
        setActiveIndex(idx);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="career"
      className="relative bg-[#fafafa]"
      style={{ height: `${steps.length * STEP_VH}vh` }}
    >
      {/* ── Sticky panel that locks while user scrolls through the section ── */}
      <div
        className="sticky top-[96px] h-[calc(100vh-96px)] flex items-stretch overflow-hidden"
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
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
                    key={s.year}
                    onClick={() => setActiveIndex(i)}
                    className="relative flex items-center gap-4 py-3.5 text-left group focus:outline-none"
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
                          isActive ? "text-red-600" : isPast ? "text-black/50" : "text-black/30"
                        }`}
                      >
                        {s.year}
                      </span>
                      <span
                        className={`text-[13px] font-medium leading-snug transition-colors duration-300 ${
                          isActive ? "text-black" : "text-black/45 group-hover:text-black/70"
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
          <div className="flex-1 relative flex items-center justify-center lg:justify-start w-full">
            {steps.map((Step, i) => {
              const ActiveIcon = Step.icon;
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <div
                  key={Step.year}
                  className={`absolute w-full max-w-xl transition-all duration-700 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                      : isPast
                      ? "opacity-0 -translate-y-12 pointer-events-none z-0"
                      : "opacity-0 translate-y-12 pointer-events-none z-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-3xl ${Step.bg} flex items-center justify-center mb-8 shadow-sm`}
                  >
                    <ActiveIcon className={`w-10 h-10 ${Step.color}`} />
                  </div>

                  {/* Year badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                      {Step.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-4xl lg:text-5xl text-black leading-tight mb-6"
                  >
                    {Step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-black/65 font-light leading-relaxed mb-8">
                    {Step.description}
                  </p>

                  {/* Step counter pill */}
                  <div className="flex items-center gap-3">
                    {steps.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveIndex(dotIdx)}
                        className={`rounded-full transition-all duration-500 focus:outline-none ${
                          dotIdx === activeIndex
                            ? "w-8 h-2 bg-red-600"
                            : "w-2 h-2 bg-black/15 hover:bg-black/30"
                        }`}
                        aria-label={`Go to step ${dotIdx + 1}`}
                      />
                    ))}
                    <span className="ml-2 text-[11px] text-black/35 font-medium tabular-nums">
                      {activeIndex + 1} / {steps.length}
                    </span>
                  </div>

                  {/* Mobile step nav (only on small screens) */}
                  <div className="lg:hidden mt-8 flex flex-col gap-2">
                    {steps.map((s, btnIdx) => (
                      <button
                        key={s.year}
                        onClick={() => setActiveIndex(btnIdx)}
                        className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          btnIdx === activeIndex
                            ? "bg-red-50 text-red-600"
                            : "text-black/50 hover:text-black"
                        }`}
                      >
                        {s.year} — {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
