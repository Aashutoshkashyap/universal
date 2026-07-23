import { z } from "zod";

/**
 * CMS content is deliberately limited to copy, links, semantic image/icon keys,
 * visibility, and ordering. React components, Tailwind classes, breakpoints,
 * animation behavior, and icon/image imports remain code-owned.
 */
export const SITE_CONTENT_SCHEMA_VERSION = 1 as const;

export const SITE_IMAGE_KEYS = [
  "uesc-logo",
  "campus-aerial",
  "campus-garden",
  "college-reception",
  "computer-lab",
  "open-graph",
] as const;

export const SITE_ICON_KEYS = [
  "arrow-right",
  "award",
  "book-marked",
  "book-open",
  "briefcase",
  "building",
  "clipboard-list",
  "download",
  "flask",
  "graduation-cap",
  "lightbulb",
  "mail",
  "map-pin",
  "phone",
  "rocket",
  "settings",
  "sparkles",
  "trophy",
  "wrench",
] as const;

export const MAIN_SECTION_KEYS = [
  "hero",
  "about",
  "whyChoose",
  "academicPrograms",
  "careerDevelopment",
  "newsAndEvents",
  "testimonials",
  "faq",
] as const;

export const FOOTER_SECTION_KEYS = ["locations", "contact", "footer"] as const;

const textSchema = z.string().trim().min(1).max(500);
const optionalTextSchema = z.string().trim().max(500);
const longTextSchema = z.string().trim().min(1).max(5_000);
const templateTextSchema = z.string().min(1).max(8_000);
const identifierSchema = z
  .string()
  .trim()
  .regex(/^[a-z][a-z0-9-]*$/)
  .max(80);
const imageKeySchema = z.enum(SITE_IMAGE_KEYS);
const iconKeySchema = z.enum(SITE_ICON_KEYS);

export const siteHrefSchema = z
  .string()
  .trim()
  .min(1)
  .max(2_048)
  .refine((href) => {
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return true;
    }

    if (href.startsWith("/") && !href.startsWith("//")) {
      return true;
    }

    try {
      const url = new URL(href);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Links must be an anchor, relative path, mailto, tel, or HTTPS URL");

const imageSchema = z
  .object({
    key: imageKeySchema,
    alt: z.string().trim().max(300),
  })
  .strict();

const linkSchema = z
  .object({
    id: identifierSchema,
    label: textSchema,
    href: siteHrefSchema,
  })
  .strict();

const iconLinkSchema = linkSchema
  .extend({
    iconKey: iconKeySchema,
  })
  .strict();

const exactOrderSchema = <
  const T extends readonly [string, ...string[]],
>(
  keys: T,
) =>
  z
    .array(z.enum(keys))
    .length(keys.length)
    .superRefine((order, context) => {
      if (new Set(order).size !== keys.length) {
        context.addIssue({
          code: "custom",
          message: "Section order must contain every section exactly once",
        });
      }
      for (const key of keys) {
        if (!order.includes(key)) {
          context.addIssue({
            code: "custom",
            message: `Section order is missing ${key}`,
          });
        }
      }
    });

const contactValueSchema = z
  .object({
    id: identifierSchema,
    label: textSchema,
    href: siteHrefSchema,
  })
  .strict();

const seoSchema = z
  .object({
    title: z
      .object({
        default: textSchema,
        template: textSchema,
      })
      .strict(),
    description: longTextSchema,
    applicationName: textSchema,
    authors: z.array(textSchema).min(1).max(10),
    creator: textSchema,
    publisher: textSchema,
    canonical: siteHrefSchema,
    category: textSchema,
    openGraph: z
      .object({
        type: z.literal("website"),
        locale: textSchema,
        url: siteHrefSchema,
        siteName: textSchema,
        title: textSchema,
        description: longTextSchema,
        image: imageSchema,
        imageUrl: siteHrefSchema,
        imageWidth: z.number().int().min(1).max(8_000),
        imageHeight: z.number().int().min(1).max(8_000),
      })
      .strict(),
    twitter: z
      .object({
        card: z.literal("summary_large_image"),
        title: textSchema,
        description: longTextSchema,
        imageKey: imageKeySchema,
        imageUrl: siteHrefSchema,
      })
      .strict(),
    structuredData: z
      .object({
        context: z.literal("https://schema.org"),
        type: z.literal("CollegeOrUniversity"),
        id: siteHrefSchema,
        name: textSchema,
        alternateName: textSchema,
        url: siteHrefSchema,
        foundingDate: z.string().regex(/^\d{4}$/),
        description: longTextSchema,
        address: z
          .object({
            type: z.literal("PostalAddress"),
            streetAddress: textSchema,
            addressLocality: textSchema,
            addressRegion: textSchema,
            addressCountry: z.string().trim().length(2),
          })
          .strict(),
        telephone: z.array(textSchema).min(1).max(10),
        email: z.string().trim().email().max(320),
      })
      .strict(),
    robots: z
      .object({
        userAgent: textSchema,
        allow: siteHrefSchema,
        sitemap: siteHrefSchema,
        host: siteHrefSchema,
      })
      .strict(),
    sitemap: z
      .object({
        url: siteHrefSchema,
        changeFrequency: z.enum([
          "always",
          "hourly",
          "daily",
          "weekly",
          "monthly",
          "yearly",
          "never",
        ]),
        priority: z.number().min(0).max(1),
        imageKeys: z.array(imageKeySchema).max(20),
        imageUrls: z.array(siteHrefSchema).max(20),
      })
      .strict(),
  })
  .strict();

const topBarSchema = z
  .object({
    enabled: z.boolean(),
    phone: z
      .object({
        primaryLabel: textSchema,
        secondaryLabel: textSchema,
        href: siteHrefSchema,
        ariaLabel: textSchema,
      })
      .strict(),
    email: z
      .object({
        label: textSchema,
        href: siteHrefSchema,
      })
      .strict(),
    quickLinks: z.array(iconLinkSchema).max(12),
  })
  .strict();

const headerMenuGroupSchema = z
  .object({
    id: identifierSchema,
    label: textSchema,
    iconKey: iconKeySchema,
    featured: z.boolean(),
    links: z.array(linkSchema).max(12),
  })
  .strict();

const headerNavigationItemSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("link"),
      id: identifierSchema,
      label: textSchema,
      href: siteHrefSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("menu"),
      id: identifierSchema,
      label: textSchema,
      href: siteHrefSchema,
      ariaLabel: textSchema,
      eyebrow: textSchema,
      groups: z.array(headerMenuGroupSchema).max(8),
    })
    .strict(),
]);

const headerSchema = z
  .object({
    enabled: z.boolean(),
    brand: z
      .object({
        name: textSchema,
        href: siteHrefSchema,
        ariaLabel: textSchema,
        logo: imageSchema,
      })
      .strict(),
    primaryNavigationAriaLabel: textSchema,
    mobileNavigationAriaLabel: textSchema,
    menuButtonAriaLabel: textSchema,
    navigation: z.array(headerNavigationItemSchema).max(16),
    admissionCta: linkSchema,
  })
  .strict();

