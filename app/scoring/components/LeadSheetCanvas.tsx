import React, { useRef, useEffect } from 'react';

const LeadSheetCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas is null

    const context = canvas.getContext('2d');
    if (context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a simple staff as an example
      drawStaff(context);
    }
  }, []);

  const drawStave = (ctx: CanvasRenderingContext2D, startY: number, width: number, lineSpacing: number) => {
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(20, startY + i * lineSpacing);
      ctx.lineTo(20 + width, startY + i * lineSpacing);
      ctx.stroke();
    }
  };

  const drawBarLine = (ctx: CanvasRenderingContext2D, x: number, startY: number, lineSpacing: number) => {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY + 4 * lineSpacing);
    ctx.stroke();
  };

  const drawStaff = (ctx: CanvasRenderingContext2D) => {
    const lineSpacing = 15; 
    const staveWidth = 960; 
    const staves = [50, 160]; // Y positions of the staves
    const barLinePositions = [250, 500, 750, 980]; // X positions of the bar lines

    // Draw each stave
    staves.forEach((startY) => {
      drawStave(ctx, startY, staveWidth, lineSpacing);

      // Draw bar lines for this stave
      barLinePositions.forEach((x) => {
          drawBarLine(ctx, x, startY, lineSpacing);
      });
    });
  };

  return (
    <canvas
      ref={canvasRef}
      id="notation"
      width="1000"
      height="250"
      className="music-canvas bg-white border-3 border-thick-border-gray p-4"
    />
  );
};

export default LeadSheetCanvas;
