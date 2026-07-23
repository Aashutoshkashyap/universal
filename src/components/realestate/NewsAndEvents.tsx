import Image from "next/image";
import { ArrowRight } from "lucide-react";
import campusAerial from "../../../assets/images/hero1.webp";
import campusGarden from "../../../assets/images/hero2.webp";
import collegeReception from "../../../assets/images/hero3.webp";
import computerLab from "../../../assets/images/hero4.webp";

const cards = [
  {
    title: "Latest Notices",
    description:
      "Read the latest official announcements, results, schedules, and campus updates published by UESC.",
    cta: "View Notices",
    href: "https://uesc.edu.np/notice",
    image: campusGarden,
    alt: "Garden and academic buildings at the UESC campus",
  },
  {
    title: "Admissions",
    description:
      "Explore the official application form and contact the admissions team to confirm programs, eligibility, fees, and current deadlines.",
    cta: "Admission Details",
    href: "https://uesc.edu.np/apply",
    image: collegeReception,
    alt: "Reception area where prospective UESC students can seek admission guidance",
  },
  {
    title: "Research & ICAS",
    description:
      "Discover UESC's research, training, consulting, workshops, and applied-science activities through ICAS.",
    cta: "Explore ICAS",
    href: "https://uesc.edu.np/icas",
    image: computerLab,
    alt: "UESC students collaborating in the computer laboratory",
  },
  {
    title: "Academic Downloads",
    description:
      "Find program documents, syllabi, academic resources, and other official downloads in one place.",
    cta: "View Downloads",
    href: "https://uesc.edu.np/download",
    image: campusAerial,
    alt: "Aerial view of the UESC campus in Chakupat, Lalitpur",
  },
];

export default function NewsAndEvents() {
  return (
    <section id="news" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
              News &amp; Resources
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-end justify-between w-full gap-6">
            <div className="max-w-2xl text-center sm:text-left">
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-4xl lg:text-5xl text-black leading-tight mb-4"
              >
                Stay Connected with What&apos;s Happening at UESC
              </h2>
              <p className="text-[15px] text-black/70 font-light leading-relaxed">
                Follow official notices, admissions information, research activities, and academic resources from the UESC community.
              </p>
            </div>
            <a
              href="https://uesc.edu.np/notice"
              className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group flex-shrink-0"
            >
              <span>All Notices</span>
              <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-lg transition-shadow group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={card.image}
                  alt={card.alt}
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
                  {card.cta}
                </span>
                <span
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-black/5 text-black flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href="https://uesc.edu.np/notice"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group"
          >
            <span>All Notices</span>
            <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