const heroSchema = z
  .object({
    enabled: z.boolean(),
    heading: textSchema,
    description: longTextSchema,
    primaryCta: linkSchema.extend({ iconKey: iconKeySchema }).strict(),
    secondaryCta: linkSchema.extend({ iconKey: iconKeySchema }).strict(),
    features: z
      .array(
        z
          .object({
            id: identifierSchema,
            label: textSchema,
            iconKey: iconKeySchema,
          })
          .strict(),
      )
      .max(12),
    carousel: z
      .object({
        slides: z
          .array(
            z
              .object({
                id: identifierSchema,
                image: imageSchema,
              })
              .strict(),
          )
          .min(1)
          .max(12),
        previousAriaLabel: textSchema,
        nextAriaLabel: textSchema,
        slideAriaLabelTemplate: textSchema,
        playAriaLabel: textSchema,
        pauseAriaLabel: textSchema,
      })
      .strict(),
  })
  .strict();

const aboutSchema = z
  .object({
    enabled: z.boolean(),
    eyebrow: textSchema,
    heading: textSchema,
    description: longTextSchema,
    primaryCta: linkSchema,
    secondaryCta: linkSchema,
    stats: z
      .array(
        z
          .object({
            id: identifierSchema,
            value: textSchema,
            label: textSchema,
            secondaryLabel: optionalTextSchema,
            iconKey: iconKeySchema,
          })
          .strict(),
      )
      .max(8),
    images: z
      .array(
        z
          .object({
            id: identifierSchema,
            image: imageSchema,
          })
          .strict(),
      )
      .max(8),
  })
  .strict();

const whyChooseSchema = z
  .object({
    enabled: z.boolean(),
    heading: textSchema,
    description: longTextSchema,
    cta: linkSchema,
    mediaCards: z
      .array(
        z
          .object({
            id: identifierSchema,
            eyebrow: textSchema,
            title: textSchema,
            image: imageSchema,
          })
          .strict(),
      )
      .max(8),
    benefits: z
      .array(
        z
          .object({
            id: identifierSchema,
            label: textSchema,
            iconKey: iconKeySchema,
          })
          .strict(),
      )
      .max(12),
  })
  .strict();

const programSchema = z
  .object({
    id: identifierSchema,
    title: textSchema,
    description: longTextSchema,
    image: imageSchema,
    cta: linkSchema,
  })
  .strict();

const academicProgramsSchema = z
  .object({
    enabled: z.boolean(),
    heading: textSchema,
    description: longTextSchema,
    groups: z
      .array(
        z
          .object({
            id: identifierSchema,
            anchorId: identifierSchema,
            heading: textSchema,
            programs: z.array(programSchema).max(20),
          })
          .strict(),
      )
      .max(8),
  })
  .strict();

const careerDevelopmentSchema = z
  .object({
    enabled: z.boolean(),
    eyebrow: textSchema,
    heading: textSchema,
    description: longTextSchema,
    stepButtonAriaLabelTemplate: textSchema,
    steps: z
      .array(
        z
          .object({
            id: identifierSchema,
            stage: textSchema,
            title: textSchema,
            description: longTextSchema,
            iconKey: iconKeySchema,
            tone: z.enum(["blue", "emerald", "orange", "red", "navy"]),
          })
          .strict(),
      )
      .min(1)
      .max(12),
  })
  .strict();

const newsAndEventsSchema = z
  .object({
    enabled: z.boolean(),
    eyebrow: textSchema,
    heading: textSchema,
    description: longTextSchema,
    allNoticesCta: linkSchema,
    cards: z
      .array(
        z
          .object({
            id: identifierSchema,
            title: textSchema,
            description: longTextSchema,
            ctaLabel: textSchema,
            href: siteHrefSchema,
            image: imageSchema,
          })
          .strict(),
      )
      .max(16),
  })
  .strict();

const experienceCardSchema = z
  .object({
    kind: z.literal("experience"),
    id: identifierSchema,
    code: textSchema,
    title: textSchema,
    label: textSchema,
    description: longTextSchema,
    tone: z.enum([
      "blue",
      "emerald",
      "orange",
      "red",
      "indigo",
      "purple",
      "teal",
    ]),
  })
  .strict();

const photoCardSchema = z
  .object({
    kind: z.literal("photo"),
    id: identifierSchema,
    eyebrow: textSchema,
    statement: textSchema,
    image: imageSchema,
  })
  .strict();

const testimonialsSchema = z
  .object({
    enabled: z.boolean(),
    eyebrow: textSchema,
    heading: textSchema,
    description: longTextSchema,
    columns: z
      .array(
        z
          .object({
            id: identifierSchema,
            cards: z
              .array(
                z.discriminatedUnion("kind", [
                  experienceCardSchema,
                  photoCardSchema,
                ]),
              )
              .max(12),
          })
          .strict(),
      )
      .max(6),
  })
  .strict();

const faqSchema = z
  .object({
    enabled: z.boolean(),
    eyebrow: textSchema,
    heading: textSchema,
    description: longTextSchema,
    items: z
      .array(
        z
          .object({
            id: identifierSchema,
            question: textSchema,
            answer: longTextSchema,
          })
          .strict(),
      )
      .max(30),
  })
  .strict();

const locationsSchema = z
  .object({
    enabled: z.boolean(),
    heading: textSchema,
    cards: z
      .array(
        z
          .object({
            id: identifierSchema,
            label: textSchema,
            iconKey: iconKeySchema,
            entries: z
              .array(
                z
                  .object({
                    id: identifierSchema,
                    text: textSchema,
                    href: siteHrefSchema.nullable(),
                  })
                  .strict(),
              )
              .max(12),
          })
          .strict(),
      )
      .max(8),
  })
  .strict();

const contactSchema = z
  .object({
    enabled: z.boolean(),
    heading: textSchema,
    description: longTextSchema,
    contactLinks: z.array(iconLinkSchema).max(12),
    form: z
      .object({
        recipientEmail: z.string().trim().email().max(320),
        nameLabel: textSchema,
        namePlaceholder: textSchema,
        phoneLabel: textSchema,
        phonePlaceholder: textSchema,
        emailLabel: textSchema,
        emailPlaceholder: textSchema,
        messageLabel: textSchema,
        messagePlaceholder: textSchema,
        submitLabel: textSchema,
        submittingLabel: textSchema,
        note: longTextSchema,
        subjectTemplate: templateTextSchema,
        bodyTemplate: templateTextSchema,
        emptyPhoneFallback: textSchema,
        emptyMessageFallback: textSchema,
      })
      .strict(),
  })
  .strict();

const footerLinkGroupSchema = z
  .object({
    id: identifierSchema,
    heading: textSchema,
    links: z.array(linkSchema).max(20),
  })
  .strict();

