import React from "react";
import { useInView } from "react-intersection-observer";
import SlideFadeIn from "./SlideFadeIn";
import Breadcrumb from "./Breadcrumb";
import Arrow from "./Arrow";

interface Website {
  url: string;
  title: string;
  techStack: string;
  description: string;
  gitHubLink: string;
  preview: string;
}

export const websites: Website[] = [
  {
    url: "https://www.benspooner.co.uk",
    title: "thisPortfolioWebsite",
    techStack: "NextJS, TailwindCSS, Vercel & Stripe",
    description:
      "Responsive portfolio website showcasing music and tech work, including a built-from-scratch original music-led game.",
    gitHubLink: "https://github.com/unwontedsponn/portfolio-website",
    preview: 'mobileView'
  },
  {
    url: "https://www.musicmakernetwork.com",
    title: "MMN",
    techStack: "NextJS, TailwindCSS, Vercel & Stripe",
    description: "",
    gitHubLink: "",
    preview: 'mobileView'
  },
  {
    url: "https://community-lens.storage.googleapis.com/preview-media/final/7c436ab1-90c5-4051-8b13-7dc457e2aab3.mp4",
    title: "Snapchat Filter",
    techStack: "NextJS, TailwindCSS, Vercel & Stripe",
    description: "",
    gitHubLink: "",
    preview: 'videoPreview'
  },
];

interface CodeComponentProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const CodeComponent: React.FC<CodeComponentProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const prevPage = () => {
    const newPage = (currentPage - 1 + websites.length) % websites.length;
    setCurrentPage(newPage);
  };
  
  const nextPage = () => {
    const newPage = (currentPage + 1) % websites.length;
    setCurrentPage(newPage);
  };  

  return (
    <div ref={ref} className="md:hidden xl:flex items-center justify-center space-x-4">
      <div className="flex items-center">
        <Arrow direction="left" onClick={prevPage} width={40} height={40} />

        <div className="flex flex-col w-full text-center xl:text-right px-2">
          <SlideFadeIn className="md:hidden xl:block" direction="right">
            <div className="border-3 border-thick-border-gray overflow-hidden">
              <iframe
                src={websites[currentPage].url}
                title={websites[currentPage].title}
                className="w-[330px] h-[500px]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className="mb-2 text-center font-bold text-lg font-gopher-mono">
              {websites[currentPage].preview}
            </div>
          </SlideFadeIn>
          <SlideFadeIn direction="left">
            <Breadcrumb
              currentIndex={currentPage}
              itemCount={websites.length}
              onBreadcrumbClick={setCurrentPage}
            />
          </SlideFadeIn>
        </div>

        <Arrow direction="right" onClick={nextPage} width={40} height={40} />
      </div>
    </div>
  );
};

export default CodeComponent;
