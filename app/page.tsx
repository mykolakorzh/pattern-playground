"use client"

import { useState } from "react";
import { toast } from "sonner";
import { PatternType, PatternConfig } from "@/lib/types";
import { PatternCanvas } from "@/components/pattern-playground/PatternCanvas";
import { ControlPanel } from "@/components/pattern-playground/ControlPanel";
import { defaultGeometricConfig } from "@/lib/presets";
import { exportAsPNG, exportAsSVG, generateGeometricSVG, generateDotsSVG } from "@/lib/export";
import { GeometricPatternConfig, DotsPatternConfig } from "@/lib/types";
import { renderPattern } from "@/lib/patterns";

export type ExportSize = 512 | 1024 | 2048 | 4096;

export default function Home() {
  const [patternType, setPatternType] = useState<PatternType>('geometric');
  const [config, setConfig] = useState<PatternConfig>(defaultGeometricConfig);
  const [exportSize, setExportSize] = useState<ExportSize>(1024);

  // Handle PNG export
  const handleExportPNG = () => {
    try {
      toast.loading('Generating PNG...', { id: 'export-png' });

      // Create a temporary high-res canvas for export
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = exportSize;
      exportCanvas.height = exportSize;
      const ctx = exportCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to create canvas context');
      }

      renderPattern(ctx, exportSize, exportSize, patternType, config);
      exportAsPNG(exportCanvas, `pattern-${patternType}-${exportSize}x${exportSize}-${Date.now()}.png`);

      toast.success(`PNG exported successfully (${exportSize}x${exportSize}px)`, { id: 'export-png' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export PNG. Please try again.', { id: 'export-png' });
    }
  };

  // Handle SVG export
  const handleExportSVG = () => {
    try {
      toast.loading('Generating SVG...', { id: 'export-svg' });

      let svgContent = '';

      if (patternType === 'geometric') {
        svgContent = generateGeometricSVG(exportSize, exportSize, config as GeometricPatternConfig);
      } else if (patternType === 'dots' && (config as DotsPatternConfig).style === 'grid') {
        svgContent = generateDotsSVG(exportSize, exportSize, config as DotsPatternConfig);
      }

      if (!svgContent) {
        throw new Error('Failed to generate SVG content');
      }

      exportAsSVG(exportSize, exportSize, svgContent, `pattern-${patternType}-${exportSize}x${exportSize}-${Date.now()}.svg`);

      toast.success(`SVG exported successfully (${exportSize}x${exportSize}px)`, { id: 'export-svg' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export SVG. Please try again.', { id: 'export-svg' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 z-10">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pattern Playground</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 hidden sm:block">
            Create beautiful, customizable patterns for your designs
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row w-full pt-16 md:pt-20 h-full">
          {/* Left Sidebar - Controls */}
          <div className="lg:max-w-xs lg:min-w-[20rem]">
            <ControlPanel
              patternType={patternType}
              config={config}
              onPatternTypeChange={setPatternType}
              onConfigChange={setConfig}
              onExportPNG={handleExportPNG}
              onExportSVG={handleExportSVG}
              exportSize={exportSize}
              onExportSizeChange={setExportSize}
            />
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-4xl">
              <div className="w-full aspect-square max-w-[800px] mx-auto">
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
      </div>
    </main>
  );
}
