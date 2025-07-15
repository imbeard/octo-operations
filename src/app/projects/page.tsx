import { getSiteConfig } from "@/lib/env";
import Projects from "@/components/Projects";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = "Projects | " + siteConfig.title;
  const description = "Explore our projects";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteConfig.url + '/projects',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ProjectsPage() {
  return (
      <div className="mx-auto px-4">
        <div className="h-[82vh]">
          <Projects />
        </div>
      </div>
  );
} 