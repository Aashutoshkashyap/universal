"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          FIND US
      ══════════════════════════════════════════ */}
      <section id="locations" className="py-20 bg-[#070e1c] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">

          {/* Heading */}
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl lg:text-5xl text-white mb-12"
          >
            Find Us
          </h2>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Address */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 hover:bg-white/8 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#0A3073] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-2">Location</p>
                <p className="text-sm text-white/85 leading-relaxed font-light">
                  137/20, Manido Marg, Chakupat,<br />
                  Ward 11, Lalitpur Metropolitan City,<br />
                  Nepal
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 hover:bg-white/8 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#0A3073] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-2">Call Us</p>
                <div className="space-y-1.5">
                  <a href="tel:+97715268419" className="block text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    +977-1-5268419
                  </a>
                  <a href="tel:+97715268592" className="block text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    +977-1-5268592
                  </a>
                  <a href="tel:+9779869055176" className="block text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    +977 9869055176
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 hover:bg-white/8 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#0A3073] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-2">Email Us</p>
                <div className="space-y-1.5">
                  <a href="mailto:uscfoundation@gmail.com" className="block text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    uscfoundation@gmail.com
                  </a>
                  <a href="mailto:info@uesc.edu.np" className="block text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    info@uesc.edu.np
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════ */}
      <section id="contacts" className="py-20 lg:py-28 bg-white" >
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 space-y-7">
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-4xl sm:text-5xl text-black"
              >
                Get in Touch
              </h2>
              <p className="text-sm text-black/60 font-light leading-relaxed">
                Receive a personalized selection of villas and expert consultation.
              </p>
              <div className="space-y-4 text-sm text-black/60">
                {[
                  { icon: <Phone className="w-4 h-4 text-blue-500" />, text: "+90 532 123 45 67", href: "tel:+905321234567" },
                  { icon: <Mail className="w-4 h-4 text-blue-500" />, text: "info@terran-villas.com", href: "mailto:info@terran-villas.com" },
                  { icon: <MapPin className="w-4 h-4 text-blue-500" />, text: "Fethiye, Muğla, Türkiye", href: "#" },
                ].map(({ icon, text, href }) => (
                  <a key={text} href={href} className="flex items-center gap-4 hover:text-black transition-colors">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                      {icon}
                    </div>
                    {text}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Your Name" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 text-sm text-black placeholder-black/35 focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text" placeholder="Phone / WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 text-sm text-black placeholder-black/35 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <input
                  type="email" placeholder="Email Address" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 text-sm text-black placeholder-black/35 focus:outline-none focus:border-black transition-colors"
                />
                <textarea
                  rows={4} placeholder="Your Message or Preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 text-sm text-black placeholder-black/35 focus:outline-none focus:border-black transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-blue-600 hover:bg-red-600 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  {submitted ? "Request Sent!" : "Submit Request"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-sm text-black/50 font-light leading-relaxed mt-6 max-w-sm">
                Trust, individuality and progress. We believe that a home is not just a place where you live. It is your space for life, work and rest — a place where your dreams and ambitions come true. We are here to help you find it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER WITH WAVE ANIMATION
      ══════════════════════════════════════════ */}
      <footer className="relative bg-white overflow-hidden">

        {/* ── Wave SVG separator — truly full viewport width ── */}
        <div
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            lineHeight: 0,
            overflow: "hidden",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes wavePulse1 {
              0%, 100% { d: path("M-100,100 C100,40 300,150 540,90 C780,30 960,130 1200,80 C1350,50 1460,110 1540,80 L1540,170 L-100,170 Z"); }
              50%       { d: path("M-100,120 C150,60 350,160 600,100 C850,40 1050,140 1250,90 C1380,65 1470,115 1540,95 L1540,170 L-100,170 Z"); }
            }
            @keyframes wavePulse2 {
              0%, 100% { d: path("M-100,110 C120,55 300,145 520,95 C740,45 920,140 1160,85 C1320,55 1450,120 1540,90 L1540,170 L-100,170 Z"); }
              50%       { d: path("M-100,90  C180,140 360,40 580,100 C800,160 1000,50 1240,105 C1370,130 1460,80  1540,110 L1540,170 L-100,170 Z"); }
            }
            @keyframes wavePulse3 {
              0%, 100% { d: path("M-100,130 C200,70 450,160 720,100 C990,40 1200,150 1440,100 C1490,87 1520,95 1540,90 L1540,170 L-100,170 Z"); }
              50%       { d: path("M-100,115 C220,155 480,55  720,115 C960,175 1180,65  1420,110 C1488,130 1520,100 1540,105 L1540,170 L-100,170 Z"); }
            }
            .wv1 { animation: wavePulse1 8s ease-in-out infinite; }
            .wv2 { animation: wavePulse2 11s ease-in-out infinite; }
            .wv3 { animation: wavePulse3 15s ease-in-out infinite; }
          ` }} />

          <svg
            viewBox="-100 0 1640 170"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "140px" }}
            preserveAspectRatio="none"
          >
            {/* Solid white background fill matching the section above */}
            <rect x="-100" y="0" width="1640" height="170" fill="#ffffff" />

            {/* Back wave — lightest teal */}
            <path
              className="wv3"
              d="M-100,130 C200,70 450,160 720,100 C990,40 1200,150 1440,100 C1490,87 1520,95 1540,90 L1540,170 L-100,170 Z"
              fill="#0d5c6e"
              fillOpacity="0.4"
            />
            {/* Mid wave */}
            <path
              className="wv2"
              d="M-100,110 C120,55 300,145 520,95 C740,45 920,140 1160,85 C1320,55 1450,120 1540,90 L1540,170 L-100,170 Z"
              fill="#0a4a5e"
              fillOpacity="0.65"
            />
            {/* Front wave — solid brand blue */}
            <path
              className="wv1"
              d="M-100,100 C100,40 300,150 540,90 C780,30 960,130 1200,80 C1350,50 1460,110 1540,80 L1540,170 L-100,170 Z"
              fill="#0A3073"
              fillOpacity="1"
            />
          </svg>
        </div>

        {/* ── Main footer body ── */}
        <div className="bg-[#0A3073] text-white">
          <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 pt-10 pb-16">

            {/* 4-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

              {/* Col 1 — Logo + Get Started */}
              <div className="space-y-6">
                <a href="#" className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 6.075-4.027 11-9 11S3 19.075 3 13a12.083 12.083 0 012.84-7.578L12 14z" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold tracking-wide text-white">UESC</span>
                </a>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-3">Get Started</p>
                  <ul className="space-y-2">
                    {["Home", "About Us", "Admissions", "Student Portal"].map(item => (
                      <li key={item}>
                        <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 2 — University + Legal */}
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-3">University</p>
                  <ul className="space-y-2">
                    {["About UESC", "Administration", "Faculty & Staff", "Departments", "News & Events"].map(item => (
                      <li key={item}>
                        <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-3">Legal</p>
                  <ul className="space-y-2">
                    {["Privacy Notice", "Terms of Use", "Disclaimer", "Cookie Policy"].map(item => (
                      <li key={item}>
                        <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 3 — Quick Links */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-3">Quick Links</p>
                <ul className="space-y-2">
                  {[
                    "Academics",
                    "Virtual Tour",
                    "Research (ICAS)",
                    "Gyanyog",
                    "Career Services",
                    "Examinations",
                    "Library",
                    "Downloads",
                  ].map(item => (
                    <li key={item}>
                      <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 — Let's Chat */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-1">Let's Chat</p>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    Have a question or need support? We're here to help.
                  </p>
                </div>

                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/60 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#0A3073] transition-all duration-300"
                >
                  Get in Touch
                </a>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-2">You Call Us</p>
                  <a href="tel:+97715268419" className="block text-sm text-white/85 hover:text-white transition-colors font-light">+977-1-5268419 / 5268592</a>
                  <a href="tel:+9779869055176" className="block text-sm text-white/85 hover:text-white transition-colors font-light">+977 9869055176</a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-2">Email</p>
                  <a href="mailto:info@uesc.edu.np" className="block text-sm text-white/85 hover:text-white transition-colors font-light">info@uesc.edu.np</a>
                  <a href="mailto:uscfoundation@gmail.com" className="block text-sm text-white/85 hover:text-white transition-colors font-light">uscfoundation@gmail.com</a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-white/10 bg-[#082460]">
            <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/45 text-center sm:text-left">
                © {new Date().getFullYear()} UESC — Universal Engineering & Science College. All rights reserved.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A3073" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}


