import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  about: {
    title: string;
    description: string;
    highlight: string;
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  contact: {
    email: string;
    phone: string;
    address: string;
    github: string;
    linkedin: string;
  };
}

const LOCAL_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

const isKvConfigured = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

export async function getContent(): Promise<SiteContent> {
  if (isKvConfigured()) {
    try {
      const content = await kv.get<SiteContent>('site_content');
      if (content) {
        return content;
      }
    } catch (e) {
      console.error('Error fetching from Vercel KV, falling back to local file:', e);
    }
  }

  try {
    const rawData = fs.readFileSync(LOCAL_FILE_PATH, 'utf-8');
    return JSON.parse(rawData);
  } catch (e) {
    console.error('Error reading local content file, using hardcoded fallback:', e);
    return {
      hero: {
        title: "Crafting Digital Experiences with Precision",
        subtitle: "Hi, I'm a software engineer and designer. I build modern, interactive, and high-performance web applications that make an impact.",
        primaryCta: "Explore Projects",
        secondaryCta: "Contact Me"
      },
      features: [
        {
          icon: "Zap",
          title: "Blazing Performance",
          description: "Optimized for speed, SEO, and maximum responsiveness across all devices."
        },
        {
          icon: "Layers",
          title: "3D Depth Design",
          description: "Immersive layered components with premium animations and visual weight."
        },
        {
          icon: "Shield",
          title: "Robust & Secure",
          description: "Clean TypeScript code structures with reliable database persistence."
        }
      ],
      about: {
        title: "Sophisticated Design Meets Clean Architecture",
        description: "I believe that beautiful websites shouldn't compromise on speed or structural integrity. By leveraging cutting-edge web technologies like Next.js and custom CSS animation engines, I craft applications that perform as beautifully as they look.\n\nEvery project is tailored with dynamic admin controls, letting you edit headings, details, and items in real-time with zero technical overhead.",
        highlight: "Dynamic. Responsive. Premium."
      },
      services: [],
      contact: {
        email: "contact@example.com",
        phone: "+1 (555) 019-2834",
        address: "San Francisco, CA",
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    };
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (isKvConfigured()) {
    try {
      await kv.set('site_content', content);
      console.log('Saved content to Vercel KV');
    } catch (e) {
      console.error('Error saving to Vercel KV:', e);
      throw e;
    }
  }

  try {
    const dir = path.dirname(LOCAL_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Saved content to local file');
  } catch (e) {
    console.error('Error writing to local file:', e);
    if (!isKvConfigured()) {
      throw e;
    }
  }
}
