"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, Globe } from "lucide-react";

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
          LAYOUTS & PRICING
      ══════════════════════════════════════════ */}
      <section id="villas" className="py-20 lg:py-28 bg-white" >
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-end justify-between mb-14">
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl lg:text-5xl text-black"
            >
              Layouts & Pricing
            </h2>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-black hover:text-red-600 transition-colors group"
            >
              <span>View all</span>
              <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Villa A1",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                beds: 3, baths: 3, sqm: 180, price: "€495,000",
              },
              {
                name: "Villa B2",
                img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                beds: 4, baths: 4, sqm: 220, price: "€675,000",
              },
              {
                name: "Villa C3",
                img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                beds: 5, baths: 5, sqm: 300, price: "€890,000",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-lg transition-shadow group flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-2xl text-black mb-2"
                  >
                    {v.name}
                  </h3>
                  <p className="text-xs text-black/50 font-light">
                    {v.beds} beds · {v.baths} baths · {v.sqm} m²
                  </p>
                </div>
                <div className="px-6 pb-6 flex items-center justify-between border-t border-black/8 pt-4">
                  <div>
                    <span className="text-[10px] text-black/40 uppercase block">from</span>
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-xl font-semibold text-black"
                    >
                      {v.price}
                    </span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATIONS
      ══════════════════════════════════════════ */}
      <section id="locations" className="py-20 bg-black border-t border-white/10" >
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-5">
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-4xl lg:text-5xl text-white"
              >
                Locations
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Fethiye — the heart of the Mediterranean coast of Turkey. Crystal clear sea, marina, restaurants and all infrastructure nearby.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-white hover:text-red-400 transition-colors group"
              >
                <span>Learn More</span>
                <span className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  label: "Proximity to sea and beaches",
                },
                {
                  img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  label: "Marina & Fethiye city center",
                },
                {
                  img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                  label: "Surrounding nature & mountains",
                },
              ].map(({ img, label }) => (
                <div key={label} className="space-y-3">
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-xs font-medium text-white/80 leading-snug">{label}</p>
                </div>
              ))}
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
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="py-7 bg-black border-t border-white/10 text-white/50 text-xs" >
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-5">
          <a
            href="#"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-xl tracking-[0.2em] text-white"
          >
            TERRAN
          </a>
          <div className="flex flex-wrap items-center gap-6 uppercase tracking-wider text-[10px]">
            <a href="#about" className="hover:text-white transition-colors">About Project</a>
            <a href="#villas" className="hover:text-white transition-colors">Villas</a>
            <a href="#locations" className="hover:text-white transition-colors">Locations</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#contacts" className="hover:text-white transition-colors">Contacts</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Globe className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
