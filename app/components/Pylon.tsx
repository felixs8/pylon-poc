"use client";

import { useRef } from "react";
import { Mesh } from "three";
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
  const { material, color } = configuration;

  const materialProps = MATERIAL_PROPERTIES[material];

  return (
    <mesh
      ref={meshRef}
      position={[0, height / 2 - 0.1, 0]}
      castShadow
      receiveShadow
    >
      {/* Dynamic geometry based on configuration */}
      <boxGeometry args={[width, height, depth]} />

      {/* Dynamic material based on configuration */}
      <meshStandardMaterial
        color={color}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
      />
    </mesh>
  );
}
