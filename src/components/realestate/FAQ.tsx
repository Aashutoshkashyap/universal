"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What programs does UESC offer?",
      a: "UESC offers undergraduate and postgraduate programs in engineering, architecture, and construction-related disciplines. Visit our Academic Programs page to explore all available courses and eligibility requirements."
    },
    {
      q: "How can I apply for admission?",
      a: "You can apply online through the UESC admission portal or visit the admissions office for in-person guidance. Our team will assist you throughout the application process."
    },
    {
      q: "Are scholarships available?",
      a: "Yes. UESC offers scholarships based on merit and other applicable criteria. Scholarship opportunities, eligibility requirements, and application details are available on our Admissions page."
    },
    {
      q: "Is UESC affiliated with Tribhuvan University?",
      a: "Yes. Universal Engineering & Science College (UESC) is affiliated with Tribhuvan University and follows its academic curriculum and examination system."
    },
    {
      q: "Does UESC provide practical learning opportunities?",
      a: "Yes. Students gain hands-on experience through modern laboratories, design projects, workshops, field visits, research activities, and technical events that complement classroom learning."
    },
    {
      q: "What student facilities are available on campus?",
      a: "UESC provides modern classrooms, engineering laboratories, a library, student clubs, recreational spaces, and other facilities that support both academic and personal development."
    },
    {
      q: "Does UESC support internships and career development?",
      a: "Yes. UESC encourages industry engagement through career guidance, technical workshops, professional development activities, and practical learning experiences that prepare students for future careers."
    },
    {
      q: "How can I contact the admissions office?",
      a: "You can reach the admissions team through the Contact page, by phone, email, or by visiting the campus during office hours. Our counselors are available to answer your questions and guide you through the admission process."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Header - Left Column on Desktop */}
        <div className="lg:w-1/3 sticky top-24">
          <div className="mb-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                Frequently Asked Questions
              </span>
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl lg:text-5xl text-black leading-tight"
            >
              Have Questions?<br />We're Here to Help.
            </h2>
            <p className="text-[15px] text-black/60 font-light leading-relaxed mt-2">
              Find answers to some of the most frequently asked questions about admissions, academic programs, campus life, scholarships, and student services. If you need further assistance, our admissions team is always ready to help.
            </p>
          </div>
        </div>

        {/* Accordion - Right Column on Desktop */}
        <div className="lg:w-2/3 w-full border-t border-black/10">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b border-black/10"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <h3 className="text-lg sm:text-xl text-black font-semibold pr-8 group-hover:text-red-600 transition-colors">
                  {faq.q}
                </h3>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors text-black/40 bg-white">
                  {openIdx === idx ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIdx === idx ? "max-h-[300px] opacity-100 pb-8" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[15px] text-black/65 font-light leading-relaxed pr-12">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
