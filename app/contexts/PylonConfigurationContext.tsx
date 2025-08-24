"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Type definitions for pylon configuration
export interface PylonDimensions {
  height: number;
  width: number;
  depth: number;
}

export type MaterialType = "metal" | "plastic" | "composite";

export interface PylonConfiguration {
  dimensions: PylonDimensions;
  material: MaterialType;
}

// Context value interface
interface PylonConfigurationContextValue {
  configuration: PylonConfiguration;
  updateDimensions: (dimensions: Partial<PylonDimensions>) => void;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  setDepth: (depth: number) => void;
  setMaterial: (material: MaterialType) => void;
}

// Validation constants
export const DIMENSION_LIMITS = {
  height: { min: 1.0, max: 8.0 },
  width: { min: 0.3, max: 3.0 },
  depth: { min: 0.1, max: 1.0 },
} as const;

// Default configuration
const DEFAULT_CONFIGURATION: PylonConfiguration = {
  dimensions: {
    height: 3.0,
    width: 1.0,
    depth: 0.5,
  },
  material: "plastic",
};

// Create the context
const PylonConfigurationContext =
  createContext<PylonConfigurationContextValue | null>(null);

// Provider component
interface PylonConfigurationProviderProps {
  children: ReactNode;
}

export function PylonConfigurationProvider({
  children,
}: PylonConfigurationProviderProps) {
  const [configuration, setConfiguration] = useState<PylonConfiguration>(
    DEFAULT_CONFIGURATION
  );

  // Validation function
  const validateDimension = useCallback(
    (key: keyof PylonDimensions, value: number): boolean => {
      const limits = DIMENSION_LIMITS[key];
      return value >= limits.min && value <= limits.max;
    },
    []
  );

  // Update dimensions with validation
  const updateDimensions = useCallback(
    (newDimensions: Partial<PylonDimensions>) => {
      setConfiguration((prev) => {
        const updatedDimensions = { ...prev.dimensions };

        // Validate and apply changes
        Object.entries(newDimensions).forEach(([key, value]) => {
          const dimensionKey = key as keyof PylonDimensions;
          if (value !== undefined && validateDimension(dimensionKey, value)) {
            updatedDimensions[dimensionKey] = value;
          }
        });

        return {
          ...prev,
          dimensions: updatedDimensions,
        };
      });
    },
    [validateDimension]
  );

  // Specific dimension setters
  const setHeight = useCallback(
    (height: number) => {
      if (validateDimension("height", height)) {
        updateDimensions({ height });
      }
    },
    [updateDimensions, validateDimension]
  );

  const setWidth = useCallback(
    (width: number) => {
      if (validateDimension("width", width)) {
        updateDimensions({ width });
      }
    },
    [updateDimensions, validateDimension]
  );

  const setDepth = useCallback(
    (depth: number) => {
      if (validateDimension("depth", depth)) {
        updateDimensions({ depth });
      }
    },
    [updateDimensions, validateDimension]
  );

  const setMaterial = useCallback((material: MaterialType) => {
    setConfiguration((prev) => ({
      ...prev,
      material,
    }));
  }, []);

  const contextValue: PylonConfigurationContextValue = {
    configuration,
    updateDimensions,
    setHeight,
    setWidth,
    setDepth,
    setMaterial,
  };

  return (
    <PylonConfigurationContext.Provider value={contextValue}>
      {children}
    </PylonConfigurationContext.Provider>
  );
}

// Custom hook to use the context
export function usePylonConfiguration() {
  const context = useContext(PylonConfigurationContext);

  if (!context) {
    throw new Error(
      "usePylonConfiguration must be used within a PylonConfigurationProvider"
    );
  }

  return context;
}
