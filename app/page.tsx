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
import { useHistory } from "@/lib/hooks/useHistory";
import { decodePatternFromURL, copyShareableURL } from "@/lib/urlState";
import { Undo2, Redo2 } from "lucide-react";

export type ExportSize = 512 | 1024 | 2048 | 4096;

interface PatternState {
  type: PatternType;
  config: PatternConfig;
  name: string;
}

export default function Home() {
  const {
    state: patternState,
    setState: setPatternState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<PatternState>({
    type: 'geometric',
    config: defaultGeometricConfig,
    name: 'My Pattern',
  });

  const [exportSize, setExportSize] = useState<ExportSize>(1024);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Local state for pattern name input (not tracked in history until blur)
  const [nameInputValue, setNameInputValue] = useState(patternState.name);

  // Extract pattern type, config, and name from history state
  const patternType = patternState.type;
  const config = patternState.config;
  const patternName = patternState.name;

  // Sync local name input with history state when it changes (e.g., undo/redo)
  useEffect(() => {
    setNameInputValue(patternState.name);
  }, [patternState.name]);

  // Wrapper functions for updating state
  const setPatternType = useCallback((type: PatternType) => {
    setPatternState({ type, config: patternState.config, name: patternState.name });
  }, [setPatternState, patternState.config, patternState.name]);

  const setConfig = useCallback((newConfig: PatternConfig) => {
    setPatternState({ type: patternState.type, config: newConfig, name: patternState.name });
  }, [setPatternState, patternState.type, patternState.name]);

  // Only commit name changes to history when user finishes editing
  const commitPatternName = useCallback((name: string) => {
    const trimmedName = name.trim() || 'My Pattern';
    if (trimmedName !== patternState.name) {
      setPatternState({ type: patternState.type, config: patternState.config, name: trimmedName });
    }
  }, [setPatternState, patternState.type, patternState.config, patternState.name]);

  // Handle undo with toast feedback
  const handleUndo = useCallback(() => {
    if (canUndo) {
      undo();
      toast.success('Undone');
    }
  }, [undo, canUndo]);

  // Handle redo with toast feedback
  const handleRedo = useCallback(() => {
    if (canRedo) {
      redo();
      toast.success('Redone');
    }
  }, [redo, canRedo]);

  // Load pattern from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const patternParam = urlParams.get('pattern');

    if (patternParam) {
      const decoded = decodePatternFromURL(patternParam);
      if (decoded) {
        setPatternState({
          type: decoded.type,
          config: decoded.config,
          name: decoded.name || 'Shared Pattern'
        });
        toast.success('Pattern loaded from URL!');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const success = await copyShareableURL(patternType, config, patternName);

      if (success) {
        toast.success('Shareable link copied to clipboard!', { id: 'share-url', duration: 4000 });
      } else {
        throw new Error('Failed to copy URL');
      }
    } catch (error) {
      console.error('Share URL failed:', error);
      toast.error('Failed to generate shareable link', { id: 'share-url' });
    }
  }, [patternType, config, patternName]);

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

      // Create filename from pattern name (sanitized)
      const sanitizedName = patternName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `${sanitizedName}-${exportSize}x${exportSize}.png`;

      renderPattern(ctx, exportSize, exportSize, patternType, config);
      exportAsPNG(exportCanvas, filename);

      toast.success(`PNG exported successfully (${exportSize}x${exportSize}px)`, { id: 'export-png' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export PNG. Please try again.', { id: 'export-png' });
    }
  }, [exportSize, patternType, config, patternName]);

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

      // Create filename from pattern name (sanitized)
      const sanitizedName = patternName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `${sanitizedName}-${exportSize}x${exportSize}.svg`;

      exportAsSVG(exportSize, exportSize, svgContent, filename);

      toast.success(`SVG exported successfully (${exportSize}x${exportSize}px)`, { id: 'export-svg' });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export SVG. Please try again.', { id: 'export-svg' });
    }
  }, [exportSize, patternType, config, patternName]);

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
    onUndo: handleUndo,
    onRedo: handleRedo,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Top Bar - Modern Glassmorphism */}
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-glass border-b border-gray-200/50 px-4 md:px-6 py-3 md:py-4 z-10 shadow-modern">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Pattern Playground
                  </h1>
                  <span className="text-gray-400/60 hidden md:inline">•</span>
                  <input
                    type="text"
                    value={nameInputValue}
                    onChange={(e) => setNameInputValue(e.target.value)}
                    onBlur={(e) => commitPatternName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                    maxLength={50}
                    aria-label="Pattern name"
                    title="Click to edit pattern name"
                    className="text-base md:text-lg font-semibold text-gray-700 bg-transparent border-b-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-all duration-200 px-2 py-0.5 max-w-[200px] cursor-text"
                    placeholder="My Pattern"
                  />
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1 hidden sm:block">
                  Create beautiful, customizable patterns for your designs
                </p>
              </div>
              {/* Undo/Redo Buttons - Modern Style */}
              <div className="hidden md:flex items-center gap-1.5 ml-4 bg-gray-100/60 rounded-lg p-1">
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  aria-label="Undo last change"
                  className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 hover:text-blue-600"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  aria-label="Redo last change"
                  className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 hover:text-blue-600"
                  title="Redo (Ctrl+Shift+Z)"
                >
                  <Redo2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <kbd className="px-2.5 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md border border-gray-200 shadow-sm font-medium text-gray-700">Ctrl+Z</kbd>
                <span className="text-gray-500">Undo</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2.5 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md border border-gray-200 shadow-sm font-medium text-gray-700">R</kbd>
                <span className="text-gray-500">Randomize</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2.5 py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md border border-gray-200 shadow-sm font-medium text-gray-700">Ctrl+E</kbd>
                <span className="text-gray-500">Export</span>
              </div>
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

          {/* Canvas Area - Modern Design */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-auto scrollbar-modern">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-modern-xl p-6 md:p-8 w-full max-w-4xl border border-gray-200/50 transition-all duration-300 hover:shadow-2xl">
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
