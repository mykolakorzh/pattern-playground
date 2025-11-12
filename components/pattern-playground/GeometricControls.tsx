"use client"

import { GeometricPatternConfig, ShapeType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";

interface GeometricControlsProps {
  config: GeometricPatternConfig;
  onChange: (config: GeometricPatternConfig) => void;
}

export function GeometricControls({ config, onChange }: GeometricControlsProps) {
  const updateConfig = (updates: Partial<GeometricPatternConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Shape Type */}
      <div className="space-y-2">
        <Label>Shape</Label>
        <Select
          value={config.shape}
          onValueChange={(value: ShapeType) => updateConfig({ shape: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="triangle">Triangle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Size</Label>
          <span className="text-sm text-muted-foreground">{config.size}px</span>
        </div>
        <Slider
          value={[config.size]}
          onValueChange={([value]) => updateConfig({ size: value })}
          min={10}
          max={100}
          step={1}
        />
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Spacing</Label>
          <span className="text-sm text-muted-foreground">{config.spacing}px</span>
        </div>
        <Slider
          value={[config.spacing]}
          onValueChange={([value]) => updateConfig({ spacing: value })}
          min={0}
          max={50}
          step={1}
        />
      </div>

      {/* Rotation */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Rotation</Label>
          <span className="text-sm text-muted-foreground">{config.rotation}°</span>
        </div>
        <Slider
          value={[config.rotation]}
          onValueChange={([value]) => updateConfig({ rotation: value })}
          min={0}
          max={360}
          step={1}
        />
      </div>

      {/* Colors */}
      <ColorPicker
        label="Shape Color"
        value={config.shapeColor}
        onChange={(value) => updateConfig({ shapeColor: value })}
      />

      <ColorPicker
        label="Background Color"
        value={config.backgroundColor}
        onChange={(value) => updateConfig({ backgroundColor: value })}
      />
    </div>
  );
}
