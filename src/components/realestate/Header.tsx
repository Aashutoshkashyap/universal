"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GraduationCap, ChevronDown, Building2, BookMarked, Sparkles, Menu, X } from "lucide-react";
import uescLogo from "../../../assets/images/UESC-logo4.png";

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
        className={`fixed top-12 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 lg:px-16 py-5 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/8"
          : "bg-transparent"
          }`}
      >
        <a
          href="#main-content"
          aria-label="UESC home"
          className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 flex items-center gap-2 ${scrolled ? "text-black" : "text-white"
            }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 p-1 shadow-sm">
            <Image
              src={uescLogo}
              alt=""
              width={42}
              sizes="42px"
              quality={45}
              loading="eager"
              className="h-full w-auto object-contain"
            />
          </span>
          <span>UESC</span>
        </a>

        <nav aria-label="Primary navigation" className={`absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500 min-[1400px]:flex xl:gap-5 xl:text-[12px] xl:tracking-[0.1em] ${scrolled ? "text-black/80" : "text-white/95"
          }`}>
          <a href="#main-content" className="hover:text-red-600 transition-colors shrink-0">Home</a>
          <a href="#about" className="hover:text-red-600 transition-colors shrink-0">About</a>

          <div className="relative group py-4 shrink-0">
            <a href="#academics" aria-haspopup="true" className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer">
              <span>Academics</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
            </a>

            <div aria-label="Academic links" className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white text-black rounded-2xl shadow-2xl border border-black/10 p-7 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 z-50">
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
                    <li><a href="#undergraduate" className="hover:text-red-600 transition-colors">Undergraduate</a></li>
                    <li><a href="#graduate" className="hover:text-red-600 transition-colors">Graduate</a></li>
                    <li><a href="https://pu.edu.np/" className="hover:text-red-600 transition-colors">Pokhara University</a></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-black">
                    <Building2 className="w-4 h-4 text-red-600" />
                    <span>Departments</span>
                  </div>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li><a href="https://uesc.edu.np/civil" className="hover:text-red-600 transition-colors">Civil Engineering</a></li>
                    <li><a href="https://uesc.edu.np/computer" className="hover:text-red-600 transition-colors">Computer Engineering</a></li>
                    <li><a href="https://uesc.edu.np/architecture" className="hover:text-red-600 transition-colors">Architecture</a></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-black">
                    <BookMarked className="w-4 h-4 text-red-600" />
                    <span>Resources</span>
                  </div>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li><a href="https://uesc.edu.np/download" className="hover:text-red-600 transition-colors">Curriculum</a></li>
                    <li><a href="https://uesc.edu.np/download" className="hover:text-red-600 transition-colors">Academic Calendar</a></li>
                    <li><a href="https://uesc.edu.np/download" className="hover:text-red-600 transition-colors">Examinations</a></li>
                    <li><a href="https://uesc.edu.np/download" className="hover:text-red-600 transition-colors">Downloads</a></li>
                  </ul>
                </div>

                <div className="space-y-3 bg-red-50/60 p-3.5 rounded-xl border border-red-100">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-700">
                    <Sparkles className="w-4 h-4 text-red-600" />
                    <span>Featured</span>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-red-950">
                    <li>
                      <a href="https://uesc.edu.np/apply" className="hover:underline flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Admissions</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://uesc.edu.np/scholarship" className="hover:underline flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Scholarship Info</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <a href="https://uesc.edu.np/apply" className="hover:text-red-600 transition-colors shrink-0">Admissions</a>
          <a href="#testimonials" className="hover:text-red-600 transition-colors shrink-0">Student Life</a>
          <a href="https://uesc.edu.np/icas" className="hover:text-red-600 transition-colors shrink-0">Research</a>
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
            href="https://uesc.edu.np/apply"
            className="hidden sm:inline-flex group items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold text-white bg-[#0A3073] hover:bg-red-700 backdrop-blur-md border border-white/30 hover:border-red-400/60 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] pointer-events-auto"
          >
            <span className="relative flex items-center justify-center h-4 w-4 shrink-0">
              <span className="blinking-dot absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600 border border-white/50"></span>
            </span>
            <span className="whitespace-nowrap transition-transform duration-300 group-hover:scale-105">Online Admission</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500 min-[1400px]:hidden ${scrolled
              ? "bg-black/5 border-black/20 text-black"
              : "bg-black/35 border-white/50 text-white hover:bg-black/50"
              }`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-x-0 top-[116px] z-40 max-h-[80vh] space-y-4 overflow-y-auto border-b border-black/10 bg-white px-8 py-6 shadow-xl min-[1400px]:hidden">
          {[
            { label: "Home", href: "#main-content" },
            { label: "About", href: "#about" },
            { label: "Academics", href: "#academics" },
            { label: "Admissions", href: "https://uesc.edu.np/apply" },
            { label: "Student Life", href: "#testimonials" },
            { label: "Research", href: "https://uesc.edu.np/icas" },
            { label: "Careers", href: "#careers" },
            { label: "News & Events", href: "#news" },
            { label: "Contact", href: "#contacts" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-wider text-black font-semibold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://uesc.edu.np/apply"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2.5 w-full text-center px-6 py-3 rounded-full bg-[#0A3073] text-white text-xs uppercase tracking-wider font-semibold shadow-md border border-[#0A3073] hover:bg-red-700 hover:border-red-700 transition-all"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span>Online Admission</span>
          </a>
        </nav>
      )}
    </>
  );
}
