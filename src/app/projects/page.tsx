import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();


  return {
    title: "Projects",
    description: "Explore our projects",
    openGraph: {
      title: "Projects",
      description: "Explore our projects",
      type: 'website',
      url: siteConfig.url + '/projects',
    }
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
      >
        <Projects projects={projects} />
    </PageLayout>
  );
} 