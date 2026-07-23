import { ArrowRight, Download, BookOpen, Wrench, Award, Lightbulb } from "lucide-react";
import HeroCarousel from "./HeroCarousel";

const FEATURES = [
  { icon: <BookOpen className="w-6 h-6 text-red-600" />, label: "Research-Driven Learning" },
  { icon: <Wrench className="w-6 h-6 text-red-600" />, label: "Hands-on Engineering" },
  { icon: <Award className="w-6 h-6 text-red-600" />, label: "Industry-Ready Skills" },
  { icon: <Lightbulb className="w-6 h-6 text-red-600" />, label: "Innovation & Student Communities" },
];

export default function Hero() {
  return (
    <section className="relative flex h-[900px] w-full flex-col overflow-visible sm:h-[88vh] sm:min-h-[780px]">
      <HeroCarousel />

      {/* Simple dark overlay for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

      {/* ── Hero Text ── */}
      <div className="relative z-20 flex flex-1 flex-col justify-center px-6 pb-44 pt-24 sm:px-14 sm:pb-36 sm:pt-20 lg:px-28 lg:pb-4">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <h1
            style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', serif" }}
            className="text-[36px] font-semibold leading-[1.06] text-white drop-shadow-md min-[380px]:text-[40px] sm:text-[52px] lg:text-[68px]"
          >
            Where Future Engineers, Innovators, and Leaders Begin Their Journey.
          </h1>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-white/90 sm:text-lg">
            Build a strong foundation through academic excellence, practical learning, research, and industry collaboration—preparing you for a future of innovation, leadership, and lifelong success.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4 sm:pt-3">
            <a
              href="https://uesc.edu.np/apply"
              className="group inline-flex items-center gap-4 rounded-full bg-blue-600 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:bg-red-600 sm:px-9 sm:py-4 sm:text-[13px]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://uesc.edu.np/download"
              className="group inline-flex items-center gap-3.5 rounded-full border border-white/30 bg-blue-600/30 px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md transition-all hover:border-red-500/50 hover:bg-red-600/90 sm:px-7 sm:py-4 sm:text-[13px]"
            >
              <Download className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Download Prospectus</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Feature Box: anchored at hero bottom, bleeds 50% into About section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 translate-y-1/2 px-4 sm:px-10 lg:px-16">
        <div className="ml-0 lg:ml-[28%] bg-white text-black rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-black/8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            {FEATURES.map(({ icon: rawIcon, label }, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-4 sm:gap-5 sm:px-7 sm:py-8 lg:py-10">
                <div className="flex h-11 w-11 flex-none shrink-0 items-center justify-center rounded-full bg-black/6 sm:h-14 sm:w-14">
                  <span className="scale-125">{rawIcon}</span>
                </div>
                <span className="text-[13px] font-medium leading-snug text-black/80 sm:text-[15px] lg:text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
