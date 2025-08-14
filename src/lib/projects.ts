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
  return await client.fetch(
    allProjectsQuery,
    {},
    {
      cache: "no-store",
      next: { tags: ["projects"], revalidate: 60 },
    },
  );
}

export async function getProject(
  slug: string,
): Promise<ProjectQueryResult | null> {
  return await client.fetch(
    projectQuery,
    { slug },
    {
      cache: "no-store",
      next: { tags: [`project-${slug}`], revalidate: 60 },
    },
  );
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(
    allProjectSlugsQuery,
    {},
    {
      cache: "no-store",
      next: { tags: ["project-slugs"], revalidate: 60 },
    },
  );
}
