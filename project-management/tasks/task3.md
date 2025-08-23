# Task 3 - Dynamic Pylon Size Configuration

## Description

Implement user interface controls to dynamically adjust pylon dimensions (height, width, depth) with real-time updates to the 3D model. Create a React Context-based state management system to handle pylon configuration data, establishing the foundation for future configuration features (shape, material, color, price calculation). Add sliders and numeric input fields for each dimension within the specified ranges, ensuring the 3D pylon geometry updates within 1 second of any change. This transforms the static pylon into a configurable model while building the architectural foundation for the complete configurator system.

## Acceptance Criteria

**AC1: Height Control Interface**

- Add height slider control with range 1.0m - 8.0m
- Add numeric input field for height with same range validation
- Current height value is displayed with "m" unit
- Height changes via slider or input update the 3D model within 1 second
- Invalid input values are rejected and user receives feedback

**AC2: Width Control Interface**

- Add width slider control with range 0.3m - 3.0m
- Add numeric input field for width with same range validation
- Current width value is displayed with "m" unit
- Width changes via slider or input update the 3D model within 1 second
- Invalid input values are rejected and user receives feedback

**AC3: Depth Control Interface**

- Add depth slider control with range 0.1m - 1.0m
- Add numeric input field for depth with same range validation
- Current depth value is displayed with "m" unit
- Depth changes via slider or input update the 3D model within 1 second
- Invalid input values are rejected and user receives feedback

**AC4: Real-time 3D Model Updates**

- Pylon geometry updates immediately when any dimension changes
- Pylon maintains proper positioning (bottom face on ground plane)
- Camera target adjusts to new pylon center for optimal viewing
- Lighting and shadows update correctly with new geometry
- Performance remains smooth (30+ FPS) during dimension changes

**AC5: UI Layout and Integration**

- Dimension controls are grouped in a logical configuration panel
- Controls are clearly labeled and easy to understand
- UI uses consistent DaisyUI styling matching existing design
- Configuration panel is positioned alongside the 3D viewer
- All controls are keyboard accessible

## Automated Tests

**Integration Tests (Cypress):**

- Test that dimension control components render without errors
- Test that sliders and inputs are present and functional
- Test that invalid input values are properly validated
- Test that 3D canvas continues to render after dimension changes
- Test that page performance remains acceptable with multiple dimension changes

**Component Tests (Cypress):**

- Mount dimension controls and verify they render correctly
- Test slider and input synchronization
- Test value validation and error feedback
- Test that dimension changes trigger proper callbacks
- Test Context provider integration and state updates

**Manual Testing Required:**

⚠️ **Note**: Real-time 3D geometry updates cannot be fully automated due to WebGL canvas limitations. Manual verification required for:

- Visual confirmation that pylon geometry changes match input values
- Verification that pylon positioning remains correct on ground plane
- Performance assessment during rapid dimension changes
- Camera target adjustment behavior
- Lighting and shadow updates

## Implementation Notes

**State Management:**

- Create PylonConfigurationContext with React Context for global state management
- Implement custom hooks (usePylonConfiguration) for accessing configuration state
- Use React state within Context to manage current dimension values (height, width, depth)
- Implement debouncing for rapid input changes to optimize performance
- Validate dimension ranges before applying to 3D model
- Design Context structure to accommodate future configuration options (shape, material, color)

**3D Model Updates:**

- Modify existing Pylon component to consume configuration from Context
- Update BoxGeometry args based on Context state changes
- Ensure pylon position calculation accounts for new dimensions
- Update camera target in PylonViewer when dimensions change significantly

**UI Components:**

- Create DimensionControls component using DaisyUI elements
- Integrate with PylonConfigurationContext for state management
- Use range sliders with proper min/max values
- Implement two-way binding between sliders and numeric inputs
- Add proper form validation and user feedback

## References

- Requirements: FR1.1-FR1.5 (Pylon Size Configuration)
- Target Architecture: UI Layer with DaisyUI components, React Context for state management
- Current Architecture: Existing Pylon.tsx component to be enhanced

## Files Expected to be Modified

- `/app/components/Pylon.tsx` - Accept dimension props from Context and update geometry
- `/app/components/PylonViewer.tsx` - Integrate Context provider and dimension controls
- `/app/page.tsx` - Layout updates if needed for Context provider wrapper
- New file: `/app/components/DimensionControls.tsx` - UI for dimension inputs using Context
- New file: `/app/contexts/PylonConfigurationContext.tsx` - React Context for state management
- New file: `/app/hooks/usePylonConfiguration.ts` - Custom hook for accessing Context
- Test files in `/cypress/component/` and `/cypress/e2e/`

## Definition of Done Checklist

- [ ] All acceptance criteria implemented and tested
- [ ] Build passes without errors (`npm run build`)
- [ ] TypeScript compilation clean (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Security audit clean (`npm audit`)
- [ ] All tests pass (`npm run test`)
- [ ] Manual testing completed for 3D geometry updates
- [ ] Current architecture documentation updated
- [ ] Task file updated with implementation details
