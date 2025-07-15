import { PageQueryResult, HomePageQueryResult, SettingsQueryResult } from "../types";

// Environment configuration
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE!;
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION!;

export function generatePageMetadata({
  page,
  settings,
  slug,
}: {
  page: PageQueryResult | HomePageQueryResult;
  settings: SettingsQueryResult;
  slug: string;
}) {
  // SEO fallback logic: page-specific > global defaults > fallback values
  const seoTitle = page?.seoTitle || page?.title || settings?.title || siteTitle;
  
  const seoDescription = page?.description || settings?.description || siteDescription;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `${settings?.siteUrl || siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
      url: `${settings?.siteUrl || siteUrl}/${slug === "index" ? "" : slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${settings?.siteUrl || siteUrl}/og-image.jpg`],
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : "index, follow",
    alternates: {
      canonical: `${settings?.siteUrl || siteUrl}/${slug === "index" ? "" : slug}`,
    },
  };
}

export function generateSiteMetadata(settings: SettingsQueryResult) {
  return {
    title: {
      default: settings?.title || siteTitle,
      template: `%s | ${settings?.title || siteTitle}`
    },
    description: settings?.description || siteDescription,
    keywords: ['octo operations', 'operations', 'business', 'technology'],
    authors: [{ name: settings?.title || siteTitle }],
    creator: settings?.title || siteTitle,
    metadataBase: new URL(settings?.siteUrl || siteUrl),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: settings?.siteUrl || siteUrl,
      siteName: settings?.title || siteTitle,
      title: settings?.title || siteTitle,
      description: settings?.description || siteDescription,
      images: [
        {
          url: `${settings?.siteUrl || siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.title || siteTitle,
      description: settings?.description || siteDescription,
      images: [`${settings?.siteUrl || siteUrl}/og-image.jpg`],
    },
    robots: {
      index: isProduction,
      follow: isProduction,
      googleBot: {
        index: isProduction,
        follow: isProduction,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
