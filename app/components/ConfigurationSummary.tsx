"use client";

import React from "react";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";

export default function ConfigurationSummary() {
  const { configuration } = usePylonConfiguration();
  const { dimensions, material, color, image } = configuration;

  return (
    <div
      className="text-sm text-base-content/70"
      data-testid="configuration-summary"
    >
      <p className="font-medium">Aktuelle Konfiguration:</p>
      <p data-testid="dimension-summary-text">
        {dimensions.height.toFixed(1).replace(".", ",")}m ×{" "}
        {dimensions.width.toFixed(1).replace(".", ",")}m ×{" "}
        {dimensions.depth.toFixed(1).replace(".", ",")}m
      </p>
      <p data-testid="material-summary-text">
        {material === "metal" && germanTexts.materialControls.metal}
        {material === "plastic" && germanTexts.materialControls.plastic}
        {material === "composite" && germanTexts.materialControls.composite}
      </p>
      <div className="flex items-center space-x-2" data-testid="color-summary">
        <div
          className="w-4 h-4 rounded border border-base-content/20"
          style={{ backgroundColor: color }}
          data-testid="color-summary-swatch"
        />
        <span data-testid="color-summary-text">{color.toUpperCase()}</span>
      </div>
      <p data-testid="image-summary-text">
        {image.isUploaded
          ? germanTexts.imageControls.statusUploaded
          : germanTexts.imageControls.statusNone}
      </p>
    </div>
  );
}
