"use client"

import * as React from "react"
import { Input } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={label}>{label}</Label>
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="color"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-20 rounded-md border border-input cursor-pointer"
          />
        </div>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
