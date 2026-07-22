"use client";

import { useState, useEffect } from "react";
import { GraduationCap, ChevronDown, Building2, BookMarked, Sparkles, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Approximate hero height as 88vh to match the hero section
      const heroHeight = window.innerHeight * 0.88;
      setScrolled(window.scrollY > heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 lg:px-16 py-5 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/8"
          : "bg-transparent"
          }`}
      >
        <a
          href="#"
          className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 flex items-center gap-2 ${scrolled ? "text-black" : "text-white"
            }`}
        >
          <GraduationCap className="w-8 h-8 text-red-600" />
          <span>UESC</span>
        </a>

        <nav className={`hidden lg:flex items-center justify-center gap-3 xl:gap-5 text-[11px] xl:text-[12px] uppercase tracking-[0.08em] xl:tracking-[0.1em] font-semibold transition-colors duration-500 absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${scrolled ? "text-black/80" : "text-white/95"
          }`}>
          <a href="#" className="hover:text-red-600 transition-colors shrink-0">Home</a>
          <a href="#about" className="hover:text-red-600 transition-colors shrink-0">About</a>

          <div className="relative group py-4 shrink-0">
            <a href="#academics" className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer">
              <span>Academics</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
            </a>

            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white text-black rounded-2xl shadow-2xl border border-black/10 p-7 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="text-[11px] font-bold text-red-600 tracking-widest uppercase mb-4 border-b pb-2">
                Academics Overview
              </div>
              <div className="grid grid-cols-4 gap-6 text-left normal-case tracking-normal">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-black">
                    <GraduationCap className="w-4 h-4 text-red-600" />
                    <span>Programs</span>
                  </div>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Undergraduate</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Graduate</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Diploma</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-black">
                    <Building2 className="w-4 h-4 text-red-600" />
                    <span>Departments</span>
                  </div>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Civil Engineering</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Computer Engineering</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Electrical Engineering</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Electronics & Comm.</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Architecture</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-black">
                    <BookMarked className="w-4 h-4 text-red-600" />
                    <span>Resources</span>
                  </div>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Curriculum</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Academic Calendar</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Examination</li>
                    <li className="hover:text-red-600 cursor-pointer transition-colors">Downloads</li>
                  </ul>
                </div>

                <div className="space-y-3 bg-red-50/60 p-3.5 rounded-xl border border-red-100">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-700">
                    <Sparkles className="w-4 h-4 text-red-600" />
                    <span>Featured</span>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-red-950">
                    <li className="hover:underline cursor-pointer flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Admissions Open</span>
                    </li>
                    <li className="hover:underline cursor-pointer flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Scholarship Info</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <a href="#admissions" className="hover:text-red-600 transition-colors shrink-0">Admissions</a>
          <a href="#studentlife" className="hover:text-red-600 transition-colors shrink-0">Student Life</a>
          <a href="#research" className="hover:text-red-600 transition-colors shrink-0">Research</a>
          <a href="#careers" className="hover:text-red-600 transition-colors shrink-0">Careers</a>
          <a href="#news" className="hover:text-red-600 transition-colors shrink-0">News & Events</a>
          <a href="#contacts" className="hover:text-red-600 transition-colors shrink-0">Contact</a>
        </nav>

        <div className="flex items-center gap-3 z-50">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse-ring {
              0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
              70% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
              100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
            }
            .blinking-dot {
              animation: pulse-ring 1.2s infinite;
            }
          `}} />
          <a
            href="#contacts"
            className="hidden sm:inline-flex group items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold text-white bg-[#0A3073]/50 hover:bg-red-600/90 backdrop-blur-md border border-white/30 hover:border-red-400/60 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] pointer-events-auto"
          >
            <span className="relative flex items-center justify-center h-4 w-4 shrink-0">
              <span className="blinking-dot absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600 border border-white/50"></span>
            </span>
            <span className="whitespace-nowrap transition-transform duration-300 group-hover:scale-105">Online Admission</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-colors duration-500 ${scrolled
              ? "bg-black/5 border-black/20 text-black"
              : "bg-white/15 border-white/30 text-white"
              }`}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[68px] z-40 bg-white border-b border-black/10 px-8 py-6 space-y-4 shadow-xl lg:hidden max-h-[80vh] overflow-y-auto">
          {["Home", "About", "Academics", "Admissions", "Student Life", "Research", "Careers", "News & Events", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/[^a-z]/g, "")}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-wider text-black font-semibold"
            >
              {item}
            </a>
          ))}
          <a
            href="#contacts"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2.5 w-full text-center px-6 py-3 rounded-full bg-blue-600/40 text-white text-xs uppercase tracking-wider font-semibold shadow-md backdrop-blur-md border border-blue-500/30 hover:bg-red-600/90 transition-all"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span>Online Admission</span>
          </a>
        </div>
      )}
    </>
  );
}
