import { client } from './sanity'
import { allProjectsQuery, projectQuery, allProjectSlugsQuery } from '@/sanity-studio/queries'
import type { AllProjectsQueryResult, ProjectQueryResult } from '@/sanity-studio/types'

export async function getAllProjects(): Promise<AllProjectsQueryResult> {
  return await client.fetch(allProjectsQuery)
}

export async function getProject(slug: string): Promise<ProjectQueryResult | null> {
  return await client.fetch(projectQuery, { slug })
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(allProjectSlugsQuery)
} 