import type { EnvironmentConfig, SanityConfig, SiteConfig } from './env.types';

// Environment configuration for Next.js app
export const env: EnvironmentConfig = {
  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  siteEnv: (process.env.NEXT_PUBLIC_SITE_ENV || 'development') as 'development' | 'production',
  siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE!,
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  
  // Sanity Configuration
  sanityProjectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  sanityDataset: process.env.SANITY_STUDIO_DATASET!,
  sanityApiToken: process.env.SANITY_API_TOKEN,
  
  // Environment flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Feature flags
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDebug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
}

// Helper functions
export const getSanityConfig = (): SanityConfig => ({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2025-02-19',
  useCdn: env.isProduction,
  requestTimeout: 30000,
})

export const getSiteConfig = (): SiteConfig => ({
  url: env.siteUrl,
  environment: env.siteEnv,
  title: env.siteTitle,
  description: env.siteDescription,
})

// Validation function to ensure required environment variables are set
export const validateEnv = () => {
  const required = [
    'SANITY_STUDIO_PROJECT_ID',
    'SANITY_STUDIO_DATASET',
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SITE_TITLE',
    'NEXT_PUBLIC_SITE_DESCRIPTION',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return true
} 