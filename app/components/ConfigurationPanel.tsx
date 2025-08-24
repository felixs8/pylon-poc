"use client";

import React from "react";
import {
  usePylonConfiguration,
  DIMENSION_LIMITS,
} from "../hooks/usePylonConfiguration";
import DimensionControl from "./DimensionControl";
import MaterialSelector from "./MaterialSelector";
import ColorPicker from "./ColorPicker";
import ImageUpload from "./ImageUpload";
import ConfigurationSummary from "./ConfigurationSummary";
import { germanTexts } from "../utils/germanTexts";

export default function ConfigurationPanel() {
  const { configuration, setHeight, setWidth, setDepth } =
    usePylonConfiguration();
  const { dimensions } = configuration;

  return (
    <div
      className="card bg-base-100 shadow-lg"
      data-testid="configuration-panel"
    >
      <div className="card-body">
        <h2
          className="card-title text-lg mb-4"
          data-testid="configuration-panel-title"
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

        {/* Material Selection */}
        <div className="divider"></div>
        <MaterialSelector />

        {/* Color Selection */}
        <div className="divider"></div>
        <ColorPicker />

        {/* Image Upload */}
        <div className="divider"></div>
        <ImageUpload />

        {/* Configuration Summary */}
        <div className="divider"></div>
        <ConfigurationSummary />
      </div>
    </div>
  );
}
