import type { Metadata } from "next";
import "./globals.css";
import { settingsQuery } from "@/sanity-studio/queries";
import { client } from "@/lib/sanity";
import { getSiteConfig, validateEnv } from "@/lib/env";
import Header from "@/components/Header";

// Validate environment variables in development
if (process.env.NODE_ENV === 'development') {
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="font-arial-narrow">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
