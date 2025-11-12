import { PatternType, PatternConfig } from "./types";

/**
 * Encodes pattern configuration into URL-safe base64 string
 */
export function encodePatternToURL(
  patternType: PatternType,
  config: PatternConfig,
  name?: string
): string {
  const data = {
    type: patternType,
    config: config,
    name: name || 'Pattern',
  };

  const jsonString = JSON.stringify(data);
  const base64 = btoa(jsonString);

  return base64;
}

/**
 * Decodes pattern configuration from URL parameter
 * Returns null if invalid or not present
 */
export function decodePatternFromURL(
  urlParam: string | null
): { type: PatternType; config: PatternConfig; name?: string } | null {
  if (!urlParam) return null;

  try {
    const jsonString = atob(urlParam);
    const data = JSON.parse(jsonString);

    // Basic validation
    if (!data.type || !data.config) {
      return null;
    }

    return {
      type: data.type as PatternType,
      config: data.config as PatternConfig,
      name: data.name,
    };
  } catch (error) {
    console.error("Failed to decode pattern from URL:", error);
    return null;
  }
}

/**
 * Generates shareable URL for current pattern
 */
export function generateShareableURL(
  patternType: PatternType,
  config: PatternConfig,
  name?: string,
  baseURL: string = window.location.origin
): string {
  const encoded = encodePatternToURL(patternType, config, name);
  return `${baseURL}?pattern=${encoded}`;
}

/**
 * Copies shareable URL to clipboard
 */
export async function copyShareableURL(
  patternType: PatternType,
  config: PatternConfig,
  name?: string
): Promise<boolean> {
  try {
    const url = generateShareableURL(patternType, config, name);
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error("Failed to copy URL:", error);
    return false;
  }
}
