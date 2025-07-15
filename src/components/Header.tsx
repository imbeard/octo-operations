import React from "react";
import Image from "next/image";
import { getNavigation } from "@/lib/navigation";
import type { Settings } from "@/sanity-studio/types";

interface HeaderProps {
  className?: string;
}

export default async function Header({ className = "" }: HeaderProps) {
  const settings: Settings | null = await getNavigation();
  console.log("Fetched settings:", settings);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 ${className}`}>
      <div className="">
        <div className="w-full flex flex-row px-2 py-4">
          {/* Logo on the left */}
          <div className="w-3/6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16">
              <Image
                src="/logo.svg"
                alt="OCTO Logo"
                width={38}
                height={59}
                className="w-12 h-16"
                priority
              />
            </div>
          </div>
          {/* Spacer */}
          <div className="w-3/6 border-[red]">
            <div className="flex flex-row justify-between">
              {/* Services Column */}
              <div className="text-[#E30613] text-left w-full">
                <div className="font-bold text-xl mb-1">SERVICES</div>
                {settings?.services?.map((service) => (
                  <div className="font-bold" key={service}>
                    {service}
                  </div>
                ))}
              </div>
              {/* Contact Column */}
              <div className="text-[#E30613] text-left w-full">
                <div className="font-bold text-xl mb-1">CONTACT</div>
                {settings?.contactEmail && (
                  <div className="font-bold">{settings.contactEmail}</div>
                )}
                {settings?.contactAddress && (
                  <div className="font-bold">{settings.contactAddress}</div>
                )}
                {settings?.contactLocation && (
                  <div className="font-bold">{settings.contactLocation}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
