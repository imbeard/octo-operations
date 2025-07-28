import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = siteConfig.title;
  const description = siteConfig.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <Header />

      {/* Main content */}
      <main className="min-h-screen md:h-screen fixed left-0 w-full">
        <div className="mx-auto px-3 h-full">
          <div className="flex h-full flex-col md:flex-row">
            {/* Projects Section - 4/5 width */}
            <div className="md:w-3/4 flex flex-col">
              <div className="relative md:overflow-y-scroll h-full">
                <Link href="/projects">
                  <h1 className="text-4xl w-fit md:text-5xl font-bold text-primary md:text-black mb-4 uppercase sticky top-[15vh] z-30 hover:text-[black]">
                    Projects
                  </h1>
                </Link>
                <div className="flex-1 overflow-y-visible pb-5 pt-[15vh]">
                  <Projects projects={projects} />
                </div>
              </div>
            </div>

            {/* Labs Section - 1/5 width */}
            <div className="md:w-1/4 flex flex-col">
              <div className="relative h-full md:overflow-y-scroll">
                <Link href="/lab">
                  <h1 className="text-4xl w-fit md:text-5xl font-bold text-primary md:text-black mb-4 uppercase sticky top-[15vh] z-30 hover:text-[black]">
                    OCTO Lab
                  </h1>
                </Link>
                <div className="flex-1 overflow-y-scroll pb-5 pt-[15vh]">
                  <Blog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
