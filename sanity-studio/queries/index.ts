import { groq } from 'next-sanity'

// Settings query (singleton - primary query)
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    _id,
    title,
    description,
    siteUrl,
    services,
    contactEmail,
    contactAddress,
    contactLocation
  }
`

// Project queries
export const allProjectsQuery = groq`
  *[_type == "project"] | order(projectNumber asc) {
    _id,
    projectNumber,
    title,
    slug,
    description,
    images[] {
      _key,
      image {
        asset-> {
          _id,
          url
        }
      },
      description
    },
    seoTitle,
    seoDescription
  }
`

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    projectNumber,
    title,
    slug,
    description,
    images[] {
      _key,
      image {
        asset-> {
          _id,
          url
        }
      },
      description
    },
    seoTitle,
    seoDescription
  }
`

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`