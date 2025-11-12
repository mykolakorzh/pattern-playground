"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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
 * Exposes canvas ref for external access (e.g., copy to clipboard)
 */
export const PatternCanvas = forwardRef<HTMLCanvasElement, PatternCanvasProps>(
  function PatternCanvas(
    { patternType, config, width = 800, height = 800 },
    forwardedRef
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Expose the canvas element to parent via ref
    useImperativeHandle(forwardedRef, () => canvasRef.current!);

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
        className="border-2 border-gray-200/60 rounded-xl shadow-modern-lg bg-white w-full h-auto max-w-full transition-all duration-300 hover:border-blue-200/60"
        style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
      />
    );
  }
);
