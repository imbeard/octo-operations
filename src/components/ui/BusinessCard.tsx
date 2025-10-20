"use client";
import React, { useState, useEffect, useRef } from "react";
import type { Settings } from "@/sanity-studio/types";

interface BusinessCardProps {
  settings: Settings | null;
}

export default function BusinessCard({ settings }: BusinessCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scatteredFallen, setScatteredFallen] = useState(false);
  const [centerFallen, setCenterFallen] = useState(false);
  const [hasDroppedIn, setHasDroppedIn] = useState(false);
  const [centerCardUp, setCenterCardUp] = useState(false);
  const hasShownRef = useRef(false);

  // Number of cards to display (excluding the center card)
  const cardCount = 23; // 23 scattered cards + 1 center card = 24 total

  useEffect(() => {
    // Check if animation has been shown during this navigation session
    const hasSeenAnimation = sessionStorage.getItem("cardsShown") === "true";

    if (!hasSeenAnimation && !hasShownRef.current) {
      // First load - play full animation
      hasShownRef.current = true;
      setIsOpen(true);
      // Trigger drop-in animation
      setTimeout(() => setHasDroppedIn(true), 100);
      // Scattered cards fall after 3.5 seconds
      setTimeout(() => setScatteredFallen(true), 3500);
      // Center card falls 3 seconds after scattered cards (at 6.5 seconds total)
      setTimeout(() => {
        setCenterFallen(true);
        // Mark animation as shown in sessionStorage
        sessionStorage.setItem("cardsShown", "true");
      }, 7500);
    } else if (hasSeenAnimation) {
      // Returning from navigation - skip animation, show only bottom card
      setIsOpen(true);
      setScatteredFallen(true);
      setCenterFallen(true);
      setHasDroppedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !centerFallen) {
      document.body.classList.add("cards-open");
    } else {
      document.body.classList.remove("cards-open");
    }
    return () => {
      document.body.classList.remove("cards-open");
    };
  }, [isOpen, centerFallen]);

  const handleCenterCardClick = () => {
    if (centerFallen) {
      // Toggle center card up/down
      setCenterCardUp(!centerCardUp);
    }
  };

  if (!isOpen) {
    return null;
  }

  // Generate random positions and rotations for scattered cards
  const getScatteredCardStyle = (index: number) => {
    const seed = index * 137.508; // Golden angle for good distribution
    const angle = (seed % 360) - 30; // Rotation between -30 and 330 degrees
    const x = ((seed * 7) % 100) - 50; // X position between -50% and 50%
    const y = ((seed * 13) % 60) - 30; // Y position between -30% and 30%

    return {
      transform: scatteredFallen
        ? `translate(0, 100vh) rotate(${angle}deg)` // Fall off screen
        : hasDroppedIn
          ? `translate(${x}vw, ${y}vh) rotate(${angle}deg)`
          : `translate(${x}vw, -100vh) rotate(${angle}deg)`,
      transition: scatteredFallen
        ? `transform 0.8s cubic-bezier(0.6, 0.04, 0.98, 0.34) ${index * 0.05}s`
        : hasDroppedIn
          ? `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
          : "none",
      zIndex: 50 + index,
    };
  };

  // Style for the center card (always straight, no rotation)
  const getCenterCardStyle = () => {
    return {
      transform: centerFallen
        ? centerCardUp
          ? `translate(-50%, -50%) rotate(0deg)` // Centered when up
          : `translate(-50%, calc(50vh - 83px)) rotate(0deg)` // Only heading visible at bottom
        : hasDroppedIn
          ? `translate(-50%, -50%) rotate(0deg)` // Centered when scattered
          : `translate(-50%, -150vh) rotate(0deg)`, // Start from top
      transition: centerFallen
        ? `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` // Smooth toggle when fallen
        : hasDroppedIn
          ? `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${cardCount * 0.1}s` // Drop in last
          : "none",
      zIndex: 100, // Always on top
      left: "50%",
      top: "50%",
    };
  };

  // Content for the card
  const CardContent = () => (
    <div className="relative w-full h-full p-2 bg-primary text-white flex flex-col justify-between ">
      <div>
        <img src="/logoext.svg" className="w-[80%] mx-auto mb-2" />
        <div className="space-y-1 text-sm roboto">
          <p>
            Octo Operations is a creative production agency. An operational
            entity shaping the journey from idea to execution. We work with
            people that we are inspired by and support better representation and
            cross generational inputs. We are here to make things happen.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="text-sm roboto leading-tight">
            {settings?.contactEmail && (
              <p>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:underline"
                >
                  {settings.contactEmail}
                </a>
              </p>
            )}
            {settings?.contactAddress && <p>{settings.contactAddress}</p>}
            {settings?.contactLocation && <p>{settings.contactLocation}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        !centerFallen
          ? "bg-black/30 backdrop-blur-sm"
          : centerFallen && !centerCardUp
            ? "pointer-events-none"
            : "bg-black/30 backdrop-blur-sm"
      }`}
      aria-modal="true"
      role="dialog"
      onClick={() => {
        // Click on backdrop when card is up should close it
        if (centerFallen && centerCardUp) {
          handleCenterCardClick();
        }
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Scattered cards */}
        {Array.from({ length: cardCount }).map((_, index) => (
          <div
            key={`scattered-${index}`}
            className="absolute w-[85vw] max-w-[500px] aspect-[1.586/1] shadow-2xl"
            style={getScatteredCardStyle(index)}
          >
            <CardContent />
          </div>
        ))}

        {/* Center card - always straight, clickable */}
        <div
          className={`absolute w-[85vw] max-w-[500px] aspect-[1.586/1] shadow-2xl ${centerFallen ? "cursor-pointer pointer-events-auto" : ""}`}
          style={getCenterCardStyle()}
          onClick={(e) => {
            if (centerFallen) {
              e.stopPropagation();
              handleCenterCardClick();
            }
          }}
        >
          <CardContent />
        </div>
      </div>
    </div>
  );
}
