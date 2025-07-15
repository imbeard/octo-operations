import { client } from './sanity'
import { allLabsQuery, labQuery, allLabSlugsQuery } from '@/sanity-studio/queries'
import type { AllLabsQueryResult, LabQueryResult } from '@/sanity-studio/types'

export async function getAllLabs(): Promise<AllLabsQueryResult> {
  return await client.fetch(allLabsQuery)
}

export async function getLab(slug: string): Promise<LabQueryResult | null> {
  return await client.fetch(labQuery, { slug })
}

export async function getAllLabSlugs(): Promise<{ slug: string }[]> {
  return await client.fetch(allLabSlugsQuery)
} 