import { Fragment } from "react";
import Image from "next/image";
import { getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type TestimonialsContent = SiteContent["testimonials"];
type TestimonialCard = TestimonialsContent["columns"][number]["cards"][number];
type Experience = Extract<TestimonialCard, { kind: "experience" }>;
type Photo = Extract<TestimonialCard, { kind: "photo" }>;

const toneClasses: Record<Experience["tone"], string> = {
  blue: "bg-blue-50 border-blue-100 text-blue-700",
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
  orange: "bg-orange-50 border-orange-100 text-orange-700",
  red: "bg-red-50 border-red-100 text-red-700",
  indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
  purple: "bg-purple-50 border-purple-100 text-purple-700",
  teal: "bg-teal-50 border-teal-100 text-teal-700",
};

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
        {experience.description}
      </p>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={`w-11 h-11 rounded-full border flex items-center justify-center font-bold text-sm flex-shrink-0 ${toneClasses[experience.tone]}`}
        >
          {experience.code}
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-black">{experience.title}</h3>
          <p className="text-[11px] text-black/65 mt-0.5">{experience.label}</p>
        </div>
      </div>
    </article>
  );
}

function PhotoCard({
  photo,
  height,
}: {
  photo: Photo;
  height: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${height} bg-neutral-900 group`}>
      <Image
        src={getSiteImage(photo.image.key)}
        alt={photo.image.alt}
        fill
        sizes="(max-width: 768px) calc(100vw - 64px), 32vw"
        quality={55}
        placeholder="blur"
        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center gap-2 mb-2">
          <div aria-hidden="true" className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">
              {photo.eyebrow.charAt(0)}
            </span>
          </div>
          <span className="text-white text-[10px] font-medium tracking-wider uppercase">{photo.eyebrow}</span>
        </div>
        <p className="text-white font-semibold text-lg leading-snug font-serif">
          {photo.statement.split("\n").map((line, index) => (
            <Fragment key={`${line}-${index}`}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials({
  content,
}: {
  content: TestimonialsContent;
}) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
              {content.eyebrow}
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl lg:text-5xl text-black leading-tight max-w-2xl"
          >
            {content.heading.split("\n").map((line, index) => (
              <Fragment key={`${line}-${index}`}>
                {index > 0 ? (
                  <>
                    <br className="hidden sm:block" />{" "}
                  </>
                ) : null}
                {line}
              </Fragment>
            ))}
          </h2>
          <p className="text-[15px] text-black/70 font-light leading-relaxed max-w-3xl mx-auto sm:mx-0">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {content.columns.map((column, columnIndex) => (
            <div
              key={column.id}
              className={
                columnIndex === 1
                  ? "flex flex-col gap-6 md:pt-10"
                  : columnIndex === 2
                    ? "flex flex-col gap-6 md:pt-4"
                    : "flex flex-col gap-6"
              }
            >
              {column.cards.map((card) =>
                card.kind === "experience" ? (
                  <ExperienceCard key={card.id} experience={card} />
                ) : (
                  <PhotoCard
                    key={card.id}
                    photo={card}
                    height={columnIndex === 0 ? "h-[320px]" : "h-[280px]"}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
