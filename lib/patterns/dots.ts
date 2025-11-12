import { DotsPatternConfig } from "../types";

/**
 * Draws a dots pattern on the canvas
 * Can create either grid-based or randomly scattered dots
 */
export function drawDotsPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: DotsPatternConfig
) {
  // Clear and fill background
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  if (config.style === 'grid') {
    drawGridDots(ctx, width, height, config);
  } else {
    drawRandomDots(ctx, width, height, config);
  }
}

function drawGridDots(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: DotsPatternConfig
) {
  // Calculate spacing based on density
  const spacing = Math.max(config.dotSize * 2, config.dotSize / config.density);
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacing + spacing / 2;
      const y = row * spacing + spacing / 2;

      // Apply size variation
      const variation = 1 - (config.sizeVariation / 100) + (Math.random() * config.sizeVariation / 100);
      const dotSize = config.dotSize * variation;

      // Alternate between colors if accent color is provided
      const useAccent = config.accentColor && (row + col) % 3 === 0;
      ctx.fillStyle = (useAccent && config.accentColor) ? config.accentColor : config.dotColor;

      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawRandomDots(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: DotsPatternConfig
) {
  // Calculate number of dots based on density
  const area = width * height;
  const dotArea = Math.PI * Math.pow(config.dotSize / 2, 2);
  const numDots = Math.floor((area * config.density) / dotArea / 3);

  // Generate random dot positions
  const dots: { x: number; y: number; size: number; useAccent: boolean }[] = [];

  for (let i = 0; i < numDots; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const variation = 1 - (config.sizeVariation / 100) + (Math.random() * config.sizeVariation / 100);
    const size = config.dotSize * variation;
    const useAccent = Boolean(config.accentColor && Math.random() > 0.7);

    dots.push({ x, y, size, useAccent });
  }

  // Draw dots
  dots.forEach((dot) => {
    ctx.fillStyle = dot.useAccent && config.accentColor ? config.accentColor : config.dotColor;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}
