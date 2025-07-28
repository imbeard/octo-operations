import React from "react";
import Image from "next/image";
import { getNavigation } from "@/lib/navigation";
import type { Settings } from "@/sanity-studio/types";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default async function Header({ className = "" }: HeaderProps) {
  const settings: Settings | null = await getNavigation();

  return (
    <header className={`w-full fixed top-0 left-0 z-50 ${className}`}>
      <div className="">
        <div className="w-full flex flex-row px-0 py-1.5 sm:py-2">
          {/* Logo on the left */}
          <div className="md:w-3/6 w-1/3">
            <Link href="/">
            <div className="flex-shrink-0 flex items-center pl-[3vw] md:pl-2">
              <Image
                src="/logo.svg"
                alt="OCTO Logo"
                width={38}
                height={59}
                className="w-7 h-auto md:w-12 md:h-16"
                priority
              />
            </div>
            </Link>
          </div>
          {/* Spacer */}
          <div className="w-full md:w-3/6 border-[red]">
            <div className="flex flex-row justify-between">
              {/* Services Column */}
              <div className="text-[#E30613] text-left w-full">
                <div className="font-bold text-base sm:text-xl">SERVICES</div>
                {settings?.services?.map((service: string) => (
                  <p className="font-bold leading-tight capitalize text-xs sm:text-base" key={service}>
                    {service}
                  </p>
                ))}
              </div>
              {/* Contact Column */}
              <div className="text-[#E30613] text-left w-full">
                <div className="font-bold text-base sm:text-xl">CONTACT</div>
                {settings?.contactEmail && (
                  <p className="font-bold leading-tight text-xs sm:text-base">
                    <a 
                      href={`mailto:${settings.contactEmail}`}
                      className="hover:underline transition-colors"
                    >
                      {settings.contactEmail}
                    </a>
                  </p>
                )}
                {settings?.contactAddress && (
                  <p className="font-bold leading-tight text-xs sm:text-base">{settings.contactAddress}</p>
                )}
                {settings?.contactLocation && (
                  <p className="font-bold leading-tight text-xs sm:text-base">{settings.contactLocation}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