const footerSchema = z
  .object({
    enabled: z.boolean(),
    brand: z
      .object({
        name: textSchema,
        href: siteHrefSchema,
        ariaLabel: textSchema,
        logo: imageSchema,
      })
      .strict(),
    columns: z
      .array(
        z
          .object({
            id: identifierSchema,
            groups: z.array(footerLinkGroupSchema).max(8),
          })
          .strict(),
      )
      .max(8),
    chat: z
      .object({
        heading: textSchema,
        description: longTextSchema,
        cta: linkSchema,
        phoneHeading: textSchema,
        phones: z.array(contactValueSchema).max(10),
        emailHeading: textSchema,
        emails: z.array(contactValueSchema).max(10),
      })
      .strict(),
    copyrightTemplate: textSchema,
    bottomLinks: z.array(linkSchema).max(10),
  })
  .strict();

const aiSummarySchema = z
  .object({
    title: textSchema,
    summary: longTextSchema,
    establishedStatement: textSchema,
    programsHeading: textSchema,
    programs: z.array(textSchema).max(30),
    contactHeading: textSchema,
    links: z.array(linkSchema).max(20),
    email: z.string().trim().email().max(320),
    address: textSchema,
    disclaimer: longTextSchema,
  })
  .strict();

export const siteContentSchema = z
  .object({
    schemaVersion: z.literal(SITE_CONTENT_SCHEMA_VERSION),
    site: z
      .object({
        name: textSchema,
        shortName: textSchema,
        establishedYear: z.string().regex(/^\d{4}$/),
        affiliation: textSchema,
        officialUrl: siteHrefSchema,
        primaryEmail: z.string().trim().email().max(320),
        secondaryEmail: z.string().trim().email().max(320),
        phones: z.array(contactValueSchema).min(1).max(10),
        address: textSchema,
        mapUrl: siteHrefSchema,
      })
      .strict(),
    page: z
      .object({
        skipLinkLabel: textSchema,
        skipLinkHref: siteHrefSchema,
        mainSectionOrder: exactOrderSchema(MAIN_SECTION_KEYS),
        footerSectionOrder: exactOrderSchema(FOOTER_SECTION_KEYS),
      })
      .strict(),
    seo: seoSchema,
    aiSummary: aiSummarySchema,
    topBar: topBarSchema,
    header: headerSchema,
    hero: heroSchema,
    about: aboutSchema,
    whyChoose: whyChooseSchema,
    academicPrograms: academicProgramsSchema,
    careerDevelopment: careerDevelopmentSchema,
    newsAndEvents: newsAndEventsSchema,
    testimonials: testimonialsSchema,
    faq: faqSchema,
    locations: locationsSchema,
    contact: contactSchema,
    footer: footerSchema,
  })
  .strict();

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SiteImageKey = z.infer<typeof imageKeySchema>;
export type SiteIconKey = z.infer<typeof iconKeySchema>;

