"use client";
import React, { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import LeadSheetCanvas from "./components/LeadSheetCanvas";

interface ScoringAppProps {
  id: string;
}

const ScoringApp: React.FC<ScoringAppProps> = ({ id }) => {
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [userNotes, setUserNotes] = useState<{ note: string; duration: "quarter" | "half" }[]>([]);
  const totalBeats = 16; // Assuming 4 bars with 4 beats each
  const currentBeat = userNotes.reduce((acc, { duration }) => acc + (duration === "quarter" ? 1 : 2), 0);
  const isStaveFull = currentBeat >= totalBeats; // Stave is full if all beats are filled

  useEffect(() => {
    const updateViewportWidth = () => {
      setIsNarrowViewport(window.innerWidth < 768);
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const handleNoteSelect = (note: string, duration: "quarter" | "half") => {
    if (isStaveFull) return; // Prevent adding notes if stave is full
    setUserNotes((prevNotes) => [...prevNotes, { note, duration }]);
  };

  const handleReset = () => {
    setUserNotes([]); // Clear all notes
  };

  return (
    <section
      id={id}
      className={`md:pt-[var(--header-height)] md:pb-[var(--footer-height)] flex flex-col w-screen md:h-screen justify-center ${
        isNarrowViewport ? "bg-pink bg-opacity-10" : ""
      }`}
    >
      <UserInput
        currentBeat={currentBeat}
        onNoteSelect={handleNoteSelect}
        onReset={handleReset}
        isStaveFull={isStaveFull} // Pass stave full status
      />
      <div className="flex justify-center mt-4">
        <LeadSheetCanvas userNotes={userNotes} />
      </div>
    </section>
  );
};

export default ScoringApp;
