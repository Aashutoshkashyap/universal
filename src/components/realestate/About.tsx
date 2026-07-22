import { ArrowRight, Award, GraduationCap, Rocket, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="pt-40 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Badge + Heading + Text + CTAs + Stats ── */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>ABOUT UESC</span>
              </div>

              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-[40px] sm:text-[50px] lg:text-[54px] leading-[1.1] text-black font-semibold"
              >
                Shaping Engineers. Inspiring Innovation. Building Futures.
              </h2>
              <p className="text-base text-black/60 font-light leading-relaxed max-w-xl">
                Established in 2000, Universal Engineering & Science College (UESC) has been preparing future engineers through quality education, research-driven learning, and practical experiences. Located in the heart of Lalitpur, UESC combines academic excellence with modern facilities, industry engagement, and an innovation-focused environment to help students build successful careers while contributing to Nepal's development.
              </p>
            </div>

            {/* CTA Buttons row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-red-600 text-white text-[12px] uppercase tracking-widest font-semibold transition-all shadow-md group"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#campus"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-600 text-blue-600 text-[12px] uppercase tracking-widest font-semibold hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
              >
                Explore Campus Life
              </a>
            </div>

            {/* Stats row with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-bold text-black">25+</div>
                  <div className="text-xs text-black/60 font-medium">Years of Excellence</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-bold text-black">5+</div>
                  <div className="text-xs text-black/60 font-medium">Academic Programs</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black leading-tight">Research-Driven</div>
                  <div className="text-xs text-black/60 font-medium">Education</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Bento photo grid ── */}
          <div className="relative h-[500px] lg:h-[640px] w-full mt-10 lg:mt-0">

            {/* Card 1 — Top Left */}
            <div
              className="absolute top-0 left-0 w-[50%] h-[45%] shadow-xl overflow-hidden"
              style={{ borderRadius: "40px 0px 40px 40px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Luxury villa exterior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 3 — Bottom Left */}
            <div
              className="absolute top-[55%] left-0 w-[50%] h-[45%] shadow-xl overflow-hidden"
              style={{ borderRadius: "40px 0px 40px 40px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                alt="Villa with sea view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 2 — Right */}
            {/* Starts 25% down, ends 15% higher than Card 3 bottom */}
            <div
              className="absolute top-[12%] right-[-2%] w-[50%] h-[50%] shadow-xl overflow-hidden"
              style={{ borderRadius: "40px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Villa pool view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* ── OVERLAPPING "CUTOUT" ELEMENTS ── */}

            {/* Arrow Icon — Carves into Card 1 Top-Right */}
            <div
              className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center z-20 box-content border-[12px] border-white"
            >
              <ArrowRight className="w-6 h-6 text-blue-600 rotate-45" />
            </div>

            {/* Badge — Carves into Card 3 Top-Right & Card 2 Left Edge */}
            <div
              className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-blue-500  flex items-center justify-center z-20 box-content border-[12px] border-white px-5 py-2.5 rounded-[40px]"
            >
              <div className="flex -space-x-3 opacity-90">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-1  bg-blue-500/50" />
                ))}
              </div>
            </div>

            {/* Top Right Dot — Carves into Card 2 Top-Right */}
            <div
              className="absolute top-[14%] right-[-1%] translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-300 rounded-full z-20 box-content border-[10px] border-white"
            />

            {/* ── DECORATIVE STARS & DOTS ── */}

            {/* Star in vertical gap between Card 1 and Card 3 */}
            <div className="absolute top-[10%] left-[-10%] -translate-y-1/2 z-10">
              <Sparkles className="w-8 h-8 text-[#87a982]" fill="currentColor" />
            </div>

            {/* Bottom right star */}
            <div className="absolute bottom-[10%] right-[24%] z-10">
              <Sparkles className="w-6 h-6 text-[#87a982]" fill="currentColor" />
            </div>

            {/* Bottom right dot */}
            <div className="absolute bottom-[2%] right-[10%] w-4 h-4 rounded-full bg-blue-300" />

          </div>
        </div>
      </div>
    </section>
  );
}
