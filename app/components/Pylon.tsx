"use client";

import { useRef } from "react";
import { Mesh } from "three";

export default function Pylon() {
  const meshRef = useRef<Mesh>(null);

  // Fixed dimensions as per AC3: 3.0m height, 1.0m width, 0.5m depth
  const height = 3.0;
  const width = 1.0;
  const depth = 0.5;

  return (
    <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow receiveShadow>
      {/* Simple rectangular geometry */}
      <boxGeometry args={[width, height, depth]} />

      {/* Basic material with light blue color */}
      <meshStandardMaterial color="#87CEEB" />
    </mesh>
  );
}
