"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

        {/* Interactive Camera Controls */}
        <OrbitControls
          target={[0, 1.4, 0]} // Focus on pylon center (height/2 - 0.1 = 1.4)
          minDistance={2} // Minimum zoom distance
          maxDistance={20} // Maximum zoom distance
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
