import { getSiteConfig } from "@/lib/env";
import Blog from "@/components/Blog";
import type { Metadata } from "next";

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

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
      type: 'website',
      url: siteConfig.url + '/blog',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BlogPage() {
  return (
      <div className="mx-auto px-4">
        <div className="h-[82vh]">
          <Blog />
        </div>
      </div>
  );
} 