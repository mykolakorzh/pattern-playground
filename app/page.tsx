"use client"

import { useState, useRef } from "react";
import { PatternType, PatternConfig } from "@/lib/types";
import { PatternCanvas } from "@/components/pattern-playground/PatternCanvas";
import { ControlPanel } from "@/components/pattern-playground/ControlPanel";
import { defaultGeometricConfig } from "@/lib/presets";
import { exportAsPNG, exportAsSVG, generateGeometricSVG, generateDotsSVG } from "@/lib/export";
import { GeometricPatternConfig, DotsPatternConfig } from "@/lib/types";

export default function Home() {
  const [patternType, setPatternType] = useState<PatternType>('geometric');
  const [config, setConfig] = useState<PatternConfig>(defaultGeometricConfig);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle PNG export
  const handleExportPNG = () => {
    // Create a temporary high-res canvas for export
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1024;
    exportCanvas.height = 1024;
    const ctx = exportCanvas.getContext('2d');

    if (ctx) {
      const { renderPattern } = require('@/lib/patterns');
      renderPattern(ctx, 1024, 1024, patternType, config);
      exportAsPNG(exportCanvas, `pattern-${patternType}-${Date.now()}.png`);
    }
  };

  // Handle SVG export
  const handleExportSVG = () => {
    let svgContent = '';

    if (patternType === 'geometric') {
      svgContent = generateGeometricSVG(1024, 1024, config as GeometricPatternConfig);
    } else if (patternType === 'dots' && (config as DotsPatternConfig).style === 'grid') {
      svgContent = generateDotsSVG(1024, 1024, config as DotsPatternConfig);
    }

    if (svgContent) {
      exportAsSVG(1024, 1024, svgContent, `pattern-${patternType}-${Date.now()}.svg`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Pattern Playground</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create beautiful, customizable patterns for your designs
          </p>
        </div>

        {/* Main Content */}
        <div className="flex w-full pt-20">
          {/* Left Sidebar - Controls */}
          <ControlPanel
            patternType={patternType}
            config={config}
            onPatternTypeChange={setPatternType}
            onConfigChange={setConfig}
            onExportPNG={handleExportPNG}
            onExportSVG={handleExportSVG}
          />

          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <PatternCanvas
                patternType={patternType}
                config={config}
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
