import React, { useState, useEffect } from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect";
import SlideFadeIn from "@/app/components/SlideFadeIn";
import Image from "next/image";
import CodeComponent, { websites } from "../components/CodeComponent";

interface MyCodingProps {
  id?: string;
}

const MyCoding: React.FC<MyCodingProps> = ({ id }) => {
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const updateViewportWidth = () => {
      setIsNarrowViewport(window.innerWidth < 768);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  return (
    <section id={id} className="md:pt-[var(--header-height)] md:pb-[var(--footer-height)] flex flex-col w-screen md:h-screen">
      <div className={`flex flex-col md:flex-row justify-center items-center md:gap-x-8 items-center h-auto md:h-screen ${isNarrowViewport ? "space-y-8" : "overflow-hidden"}`}>
        {!isNarrowViewport ? (
          <>
            <div className="flex flex-col">
              <SlideFadeIn direction="left" className="hidden md:block text-11xl leading-none font-gopher-mono-semi color-blue">
                <h1 className="opacity-40">myCodes</h1>
              </SlideFadeIn>

              <SlideFadeIn direction="right" className="hidden md:block text-3xl font-gopher-mono underline tracking-largep whitespace-nowrap px-10 md:px-0 color-dark-blue text-decoration-color">
                <p className="">
                  <TypewriterEffect text={`${websites[currentPage].title}`} />
                </p>
              </SlideFadeIn>

              <SlideFadeIn direction="up">
                <div className="pt-6 px-24 md:px-0 md:pr-2 text-right text-3vw md:text-sm font-gopher-mono text-dark max-w-3xl space-y-2">
                  <p>
                    <span className="font-gopher-mono-semi">Tech stack: </span>
                    {websites[currentPage].techStack}
                  </p>
                  <p>{websites[currentPage].description}</p>
                  <p className="hidden md:block">
                    <span className="font-gopher-mono-semi">Extra Links:</span>
                    <a href={`${websites[currentPage].url}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {" "}
                      Visit Website↑
                    </a>{" "}
                    |
                    <a href={`${websites[currentPage].gitHubLink}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {" "}
                      GitHub_Project↑
                    </a>
                  </p>
                </div>
              </SlideFadeIn>
            </div>
            <CodeComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
        ) : (
          <div className="space-y-8 px-4 sm:px-8 text-center bg-pink bg-opacity-10 py-24 border-b-3 border-thick-border-gray">
            <h1 className="text-7xl sm:text-9xl leading-none font-gopher-mono-semi color-blue opacity-40">aboutMe</h1>
            <p className="text-xl sm:text-3xl font-gopher-mono underline tracking-wide sm:tracking-large whitespace-nowrap color-dark-blue text-decoration-color">
              <TypewriterEffect text="A little bit about me..." />
            </p>

            <div className="px-4 text-base font-gopher-mono text-dark max-w-xl sm:max-w-3xl mx-auto leading-relaxed">
              <p>
                ...Hello, I&apos;m Ben, a 35-year-old TypeScript/Javascript developer and musician. My tech stack for this website is Next.js, Tailwind CSS, Vercel & Stripe.
              </p>
            </div>
            <SlideFadeIn direction="left" className="flex justify-center">
              <Image src="/images/piano.png" alt="Piano" width={500} height={500} className="opacity-10" priority />
            </SlideFadeIn>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCoding;
