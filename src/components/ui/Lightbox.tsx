"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
  initialIndex?: number;
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, images.length]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

  return (
    <div className="fixed z-[100] top-[12vh] md:top-0 left-0 w-full h-full grid place-items-center bg-[white]/5 backdrop-blur-xs">
      <div className="absolute top-[35%] md:top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#cdcdcdcc] backdrop-blur-sm shadow-md w-max mt-[7vh] md:mt-16">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 left-3 z-[200] text-black font-bold uppercase p-1 py-2"
          aria-label="Close lightbox"
        >
          close
        </button>

        {/* Previous image thumbnail - hidden on mobile */}
        {images.length > 1 && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <div
              onClick={() => setCurrentIndex(prevIndex)}
              className="relative w-28 h-48 overflow-hidden transition-all duration-200 cursor-pointer"
            >
              <Image
                src={images[prevIndex].src}
                alt={images[prevIndex].alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        )}

        {/* Next image thumbnail - hidden on mobile */}
        {images.length > 1 && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <div
              onClick={() => setCurrentIndex(nextIndex)}
              className="relative w-28 h-48 overflow-hidden transition-all duration-200 cursor-pointer"
            >
              <Image
                src={images[nextIndex].src}
                alt={images[nextIndex].alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        )}

        {/* Mobile navigation areas */}
        {images.length > 1 && (
          <>
            {/* Left click area for previous */}
            <div
              className="absolute left-0 top-0 w-1/3 h-full z-10 md:hidden"
              onClick={() => setCurrentIndex(prevIndex)}
            />
            {/* Right click area for next */}
            <div
              className="absolute right-0 top-0 w-1/3 h-full z-10 md:hidden"
              onClick={() => setCurrentIndex(nextIndex)}
            />
          </>
        )}

        {/* Image container */}
        <div className="relative w-[90vw] md:w-[60vw] h-[70vh] flex flex-col items-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="w-full h-full p-4 md:p-0 md:max-w-[40vw] md:h-[55vh] object-contain"
              priority
            />
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Image description */}
          {currentImage.description && (
            <div className="mt-4 text-white text-center max-w-2xl px-4">
              <p className="text-sm">{currentImage.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
