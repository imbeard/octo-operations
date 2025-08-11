import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import { getNavigation } from "@/lib/navigation";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import Popup from "@/components/ui/Popup";

// Enable ISR with revalidation
export const revalidate = 1800; // Revalidate every 30 minutes

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();

  return {
    title: siteConfig.title || "OCTO",
    description: siteConfig.description || "OCTO Operations",
    openGraph: {
      title: siteConfig.title || "OCTO",
      description: siteConfig.description || "OCTO Operations",
      type: "website",
      url: siteConfig.url,
    },
  };
}


export default async function Home() {
  const projects = await getAllProjects();
  const settings = await getNavigation();

  return (
    <>
      <Header settings={settings} className="fixed top-0 left-0 z-20"  />

      {/* Main */}
      <main className="min-h-screen md:h-screen relative left-0 w-full">
        <div className="mx-auto px-3 h-full">
          <div className="flex h-full flex-col md:flex-row">
            {/* Projects Section */}
            <HomeSection title="Projects" href="/projects" width="md:w-3/4 flex flex-col">
              <Projects projects={projects} />
            </HomeSection>

            {/* Labs Section */}
            <HomeSection title="OCTO Lab" href="/lab" width="md:w-1/4 flex flex-col">
              <Blog />
            </HomeSection>
          </div>
        </div>
      </main>

      <Popup settings={settings} />
    </>
  );
}

function HomeSection({ 
  title, 
  href, 
  children, 
  width 
}: { 
  title: string; 
  href: string; 
  children: React.ReactNode; 
  width: string; 
}) {
  return (
    <div className={width}>
      <div className="h-full md:overflow-y-scroll">
        <Link href={href}>
          <h1 className="text-4xl w-fit md:text-5xl font-bold text-black mb-4 uppercase sticky top-[15vh] hover:text-primary z-30">
            {title}
          </h1>
        </Link>
        <div className="flex-1 md:overflow-y-scroll pb-5 pt-[15vh]">
          {children}
        </div>
      </div>
    </div>
  );
}


