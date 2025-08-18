import { client } from "./sanity";
import {
  allProjectsQuery,
  projectQuery,
  allProjectSlugsQuery,
} from "@/sanity-studio/queries";
import type {
  AllProjectsQueryResult,
  ProjectQueryResult,
} from "@/sanity-studio/types";

export async function getAllProjects(): Promise<AllProjectsQueryResult> {
  try {
    const result = await client.fetch(
      allProjectsQuery,
      {},
      {
        next: { tags: ["projects"], revalidate: 60 },
      },
    );

    if (!result) {
      console.warn("Failed to fetch projects, returning empty array");
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Return empty array as fallback
  }
}

export async function getProject(
  slug: string,
): Promise<ProjectQueryResult | null> {
  try {
    const result = await client.fetch(
      projectQuery,
      { slug },
      {
        next: { tags: [`project-${slug}`], revalidate: 60 },
      },
    );

    return result;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  try {
    const result = await client.fetch(
      allProjectSlugsQuery,
      {},
      {
        next: { tags: ["project-slugs"], revalidate: 60 },
      },
    );

    if (!result) {
      console.warn("Failed to fetch project slugs, returning empty array");
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return []; // Return empty array as fallback
  }
}
