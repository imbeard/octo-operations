// Environment configuration for Sanity Studio
export const environment = {
  // Sanity Configuration
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: '2024-01-01',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Studio Configuration
  studioTitle: process.env.SANITY_STUDIO_TITLE,
  studioBasePath: '/studio',
  
  // Performance Settings
  useCdn: process.env.NODE_ENV === 'production',
  requestTimeout: 30000,
  
  // CORS Settings (for development)
  corsOrigin: process.env.SANITY_STUDIO_CORS_ORIGIN || 'http://localhost:3000',
}

// Helper functions
export const getClientConfig = () => ({
  projectId: environment.projectId,
  dataset: environment.dataset,
  apiVersion: environment.apiVersion,
  useCdn: environment.useCdn,
  requestTimeout: environment.requestTimeout,
})

export const getStudioConfig = () => ({
  name: 'default',
  title: environment.studioTitle,
  projectId: environment.projectId,
  dataset: environment.dataset,
  basePath: environment.studioBasePath,
}) 