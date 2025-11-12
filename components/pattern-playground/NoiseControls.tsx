"use client"

import { NoisePatternConfig } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";

interface NoiseControlsProps {
  config: NoisePatternConfig;
  onChange: (config: NoisePatternConfig) => void;
}

export function NoiseControls({ config, onChange }: NoiseControlsProps) {
  const updateConfig = (updates: Partial<NoisePatternConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Intensity */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Intensity</Label>
          <span className="text-sm text-muted-foreground">{config.intensity}%</span>
        </div>
        <Slider
          value={[config.intensity]}
          onValueChange={([value]) => updateConfig({ intensity: value })}
          min={0}
          max={100}
          step={5}
        />
      </div>

      {/* Scale */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Scale</Label>
          <span className="text-sm text-muted-foreground">{config.scale}</span>
        </div>
        <Slider
          value={[config.scale]}
          onValueChange={([value]) => updateConfig({ scale: value })}
          min={1}
          max={20}
          step={1}
        />
      </div>

      {/* Colors */}
      <ColorPicker
        label="Color Tint"
        value={config.colorTint}
        onChange={(value) => updateConfig({ colorTint: value })}
      />

      <ColorPicker
        label="Base Color"
        value={config.backgroundColor}
        onChange={(value) => updateConfig({ backgroundColor: value })}
      />
    </div>
  );
}
