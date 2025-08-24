"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Mesh, MeshStandardMaterial, CanvasTexture } from "three";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";

// Material properties for different material types
const MATERIAL_PROPERTIES = {
  metal: {
    metalness: 0.5,
    roughness: 0.0,
  },
  plastic: {
    metalness: 0.0,
    roughness: 0.5,
  },
  composite: {
    metalness: 0.2,
    roughness: 0.7,
  },
} as const;

export default function Pylon() {
  const meshRef = useRef<Mesh>(null);
  const { configuration } = usePylonConfiguration();
  const { height, width, depth } = configuration.dimensions;
  const { material, color, image } = configuration;
  const [imageTexture, setImageTexture] = useState<CanvasTexture | null>(null);

  const materialProps = MATERIAL_PROPERTIES[material];

  // Create texture from uploaded image
  useEffect(() => {
    if (!image.objectUrl || !image.isUploaded) {
      setImageTexture(null);
      return;
    }

    // Create a canvas to apply positioning and scaling
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on pylon face (width x height)
    const textureSize = 512;
    canvas.width = textureSize;
    canvas.height = Math.round(textureSize * (height / width));

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Clear canvas with white background (so image is visible regardless of pylon color)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate image dimensions and position
      const imageAspectRatio = img.width / img.height;
      let drawWidth = canvas.width * image.scale;
      let drawHeight = drawWidth / imageAspectRatio;

      if (drawHeight > canvas.height * image.scale) {
        drawHeight = canvas.height * image.scale;
        drawWidth = drawHeight * imageAspectRatio;
      }

      // Apply positioning (scale position from canvas coordinates to texture coordinates)
      const positionScaleX = canvas.width / 400; // 400 was the canvas width in modal
      const positionScaleY = canvas.height / 600; // 600 was the max canvas height in modal
      const drawX =
        (canvas.width - drawWidth) / 2 + image.position.x * positionScaleX;
      const drawY =
        (canvas.height - drawHeight) / 2 + image.position.y * positionScaleY;

      // Draw image
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Create texture from canvas
      const texture = new CanvasTexture(canvas);
      // Fix orientation issues
      texture.flipY = true; // Fix upside-down issue
      texture.wrapS = texture.wrapT = 1001; // THREE.RepeatWrapping
      setImageTexture(texture);
    };

    img.onerror = () => {
      console.error("Failed to load image for texture");
      setImageTexture(null);
    };

    img.src = image.objectUrl;
  }, [
    image.objectUrl,
    image.position,
    image.scale,
    image.isUploaded,
    height,
    width,
  ]);

  // Create materials array for different faces
  const materials = useMemo(() => {
    // Create 6 materials for box faces (right, left, top, bottom, front, back)
    const materials = Array(6)
      .fill(null)
      .map(() => {
        const material = new MeshStandardMaterial({
          color: color,
          metalness: materialProps.metalness,
          roughness: materialProps.roughness,
        });
        return material;
      });

    // If we have an image texture, apply it to front (index 4) and back (index 5) faces
    if (imageTexture) {
      // Front face material with texture
      materials[4] = new MeshStandardMaterial({
        map: imageTexture,
        metalness: materialProps.metalness,
        roughness: materialProps.roughness,
        // Don't use base color when texture is applied
      });

      // Back face material with texture
      materials[5] = new MeshStandardMaterial({
        map: imageTexture,
        metalness: materialProps.metalness,
        roughness: materialProps.roughness,
        // Don't use base color when texture is applied
      });
    }

    return materials;
  }, [color, materialProps, imageTexture]);

  return (
    <mesh
      ref={meshRef}
      position={[0, height / 2 - 0.1, 0]}
      castShadow
      receiveShadow
      material={materials}
    >
      {/* Dynamic geometry based on configuration */}
      <boxGeometry args={[width, height, depth]} />
    </mesh>
  );
}
