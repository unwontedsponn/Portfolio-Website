import React, { useRef, useEffect } from "react";
import { drawStaff } from "../notations/staff";
import SlideFadeIn from "@/app/components/SlideFadeIn";

interface LeadSheetCanvasProps {
  userNotes: { note: string; duration: "quarter" | "half" }[];
}

const LeadSheetCanvas: React.FC<LeadSheetCanvasProps> = ({ userNotes }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawStaff(context, lineSpacing, staveWidth, totalBars, userNotes);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
      });
  }, [userNotes]); // Re-render whenever userNotes changes

  return (
    <SlideFadeIn direction="up" className="">
      <canvas
        ref={canvasRef}
        id="notation"
        width="1000"
        height="160"
        className="music-canvas p-4"
      />
    </SlideFadeIn>
  );
};

export default LeadSheetCanvas;
