"use client";
import React, { useState } from "react";
import type { Settings } from "@/sanity-studio/types";

interface PopupProps {
  settings: Settings | null;
}

export default function Popup({ settings }: PopupProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed z-100 p-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary md:h-max shadow-xl">
      <button
        className="absolute top-2 right-4"
        onClick={() => setIsOpen(false)}
      >
        X
      </button>
      <div className="flex flex-col gap-4 justify-between h-full min-w-[70vw] md:min-w-[25vw] p-2 text-white">
        <div>
          <h1 className="text-xl font-bold uppercase mb-1">Services</h1>
          {settings?.services?.map((service: string) => (
            <p
              className="font-bold leading-tight capitalize text-sm sm:text-lg"
              key={service}
            >
              {service}
            </p>
          ))}
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}
