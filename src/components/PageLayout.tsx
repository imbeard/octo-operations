import Image from "next/image";
import Link from "next/link";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  logoSrc: string;
  backgroundColor: string;
  titleColor: string;
  contentLeftMargin?: string;
  contentRightMargin?: string;
  contentOverflow?: string;
}

export default function PageLayout({
  children,
  title,
  logoSrc,
  backgroundColor,
  titleColor,
  contentLeftMargin = "md:left-1/4",
  contentRightMargin = "md:right-1/4",
  contentOverflow = "overflow-y-auto",
}: PageLayoutProps) {
  return (
    <main className={`min-h-screen ${backgroundColor} fixed`}>
      {/* Fixed Logo */}
      <div className="fixed z-20 top-0 left-0 w-1/5 md:w-1/5">
        <div className="py-1.5 sm:py-2">
          <Link href="/">
            <div className="flex-shrink-0 flex items-center pl-[3vw] md:pl-2">
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
        </div>
      </div>

      {/* Fixed Title */}
      <div className="fixed z-20 top-0 right-4 py-2">
        <h1
          className={`text-4xl md:text-5xl ${titleColor} font-bold text-right leading-tight`}
        >
          {title}
        </h1>
      </div>

      {/* Fixed Content */}
      <div
        className={`fixed top-0 left-0 ${contentLeftMargin} right-0 ${contentRightMargin} h-full ${contentOverflow} pt-[8vh] md:pt-[8vh]`}
      >
        <div className="mx-auto px-3">
          <div className="h-[92vh]">{children}</div>
        </div>
      </div>
    </main>
  );
}
