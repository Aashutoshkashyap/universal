import Image from "next/image";
import campusGarden from "../../../assets/images/hero2.webp";
import collegeReception from "../../../assets/images/hero3.webp";
import computerLab from "../../../assets/images/hero4.webp";

export default function WhyChooseUESC() {
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
              Why Choose UESC
            </h2>
          </div>
          <div className="md:col-span-2 md:pl-[10%] flex flex-col items-start gap-6 pt-2">
            <p className="text-[15px] text-black/70 font-light leading-relaxed">
              At UESC, education extends beyond earning a degree. We combine rigorous academics with practical learning, research, and industry engagement to help students develop the knowledge, skills, and confidence needed to solve real-world challenges and build meaningful careers. Every experience is designed to prepare you for success—inside the classroom and beyond.
            </p>
            <a href="#academics" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-red-600 transition-colors duration-300 shadow-md">
              Explore Our Programs
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 group h-[320px] md:h-auto md:min-h-[300px]">
            <Image
              src={campusGarden}
              fill
              sizes="(max-width: 768px) calc(100vw - 64px), 32vw"
              quality={55}
              placeholder="blur"
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              alt="Garden and academic buildings at the UESC campus"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-white/70 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black/60"></div>
              </div>
              <span className="text-white text-[10px] font-medium">UESC Campus</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-white text-[16px] font-medium">Central Lalitpur Campus</span>
              <div aria-hidden="true" className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 group flex-1 min-h-[150px]">
              <Image
                src={computerLab}
                fill
                sizes="(max-width: 768px) calc(100vw - 64px), 32vw"
                quality={55}
                placeholder="blur"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt="Students working in the UESC computer laboratory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-white/70 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-black/60"></div>
                </div>
                <span className="text-white text-[10px] font-medium">Labs</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-white text-[16px] font-medium">Hands-on Learning</span>
                <div aria-hidden="true" className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 group flex-1 min-h-[150px]">
              <Image
                src={collegeReception}
                fill
                sizes="(max-width: 768px) calc(100vw - 64px), 32vw"
                quality={55}
                placeholder="blur"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                alt="Student services reception at UESC"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-white/70 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-black/60"></div>
                </div>
                <span className="text-white text-[10px] font-medium">Student Services</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-white text-[16px] font-medium">Welcoming Support</span>
                <div aria-hidden="true" className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "Research-Driven Learning", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
              { label: "Practical Engineering Experience", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { label: "Career-Focused Development", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
            ].map((item) => (
              <div
                key={item.label}
                className="flex-1 flex items-center justify-between bg-[#f6f7f9] hover:bg-white hover:shadow-sm transition-all rounded-2xl px-5 group border border-black/5 min-h-[90px]"
              >
                <span
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-[19px] lg:text-[21px] text-black font-normal leading-snug group-hover:text-blue-600 transition-colors pr-2"
                >
                  {item.label}
                </span>
                <div aria-hidden="true" className="w-12 h-12 rounded-full bg-white group-hover:bg-red-600 transition-all flex items-center justify-center shadow-sm flex-shrink-0 ml-1">
                  <div className="text-blue-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