const rawDefaultSiteContent = {
  schemaVersion: SITE_CONTENT_SCHEMA_VERSION,
  site: {
    name: "Universal Engineering & Science College",
    shortName: "UESC",
    establishedYear: "2000",
    affiliation: "Pokhara University",
    officialUrl: "https://uesc.edu.np/",
    primaryEmail: "info@uesc.edu.np",
    secondaryEmail: "uscfoundation@gmail.com",
    phones: [
      {
        id: "landline-primary",
        label: "+977-1-5268419",
        href: "tel:+97715268419",
      },
      {
        id: "landline-secondary",
        label: "+977-1-5268592",
        href: "tel:+97715268592",
      },
      {
        id: "mobile",
        label: "+977 9869055176",
        href: "tel:+9779869055176",
      },
    ],
    address:
      "137/20, Manido Marg, Chakupat, Ward 11, Lalitpur Metropolitan City, Nepal",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Universal+Engineering+and+Science+College+Chakupat+Lalitpur",
  },
  page: {
    skipLinkLabel: "Skip to main content",
    skipLinkHref: "#main-content",
    mainSectionOrder: [
      "hero",
      "about",
      "whyChoose",
      "academicPrograms",
      "careerDevelopment",
      "newsAndEvents",
      "testimonials",
      "faq",
    ],
    footerSectionOrder: ["locations", "contact", "footer"],
  },
  seo: {
    title: {
      default: "Universal Engineering & Science College | UESC",
      template: "%s | UESC",
    },
    description:
      "Universal Engineering & Science College in Chakupat, Lalitpur offers engineering, architecture, and construction-management education affiliated with Pokhara University.",
    applicationName: "Universal Engineering & Science College",
    authors: ["Universal Engineering & Science College"],
    creator: "Universal Engineering & Science College",
    publisher: "Universal Engineering & Science College",
    canonical: "/",
    category: "education",
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: "/",
      siteName: "Universal Engineering & Science College",
      title: "Universal Engineering & Science College | UESC",
      description:
        "Engineering, architecture, research, and practical learning in Chakupat, Lalitpur.",
      image: {
        key: "open-graph",
        alt: "Universal Engineering & Science College in Chakupat, Lalitpur",
      },
      imageUrl:
        "https://portfolio-tawny-five-47.vercel.app/opengraph-image.png",
      imageWidth: 1200,
      imageHeight: 630,
    },
    twitter: {
      card: "summary_large_image",
      title: "Universal Engineering & Science College | UESC",
      description:
        "Engineering, architecture, research, and practical learning in Chakupat, Lalitpur.",
      imageKey: "open-graph",
      imageUrl:
        "https://portfolio-tawny-five-47.vercel.app/opengraph-image.png",
    },
    structuredData: {
      context: "https://schema.org",
      type: "CollegeOrUniversity",
      id: "https://uesc.edu.np/#college",
      name: "Universal Engineering & Science College",
      alternateName: "UESC",
      url: "https://uesc.edu.np/",
      foundingDate: "2000",
      description:
        "An engineering and science college in Chakupat, Lalitpur affiliated with Pokhara University.",
      address: {
        type: "PostalAddress",
        streetAddress: "137/20, Manido Marg, Chakupat, Ward 11",
        addressLocality: "Lalitpur",
        addressRegion: "Bagmati",
        addressCountry: "NP",
      },
      telephone: [
        "+977-1-5268419",
        "+977-1-5268592",
        "+977-9869055176",
      ],
      email: "info@uesc.edu.np",
    },
    robots: {
      userAgent: "*",
      allow: "/",
      sitemap: "https://uesc.edu.np/sitemap.xml",
      host: "https://uesc.edu.np",
    },
    sitemap: {
      url: "https://uesc.edu.np/",
      changeFrequency: "weekly",
      priority: 1,
      imageKeys: ["open-graph"],
      imageUrls: ["https://uesc.edu.np/opengraph-image.png"],
    },
  },
  aiSummary: {
    title: "Universal Engineering & Science College (UESC)",
    summary:
      "Official website summary for Universal Engineering & Science College in Chakupat, Lalitpur, Nepal.",
    establishedStatement:
      "UESC was established in 2000 and is affiliated with Pokhara University.",
    programsHeading: "Academic programs presented by UESC",
    programs: [
      "B.E. Computer Engineering",
      "B.E. Civil Engineering",
      "Bachelor of Architecture",
      "M.Sc. Construction Management",
      "M.Sc. Transportation Engineering and Management",
    ],
    contactHeading: "Contact",
    links: [
      {
        id: "official-website",
        label: "Official UESC website",
        href: "https://uesc.edu.np/",
      },
      {
        id: "admissions",
        label: "Admissions and applications",
        href: "https://uesc.edu.np/apply",
      },
      {
        id: "downloads",
        label: "Academic downloads",
        href: "https://uesc.edu.np/download",
      },
    ],
    email: "info@uesc.edu.np",
    address:
      "137/20, Manido Marg, Chakupat, Ward 11, Lalitpur Metropolitan City, Nepal",
    disclaimer:
      "Program availability, admissions, fees, scholarships, and deadlines should always be confirmed directly with the college.",
  },
  topBar: {
    enabled: true,
    phone: {
      primaryLabel: "+977-1-5268419",
      secondaryLabel: "+977 9869055176",
      href: "tel:+97715268419",
      ariaLabel: "Call UESC at +977-1-5268419 or +977 9869055176",
    },
    email: {
      label: "info@uesc.edu.np",
      href: "mailto:info@uesc.edu.np",
    },
    quickLinks: [
      {
        id: "admissions",
        iconKey: "clipboard-list",
        label: "Admissions",
        href: "https://uesc.edu.np/apply",
      },
      {
        id: "gyanyog",
        iconKey: "book-open",
        label: "Gyanyog",
        href: "https://uesc.edu.np/gyanyog",
      },
      {
        id: "career",
        iconKey: "briefcase",
        label: "Career",
        href: "#careers",
      },
      {
        id: "research",
        iconKey: "flask",
        label: "Research (ICAS)",
        href: "https://uesc.edu.np/icas",
      },
    ],
  },
  header: {
    enabled: true,
    brand: {
      name: "UESC",
      href: "#main-content",
      ariaLabel: "UESC home",
      logo: {
        key: "uesc-logo",
        alt: "",
      },
    },
    primaryNavigationAriaLabel: "Primary navigation",
    mobileNavigationAriaLabel: "Mobile navigation",
    menuButtonAriaLabel: "Menu",
    navigation: [
      {
        kind: "link",
        id: "home",
        label: "Home",
        href: "#main-content",
      },
      {
        kind: "link",
        id: "about",
        label: "About",
        href: "#about",
      },
      {
        kind: "menu",
        id: "academics",
        label: "Academics",
        href: "#academics",
        ariaLabel: "Academic links",
        eyebrow: "Academics Overview",
        groups: [
          {
            id: "programs",
            label: "Programs",
            iconKey: "graduation-cap",
            featured: false,
            links: [
              {
                id: "undergraduate",
                label: "Undergraduate",
                href: "#undergraduate",
              },
              {
                id: "graduate",
                label: "Graduate",
                href: "#graduate",
              },
              {
                id: "pokhara-university",
                label: "Pokhara University",
                href: "https://pu.edu.np/",
              },
            ],
          },
          {
            id: "departments",
            label: "Departments",
            iconKey: "building",
            featured: false,
            links: [
              {
                id: "civil-engineering",
                label: "Civil Engineering",
                href: "https://uesc.edu.np/civil",
              },
              {
                id: "computer-engineering",
                label: "Computer Engineering",
                href: "https://uesc.edu.np/computer",
              },
              {
                id: "architecture",
                label: "Architecture",
                href: "https://uesc.edu.np/architecture",
              },
            ],
          },
          {
            id: "resources",
            label: "Resources",
            iconKey: "book-marked",
            featured: false,
            links: [
              {
                id: "curriculum",
                label: "Curriculum",
                href: "https://uesc.edu.np/download",
              },
              {
                id: "academic-calendar",
                label: "Academic Calendar",
                href: "https://uesc.edu.np/download",
              },
              {
                id: "examinations",
                label: "Examinations",
                href: "https://uesc.edu.np/download",
              },
              {
                id: "downloads",
                label: "Downloads",
                href: "https://uesc.edu.np/download",
              },
            ],
          },
          {
            id: "featured",
            label: "Featured",
            iconKey: "sparkles",
            featured: true,
            links: [
              {
                id: "admissions",
                label: "Admissions",
                href: "https://uesc.edu.np/apply",
              },
              {
                id: "scholarship-info",
                label: "Scholarship Info",
                href: "https://uesc.edu.np/scholarship",
              },
            ],
          },
        ],
      },
      {
        kind: "link",
        id: "admissions",
        label: "Admissions",
        href: "https://uesc.edu.np/apply",
      },
      {
        kind: "link",
        id: "student-life",
        label: "Student Life",
        href: "#testimonials",
      },
      {
        kind: "link",
        id: "research",
        label: "Research",
        href: "https://uesc.edu.np/icas",
      },
      {
        kind: "link",
        id: "careers",
        label: "Careers",
        href: "#careers",
      },
      {
        kind: "link",
        id: "news-events",
        label: "News & Events",
        href: "#news",
      },
      {
        kind: "link",
        id: "contact",
        label: "Contact",
        href: "#contacts",
      },
    ],
    admissionCta: {
      id: "online-admission",
      label: "Online Admission",
      href: "https://uesc.edu.np/apply",
    },
  },
  hero: {
    enabled: true,
    heading:
      "Where Future Engineers, Innovators, and Leaders Begin Their Journey.",
    description:
      "Build a strong foundation through academic excellence, practical learning, research, and industry collaboration—preparing you for a future of innovation, leadership, and lifelong success.",
    primaryCta: {
      id: "apply-now",
      label: "Apply Now",
      href: "https://uesc.edu.np/apply",
      iconKey: "arrow-right",
    },
    secondaryCta: {
      id: "download-prospectus",
      label: "Download Prospectus",
      href: "https://uesc.edu.np/download",
      iconKey: "download",
    },
    features: [
      {
        id: "research-driven-learning",
        label: "Research-Driven Learning",
        iconKey: "book-open",
      },
      {
        id: "hands-on-engineering",
        label: "Hands-on Engineering",
        iconKey: "wrench",
      },
      {
        id: "industry-ready-skills",
        label: "Industry-Ready Skills",
        iconKey: "award",
      },
      {
        id: "innovation-communities",
        label: "Innovation & Student Communities",
        iconKey: "lightbulb",
      },
    ],
    carousel: {
      slides: [
        {
          id: "campus-aerial",
          image: {
            key: "campus-aerial",
            alt: "Aerial view of the UESC campus and courtyard in Chakupat, Lalitpur",
          },
        },
        {
          id: "campus-garden",
          image: {
            key: "campus-garden",
            alt: "UESC campus garden surrounded by academic buildings",
          },
        },
        {
          id: "college-reception",
          image: {
            key: "college-reception",
            alt: "Reception area at Universal Engineering and Science College",
          },
        },
        {
          id: "computer-lab",
          image: {
            key: "computer-lab",
            alt: "UESC students learning together in a computer laboratory",
          },
        },
      ],
      previousAriaLabel: "Previous image",
      nextAriaLabel: "Next image",
      slideAriaLabelTemplate: "Go to slide {number}",
      playAriaLabel: "Play campus slideshow",
      pauseAriaLabel: "Pause campus slideshow",
    },
  },
  about: {
    enabled: true,
    eyebrow: "ABOUT UESC",
    heading: "Shaping Engineers. Inspiring Innovation. Building Futures.",
    description:
      "Established in 2000, Universal Engineering & Science College (UESC) has been preparing future engineers through academic study, applied research, and practical learning. Located in Chakupat, Lalitpur, the college offers engineering and architecture programs affiliated with Pokhara University.",
    primaryCta: {
      id: "discover-story",
      label: "Discover Our Story",
      href: "https://uesc.edu.np/page/history",
    },
    secondaryCta: {
      id: "campus-life",
      label: "Explore Campus Life",
      href: "#testimonials",
    },
    stats: [
      {
        id: "years-excellence",
        value: "25+",
        label: "Years of Excellence",
        secondaryLabel: "",
        iconKey: "award",
      },
      {
        id: "current-programs",
        value: "5",
        label: "Current Programs",
        secondaryLabel: "",
        iconKey: "graduation-cap",
      },
      {
        id: "research-driven",
        value: "Research-Driven",
        label: "Education",
        secondaryLabel: "",
        iconKey: "rocket",
      },
    ],
    images: [
      {
        id: "campus-aerial",
        image: {
          key: "campus-aerial",
          alt: "Aerial view of the UESC campus",
        },
      },
      {
        id: "computer-lab",
        image: {
          key: "computer-lab",
          alt: "UESC students in a computer laboratory",
        },
      },
      {
        id: "college-reception",
        image: {
          key: "college-reception",
          alt: "Reception area at Universal Engineering and Science College",
        },
      },
    ],
  },
  whyChoose: {
    enabled: true,
    heading: "Why Choose UESC",
    description:
      "At UESC, education extends beyond earning a degree. We combine rigorous academics with practical learning, research, and industry engagement to help students develop the knowledge, skills, and confidence needed to solve real-world challenges and build meaningful careers. Every experience is designed to prepare you for success—inside the classroom and beyond.",
    cta: {
      id: "explore-programs",
      label: "Explore Our Programs",
      href: "#academics",
    },
    mediaCards: [
      {
        id: "central-campus",
        eyebrow: "UESC Campus",
        title: "Central Lalitpur Campus",
        image: {
          key: "campus-garden",
          alt: "Garden and academic buildings at the UESC campus",
        },
      },
      {
        id: "hands-on-learning",
        eyebrow: "Labs",
        title: "Hands-on Learning",
        image: {
          key: "computer-lab",
          alt: "Students working in the UESC computer laboratory",
        },
      },
      {
        id: "welcoming-support",
        eyebrow: "Student Services",
        title: "Welcoming Support",
        image: {
          key: "college-reception",
          alt: "Student services reception at UESC",
        },
      },
    ],
    benefits: [
      {
        id: "research-driven-learning",
        label: "Research-Driven Learning",
        iconKey: "flask",
      },
      {
        id: "practical-engineering",
        label: "Practical Engineering Experience",
        iconKey: "settings",
      },
      {
        id: "career-focused-development",
        label: "Career-Focused Development",
        iconKey: "briefcase",
      },
    ],
  },
  academicPrograms: {
    enabled: true,
    heading: "Academic Programs",
    description:
      "Whether you're passionate about designing infrastructure, developing intelligent technologies, shaping sustainable cities, or leading complex construction projects, UESC offers industry-focused programs that combine academic excellence with practical experience to prepare you for tomorrow's challenges.",
    groups: [
      {
        id: "undergraduate",
        anchorId: "undergraduate",
        heading: "Undergraduate Programs",
        programs: [
          {
            id: "computer-engineering",
            title: "B.E. Computer Engineering",
            description:
              "Build innovative software and hardware solutions while gaining practical experience in programming, systems design, networking, and emerging technologies. Prepare for careers in software development, AI, cybersecurity, and beyond.",
            image: {
              key: "computer-lab",
              alt: "Students learning in the UESC computer laboratory",
            },
            cta: {
              id: "computer-program",
              label: "Computer Program",
              href: "https://uesc.edu.np/computer",
            },
          },
          {
            id: "civil-engineering",
            title: "B.E. Civil Engineering",
            description:
              "Develop the expertise to plan, design, and build the infrastructure that powers communities. Learn through practical projects, modern laboratories, and industry-oriented education.",
            image: {
              key: "campus-aerial",
              alt: "Aerial view of the UESC campus and surrounding buildings",
            },
            cta: {
              id: "civil-program",
              label: "Civil Program",
              href: "https://uesc.edu.np/civil",
            },
          },
          {
            id: "architecture",
            title: "Bachelor of Architecture",
            description:
              "Blend creativity, engineering, and sustainable design to create functional, inspiring spaces. Gain the skills needed for careers in architecture, urban planning, and design consultancy.",
            image: {
              key: "campus-garden",
              alt: "UESC academic buildings arranged around the campus garden",
            },
            cta: {
              id: "architecture-program",
              label: "Architecture Program",
              href: "https://uesc.edu.np/architecture",
            },
          },
        ],
      },
      {
        id: "graduate",
        anchorId: "graduate",
        heading: "Graduate Programs",
        programs: [
          {
            id: "construction-management",
            title: "M.Sc. Construction Management",
            description:
              "Advance your expertise in project planning, construction leadership, resource management, and modern construction practices for senior industry roles.",
            image: {
              key: "college-reception",
              alt: "Reception area at Universal Engineering and Science College",
            },
            cta: {
              id: "construction-msc",
              label: "Construction M.Sc.",
              href: "https://uesc.edu.np/master_admission",
            },
          },
          {
            id: "transportation-engineering",
            title: "M.Sc. Transportation Engineering & Management",
            description:
              "Specialize in the planning, design, and management of transportation systems that support smarter, safer, and more sustainable mobility.",
            image: {
              key: "campus-aerial",
              alt: "Aerial perspective of the UESC campus and nearby road network",
            },
            cta: {
              id: "transportation-msc",
              label: "Transportation M.Sc.",
              href: "https://uesc.edu.np/master_admission",
            },
          },
        ],
      },
    ],
  },
  careerDevelopment: {
    enabled: true,
    eyebrow: "Career Development",
    heading: "Preparing You for\nSuccess Beyond\nGraduation",
    description:
      "Your journey at UESC extends far beyond the classroom. Through career guidance, practical learning, and industry engagement, we help students build the confidence and skills needed to thrive.",
    stepButtonAriaLabelTemplate: "Show {stage} information",
    steps: [
      {
        id: "foundation",
        stage: "Foundation",
        title: "Strong Academic Foundation",
        description:
          "Build the subject knowledge and study practices required by your chosen program. Each UESC program follows its own Pokhara University curriculum and schedule.",
        iconKey: "book-open",
        tone: "blue",
      },
      {
        id: "applied-learning",
        stage: "Applied Learning",
        title: "Laboratories & Technical Projects",
        description:
          "Move from theory into hands-on practice through laboratory work, technical exercises, and collaborative projects that strengthen core engineering skills.",
        iconKey: "flask",
        tone: "emerald",
      },
      {
        id: "engagement",
        stage: "Engagement",
        title: "Industry Exposure & Research",
        description:
          "Broaden your perspective through technical activities, workshops, and applied research initiatives, including opportunities connected with ICAS. Activities vary by program and academic year.",
        iconKey: "building",
        tone: "orange",
      },
      {
        id: "project-stage",
        stage: "Project Stage",
        title: "Capstone Project & Career Preparation",
        description:
          "Bring together your learning in a major project while developing the communication, teamwork, and professional preparation needed for employment or further study.",
        iconKey: "trophy",
        tone: "red",
      },
      {
        id: "next-step",
        stage: "Next Step",
        title: "Ready for Industry, Higher Studies & Innovation",
        description:
          "Graduate with technical knowledge, teamwork experience, and a professional mindset that can support a career, postgraduate study, or further innovation.",
        iconKey: "graduation-cap",
        tone: "navy",
      },
    ],
  },
  newsAndEvents: {
    enabled: true,
    eyebrow: "News & Resources",
    heading: "Stay Connected with What's Happening at UESC",
    description:
      "Follow official notices, admissions information, research activities, and academic resources from the UESC community.",
    allNoticesCta: {
      id: "all-notices",
      label: "All Notices",
      href: "https://uesc.edu.np/notice",
    },
    cards: [
      {
        id: "latest-notices",
        title: "Latest Notices",
        description:
          "Read the latest official announcements, results, schedules, and campus updates published by UESC.",
        ctaLabel: "View Notices",
        href: "https://uesc.edu.np/notice",
        image: {
          key: "campus-garden",
          alt: "Garden and academic buildings at the UESC campus",
        },
      },
      {
        id: "admissions",
        title: "Admissions",
        description:
          "Explore the official application form and contact the admissions team to confirm programs, eligibility, fees, and current deadlines.",
        ctaLabel: "Admission Details",
        href: "https://uesc.edu.np/apply",
        image: {
          key: "college-reception",
          alt: "Reception area where prospective UESC students can seek admission guidance",
        },
      },
      {
        id: "research-icas",
        title: "Research & ICAS",
        description:
          "Discover UESC's research, training, consulting, workshops, and applied-science activities through ICAS.",
        ctaLabel: "Explore ICAS",
        href: "https://uesc.edu.np/icas",
        image: {
          key: "computer-lab",
          alt: "UESC students collaborating in the computer laboratory",
        },
      },
      {
        id: "academic-downloads",
        title: "Academic Downloads",
        description:
          "Find program documents, syllabi, academic resources, and other official downloads in one place.",
        ctaLabel: "View Downloads",
        href: "https://uesc.edu.np/download",
        image: {
          key: "campus-aerial",
          alt: "Aerial view of the UESC campus in Chakupat, Lalitpur",
        },
      },
    ],
  },
  testimonials: {
    enabled: true,
    eyebrow: "Student Experience",
    heading: "Learn. Build. Collaborate.\nGrow.",
    description:
      "UESC presents an academic experience shaped by practical learning, research, technical activities, and professional preparation. Confirm current facilities and opportunities directly with the college when you apply.",
    columns: [
      {
        id: "column-one",
        cards: [
          {
            kind: "photo",
            id: "future-engineering",
            eyebrow: "UESC Campus",
            statement: "Building the future of\nengineering in Nepal.",
            image: {
              key: "campus-garden",
              alt: "UESC campus garden and academic buildings",
            },
          },
          {
            kind: "experience",
            id: "computer-engineering",
            code: "CE",
            title: "Computer Engineering",
            label: "Hardware and software",
            description:
              "Build foundations in programming, systems, networks, and computer hardware through technical study and practical learning.",
            tone: "blue",
          },
          {
            kind: "experience",
            id: "graduate-study",
            code: "PG",
            title: "Graduate Study",
            label: "Advanced specialization",
            description:
              "Deepen professional knowledge through construction-management and transportation-engineering pathways presented by UESC.",
            tone: "emerald",
          },
        ],
      },
      {
        id: "column-two",
        cards: [
          {
            kind: "experience",
            id: "civil-engineering",
            code: "CV",
            title: "Civil Engineering",
            label: "Infrastructure and fieldwork",
            description:
              "Connect engineering theory with structures, materials, surveying, construction management, and practical project work.",
            tone: "orange",
          },
          {
            kind: "experience",
            id: "career-development",
            code: "CD",
            title: "Career Development",
            label: "Professional preparation",
            description:
              "Strengthen communication, teamwork, and problem-solving alongside the technical skills expected in engineering practice.",
            tone: "red",
          },
          {
            kind: "experience",
            id: "project-based-learning",
            code: "FY",
            title: "Project-Based Learning",
            label: "From concept to application",
            description:
              "Apply classroom learning through design work, laboratories, technical activities, and collaborative projects.",
            tone: "indigo",
          },
        ],
      },
      {
        id: "column-three",
        cards: [
          {
            kind: "experience",
            id: "architecture",
            code: "AR",
            title: "Architecture",
            label: "Creative and technical design",
            description:
              "Explore functional, sustainable design by bringing together architecture, engineering, art, and planning.",
            tone: "purple",
          },
          {
            kind: "photo",
            id: "real-world-impact",
            eyebrow: "Hands-on Learning",
            statement: "Turning ideas into\nreal-world impact.",
            image: {
              key: "computer-lab",
              alt: "UESC students working together in a computer laboratory",
            },
          },
          {
            kind: "experience",
            id: "student-communities",
            code: "SC",
            title: "Student Communities",
            label: "Leadership and collaboration",
            description:
              "Grow beyond the classroom through clubs, technical events, collaborative activities, and student-led learning.",
            tone: "teal",
          },
        ],
      },
    ],
  },
  faq: {
    enabled: true,
    eyebrow: "Frequently Asked Questions",
    heading: "Have Questions?\nWe're Here to Help.",
    description:
      "Find answers to some of the most frequently asked questions about admissions, academic programs, campus life, scholarships, and student services. If you need further assistance, our admissions team is always ready to help.",
    items: [
      {
        id: "programs",
        question: "What programs does UESC offer?",
        answer:
          "UESC offers undergraduate and postgraduate programs in engineering, architecture, and construction-related disciplines. Visit our Academic Programs page to explore all available courses and eligibility requirements.",
      },
      {
        id: "apply",
        question: "How can I apply for admission?",
        answer:
          "You can apply online through the UESC admission portal or visit the admissions office for in-person guidance. Our team will assist you throughout the application process.",
      },
      {
        id: "scholarships",
        question: "Are scholarships available?",
        answer:
          "Yes. UESC offers scholarships based on merit and other applicable criteria. Scholarship opportunities, eligibility requirements, and application details are available on our Admissions page.",
      },
      {
        id: "affiliation",
        question: "Is UESC affiliated with Pokhara University?",
        answer:
          "Yes. Universal Engineering & Science College (UESC) is affiliated with Pokhara University. Contact the college to confirm the current affiliation and curriculum for your intended program.",
      },
      {
        id: "practical-learning",
        question: "Does UESC provide practical learning opportunities?",
        answer:
          "UESC's program information describes laboratory work, projects, workshops, and applied learning alongside classroom study. Confirm the current activities and facilities for your intended program directly with the college.",
      },
      {
        id: "facilities",
        question: "What student facilities are available on campus?",
        answer:
          "UESC provides classrooms, engineering laboratories, a library, and spaces that support academic activities. Contact the college or arrange a campus visit to confirm the facilities available for your program.",
      },
      {
        id: "career-support",
        question: "Does UESC support internships and career development?",
        answer:
          "Yes. UESC encourages industry engagement through career guidance, technical workshops, professional development activities, and practical learning experiences that prepare students for future careers.",
      },
      {
        id: "contact-admissions",
        question: "How can I contact the admissions office?",
        answer:
          "You can contact UESC through the official admission page, by phone or email, or by visiting the campus. Confirm current office hours before travelling.",
      },
    ],
  },
  locations: {
    enabled: true,
    heading: "Find Us",
    cards: [
      {
        id: "location",
        label: "Location",
        iconKey: "map-pin",
        entries: [
          {
            id: "street",
            text: "137/20, Manido Marg, Chakupat,",
            href: null,
          },
          {
            id: "city",
            text: "Ward 11, Lalitpur Metropolitan City,",
            href: null,
          },
          {
            id: "country",
            text: "Nepal",
            href: null,
          },
        ],
      },
      {
        id: "phone",
        label: "Call Us",
        iconKey: "phone",
        entries: [
          {
            id: "landline-primary",
            text: "+977-1-5268419",
            href: "tel:+97715268419",
          },
          {
            id: "landline-secondary",
            text: "+977-1-5268592",
            href: "tel:+97715268592",
          },
          {
            id: "mobile",
            text: "+977 9869055176",
            href: "tel:+9779869055176",
          },
        ],
      },
      {
        id: "email",
        label: "Email Us",
        iconKey: "mail",
        entries: [
          {
            id: "foundation-email",
            text: "uscfoundation@gmail.com",
            href: "mailto:uscfoundation@gmail.com",
          },
          {
            id: "primary-email",
            text: "info@uesc.edu.np",
            href: "mailto:info@uesc.edu.np",
          },
        ],
      },
    ],
  },
  contact: {
    enabled: true,
    heading: "Get in Touch",
    description:
      "Ask about academic programs, admissions, eligibility, scholarships, or campus visits. The admissions team can help you plan your next step.",
    contactLinks: [
      {
        id: "landline-primary",
        iconKey: "phone",
        label: "+977-1-5268419",
        href: "tel:+97715268419",
      },
      {
        id: "landline-secondary",
        iconKey: "phone",
        label: "+977-1-5268592",
        href: "tel:+97715268592",
      },
      {
        id: "email",
        iconKey: "mail",
        label: "info@uesc.edu.np",
        href: "mailto:info@uesc.edu.np",
      },
      {
        id: "location",
        iconKey: "map-pin",
        label: "Chakupat, Lalitpur, Nepal",
        href: "https://www.google.com/maps/search/?api=1&query=Universal+Engineering+and+Science+College+Chakupat+Lalitpur",
      },
    ],
    form: {
      recipientEmail: "info@uesc.edu.np",
      nameLabel: "Your name",
      namePlaceholder: "Your Name",
      phoneLabel: "Phone or WhatsApp number",
      phonePlaceholder: "Phone / WhatsApp",
      emailLabel: "Email address",
      emailPlaceholder: "Email Address",
      messageLabel: "Your message",
      messagePlaceholder: "Your Message...",
      submitLabel: "Email Admissions",
      submittingLabel: "Opening Email App…",
      note:
        "Submitting this form opens your email app with the message prepared for info@uesc.edu.np. You can review it before sending.",
      subjectTemplate: "UESC website enquiry from {name}",
      bodyTemplate:
        "Name: {name}\nEmail: {email}\nPhone / WhatsApp: {phone}\n\nMessage:\n{message}",
      emptyPhoneFallback: "Not provided",
      emptyMessageFallback:
        "I would like more information about UESC.",
    },
  },
  footer: {
    enabled: true,
    brand: {
      name: "UESC",
      href: "#main-content",
      ariaLabel: "UESC home",
      logo: {
        key: "uesc-logo",
        alt: "",
      },
    },
    columns: [
      {
        id: "get-started-column",
        groups: [
          {
            id: "get-started",
            heading: "Get Started",
            links: [
              {
                id: "home",
                label: "Home",
                href: "#main-content",
              },
              {
                id: "about-us",
                label: "About Us",
                href: "#about",
              },
              {
                id: "admissions",
                label: "Admissions",
                href: "https://uesc.edu.np/apply",
              },
              {
                id: "contact-admissions",
                label: "Contact Admissions",
                href: "#contacts",
              },
            ],
          },
        ],
      },
      {
        id: "college-admissions-column",
        groups: [
          {
            id: "college",
            heading: "College",
            links: [
              {
                id: "about-uesc",
                label: "About UESC",
                href: "#about",
              },
              {
                id: "academic-programs",
                label: "Academic Programs",
                href: "#academics",
              },
              {
                id: "student-experience",
                label: "Student Experience",
                href: "#testimonials",
              },
              {
                id: "research-icas",
                label: "Research & ICAS",
                href: "https://uesc.edu.np/icas",
              },
              {
                id: "news-notices",
                label: "News & Notices",
                href: "https://uesc.edu.np/notice",
              },
            ],
          },
          {
            id: "admissions",
            heading: "Admissions",
            links: [
              {
                id: "apply-online",
                label: "Apply Online",
                href: "https://uesc.edu.np/apply",
              },
              {
                id: "scholarships",
                label: "Scholarships",
                href: "https://uesc.edu.np/scholarship",
              },
              {
                id: "downloads",
                label: "Downloads",
                href: "https://uesc.edu.np/download",
              },
              {
                id: "contact",
                label: "Contact",
                href: "#contacts",
              },
            ],
          },
        ],
      },
      {
        id: "quick-links-column",
        groups: [
          {
            id: "quick-links",
            heading: "Quick Links",
            links: [
              {
                id: "academics",
                label: "Academics",
                href: "#academics",
              },
              {
                id: "campus-location",
                label: "Campus Location",
                href: "https://www.google.com/maps/search/?api=1&query=Universal+Engineering+and+Science+College+Chakupat+Lalitpur",
              },
              {
                id: "research-icas",
                label: "Research (ICAS)",
                href: "https://uesc.edu.np/icas",
              },
              {
                id: "gyanyog",
                label: "Gyanyog",
                href: "https://uesc.edu.np/gyanyog",
              },
              {
                id: "career-development",
                label: "Career Development",
                href: "#careers",
              },
              {
                id: "latest-notices",
                label: "Latest Notices",
                href: "https://uesc.edu.np/notice",
              },
              {
                id: "pokhara-university",
                label: "Pokhara University",
                href: "https://pu.edu.np/",
              },
              {
                id: "downloads",
                label: "Downloads",
                href: "https://uesc.edu.np/download",
              },
            ],
          },
        ],
      },
    ],
    chat: {
      heading: "Let's Chat",
      description: "Have a question or need support? We're here to help.",
      cta: {
        id: "get-in-touch",
        label: "Get in Touch",
        href: "#contacts",
      },
      phoneHeading: "Call Us",
      phones: [
        {
          id: "landline-primary",
          label: "+977-1-5268419",
          href: "tel:+97715268419",
        },
        {
          id: "landline-secondary",
          label: "+977-1-5268592",
          href: "tel:+97715268592",
        },
        {
          id: "mobile",
          label: "+977 9869055176",
          href: "tel:+9779869055176",
        },
      ],
      emailHeading: "Email",
      emails: [
        {
          id: "primary-email",
          label: "info@uesc.edu.np",
          href: "mailto:info@uesc.edu.np",
        },
        {
          id: "foundation-email",
          label: "uscfoundation@gmail.com",
          href: "mailto:uscfoundation@gmail.com",
        },
      ],
    },
    copyrightTemplate:
      "© {year} UESC — Universal Engineering & Science College. All rights reserved.",
    bottomLinks: [
      {
        id: "official-website",
        label: "Official UESC Website",
        href: "https://uesc.edu.np/",
      },
      {
        id: "pokhara-university",
        label: "Pokhara University",
        href: "https://pu.edu.np/",
      },
    ],
  },
} satisfies SiteContent;

