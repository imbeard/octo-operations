import { client } from './sanity'
import { allProjectsQuery, projectQuery, allProjectSlugsQuery } from '@/sanity-studio/queries'
import type { AllProjectsQueryResult, ProjectQueryResult } from '@/sanity-studio/types'

export async function getAllProjects(): Promise<AllProjectsQueryResult> {
  return await client.fetch(allProjectsQuery, {}, {
    cache: 'force-cache',
    next: { tags: ['projects'] }
  })
}

export async function getProject(slug: string): Promise<ProjectQueryResult | null> {
  return await client.fetch(projectQuery, { slug }, {
    cache: 'force-cache',
    next: { tags: [`project-${slug}`] }
  })
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(allProjectSlugsQuery, {}, {
    cache: 'force-cache',
    next: { tags: ['project-slugs'] }
  })
} 