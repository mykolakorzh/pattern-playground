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

  // Calculate grid dimensions
  const totalSize = config.size + config.spacing;
  const cols = Math.ceil(width / totalSize) + 1;
  const rows = Math.ceil(height / totalSize) + 1;

  // Set shape color
  ctx.fillStyle = config.shapeColor;
  ctx.strokeStyle = config.shapeColor;

  // Draw shapes in grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * totalSize + config.size / 2;
      const y = row * totalSize + config.size / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((config.rotation * Math.PI) / 180);

      switch (config.shape) {
        case 'circle':
          drawCircle(ctx, config.size);
          break;
        case 'square':
          drawSquare(ctx, config.size);
          break;
        case 'triangle':
          drawTriangle(ctx, config.size);
          break;
      }

      ctx.restore();
    }
  }
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
