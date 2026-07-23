import { Fragment } from "react";
import { getSiteIcon } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type FAQContent = SiteContent["faq"];

const ArrowRight = getSiteIcon("arrow-right");

export default function FAQ({ content }: { content: FAQContent }) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Header - Left Column on Desktop */}
        <div className="lg:sticky lg:top-24 lg:w-1/3">
          <div className="mb-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                {content.eyebrow}
              </span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl lg:text-5xl text-black leading-tight"
            >
              {content.heading.split("\n").map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </h2>
            <p className="text-[15px] text-black/60 font-light leading-relaxed mt-2">
              {content.description}
            </p>
          </div>
        </div>

        {/* Accordion - Right Column on Desktop */}
        <div className="lg:w-2/3 w-full border-t border-black/10">
          {content.items.map((faq, idx) => (
            <details
              key={faq.id}
              name="uesc-faq"
              open={idx === 0}
              className="group border-b border-black/10"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between py-6 text-left [&::-webkit-details-marker]:hidden">
                <h3
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-2xl sm:text-[26px] text-black pr-8 group-hover:text-red-600 transition-colors"
                >
                  {faq.question}
                </h3>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-black transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-open:rotate-90 group-open:bg-red-600 group-open:text-white">
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </summary>
              
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:pb-8 group-open:opacity-100">
                <div className="overflow-hidden">
                <p className="text-[15px] text-black/65 font-light leading-relaxed pr-12">
                  {faq.answer}
                </p>
                </div>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
