import Image from "next/image";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";

type AcademicProgramsProps = {
  content: SiteContent["academicPrograms"];
};

const ArrowRightIcon = getSiteIcon("arrow-right");

export default function AcademicPrograms({
  content,
}: AcademicProgramsProps) {
  if (!content.enabled) return null;

  return (
    <section id="academics" className="py-12 lg:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-8 text-center sm:text-left">
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl lg:text-5xl text-black mb-4"
          >
            {content.heading}
          </h2>
          <p className="text-[15px] text-black/70 font-light max-w-3xl mx-auto sm:mx-0 leading-relaxed">
            {content.description}
          </p>
        </div>

        {content.groups.map((group, groupIndex) => (
          <div
            key={group.id}
            id={group.anchorId}
            className={
              groupIndex === 0
                ? "mb-6 scroll-mt-32"
                : "mt-16 scroll-mt-32"
            }
          >
            <h3
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-3xl text-black border-b border-black/10 pb-3 mb-8"
            >
              {group.heading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {group.programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full"
                >
                  <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                    <Image
                      fill
                      sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw"
                      quality={55}
                      src={getSiteImage(program.image.key)}
                      alt={program.image.alt}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[17px] font-semibold text-black mb-2">
                        {program.title}
                      </h3>
                      <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                        {program.description}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <a
                        href={program.cta.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md"
                      >
                        {program.cta.label}
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
