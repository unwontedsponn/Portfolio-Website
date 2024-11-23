export const drawHead = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lineSpacing: number,
  type: "quarter" | "half"
) => {
  ctx.save();

  // Set note head styles
  ctx.lineWidth = type === "half" ? 3 : 1.5; // Thicker stroke for half notes
  ctx.fillStyle = type === "quarter" ? "black" : "transparent"; // Fill for quarter notes
  ctx.strokeStyle = "black"; // Black outline for both

  // Adjust rotation for traditional elliptical shape
  const rotationAngle = -Math.PI / 6; // Tilt the ellipse slightly
  const width = lineSpacing * 0.8; // Wider horizontal
  const height = lineSpacing * 0.55; // Narrower vertical

  // Draw the elliptical note head
  ctx.beginPath();
  ctx.ellipse(x, y + 2 * lineSpacing, width, height, rotationAngle, 0, Math.PI * 2);

  if (type === "quarter") {
    ctx.fill(); // Fill for quarter notes
  } else {
    ctx.stroke(); // Outline for half notes
  }

  ctx.restore();
};
