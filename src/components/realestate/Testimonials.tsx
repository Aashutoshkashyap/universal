export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 lg:py-16 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">

        {/* Heading — matches Academic Programs section style */}
        <div className="mb-8 text-center sm:text-left">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl lg:text-5xl text-black mb-3"
          >
            Testimonials
          </h2>
          <p className="text-sm text-black/60 font-light max-w-xl mx-auto sm:mx-0">
            What they're saying — trusted by creatives and leaders from various industries.
          </p>
        </div>

        {/* Bento Masonry Grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-4">

            {/* Large Portrait Photo Card */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover object-top opacity-80"
                alt="David Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="text-white/60 text-[10px] font-medium">Logoipsum</span>
                </div>
                <p className="text-white font-semibold text-sm leading-snug">How Puno Automated<br />80% of Lead Handling</p>
              </div>
            </div>

            {/* Text Card 1 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Daniel Kim" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Daniel Kim</p>
                  <p className="text-[11px] text-black/40">Founder, ScaleLabs Education</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically. We've increased enrollment conversion by 35% in just one quarter.</p>
            </div>

            {/* Text Card 2 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Alex Johnson" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Alex Johnson</p>
                  <p className="text-[11px] text-black/40">Head of Operations, Finovate Consulting</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">Security and compliance were major concerns for us. They designed an automation architecture that was not only efficient but enterprise-grade secure.</p>
            </div>

          </div>

          {/* ── MIDDLE COLUMN ── */}
          <div className="flex flex-col gap-4">

            {/* Text Card 3 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="David Lee" />
                <div>
                  <p className="text-[13px] font-semibold text-black">David Lee</p>
                  <p className="text-[11px] text-black/40">Founder, Atodio Studio</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance.</p>
            </div>

            {/* Text Card 4 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Sarah Mitchell" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Sarah Mitchell</p>
                  <p className="text-[11px] text-black/40">COO, BrightPath SaaS</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution. Now, our CRM runs intelligently, leads are scored automatically, and follow-ups happen without manual effort. We've increased demo bookings by 40% while reducing operational friction.</p>
            </div>

            {/* Text Card 5 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Jonathan Reed" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Jonathan Reed</p>
                  <p className="text-[11px] text-black/40">Managing Director, Nexora Digital Agency</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow. The result? 30+ hours saved per week and complete visibility across our pipeline.</p>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-4">

            {/* Text Card 6 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Michael Tran" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Michael Tran</p>
                  <p className="text-[11px] text-black/40">Founder & CEO, Skyline Realty Group</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.</p>
            </div>

            {/* Large Portrait Photo Card */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover object-top opacity-80"
                alt="Laura Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="text-white/60 text-[10px] font-medium">Logoipsum</span>
                </div>
                <p className="text-white font-semibold text-sm leading-snug">Scaling SaaS Operations<br />with AI Automation</p>
              </div>
            </div>

            {/* Text Card 7 */}
            <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
              <div className="text-2xl text-black/10 font-serif leading-none mb-3">"</div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" className="w-9 h-9 rounded-full object-cover" alt="Laura Martinez" />
                <div>
                  <p className="text-[13px] font-semibold text-black">Laura Martinez</p>
                  <p className="text-[11px] text-black/40">CMO, Elevate Commerce Co.</p>
                </div>
              </div>
              <p className="text-[13px] text-black/60 leading-relaxed">Marketing automation always felt fragmented — too many tools, not enough cohesion. They unified everything into one intelligent ecosystem. Campaign triggers, abandoned cart flows, segmentation — all automated with precision.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
