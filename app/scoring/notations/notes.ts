import { drawLine } from "../utils/drawingHelpers";

export const drawQuarterNote = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lineSpacing: number,
  note: string
) => {
  // Draw the notehead
  ctx.save();
  ctx.font = `${lineSpacing * 3.5}px Bravura, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("𝅘𝅥", x, y + 2 * lineSpacing);

  // Determine stem direction and placement
  const stemHeight = lineSpacing * 3;
  if (x < 0) {
    // Stem points down and attaches to the left
    drawLine(ctx, x - 7, y + 2 * lineSpacing + 3, x - 7, y + 2 * lineSpacing + stemHeight, 1.5);
  } else {
    // Stem points up and attaches to the right
    drawLine(ctx, x + 7, y + 2 * lineSpacing - 3, x + 7, y + 2 * lineSpacing - stemHeight, 1.5);
  }

  ctx.restore();
};

export const drawHalfNote = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lineSpacing: number,
  note: string
) => {
  // Draw the notehead (empty circle for a half note)
  ctx.save();
  ctx.font = `${lineSpacing * 3.5}px Bravura, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("𝅗𝅥", x, y + 2 * lineSpacing);

  // Determine stem direction and placement
  const stemHeight = lineSpacing * 3;
  if (x < 0) {
    // Stem points down and attaches to the left
    drawLine(ctx, x - 7, y + 2 * lineSpacing + 3, x - 7, y + 2 * lineSpacing + stemHeight, 1.5);
  } else {
    // Stem points up and attaches to the right
    drawLine(ctx, x + 7, y + 2 * lineSpacing - 3, x + 7, y + 2 * lineSpacing - stemHeight, 1.5);
  }

  ctx.restore();
};
