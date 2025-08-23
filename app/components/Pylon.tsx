"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";

export default function Pylon() {
  const meshRef = useRef<Mesh>(null);
  const { configuration } = usePylonConfiguration();
  const { height, width, depth } = configuration.dimensions;

  return (
    <mesh
      ref={meshRef}
      position={[0, height / 2 - 0.1, 0]}
      castShadow
      receiveShadow
    >
      {/* Dynamic geometry based on configuration */}
      <boxGeometry args={[width, height, depth]} />

      {/* Basic material with light blue color */}
      <meshStandardMaterial color="#87CEEB" />
    </mesh>
  );
}
