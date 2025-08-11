import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = "Projects";
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

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageLayout
      title="PROJECTS"
      logoSrc="/logo.svg"
      backgroundColor="bg-white"
      titleColor="text-black"
      contentLeftMargin="md:left-1/6"
      contentRightMargin="md:right-1/5"
      contentOverflow="overflow-x-scroll"
      >
        <Projects projects={projects} />
    </PageLayout>
  );
} 