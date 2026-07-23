export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">

        {/* Heading */}
        <div className="mb-14 text-center sm:text-left flex flex-col items-center sm:items-start gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
              Student Voices
            </span>
          </div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl lg:text-5xl text-black leading-tight max-w-2xl"
          >
            Stories That Inspire.<br className="hidden sm:block" /> Experiences That Matter.
          </h2>
          <p className="text-[15px] text-black/65 font-light leading-relaxed max-w-3xl mx-auto sm:mx-0">
            Every student's journey at UESC is unique, but they share a common goal—to learn, grow, and create meaningful impact. From practical learning and research to leadership, innovation, and lifelong friendships, these experiences reflect what it means to be part of the UESC community.
          </p>
        </div>

        {/* Bento Masonry Grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Large Portrait Photo Card */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] bg-neutral-900 group">
              <img
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
                alt="Student Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">U</span>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium tracking-wider uppercase">UESC Campus</span>
                </div>
                <p className="text-white font-semibold text-lg leading-snug font-serif">Building the future of<br />engineering in Nepal.</p>
              </div>
            </div>

            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-blue-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                The practical sessions and collaborative projects gave me the confidence to apply classroom concepts to real-world problems. I graduated with both technical skills and valuable teamwork experience.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                  CE
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">Computer Engineering Student</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-emerald-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                Research opportunities and faculty guidance allowed me to deepen my expertise and approach complex engineering problems with confidence.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm flex-shrink-0">
                  PG
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">M.Sc. Student</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── MIDDLE COLUMN ── */}
          <div className="flex flex-col gap-6 md:pt-10">

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-orange-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                Field visits and laboratory work made learning far more engaging. The hands-on approach helped me understand engineering beyond theory.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm flex-shrink-0">
                  CV
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">Civil Engineering Student</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-red-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                My time at UESC prepared me for the transition from university to industry. The practical learning experience continues to benefit me in my career.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold text-sm flex-shrink-0">
                  AL
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">UESC Alumnus</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with name/org)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 7 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-indigo-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                The projects and technical training at UESC made me feel prepared during my internship. I was able to contribute with confidence from day one.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  FY
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">Final-Year Student</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6 md:pt-4">

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-purple-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                The studio environment encouraged creativity while challenging me to think critically about design, sustainability, and functionality.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm flex-shrink-0">
                  AR
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">Architecture Student</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

            {/* Large Portrait Photo Card */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] bg-neutral-900 group">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
                alt="Student Project"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">U</span>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium tracking-wider uppercase">Innovation</span>
                </div>
                <p className="text-white font-semibold text-lg leading-snug font-serif">Turning ideas into<br />real-world impact.</p>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl text-teal-600/20 font-serif leading-none mb-3">"</div>
              <p className="text-[15px] text-black/70 leading-relaxed mb-8 font-light">
                Being part of student clubs helped me develop leadership, communication, and collaboration skills that complemented my academic journey.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                  SC
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">Student Club Member</p>
                  <p className="text-[11px] text-black/40 mt-0.5">(Replace with real name)</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
