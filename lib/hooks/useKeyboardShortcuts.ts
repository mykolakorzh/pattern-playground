import { useEffect } from "react";

/**
 * Custom hook for keyboard shortcuts
 * Handles global keyboard events for the application
 */
export function useKeyboardShortcuts(handlers: {
  onRandomize?: () => void;
  onExport?: () => void;
  onExportSVG?: () => void;
  onCopy?: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Randomize: R key
      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        handlers.onRandomize?.();
      }

      // Export PNG: E key or Ctrl/Cmd + E
      if ((event.key === "e" || event.key === "E") && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handlers.onExport?.();
      }

      // Export SVG: Shift + E
      if ((event.key === "e" || event.key === "E") && event.shiftKey) {
        event.preventDefault();
        handlers.onExportSVG?.();
      }

      // Copy to clipboard: Ctrl/Cmd + C (when not in input)
      if ((event.key === "c" || event.key === "C") && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handlers.onCopy?.();
      }

      // Space bar: Randomize (alternative)
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        handlers.onRandomize?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlers]);
}
