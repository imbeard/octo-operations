import { client } from './sanity'
import { allProjectsQuery, projectQuery, allProjectSlugsQuery } from '@/sanity-studio/queries'
import type { AllProjectsQueryResult, ProjectQueryResult } from '@/sanity-studio/types'

export async function getAllProjects(): Promise<AllProjectsQueryResult> {
  return await client.fetch(allProjectsQuery, {}, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    next: process.env.NODE_ENV === 'production' ? { tags: ['projects'] } : undefined
  })
}

export async function getProject(slug: string): Promise<ProjectQueryResult | null> {
  return await client.fetch(projectQuery, { slug }, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    next: process.env.NODE_ENV === 'production' ? { tags: [`project-${slug}`] } : undefined
  })
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(allProjectSlugsQuery, {}, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    next: process.env.NODE_ENV === 'production' ? { tags: ['project-slugs'] } : undefined
  })
} 