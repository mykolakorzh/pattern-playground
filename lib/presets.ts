import {
  GeometricPatternConfig,
  DotsPatternConfig,
  NoisePatternConfig,
  PatternPreset,
} from "./types";

// Default configurations for each pattern type
export const defaultGeometricConfig: GeometricPatternConfig = {
  shape: 'circle',
  size: 40,
  spacing: 20,
  rotation: 0,
  shapeColor: '#3b82f6',
  backgroundColor: '#ffffff',
};

export const defaultDotsConfig: DotsPatternConfig = {
  dotSize: 20,
  density: 0.5,
  sizeVariation: 30,
  style: 'grid',
  dotColor: '#8b5cf6',
  backgroundColor: '#ffffff',
};

export const defaultNoiseConfig: NoisePatternConfig = {
  intensity: 50,
  scale: 3,
  colorTint: '#6366f1',
  backgroundColor: '#f5f5f5',
};

// Geometric presets
export const geometricPresets: PatternPreset[] = [
  {
    name: 'Classic Dots',
    config: {
      shape: 'circle',
      size: 30,
      spacing: 25,
      rotation: 0,
      shapeColor: '#3b82f6',
      backgroundColor: '#ffffff',
    },
  },
  {
    name: 'Rotated Squares',
    config: {
      shape: 'square',
      size: 35,
      spacing: 20,
      rotation: 45,
      shapeColor: '#10b981',
      backgroundColor: '#f0fdf4',
    },
  },
  {
    name: 'Triangle Grid',
    config: {
      shape: 'triangle',
      size: 40,
      spacing: 15,
      rotation: 0,
      shapeColor: '#f59e0b',
      backgroundColor: '#fffbeb',
    },
  },
  {
    name: 'Dense Circles',
    config: {
      shape: 'circle',
      size: 25,
      spacing: 10,
      rotation: 0,
      shapeColor: '#ec4899',
      backgroundColor: '#fdf2f8',
    },
  },
  {
    name: 'Bold Squares',
    config: {
      shape: 'square',
      size: 50,
      spacing: 30,
      rotation: 0,
      shapeColor: '#1f2937',
      backgroundColor: '#f9fafb',
    },
  },
];

// Dots presets
export const dotsPresets: PatternPreset[] = [
  {
    name: 'Uniform Grid',
    config: {
      dotSize: 18,
      density: 0.4,
      sizeVariation: 0,
      style: 'grid',
      dotColor: '#8b5cf6',
      backgroundColor: '#ffffff',
    },
  },
  {
    name: 'Scattered',
    config: {
      dotSize: 25,
      density: 0.3,
      sizeVariation: 50,
      style: 'random',
      dotColor: '#06b6d4',
      backgroundColor: '#f0fdfa',
    },
  },
  {
    name: 'Varied Grid',
    config: {
      dotSize: 20,
      density: 0.5,
      sizeVariation: 40,
      style: 'grid',
      dotColor: '#f59e0b',
      accentColor: '#ef4444',
      backgroundColor: '#fffbeb',
    },
  },
  {
    name: 'Dense Random',
    config: {
      dotSize: 15,
      density: 0.7,
      sizeVariation: 60,
      style: 'random',
      dotColor: '#6366f1',
      backgroundColor: '#eef2ff',
    },
  },
  {
    name: 'Polka Dots',
    config: {
      dotSize: 30,
      density: 0.35,
      sizeVariation: 10,
      style: 'grid',
      dotColor: '#ec4899',
      backgroundColor: '#ffffff',
    },
  },
];

// Noise presets
export const noisePresets: PatternPreset[] = [
  {
    name: 'Subtle Grain',
    config: {
      intensity: 30,
      scale: 2,
      colorTint: '#94a3b8',
      backgroundColor: '#f8fafc',
    },
  },
  {
    name: 'Heavy Texture',
    config: {
      intensity: 70,
      scale: 4,
      colorTint: '#475569',
      backgroundColor: '#e2e8f0',
    },
  },
  {
    name: 'Blue Tint',
    config: {
      intensity: 45,
      scale: 3,
      colorTint: '#3b82f6',
      backgroundColor: '#eff6ff',
    },
  },
  {
    name: 'Warm Noise',
    config: {
      intensity: 55,
      scale: 5,
      colorTint: '#f59e0b',
      backgroundColor: '#fef3c7',
    },
  },
  {
    name: 'Fine Grain',
    config: {
      intensity: 40,
      scale: 1,
      colorTint: '#64748b',
      backgroundColor: '#ffffff',
    },
  },
];
