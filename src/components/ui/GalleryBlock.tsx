'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getOptimizedImageUrl, getResponsiveSizes } from '@/lib/sanity';
import Lightbox from './Lightbox';

interface GalleryImage {
  _type: 'galleryImage'
  _key?: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  alt: string
  caption?: string
}

interface GalleryBlockProps {
  title?: string
  images: GalleryImage[]
  columns: 1 | 2 | 3 | 4
}

export default function GalleryBlock({ title, images, columns }: GalleryBlockProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{
    src: string;
    alt: string;
    description?: string;
  }>>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const openLightbox = (initialIndex: number) => {
    const lightboxImages = images.map((img) => ({
      src: getOptimizedImageUrl(img.image, { width: 1200, height: 800 }),
      alt: img.alt,
      description: img.caption,
    }));
    
    setLightboxImages(lightboxImages);
    setLightboxInitialIndex(initialIndex);
    setLightboxOpen(true);
  };

  return (
    <div className="my-8">
      {title && (
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className={`grid gap-4 ${
        columns === 1 ? 'grid-cols-1' :
        columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
        columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {images.map((image, imageIndex) => (
          <figure key={image._key || `gallery-image-${imageIndex}`} className="overflow-hidden rounded-lg">
            <div className="relative aspect-square w-full cursor-pointer hover:opacity-90 transition-opacity">
              <Image
                src={getOptimizedImageUrl(image.image, { width: 400, height: 400 })}
                alt={image.alt}
                fill
                className="object-cover"
                sizes={getResponsiveSizes(columns)}
                priority={false}
                onClick={() => openLightbox(imageIndex)}
              />
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxInitialIndex}
      />
    </div>
  );
} 