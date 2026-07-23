import About from "@/components/realestate/About";
import AcademicPrograms from "@/components/realestate/AcademicPrograms";
import CareerDevelopment from "@/components/realestate/CareerDevelopment";
import FAQ from "@/components/realestate/FAQ";
import Footer from "@/components/realestate/Footer";
import Header from "@/components/realestate/Header";
import Hero from "@/components/realestate/Hero";
import NewsAndEvents from "@/components/realestate/NewsAndEvents";
import Testimonials from "@/components/realestate/Testimonials";
import TopBar from "@/components/realestate/TopBar";
import WhyChooseUESC from "@/components/realestate/WhyChooseUESC";

const collegeStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": "https://uesc.edu.np/#college",
  name: "Universal Engineering & Science College",
  alternateName: "UESC",
  url: "https://uesc.edu.np/",
  foundingDate: "2000",
  description:
    "An engineering and science college in Chakupat, Lalitpur affiliated with Pokhara University.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "137/20, Manido Marg, Chakupat, Ward 11",
    addressLocality: "Lalitpur",
    addressRegion: "Bagmati",
    addressCountry: "NP",
  },
  telephone: ["+977-1-5268419", "+977-1-5268592", "+977-9869055176"],
  email: "info@uesc.edu.np",
};

export default function Home() {
  return (
    <div className="bg-white text-black antialiased">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-[#0A3073] shadow-lg focus:not-sr-only"
      >
        Skip to main content
      </a>
      <script
        id="uesc-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collegeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <TopBar />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <WhyChooseUESC />
        <AcademicPrograms />
        <CareerDevelopment />
        <NewsAndEvents />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
