"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pylon from "./Pylon";
import ConfigurationPanel from "./ConfigurationPanel";
import { usePylonConfiguration } from "../hooks/usePylonConfiguration";

export default function PylonViewer() {
  const { configuration } = usePylonConfiguration();
  const { height, width, depth } = configuration.dimensions;

  // Calculate camera target based on pylon center
  const cameraTarget: [number, number, number] = [0, height / 2 - 0.1, 0];

  // Calculate camera distance based on pylon size to ensure it stays in view
  const maxDimension = Math.max(height, width, depth);
  const cameraDistance = Math.max(10, maxDimension * 2.2); // Minimum 10 units, or 2.2x largest dimension for better framing
  const cameraHeight = Math.max(4, height * 0.7); // Minimum 4 units, or 70% of pylon height

  // Camera position adjusted for pylon size
  const cameraPosition: [number, number, number] = [
    cameraDistance * 0.8, // X position - further back
    cameraHeight, // Y position
    cameraDistance * 0.8, // Z position - further back
  ];

  return (
    <div className="w-full h-full">
      {/* Responsive Layout Container */}
      {/* Mobile (< 640px): flex-col (vertical stack)
          Medium (640px-1023px): flex-col (canvas above, config below)
          Large (1024px+): flex-row (side-by-side) */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full h-full min-h-[600px] lg:min-h-[500px]">
        {/* 3D Canvas - Single instance with responsive sizing */}
        <div
          className="w-full lg:w-1/2 
                        h-64 sm:h-96 md:h-[32rem] lg:h-full lg:min-h-[500px]
                        flex-shrink-0"
        >
          <div
            className="w-full h-full border border-base-300 rounded-lg"
            data-testid="canvas-container"
          >
            <Canvas
              camera={{
                position: cameraPosition,
                fov: 50,
              }}
              shadows
              data-testid="3d-canvas"
            >
              {/* Ambient lighting for general illumination */}
              <ambientLight intensity={0.8} />

              {/* Directional lighting for proper depth perception */}
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.3}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />

              {/* Interactive Camera Controls with dynamic target */}
              <OrbitControls
                target={cameraTarget}
                minDistance={Math.max(2, maxDimension * 0.5)}
                maxDistance={Math.max(20, maxDimension * 3)}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.05}
                panSpeed={1}
                rotateSpeed={1}
                zoomSpeed={1}
                mouseButtons={{
                  LEFT: 0,
                  MIDDLE: 1,
                  RIGHT: 2,
                }}
              />

              {/* Dynamic Pylon */}
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
        </div>

        {/* Configuration Panel - Single instance with responsive sizing */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <ConfigurationPanel />
        </div>
      </div>
    </div>
  );
}
