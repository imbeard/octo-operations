import { settingsQuery } from "@/sanity-studio/queries";
import { client } from "@/lib/sanity";
import type { NavigationItem, NavigationLink } from "@/sanity-studio/types";

// Cache for navigation data
type NavigationSettings = {
  title?: string;
  mainNavigation?: NavigationItem[];
  footerNavigation?: NavigationItem[];
} | null;
let navigationCache: NavigationSettings = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getNavigation() {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (navigationCache && now - cacheTimestamp < CACHE_DURATION) {
      return navigationCache;
    }

    const settings = await client.fetch(
      settingsQuery,
      {},
      {
        next: { tags: ["settings"], revalidate: 60 },
      },
    );

    // Cache the result
    navigationCache = settings;
    cacheTimestamp = now;

    return settings;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

// Memoized href generation
const hrefCache = new Map<string, string>();

export function getHref(link: NavigationLink): string {
  const cacheKey = JSON.stringify(link);

  if (hrefCache.has(cacheKey)) {
    return hrefCache.get(cacheKey)!;
  }

  let href: string;
  if (link.type === "internal") {
    href = `/${link.internalLink?.slug?.current || ""}`;
  } else if (link.type === "internalPath") {
    href = link.internalPath || "#";
  } else if (link.type === "external") {
    href = link.externalUrl || "#";
  } else {
    href = "#";
  }

  hrefCache.set(cacheKey, href);
  return href;
}

// Helper function to get link props for external links
export function getLinkProps(link: NavigationLink) {
  if (link.type === "external") {
    return {
      target: "_blank" as const,
      rel: "noopener noreferrer" as const,
    };
  }
  return {};
}

// Memoized mobile navigation processing
const mobileNavCache = new Map<string, NavigationItem[]>();

export function getMobileNavItems(
  navigation: NavigationItem[],
): NavigationItem[] {
  const cacheKey = JSON.stringify(
    navigation.map((item) => ({
      label: item.label,
      children: item.children?.length,
    })),
  );

  if (mobileNavCache.has(cacheKey)) {
    return mobileNavCache.get(cacheKey)!;
  }

  const result = navigation.map((item) => ({
    ...item,
    // Ensure mobile-friendly labels
    label:
      item.label.length > 20 ? item.label.substring(0, 20) + "..." : item.label,
  }));

  mobileNavCache.set(cacheKey, result);
  return result;
}

export function shouldShowMobileMenu(navigation: NavigationItem[]): boolean {
  // Show mobile menu if there are more than 3 items or any items with children
  return (
    navigation.length > 3 ||
    navigation.some((item) => item.children && item.children.length > 0)
  );
}

// Clear cache function for development
export function clearNavigationCache() {
  navigationCache = null;
  cacheTimestamp = 0;
  hrefCache.clear();
  mobileNavCache.clear();
}
