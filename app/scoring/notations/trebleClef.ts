export const drawTrebleClef = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lineSpacing: number
  ): number => {
    ctx.save();
    ctx.font = `${lineSpacing * 4}px Bravura, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("𝄞", x, y + 2 * lineSpacing);
    const metrics = ctx.measureText("𝄞");
    const trebleClefWidth = metrics.width;
    ctx.restore();
    return trebleClefWidth;
  };
  