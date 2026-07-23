import { ArrowRight } from "lucide-react";
import Image from "next/image";
import campusAerial from "../../../assets/images/hero1.webp";
import campusGarden from "../../../assets/images/hero2.webp";
import collegeReception from "../../../assets/images/hero3.webp";
import computerLab from "../../../assets/images/hero4.webp";

export default function AcademicPrograms() {
  return (
    <section id="academics" className="py-12 lg:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="mb-8 text-center sm:text-left">
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl lg:text-5xl text-black mb-4"
          >
            Academic Programs
          </h2>
          <p className="text-[15px] text-black/70 font-light max-w-3xl mx-auto sm:mx-0 leading-relaxed">
            Whether you&apos;re passionate about designing infrastructure, developing intelligent technologies, shaping sustainable cities, or leading complex construction projects, UESC offers industry-focused programs that combine academic excellence with practical experience to prepare you for tomorrow&apos;s challenges.
          </p>
        </div>

        {/* UNDERGRADUATE */}
        <div id="undergraduate" className="mb-6 scroll-mt-32">
          <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-3xl text-black border-b border-black/10 pb-3 mb-8">
            Undergraduate Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* CARD 1 */}
            <div className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                <Image fill sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw" quality={55} src={computerLab} alt="Students learning in the UESC computer laboratory" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">B.E. Computer Engineering</h3>
                  <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                    Build innovative software and hardware solutions while gaining practical experience in programming, systems design, networking, and emerging technologies. Prepare for careers in software development, AI, cybersecurity, and beyond.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="https://uesc.edu.np/computer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Computer Program <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                <Image fill sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw" quality={55} src={campusAerial} alt="Aerial view of the UESC campus and surrounding buildings" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">B.E. Civil Engineering</h3>
                  <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                    Develop the expertise to plan, design, and build the infrastructure that powers communities. Learn through practical projects, modern laboratories, and industry-oriented education.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="https://uesc.edu.np/civil" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Civil Program <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                <Image fill sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw" quality={55} src={campusGarden} alt="UESC academic buildings arranged around the campus garden" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">Bachelor of Architecture</h3>
                  <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                    Blend creativity, engineering, and sustainable design to create functional, inspiring spaces. Gain the skills needed for careers in architecture, urban planning, and design consultancy.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="https://uesc.edu.np/architecture" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Architecture Program <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRADUATE */}
        <div id="graduate" className="mt-16 scroll-mt-32">
          <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-3xl text-black border-b border-black/10 pb-3 mb-8">
            Graduate Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* CARD 4 */}
            <div className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                <Image fill sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw" quality={55} src={collegeReception} alt="Reception area at Universal Engineering and Science College" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">M.Sc. Construction Management</h3>
                  <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                    Advance your expertise in project planning, construction leadership, resource management, and modern construction practices for senior industry roles.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="https://uesc.edu.np/master_admission" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Construction M.Sc. <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="bg-[#f6f7f9] rounded-[32px] p-6 flex flex-col group border border-black/5 hover:bg-[#f0f2f5] transition-colors h-full">
              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-5 relative shadow-sm">
                <Image fill sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) 44vw, 28vw" quality={55} src={campusAerial} alt="Aerial perspective of the UESC campus and nearby road network" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-black mb-2">M.Sc. Transportation Engineering & Management</h3>
                  <p className="text-[14px] text-black/60 font-light leading-relaxed mb-4">
                    Specialize in the planning, design, and management of transportation systems that support smarter, safer, and more sustainable mobility.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="https://uesc.edu.np/master_admission" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-bold rounded-full group-hover:bg-red-600 transition-colors duration-300 shadow-md">
                    Transportation M.Sc. <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
