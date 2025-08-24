# Current Architecture

3D pylon configurator POC with German localization, material selection, color customization, image upload with positioning, optimized layout design, and Three.js visualization capabilities for advertising pylons.

## Implemented Features

- **German Localization**: Complete German language interface with localized text constants and German decimal formatting
- **Optimized Configuration Layout**: Three-row flexbox layout design that eliminates vertical scrolling:
  - **Row 1**: Compact page heading section with reduced padding
  - **Row 2**: Two-column control layout with "Abmessungen" (dimensions) on left and "Material & Design" on right
  - **Row 3**: Configuration summary section at bottom with clear visual separation
  - **Full-Screen Layout**: Page uses full viewport height with 3D canvas and configuration panel simultaneously visible
  - **Responsive Canvas**: 3D canvas scales to use remaining space after configuration panel sizing
- **3D Canvas Setup**: React Three Fiber integrated with Next.js for WebGL-based 3D rendering
- **Dynamic Pylon Configuration**: Real-time pylon dimension adjustment with React Context state management
- **Interactive Camera Controls**: Full OrbitControls integration with orbit, zoom, and pan functionality
- **Dimension Controls**: Sliders and numeric inputs for height (1.0-8.0m), width (0.3-3.0m), depth (0.1-1.0m)
- **Material Selection Interface**: Radio button interface for three material types with German labels:
  - **Metall** (Metal): High metalness (0.8), low roughness (0.2) for shiny metallic appearance
  - **Kunststoff** (Plastic): Low metalness (0.1), medium roughness (0.8) for matte plastic finish
  - **Verbundwerkstoff** (Composite): Balanced properties (metalness 0.4, roughness 0.6) for composite material look
- **Color Selection Interface**: Interactive RGB color picker with real-time 3D preview using react-colorful library:
  - **HexColorPicker**: Lightweight 2.8KB component with WAI-ARIA accessibility compliance
  - **German Labels**: Color picker with German text ("Farbe", "Farbe auswählen", "Aktuelle Farbe")
  - **Real-time Updates**: Color changes applied to 3D pylon within 1 second while preserving material properties
  - **Visual Feedback**: Color swatch display with hex value in configuration summary
- **Image Upload and Positioning System**: Complete image upload workflow with interactive positioning:
  - **File Validation**: Client-side validation for JPG/PNG files with 10MB size limit and German error messages
  - **Interactive Positioning Modal**: Canvas-based image positioning with drag/zoom controls using German interface ("Bild positionieren")
  - **Dual-Face Texture Application**: Images applied to both front and back faces of the 3D pylon model
  - **Real-time Canvas Preview**: Interactive canvas showing pylon aspect ratio with drag (mouse) and zoom (wheel) controls
  - **Texture Processing**: Browser File API with CanvasTexture generation preserving positioning and scaling
  - **Memory Management**: Proper Object URL cleanup and resource management to prevent memory leaks
  - **State Integration**: Image state integrated into PylonConfigurationContext with position/scale data
- **3D Material Properties**: Visual differentiation of materials in 3D rendering with proper metalness/roughness values
- **Advanced 3D Texturing**: Multi-material system supporting both base colors and image textures:
  - **Material Arrays**: Six-sided cube materials with selective texture application
  - **Texture Orientation**: Proper texture orientation handling with flipY correction
  - **Texture Visibility**: White background ensures image visibility regardless of base pylon color
- **German Number Formatting**: Text inputs accept both comma and dot decimals, display shows German format with comma separators
- **German Error Messages**: Validation messages in German with proper decimal notation including image upload errors
- **Real-time 3D Updates**: Pylon geometry, material, color, and texture updates within 1 second of configuration changes
- **Input Validation**: Range validation with German localized user feedback for invalid values
- **Dynamic Camera Targeting**: Camera focus automatically adjusts to pylon center as dimensions change
- **Basic Scene Lighting**: Ambient and directional lighting for proper depth perception and material visualization
- **Smooth Camera Interactions**: Damped controls with distance limits (2-20 units) and polar angle restrictions
- **Configuration Summary**: Real-time display of current dimensions, material, color, and image status in German
- **3D Scene Foundation**: Ground plane and basic scene setup for interactive features

## Current Techstack

