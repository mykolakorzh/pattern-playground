"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { PatternType, PatternConfig } from "@/lib/types";
import { PatternCanvas } from "@/components/pattern-playground/PatternCanvas";
import { ControlPanel } from "@/components/pattern-playground/ControlPanel";
import { defaultGeometricConfig } from "@/lib/presets";
import { exportAsPNG, exportAsSVG, generateGeometricSVG, generateDotsSVG, copyCanvasToClipboard } from "@/lib/export";
import { GeometricPatternConfig, DotsPatternConfig } from "@/lib/types";
import { renderPattern } from "@/lib/patterns";
import { useKeyboardShortcuts } from "@/lib/hooks/useKeyboardShortcuts";
import { decodePatternFromURL, copyShareableURL } from "@/lib/urlState";

export type ExportSize = 512 | 1024 | 2048 | 4096;

export default function Home() {
  const [patternType, setPatternType] = useState<PatternType>('geometric');
  const [config, setConfig] = useState<PatternConfig>(defaultGeometricConfig);
  const [exportSize, setExportSize] = useState<ExportSize>(1024);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load pattern from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const patternParam = urlParams.get('pattern');

    if (patternParam) {
      const decoded = decodePatternFromURL(patternParam);
      if (decoded) {
        setPatternType(decoded.type);
        setConfig(decoded.config);
        toast.success('Pattern loaded from URL!');
      }
    }
  }, []);

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    try {
      if (!canvasRef.current) {
        throw new Error('Canvas not available');
      }

      toast.loading('Copying to clipboard...', { id: 'copy-clipboard' });

      const success = await copyCanvasToClipboard(canvasRef.current);

      if (success) {
        toast.success('Pattern copied to clipboard!', { id: 'copy-clipboard' });
      } else {
        throw new Error('Copy failed');
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      toast.error('Failed to copy to clipboard', { id: 'copy-clipboard' });
    }
  }, []);

  // Handle share URL
  const handleShareURL = useCallback(async () => {
    try {
      toast.loading('Generating shareable link...', { id: 'share-url' });

      const success = await copyShareableURL(patternType, config);

      if (success) {
        toast.success('Shareable link copied to clipboard!', { id: 'share-url', duration: 4000 });
      } else {
        throw new Error('Failed to copy URL');
      }
    } catch (error) {
      console.error('Share URL failed:', error);
      toast.error('Failed to generate shareable link', { id: 'share-url' });
    }
  }, [patternType, config]);

  // Handle PNG export
  const handleExportPNG = useCallback(() => {
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
  }, [exportSize, patternType, config]);

  // Handle SVG export
  const handleExportSVG = useCallback(() => {
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
  }, [exportSize, patternType, config]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onRandomize: () => {
      // Trigger randomize from control panel (we'll pass this down)
      const event = new CustomEvent('pattern-randomize');
      window.dispatchEvent(event);
    },
    onExport: handleExportPNG,
    onExportSVG: handleExportSVG,
    onCopy: handleCopyToClipboard,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pattern Playground</h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 hidden sm:block">
                Create beautiful, customizable patterns for your designs
              </p>
            </div>
            <div className="hidden lg:block text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">R</kbd> Randomize •{" "}
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Ctrl+E</kbd> Export •{" "}
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Ctrl+C</kbd> Copy
            </div>
          </div>
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
              onCopyToClipboard={handleCopyToClipboard}
              onShareURL={handleShareURL}
              exportSize={exportSize}
              onExportSizeChange={setExportSize}
            />
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
            <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-4xl">
              <div className="w-full aspect-square max-w-[800px] mx-auto">
                <PatternCanvas
                  ref={canvasRef}
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
