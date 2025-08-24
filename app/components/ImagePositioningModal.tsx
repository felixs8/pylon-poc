"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { PylonDimensions } from "../contexts/PylonConfigurationContext";
import { germanTexts } from "../utils/germanTexts";

interface ImagePositioningModalProps {
  file: File;
  pylonDimensions: PylonDimensions;
  pylonColor: string;
  onConfirm: (position: { x: number; y: number }, scale: number) => void;
  onCancel: () => void;
}

export default function ImagePositioningModal({
  file,
  pylonDimensions,
  pylonColor,
  onConfirm,
  onCancel,
}: ImagePositioningModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 600 });

  // Calculate canvas dimensions based on pylon aspect ratio
  useEffect(() => {
    const pylonRatio = pylonDimensions.height / pylonDimensions.width;
    const maxWidth = 400;
    const maxHeight = 600;

    let canvasWidth = maxWidth;
    let canvasHeight = maxWidth * pylonRatio;

    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight / pylonRatio;
    }

    setCanvasSize({ width: canvasWidth, height: canvasHeight });
  }, [pylonDimensions]);

  // Load image
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      setImage(img);
      // Center the image initially
      setPosition({ x: 0, y: 0 });
      setScale(1.0);
    };

    img.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pylon face background using the selected color
    ctx.fillStyle = pylonColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pylon face border
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Calculate image dimensions
    const imageAspectRatio = image.width / image.height;
    let drawWidth = canvas.width * scale;
    let drawHeight = drawWidth / imageAspectRatio;

    if (drawHeight > canvas.height * scale) {
      drawHeight = canvas.height * scale;
      drawWidth = drawHeight * imageAspectRatio;
    }

    // Calculate image position (center + offset)
    const drawX = (canvas.width - drawWidth) / 2 + position.x;
    const drawY = (canvas.height - drawHeight) / 2 + position.y;

    // Draw image
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }, [image, position, scale, pylonColor]);

  // Redraw when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Mouse event handlers
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x: x - position.x, y: y - position.y });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate new position with constraints
    const newX = x - dragStart.x;
    const newY = y - dragStart.y;

    // Allow movement to full canvas edges (with small buffer to keep some image visible)
    const imageAspectRatio = image ? image.width / image.height : 1;
    let imageWidth = canvas.width * scale;
    let imageHeight = imageWidth / imageAspectRatio;

    if (imageHeight > canvas.height * scale) {
      imageHeight = canvas.height * scale;
      imageWidth = imageHeight * imageAspectRatio;
    }

    // Allow image to move until only 20% is still visible
    const minVisibleRatio = 0.2;
    const maxOffsetX = (canvas.width + imageWidth * (1 - minVisibleRatio)) / 2;
    const maxOffsetY =
      (canvas.height + imageHeight * (1 - minVisibleRatio)) / 2;

    const constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX));
    const constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel event for zooming
  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3.0, scale + delta));

    setScale(newScale);
  };

  // Modal controls
  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.showModal();
    }
  }, []);

  const handleConfirm = () => {
    onConfirm(position, scale);
  };

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCancel]);

  return (
    <dialog
      ref={modalRef}
      className="modal"
      data-testid="image-positioning-modal"
    >
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4" data-testid="modal-title">
          {germanTexts.imageControls.modalTitle}
        </h3>

        <div className="mb-4 flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="border border-gray-300 cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            data-testid="positioning-canvas"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          />
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>Ziehen Sie das Bild zum Verschieben</p>
          <p>Mausrad zum Vergrößern/Verkleinern</p>
        </div>

        <div className="modal-action">
          <button
            onClick={handleCancel}
            className="btn btn-ghost"
            data-testid="modal-cancel-button"
          >
            {germanTexts.imageControls.cancelButton}
          </button>
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
            data-testid="modal-confirm-button"
          >
            {germanTexts.imageControls.confirmButton}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleCancel}>close</button>
      </form>
    </dialog>
  );
}
