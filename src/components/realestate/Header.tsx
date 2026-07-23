"use client";

import { createElement, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";

type HeaderProps = {
  content: SiteContent["header"];
  hasTopBar?: boolean;
};

export default function Header({ content, hasTopBar = true }: HeaderProps) {
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
        className={`fixed ${hasTopBar ? "top-12" : "top-0"} left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 lg:px-16 py-5 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/8"
          : "bg-transparent"
          }`}
      >
        <a
          href={content.brand.href}
          aria-label={content.brand.ariaLabel}
          className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 flex items-center gap-2 ${scrolled ? "text-black" : "text-white"
            }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 p-1 shadow-sm">
            <Image
              src={getSiteImage(content.brand.logo.key)}
              alt={content.brand.logo.alt}
              width={42}
              sizes="42px"
              quality={45}
              loading="eager"
              className="h-full w-auto object-contain"
            />
          </span>
          <span>{content.brand.name}</span>
        </a>

        <nav aria-label={content.primaryNavigationAriaLabel} className={`absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500 min-[1400px]:flex xl:gap-5 xl:text-[12px] xl:tracking-[0.1em] ${scrolled ? "text-black/80" : "text-white/95"
          }`}>
          {content.navigation.map((item) => {
            if (item.kind === "link") {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="hover:text-red-600 transition-colors shrink-0"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div key={item.id} className="relative group py-4 shrink-0">
                <a href={item.href} aria-haspopup="true" className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer">
                  <span>{item.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                </a>

                <div aria-label={item.ariaLabel} className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white text-black rounded-2xl shadow-2xl border border-black/10 p-7 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 z-50">
                  <div className="text-[11px] font-bold text-red-600 tracking-widest uppercase mb-4 border-b pb-2">
                    {item.eyebrow}
                  </div>
                  <div className="grid grid-cols-4 gap-6 text-left normal-case tracking-normal">
                    {item.groups.map((group) => (
                      <div
                        key={group.id}
                        className={
                          group.featured
                            ? "space-y-3 bg-red-50/60 p-3.5 rounded-xl border border-red-100"
                            : "space-y-3"
                        }
                      >
                        <div
                          className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${
                            group.featured ? "text-red-700" : "text-black"
                          }`}
                        >
                          {createElement(getSiteIcon(group.iconKey), {
                            className: "w-4 h-4 text-red-600",
                          })}
                          <span>{group.label}</span>
                        </div>
                        <ul
                          className={
                            group.featured
                              ? "space-y-2 text-xs font-medium text-red-950"
                              : "space-y-2 text-xs text-black/70"
                          }
                        >
                          {group.links.map((link) => (
                            <li key={link.id}>
                              <a
                                href={link.href}
                                className={
                                  group.featured
                                    ? "hover:underline flex items-center gap-1.5"
                                    : "hover:text-red-600 transition-colors"
                                }
                              >
                                {group.featured && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                )}
                                <span>{link.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
            href={content.admissionCta.href}
            className="hidden sm:inline-flex group items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold text-white bg-[#0A3073] hover:bg-red-700 backdrop-blur-md border border-white/30 hover:border-red-400/60 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] pointer-events-auto"
          >
            <span className="relative flex items-center justify-center h-4 w-4 shrink-0">
              <span className="blinking-dot absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600 border border-white/50"></span>
            </span>
            <span className="whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
              {content.admissionCta.label}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500 min-[1400px]:hidden ${scrolled
              ? "bg-black/5 border-black/20 text-black"
              : "bg-black/35 border-white/50 text-white hover:bg-black/50"
              }`}
            aria-label={content.menuButtonAriaLabel}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label={content.mobileNavigationAriaLabel} className={`fixed inset-x-0 ${hasTopBar ? "top-[116px]" : "top-[68px]"} z-40 max-h-[80vh] space-y-4 overflow-y-auto border-b border-black/10 bg-white px-8 py-6 shadow-xl min-[1400px]:hidden`}>
          {content.navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-wider text-black font-semibold"
            >
              {item.label}
            </a>
          ))}
          <a
            href={content.admissionCta.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2.5 w-full text-center px-6 py-3 rounded-full bg-[#0A3073] text-white text-xs uppercase tracking-wider font-semibold shadow-md border border-[#0A3073] hover:bg-red-700 hover:border-red-700 transition-all"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span>{content.admissionCta.label}</span>
          </a>
        </nav>
      )}
    </>
  );
}
