import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    _id,
    title,
    description,
    descriptionBlog,
    siteUrl,
    services,
    contactEmail,
    contactAddress,
    contactLocation,
    abouttext
  }
`;

// Project queries
export const allProjectsQuery = groq`
  *[_type == "project"] | order(orderRank) {
    _id,
    projectNumber,
    title,
    subtitle,
    slug,
    description,
    place,
    tags,
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
`;

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    orderRank,
    projectNumber,
    title,
    subtitle,
    slug,
    description,
    place,
    tags,
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
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export interface Project {
	_type: 'project';
	_createdAt: string;
	_id: string;
	projectNumber: string;
	title?: string;
	subtitle?: string;
	slug: Slug;
	description?: string;
	place?: string;
	tags?: string[];
	images?: ProjectImage[];
	seoTitle?: string;
	seoDescription?: string;
}

export interface ProjectImage {
	_key: string;
	image: {
		asset: {
			_id: string;
			url: string;
		};
	};
	description?: string;
}

export const nextProjectQuery = groq`
  *[_type == "project" && orderRank > $orderRank] | order(orderRank asc)[0]{
    title,
    slug
  }
`;

export const previousProjectQuery = groq`
  *[_type == "project" && orderRank < $orderRank] | order(orderRank desc)[0]{
    title,
    slug
  }
`;

// Lab queries
export const allLabsQuery = groq`
  *[_type == "lab"] | order(orderRank) {
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
`;

export const labQuery = groq`
  *[_type == "lab" && slug.current == $slug][0] {
    _id,
    orderRank,
    title,
    slug,
    content,
    publishedAt,
    externalLink,
    image {
      asset-> {
        _id,
        url
      }
    },
    seoTitle,
    seoDescription
  }
`;

export const allLabSlugsQuery = groq`
  *[_type == "lab" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export interface Lab {
	_type: 'lab';
	publishedAt: string;
	title?: string;
	slug: Slug;
	image?: ImageAsset;
	content: string;
}

export const previousLabQuery = groq`
  *[_type == "lab" && orderRank < $orderRank] | order(orderRank desc)[0]{
    title,
    slug
  }
`;

export const nextLabQuery = groq`
  *[_type == "lab" && orderRank > $orderRank] | order(orderRank asc)[0]{
    title,
    slug
  }
`;

export interface AdjacentPost {
	title: string;
	slug: {
		current: string;
	};
}
export interface General {
	description?: string;
	descriptionBlog?: string;
	contactEmail?: string;
	contactAddress?: string;
}
