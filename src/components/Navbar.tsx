"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const worksLinks = [
  { label: "All Works", href: "/our-works" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Engineering Projects", href: "/engineering" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mb-6 shadow-sm border border-gray-100 relative z-50">
      <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        Er. Aashutosh <span className="text-[#2c3e1e]">Jha</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-600">
        <Link href={isHome ? "/#home" : "/"} className="hover:text-black transition-colors">Home</Link>
        <Link href={isHome ? "/#experience" : "/#experience"} className="hover:text-black transition-colors">Experience</Link>
        <Link href={isHome ? "/#education" : "/#education"} className="hover:text-black transition-colors">Education</Link>

        {/* Works Dropdown */}
        <div className="relative" onMouseEnter={() => setWorksOpen(true)} onMouseLeave={() => setWorksOpen(false)}>
          <button
            className="flex items-center gap-1 hover:text-black transition-colors"
            onClick={() => setWorksOpen(!worksOpen)}
          >
            Works <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${worksOpen ? "rotate-180" : ""}`} />
          </button>
          {worksOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[200px] overflow-hidden">
                {worksLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-5 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-[#f2f1ec] transition-colors"
                    onClick={() => setWorksOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href={isHome ? "/#skills" : "/#skills"} className="hover:text-black transition-colors">Skills</Link>
        <Link href={isHome ? "/#contact" : "/#contact"} className="hover:text-black transition-colors">Contact</Link>
      </nav>

      {/* CTA */}
      <div className="flex items-center space-x-4">
        <a
          href="mailto:jhaaashutosh933@gmail.com"
          className="hidden sm:inline-flex rounded-full bg-[#f2f1ec] hover:bg-[#e6e4dc] text-black px-6 h-9 items-center font-medium text-sm transition-colors"
        >
          Hire Me
        </a>
        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 rounded-full bg-[#f2f1ec] flex items-center justify-center hover:bg-[#e6e4dc] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[24px] shadow-lg border border-gray-100 py-4 px-6 flex flex-col gap-2 md:hidden">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-1" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/#experience" className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-1" onClick={() => setOpen(false)}>Experience</Link>
          <Link href="/#education" className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-1" onClick={() => setOpen(false)}>Education</Link>
          <div className="border-t border-gray-100 pt-2 mt-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2 pl-0.5">Works</p>
            {worksLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-600 hover:text-black transition-colors py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/#skills" className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-1 border-t border-gray-100 pt-2" onClick={() => setOpen(false)}>Skills</Link>
          <Link href="/#contact" className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-1" onClick={() => setOpen(false)}>Contact</Link>
          <a
            href="mailto:jhaaashutosh933@gmail.com"
            className="mt-2 text-center rounded-full bg-[#2c3e1e] text-white px-6 py-2.5 font-medium text-sm hover:bg-[#202d16] transition-colors"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
