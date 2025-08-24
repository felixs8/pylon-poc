"use client";

import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";

export default function ColorPicker() {
  const { configuration, setColor } = usePylonConfiguration();
  const { color } = configuration;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempColor, setTempColor] = useState(color);
  const [hexInput, setHexInput] = useState(color);
  const modalRef = useRef<HTMLDialogElement>(null);

  // Sync temporary color with current color when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setTempColor(color);
      setHexInput(color);
    }
  }, [isModalOpen, color]);

  // Handle modal open
  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => modalRef.current?.showModal(), 0);
  };

  // Handle modal close
  const closeModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  // Handle color confirmation
  const handleConfirm = () => {
    setColor(tempColor);
    closeModal();
  };

  // Handle color picker change
  const handleColorPickerChange = (newColor: string) => {
    setTempColor(newColor);
    setHexInput(newColor);
  };

  // Handle hex input change
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    // Validate hex color format
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (hexRegex.test(value)) {
      setTempColor(value);
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="space-y-4" data-testid="color-picker">
      <h3 className="text-sm font-medium" data-testid="color-picker-title">
        {germanTexts.colorControls.title}
      </h3>

      {/* Compact Color Selector */}
      <div className="space-y-3">
        <label className="text-xs text-base-content/70">
          {germanTexts.colorControls.label}
        </label>

        <button
          type="button"
          className="flex items-center space-x-3 p-2 rounded-lg border-2 border-base-300 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={openModal}
          data-testid="color-picker-button"
          aria-label={`${germanTexts.colorControls.current}: ${color}`}
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-base-content/20"
            style={{ backgroundColor: color }}
            data-testid="color-swatch"
          />
          <div className="text-left">
            <div className="text-xs text-base-content/70">
              {germanTexts.colorControls.current}
            </div>
            <div className="font-mono text-sm" data-testid="color-value">
              {color.toUpperCase()}
            </div>
          </div>
        </button>
      </div>

      {/* Color Selection Modal */}
      <dialog
        ref={modalRef}
        className="modal"
        data-testid="color-picker-modal"
        onClose={closeModal}
      >
        <div className="modal-box max-w-sm">
          <h3 className="font-bold text-lg mb-4" data-testid="modal-title">
            {germanTexts.colorControls.modalTitle}
          </h3>

          <div className="space-y-4">
            {/* Color Picker */}
            <div className="flex justify-center">
              <div className="color-picker-wrapper">
                <HexColorPicker
                  color={tempColor}
                  onChange={handleColorPickerChange}
                  data-testid="hex-color-picker"
                />
              </div>
            </div>

            {/* Hex Input Field */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                htmlFor="hex-input"
                data-testid="hex-input-label"
              >
                {germanTexts.colorControls.hexLabel}
              </label>
              <input
                id="hex-input"
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                placeholder={germanTexts.colorControls.hexPlaceholder}
                className="input input-bordered w-full font-mono"
                data-testid="hex-input"
                maxLength={7}
              />
            </div>

            {/* Current Color Preview */}
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-base-content/20"
                style={{ backgroundColor: tempColor }}
                data-testid="modal-color-preview"
              />
              <div>
                <div className="text-xs text-base-content/70">
                  {germanTexts.colorControls.current}
                </div>
                <div className="font-mono text-sm">
                  {tempColor.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
              data-testid="confirm-button"
            >
              {germanTexts.colorControls.confirmButton}
            </button>
          </div>
        </div>

        {/* Modal Backdrop */}
        <div className="modal-backdrop" onClick={closeModal}>
          <button type="button" aria-label="Close modal" />
        </div>
      </dialog>

      <style jsx>{`
        .color-picker-wrapper :global(.react-colorful) {
          width: 200px;
          height: 150px;
        }

        .color-picker-wrapper :global(.react-colorful__saturation) {
          border-radius: 8px 8px 0 0;
        }

        .color-picker-wrapper :global(.react-colorful__hue) {
          height: 25px;
          border-radius: 0 0 8px 8px;
        }

        .color-picker-wrapper :global(.react-colorful__pointer) {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </div>
  );
}
