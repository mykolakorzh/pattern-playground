"use client"

import { GeometricPatternConfig, ShapeType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
            <SelectItem value="circle">⚪ Circle</SelectItem>
            <SelectItem value="square">⬛ Square</SelectItem>
            <SelectItem value="triangle">🔺 Triangle</SelectItem>
            <SelectItem value="hexagon">⬢ Hexagon</SelectItem>
            <SelectItem value="star">⭐ Star</SelectItem>
            <SelectItem value="diamond">💎 Diamond</SelectItem>
            <SelectItem value="pentagon">⬠ Pentagon</SelectItem>
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

      {/* Size Variation */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Size Variation</Label>
          <span className="text-sm text-muted-foreground">{config.sizeVariation || 0}%</span>
        </div>
        <Slider
          value={[config.sizeVariation || 0]}
          onValueChange={([value]) => updateConfig({ sizeVariation: value })}
          min={0}
          max={100}
          step={5}
        />
        <p className="text-xs text-muted-foreground">
          Add random size variations for organic patterns
        </p>
      </div>

      {/* Color Variation Toggle */}
      <div className="space-y-2">
        <Button
          variant={config.colorVariation ? "default" : "outline"}
          onClick={() => updateConfig({ colorVariation: !config.colorVariation })}
          className={`w-full min-h-[44px] font-bold transition-all duration-300 ${
            config.colorVariation
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              : 'hover:bg-purple-50 border-purple-200'
          }`}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {config.colorVariation ? 'Color Variation: ON' : 'Enable Color Variation'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          {config.colorVariation ? 'Each shape gets a unique color tint' : 'Add subtle color variations to shapes'}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200/60 pt-2" />

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
