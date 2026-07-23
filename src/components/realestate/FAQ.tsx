import { ArrowRight } from "lucide-react";

export default function FAQ() {
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
      q: "Is UESC affiliated with Pokhara University?",
      a: "Yes. Universal Engineering & Science College (UESC) is affiliated with Pokhara University. Contact the college to confirm the current affiliation and curriculum for your intended program."
    },
    {
      q: "Does UESC provide practical learning opportunities?",
      a: "UESC's program information describes laboratory work, projects, workshops, and applied learning alongside classroom study. Confirm the current activities and facilities for your intended program directly with the college."
    },
    {
      q: "What student facilities are available on campus?",
      a: "UESC provides classrooms, engineering laboratories, a library, and spaces that support academic activities. Contact the college or arrange a campus visit to confirm the facilities available for your program."
    },
    {
      q: "Does UESC support internships and career development?",
      a: "Yes. UESC encourages industry engagement through career guidance, technical workshops, professional development activities, and practical learning experiences that prepare students for future careers."
    },
    {
      q: "How can I contact the admissions office?",
      a: "You can contact UESC through the official admission page, by phone or email, or by visiting the campus. Confirm current office hours before travelling."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Header - Left Column on Desktop */}
        <div className="lg:sticky lg:top-24 lg:w-1/3">
          <div className="mb-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                Frequently Asked Questions
              </span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl lg:text-5xl text-black leading-tight"
            >
              Have Questions?<br />We&apos;re Here to Help.
            </h2>
            <p className="text-[15px] text-black/60 font-light leading-relaxed mt-2">
              Find answers to some of the most frequently asked questions about admissions, academic programs, campus life, scholarships, and student services. If you need further assistance, our admissions team is always ready to help.
            </p>
          </div>
        </div>

        {/* Accordion - Right Column on Desktop */}
        <div className="lg:w-2/3 w-full border-t border-black/10">
          {faqs.map((faq, idx) => (
            <details
              key={faq.q}
              name="uesc-faq"
              open={idx === 0}
              className="group border-b border-black/10"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between py-6 text-left [&::-webkit-details-marker]:hidden">
                <h3
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-2xl sm:text-[26px] text-black pr-8 group-hover:text-red-600 transition-colors"
                >
                  {faq.q}
                </h3>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-black transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-open:rotate-90 group-open:bg-red-600 group-open:text-white">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </summary>
              
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:pb-8 group-open:opacity-100">
                <div className="overflow-hidden">
                <p className="text-[15px] text-black/65 font-light leading-relaxed pr-12">
                  {faq.a}
                </p>
                </div>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
