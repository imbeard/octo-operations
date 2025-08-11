import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();

  return {
    title: "OCTO",
    description: "OCTO",
    openGraph: {
      title: "OCTO",
      description: "OCTO",
      type: "website",
      url: siteConfig.url,
    }
  };
}

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <Header className="fixed top-0 left-0 z-20" />

      {/* Main */}
      <div className="min-h-screen md:h-screen relative left-0 w-full">
        <div className="mx-auto px-3 h-full">
          <div className="flex h-full flex-col md:flex-row">
            {/* Projects Section */}
            <div className="md:w-3/4 flex flex-col">
              <div className=" md:overflow-y-scroll h-full">
                <Link href="/projects">
                  <h1 className="text-4xl w-fit md:text-5xl font-bold text-black mb-4 uppercase sticky top-[15vh] hover:text-primary z-30">
                    Projects
                  </h1>
                </Link>
                <div className="flex-1 md:overflow-y-scroll pb-5 pt-[15vh]">
                  <Projects projects={projects} />
                </div>
              </div>
            </div>

            {/* Labs Section */}
            <div className="md:w-1/4 flex flex-col">
              <div className="relative h-full md:overflow-y-scroll border">
                <Link href="/lab">
                  <h1 className="text-4xl w-fit md:text-5xl font-bold text-black mb-4 uppercase sticky top-[15vh] hover:text-primary z-30">
                    OCTO Lab
                  </h1>
                </Link>
                <div className="flex-1 md:overflow-y-scroll pb-5 pt-[15vh]">
                  <Blog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
