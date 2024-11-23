import { drawLine } from "../utils/drawLine";
import { drawHead } from "../utils/drawHead";
import { drawLedgerLine } from "../utils/drawLedgerLine";

export const drawNoteManual = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lineSpacing: number,
  type: "quarter" | "half"
) => {
  ctx.save();

  // Draw the notehead using drawHead helper
  drawHead(ctx, x, y, lineSpacing, type);

  // Define the ledger line Y position dynamically based on the note
  if (y === 95 || y === 102.5) {
    const ledgerLineY = 110; // Fixed Y position for both Low C and Low B
    drawLedgerLine(ctx, x, ledgerLineY, lineSpacing);
    console.log("ledger line drawn");
  }

  // Determine stem direction and draw it using drawLine helper
  const middleLineY = 50;
  const isLowNote = y >= middleLineY; // Notes on/above middle line
  const stemHeight = lineSpacing * 3;

  if (isLowNote) {
    // Stem pointing up, attached to the right of the notehead
    drawLine(
      ctx,
      x + lineSpacing * 0.6,
      y + 2 * lineSpacing,
      x + lineSpacing * 0.6,
      y + 2 * lineSpacing - stemHeight,
      2
    );
  } else {
    // Stem pointing down, attached to the left of the notehead
    drawLine(
      ctx,
      x - lineSpacing * 0.6,
      y + 2 * lineSpacing,
      x - lineSpacing * 0.6,
      y + 2 * lineSpacing + stemHeight,
      2
    );
  }

  ctx.restore();

  console.log(y);
};
