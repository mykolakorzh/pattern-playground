import { saveAs } from 'file-saver';

/**
 * Exports canvas as PNG file
 */
export function exportAsPNG(canvas: HTMLCanvasElement, filename: string = 'pattern.png') {
  canvas.toBlob((blob) => {
    if (blob) {
      saveAs(blob, filename);
    }
  }, 'image/png');
}

/**
 * Exports geometric pattern as SVG
 * Note: This is a simplified implementation for geometric patterns
 * Noise patterns cannot be exported as SVG
 */
export function exportAsSVG(
  width: number,
  height: number,
  svgContent: string,
  filename: string = 'pattern.svg'
) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${svgContent}
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(blob, filename);
}

/**
 * Generates SVG content for geometric patterns
 */
export function generateGeometricSVG(
  width: number,
  height: number,
  config: {
    shape: string;
    size: number;
    spacing: number;
    rotation: number;
    shapeColor: string;
    backgroundColor: string;
  }
): string {
  const totalSize = config.size + config.spacing;
  const cols = Math.ceil(width / totalSize) + 1;
  const rows = Math.ceil(height / totalSize) + 1;

  let shapes = `<rect width="${width}" height="${height}" fill="${config.backgroundColor}"/>`;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * totalSize + config.size / 2;
      const y = row * totalSize + config.size / 2;

      let shape = '';
      switch (config.shape) {
        case 'circle':
          shape = `<circle cx="${x}" cy="${y}" r="${config.size / 2}" fill="${config.shapeColor}" transform="rotate(${config.rotation} ${x} ${y})"/>`;
          break;
        case 'square':
          shape = `<rect x="${x - config.size / 2}" y="${y - config.size / 2}" width="${config.size}" height="${config.size}" fill="${config.shapeColor}" transform="rotate(${config.rotation} ${x} ${y})"/>`;
          break;
        case 'triangle':
          const height = (config.size * Math.sqrt(3)) / 2;
          const points = `${x},${y - height / 2} ${x - config.size / 2},${y + height / 2} ${x + config.size / 2},${y + height / 2}`;
          shape = `<polygon points="${points}" fill="${config.shapeColor}" transform="rotate(${config.rotation} ${x} ${y})"/>`;
          break;
      }
      shapes += shape;
    }
  }

  return shapes;
}

/**
 * Generates SVG content for dots patterns
 */
export function generateDotsSVG(
  width: number,
  height: number,
  config: {
    dotSize: number;
    density: number;
    style: string;
    dotColor: string;
    backgroundColor: string;
  }
): string {
  let shapes = `<rect width="${width}" height="${height}" fill="${config.backgroundColor}"/>`;

  if (config.style === 'grid') {
    const spacing = Math.max(config.dotSize * 2, config.dotSize / config.density);
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + spacing / 2;
        const y = row * spacing + spacing / 2;
        shapes += `<circle cx="${x}" cy="${y}" r="${config.dotSize / 2}" fill="${config.dotColor}"/>`;
      }
    }
  }

  return shapes;
}
