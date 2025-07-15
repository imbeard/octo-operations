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

// Lab queries
export const allLabsQuery = groq`
  *[_type == "lab"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    content,
    publishedAt,
    image {
      asset-> {
        _id,
        url
      }
    },
    seoTitle,
    seoDescription
  }
`

export const labQuery = groq`
  *[_type == "lab" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    publishedAt,
    image {
      asset-> {
        _id,
        url
      }
    },
    seoTitle,
    seoDescription
  }
`

export const allLabSlugsQuery = groq`
  *[_type == "lab" && defined(slug.current)] {
    "slug": slug.current
  }
`