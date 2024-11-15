import React, { useRef, useEffect } from 'react';

const MusicCanvas: React.FC = () => {
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

  const drawStaff = (ctx: CanvasRenderingContext2D) => {
    const y = 50; // Starting y-coordinate
    const lineSpacing = 20;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(20, y + i * lineSpacing);
      ctx.lineTo(780, y + i * lineSpacing);
      ctx.stroke();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="notation"
      width="800"
      height="400"
      className="music-canvas bg-white border-3 border-thick-border-gray p-4"
    />
  );
};

export default MusicCanvas;
