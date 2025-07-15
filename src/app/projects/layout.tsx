import type { Metadata } from "next";
import { settingsQuery } from "@/sanity-studio/queries";
import { client } from "@/lib/sanity";
import { getSiteConfig, validateEnv } from "@/lib/env";
import Image from "next/image";
import Link from "next/link";

// Validate environment variables in development
if (process.env.NODE_ENV === "development") {
  validateEnv();
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(settingsQuery);
  const siteConfig = getSiteConfig();

  return {
    title: {
      template: `%s | ${siteConfig.title}`,
      default: settings?.title || siteConfig.title,
    },
    description: settings?.description || siteConfig.description,
  };
}

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white relative">
      {/* Fixed Logo */}
      <div className="fixed top-0 left-0 py-2 w-1/5 md:w-1/5 z-10">
        <Link href="/">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
            <Image
              src="/logo.svg"
              alt="OCTO Logo"
              width={38}
              height={59}
              className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-16"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Fixed Content */}
      <div className="fixed top-0 left-0 md:left-1/6 right-0 md:right-1/5 h-full overflow-x-scroll md:overflow-x-scroll pt-16 md:pt-20">
        {children}
      </div>

      {/* Fixed Title */}
      <div className="fixed top-0 right-4 py-2 min-w-max md:w-1/5 z-10">
          <h1 className="text-4xl md:text-5xl text-black font-bold text-right leading-tight">PROJECTS</h1>
      </div>
    </main>
  );
}
