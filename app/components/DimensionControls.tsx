"use client";

import React from "react";
import {
  usePylonConfiguration,
  DIMENSION_LIMITS,
} from "../hooks/usePylonConfiguration";
import DimensionControl from "./DimensionControl";
import { germanTexts } from "../utils/germanTexts";

export default function DimensionControls() {
  const { configuration, setHeight, setWidth, setDepth } =
    usePylonConfiguration();
  const { dimensions } = configuration;

  return (
    <div
      className="card bg-base-100 shadow-lg"
      data-testid="dimension-controls"
    >
      <div className="card-body">
        <h2
          className="card-title text-lg mb-4"
          data-testid="dimension-controls-title"
        >
          {germanTexts.dimensionControls.title}
        </h2>

        <div className="space-y-6">
          {/* Height Control */}
          <DimensionControl
            label={germanTexts.dimensionControls.height}
            value={dimensions.height}
            min={DIMENSION_LIMITS.height.min}
            max={DIMENSION_LIMITS.height.max}
            step={0.1}
            unit="m"
            onChange={setHeight}
            getRangeErrorMessage={germanTexts.validation.heightRange}
            testId="height-control"
          />

          {/* Width Control */}
          <DimensionControl
            label={germanTexts.dimensionControls.width}
            value={dimensions.width}
            min={DIMENSION_LIMITS.width.min}
            max={DIMENSION_LIMITS.width.max}
            step={0.1}
            unit="m"
            onChange={setWidth}
            getRangeErrorMessage={germanTexts.validation.widthRange}
            testId="width-control"
          />

          {/* Depth Control */}
          <DimensionControl
            label={germanTexts.dimensionControls.depth}
            value={dimensions.depth}
            min={DIMENSION_LIMITS.depth.min}
            max={DIMENSION_LIMITS.depth.max}
            step={0.1}
            unit="m"
            onChange={setDepth}
            getRangeErrorMessage={germanTexts.validation.depthRange}
            testId="depth-control"
          />
        </div>

        {/* Summary */}
        <div className="divider"></div>
        <div
          className="text-sm text-base-content/70"
          data-testid="dimension-summary"
        >
          <p className="font-medium">Aktuelle Größe:</p>
          <p data-testid="dimension-summary-text">
            {dimensions.height.toFixed(1).replace(".", ",")}m ×{" "}
            {dimensions.width.toFixed(1).replace(".", ",")}m ×{" "}
            {dimensions.depth.toFixed(1).replace(".", ",")}m
          </p>
        </div>
      </div>
    </div>
  );
}
