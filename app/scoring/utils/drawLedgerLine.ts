import { drawLine } from "./drawLine";

export const drawLedgerLine = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lineSpacing: number
) => {
  const ledgerLineLength = lineSpacing * 2; // Ledger line spans twice the line spacing
  const startX = x - ledgerLineLength / 2; // Start slightly left of the notehead
  const endX = x + ledgerLineLength / 2; // End slightly right of the notehead

  // Draw the ledger line
  drawLine(ctx, startX, y, endX, y, 1.5); // Line width is 1.5
};
