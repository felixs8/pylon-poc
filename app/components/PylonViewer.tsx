"use client";

import { Canvas } from "@react-three/fiber";
import Pylon from "./Pylon";

export default function PylonViewer() {
  return (
    <div className="w-full h-[600px] border border-base-300 rounded-lg">
      <Canvas
        camera={{
          position: [5, 3, 5],
          fov: 50,
        }}
        shadows
      >
        {/* Ambient lighting for general illumination */}
        <ambientLight intensity={0.4} />

        {/* Directional lighting for proper depth perception */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Static Pylon */}
        <Pylon />

        {/* Ground plane for depth perception */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      </Canvas>
    </div>
  );
}
