"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface MobileCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
  initialIndex: number;
  onSlideChangeAction: (index: number) => void;
}

export default function MobileCarousel({
  images,
  initialIndex,
  onSlideChangeAction,
}: MobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    dragFree: false,
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
    skipSnaps: false,
    duration: 40,
    dragThreshold: 8,
    inViewThreshold: 0.6,
  });

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onSlideChangeAction(index);
  }, [emblaApi, onSlideChangeAction]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Navigate to specific slide when initialIndex changes
  useEffect(() => {
    if (emblaApi && initialIndex !== selectedIndex) {
      emblaApi.scrollTo(initialIndex, false);
    }
  }, [emblaApi, initialIndex, selectedIndex]);

  return (
    <div className="h-full w-full overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center h-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className="w-auto h-auto max-w-full max-h-full object-contain p-4 select-none"
              priority={Math.abs(index - selectedIndex) <= 1}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
