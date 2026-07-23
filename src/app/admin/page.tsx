import type { Metadata } from "next";
import {
  AdminContentEditor,
  type SiteContent as EditableSiteContent,
} from "@/components/admin";
import { getSiteContent } from "@/lib/site-content-store";
import { defaultSiteContent } from "@/lib/site-content";
import { requireAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website content",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  await requireAdmin();
  const content = await getSiteContent();

  return (
    <AdminContentEditor
      initialContent={content as unknown as EditableSiteContent}
      templateContent={defaultSiteContent as unknown as EditableSiteContent}
      endpoint="/api/admin/content"
      logoutHref="/api/admin/logout"
      title="Website content"
      description="Manage every public section, navigation link, image, SEO field, and visible content item without changing the approved page layout."
    />
  );
}
