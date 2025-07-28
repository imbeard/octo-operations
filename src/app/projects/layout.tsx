import type { Metadata } from "next";
import { settingsQuery } from "@/sanity-studio/queries";
import { client } from "@/lib/sanity";
import { getSiteConfig, validateEnv } from "@/lib/env";
import PageLayout from "@/components/PageLayout";

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
    <PageLayout
      title="PROJECTS"
      logoSrc="/logo.svg"
      backgroundColor="bg-white"
      titleColor="text-black"
      contentLeftMargin="md:left-1/6"
      contentRightMargin="md:right-1/5"
      contentOverflow="overflow-x-scroll"
    >
      {children}
    </PageLayout>
  );
}