- **Next.js 15+ with App Router**: Modern Next.js with App Router architecture and Turbopack
- **Three.js + React Three Fiber**: WebGL-based 3D rendering with React integration (@react-three/fiber ^8.15.0)
- **Three.js Utilities**: @react-three/drei ^9.92.0 for 3D helpers and camera controls
- **React Context**: Global state management for pylon configuration data
- **react-colorful**: Ultra-lightweight (2.8KB) color picker with TypeScript support and WAI-ARIA accessibility
- **Tailwind + DaisyUI Styling**: Utility-first CSS with component library integration
- **Cypress Testing Suite**: Both E2E and component testing configured and working
- **TypeScript Support**: Full TypeScript configuration with Three.js type definitions

## File Index

### Components

- `/app/page.tsx` – Main page with German localized content, full-screen layout, and Context provider
- `/app/components/PylonViewer.tsx` – 3D canvas container with full-height layout and integrated configuration panel
- `/app/components/Pylon.tsx` – Dynamic pylon geometry component with six-sided materials and texture application system
- `/app/components/ConfigurationPanel.tsx` – Three-row flexbox layout with German labels: heading row, two-column controls (dimensions | material/color/image), and configuration summary
- `/app/components/DimensionControl.tsx` – Individual dimension control with German validation, text inputs, and error handling
- `/app/components/MaterialSelector.tsx` – Material selection interface with radio buttons and German labels
- `/app/components/ColorPicker.tsx` – Interactive RGB color picker component using react-colorful with German localization
- `/app/components/ImageUpload.tsx` – File upload component with validation (JPG/PNG, 10MB), preview, and positioning modal integration
- `/app/components/ImagePositioningModal.tsx` – Interactive Canvas-based image positioning interface with drag/zoom controls and German labels
- `/app/components/ConfigurationSummary.tsx` – Configuration summary component displaying current dimensions, material, color, and image status in German

### Localization & Utilities

- `/app/utils/germanTexts.ts` – Centralized German text constants including material labels for all UI strings and error messages
- `/app/utils/formatting.ts` – German number formatting utilities supporting both comma and dot input parsing

### Context & State Management

- `/app/contexts/PylonConfigurationContext.tsx` – React Context for global pylon configuration state including material selection
- `/app/hooks/usePylonConfiguration.ts` – Custom hook for accessing configuration Context with MaterialType exports

### E2E Tests

- `/cypress/e2e/pylonVisualization.cy.ts` – Comprehensive 3D visualization testing (AC1-AC5)
- `/cypress/e2e/pylonConfiguration.cy.ts` – Dynamic configuration testing with validation and UI interaction
- `/cypress/e2e/materialSelection.cy.ts` – Material selection functionality testing with 3D integration

### Component Tests

- `/cypress/component/Home.cy.tsx` – Home component test
- `/cypress/component/PylonViewer.cy.tsx` – 3D component rendering and WebGL context tests
- `/cypress/component/PylonViewerWithControls.cy.tsx` – Integrated 3D viewer with configuration panel
- `/cypress/component/ConfigurationPanel.cy.tsx` – Configuration UI integration testing with component composition verification
- `/cypress/component/DimensionControl.cy.tsx` – Individual control component testing with validation, input handling, and error states
- `/cypress/component/MaterialSelector.cy.tsx` – Material selection component testing with German labels and accessibility
- `/cypress/component/ColorPicker.cy.tsx` – Color picker component testing with German labels and accessibility
- `/cypress/component/ConfigurationSummary.cy.tsx` – Configuration summary component testing with German formatting, material, color, and image status display

### Configuration

- `/package.json` – Project dependencies including Three.js libraries (three, @react-three/fiber, @react-three/drei, @types/three, react-colorful)
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
- **Real-time Updates**: Geometry and material recalculate automatically when Context state changes
- **Material Properties**: Dynamic material system with visual differentiation:
  - **Metal**: High metalness (0.8), low roughness (0.2) for shiny metallic appearance
  - **Plastic**: Low metalness (0.1), medium roughness (0.8) for matte plastic finish
  - **Composite**: Balanced metalness (0.4), medium roughness (0.6) for composite material look
