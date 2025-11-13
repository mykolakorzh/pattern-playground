import { GeometricPatternConfig } from "../types";

/**
 * Draws a geometric pattern on the canvas
 * Creates a repeating grid of shapes (circles, squares, or triangles)
 */
export function drawGeometricPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: GeometricPatternConfig
) {
  // Clear and fill background
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Set opacity (default 100)
  ctx.globalAlpha = (config.opacity ?? 100) / 100;

  // Calculate grid dimensions
  const totalSize = config.size + config.spacing;
  const cols = Math.ceil(width / totalSize) + 1;
  const rows = Math.ceil(height / totalSize) + 1;

  // Draw shapes in grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * totalSize + config.size / 2;
      const y = row * totalSize + config.size / 2;

      // Apply size variation if enabled
      const sizeVariation = config.sizeVariation || 0;
      const variation = 1 - (sizeVariation / 100) + (Math.random() * sizeVariation / 100);
      const actualSize = config.size * variation;

      // Apply color variation if enabled
      if (config.colorVariation) {
        ctx.fillStyle = randomizeColor(config.shapeColor);
        ctx.strokeStyle = ctx.fillStyle;
      } else {
        ctx.fillStyle = config.shapeColor;
        ctx.strokeStyle = config.shapeColor;
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((config.rotation * Math.PI) / 180);

      switch (config.shape) {
        case 'circle':
          drawCircle(ctx, actualSize);
          break;
        case 'square':
          drawSquare(ctx, actualSize);
          break;
        case 'triangle':
          drawTriangle(ctx, actualSize);
          break;
        case 'hexagon':
          drawHexagon(ctx, actualSize);
          break;
        case 'star':
          drawStar(ctx, actualSize);
          break;
        case 'diamond':
          drawDiamond(ctx, actualSize);
          break;
        case 'pentagon':
          drawPentagon(ctx, actualSize);
          break;
      }

      ctx.restore();
    }
  }

  // Reset global alpha
  ctx.globalAlpha = 1.0;
}

function drawCircle(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawSquare(ctx: CanvasRenderingContext2D, size: number) {
  const half = size / 2;
  ctx.fillRect(-half, -half, size, size);
}

function drawTriangle(ctx: CanvasRenderingContext2D, size: number) {
  const height = (size * Math.sqrt(3)) / 2;
  ctx.beginPath();
  ctx.moveTo(0, -height / 2);
  ctx.lineTo(-size / 2, height / 2);
  ctx.lineTo(size / 2, height / 2);
  ctx.closePath();
  ctx.fill();
}

function drawHexagon(ctx: CanvasRenderingContext2D, size: number) {
  const sides = 6;
  const radius = size / 2;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const outerRadius = size / 2;
  const innerRadius = size / 4;
  const points = 5;

  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function drawDiamond(ctx: CanvasRenderingContext2D, size: number) {
  const half = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, -half);
  ctx.lineTo(half, 0);
  ctx.lineTo(0, half);
  ctx.lineTo(-half, 0);
  ctx.closePath();
  ctx.fill();
}

function drawPentagon(ctx: CanvasRenderingContext2D, size: number) {
  const sides = 5;
  const radius = size / 2;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function randomizeColor(baseColor: string): string {
  // Parse hex color
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Add random variation (-30 to +30)
  const variation = 30;
  const newR = Math.max(0, Math.min(255, r + (Math.random() * variation * 2 - variation)));
  const newG = Math.max(0, Math.min(255, g + (Math.random() * variation * 2 - variation)));
  const newB = Math.max(0, Math.min(255, b + (Math.random() * variation * 2 - variation)));

  return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
}
