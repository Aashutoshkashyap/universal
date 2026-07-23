import { createElement } from "react";
import type { SiteContent } from "@/lib/site-content";
import { getSiteIcon } from "@/lib/site-assets";

type TopBarProps = {
  content: SiteContent["topBar"];
};

export default function TopBar({ content }: TopBarProps) {
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
            href={content.phone.href}
            aria-label={content.phone.ariaLabel}
            className="flex items-center gap-1.5 hover:text-blue-200 transition-colors whitespace-nowrap"
          >
            {createElement(getSiteIcon("phone"), {
              className: "w-4 h-4 shrink-0",
            })}
            <span className="hidden min-[360px]:inline">
              {content.phone.primaryLabel}
            </span>
            <span className="hidden lg:inline">
              {" / "}
              {content.phone.secondaryLabel}
            </span>
          </a>
          <span className="hidden text-white/30 lg:block">|</span>
          <a
            href={content.email.href}
            className="hidden lg:flex items-center gap-1.5 hover:text-blue-200 transition-colors whitespace-nowrap"
          >
            {createElement(getSiteIcon("mail"), {
              className: "w-4 h-4 shrink-0",
            })}
            <span>{content.email.label}</span>
          </a>
        </div>

        {/* Right — Quick Links — Research (ICAS) aligns above Online Admission */}
        <div className="flex items-center gap-0.5">
          {content.quickLinks.map((link, idx) => (
            <span key={link.id} className="flex items-center">
              <a
                href={link.href}
                aria-label={link.label}
                className="flex items-center gap-1.5 px-1.5 py-0.5 lg:px-2.5 hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                {createElement(getSiteIcon(link.iconKey), {
                  className: "w-4 h-4",
                })}
                <span className="hidden lg:inline">{link.label}</span>
              </a>
              {idx < content.quickLinks.length - 1 && (
                <span aria-hidden="true" className="hidden text-white/30 lg:inline">|</span>
              )}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
