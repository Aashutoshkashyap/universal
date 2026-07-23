import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  Download,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Settings,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import uescLogo from "../../assets/images/UESC-logo4.png";
import campusAerial from "../../assets/images/hero1.webp";
import campusGarden from "../../assets/images/hero2.webp";
import collegeReception from "../../assets/images/hero3.webp";
import computerLab from "../../assets/images/hero4.webp";
import type { SiteIconKey, SiteImageKey } from "./site-content";

export const siteImages: Record<SiteImageKey, StaticImageData> = {
  "uesc-logo": uescLogo,
  "campus-aerial": campusAerial,
  "campus-garden": campusGarden,
  "college-reception": collegeReception,
  "computer-lab": computerLab,
  // Social metadata uses its explicit URL. The fallback keeps this semantic
  // key renderable if it is selected for a visible CMS image.
  "open-graph": campusAerial,
};

export const siteIcons: Record<SiteIconKey, LucideIcon> = {
  "arrow-right": ArrowRight,
  award: Award,
  "book-marked": BookMarked,
  "book-open": BookOpen,
  briefcase: Briefcase,
  building: Building2,
  "clipboard-list": ClipboardList,
  download: Download,
  flask: FlaskConical,
  "graduation-cap": GraduationCap,
  lightbulb: Lightbulb,
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
  rocket: Rocket,
  settings: Settings,
  sparkles: Sparkles,
  trophy: Trophy,
  wrench: Wrench,
};

export function getSiteImage(key: SiteImageKey) {
  return siteImages[key];
}

export function getSiteIcon(key: SiteIconKey) {
  return siteIcons[key];
}
