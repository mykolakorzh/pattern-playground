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
        className="rounded-lg shadow-inner bg-white w-full h-auto aspect-square transition-all duration-300 ring-1 ring-gray-200/60 group-hover:ring-2 group-hover:ring-blue-300/50"
        style={{
          maxWidth: '100%',
          height: 'auto',
          imageRendering: 'crisp-edges'
        }}
        aria-label="Pattern preview canvas"
      />
    );
  }
);
