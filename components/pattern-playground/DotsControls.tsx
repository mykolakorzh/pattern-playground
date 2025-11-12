"use client"

import { DotsPatternConfig, DotsStyle } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DotsControlsProps {
  config: DotsPatternConfig;
  onChange: (config: DotsPatternConfig) => void;
}

export function DotsControls({ config, onChange }: DotsControlsProps) {
  const updateConfig = (updates: Partial<DotsPatternConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Pattern Style */}
      <div className="space-y-2">
        <Label>Pattern Style</Label>
        <Select
          value={config.style}
          onValueChange={(value: DotsStyle) => updateConfig({ style: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="random">Random</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dot Size */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Dot Size</Label>
          <span className="text-sm text-muted-foreground">{config.dotSize}px</span>
        </div>
        <Slider
          value={[config.dotSize]}
          onValueChange={([value]) => updateConfig({ dotSize: value })}
          min={5}
          max={50}
          step={1}
        />
      </div>

      {/* Density */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Density</Label>
          <span className="text-sm text-muted-foreground">{(config.density * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={[config.density]}
          onValueChange={([value]) => updateConfig({ density: value })}
          min={0.1}
          max={1}
          step={0.05}
        />
      </div>

      {/* Size Variation */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Size Variation</Label>
          <span className="text-sm text-muted-foreground">{config.sizeVariation}%</span>
        </div>
        <Slider
          value={[config.sizeVariation]}
          onValueChange={([value]) => updateConfig({ sizeVariation: value })}
          min={0}
          max={100}
          step={5}
        />
      </div>

      {/* Colors */}
      <ColorPicker
        label="Dot Color"
        value={config.dotColor}
        onChange={(value) => updateConfig({ dotColor: value })}
      />

      {/* Accent Color (Optional) */}
      {config.accentColor ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Accent Color</Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateConfig({ accentColor: undefined })}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => updateConfig({ accentColor: e.target.value })}
                className="h-10 w-20 rounded-md border border-input cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => updateConfig({ accentColor: '#ef4444' })}
          className="w-full"
        >
          Add Accent Color
        </Button>
      )}

      <ColorPicker
        label="Background Color"
        value={config.backgroundColor}
        onChange={(value) => updateConfig({ backgroundColor: value })}
      />
    </div>
  );
}
