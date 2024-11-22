export const drawTimeSignature = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lineSpacing: number
  ): number => {
    ctx.save();
    ctx.font = `${lineSpacing * 4}px Bravura, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("𝄴", x, y + 2 * lineSpacing); // Common time
    const metrics = ctx.measureText("𝄴");
    const timeSignatureWidth = metrics.width;
    ctx.restore();
    return timeSignatureWidth;
  };
  