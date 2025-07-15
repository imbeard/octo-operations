// Enhanced TypeScript types for Sanity Studio

// Base Sanity types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Image asset type
export interface SanityImageAsset {
  _id: string
  _type: 'sanity.imageAsset'
  url: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
    palette: {
      dominant: {
        background: string
        foreground: string
      }
    }
  }
}

// Block types
export interface SectionBlock {
  _type: 'sectionBlock'
  _key: string
  title?: string
  subtitle?: string
  description?: string
  image?: SanityImageAsset
  imageAlt?: string
  imageDescription?: string
}

export interface TwoImageBlock {
  _type: 'twoImageBlock'
  _key: string
  image1?: SanityImageAsset
  caption1?: string
  alt1?: string
  image2?: SanityImageAsset
  caption2?: string
  alt2?: string
}

// Union type for all block types
export type ContentBlock = SectionBlock | TwoImageBlock

// Page types
export interface Page extends SanityDocument {
  _type: 'page'
  title: string
  slug: {
    current: string
  }
  subtitle: string
  description?: string
  seoTitle?: string
  heroImage?: SanityImageAsset
  sections?: ContentBlock[]
}

// Settings types
export interface Settings extends SanityDocument {
  _type: 'settings'
  // General Settings
  title?: string
  description?: string
  siteUrl?: string
  // Services
  services?: string[]
  // Contact Information
  contactEmail?: string
  contactAddress?: string
  contactLocation?: string
}

// Project types
export interface Project extends SanityDocument {
  _type: 'project'
  projectNumber: string
  title: string
  slug: {
    current: string
  }
  description?: string
  images?: ProjectImage[]
  seoTitle?: string
  seoDescription?: string
}

export interface ProjectImage {
  _key: string
  image: {
    asset: SanityImageAsset
  }
  description?: string
}

// Navigation types
export interface NavigationItem {
  label: string
  multiple?: boolean
  link?: NavigationLink
  children?: NavigationItem[]
}

export interface NavigationLink {
  type: 'internal' | 'internalPath' | 'external'
  internalLink?: {
    slug: {
      current: string
    }
  }
  internalPath?: string
  externalUrl?: string
  openInNewTab?: boolean
}

// Query result types
export interface HomePageQueryResult {
  _id: string
  title: string
  seoTitle?: string
  description?: string
  sections?: ContentBlock[]
}

export interface PageQueryResult {
  _id: string
  title: string
  subtitle: string
  description?: string
  seoTitle?: string
  heroImage?: SanityImageAsset
  sections?: ContentBlock[]
}

export interface SettingsQueryResult {
  _id: string
  // General Settings
  title?: string
  description?: string
  siteUrl?: string
  // Services
  services?: string[]
  // Contact Information
  contactEmail?: string
  contactAddress?: string
  contactLocation?: string
}

export interface ProjectQueryResult {
  _id: string
  projectNumber: string
  title: string
  slug: {
    current: string
  }
  description?: string
  images?: ProjectImage[]
  seoTitle?: string
  seoDescription?: string
}

export type AllProjectsQueryResult = ProjectQueryResult[]

// Lab types
export interface Lab extends SanityDocument {
  _type: 'lab'
  title: string
  slug: {
    current: string
  }
  content: string
  publishedAt: string
  image: {
    asset: SanityImageAsset
  }
  seoTitle?: string
  seoDescription?: string
}

export interface LabQueryResult {
  _id: string
  title: string
  slug: {
    current: string
  }
  content: string
  publishedAt: string
  image: {
    asset: SanityImageAsset
  }
  seoTitle?: string
  seoDescription?: string
}

export type AllLabsQueryResult = LabQueryResult[]

// Utility types
export type SanityImageSource = SanityImageAsset | string
