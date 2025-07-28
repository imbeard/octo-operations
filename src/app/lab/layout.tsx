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

export default async function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout
      title="OCTO LAB"
      logoSrc="/logo_w.svg"
      backgroundColor="bg-accent"
      titleColor="text-white"
      contentLeftMargin="md:left-1/4"
      contentRightMargin="md:right-1/4"
      contentOverflow="overflow-y-auto"
    >
      {children}
    </PageLayout>
  );
}
