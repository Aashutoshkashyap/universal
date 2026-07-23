import { Fragment, type ReactNode } from "react";
import About from "@/components/realestate/About";
import AcademicPrograms from "@/components/realestate/AcademicPrograms";
import CareerDevelopment from "@/components/realestate/CareerDevelopment";
import FAQ from "@/components/realestate/FAQ";
import {
  ContactSection,
  LocationsSection,
  SiteFooter,
} from "@/components/realestate/Footer";
import Header from "@/components/realestate/Header";
import Hero from "@/components/realestate/Hero";
import NewsAndEvents from "@/components/realestate/NewsAndEvents";
import Testimonials from "@/components/realestate/Testimonials";
import TopBar from "@/components/realestate/TopBar";
import WhyChooseUESC from "@/components/realestate/WhyChooseUESC";
import {
  FOOTER_SECTION_KEYS,
  MAIN_SECTION_KEYS,
  type SiteContent,
} from "@/lib/site-content";
import { getSiteContent } from "@/lib/site-content-store";

type MainSectionKey = (typeof MAIN_SECTION_KEYS)[number];
type FooterSectionKey = (typeof FOOTER_SECTION_KEYS)[number];

function getStructuredData(content: SiteContent) {
  const data = content.seo.structuredData;

  return {
    "@context": data.context,
    "@type": data.type,
    "@id": data.id,
    name: data.name,
    alternateName: data.alternateName,
    url: data.url,
    foundingDate: data.foundingDate,
    description: data.description,
    address: {
      "@type": data.address.type,
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      addressCountry: data.address.addressCountry,
    },
    telephone: data.telephone,
    email: data.email,
  };
}

function getMainSections(content: SiteContent): Record<MainSectionKey, ReactNode> {
  return {
    hero: content.hero.enabled ? <Hero content={content.hero} /> : null,
    about: <About content={content.about} />,
    whyChoose: <WhyChooseUESC content={content.whyChoose} />,
    academicPrograms: (
      <AcademicPrograms content={content.academicPrograms} />
    ),
    careerDevelopment: (
      <CareerDevelopment content={content.careerDevelopment} />
    ),
    newsAndEvents: <NewsAndEvents content={content.newsAndEvents} />,
    testimonials: <Testimonials content={content.testimonials} />,
    faq: <FAQ content={content.faq} />,
  };
}

function getFooterSections(
  content: SiteContent,
): Record<FooterSectionKey, ReactNode> {
  return {
    locations: <LocationsSection content={content.locations} />,
    contact: <ContactSection content={content.contact} />,
    footer: <SiteFooter content={content.footer} />,
  };
}

export default async function Home() {
  const content = await getSiteContent();
  const mainSections = getMainSections(content);
  const footerSections = getFooterSections(content);
  const structuredData = getStructuredData(content);

  return (
    <div className="bg-white text-black antialiased">
      <a
        href={content.page.skipLinkHref}
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-[#0A3073] shadow-lg focus:not-sr-only"
      >
        {content.page.skipLinkLabel}
      </a>
      <script
        id="uesc-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {content.topBar.enabled ? <TopBar content={content.topBar} /> : null}
      {content.header.enabled ? (
        <Header
          content={content.header}
          hasTopBar={content.topBar.enabled}
        />
      ) : null}
      <main id="main-content">
        {content.page.mainSectionOrder.map((sectionKey) => (
          <Fragment key={sectionKey}>{mainSections[sectionKey]}</Fragment>
        ))}
      </main>
      {content.page.footerSectionOrder.map((sectionKey) => (
        <Fragment key={sectionKey}>{footerSections[sectionKey]}</Fragment>
      ))}
    </div>
  );
}
