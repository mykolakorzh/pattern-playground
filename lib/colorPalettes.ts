export interface ColorPalette {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  description: string;
}

export const colorPalettes: ColorPalette[] = [
  {
    name: "Ocean Breeze",
    colors: {
      primary: "#2563eb",
      secondary: "#06b6d4",
      accent: "#0891b2",
      background: "#f0f9ff"
    },
    description: "Cool, professional blues"
  },
  {
    name: "Sunset Glow",
    colors: {
      primary: "#f59e0b",
      secondary: "#ef4444",
      accent: "#ec4899",
      background: "#fff7ed"
    },
    description: "Warm, energetic tones"
  },
  {
    name: "Forest Depth",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#14b8a6",
      background: "#f0fdf4"
    },
    description: "Natural, calming greens"
  },
  {
    name: "Royal Purple",
    colors: {
      primary: "#8b5cf6",
      secondary: "#a855f7",
      accent: "#c084fc",
      background: "#faf5ff"
    },
    description: "Elegant, luxurious purples"
  },
  {
    name: "Monochrome",
    colors: {
      primary: "#1f2937",
      secondary: "#4b5563",
      accent: "#6b7280",
      background: "#f9fafb"
    },
    description: "Timeless grayscale"
  },
  {
    name: "Cherry Blossom",
    colors: {
      primary: "#ec4899",
      secondary: "#f472b6",
      accent: "#fbcfe8",
      background: "#fdf2f8"
    },
    description: "Soft, romantic pinks"
  },
  {
    name: "Midnight",
    colors: {
      primary: "#1e40af",
      secondary: "#312e81",
      accent: "#4f46e5",
      background: "#1e293b"
    },
    description: "Dark, sophisticated blues"
  },
  {
    name: "Citrus Pop",
    colors: {
      primary: "#facc15",
      secondary: "#84cc16",
      accent: "#f97316",
      background: "#fefce8"
    },
    description: "Vibrant, playful yellows"
  },
  {
    name: "Coral Reef",
    colors: {
      primary: "#f43f5e",
      secondary: "#fb923c",
      accent: "#fdba74",
      background: "#fff1f2"
    },
    description: "Tropical, warm corals"
  },
  {
    name: "Arctic Ice",
    colors: {
      primary: "#67e8f9",
      secondary: "#a5f3fc",
      accent: "#22d3ee",
      background: "#ecfeff"
    },
    description: "Cool, crisp cyans"
  }
];
