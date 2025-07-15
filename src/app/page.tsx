import { getSiteConfig } from "@/lib/env";
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

export default function Home() {
  return (
    <>
      <Header />

      {/* Main content */}
      <main className="h-screen bg-white pt-[15vh] overflow-hidden">
        <div className="mx-auto px-3 h-full">
          <div className="flex h-full">
            {/* Projects Section - 4/5 width */}
            <div className="w-3/4 flex flex-col">
              <Link href="/projects">
                <h1 className="text-5xl font-bold text-gray-900 mb-4 uppercase">
                  Projects
                </h1>
              </Link>
              <div className="flex-1 overflow-y-auto">
                <Projects />
              </div>
            </div>

            {/* Labs Section - 1/5 width */}
            <div className="w-1/4 flex flex-col">
              <Link href="/lab">
                <h1 className="text-5xl font-bold text-gray-900 mb-4 uppercase">
                  OCTO Lab
                </h1>
              </Link>
              <div className="flex-1 overflow-y-auto">
                <Blog />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
