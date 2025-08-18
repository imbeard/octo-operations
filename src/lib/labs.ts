import { client } from "./sanity";
import {
  allLabsQuery,
  labQuery,
  allLabSlugsQuery,
} from "@/sanity-studio/queries";
import type { AllLabsQueryResult, LabQueryResult } from "@/sanity-studio/types";

export async function getAllLabs(): Promise<AllLabsQueryResult> {
  return await client.fetch(
    allLabsQuery,
    {},
    {
      next: { tags: ["labs"], revalidate: 60 },
    },
  );
}

export async function getLab(slug: string): Promise<LabQueryResult | null> {
  return await client.fetch(
    labQuery,
    { slug },
    {
      next: { tags: [`lab-${slug}`], revalidate: 60 },
    },
  );
}

export async function getAllLabSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(
    allLabSlugsQuery,
    {},
    {
      next: { tags: ["lab-slugs"], revalidate: 60 },
    },
  );
}
