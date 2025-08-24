"use client";

import React from "react";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";

export default function ConfigurationSummary() {
  const { configuration } = usePylonConfiguration();
  const { dimensions, material } = configuration;

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
    </div>
  );
}
