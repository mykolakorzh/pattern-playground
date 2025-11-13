// Pattern types
export type PatternType = 'geometric' | 'dots' | 'noise';

// Shape types for geometric patterns
export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'diamond' | 'pentagon';

// Dots pattern style
export type DotsStyle = 'grid' | 'random';

// Base pattern config
export interface BasePatternConfig {
  backgroundColor: string;
  opacity?: number; // 0-100, pattern opacity
}

// Geometric pattern configuration
export interface GeometricPatternConfig extends BasePatternConfig {
  shape: ShapeType;
  size: number;
  spacing: number;
  rotation: number;
  shapeColor: string;
  sizeVariation?: number; // 0-100, random size variation percentage
  colorVariation?: boolean; // Enable random color variations
}

// Dots pattern configuration
export interface DotsPatternConfig extends BasePatternConfig {
  dotSize: number;
  density: number;
  sizeVariation: number;
  style: DotsStyle;
  dotColor: string;
  accentColor?: string;
}

// Noise/Grain pattern configuration
export interface NoisePatternConfig extends BasePatternConfig {
  intensity: number;
  scale: number;
  colorTint: string;
}

// Union type for all pattern configs
export type PatternConfig =
  | GeometricPatternConfig
  | DotsPatternConfig
  | NoisePatternConfig;

// Preset type
export interface PatternPreset {
  name: string;
  config: PatternConfig;
}
