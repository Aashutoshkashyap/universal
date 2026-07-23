import Image from "next/image";
import { createElement } from "react";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type WhyChooseUESCProps = {
  content: SiteContent["whyChoose"];
};

type MediaCardContent = SiteContent["whyChoose"]["mediaCards"][number];

const ArrowRightIcon = getSiteIcon("arrow-right");

function MediaCard({
  card,
  primary,
}: {
  card: MediaCardContent;
  primary: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "relative rounded-2xl overflow-hidden bg-neutral-900 group h-[320px] md:h-auto md:min-h-[300px]"
          : "relative rounded-2xl overflow-hidden bg-neutral-900 group flex-1 min-h-[150px]"
      }
    >
      <Image
        src={getSiteImage(card.image.key)}
        fill
        sizes="(max-width: 768px) calc(100vw - 64px), 32vw"
        quality={55}
        placeholder="blur"
        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        alt={card.image.alt}
      />
      <div
        className={
          primary
            ? "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            : "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        }
      />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
        <div className="w-2.5 h-2.5 rounded-full bg-white/70 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-black/60"></div>
        </div>
        <span className="text-white text-[10px] font-medium">
          {card.eyebrow}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-[16px] font-medium">
          {card.title}
        </span>
        <div
          aria-hidden="true"
          className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-md"
        >
          <ArrowRightIcon className="w-5 h-5 -rotate-45 text-black group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUESC({ content }: WhyChooseUESCProps) {
  if (!content.enabled) return null;

  const [primaryCard, ...stackedCards] = content.mediaCards;

  return (
    <section id="features" className="py-12 lg:py-16 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-10">
          <div className="flex items-start gap-3">
            <span className="mt-3 w-2 h-2 rounded-full border-2 border-black flex-shrink-0"></span>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl lg:text-5xl text-black leading-tight"
            >
              {content.heading}
            </h2>
          </div>
          <div className="md:col-span-2 md:pl-[10%] flex flex-col items-start gap-6 pt-2">
            <p className="text-[15px] text-black/70 font-light leading-relaxed">
              {content.description}
            </p>
            <a
              href={content.cta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-red-600 transition-colors duration-300 shadow-md"
            >
              {content.cta.label}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          {primaryCard && <MediaCard card={primaryCard} primary />}

          <div className="flex flex-col gap-3">
            {stackedCards.map((card) => (
              <MediaCard key={card.id} card={card} primary={false} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {content.benefits.map((item) => (
                <div
                  key={item.id}
                  className="flex-1 flex items-center justify-between bg-[#f6f7f9] hover:bg-white hover:shadow-sm transition-all rounded-2xl px-5 group border border-black/5 min-h-[90px]"
                >
                  <span
                    style={{ fontFamily: "var(--font-serif)" }}
                    className="text-[19px] lg:text-[21px] text-black font-normal leading-snug group-hover:text-blue-600 transition-colors pr-2"
                  >
                    {item.label}
                  </span>
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-sm flex-shrink-0 ml-1"
                  >
                    {createElement(getSiteIcon(item.iconKey), {
                      className:
                        "w-5 h-5 text-blue-600 group-hover:text-white transition-colors",
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
