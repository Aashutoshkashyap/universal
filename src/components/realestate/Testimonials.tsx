import Image, { type StaticImageData } from "next/image";
import campusGarden from "../../../assets/images/hero2.webp";
import computerLab from "../../../assets/images/hero4.webp";

type Experience = {
  code: string;
  title: string;
  label: string;
  description: string;
  tone: "blue" | "emerald" | "orange" | "red" | "indigo" | "purple" | "teal";
};

const experiences: Experience[] = [
  {
    code: "CE",
    title: "Computer Engineering",
    label: "Hardware and software",
    description:
      "Build foundations in programming, systems, networks, and computer hardware through technical study and practical learning.",
    tone: "blue",
  },
  {
    code: "PG",
    title: "Graduate Study",
    label: "Advanced specialization",
    description:
      "Deepen professional knowledge through construction-management and transportation-engineering pathways presented by UESC.",
    tone: "emerald",
  },
  {
    code: "CV",
    title: "Civil Engineering",
    label: "Infrastructure and fieldwork",
    description:
      "Connect engineering theory with structures, materials, surveying, construction management, and practical project work.",
    tone: "orange",
  },
  {
    code: "CD",
    title: "Career Development",
    label: "Professional preparation",
    description:
      "Strengthen communication, teamwork, and problem-solving alongside the technical skills expected in engineering practice.",
    tone: "red",
  },
  {
    code: "FY",
    title: "Project-Based Learning",
    label: "From concept to application",
    description:
      "Apply classroom learning through design work, laboratories, technical activities, and collaborative projects.",
    tone: "indigo",
  },
  {
    code: "AR",
    title: "Architecture",
    label: "Creative and technical design",
    description:
      "Explore functional, sustainable design by bringing together architecture, engineering, art, and planning.",
    tone: "purple",
  },
  {
    code: "SC",
    title: "Student Communities",
    label: "Leadership and collaboration",
    description:
      "Grow beyond the classroom through clubs, technical events, collaborative activities, and student-led learning.",
    tone: "teal",
  },
];

const toneClasses = {
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
  image,
  alt,
  eyebrow,
  children,
  height,
}: {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  children: React.ReactNode;
  height: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${height} bg-neutral-900 group`}>
      <Image
        src={image}
        alt={alt}
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
            <span className="text-white text-[10px] font-bold">U</span>
          </div>
          <span className="text-white text-[10px] font-medium tracking-wider uppercase">{eyebrow}</span>
        </div>
        <p className="text-white font-semibold text-lg leading-snug font-serif">{children}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
              Student Experience
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl lg:text-5xl text-black leading-tight max-w-2xl"
          >
            Learn. Build. Collaborate.<br className="hidden sm:block" /> Grow.
          </h2>
          <p className="text-[15px] text-black/70 font-light leading-relaxed max-w-3xl mx-auto sm:mx-0">
            UESC presents an academic experience shaped by practical learning, research, technical activities, and professional preparation. Confirm current facilities and opportunities directly with the college when you apply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-6">
            <PhotoCard
              image={campusGarden}
              alt="UESC campus garden and academic buildings"
              eyebrow="UESC Campus"
              height="h-[320px]"
            >
              Building the future of<br />engineering in Nepal.
            </PhotoCard>
            <ExperienceCard experience={experiences[0]} />
            <ExperienceCard experience={experiences[1]} />
          </div>

          <div className="flex flex-col gap-6 md:pt-10">
            <ExperienceCard experience={experiences[2]} />
            <ExperienceCard experience={experiences[3]} />
            <ExperienceCard experience={experiences[4]} />
          </div>

          <div className="flex flex-col gap-6 md:pt-4">
            <ExperienceCard experience={experiences[5]} />
            <PhotoCard
              image={computerLab}
              alt="UESC students working together in a computer laboratory"
              eyebrow="Hands-on Learning"
              height="h-[280px]"
            >
              Turning ideas into<br />real-world impact.
            </PhotoCard>
            <ExperienceCard experience={experiences[6]} />
          </div>
        </div>
      </div>
    </section>
  );
}
