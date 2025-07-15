import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './config/schemas'
import { structure } from './config/structure'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  basePath: '/studio',
  
  plugins: [
    deskTool({
      structure,
    }), 
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Add environment-specific configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Development-specific settings
    cors: {
      credentials: 'include',
    },
  }),
}) 