"use client";

import React, { useRef, useState } from "react";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";
import { germanTexts } from "../utils/germanTexts";
import ImagePositioningModal from "./ImagePositioningModal";

export default function ImageUpload() {
  const { configuration, setImage, removeImage } = usePylonConfiguration();
  const { image } = configuration;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // File validation
  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      return germanTexts.validation.invalidFileType;
    }

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      return germanTexts.validation.fileTooLarge;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Clear any previous error
    setError("");

    // Set selected file and open modal
    setSelectedFile(file);
    setShowModal(true);
  };

  const handleModalConfirm = (
    position: { x: number; y: number },
    scale: number
  ) => {
    if (!selectedFile) return;

    // Create object URL
    const objectUrl = URL.createObjectURL(selectedFile);

    // Update image state
    setImage({
      file: selectedFile,
      objectUrl,
      filename: selectedFile.name,
      position,
      scale,
      isUploaded: true,
      isPositioning: false,
    });

    // Close modal and clear selected file
    setShowModal(false);
    setSelectedFile(null);

    // Clear file input for next upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setSelectedFile(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    removeImage();
    setError("");

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4" data-testid="image-upload">
      {/* File Input */}
      <div className="form-control">
        <label className="label">
          <span
            className="label-text font-medium"
            data-testid="image-upload-label"
          >
            {germanTexts.imageControls.title}
          </span>
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={handleFileSelect}
          className="file-input file-input-bordered w-full"
          data-testid="image-file-input"
        />

        {/* Current filename display */}
        {image.isUploaded && image.filename && (
          <div className="mt-2">
            <span
              className="text-sm text-base-content/70"
              data-testid="image-filename"
            >
              {image.filename}
            </span>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="alert alert-error" data-testid="image-upload-error">
          <span>{error}</span>
        </div>
      )}

      {/* Remove button */}
      {image.isUploaded && (
        <button
          onClick={handleRemoveImage}
          className="btn btn-outline btn-error btn-sm"
          data-testid="image-remove-button"
        >
          {germanTexts.imageControls.removeLabel}
        </button>
      )}

      {/* Image Positioning Modal */}
      {showModal && selectedFile && (
        <ImagePositioningModal
          file={selectedFile}
          pylonDimensions={configuration.dimensions}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
}
