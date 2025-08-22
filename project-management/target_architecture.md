# Target Architecture

## Tech Stack

### Core Framework

- **Frontend Framework**: Next.js 14+ with App Router for server-side rendering and optimal performance
- **Language**: TypeScript for full type safety and enhanced developer experience
- **Build Tool**: Turbopack for fast development builds and Hot Module Replacement

### UI & Styling

- **CSS Framework**: Tailwind CSS 4.0+ for utility-first styling
- **Component Library**: DaisyUI for consistent UI components (buttons, inputs, modals)
- **Icons**: Heroicons or similar for consistent iconography

### 3D Graphics & Visualization

- **3D Engine**: Three.js (^0.170.0) for WebGL-based 3D rendering and scene management
- **3D Integration**: @react-three/fiber (^8.15.0) for React integration with Three.js
- **3D Utilities**: @react-three/drei (^9.92.0) for camera controls and helpers
- **Performance**: @react-three/offscreen for Web Worker optimization (if needed for future tasks)

### Local File Handling & Interaction

- **Client-Side Image Processing**: Browser File API for local image selection (no server upload)
- **Object URL Management**: Browser createObjectURL() for temporary image access
- **Color Management**: React Color Picker component for RGB color selection
- **Form Controls**: React Hook Form for efficient form state management

### Testing & Quality Assurance

- **UI Testing**: Cypress for component testing and user flow validation
- **Cross-browser Testing**: Cypress for UI consistency across target browsers
- **Type Checking**: TypeScript strict mode for compile-time error prevention
- **Manual 3D Testing**: Required for WebGL rendering validation (Cypress cannot test canvas content)

### Deployment & Hosting

- **Hosting Platform**: Vercel for optimized Next.js deployment and global CDN
- **Build Optimization**: Next.js built-in bundle optimization and tree-shaking

## Architecture Overview

### System Structure

