import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getOptimizedImageUrl, getResponsiveSizes } from '@/lib/sanity'
import Image from 'next/image'
import GalleryBlock from './ui/GalleryBlock'

// Define proper TypeScript interfaces for better type safety
interface SanityImage {
  _type: 'image'
  _key?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

interface ProjectImage {
  _type: 'projectImage'
  _key?: string
  image: SanityImage
  description?: string
}

interface ImageBlock {
  _type: 'imageBlock'
  _key?: string
  image: SanityImage
  alt: string
  caption?: string
  alignment?: 'left' | 'center' | 'right'
}

interface GalleryImage {
  _type: 'galleryImage'
  _key?: string
  image: SanityImage
  alt: string
  caption?: string
}

interface GalleryBlock {
  _type: 'galleryBlock'
  _key?: string
  title?: string
  images: GalleryImage[]
  columns: 1 | 2 | 3 | 4
}

interface SanityBlock {
  _type: 'block'
  _key?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: unknown
  }>
  style?: string
  listItem?: string
  level?: number
}

type SanitySection = SanityBlock | SanityImage | ProjectImage | ImageBlock | GalleryBlock

interface SanityContentProps {
  sections: SanitySection[]
  className?: string
}

const SanityContent: React.FC<SanityContentProps> = ({ sections, className = '' }) => {
  if (!sections || sections.length === 0) {
    return null
  }

  // Custom components for PortableText
  const portableTextComponents: PortableTextComponents = {
    types: {
      image: ({ value }: { value: SanityImage }) => {
        if (!value.asset) return null
        
        return (
          <figure className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                             <Image
                 src={getOptimizedImageUrl(value, { width: 800, height: 600 })}
                 alt={value.alt || ''}
                 fill
                 className="object-cover"
                 sizes={getResponsiveSizes(1)}
                 priority={false}
               />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-600 dark:text-gray-400">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc pl-6 text-gray-700 dark:text-gray-300">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-decimal pl-6 text-gray-700 dark:text-gray-300">
          {children}
        </ol>
      ),
    },
    listItem: ({ children }) => (
      <li className="mb-1">{children}</li>
    ),
  }

  const renderSection = (section: SanitySection, index: number) => {
    const key = section._key || `section-${index}`

    switch (section._type) {
      case 'block':
        return (
          <div key={key} className="prose prose-gray dark:prose-invert max-w-none">
            <PortableText
              value={section}
              components={portableTextComponents}
            />
          </div>
        )

      case 'image':
        return (
          <figure key={key} className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={getOptimizedImageUrl(section, { width: 800, height: 600 })}
                alt={section.alt || ''}
                fill
                className="object-cover"
                sizes={getResponsiveSizes(1)}
                priority={false}
              />
            </div>
            {section.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'projectImage':
        return (
          <figure key={key} className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={getOptimizedImageUrl(section.image, { width: 800, height: 600 })}
                alt={section.image.alt || section.description || ''}
                fill
                className="object-cover"
                sizes={getResponsiveSizes(1)}
                priority={false}
              />
            </div>
            {section.description && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {section.description}
              </figcaption>
            )}
          </figure>
        )

      case 'imageBlock':
        return (
          <figure key={key} className={`my-8 ${section.alignment === 'left' ? 'text-left' : section.alignment === 'right' ? 'text-right' : 'text-center'}`}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={getOptimizedImageUrl(section.image, { width: 800, height: 600 })}
                alt={section.alt}
                fill
                className="object-cover"
                sizes={getResponsiveSizes(1)}
                priority={false}
              />
            </div>
            {section.caption && (
              <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'galleryBlock':
        return (
          <GalleryBlock
            key={key}
            title={section.title}
            images={section.images}
            columns={section.columns}
          />
        )

      default:
        console.warn(`Unknown section type: ${(section as { _type: string })._type}`)
        return null
    }
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}

export default SanityContent 