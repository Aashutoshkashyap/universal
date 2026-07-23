import Image from "next/image";
import { getSiteIcon, getSiteImage } from "@/lib/site-assets";
import type { SiteContent } from "@/lib/site-content";
import ContactForm from "./ContactForm";

export function LocationsSection({
  content,
}: {
  content: SiteContent["locations"];
}) {
  if (!content.enabled) return null;

  return (
    <section id="locations" className="py-20 bg-[#070e1c] border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <h2
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-4xl lg:text-5xl text-white mb-12"
        >
          {content.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.cards.map((card) => {
            const Icon = getSiteIcon(card.iconKey);

            return (
              <div
                key={card.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 hover:bg-white/8 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0A3073] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-2">
                    {card.label}
                  </p>
                  <div className="space-y-1.5">
                    {card.entries.map((entry) =>
                      entry.href ? (
                        <a
                          key={entry.id}
                          href={entry.href}
                          className="flex min-h-6 items-center text-sm text-white/85 hover:text-blue-300 transition-colors font-light"
                        >
                          {entry.text}
                        </a>
                      ) : (
                        <p
                          key={entry.id}
                          className="text-sm text-white/85 leading-relaxed font-light"
                        >
                          {entry.text}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  content,
}: {
  content: SiteContent["contact"];
}) {
  if (!content.enabled) return null;

  return (
    <section id="contacts" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 space-y-7">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl sm:text-5xl text-black"
            >
              {content.heading}
            </h2>
            <p className="text-sm text-black/60 font-light leading-relaxed">
              {content.description}
            </p>
            <div className="space-y-4 text-sm text-black/60">
              {content.contactLinks.map((link) => {
                const Icon = getSiteIcon(link.iconKey);

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="flex items-center gap-4 hover:text-black transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                      <Icon
                        className="w-4 h-4 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm content={content.form} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({
  content,
}: {
  content: SiteContent["footer"];
}) {
  if (!content.enabled) return null;

  const copyright = content.copyrightTemplate.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer className="relative bg-white overflow-hidden">
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          lineHeight: 0,
          overflow: "hidden",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes wavePulse1 {
                0%, 100% { d: path("M-100,100 C100,40 300,150 540,90 C780,30 960,130 1200,80 C1350,50 1460,110 1540,80 L1540,170 L-100,170 Z"); }
                50%       { d: path("M-100,120 C150,60 350,160 600,100 C850,40 1050,140 1250,90 C1380,65 1470,115 1540,95 L1540,170 L-100,170 Z"); }
              }
              @keyframes wavePulse2 {
                0%, 100% { d: path("M-100,110 C120,55 300,145 520,95 C740,45 920,140 1160,85 C1320,55 1450,120 1540,90 L1540,170 L-100,170 Z"); }
                50%       { d: path("M-100,90 C180,140 360,40 580,100 C800,160 1000,50 1240,105 C1370,130 1460,80 1540,110 L1540,170 L-100,170 Z"); }
              }
              @keyframes wavePulse3 {
                0%, 100% { d: path("M-100,130 C200,70 450,160 720,100 C990,40 1200,150 1440,100 C1490,87 1520,95 1540,90 L1540,170 L-100,170 Z"); }
                50%       { d: path("M-100,115 C220,155 480,55 720,115 C960,175 1180,65 1420,110 C1488,130 1520,100 1540,105 L1540,170 L-100,170 Z"); }
              }
              .wv1 { animation: wavePulse1 8s ease-in-out infinite; }
              .wv2 { animation: wavePulse2 11s ease-in-out infinite; }
              .wv3 { animation: wavePulse3 15s ease-in-out infinite; }
            `,
          }}
        />

        <svg
          viewBox="-100 0 1640 170"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "140px" }}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="-100" y="0" width="1640" height="170" fill="#ffffff" />
          <path
            className="wv3"
            d="M-100,130 C200,70 450,160 720,100 C990,40 1200,150 1440,100 C1490,87 1520,95 1540,90 L1540,170 L-100,170 Z"
            fill="#0d5c6e"
            fillOpacity="0.4"
          />
          <path
            className="wv2"
            d="M-100,110 C120,55 300,145 520,95 C740,45 920,140 1160,85 C1320,55 1450,120 1540,90 L1540,170 L-100,170 Z"
            fill="#0a4a5e"
            fillOpacity="0.65"
          />
          <path
            className="wv1"
            d="M-100,100 C100,40 300,150 540,90 C780,30 960,130 1200,80 C1350,50 1460,110 1540,80 L1540,170 L-100,170 Z"
            fill="#0A3073"
          />
        </svg>
      </div>

      <div className="bg-[#0A3073] text-white">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 pt-10 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {content.columns.map((column, columnIndex) => (
              <div key={column.id} className="space-y-8">
                {columnIndex === 0 ? (
                  <a
                    href={content.brand.href}
                    className="flex items-center gap-2.5 group"
                    aria-label={content.brand.ariaLabel}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-white/90 transition-colors p-1">
                      <Image
                        src={getSiteImage(content.brand.logo.key)}
                        alt={content.brand.logo.alt}
                        width={42}
                        sizes="42px"
                        quality={55}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-bold tracking-wide text-white"
                    >
                      {content.brand.name}
                    </span>
                  </a>
                ) : null}

                {column.groups.map((group) => (
                  <div key={group.id}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-3">
                      {group.heading}
                    </p>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            className="text-sm text-white/80 hover:text-white transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-1">
                  {content.chat.heading}
                </p>
                <p className="text-sm text-white/75 font-light leading-relaxed">
                  {content.chat.description}
                </p>
              </div>

              <a
                href={content.chat.cta.href}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/60 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#0A3073] transition-all duration-300"
              >
                {content.chat.cta.label}
              </a>

              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-2">
                  {content.chat.phoneHeading}
                </p>
                {content.chat.phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.href}
                    className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light"
                  >
                    {phone.label}
                  </a>
                ))}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-semibold mb-2">
                  {content.chat.emailHeading}
                </p>
                {content.chat.emails.map((email) => (
                  <a
                    key={email.id}
                    href={email.href}
                    className="flex min-h-6 items-center text-sm text-white/85 hover:text-white transition-colors font-light"
                  >
                    {email.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#082460]">
          <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/70 text-center sm:text-left">
              {copyright}
            </p>

            <div className="flex items-center gap-5 text-xs text-white/80">
              {content.bottomLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
