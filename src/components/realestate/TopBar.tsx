"use client";

import { Phone, Mail, Video, BookOpen, Briefcase, FlaskConical } from "lucide-react";

const topBarLinks = [
  { icon: <Video className="w-4 h-4" />, label: "Virtual Tour", href: "#" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Gyanyog", href: "#" },
  { icon: <Briefcase className="w-4 h-4" />, label: "Career", href: "#" },
  { icon: <FlaskConical className="w-4 h-4" />, label: "Research (ICAS)", href: "#" },
];

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A3073] text-white">
      {/*
        Use the SAME padding as the Header (px-8 sm:px-12 lg:px-16) and NO max-width
        so the left edge aligns with the logo and right edge aligns with Online Admission.
      */}
      <div className="w-full px-8 sm:px-12 lg:px-16 h-12 flex items-center justify-between text-[14px] font-medium tracking-wide">

        {/* Left — Contact Info — aligns with logo */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:+97715268419"
            className="flex items-center gap-1.5 hover:text-blue-200 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>+977-1-5268419 / +977 9869055176</span>
          </a>
          <span className="text-white/30 hidden sm:block">|</span>
          <a
            href="mailto:info@uesc.edu.np"
            className="hidden sm:flex items-center gap-1.5 hover:text-blue-200 transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>info@uesc.edu.np</span>
          </a>
        </div>

        {/* Right — Quick Links — Research (ICAS) aligns above Online Admission */}
        <div className="flex items-center gap-0.5">
          {topBarLinks.map((link, idx) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                className="flex items-center gap-1.5 px-2.5 py-0.5 hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </a>
              {idx < topBarLinks.length - 1 && (
                <span className="text-white/30">|</span>
              )}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
