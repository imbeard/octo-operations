import React from "react";
import Image from "next/image";
import type { Settings } from "@/sanity-studio/types";
import Link from "next/link";

interface HeaderProps {
  className?: string;
  settings: Settings | null;
}

export default function Header({ className = "", settings }: HeaderProps) {
  return (
    <header className={`w-full ${className}`}>
      <div className="">
        <div className="w-full flex flex-row px-0 py-1.5 sm:py-2">
          {/* Logo */}
          <div className="md:w-3/6 w-1/3">
            <Link href="/">
            <div className="flex-shrink-0 flex items-center pl-2.5">
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
          <div className="w-full md:w-3/6">
            <div className="flex flex-row justify-between">
              {/* Services */}
              <div className="text-primary text-left w-full">
                <div className="font-bold text-base sm:text-xl">SERVICES</div>
                {settings?.services?.map((service: string) => (
                  <p className="font-bold leading-tight capitalize text-xs sm:text-base" key={service}>
                    {service}
                  </p>
                ))}
              </div>
              {/* Contacts */}
              <div className="text-primary text-left w-full">
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
