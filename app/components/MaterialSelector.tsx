"use client";

import React from "react";
import {
  usePylonConfiguration,
  MaterialType,
} from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";

export default function MaterialSelector() {
  const { configuration, setMaterial } = usePylonConfiguration();
  const { material } = configuration;

  const handleMaterialChange = (newMaterial: MaterialType) => {
    setMaterial(newMaterial);
  };

  return (
    <div className="form-control" data-testid="material-selector">
      <label className="label">
        <span
          className="label-text font-medium"
          data-testid="material-selector-label"
        >
          {germanTexts.materialControls.title}
        </span>
        <span
          className="label-text-alt text-primary"
          data-testid="material-selector-display"
        >
          {material === "metal" && germanTexts.materialControls.metal}
          {material === "plastic" && germanTexts.materialControls.plastic}
          {material === "composite" && germanTexts.materialControls.composite}
        </span>
      </label>

      <div
        className="flex flex-col space-y-2"
        data-testid="material-selector-options"
      >
        <label className="label cursor-pointer justify-start space-x-2">
          <input
            type="radio"
            name="material"
            className="radio radio-primary radio-sm"
            checked={material === "metal"}
            onChange={() => handleMaterialChange("metal")}
            data-testid="material-metal-radio"
          />
          <span className="label-text" data-testid="material-metal-label">
            {germanTexts.materialControls.metal}
          </span>
        </label>

        <label className="label cursor-pointer justify-start space-x-2">
          <input
            type="radio"
            name="material"
            className="radio radio-primary radio-sm"
            checked={material === "plastic"}
            onChange={() => handleMaterialChange("plastic")}
            data-testid="material-plastic-radio"
          />
          <span className="label-text" data-testid="material-plastic-label">
            {germanTexts.materialControls.plastic}
          </span>
        </label>

        <label className="label cursor-pointer justify-start space-x-2">
          <input
            type="radio"
            name="material"
            className="radio radio-primary radio-sm"
            checked={material === "composite"}
            onChange={() => handleMaterialChange("composite")}
            data-testid="material-composite-radio"
          />
          <span className="label-text" data-testid="material-composite-label">
            {germanTexts.materialControls.composite}
          </span>
        </label>
      </div>
    </div>
  );
}
