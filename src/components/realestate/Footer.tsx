import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import uescLogo from "../../../assets/images/UESC-logo4.png";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <>
      {/* ══════════════════════════════════════════
          FIND US
      ══════════════════════════════════════════ */}
      <section id="locations" className="py-20 bg-[#070e1c] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">

          {/* Heading */}
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
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
                <p className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-2">Location</p>
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
                <p className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-2">Call Us</p>
                <div className="space-y-1.5">
                  <a href="tel:+97715268419" className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    +977-1-5268419
                  </a>
                  <a href="tel:+97715268592" className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    +977-1-5268592
                  </a>
                  <a href="tel:+9779869055176" className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
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
                <p className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-2">Email Us</p>
                <div className="space-y-1.5">
                  <a href="mailto:uscfoundation@gmail.com" className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
                    uscfoundation@gmail.com
                  </a>
                  <a href="mailto:info@uesc.edu.np" className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light">
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
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-4xl sm:text-5xl text-black"
              >
                Get in Touch
              </h2>
              <p className="text-sm text-black/60 font-light leading-relaxed">
                Ask about academic programs, admissions, eligibility, scholarships, or campus visits. The admissions team can help you plan your next step.
              </p>
              <div className="space-y-4 text-sm text-black/60">
                {[
                  { icon: <Phone className="w-4 h-4 text-blue-600" />, text: "+977-1-5268419", href: "tel:+97715268419" },
                  { icon: <Phone className="w-4 h-4 text-blue-600" />, text: "+977-1-5268592", href: "tel:+97715268592" },
                  { icon: <Mail className="w-4 h-4 text-blue-600" />, text: "info@uesc.edu.np", href: "mailto:info@uesc.edu.np" },
                  { icon: <MapPin className="w-4 h-4 text-blue-600" />, text: "Chakupat, Lalitpur, Nepal", href: "https://www.google.com/maps/search/?api=1&query=Universal+Engineering+and+Science+College+Chakupat+Lalitpur" },
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
              <ContactForm />
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
                <a href="#main-content" className="flex items-center gap-2.5 group" aria-label="UESC home">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-white/90 transition-colors p-1">
                    <Image src={uescLogo} alt="" width={42} sizes="42px" quality={55} className="h-full w-auto object-contain" />
                  </div>
                  <span style={{ fontFamily: "var(--font-serif)" }} className="text-2xl font-bold tracking-wide text-white">UESC</span>
                </a>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-3">Get Started</p>
                  <ul className="space-y-2">
                    {[
                      { label: "Home", href: "#main-content" },
                      { label: "About Us", href: "#about" },
                      { label: "Admissions", href: "https://uesc.edu.np/apply" },
                      { label: "Contact Admissions", href: "#contacts" },
                    ].map(item => (
                      <li key={item.label}>
                        <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 2 — University + Legal */}
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-3">College</p>
                  <ul className="space-y-2">
                    {[
                      { label: "About UESC", href: "#about" },
                      { label: "Academic Programs", href: "#academics" },
                      { label: "Student Experience", href: "#testimonials" },
                      { label: "Research & ICAS", href: "https://uesc.edu.np/icas" },
                      { label: "News & Notices", href: "https://uesc.edu.np/notice" },
                    ].map(item => (
                      <li key={item.label}>
                        <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-3">Admissions</p>
                  <ul className="space-y-2">
                    {[
                      { label: "Apply Online", href: "https://uesc.edu.np/apply" },
                      { label: "Scholarships", href: "https://uesc.edu.np/scholarship" },
                      { label: "Downloads", href: "https://uesc.edu.np/download" },
                      { label: "Contact", href: "#contacts" },
                    ].map(item => (
                      <li key={item.label}>
                        <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 3 — Quick Links */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-3">Quick Links</p>
                <ul className="space-y-2">
                  {[
                    { label: "Academics", href: "#academics" },
                    { label: "Campus Location", href: "https://www.google.com/maps/search/?api=1&query=Universal+Engineering+and+Science+College+Chakupat+Lalitpur" },
                    { label: "Research (ICAS)", href: "https://uesc.edu.np/icas" },
                    { label: "Gyanyog", href: "https://uesc.edu.np/gyanyog" },
                    { label: "Career Development", href: "#careers" },
                    { label: "Latest Notices", href: "https://uesc.edu.np/notice" },
                    { label: "Pokhara University", href: "https://pu.edu.np/" },
                    { label: "Downloads", href: "https://uesc.edu.np/download" },
                  ].map(item => (
                    <li key={item.label}>
                      <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 — Let's Chat */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-1">Let&apos;s Chat</p>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    Have a question or need support? We&apos;re here to help.
                  </p>
                </div>

                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/60 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#0A3073] transition-all duration-300"
                >
                  Get in Touch
                </a>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-2">Call Us</p>
                  <a href="tel:+97715268419" className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light">+977-1-5268419</a>
                  <a href="tel:+97715268592" className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light">+977-1-5268592</a>
                  <a href="tel:+9779869055176" className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light">+977 9869055176</a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-2">Email</p>
                  <a href="mailto:info@uesc.edu.np" className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light">info@uesc.edu.np</a>
                  <a href="mailto:uscfoundation@gmail.com" className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light">uscfoundation@gmail.com</a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-white/10 bg-[#082460]">
            <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/70 text-center sm:text-left">
                © {new Date().getFullYear()} UESC — Universal Engineering & Science College. All rights reserved.
              </p>

              <div className="flex items-center gap-5 text-xs text-white/80">
                <a href="https://uesc.edu.np/" className="hover:text-white transition-colors">Official UESC Website</a>
                <a href="https://pu.edu.np/" className="hover:text-white transition-colors">Pokhara University</a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
