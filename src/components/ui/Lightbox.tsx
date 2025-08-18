"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MobileCarousel from "./MobileCarousel";

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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 && "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    const prevIdx = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    const nextIdx = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

    // Preload previous and next images
    preloadImage(images[prevIdx].src);
    preloadImage(images[nextIdx].src);
  }, [currentIndex, images, isOpen]);

  const goToPrevious = () => {
    if (images.length <= 1) return;

    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const goToNext = () => {
    if (images.length <= 1) return;

    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
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
  const prevIdx = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  const nextIdx = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

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
                onClick={goToPrevious}
                className="relative w-20 md:w-28 h-32 md:h-48 overflow-hidden transition-all duration-200 cursor-pointer"
              >
                <Image
                  src={images[prevIdx].src}
                  alt={images[prevIdx].alt}
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
                onClick={goToNext}
                className="relative w-20 md:w-28 h-32 md:h-48 overflow-hidden transition-all duration-200 cursor-pointer"
              >
                <Image
                  src={images[nextIdx].src}
                  alt={images[nextIdx].alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          )}

          {/* Main Image container */}
          <div
            className="relative w-full h-[50vh] md:h-full flex flex-col justify-center items-center overflow-hidden"
            ref={containerRef}
            style={{
              touchAction: isMobile ? "none" : "auto",
            }}
          >
            {isMobile ? (
              /* Mobile: Embla Carousel */
              <div
                className={`h-full ${
                  images.length > 1 ? "w-[calc(100%-0rem)]" : "w-full"
                }`}
              >
                <MobileCarousel
                  images={images}
                  initialIndex={currentIndex}
                  onSlideChangeAction={handleSlideChange}
                />
              </div>
            ) : (
              /* Desktop: Single image with instant switching */
              <div
                className={`relative flex justify-center mx-auto h-full ${
                  images.length > 1 ? "w-[calc(100%-16rem)]" : "w-full"
                }`}
              >
                <div className="relative h-full flex justify-center w-full">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={1200}
                    height={800}
                    className="w-auto h-auto max-w-full max-h-full object-contain md:p-4 select-none"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs md:text-sm bg-black bg-opacity-50 px-2 md:px-3 py-1 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
