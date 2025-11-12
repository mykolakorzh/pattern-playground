"use client"

import { useEffect, useRef } from "react";
import { PatternType, PatternConfig } from "@/lib/types";
import { renderPattern } from "@/lib/patterns";

interface PatternCanvasProps {
  patternType: PatternType;
  config: PatternConfig;
  width?: number;
  height?: number;
}

/**
 * Canvas component that renders patterns in real-time
 * Updates automatically when pattern type or config changes
 */
export function PatternCanvas({
  patternType,
  config,
  width = 800,
  height = 800,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Render pattern
    renderPattern(ctx, width, height, patternType, config);
  }, [patternType, config, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-300 rounded-lg shadow-lg bg-white w-full h-auto max-w-full"
      style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
    />
  );
}

// Export function to get canvas element (for exporting)
export function usePatternCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  return canvasRef.current;
}
