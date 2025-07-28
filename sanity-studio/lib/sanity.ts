import { createClient } from '@sanity/client'
import { urlFor as enhancedUrlFor } from './image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const config = {
  dataset: process.env.SANITY_STUDIO_DATASET,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  apiVersion: '2025-02-19',
  useCdn: process.env.NODE_ENV === 'production',
  // Add request timeout
  requestTimeout: 30000,
}

export const sanityClient = createClient(config)

// Re-export the enhanced urlFor function
export const urlFor = enhancedUrlFor

// Enhanced optimized image URL builder with automatic optimization
export function optimizedUrlFor(source: SanityImageSource, options?: {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
}) {
  let image = enhancedUrlFor(source)
  
  if (options?.width) image = image.width(options.width)
  if (options?.height) image = image.height(options.height)
  if (options?.quality) image = image.quality(options.quality)
  if (options?.format) image = image.format(options.format)
  
  return image
}

// New: Client for preview mode
export const previewClient = createClient({
  ...config,
  useCdn: false, // Always fetch fresh data in preview mode
})

// New: Helper function to get the appropriate client
export function getClient(preview = false) {
  return preview ? previewClient : sanityClient
} 