/**
 * Runtime-validated defaults. Keeping this parse at module initialization makes
 * schema/default drift fail during development rather than after a CMS write.
 */
export const defaultSiteContent: SiteContent =
  siteContentSchema.parse(rawDefaultSiteContent);

type UnknownRecord = Record<string, unknown>;
type ContentPath = Array<string | number>;

function isPlainRecord(value: unknown): value is UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function cloneContentValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneContentValue(item)) as T;
  }

  if (isPlainRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        cloneContentValue(item),
      ]),
    ) as T;
  }

  return value;
}

/**
 * Merges only keys that exist in the defaults. Unknown and prototype-polluting
 * keys are discarded. Arrays are replaced atomically and then validated.
 */
function deepMergeKnown(defaultValue: unknown, incomingValue: unknown): unknown {
  if (incomingValue === undefined) {
    return cloneContentValue(defaultValue);
  }

  if (Array.isArray(defaultValue)) {
    return Array.isArray(incomingValue)
      ? cloneContentValue(incomingValue)
      : incomingValue;
  }

  if (isPlainRecord(defaultValue)) {
    if (!isPlainRecord(incomingValue)) {
      return incomingValue;
    }

    const merged: UnknownRecord = {};
    for (const [key, childDefault] of Object.entries(defaultValue)) {
      if (Object.prototype.hasOwnProperty.call(incomingValue, key)) {
        merged[key] = deepMergeKnown(childDefault, incomingValue[key]);
      } else {
        merged[key] = cloneContentValue(childDefault);
      }
    }
    return merged;
  }

  return incomingValue;
}

