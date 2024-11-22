import { drawLine } from "../utils/drawingHelpers";
import { drawTrebleClef } from "./trebleClef";
import { drawTimeSignature } from "./timeSignature";
import { drawQuarterNote } from "./notes";
import { drawHalfNote } from "./notes";

const notePositions: { [key: string]: number } = {
  C: -0.5,  
  D: -1,  
  E: 2,
  F: 1.5,  
  G: 1,  
  A: 0.5,  
  B: 0,
};

export const drawStaff = (
  ctx: CanvasRenderingContext2D,
  lineSpacing: number,
  staveWidth: number,
  totalBars: number,
  userNotes: { note: string; duration: "quarter" | "half" }[] // Updated to include note duration
) => {
  const staveY = 50;
  const startX = 20;

  // Draw stave lines
  for (let i = 0; i < 5; i++) {
    drawLine(ctx, startX, staveY + i * lineSpacing, startX + staveWidth, staveY + i * lineSpacing);
  }

  // Draw treble clef
  const trebleClefX = startX + 20;
  const trebleClefWidth = drawTrebleClef(ctx, trebleClefX, staveY + 15, lineSpacing);

  // Draw time signature
  const timeSignatureX = trebleClefX + trebleClefWidth + 5;
  const timeSignatureWidth = drawTimeSignature(ctx, timeSignatureX, staveY, lineSpacing);

  const firstBarStart = timeSignatureX + timeSignatureWidth - 10;
  const totalWidth = staveWidth - firstBarStart;
  const barWidth = totalWidth / totalBars;

  const barStarts = [firstBarStart];
  for (let i = 1; i <= totalBars; i++) {
    barStarts.push(firstBarStart + i * barWidth);
  }

  // Draw regular barlines
  barStarts.slice(1, -1).forEach((x) => {
    drawLine(ctx, x, staveY, x, staveY + 4 * lineSpacing);
  });

  // Draw the final double barline
  const finalBarX = staveWidth + startX;
  drawLine(ctx, finalBarX - 6, staveY, finalBarX - 6, staveY + 4 * lineSpacing, 1.5);
  drawLine(ctx, finalBarX, staveY, finalBarX, staveY + 4 * lineSpacing, 4);

  // Draw notes based on user input
  const notesPerBar = 4;
  let beatIndex = 0; // Track the current beat (0-based within the bar)

  userNotes.forEach(({ note, duration }) => {
    const barIndex = Math.floor(beatIndex / notesPerBar); // Bar index
    const beatInBar = beatIndex % notesPerBar; // Current beat within the bar

    if (barIndex >= totalBars) return; // Ignore notes beyond total bars

    const barStart = barStarts[barIndex];
    const nextBarStart = barStarts[barIndex + 1];
    const spacing = (nextBarStart - barStart) / (notesPerBar + 1);

    const noteX = barStart + (beatInBar + 1) * spacing;
    const noteY = staveY + notePositions[note] * lineSpacing;

    if (duration === "quarter") {
      drawQuarterNote(ctx, noteX, noteY, lineSpacing, note);
      beatIndex += 1; // Move to the next beat
    } 
    if (duration === "half") {
      if (beatInBar === 3) return; // Prevent half notes on beat 4
      drawHalfNote(ctx, noteX, noteY, lineSpacing, note);
      beatIndex += 2; // Move two beats forward
    }

    console.log(beatInBar);
  });
};