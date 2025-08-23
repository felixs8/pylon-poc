# Current Architecture

3D pylon configurator POC with basic Three.js visualization capabilities for advertising pylons.

## Implemented Features

- **3D Canvas Setup**: React Three Fiber integrated with Next.js for WebGL-based 3D rendering
- **Static Pylon Display**: Rectangular pylon geometry (3.0m x 1.0m x 0.5m) with basic material rendering
- **Interactive Camera Controls**: Full OrbitControls integration with orbit, zoom, and pan functionality
- **Basic Scene Lighting**: Ambient and directional lighting for proper depth perception
- **Smooth Camera Interactions**: Damped controls with distance limits (2-20 units) and polar angle restrictions
- **3D Scene Foundation**: Ground plane and basic scene setup for future interactive features

## Current Techstack

- **Next.js 15+ with App Router**: Modern Next.js with App Router architecture and Turbopack
- **Three.js + React Three Fiber**: WebGL-based 3D rendering with React integration (@react-three/fiber ^8.15.0)
- **Three.js Utilities**: @react-three/drei ^9.92.0 for 3D helpers (currently minimal usage)
- **Tailwind + DaisyUI Styling**: Utility-first CSS with component library integration
- **Cypress Testing Suite**: Both E2E and component testing configured and working
- **TypeScript Support**: Full TypeScript configuration with Three.js type definitions

## File Index

### Components

- `/app/page.tsx` – Main page with 3D pylon configurator interface
- `/app/components/PylonViewer.tsx` – 3D canvas container with Three.js scene setup
- `/app/components/Pylon.tsx` – Static pylon geometry component (rectangular box)

### E2E Tests

- `/cypress/e2e/pylonVisualization.cy.ts` – Comprehensive 3D visualization testing (AC1-AC5)

### Component Tests

- `/cypress/component/Home.cy.tsx` – Home component test
- `/cypress/component/PylonViewer.cy.tsx` – 3D component rendering and WebGL context tests

### Configuration

- `/package.json` – Project dependencies including Three.js libraries (three, @react-three/fiber, @react-three/drei, @types/three)
- `/cypress.config.ts` – Cypress testing configuration
- `/next.config.ts` – Next.js configuration with TypeScript
- `/tsconfig.json` – TypeScript compiler configuration
- `/postcss.config.mjs` – PostCSS configuration for Tailwind CSS
- `/eslint.config.mjs` – ESLint configuration with Cypress-specific rules

## Package.json Scripts

- `npm run dev` – Start development server with Turbopack
- `npm run build` – Build production application with Turbopack
- `npm run start` – Start production server
- `npm run test` – Run component tests + E2E tests (with server startup)
- `npm run cypress:open` – Open Cypress interactive test runner
- `npm run cypress:run` – Run Cypress E2E tests headlessly
- `npm run cypress:component` – Run Cypress component tests headlessly

## 3D Rendering Details

### Scene Setup

- **Canvas Dimensions**: 600px height, responsive width
- **Camera Position**: [5, 3, 5] for optimal pylon viewing angle
- **Field of View**: 50 degrees for balanced perspective
- **Lighting**: Ambient (0.4 intensity) + Directional (1.0 intensity) with shadows

### Pylon Specifications

- **Geometry**: BoxGeometry with fixed dimensions (3.0m height, 1.0m width, 0.5m depth)
- **Material**: MeshStandardMaterial with light blue color (#87CEEB)
- **Position**: Positioned at [0, height/2 - 0.1, 0] to sit properly on ground plane at y = -0.1
- **Rendering**: Casts and receives shadows for realistic appearance

### Performance

- **Load Time**: < 3 seconds initial scene loading (AC5 compliance)
- **WebGL Support**: Tested across Chrome, Firefox, Edge, Safari
- **Error Handling**: Graceful WebGL context creation with error detection

## Testing Coverage

### Automated Tests (7 total)

- **Component Tests (2)**: Home component and PylonViewer component functionality
- **E2E Tests (5)**: Canvas presence, WebGL context, performance, error-free rendering

### Manual Testing Requirements

- Visual verification of pylon rendering across target browsers
- Lighting quality assessment
- Performance validation under different hardware conditions
- **OrbitControls functionality**: Camera controls cannot be automatically tested with Cypress because WebGL canvas content is not accessible to DOM testing tools. Manual verification required for:
  - Left-click orbit functionality around pylon
  - Mouse wheel zoom with proper distance limits (2-20 units)
  - Right-click pan behavior
  - Smooth camera movements and performance
  - Proper focus maintained on pylon center
  - Angle and distance constraints working correctly

## Task History

- **Task 1**: Basic 3D Canvas and Static Pylon Display (✅ Completed)

  - Implemented React Three Fiber integration
  - Created static rectangular pylon with proper dimensions
  - Added basic scene lighting (ambient + directional)
  - Set up fixed camera positioning
  - Comprehensive Cypress test coverage for all acceptance criteria
  - Performance optimization meeting < 3 second load time requirement

- **Task 2**: Interactive Camera Controls (✅ Completed)
  - Integrated @react-three/drei OrbitControls for camera interaction
  - Implemented orbit functionality with left-click drag
  - Added mouse wheel zoom with distance limits (2-20 units)
  - Enabled right-click pan controls
  - Configured smooth damped camera movements
  - Set polar angle restrictions to prevent underground camera views
  - Camera target focused on pylon center at [0, 1.4, 0]
