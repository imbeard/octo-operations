"use client";
import React, { useState, useEffect } from "react";
import type { Settings } from "@/sanity-studio/types";

interface PopupProps {
  settings: Settings | null;
}

export default function Popup({ settings }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("popupClosed") !== "true") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("popupClosed", "true");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative p-2 bg-primary md:h-max shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-white font-bold"
          onClick={handleClose}
          aria-label="Close popup"
        >
          X
        </button>
        <div className="flex flex-col gap-4 justify-between h-full max-w-[80vw] lg:max-w-[40vw] min-w-[40vw] md:min-w-[25vw] p-2 text-white">
          <div>
            <h1 className="text-xl font-bold uppercase mb-1">About</h1>

            <p className="font-bold leading-tight capitalize text-sm sm:text-lg">
              {settings?.abouttext}
            </p>
          </div>

          {/*<div>
            <h1 className="text-xl font-bold uppercase mb-1">Contact</h1>
            {settings?.contactEmail && (
              <p className="font-bold leading-tight text-sm sm:text-lg">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:underline transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </p>
            )}
            {settings?.contactAddress && (
              <p className="font-bold leading-tight text-sm sm:text-lg">
                {settings.contactAddress}
              </p>
            )}
            {settings?.contactLocation && (
              <p className="font-bold leading-tight text-sm sm:text-lg">
                {settings.contactLocation}
              </p>
            )}
          </div>*/}
        </div>
      </div>
    </div>
  );
}
