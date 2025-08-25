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
      className="card bg-base-100 shadow-lg flex flex-col"
      data-testid="configuration-panel"
    >
      <div className="card-body flex flex-col p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Row 1: Page Heading */}
        <div className="flex-shrink-0">
          <h2
            className="card-title text-base sm:text-lg"
            data-testid="configuration-panel-title"
          >
            {germanTexts.dimensionControls.title}
          </h2>
        </div>

        {/* Row 2: Responsive Control Section */}
        {/* Mobile: Single column (< 640px) */}
        <div className="flex flex-col space-y-4 sm:hidden">
          {/* Dimensions Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              {germanTexts.dimensionControls.dimensionsHeader}
            </h3>
            
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

          {/* Material Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              {germanTexts.materialControls.title}
            </h3>
            <MaterialSelector />
          </div>

          {/* Color Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              {germanTexts.colorControls.title}
            </h3>
            <ColorPicker />
          </div>

          {/* Image Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              {germanTexts.imageControls.title}
            </h3>
            <ImageUpload />
          </div>
        </div>

        {/* Tablet & Desktop: Two-column layout (>= 640px) */}
        <div className="hidden sm:flex flex-row gap-8 lg:gap-16">
          {/* Left Column: Dimension Controls */}
          <div className="flex flex-col space-y-4 lg:space-y-6 flex-1">
            <h3 className="text-sm lg:text-md font-semibold mb-2">
              {germanTexts.dimensionControls.dimensionsHeader}
            </h3>

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

          {/* Right Column: Material, Color, and Image Controls */}
          <div className="flex flex-col space-y-4 lg:space-y-6 flex-1">
            {/* Material Selection Section */}
            <div>
              <h3 className="text-sm lg:text-md font-semibold mb-2">
                {germanTexts.materialControls.title}
              </h3>
              <MaterialSelector />
            </div>

            {/* Color Selection Section */}
            <div>
              <h3 className="text-sm lg:text-md font-semibold mb-2">
                {germanTexts.colorControls.title}
              </h3>
              <ColorPicker />
            </div>

            {/* Image Upload Section */}
            <div>
              <h3 className="text-sm lg:text-md font-semibold mb-2">
                {germanTexts.imageControls.title}
              </h3>
              <ImageUpload />
            </div>
          </div>
        </div>

        {/* Row 3: Configuration Summary */}
        <div className="flex-shrink-0 border-t pt-3 sm:pt-4">
          <h3 className="text-sm lg:text-md font-semibold mb-2">
            {germanTexts.summary.title}
          </h3>
          <ConfigurationSummary />
        </div>
      </div>
    </div>
  );
}
