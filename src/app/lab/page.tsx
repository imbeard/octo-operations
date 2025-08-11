import { getSiteConfig } from "@/lib/env";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();


  return {
    title: siteConfig.title + " | OCTO LAB",
    description: siteConfig.description + " | OCTO LAB",
    openGraph: {
      title: siteConfig.title + " | OCTO LAB",
      description: "Read our latest blog posts",
      type: "website",
      url: siteConfig.url + "/blog",
    }
  };
}

export default function BlogPage() {
  return (
    <PageLayout
      title="OCTO LAB"
      logoSrc="/logo_w.svg"
      backgroundColor="bg-primary"
      titleColor="text-white"
    >
      <Blog />
    </PageLayout>
  );
}
