export const drawLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    width: number = 1
  ) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };
  