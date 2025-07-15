// Environment variable types for type safety

export interface EnvironmentConfig {
  // Site Configuration
  siteUrl: string;
  siteEnv: 'development' | 'production';
  siteTitle: string;
  siteDescription: string;
  
  // Sanity Configuration
  sanityProjectId: string;
  sanityDataset: string;
  sanityApiToken?: string;
  
  // Environment flags
  isDevelopment: boolean;
  isProduction: boolean;
  
  // Feature flags
  enableAnalytics: boolean;
  enableDebug: boolean;
}

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
  requestTimeout: number;
}

export interface SiteConfig {
  url: string;
  environment: 'development' | 'production';
  title: string;
  description: string;
}

// Environment variable validation types
export type RequiredEnvVars = 
  | 'SANITY_STUDIO_PROJECT_ID'
  | 'SANITY_STUDIO_DATASET'
  | 'NEXT_PUBLIC_SITE_URL'
  | 'NEXT_PUBLIC_SITE_TITLE'
  | 'NEXT_PUBLIC_SITE_DESCRIPTION';

export type OptionalEnvVars = 
  | 'SANITY_STUDIO_CORS_ORIGIN'
  | 'SANITY_API_TOKEN'
  | 'NEXT_PUBLIC_SITE_ENV'
  | 'NEXT_PUBLIC_ENABLE_ANALYTICS'
  | 'NEXT_PUBLIC_ENABLE_DEBUG';

export type AllEnvVars = RequiredEnvVars | OptionalEnvVars; 