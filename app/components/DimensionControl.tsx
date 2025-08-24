"use client";

import React, { useState, useCallback, useEffect } from "react";
import { germanTexts } from "../utils/germanTexts";
import { formatGermanNumber, parseGermanNumber } from "../utils/formatting";

interface DimensionControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  getRangeErrorMessage: (min: number, max: number) => string;
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
  getRangeErrorMessage,
  testId,
}: DimensionControlProps) {
  const [inputValue, setInputValue] = useState(formatGermanNumber(value));
  const [error, setError] = useState<string>("");

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(formatGermanNumber(value));
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

      // Validate input in real-time for error messages
      if (newValue.trim() === "") {
        setError("");
      } else {
        const numValue = parseGermanNumber(newValue);
        if (isNaN(numValue)) {
          setError(germanTexts.validation.invalidNumber);
        } else if (numValue < min || numValue > max) {
          setError(getRangeErrorMessage(min, max));
        } else {
          setError("");
        }
      }
    },
    [min, max, getRangeErrorMessage]
  );

  const handleInputBlur = useCallback(() => {
    // Handle both German (comma) and English (dot) decimal notation
    const numValue = parseGermanNumber(inputValue);

    if (isNaN(numValue) || inputValue.trim() === "") {
      // Reset to current valid value if input is invalid or empty
      setInputValue(formatGermanNumber(value));
      setError("");
    } else if (numValue >= min && numValue <= max) {
      // Valid value - update and format
      onChange(numValue);
      setInputValue(formatGermanNumber(numValue));
      setError("");
    } else {
      // Invalid range - reset to current valid value and clear error
      setInputValue(formatGermanNumber(value));
      setError("");
    }
  }, [inputValue, value, min, max, onChange]);
  return (
    <div className="form-control space-y-2" data-testid={testId}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <span
          className="label-text font-medium mb-1 sm:mb-0"
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
        <span
          className="label-text-alt text-primary text-sm"
          data-testid={`${testId}-display`}
        >
          {formatGermanNumber(value)}
          {unit}
        </span>
      </div>

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
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`input input-bordered input-sm w-full ${
            error ? "input-error" : ""
          }`}
          placeholder={`${formatGermanNumber(min)}-${formatGermanNumber(max)}`}
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
