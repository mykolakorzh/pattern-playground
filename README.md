# 🎨 Pattern Playground

> A powerful visual tool for creating beautiful, customizable patterns for brand and product design work.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎯 Three Pattern Types

1. **Geometric Grid**
   - Repeating shapes: circles, squares, triangles
   - Customizable size, spacing, and rotation
   - Full color control for shapes and background

2. **Dots Pattern**
   - Grid-based or random scattered layouts
   - Adjustable dot size, density, and size variation
   - Optional accent colors for added visual interest

3. **Noise/Grain Texture**
   - Procedural noise generation
   - Adjustable intensity and scale
   - Color tinting for custom effects

### 🚀 Power User Features

- **⏮️ Undo/Redo** - Full history management with up to 50 states (Ctrl+Z / Ctrl+Shift+Z)
- **⌨️ Keyboard Shortcuts** - Fast workflow with shortcuts for all major actions
  - `R` or `Space` - Randomize pattern
  - `Ctrl+E` - Export as PNG
  - `Ctrl+C` - Copy to clipboard
  - `Ctrl+Z` / `Ctrl+Shift+Z` - Undo/Redo
- **🎨 Visual Preset Thumbnails** - See what each preset looks like before applying
- **✏️ Pattern Naming** - Name your patterns for organized exports
- **📋 Copy to Clipboard** - One-click copying for quick sharing
- **🔗 Shareable URLs** - Share patterns via URL with Base64-encoded configurations
- **📱 Mobile-Friendly** - Fully responsive with touch-optimized interactions

### 💎 Modern UI Design

- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Smooth Animations** - Delightful micro-interactions throughout
- **Gradient Accents** - Beautiful blue-to-indigo color scheme
- **Custom Shadows** - Multi-layer shadow system for depth
- **Touch Optimized** - 44px minimum tap targets, active states for touch devices

### 📤 Export Options

- **PNG Export** - Multiple resolutions (512px to 4K)
- **SVG Export** - Vector export for geometric and grid patterns
- **Smart Filenames** - Exports use your custom pattern names
- **High Resolution** - Print-ready 2K and 4K output

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mykolakorzh/pattern-playground.git
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

## 📱 Usage

### Desktop
1. Select a pattern type from the segmented control
2. Adjust controls using sliders, color pickers, and selects
3. Try visual preset thumbnails for instant inspiration
4. Use keyboard shortcuts for faster workflow
5. Export at your desired resolution (512px - 4K)

### Mobile
- Touch-optimized interface with 44px tap targets
- Canvas appears first, controls below for better UX
- Active states provide immediate touch feedback
- All features available on mobile devices

## 🏗️ Project Structure

```
pattern-playground/
├── app/
│   ├── globals.css              # Global styles, modern shadow system
│   ├── layout.tsx               # Root layout with Toaster
│   └── page.tsx                 # Main app with history management
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── slider.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── pattern-playground/
│       ├── PatternCanvas.tsx    # Canvas with forwardRef
│       ├── PresetThumbnail.tsx  # Visual preset previews
│       ├── ControlPanel.tsx     # Main control panel
│       ├── GeometricControls.tsx
│       ├── DotsControls.tsx
│       └── NoiseControls.tsx
├── lib/
│   ├── types.ts                 # TypeScript definitions
│   ├── utils.ts                 # Utility functions
│   ├── presets.ts               # 15 curated presets
│   ├── export.ts                # PNG/SVG/Clipboard export
│   ├── urlState.ts              # Shareable URL encoding
│   ├── hooks/
│   │   ├── useHistory.ts        # Undo/redo history stack
│   │   └── useKeyboardShortcuts.ts
│   └── patterns/
│       ├── index.ts
│       ├── geometric.ts
│       ├── dots.ts
│       └── noise.ts
└── public/                      # Static assets
```

## 🛠️ Technology Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router & Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Sonner](https://sonner.emilkowal.ski/)** - Beautiful toast notifications
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[file-saver](https://github.com/eligrey/FileSaver.js/)** - Client-side exports

## 🎨 Pattern Generation

### Geometric Pattern
Creates a tiled grid of shapes (circles, squares, triangles) with full control over size, spacing, rotation, and colors. Perfect for backgrounds and brand elements.

### Dots Pattern
Generates either grid-based or randomly scattered dots. Grid mode creates uniform patterns while random mode provides organic, scattered layouts with optional accent colors.

### Noise/Grain
Uses pixel manipulation to create procedural noise textures. Scale controls grain size while intensity adjusts effect strength. Great for subtle textures and overlays.

## 📤 Export Details

### PNG Export
- Multiple resolutions: 512px, 1024px, 2048px (2K), 4096px (4K)
- High-quality rendering at full resolution
- Smart filenames using your custom pattern names
- Perfect for print and digital use

### SVG Export
- Available for geometric and grid-based dot patterns
- Scalable vector format for logos and graphics
- Clean, optimized SVG code
- *Note: Noise patterns use pixel rendering and cannot be exported as SVG*

### Copy to Clipboard
- One-click copying of current pattern
- Works on modern browsers with Clipboard API
- Instant feedback with toast notifications

### Shareable URLs
- Patterns encoded in URL with Base64
- Includes pattern type, configuration, and name
- Share via link, bookmark, or save for later

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `R` or `Space` | Randomize pattern |
| `Ctrl+E` | Export as PNG |
| `Ctrl+C` | Copy to clipboard |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` or `Ctrl+Y` | Redo |

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mykolakorzh/pattern-playground)

1. Push your code to GitHub
2. Import repository to [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js configuration
4. Deploy!

### Other Platforms

The app deploys to any platform supporting Next.js:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by modern design tools and pattern generators

## 📧 Contact

Mykola Korzh - [@mykolakorzh](https://github.com/mykolakorzh)

Project Link: [https://github.com/mykolakorzh/pattern-playground](https://github.com/mykolakorzh/pattern-playground)

---

**Pattern Playground** - Create beautiful patterns for your designs ✨
