import Image from "next/image";
import Link from "next/link";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  logoSrc: string;
  backgroundColor: string;
  titleColor: string;
}

export default function PageLayout({
  children,
  title,
  logoSrc,
  backgroundColor,
  titleColor,
}: PageLayoutProps) {
  return (
    <main className={`min-h-screen ${backgroundColor} w-full fixed`}>
      {/* Fixed header */}
      <header className="absolute z-20 flex flex-row justify-between w-full px-2.5 md:px-2 py-1.5 sm:py-2">
        <Link href="/">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={logoSrc}
              alt="OCTO Logo"
              width={38}
              height={59}
              className="w-7 h-auto sm:w-10 sm:h-12 md:w-12 md:h-16"
              priority
            />
          </div>
        </Link>
        <h1
          className={`text-4xl md:text-6xl ${titleColor} font-bold text-right leading-tight`}
        >
          {title}
        </h1>
      </header>

      {/* Content */}
      <div className="max-w-[1000px] overflow-y-auto relative mx-auto pt-[8vh] md:pt-[8vh]">
        <div className="h-[92dvh] px-3">{children}</div>
      </div>
    </main>
  );
}
