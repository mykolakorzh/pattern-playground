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
    <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4 md:p-6 overflow-y-auto h-auto lg:h-full max-h-[50vh] lg:max-h-full">
      <div className="space-y-4 md:space-y-6">
        {/* Pattern Type Selector */}
        <div className="space-y-2">
          <Label>Pattern Type</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={patternType === 'geometric' ? 'default' : 'outline'}
              onClick={() => handlePatternTypeChange('geometric')}
              className="text-xs"
            >
              Geometric
            </Button>
            <Button
              variant={patternType === 'dots' ? 'default' : 'outline'}
              onClick={() => handlePatternTypeChange('dots')}
              className="text-xs"
            >
              Dots
            </Button>
            <Button
              variant={patternType === 'noise' ? 'default' : 'outline'}
              onClick={() => handlePatternTypeChange('noise')}
              className="text-xs"
            >
              Noise
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Controls Section */}
        <div>
          <h2 className="text-sm font-semibold mb-4 text-gray-900">Controls</h2>
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

        {/* Randomize Button */}
        <Button
          variant="outline"
          onClick={handleRandomize}
          className="w-full"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Randomize
        </Button>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Presets Section */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-gray-900">Presets</h2>
          <div className="space-y-2">
            {getPresets().map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => {
                  onConfigChange(preset.config);
                  toast.success(`Preset "${preset.name}" applied!`);
                }}
                className="w-full justify-start text-sm"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Export Section */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-gray-900">Export</h2>
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

            {/* Export Buttons */}
            <div className="space-y-2">
              <Button
                onClick={onExportPNG}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Export as PNG
              </Button>
              {canExportSVG && (
                <Button
                  onClick={onExportSVG}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export as SVG
                </Button>
              )}
              {!canExportSVG && (
                <p className="text-xs text-muted-foreground text-center">
                  SVG export not available for this pattern
                </p>
              )}

              {/* Quick Actions */}
              <div className="pt-2 space-y-2 border-t border-gray-100">
                <Button
                  onClick={onCopyToClipboard}
                  variant="secondary"
                  className="w-full"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={onShareURL}
                  variant="secondary"
                  className="w-full"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
