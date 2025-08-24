/**
 * German text constants for the Pylon Configurator
 * Centralized location for all German language strings
 */

import { formatGermanNumber } from "./formatting";

// Page content
export const germanTexts = {
  // Page titles and descriptions
  pageTitle: "Pylon Konfigurator POC",
  pageDescription: "3D Visualisierung von Werbepylonen",

  // Dimension controls
  dimensionControls: {
    title: "Pylon-Konfiguration",
    height: "Höhe",
    width: "Breite",
    depth: "Tiefe",
  },

  // Material controls
  materialControls: {
    title: "Material",
    metal: "Metall",
    plastic: "Kunststoff",
    composite: "Verbundwerkstoff",
  },

  // Error messages with German decimal formatting
  validation: {
    invalidNumber: "Bitte geben Sie eine gültige Zahl ein",
    heightRange: (min: number, max: number) =>
      `Wert muss zwischen ${formatGermanNumber(min)}m und ${formatGermanNumber(
        max
      )}m liegen`,
    widthRange: (min: number, max: number) =>
      `Wert muss zwischen ${formatGermanNumber(min)}m und ${formatGermanNumber(
        max
      )}m liegen`,
    depthRange: (min: number, max: number) =>
      `Wert muss zwischen ${formatGermanNumber(min)}m und ${formatGermanNumber(
        max
      )}m liegen`,
  },
};