function readPath(
  value: unknown,
  path: ContentPath,
): { found: boolean; value: unknown } {
  let cursor = value;

  for (const segment of path) {
    if (
      (typeof segment === "string" &&
        (segment === "__proto__" ||
          segment === "prototype" ||
          segment === "constructor")) ||
      cursor === null ||
      typeof cursor !== "object" ||
      !Object.prototype.hasOwnProperty.call(cursor, segment)
    ) {
      return { found: false, value: undefined };
    }
    cursor = (cursor as Record<string | number, unknown>)[segment];
  }

  return { found: true, value: cursor };
}

function writePath(
  target: unknown,
  path: ContentPath,
  replacement: unknown,
): boolean {
  if (path.length === 0) return false;

  const parentResult = readPath(target, path.slice(0, -1));
  if (
    !parentResult.found ||
    parentResult.value === null ||
    typeof parentResult.value !== "object"
  ) {
    return false;
  }

  const finalSegment = path[path.length - 1];
  if (
    typeof finalSegment === "string" &&
    (finalSegment === "__proto__" ||
      finalSegment === "prototype" ||
      finalSegment === "constructor")
  ) {
    return false;
  }

  (parentResult.value as Record<string | number, unknown>)[finalSegment] =
    replacement;
  return true;
}

function restoreDefaultAtPath(
  target: unknown,
  issuePath: ContentPath,
): unknown {
  for (let length = issuePath.length; length >= 0; length -= 1) {
    const candidatePath = issuePath.slice(0, length);
    const defaultResult = readPath(defaultSiteContent, candidatePath);
    if (!defaultResult.found) continue;

    if (candidatePath.length === 0) {
      return cloneContentValue(defaultSiteContent);
    }

    if (
      writePath(
        target,
        candidatePath,
        cloneContentValue(defaultResult.value),
      )
    ) {
      return target;
    }
  }

  return cloneContentValue(defaultSiteContent);
}

