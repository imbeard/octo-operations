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
  projectInfo?: {
    title?: string;
    subtitle?: string;
    projectNumber?: string;
    description?: string;
    place?: string;
    tags?: string[];
  };
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectInfo,
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
    <div className="fixed z-[999] inset-0 w-full h-full bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute cursor-pointer z-[999] top-2 right-2 md:top-2 md:right-3 text-white hover:bg-white hover:text-black font-bold uppercase p-2 md:p-1 text-sm md:text-base"
        aria-label="Close lightbox"
      >
        close x
      </button>

      <div className="flex flex-col md:flex-row h-full">
        {/* Project info */}
        {projectInfo && (
          <div className="w-full md:w-2/5 px-2 pt-8 pb-8 md:p-0 flex flex-col justify-between text-white md:m-5 min-h-[30vh] md:min-h-0">
            <div className="">
              {projectInfo.projectNumber && (
                <h1 className="text-2xl md:text-3xl font-semibold text-white/50 md:block hidden">
                  {projectInfo.projectNumber}
                </h1>
              )}

              {projectInfo.title && (
                <h2 className="text-3xl md:text-4xl mt-2 md:mt-0 font-bold uppercase">
                  {projectInfo.title}
                </h2>
              )}

              {projectInfo.subtitle && (
                <h3 className="text-lg md:text-2xl font-medium mb-1 text-white/70">
                  {projectInfo.subtitle}
                </h3>
              )}

              {/* Tags */}
              {projectInfo.tags && projectInfo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {projectInfo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-1 py-0.5 text-xs uppercase text-white border border-white/20 "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {projectInfo.description && (
                <p className="text-xs md:text-sm max-w-full md:max-w-[375px] text-white/90 mb-3 leading-tight">
                  {projectInfo.description}
                </p>
              )}
            </div>

            {/* Place desktop */}
            {projectInfo.place && (
              <div className="md:mt-auto">
                <p className="text-xs md:text-sm text-white/70">
                  {projectInfo.place}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mobile project number */}
        {projectInfo && projectInfo.projectNumber && (
          <div className="absolute top-2 left-2 md:hidden">
            <h1 className="text-2xl font-semibold text-white/50">
              {projectInfo.projectNumber}
            </h1>
          </div>
        )}

        {/* Image gallery */}
        <div
          className={`${
            projectInfo ? "w-full" : "w-full"
          } relative flex flex-col items-center justify-center min-h-0`}
        >
          {/* Prev image */}
          {images.length > 1 && (
            <div className="absolute z-20 left-2 md:left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <div
                onClick={() => setCurrentIndex(prevIndex)}
                className="relative w-20 md:w-28 h-32 md:h-48 overflow-hidden transition-all duration-200 cursor-pointer"
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

          {/* Next image */}
          {images.length > 1 && (
            <div className="absolute z-20 right-2 md:right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
              <div
                onClick={() => setCurrentIndex(nextIndex)}
                className="relative w-20 md:w-28 h-32 md:h-48 overflow-hidden transition-all duration-200 cursor-pointer"
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

          {/* Main Image container */}
          <div className="relative w-full h-[50vh] md:h-full flex flex-col justify-center items-center">
            <div
              className={`relative flex justify-center mx-auto h-full ${
                images.length > 1
                  ? "w-[calc(100%-0rem)] md:w-[calc(100%-16rem)]" // 16rem = 2 * (7rem nav image + 1rem positioning)
                  : "w-full md:w-full"
              }`}
            >
              <div className="relative h-full flex justify-center">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1200}
                  height={800}
                  className="w-auto h-auto max-w-full max-h-full object-contain md:w-full md:p-4 "
                  priority
                />
              </div>
            </div>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs md:text-sm bg-black bg-opacity-50 px-2 md:px-3 py-1 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Mobile nav */}
          {images.length > 1 && (
            <>
              {/* Left click */}
              <div
                className="absolute left-0 top-0 w-1/3 h-full md:hidden"
                onClick={() => setCurrentIndex(prevIndex)}
              />
              {/* Right click */}
              <div
                className="absolute right-0 top-0 w-1/3 h-full md:hidden"
                onClick={() => setCurrentIndex(nextIndex)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
