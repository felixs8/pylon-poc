"use client";

import React from "react";
import { HexColorPicker } from "react-colorful";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";

export default function ColorPicker() {
  const { configuration, setColor } = usePylonConfiguration();
  const { color } = configuration;

  return (
    <div className="space-y-4" data-testid="color-picker">
      <h3 className="text-sm font-medium" data-testid="color-picker-title">
        {germanTexts.colorControls.title}
      </h3>

      <div className="space-y-3">
        <label
          className="text-xs text-base-content/70"
          data-testid="color-picker-label"
        >
          {germanTexts.colorControls.label}
        </label>

        <div className="flex flex-col items-start space-y-3">
          {/* Color Picker */}
          <div className="color-picker-wrapper">
            <HexColorPicker
              color={color}
              onChange={setColor}
              data-testid="hex-color-picker"
            />
          </div>

          {/* Current Color Display */}
          <div
            className="flex items-center space-x-3"
            data-testid="current-color-display"
          >
            <div
              className="w-8 h-8 rounded border-2 border-base-content/20"
              style={{ backgroundColor: color }}
              data-testid="color-swatch"
            />
            <div className="space-y-1">
              <div className="text-xs text-base-content/70">
                {germanTexts.colorControls.current}
              </div>
              <div className="font-mono text-sm" data-testid="color-value">
                {color.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .color-picker-wrapper :global(.react-colorful) {
          width: 200px;
          height: 200px;
        }

        .color-picker-wrapper :global(.react-colorful__saturation) {
          border-radius: 8px 8px 0 0;
        }

        .color-picker-wrapper :global(.react-colorful__hue) {
          height: 30px;
          border-radius: 0 0 8px 8px;
        }

        .color-picker-wrapper :global(.react-colorful__pointer) {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
}
