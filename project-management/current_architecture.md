# Current Architecture

3D pylon configurator POC with German localization and basic Three.js visualization capabilities for advertising pylons.

## Implemented Features

- **German Localization**: Complete German language interface with localized text constants and German decimal formatting
- **3D Canvas Setup**: React Three Fiber integrated with Next.js for WebGL-based 3D rendering
- **Dynamic Pylon Configuration**: Real-time pylon dimension adjustment with React Context state management
- **Interactive Camera Controls**: Full OrbitControls integration with orbit, zoom, and pan functionality
- **Dimension Controls**: Sliders and numeric inputs for height (1.0-8.0m), width (0.3-3.0m), depth (0.1-1.0m)
- **German Number Formatting**: Text inputs accept both comma and dot decimals, display shows German format with comma separators
- **German Error Messages**: Validation messages in German with proper decimal notation
- **Real-time 3D Updates**: Pylon geometry updates within 1 second of dimension changes
- **Input Validation**: Range validation with German localized user feedback for invalid values
- **Dynamic Camera Targeting**: Camera focus automatically adjusts to pylon center as dimensions change
- **Basic Scene Lighting**: Ambient and directional lighting for proper depth perception
- **Smooth Camera Interactions**: Damped controls with distance limits (2-20 units) and polar angle restrictions
- **3D Scene Foundation**: Ground plane and basic scene setup for future interactive features

## Current Techstack

- **Next.js 15+ with App Router**: Modern Next.js with App Router architecture and Turbopack
- **Three.js + React Three Fiber**: WebGL-based 3D rendering with React integration (@react-three/fiber ^8.15.0)
- **Three.js Utilities**: @react-three/drei ^9.92.0 for 3D helpers and camera controls
- **React Context**: Global state management for pylon configuration data
- **Tailwind + DaisyUI Styling**: Utility-first CSS with component library integration
- **Cypress Testing Suite**: Both E2E and component testing configured and working
- **TypeScript Support**: Full TypeScript configuration with Three.js type definitions

## File Index

### Components

- `/app/page.tsx` – Main page with German localized content and Context provider
- `/app/components/PylonViewer.tsx` – 3D canvas container with integrated dimension controls
- `/app/components/Pylon.tsx` – Dynamic pylon geometry component consuming Context state
- `/app/components/DimensionControls.tsx` – UI controls container with German labels and formatting
- `/app/components/DimensionControl.tsx` – Individual dimension control with German validation, text inputs, and error handling

### Localization & Utilities

- `/app/utils/germanTexts.ts` – Centralized German text constants for all UI strings and error messages
- `/app/utils/formatting.ts` – German number formatting utilities supporting both comma and dot input parsing

### Context & State Management

- `/app/contexts/PylonConfigurationContext.tsx` – React Context for global pylon configuration state
- `/app/hooks/usePylonConfiguration.ts` – Custom hook for accessing configuration Context

### E2E Tests

- `/cypress/e2e/pylonVisualization.cy.ts` – Comprehensive 3D visualization testing (AC1-AC5)
- `/cypress/e2e/pylonConfiguration.cy.ts` – Dynamic configuration testing with validation and UI interaction

### Component Tests

- `/cypress/component/Home.cy.tsx` – Home component test
- `/cypress/component/PylonViewer.cy.tsx` – 3D component rendering and WebGL context tests
- `/cypress/component/PylonViewerWithControls.cy.tsx` – Integrated 3D viewer with dimension controls
- `/cypress/component/DimensionControls.cy.tsx` – Configuration UI integration testing focusing on component interaction
- `/cypress/component/DimensionControl.cy.tsx` – Individual control component testing with validation, input handling, and error states

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
- **Camera Position**: Dynamic positioning based on pylon size - minimum [5.6, 1.8, 5.6] for small pylons, scales to [8.4, 4.8, 8.4] for tall pylons
- **Camera Target**: Dynamic targeting at pylon center [0, height/2 - 0.1, 0]
- **OrbitControls Distance**: Adaptive min/max distances scaling with pylon dimensions (min: 0.5x largest dimension, max: 3x largest dimension)
- **Field of View**: 50 degrees for balanced perspective
- **Lighting**: Ambient (0.4 intensity) + Directional (1.0 intensity) with shadows

### Pylon Specifications

- **Geometry**: BoxGeometry with dynamic dimensions (height: 1.0-8.0m, width: 0.3-3.0m, depth: 0.1-1.0m)
- **Real-time Updates**: Geometry recalculates automatically when Context state changes
- **Material**: MeshStandardMaterial with light blue color (#87CEEB)
- **Position**: Positioned at [0, height/2 - 0.1, 0] to sit properly on ground plane at y = -0.1
- **Rendering**: Casts and receives shadows for realistic appearance

### Performance

- **Load Time**: < 3 seconds initial scene loading (AC5 compliance)
- **WebGL Support**: Tested across Chrome, Firefox, Edge, Safari
- **Error Handling**: Graceful WebGL context creation with error detection

## Testing Coverage

### Automated Tests (18 total)

- **Component Tests (9)**: DimensionControl (4), DimensionControls (2), Home (1), PylonViewer (1), PylonViewerWithControls (1)
- **E2E Tests (9)**: Configuration testing (6), 3D visualization (3) with data-testid precision targeting

### Data-Testid Testing Strategy

- **Precise Targeting**: All UI components include `data-testid` attributes for reliable test selection
- **Test Reliability**: Replaced generic CSS and text-based selectors with specific test identifiers
- **Maintainability**: Tests remain stable when visual styling or content changes
- **Coverage**: Both component and E2E tests use data-testids for consistent testing approach

### Manual Testing Requirements

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

- **Task 3**: Dynamic Pylon Size Configuration (✅ Completed)

  - Created React Context-based state management for pylon configuration
  - Implemented dimension controls with sliders and numeric inputs
  - Added real-time 3D model updates within 1 second of changes
  - Built input validation with user feedback for range violations
  - Integrated dynamic camera targeting that adjusts with pylon dimensions
  - Established architectural foundation for future configuration features
  - Comprehensive test coverage for UI components and validation logic

- **Task 4**: German Localization for Interface Labels (✅ Completed)
  - Converted all UI text elements to German language
  - Created centralized German text constants file (`/app/utils/germanTexts.ts`)
  - Implemented German number formatting utilities (`/app/utils/formatting.ts`)
  - Applied German decimal notation (comma separator) to all displays
  - Converted validation error messages to German with proper formatting
  - Updated text inputs to accept both comma and dot decimal formats
  - Maintained all existing functionality while adding localization
  - Updated component tests to verify German text and formatting
