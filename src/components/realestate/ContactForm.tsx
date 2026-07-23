"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

type ContactFormContent = SiteContent["contact"]["form"];

function fillTemplate(
  template: string,
  values: Record<"name" | "email" | "phone" | "message", string>,
) {
  return template.replace(
    /\{(name|email|phone|message)\}/g,
    (_, key: keyof typeof values) => values[key],
  );
}

export default function ContactForm({
  content,
}: {
  content: ContactFormContent;
}) {
  const [openingEmail, setOpeningEmail] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const templateValues = {
      name,
      email,
      phone: phone || content.emptyPhoneFallback,
      message: message || content.emptyMessageFallback,
    };
    const subject = encodeURIComponent(
      fillTemplate(content.subjectTemplate, templateValues),
    );
    const body = encodeURIComponent(
      fillTemplate(content.bodyTemplate, templateValues),
    );

    setOpeningEmail(true);
    window.location.href = `mailto:${content.recipientEmail}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setOpeningEmail(false), 4000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-describedby="contact-form-note"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label htmlFor="contact-name" className="sr-only">
            {content.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            type="text"
            placeholder={content.namePlaceholder}
            required
            className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
          />
          <label htmlFor="contact-phone" className="sr-only">
            {content.phoneLabel}
          </label>
          <input
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            type="tel"
            placeholder={content.phonePlaceholder}
            className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
          />
        </div>
        <label htmlFor="contact-email" className="sr-only">
          {content.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder={content.emailPlaceholder}
          required
          className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
        />
        <label htmlFor="contact-message" className="sr-only">
          {content.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder={content.messagePlaceholder}
          className="w-full resize-none rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all hover:bg-red-700"
        >
          {openingEmail ? content.submittingLabel : content.submitLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p
        id="contact-form-note"
        className="mt-6 max-w-md text-sm font-light leading-relaxed text-black/70"
        role={openingEmail ? "status" : undefined}
      >
        {content.note}
      </p>
    </>
  );
}
