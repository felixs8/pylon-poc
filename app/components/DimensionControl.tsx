"use client";

import React, { useState, useCallback, useEffect } from "react";

interface DimensionControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  testId?: string;
}

export default function DimensionControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  testId,
}: DimensionControlProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const [error, setError] = useState<string>("");

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value.toString());
    setError("");
  }, [value]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onChange(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setError("");

      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        if (numValue < min || numValue > max) {
          setError(`Value must be between ${min}${unit} and ${max}${unit}`);
        } else {
          onChange(numValue);
        }
      } else if (newValue !== "") {
        setError("Please enter a valid number");
      }
    },
    [min, max, unit, onChange]
  );

  const handleInputBlur = useCallback(() => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      // Reset to current valid value
      setInputValue(value.toString());
      setError("");
    }
  }, [inputValue, value, min, max]);

  return (
    <div className="form-control space-y-2" data-testid={testId}>
      <label className="label">
        <span
          className="label-text font-medium"
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
        <span
          className="label-text-alt text-primary"
          data-testid={`${testId}-display`}
        >
          {value.toFixed(1)}
          {unit}
        </span>
      </label>

      {/* Range Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="range range-primary range-sm"
        aria-label={`${label} slider`}
        data-testid={`${testId}-slider`}
      />

      {/* Range markers */}
      <div className="w-full flex justify-between text-xs px-2 text-base-content/60">
        <span data-testid={`${testId}-min-marker`}>
          {min}
          {unit}
        </span>
        <span data-testid={`${testId}-max-marker`}>
          {max}
          {unit}
        </span>
      </div>

      {/* Numeric Input */}
      <div className="w-full">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`input input-bordered input-sm w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            error ? "input-error" : ""
          }`}
          placeholder={`${min}-${max}`}
          aria-label={`${label} numeric input`}
          data-testid={`${testId}-input`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="label">
          <span
            className="label-text-alt text-error"
            data-testid={`${testId}-error`}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
