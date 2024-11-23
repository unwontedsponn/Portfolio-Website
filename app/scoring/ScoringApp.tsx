"use client";
import React, { useState, useEffect, useRef } from "react";
import UserInput from "./components/UserInput";
import { drawStaff } from "./notations/staff";
import SlideFadeIn from "../components/SlideFadeIn";

interface ScoringAppProps {
  id: string;
}

const ScoringApp: React.FC<ScoringAppProps> = ({ id }) => {
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [userNotes, setUserNotes] = useState<
    { note: string; duration: "quarter" | "half"; range: "low" | "high" }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Ref for the canvas element
  const totalBeats = 16;
  const currentBeat = userNotes.reduce(
    (acc, { duration }) => acc + (duration === "quarter" ? 1 : 2),
    0
  );
  const isStaveFull = currentBeat >= totalBeats; // Stave is full if all beats are filled

  useEffect(() => {
    const updateViewportWidth = () => {
      setIsNarrowViewport(window.innerWidth < 768);
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const lineSpacing = 15;
    const staveWidth = 960;
    const totalBars = 4;

    const font = new FontFace(
      "Bravura",
      "url(/fonts/Bravura/Bravura.woff2) format('woff2')"
    );

    font
      .load()
      .then(() => {
        document.fonts.add(font);
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
        drawStaff(context, lineSpacing, staveWidth, totalBars, userNotes);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
      });
  }, [userNotes]); // Re-render whenever userNotes changes

  const handleNoteSelect = (
    note: string,
    duration: "quarter" | "half",
    range: "low" | "high"
  ) => {
    if (isStaveFull) return; // Prevent adding notes if stave is full
    setUserNotes((prevNotes) => [...prevNotes, { note, duration, range }]);
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
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          id="notation"
          width="1000"
          height="160"
          className="music-canvas p-4"
        />
      </div>
      <UserInput
        currentBeat={currentBeat}
        onNoteSelect={handleNoteSelect}
        onReset={handleReset}
        isStaveFull={isStaveFull} // Pass stave full status
      />
    </section>
  );
};

export default ScoringApp;