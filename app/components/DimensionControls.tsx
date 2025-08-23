"use client";

import React from "react";
import {
  usePylonConfiguration,
  DIMENSION_LIMITS,
} from "../hooks/usePylonConfiguration";
import DimensionControl from "./DimensionControl";

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
          Pylon Dimensions
        </h2>

        <div className="space-y-6">
          {/* Height Control */}
          <DimensionControl
            label="Height"
            value={dimensions.height}
            min={DIMENSION_LIMITS.height.min}
            max={DIMENSION_LIMITS.height.max}
            step={0.1}
            unit="m"
            onChange={setHeight}
            testId="height-control"
          />

          {/* Width Control */}
          <DimensionControl
            label="Width"
            value={dimensions.width}
            min={DIMENSION_LIMITS.width.min}
            max={DIMENSION_LIMITS.width.max}
            step={0.1}
            unit="m"
            onChange={setWidth}
            testId="width-control"
          />

          {/* Depth Control */}
          <DimensionControl
            label="Depth"
            value={dimensions.depth}
            min={DIMENSION_LIMITS.depth.min}
            max={DIMENSION_LIMITS.depth.max}
            step={0.1}
            unit="m"
            onChange={setDepth}
            testId="depth-control"
          />
        </div>

        {/* Summary */}
        <div className="divider"></div>
        <div
          className="text-sm text-base-content/70"
          data-testid="dimension-summary"
        >
          <p className="font-medium">Current Size:</p>
          <p data-testid="dimension-summary-text">
            {dimensions.height.toFixed(1)}m × {dimensions.width.toFixed(1)}m ×{" "}
            {dimensions.depth.toFixed(1)}m
          </p>
        </div>
      </div>
    </div>
  );
}