export type SiteContentParseResult = {
  data: SiteContent;
  usedFallbacks: boolean;
  fallbackPaths: string[];
};

/**
 * Accepts an unknown/partial database payload, fills missing keys, ignores
 * unknown keys, and restores only invalid paths to their defaults. If an
 * unrecoverable root error remains, the complete default document is returned.
 */
export function parseSiteContentWithReport(
  input: unknown,
): SiteContentParseResult {
  let candidate = deepMergeKnown(defaultSiteContent, input);
  const fallbackPaths = new Set<string>();

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const result = siteContentSchema.safeParse(candidate);
    if (result.success) {
      return {
        data: result.data,
        usedFallbacks: fallbackPaths.size > 0,
        fallbackPaths: [...fallbackPaths],
      };
    }

    for (const issue of result.error.issues) {
      const issuePath = issue.path as ContentPath;
      fallbackPaths.add(
        issuePath.length === 0 ? "$" : issuePath.join("."),
      );
      candidate = restoreDefaultAtPath(candidate, issuePath);
    }
  }

  return {
    data: cloneContentValue(defaultSiteContent),
    usedFallbacks: true,
    fallbackPaths: [...fallbackPaths, "$"],
  };
}

export function parseSiteContent(input: unknown): SiteContent {
  return parseSiteContentWithReport(input).data;
}
