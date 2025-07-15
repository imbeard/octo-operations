import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = "Home | " + siteConfig.title;
  const description = siteConfig.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
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
      <main className="min-h-screen md:h-screen bg-white pt-[18vh] md:pt-[15vh]">
        <div className="mx-auto px-3 h-full">
          <div className="flex h-full flex-col md:flex-row">
            {/* Projects Section - 4/5 width */}
            <div className="md:w-3/4 flex flex-col">
              <div className="relative md:overflow-y-scroll h-full md:h-[85vh]">
                <Link href="/projects">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase sticky top-[15vh] md:top-[0vh] z-10">
                    Projects
                  </h1>
                </Link>
                <div className="flex-1 overflow-y-scroll py-5">
                  <Projects projects={projects} />
                </div>
              </div>
            </div>

            {/* Labs Section - 1/5 width */}
            <div className="md:w-1/4 flex flex-col">
              <div className="relative h-full md:h-[85vh] md:overflow-y-scroll">
                <Link href="/lab">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase sticky top-[15vh] md:top-[0vh] z-10">
                    OCTO Lab
                  </h1>
                </Link>
                <div className="flex-1 overflow-y-scroll py-5 ">
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
