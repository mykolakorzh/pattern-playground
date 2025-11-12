"use client"

import { colorPalettes, type ColorPalette } from "@/lib/colorPalettes";
import { Check } from "lucide-react";

interface ColorPaletteSelectorProps {
  onSelectPalette: (palette: ColorPalette) => void;
  selectedPalette?: string;
}

export function ColorPaletteSelector({ onSelectPalette, selectedPalette }: ColorPaletteSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {colorPalettes.map((palette) => (
          <button
            key={palette.name}
            onClick={() => onSelectPalette(palette)}
            className={`group relative flex flex-col gap-2 p-2.5 rounded-lg border-2 transition-all duration-300 hover:shadow-modern ${
              selectedPalette === palette.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200/60 hover:border-blue-300 active:border-blue-400'
            }`}
            title={palette.description}
          >
            {/* Color Swatches */}
            <div className="flex gap-1">
              <div
                className="h-8 flex-1 rounded shadow-sm"
                style={{ backgroundColor: palette.colors.primary }}
              />
              <div
                className="h-8 flex-1 rounded shadow-sm"
                style={{ backgroundColor: palette.colors.secondary }}
              />
              <div
                className="h-8 w-6 rounded shadow-sm"
                style={{ backgroundColor: palette.colors.accent }}
              />
            </div>

            {/* Palette Name */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                {palette.name}
              </span>
              {selectedPalette === palette.name && (
                <Check className="h-3.5 w-3.5 text-blue-600" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
