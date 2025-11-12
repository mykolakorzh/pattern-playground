import { PatternType, PatternConfig, GeometricPatternConfig, DotsPatternConfig, NoisePatternConfig } from "../types";
import { drawGeometricPattern } from "./geometric";
import { drawDotsPattern } from "./dots";
import { drawNoisePattern } from "./noise";

/**
 * Main pattern renderer - coordinates all pattern types
 */
export function renderPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  type: PatternType,
  config: PatternConfig
) {
  switch (type) {
    case 'geometric':
      drawGeometricPattern(ctx, width, height, config as GeometricPatternConfig);
      break;
    case 'dots':
      drawDotsPattern(ctx, width, height, config as DotsPatternConfig);
      break;
    case 'noise':
      drawNoisePattern(ctx, width, height, config as NoisePatternConfig);
      break;
  }
}

export * from "./geometric";
export * from "./dots";
export * from "./noise";
