"use client"

import { useEffect, useRef, memo } from "react";
import { PatternType, PatternConfig } from "@/lib/types";
import { renderPattern } from "@/lib/patterns";

interface PresetThumbnailProps {
  patternType: PatternType;
  config: PatternConfig;
  size?: number;
  className?: string;
}

/**
 * Renders a small thumbnail preview of a pattern preset
 * Memoized for performance to avoid unnecessary re-renders
 */
export const PresetThumbnail = memo<PresetThumbnailProps>(
  function PresetThumbnail({ patternType, config, size = 80, className = "" }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Render pattern at thumbnail size
      renderPattern(ctx, size, size, patternType, config);
    }, [patternType, config, size]);

    return (
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className={`rounded border border-gray-200 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }
);
