import Image from "next/image";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type NewsAndEventsContent = SiteContent["newsAndEvents"];

const ArrowRight = getSiteIcon("arrow-right");

export default function NewsAndEvents({
  content,
}: {
  content: NewsAndEventsContent;
}) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section id="news" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
              {content.eyebrow}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-end justify-between w-full gap-6">
            <div className="max-w-2xl text-center sm:text-left">
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-4xl lg:text-5xl text-black leading-tight mb-4"
              >
                {content.heading}
              </h2>
              <p className="text-[15px] text-black/70 font-light leading-relaxed">
                {content.description}
              </p>
            </div>
            <a
              href={content.allNoticesCta.href}
              className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group flex-shrink-0"
            >
              <span>{content.allNoticesCta.label}</span>
              <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {content.cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-lg transition-shadow group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={getSiteImage(card.image.key)}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 64px), (max-width: 1280px) 44vw, 22vw"
                  quality={55}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-2xl text-black mb-3 leading-snug"
                >
                  {card.title}
                </h3>
                <p className="text-[13px] text-black/70 font-light leading-relaxed flex-1">
                  {card.description}
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-black group-hover:text-red-600 transition-colors">
                  {card.ctaLabel}
                </span>
                <span
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-black/5 text-black flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href={content.allNoticesCta.href}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group"
          >
            <span>{content.allNoticesCta.label}</span>
            <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