- **Base Material**: MeshStandardMaterial with light blue color (#87CEEB) and material property overrides
- **Position**: Positioned at [0, height/2 - 0.1, 0] to sit properly on ground plane at y = -0.1
- **Rendering**: Casts and receives shadows for realistic material appearance

### Performance

- **Load Time**: < 3 seconds initial scene loading (AC5 compliance)
- **WebGL Support**: Tested across Chrome, Firefox, Edge, Safari
- **Error Handling**: Graceful WebGL context creation with error detection

## Testing Coverage

### Automated Tests (33 total)

- **Component Tests (27)**: ConfigurationPanel (6), ConfigurationSummary (6), DimensionControl (4), , MaterialSelector (6), Home (1), PylonViewer (1), PylonViewerWithControls (1)
- **E2E Tests (15)**: Configuration testing (5), 3D visualization (3), material selection (7) with data-testid precision targeting

### Data-Testid Testing Strategy

- **Precise Targeting**: All UI components include `data-testid` attributes for reliable test selection
- **Test Reliability**: Replaced generic CSS and text-based selectors with specific test identifiers
- **Maintainability**: Tests remain stable when visual styling or content changes
- **Coverage**: Both component and E2E tests use data-testids for consistent testing approach

### Manual Testing Requirements

- Lighting quality assessment
- Performance validation under different hardware conditions
- **3D Material Visual Verification**: Material property differentiation requires manual verification:
  - Metal materials should appear shiny and reflective
  - Plastic materials should appear matte with minimal reflection
  - Composite materials should show balanced reflection properties
  - Material changes should be visually distinct and update immediately
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

- **Task 5**: Basic Material Selection Interface (✅ Completed)

  - Extended React Context to include material state management with MaterialType enum
  - Created MaterialSelector component with radio button interface and German labels
  - Implemented 3D material properties with visual differentiation (metalness/roughness values)
  - Integrated material selection into DimensionControls panel with proper layout
  - Added German text constants for all three materials (Metall, Kunststoff, Verbundwerkstoff)
  - Updated configuration summary to display current material selection
  - Comprehensive test coverage with component tests (6) and E2E tests (8)
  - Real-time 3D visual updates when material selection changes
  - Full Definition of Done compliance with build, tests, and documentation updates

- **Task 6**: Color Customization Interface (✅ Completed)

  - Extended React Context to include color state management with hex color storage
  - Created ColorPicker component using react-colorful (2.8KB) with German localization
  - Implemented modal-based color selection interface with DaisyUI modal system
  - Added real-time 3D color preview with color changes applied within 1 second
  - Created visual color swatch display in configuration summary
  - Maintained material properties (metalness/roughness) while applying colors
  - Added German text constants for color picker interface ("Farbe", "Farbe auswählen")
  - Comprehensive test coverage with component tests (8) and E2E tests (6)
  - Full accessibility compliance with WAI-ARIA support from react-colorful
  - Complete Definition of Done compliance with build, tests, and documentation updates

- **Task 7**: Local Image Upload and Texture Application (✅ Completed)

  - Extended React Context with comprehensive ImageState management (file, position, scale, URL)
  - Created ImageUpload component with file validation (JPG/PNG, 10MB limit) and German error messages
  - Implemented ImagePositioningModal with interactive Canvas-based positioning interface
  - Added drag and zoom controls for precise image positioning on pylon aspect ratio
  - Created advanced 3D texturing system with multi-material support for selective face application
  - Applied images to both front (face 2) and back (face 3) faces of the pylon geometry
  - Implemented proper texture orientation handling with flipY correction for WebGL coordinate mapping
  - Added white background rendering to ensure image visibility regardless of base pylon color
  - Integrated memory management with Object URL cleanup to prevent memory leaks
  - Updated configuration summary to display image upload status with German labels
  - Added German text constants for image upload interface ("Bild hochladen", "Bild positionieren")
  - Comprehensive test coverage with component tests (8) and E2E tests (6 passing, 1 partial due to Cypress file handling)
  - Real-time texture updates within 1 second of image positioning changes
  - Complete Definition of Done compliance with build verification and architecture documentation

- **Task 8**: Configuration Panel Layout Optimization (✅ Completed)
  - Restructured ConfigurationPanel to three-row flexbox layout eliminating vertical scrolling
  - Row 1: Compact page heading with reduced padding for space efficiency
  - Row 2: Two-column control layout with dimensions (left) and material/color/image controls (right)
  - Row 3: Configuration summary at bottom with clear visual separation using border-top
  - Converted page layout to full-screen (h-screen) for optimal viewport utilization
  - Updated PylonViewer to use full-height layout with flexible 3D canvas sizing
  - Added German text constants for column headers ("Abmessungen", "Material & Design")
  - Increased configuration panel width from 320px (w-80) to 384px (w-96) for better control spacing
  - Maintained all existing functionality while reorganizing layout structure
  - All 57 automated tests continue to pass with new layout (36 component + 21 E2E tests)
  - Preserves German localization, real-time updates, and accessibility compliance
  - Complete Definition of Done compliance with build, tests, and documentation updates
