"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pylon from "./Pylon";
import DimensionControls from "./DimensionControls";
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
    <div className="flex gap-6 w-full">
      {/* 3D Viewer */}
      <div className="flex-1">
        <div
          className="w-full h-[600px] border border-base-300 rounded-lg"
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

            {/* Interactive Camera Controls with dynamic target */}
            <OrbitControls
              target={cameraTarget}
              minDistance={Math.max(2, maxDimension * 0.5)} // Minimum distance scales with pylon size
              maxDistance={Math.max(20, maxDimension * 3)} // Maximum distance scales with pylon size
              minPolarAngle={Math.PI / 6} // Prevent camera going below ground (30 degrees from top)
              maxPolarAngle={Math.PI / 2} // Prevent camera flipping upside down (90 degrees from top)
              enablePan={true} // Enable right-click pan
              enableZoom={true} // Enable mouse wheel zoom
              enableRotate={true} // Enable left-click orbit
              enableDamping={true} // Smooth camera movement
              dampingFactor={0.05} // Damping intensity for smooth motion
              panSpeed={1} // Pan sensitivity
              rotateSpeed={1} // Rotation sensitivity
              zoomSpeed={1} // Zoom sensitivity
              mouseButtons={{
                LEFT: 0, // Left button for orbit
                MIDDLE: 1, // Middle button for zoom (if available)
                RIGHT: 2, // Right button for pan
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

      {/* Configuration Panel */}
      <div className="w-80">
        <DimensionControls />
      </div>
    </div>
  );
}
