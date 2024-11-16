"use client";
import React, { useState, useEffect } from 'react';
import Worksheet from './components/Worksheet';
import LeadSheetCanvas from './components/LeadSheetCanvas';

interface ScoringAppProps {
  id: string;
}

const ScoringApp: React.FC<ScoringAppProps> = ({ id }) => {
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    const updateViewportWidth = () => {
      setIsNarrowViewport(window.innerWidth < 768);
    };
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  return (
    <section id={id} className={`md:pt-[var(--header-height)] md:pb-[var(--footer-height)] flex flex-col w-screen md:h-screen justify-center ${isNarrowViewport ? 'bg-pink bg-opacity-10' : ''}`}>      
      <Worksheet />
      <div className="flex justify-center mt-4">
        <LeadSheetCanvas />
      </div>            
    </section>
  );
};

export default ScoringApp;
