/**
 * German text constants for the Pylon Configurator
 * Centralized location for all German language strings
 */

import { formatGermanNumber } from "./formatting";

// Page content
export const germanTexts = {
  // Dimension controls
  dimensionControls: {
    title: "Pylon-Konfiguration",
    height: "Höhe",
    width: "Breite",
    depth: "Tiefe",
    dimensionsHeader: "Abmessungen",
    designHeader: "Material & Design",
  },

  // Material controls
  materialControls: {
    title: "Material",
    metal: "Metall",
    plastic: "Kunststoff",
    composite: "Verbundwerkstoff",
  },

  // Color controls
  colorControls: {
    title: "Farbe",
    label: "Farbe auswählen",
    current: "Aktuelle Farbe",
    modalTitle: "Farbe auswählen",
    hexLabel: "Hex-Farbwert",
    hexPlaceholder: "#87CEEB",
    confirmButton: "OK",
    clickToSelect: "Zum Auswählen klicken",
  },

  // Image upload controls
  imageControls: {
    title: "Bild",
    uploadLabel: "Bild hochladen",
    removeLabel: "Bild entfernen",
    modalTitle: "Bild positionieren",
    confirmButton: "OK",
    cancelButton: "Abbrechen",
    statusUploaded: "Bild hochgeladen",
    statusNone: "Kein Bild",
  },

  // Configuration summary
  summary: {
    title: "Zusammenfassung",
  },

  // Error messages with German decimal formatting
  validation: {
    invalidNumber: "Bitte geben Sie eine gültige Zahl ein",
    fileTooLarge: "Datei zu groß. Maximum 10MB erlaubt.",
    invalidFileType: "Nur JPG Dateien erlaubt.",
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
