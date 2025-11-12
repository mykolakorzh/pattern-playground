# Pattern Playground

A visual tool for creating beautiful, customizable patterns for brand and product design work. Built with Next.js, TypeScript, and Tailwind CSS.

![Pattern Playground](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)

## Features

### Pattern Types

1. **Geometric Grid**
   - Repeating shapes: circles, squares, or triangles
   - Customizable size, spacing, rotation
   - Color controls for shape and background

2. **Dots Pattern**
   - Grid-based or random scattered dots
   - Adjustable dot size, density, and size variation
   - Optional accent colors for visual interest

3. **Noise/Grain Texture**
   - Procedural noise generation
   - Adjustable intensity and scale
   - Color tinting for custom effects

### Key Features

- **Real-time Preview**: Patterns update instantly as you adjust controls
- **Presets**: 5 beautiful preset configurations for each pattern type
- **Randomize**: Generate random (but aesthetically pleasing) patterns with one click
- **Export Options**:
  - PNG export (1024x1024px) for all pattern types
  - SVG export for geometric and grid-based dot patterns
- **Clean UI**: Built with shadcn/ui components for a polished experience

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pattern-playground.git
cd pattern-playground
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Select a Pattern Type**: Choose between Geometric, Dots, or Noise patterns
2. **Adjust Controls**: Use sliders, color pickers, and dropdowns to customize your pattern
3. **Try Presets**: Click on preset buttons for instant inspiration
4. **Randomize**: Hit the Randomize button to generate random patterns
5. **Export**: Download your pattern as PNG or SVG (when available)

## Project Structure

```
pattern-playground/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── slider.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── color-picker.tsx
│   └── pattern-playground/  # Pattern-specific components
│       ├── PatternCanvas.tsx
│       ├── ControlPanel.tsx
│       ├── GeometricControls.tsx
│       ├── DotsControls.tsx
│       └── NoiseControls.tsx
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── utils.ts             # Utility functions
│   ├── presets.ts           # Pattern presets
│   ├── export.ts            # Export utilities
│   └── patterns/            # Pattern generation logic
│       ├── index.ts
│       ├── geometric.ts
│       ├── dots.ts
│       └── noise.ts
└── public/                  # Static assets
```

## Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Radix UI**: Accessible component primitives
- **file-saver**: Client-side file exports
- **Lucide React**: Beautiful icons

## Pattern Generation Details

### Geometric Pattern
Creates a tiled grid of shapes with customizable properties. Supports rotation, size, and spacing controls for endless variations.

### Dots Pattern
Generates either grid-based or randomly scattered dots. Grid mode creates uniform patterns while random mode provides organic, scattered layouts.

### Noise/Grain
Uses pixel manipulation to create procedural noise textures. The scale parameter controls grain size while intensity adjusts the effect strength.

## Export Formats

### PNG Export
All patterns can be exported as high-resolution PNG files (1024x1024px). The export canvas is rendered at full resolution for crisp, print-ready output.

### SVG Export
Geometric and grid-based dot patterns can be exported as scalable SVG files, perfect for logos and vector-based designs. Note: Noise patterns use pixel-based rendering and cannot be exported as SVG.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Credits

Built with ❤️ using Next.js and shadcn/ui

---

**Pattern Playground** - Create beautiful patterns for your designs
