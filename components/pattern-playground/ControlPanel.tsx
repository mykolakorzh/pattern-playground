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
import { ColorPaletteSelector } from "./ColorPaletteSelector";
import { geometricPresets, dotsPresets, noisePresets, defaultGeometricConfig, defaultDotsConfig, defaultNoiseConfig } from "@/lib/presets";
import { colorPalettes, type ColorPalette } from "@/lib/colorPalettes";
import { Shuffle, Download, Copy, Share2, Grid3x3, Code2, Palette } from "lucide-react";
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
  onToggleTiling?: () => void;
  showTiling?: boolean;
  onExportCSS?: () => void;
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
  onToggleTiling,
  showTiling,
  onExportCSS,
}: ControlPanelProps) {
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);

  const handleApplyPalette = (palette: ColorPalette) => {
    const updatedConfig = { ...config };

    // Apply colors based on pattern type
    if (patternType === 'geometric') {
      const gConfig = updatedConfig as GeometricPatternConfig;
      gConfig.shapeColor = palette.colors.primary;
      gConfig.backgroundColor = palette.colors.background;
    } else if (patternType === 'dots') {
      const dConfig = updatedConfig as DotsPatternConfig;
      dConfig.dotColor = palette.colors.primary;
      dConfig.accentColor = palette.colors.accent;
      dConfig.backgroundColor = palette.colors.background;
    } else if (patternType === 'noise') {
      const nConfig = updatedConfig as NoisePatternConfig;
      nConfig.colorTint = palette.colors.primary;
      nConfig.backgroundColor = palette.colors.background;
    }

    onConfigChange(updatedConfig);
    toast.success(`"${palette.name}" palette applied!`);
  };

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
    <div className="w-full lg:w-80 xl:w-[22rem] bg-white/95 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-gray-200/50 p-4 sm:p-5 md:p-6 overflow-y-auto h-auto lg:h-full max-h-[45vh] sm:max-h-[50vh] lg:max-h-full scrollbar-modern shadow-modern">
      <div className="space-y-5 sm:space-y-5 md:space-y-6">
        {/* Pattern Type Selector - Modern Segmented Control */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-gray-900 tracking-tight">Pattern Type</Label>
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
            <Button
              variant={patternType === 'geometric' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('geometric')}
              className={`text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] rounded-lg ${
                patternType === 'geometric'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md text-white hover:from-blue-600 hover:to-indigo-700'
                  : 'hover:bg-white/80 active:bg-white text-gray-700'
              }`}
            >
              Geometric
            </Button>
            <Button
              variant={patternType === 'dots' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('dots')}
              className={`text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] rounded-lg ${
                patternType === 'dots'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md text-white hover:from-blue-600 hover:to-indigo-700'
                  : 'hover:bg-white/80 active:bg-white text-gray-700'
              }`}
            >
              Dots
            </Button>
            <Button
              variant={patternType === 'noise' ? 'default' : 'ghost'}
              onClick={() => handlePatternTypeChange('noise')}
              className={`text-xs sm:text-sm font-bold transition-all duration-300 min-h-[44px] rounded-lg ${
                patternType === 'noise'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md text-white hover:from-blue-600 hover:to-indigo-700'
                  : 'hover:bg-white/80 active:bg-white text-gray-700'
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
          <h2 className="text-sm font-bold mb-4 text-gray-900 flex items-center gap-2 tracking-tight">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-sm"></span>
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

        {/* Divider */}
        <div className="border-t border-gray-200/60" />

        {/* Color Palette Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              <span className="h-5 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full shadow-sm"></span>
              Color Palettes
            </h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowPaletteSelector(!showPaletteSelector)}
              className="h-7 px-2 text-xs font-bold hover:bg-purple-50"
            >
              <Palette className="h-3.5 w-3.5 mr-1" />
              {showPaletteSelector ? 'Hide' : 'Show'}
            </Button>
          </div>
          {showPaletteSelector && (
            <ColorPaletteSelector onSelectPalette={handleApplyPalette} />
          )}
        </div>

        {/* Randomize Button - Mobile Optimized */}
        <Button
          variant="outline"
          onClick={handleRandomize}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-violet-50 via-blue-50 to-indigo-50 hover:from-violet-100 hover:via-blue-100 hover:to-indigo-100 active:scale-[0.98] border-2 border-indigo-200/60 hover:border-indigo-300 active:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
        >
          <Shuffle className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500 text-indigo-600" />
          <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Randomize</span>
        </Button>

        {/* Divider */}
        <div className="border-t border-gray-200/60" />

        {/* Presets Section - Mobile Optimized */}
        <div>
          <h2 className="text-sm font-bold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2 tracking-tight">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-sm"></span>
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
                className="group flex flex-col items-center gap-2.5 p-3 sm:p-3.5 rounded-xl border-2 border-gray-200/60 hover:border-indigo-300 active:border-indigo-400 bg-white hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-indigo-50/60 hover:to-purple-50/40 active:from-blue-100/80 active:to-indigo-100/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.97] min-h-[120px] sm:min-h-[130px]"
              >
                <div className="rounded-lg overflow-hidden ring-2 ring-gray-200/60 group-hover:ring-indigo-300 group-active:ring-indigo-400 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <PresetThumbnail
                    patternType={patternType}
                    config={preset.config}
                    size={80}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 group-hover:text-indigo-700 group-active:text-indigo-800 text-center leading-tight transition-colors">
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
          <h2 className="text-sm font-bold mb-4 text-gray-900 flex items-center gap-2 tracking-tight">
            <span className="h-5 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-sm"></span>
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
                className="w-full group bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-indigo-800 active:scale-[0.98] shadow-md hover:shadow-lg transition-all duration-300 min-h-[44px] text-sm sm:text-base border-0"
              >
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                <span className="font-bold">Export as PNG</span>
              </Button>
              {canExportSVG && (
                <Button
                  onClick={onExportSVG}
                  variant="outline"
                  className="w-full group border-2 border-indigo-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-100 active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform text-indigo-600" />
                  <span className="font-bold text-gray-700 group-hover:text-indigo-700">Export as SVG</span>
                </Button>
              )}
              {!canExportSVG && (
                <p className="text-xs text-gray-500 text-center py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200/60 font-medium">
                  SVG export not available for this pattern
                </p>
              )}

              {/* Quick Actions - Mobile Optimized */}
              <div className="pt-2.5 sm:pt-3 space-y-2 border-t border-gray-200/60">
                <Button
                  onClick={onCopyToClipboard}
                  variant="secondary"
                  className="w-full group bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 hover:from-slate-100 hover:via-gray-100 hover:to-zinc-100 active:scale-[0.98] border-2 border-gray-200/60 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
                >
                  <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform text-gray-600" />
                  <span className="font-bold text-gray-700">Copy to Clipboard</span>
                </Button>
                <Button
                  onClick={onShareURL}
                  variant="secondary"
                  className="w-full group bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 hover:from-emerald-100 hover:via-teal-100 hover:to-cyan-100 active:scale-[0.98] border-2 border-teal-200/60 hover:border-teal-300 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
                >
                  <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform text-teal-600" />
                  <span className="font-bold text-gray-700 group-hover:text-teal-700">Share Link</span>
                </Button>

                {/* Advanced Actions */}
                <div className="pt-2 space-y-2 border-t border-gray-200/40">
                  {onToggleTiling && (
                    <Button
                      onClick={onToggleTiling}
                      variant="secondary"
                      className={`w-full group border-2 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base ${
                        showTiling
                          ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-400'
                          : 'bg-gradient-to-br from-slate-50 to-gray-50 border-gray-200/60 hover:border-gray-300'
                      } active:scale-[0.98]`}
                    >
                      <Grid3x3 className={`mr-2 h-4 w-4 group-hover:scale-110 transition-transform ${showTiling ? 'text-purple-600' : 'text-gray-600'}`} />
                      <span className={`font-bold ${showTiling ? 'text-purple-700' : 'text-gray-700'}`}>
                        {showTiling ? 'Hide' : 'Show'} Tiling Preview
                      </span>
                    </Button>
                  )}
                  {onExportCSS && (
                    <Button
                      onClick={onExportCSS}
                      variant="secondary"
                      className="w-full group bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 hover:from-amber-100 hover:via-orange-100 hover:to-yellow-100 active:scale-[0.98] border-2 border-orange-200/60 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
                    >
                      <Code2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform text-orange-600" />
                      <span className="font-bold text-gray-700 group-hover:text-orange-700">Export CSS Code</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
