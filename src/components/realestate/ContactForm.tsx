"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [openingEmail, setOpeningEmail] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`UESC website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone / WhatsApp: ${phone || "Not provided"}\n\nMessage:\n${message || "I would like more information about UESC."}`,
    );

    setOpeningEmail(true);
    window.location.href = `mailto:info@uesc.edu.np?subject=${subject}&body=${body}`;
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
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
          />
          <label htmlFor="contact-phone" className="sr-only">
            Phone or WhatsApp number
          </label>
          <input
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            type="tel"
            placeholder="Phone / WhatsApp"
            className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
          />
        </div>
        <label htmlFor="contact-email" className="sr-only">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
        />
        <label htmlFor="contact-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Your Message..."
          className="w-full resize-none rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm text-black placeholder-black/55 transition-colors focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all hover:bg-red-700"
        >
          {openingEmail ? "Opening Email App…" : "Email Admissions"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p
        id="contact-form-note"
        className="mt-6 max-w-md text-sm font-light leading-relaxed text-black/70"
        role={openingEmail ? "status" : undefined}
      >
        Submitting this form opens your email app with the message prepared for
        info@uesc.edu.np. You can review it before sending.
      </p>
    </>
  );
}