```
┌─────────────────────────────────────────────────┐
│                  Browser                        │
│  ┌─────────────────┐    ┌─────────────────────┐ │
│  │   Next.js UI    │    │    Three.js 3D     │ │
│  │   Components    │◄──►│      Scene          │ │
│  │                 │    │                     │ │
│  │ - Config Panel  │    │ - Pylon Geometry    │ │
│  │ - Price Display │    │ - Materials         │ │
│  │ - File Upload   │    │ - Lighting          │ │
│  │ - Color Picker  │    │ - Camera Controls   │ │
│  └─────────────────┘    └─────────────────────┘ │
│           │                       │             │
│           └───────┬───────────────┘             │
│                   │                             │
│  ┌─────────────────────────────────────────────┐ │
│  │         Application State                   │ │
│  │  - Pylon Configuration                     │ │
│  │  - Price Calculation Logic                 │ │
│  │  - Local Image File State                  │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Component Architecture

#### UI Layer (Next.js + DaisyUI)

- **ConfigurationPanel**: Main container component with form controls
- **DimensionControls**: Sliders and inputs for height, width, depth
- **ShapeSelector**: Radio buttons for rectangular, round, triangular shapes
- **MaterialSelector**: Dropdown or buttons for material selection
- **ColorPicker**: RGB color selection interface
- **PriceDisplay**: Real-time price calculation display
- **LocalImageSelector**: File input for local image selection (no upload)

#### 3D Visualization Layer (Three.js + React Three Fiber)

- **Scene**: Main 3D scene container with lighting and camera setup
- **PylonGeometry**: Parametric geometry generator for different shapes
- **MaterialSystem**: PBR materials for Metal/Plastic/Composite appearances
- **TextureManager**: Handles uploaded images as textures on pylon surfaces
- **CameraControls**: Orbit controls for user interaction (zoom, pan, rotate)

#### Business Logic Layer

- **ConfigurationState**: Zustand or React Context for global state management
- **PriceCalculator**: Rule-based pricing logic considering all parameters
- **GeometryGenerator**: Parametric math functions for shape generation
- **ValidationRules**: Parameter validation and constraint checking

## Data Flow Architecture

### Configuration Update Flow

1. **User Input** → UI Component (DaisyUI/Tailwind styled)
2. **State Update** → Global configuration state (React Context/Zustand)
3. **3D Update** → Three.js geometry regeneration/material update
4. **Price Update** → Calculation engine processes new parameters
5. **UI Feedback** → Updated displays across all components

### Local Image Processing Flow

1. **File Selection** → Browser File API reads local file (JPG/PNG)
2. **Client-Side Validation** → File type and size validation (max 10MB)
3. **Object URL Creation** → Browser creates temporary URL for image access
4. **Texture Loading** → Three.js TextureLoader uses Object URL directly
5. **Memory Management** → Object URL cleanup when image is removed/changed

### 3D Rendering Pipeline

1. **Parametric Geometry** → Mathematical generation based on dimensions/shape
2. **Material Application** → PBR material assignment with properties
3. **Texture Mapping** → User-uploaded images applied to surfaces
4. **Scene Rendering** → Three.js WebGL rendering with lighting and shadows
5. **User Interaction** → Camera controls and real-time updates

## Technology Justification

### Next.js 14+ with App Router

- **Server-Side Rendering**: Improves initial load performance for B2B users
- **Built-in Optimization**: Automatic code splitting and bundle optimization
- **Development Experience**: Fast refresh and excellent TypeScript integration
- **Future Integration**: Easy API routes for eventual backend system integration

### Three.js + React Three Fiber

- **WebGL Performance**: Hardware-accelerated 3D rendering meets < 1 second update requirement
- **React Integration**: Seamless state management between UI and 3D components
- **Parametric Modeling**: Flexible geometry generation for different pylon shapes
- **Browser Compatibility**: Works across all target browsers (Chrome, Firefox, Edge, Safari)

### Tailwind CSS + DaisyUI

- **Rapid Development**: Utility-first approach accelerates UI development
- **Consistent Design**: DaisyUI provides cohesive component styling
- **Responsive Ready**: Built-in responsiveness for future mobile expansion
- **Small Bundle**: Tree-shaking eliminates unused styles

### TypeScript

- **3D Math Safety**: Type safety crucial for parametric geometry calculations
- **API Integration**: Strong typing for future backend system integration
- **Developer Experience**: Enhanced IDE support and error catching
- **Team Collaboration**: Self-documenting code for multiple contributors

### Cypress Testing

- **3D Interaction Testing**: Can test WebGL canvas interactions and visual outputs
- **User Flow Validation**: End-to-end testing of configuration workflows
- **Component Isolation**: Component testing for individual UI elements
- **Cross-browser Testing**: Ensures compatibility across target browsers

## Architectural Risks and Mitigation Strategies

### Risk 1: 3D Performance on Lower-End Hardware

**Risk**: WebGL performance may be inadequate on older integrated graphics or low-performance devices, causing frame drops and poor user experience.

**Mitigation Strategies**:

- Implement adaptive Level of Detail (LOD) system that reduces geometry complexity based on performance metrics
- Use Three.js performance monitoring to detect low-performance scenarios and automatically adjust quality
- Create fallback 2D preview mode for systems that cannot handle 3D rendering
- Implement geometry instancing and efficient mesh updates to minimize GPU load

### Risk 2: Bundle Size and Loading Performance

**Risk**: Three.js, 3D assets, and UI libraries could create large bundle sizes affecting initial load times, especially important for B2B users on potentially slower connections.

**Mitigation Strategies**:

- Implement code splitting with Next.js dynamic imports to load 3D components only when needed
- Use Three.js tree-shaking and only import required modules
- Implement progressive loading with skeleton screens and loading indicators
- Optimize 3D assets and textures with compression and efficient formats
- Leverage Vercel's CDN for optimal global content delivery

### Risk 3: Browser Compatibility and WebGL Support Variations

**Risk**: Different browsers may have varying WebGL implementation quality, potentially causing rendering inconsistencies or failures across target browsers (Chrome, Firefox, Edge, Safari).

**Mitigation Strategies**:

- Implement comprehensive WebGL capability detection on application startup
- Create browser-specific fallbacks and workarounds for known compatibility issues
- Use Three.js WebGLRenderer compatibility flags and fallback renderers
- Establish comprehensive cross-browser testing pipeline with Cypress
- Implement graceful degradation with 2D fallback modes if WebGL fails

## Development Approach

### Incremental Implementation Strategy

1. **Phase 1**: Basic Next.js setup with DaisyUI components and form controls
2. **Phase 2**: Three.js integration with simple parametric geometry
3. **Phase 3**: Material system and real-time price calculation
4. **Phase 4**: Local image selection and texture mapping functionality
5. **Phase 5**: Performance optimization and cross-browser testing

### State Management Strategy

- Use React Context for global configuration state (dimensions, materials, colors)
- Local component state for UI-specific interactions (local image file handling, form validation)
- Three.js scene state managed through React Three Fiber's framework

### Testing Strategy

#### Automated Testing (Cypress)

- **UI Component Tests**: Form controls, buttons, sliders, and their state changes
- **Integration Tests**: Configuration parameter flow from UI to application state
- **Cross-browser Tests**: Ensure UI works consistently across target browsers
- **File Handling Tests**: Local image selection and validation logic

#### Manual Testing Requirements

- **3D Visual Validation**: Manual verification of geometry, materials, and textures
- **Performance Testing**: Frame rate monitoring during interactions
- **Cross-browser 3D Testing**: WebGL rendering consistency across browsers

_Note: Cypress cannot reliably test WebGL canvas rendering content - 3D visual validation requires manual testing_

## Future Extensibility

### Integration Readiness

- **API Gateway Pattern**: Next.js API routes ready for backend system integration
- **Component Architecture**: Modular design supports embedding in existing company websites
- **State Management**: Centralized configuration state enables easy data persistence
- **Plugin Architecture**: Extensible material and shape system for future additions

### Scalability Considerations

- **Server-Side Rendering**: Next.js SSR ready for SEO and performance optimization
- **Caching Strategy**: Static generation for product catalogs and configuration presets
- **CDN Optimization**: Vercel deployment optimized for global content delivery
- **Database Integration**: Architecture supports future user session and configuration storage

## Technical Constraints and Dependencies

### Browser Requirements

- **WebGL 2.0 Support**: Essential for Three.js rendering performance
- **ES2020 Features**: Modern JavaScript features for optimal development experience
- **File API Support**: Required for image upload functionality
- **Canvas 2D Context**: Backup rendering and image processing capabilities

### Performance Targets

- **Initial Load**: < 3 seconds on broadband connection
- **3D Updates**: < 1 second response time for configuration changes
- **Frame Rate**: Maintain 30+ FPS during user interactions
- **Bundle Size**: Target < 2MB initial bundle after optimization

### Development Dependencies

- **Node.js 18+**: Required for Next.js and build tooling
- **Modern Browser for Development**: Chrome/Firefox with developer tools
- **Git**: Version control for incremental development workflow
- **Vercel CLI**: For deployment and preview environments
