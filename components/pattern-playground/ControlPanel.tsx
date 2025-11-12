"use client"

import { useState } from "react";
import { toast } from "sonner";
import { PatternType, PatternConfig, GeometricPatternConfig, DotsPatternConfig, NoisePatternConfig } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GeometricControls } from "./GeometricControls";
import { DotsControls } from "./DotsControls";
import { NoiseControls } from "./NoiseControls";
import { PresetThumbnail } from "./PresetThumbnail";
import { geometricPresets, dotsPresets, noisePresets, defaultGeometricConfig, defaultDotsConfig, defaultNoiseConfig } from "@/lib/presets";
import { Shuffle, Download, Copy, Share2 } from "lucide-react";
import type { ExportSize } from "@/app/page";

interface ControlPanelProps {
  patternType: PatternType;
  config: PatternConfig;
  onPatternTypeChange: (type: PatternType) => void;
  onConfigChange: (config: PatternConfig) => void;
  onExportPNG: () => void;
  onExportSVG: () => void;
  onCopyToClipboard: () => void;
  onShareURL: () => void;
  exportSize: ExportSize;
  onExportSizeChange: (size: ExportSize) => void;
}

export function ControlPanel({
  patternType,
  config,
  onPatternTypeChange,
  onConfigChange,
  onExportPNG,
  onExportSVG,
  onCopyToClipboard,
  onShareURL,
  exportSize,
  onExportSizeChange,
}: ControlPanelProps) {
  const handlePatternTypeChange = (type: PatternType) => {
    onPatternTypeChange(type);
    // Set default config for new pattern type
    switch (type) {
      case 'geometric':
        onConfigChange(defaultGeometricConfig);
        break;
      case 'dots':
        onConfigChange(defaultDotsConfig);
        break;
      case 'noise':
        onConfigChange(defaultNoiseConfig);
        break;
    }
  };

  const handleRandomize = () => {
    switch (patternType) {
      case 'geometric':
        const gConfig = config as GeometricPatternConfig;
        onConfigChange({
          ...gConfig,
          shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any,
          size: Math.floor(Math.random() * 70) + 20,
          spacing: Math.floor(Math.random() * 40) + 10,
          rotation: Math.floor(Math.random() * 360),
          shapeColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        });
        break;
      case 'dots':
        const dConfig = config as DotsPatternConfig;
        onConfigChange({
          ...dConfig,
          dotSize: Math.floor(Math.random() * 35) + 10,
          density: Math.random() * 0.7 + 0.3,
          sizeVariation: Math.floor(Math.random() * 80) + 10,
          style: Math.random() > 0.5 ? 'grid' : 'random',
          dotColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        });
        break;
      case 'noise':
        const nConfig = config as NoisePatternConfig;
        onConfigChange({
          ...nConfig,
          intensity: Math.floor(Math.random() * 70) + 20,
          scale: Math.floor(Math.random() * 15) + 2,
          colorTint: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        });
        break;
    }
    toast.success('Pattern randomized!');
  };

  const getPresets = () => {
    switch (patternType) {
      case 'geometric':
        return geometricPresets;
      case 'dots':
        return dotsPresets;
      case 'noise':
        return noisePresets;
      default:
        return [];
    }
  };

  const canExportSVG = patternType === 'geometric' || (patternType === 'dots' && (config as DotsPatternConfig).style === 'grid');

  return (
    <div className="w-full lg:w-80 bg-white/95 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-gray-200/50 p-3 sm:p-4 md:p-6 overflow-y-auto h-auto lg:h-full max-h-[45vh] sm:max-h-[50vh] lg:max-h-full scrollbar-modern shadow-modern">
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Pattern Type Selector - Modern Segmented Control */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900">Pattern Type</Label>
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-gray-100/80 rounded-lg">
            <Button
              variant={patternType === 'geometric' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('geometric')}
              className={`text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                patternType === 'geometric'
                  ? 'bg-white shadow-sm text-blue-700'
                  : 'hover:bg-white/60 active:bg-white/80'
              }`}
            >
              Geometric
            </Button>
            <Button
              variant={patternType === 'dots' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('dots')}
              className={`text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                patternType === 'dots'
                  ? 'bg-white shadow-sm text-blue-700'
                  : 'hover:bg-white/60 active:bg-white/80'
              }`}
            >
              Dots
            </Button>
            <Button
              variant={patternType === 'noise' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('noise')}
              className={`text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                patternType === 'noise'
                  ? 'bg-white shadow-sm text-blue-700'
                  : 'hover:bg-white/60 active:bg-white/80'
              }`}
            >
              Noise
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/60" />

        {/* Controls Section */}
        <div>
          <h2 className="text-sm font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Controls
          </h2>
          {patternType === 'geometric' && (
            <GeometricControls
              config={config as GeometricPatternConfig}
              onChange={onConfigChange}
            />
          )}
          {patternType === 'dots' && (
            <DotsControls
              config={config as DotsPatternConfig}
              onChange={onConfigChange}
            />
          )}
          {patternType === 'noise' && (
            <NoiseControls
              config={config as NoisePatternConfig}
              onChange={onConfigChange}
            />
          )}
        </div>

        {/* Randomize Button - Mobile Optimized */}
        <Button
          variant="outline"
          onClick={handleRandomize}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 active:from-blue-150 active:to-indigo-150 border-2 border-blue-200 hover:border-blue-300 active:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-modern min-h-[44px] text-sm sm:text-base"
        >
          <Shuffle className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-semibold">Randomize</span>
        </Button>

        {/* Divider */}
        <div className="border-t border-gray-200/60" />

        {/* Presets Section - Mobile Optimized */}
        <div>
          <h2 className="text-sm font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Presets
          </h2>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {getPresets().map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  onConfigChange(preset.config);
                  toast.success(`Preset "${preset.name}" applied!`);
                }}
                aria-label={`Apply ${preset.name} preset`}
                title={`Apply ${preset.name} preset`}
                className="group flex flex-col items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl border-2 border-gray-200/60 hover:border-blue-300 active:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 active:from-blue-100 active:to-indigo-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-modern active:scale-95 min-h-[120px] sm:min-h-[130px]"
              >
                <div className="rounded-lg overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-200 group-active:ring-blue-300 transition-all duration-300">
                  <PresetThumbnail
                    patternType={patternType}
                    config={preset.config}
                    size={80}
                    className="shadow-sm"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 group-active:text-blue-800 text-center leading-tight transition-colors">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/60" />

        {/* Export Section */}
        <div>
          <h2 className="text-sm font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Export
          </h2>
          <div className="space-y-3">
            {/* Export Size Selector */}
            <div className="space-y-2">
              <Label>Export Resolution</Label>
              <Select
                value={exportSize.toString()}
                onValueChange={(value) => onExportSizeChange(Number(value) as ExportSize)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512">512 × 512px</SelectItem>
                  <SelectItem value="1024">1024 × 1024px</SelectItem>
                  <SelectItem value="2048">2048 × 2048px (2K)</SelectItem>
                  <SelectItem value="4096">4096 × 4096px (4K)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Higher resolutions are better for print
              </p>
            </div>

            {/* Export Buttons - Mobile Optimized */}
            <div className="space-y-2 sm:space-y-2.5">
              <Button
                onClick={onExportPNG}
                className="w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 shadow-sm hover:shadow-modern transition-all duration-300 min-h-[44px] text-sm sm:text-base"
              >
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                <span className="font-semibold">Export as PNG</span>
              </Button>
              {canExportSVG && (
                <Button
                  onClick={onExportSVG}
                  variant="outline"
                  className="w-full group border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 active:from-blue-100 active:to-indigo-100 transition-all duration-300 shadow-sm hover:shadow-modern min-h-[44px] text-sm sm:text-base"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  <span className="font-semibold">Export as SVG</span>
                </Button>
              )}
              {!canExportSVG && (
                <p className="text-xs text-gray-500 text-center py-2.5 bg-gray-50 rounded-lg border border-gray-200/60">
                  SVG export not available for this pattern
                </p>
              )}

              {/* Quick Actions - Mobile Optimized */}
              <div className="pt-2.5 sm:pt-3 space-y-2 border-t border-gray-200/60">
                <Button
                  onClick={onCopyToClipboard}
                  variant="secondary"
                  className="w-full group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 active:from-gray-200 active:to-gray-300 border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-modern min-h-[44px] text-sm sm:text-base"
                >
                  <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Copy to Clipboard</span>
                </Button>
                <Button
                  onClick={onShareURL}
                  variant="secondary"
                  className="w-full group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 active:from-gray-200 active:to-gray-300 border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-modern min-h-[44px] text-sm sm:text-base"
                >
                  <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Share Link</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
