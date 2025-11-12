import { NoisePatternConfig } from "../types";

/**
 * Draws a noise/grain texture on the canvas
 * Creates a random grain effect with color tinting
 */
export function drawNoisePattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: NoisePatternConfig
) {
  // Fill base color
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Create image data for pixel manipulation
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Parse tint color
  const tintColor = hexToRgb(config.colorTint);

  // Generate noise based on scale
  const scale = config.scale;
  const intensity = config.intensity / 100;

  for (let y = 0; y < height; y += scale) {
    for (let x = 0; x < width; x += scale) {
      // Generate random noise value
      const noise = Math.random();
      const noiseValue = noise * intensity * 255;

      // Apply noise to a block of pixels (based on scale)
      for (let dy = 0; dy < scale && y + dy < height; dy++) {
        for (let dx = 0; dx < scale && x + dx < width; dx++) {
          const index = ((y + dy) * width + (x + dx)) * 4;

          // Blend noise with tint color
          data[index] = Math.min(255, data[index] + (tintColor.r * noise + noiseValue - 128));
          data[index + 1] = Math.min(255, data[index + 1] + (tintColor.g * noise + noiseValue - 128));
          data[index + 2] = Math.min(255, data[index + 2] + (tintColor.b * noise + noiseValue - 128));
          data[index + 3] = 255; // Alpha
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}
