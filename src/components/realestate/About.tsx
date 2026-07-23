import Image from "next/image";
import { createElement } from "react";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type AboutProps = {
  content: SiteContent["about"];
};

const imageSlots = [
  {
    className:
      "absolute top-0 left-0 w-[50%] h-[45%] shadow-xl overflow-hidden",
    borderRadius: "40px 0px 40px 40px",
  },
  {
    className:
      "absolute top-[55%] left-0 w-[50%] h-[45%] shadow-xl overflow-hidden",
    borderRadius: "40px 0px 40px 40px",
  },
  {
    className:
      "absolute top-[12%] right-[-2%] w-[50%] h-[50%] shadow-xl overflow-hidden",
    borderRadius: "40px",
  },
] as const;

const ArrowRightIcon = getSiteIcon("arrow-right");
const SparklesIcon = getSiteIcon("sparkles");

export default function About({ content }: AboutProps) {
  if (!content.enabled) return null;

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
                <span>{content.eyebrow}</span>
              </div>

              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-[40px] sm:text-[50px] lg:text-[54px] leading-[1.1] text-black font-semibold"
              >
                {content.heading}
              </h2>
              <p className="text-base text-black/60 font-light leading-relaxed max-w-xl">
                {content.description}
              </p>
            </div>

            {/* CTA Buttons row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={content.primaryCta.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-red-600 text-white text-[12px] uppercase tracking-widest font-semibold transition-all shadow-md group"
              >
                <span>{content.primaryCta.label}</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-600 text-blue-600 text-[12px] uppercase tracking-widest font-semibold hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
              >
                {content.secondaryCta.label}
              </a>
            </div>

            {/* Stats row with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/10">
              {content.stats.map((stat, index) => {
                const compactValue = index === 2;

                return (
                  <div key={stat.id} className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                      {createElement(getSiteIcon(stat.iconKey), {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <div>
                      <div
                        style={
                          compactValue
                            ? undefined
                            : { fontFamily: "var(--font-serif)" }
                        }
                        className={
                          compactValue
                            ? "text-sm font-bold text-black leading-tight"
                            : "text-3xl font-bold text-black"
                        }
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-black/60 font-medium">
                        {stat.label}
                      </div>
                      {stat.secondaryLabel && (
                        <div className="text-xs text-black/60 font-medium">
                          {stat.secondaryLabel}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Bento photo grid ── */}
          <div className="relative h-[500px] lg:h-[640px] w-full mt-10 lg:mt-0">
            {content.images.slice(0, imageSlots.length).map((item, index) => {
              const slot = imageSlots[index];

              return (
                <div
                  key={item.id}
                  className={slot.className}
                  style={{ borderRadius: slot.borderRadius }}
                >
                  <Image
                    src={getSiteImage(item.image.key)}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 1024px) 46vw, 22vw"
                    quality={55}
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              );
            })}

            {/* ── OVERLAPPING "CUTOUT" ELEMENTS ── */}
            <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center z-20 box-content border-[12px] border-white">
              <ArrowRightIcon className="w-6 h-6 text-blue-600 rotate-45" />
            </div>

            <div className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-blue-500  flex items-center justify-center z-20 box-content border-[12px] border-white px-5 py-2.5 rounded-[40px]">
              <div className="flex -space-x-3 opacity-90">
                {[1, 2, 3].map((placeholder) => (
                  <div key={placeholder} className="w-8 h-8 rounded-full border-1  bg-blue-500/50" />
                ))}
              </div>
            </div>

            <div className="absolute top-[14%] right-[-1%] translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-300 rounded-full z-20 box-content border-[10px] border-white" />

            <div className="absolute top-[10%] left-[-10%] -translate-y-1/2 z-10">
              <SparklesIcon className="w-8 h-8 text-[#87a982]" fill="currentColor" />
            </div>

            <div className="absolute bottom-[10%] right-[24%] z-10">
              <SparklesIcon className="w-6 h-6 text-[#87a982]" fill="currentColor" />
            </div>

            <div className="absolute bottom-[2%] right-[10%] w-4 h-4 rounded-full bg-blue-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
