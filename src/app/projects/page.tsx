import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

// Use ISR with revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();

  return {
    title: siteConfig.title + " | Projects",
    description: siteConfig.description + " | Projects",
    openGraph: {
      title: siteConfig.title + " | Projects",
      description: siteConfig.description + " | Projects",
      type: "website",
      url: siteConfig.url + "/projects",
    },
  };
}

export default async function ProjectsPage() {
  try {
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
  } catch (error) {
    console.error("Error in ProjectsPage:", error);

    // Return fallback UI during build failures
    return (
      <PageLayout
        title="PROJECTS"
        logoSrc="/logo.svg"
        backgroundColor="bg-white"
        titleColor="text-black"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Projects will be available shortly.</p>
        </div>
      </PageLayout>
    );
  }
}
