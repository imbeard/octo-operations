import { getSiteConfig } from "@/lib/env";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = "OCTO Lab";
  const description = "Read our latest blog posts";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteConfig.url + "/blog",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BlogPage() {
  return (
    <PageLayout
      title="OCTO LAB"
      logoSrc="/logo_w.svg"
      backgroundColor="bg-[#000000]"
      titleColor="text-white"
      contentLeftMargin="md:left-1/6"
      contentRightMargin="md:right-1/6"
      contentOverflow="overflow-y-auto"
    >
      <Blog />
    </PageLayout>
  );
}
