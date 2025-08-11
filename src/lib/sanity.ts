import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: '2025-02-19',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Image optimization helper
export function getOptimizedImageUrl(
  source: SanityImageSource,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  } = {}
) {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options

  let url = urlFor(source).format(format).quality(quality).fit(fit)

  if (width) url = url.width(width)
  if (height) url = url.height(height)

  return url.url()
}

// Error handling for Sanity queries
export async function safeQuery<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params || {})
    return result
  } catch (error) {
    console.error('Sanity query error:', error)
    return null
  }
}

// Type-safe image component props
export interface SanityImageProps {
  src: SanityImageSource
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

// Helper to get responsive image sizes
export function getResponsiveSizes(columns: number = 1): string {
  switch (columns) {
    case 1:
      return '(max-width: 768px) 100vw, 800px'
    case 2:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
    case 3:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    case 4:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }
} 