"use client";

import React, { useState, useEffect } from "react";
import TypewriterEffect from "@/app/components/TypewriterEffect";
import SlideFadeIn from "@/app/components/SlideFadeIn";
import Image from "next/image";
import Arrow from "../components/Arrow";
import Breadcrumb from "../components/Breadcrumb";

interface CodingProjectsProps {
  url: string;
  title: string;
  techStack: string;
  description: string;
  gitHubLink: string;
}

export const codingProjects: CodingProjectsProps[] = [
  {
    url: "https://community-lens.storage.googleapis.com/preview-media/final/7c436ab1-90c5-4051-8b13-7dc457e2aab3.mp4",
    title: "Snapchat Filter",
    techStack: "Lens Studio, JavaScript",
    description: "A creative augmented reality filter designed for Snapchat.",
    gitHubLink: "",
  },
  {
    url: "",
    title: "Neat Digital Brand Guardian Tool",
    techStack: "NextJS, TailwindCSS & Vercel",
    description: "A drag and drop tool for any Neat employee to check their work against Neat's brand guidelines.",
    gitHubLink: "",
  },  
  {
    url: "https://www.musicmakernetwork.com",
    title: "MMN",
    techStack: "NextJS, TailwindCSS, Vercel & Stripe",
    description: "A collaborative podcast platform for musicians.",
    gitHubLink: "",
  },
  {
    url: "https://www.benspooner.co.uk",
    title: "thisPortfolioWebsite",
    techStack: "NextJS, TailwindCSS, Vercel & Stripe",
    description:
      "Responsive portfolio website showcasing music and tech work, including a built-from-scratch original music-led game.",
    gitHubLink: "https://github.com/unwontedsponn/portfolio-website",
  },  
];

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

  const prevPage = () => {
    const newPage = (currentPage - 1 + codingProjects.length) % codingProjects.length;
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    const newPage = (currentPage + 1) % codingProjects.length;
    setCurrentPage(newPage);
  };

  return (
    <section
      id={id}
      className="md:pt-[var(--header-height)] md:pb-[var(--footer-height)] flex flex-col w-screen md:h-screen"
    >
      <div
        className={`flex flex-col md:flex-row justify-center items-center md:gap-x-8 h-auto md:h-screen ${
          isNarrowViewport ? "space-y-8" : "overflow-hidden"
        }`}
      >
        {!isNarrowViewport ? (
          <>
            <div className="flex flex-col">
              <SlideFadeIn
                direction="left"
                className="hidden md:block text-10xl leading-none font-gopher-mono-semi color-blue"
              >
                <h1 className="opacity-40">myCoding</h1>
              </SlideFadeIn>

              <SlideFadeIn
                direction="right"
                className="hidden md:block text-3xl font-gopher-mono underline tracking-large whitespace-nowrap px-10 md:px-0 color-dark-blue text-decoration-color md:pl-10"
              >
                <p>
                  <TypewriterEffect text="Here's how I made each project..." />
                </p>
              </SlideFadeIn>

              <SlideFadeIn direction="up" className="flex">
                <Arrow direction="left" onClick={prevPage} width={40} height={40} />

                <div className="pt-6 px-24 md:px-0 md:pr-2 text-right text-3vw md:text-sm font-gopher-mono text-dark w-[600px] h-[200px] space-y-2 border">
                  <h1 className='font-gopher-mono-semi text-xl'>{codingProjects[currentPage].title}</h1>
                  <p>
                    <span className="font-gopher-mono-semi">Tech stack: </span>
                    {codingProjects[currentPage].techStack}
                  </p>
                  <p>{codingProjects[currentPage].description}</p>
                  <p className="hidden md:block">
                    <span className="font-gopher-mono-semi">Extra Links:</span>
                    <a
                      href={codingProjects[currentPage].url}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Visit Website↑
                    </a>{" "}
                    |
                    <a
                      href={codingProjects[currentPage].gitHubLink}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      GitHub_Project↑
                    </a>
                  </p>
                  <SlideFadeIn direction="left">
                    <Breadcrumb
                      currentIndex={currentPage}
                      itemCount={codingProjects.length}
                      onBreadcrumbClick={setCurrentPage}
                    />
                  </SlideFadeIn>
                </div>

                <Arrow direction="right" onClick={nextPage} width={40} height={40} />
              </SlideFadeIn>
            </div>

            {/* Right Column */}
            <SlideFadeIn className="max-[1330px]:hidden" direction="right">
              <Image
                src="/images/code.svg"
                alt="Code Illustration"
                width={500}
                height={0}
                className="opacity-10"
                priority
              />
            </SlideFadeIn>
          </>
        ) : (
          <div className="space-y-8 px-4 sm:px-8 text-center bg-pink bg-opacity-10 py-24 border-b-3 border-thick-border-gray">
            <h1 className="text-7xl sm:text-9xl leading-none font-gopher-mono-semi color-blue opacity-40">
              myCoding
            </h1>
            <p className="text-xl sm:text-3xl font-gopher-mono underline tracking-wide sm:tracking-large whitespace-nowrap color-dark-blue text-decoration-color">
              <TypewriterEffect text={`${codingProjects[currentPage].title}`} />
            </p>

            <SlideFadeIn direction="up">
              <div className="pt-6 px-24 md:px-0 md:pr-2 text-center text-3vw md:text-sm font-gopher-mono text-dark max-w-3xl space-y-2">
                <p>
                  <span className="font-gopher-mono-semi">Tech stack: </span>
                  {codingProjects[currentPage].techStack}
                </p>
                <p>{codingProjects[currentPage].description}</p>
                <p className="hidden md:block">
                  <span className="font-gopher-mono-semi">Extra Links:</span>
                  <a
                    href={codingProjects[currentPage].url}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Visit Website↑
                  </a>{" "}
                  |
                  <a
                    href={codingProjects[currentPage].gitHubLink}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    GitHub_Project↑
                  </a>
                </p>
              </div>
            </SlideFadeIn>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCoding;
