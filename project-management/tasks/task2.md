# Task 2 - Interactive Camera Controls

## Description

Implement interactive camera controls for the 3D pylon viewer to allow users to orbit, zoom, and pan around the pylon model. This transforms the static 3D view into an interactive experience where users can examine the pylon from all angles, enabling proper inspection and evaluation of the configured pylon.

## Acceptance Criteria

**AC1: Orbit Camera Controls**

- User can click and drag with left mouse button to rotate camera around the pylon
- Camera maintains focus on the pylon center during orbit operations
- Orbit rotation is smooth and responsive without lag or jitter
- Vertical rotation is limited to prevent camera from going below ground or flipping upside down
- Horizontal rotation is unlimited (360-degree rotation)

**AC2: Zoom Controls**

- User can zoom in/out using mouse wheel scroll
- Zoom maintains camera focus on pylon center
- Zoom has reasonable minimum and maximum limits to prevent extreme close-up or far-away views
- Zoom operates smoothly without abrupt jumps
- Zoom speed is appropriate for user control

**AC3: Pan Controls**

- User can hold right mouse button (or Ctrl/Cmd + left mouse button) and drag to pan the camera
- Pan moves the camera target point while maintaining current distance and angle
- Pan has reasonable limits to prevent camera from moving too far from the pylon
- Pan operations are smooth and responsive

**AC4: Camera Behavior Integration**

- All camera controls work together seamlessly (can orbit while zoomed, pan while orbited, etc.)
- Camera controls do not interfere with other UI interactions
- Camera state is maintained during browser window resize
- Initial camera position provides good default view of the pylon

**AC5: Performance Requirements**

- Camera controls maintain smooth 30+ FPS during interactions
- No noticeable performance degradation compared to static view
- Controls remain responsive during continuous mouse movements
- Memory usage remains stable during extended interaction sessions

## Automated Tests

**Integration Tests (Cypress):**

- Test that canvas element renders and initializes properly
- Test that page loads without JavaScript errors
- Test that WebGL context is successfully created
- Test that existing 3D scene still renders without errors after adding controls

**Component Tests (Cypress):**

- Mount PylonViewer and verify canvas element is created
- Test that component initializes without throwing errors

**Manual Testing Required (Cannot be automated with Cypress):**

⚠️ **Note**: Cypress cannot validate Three.js OrbitControls functionality because WebGL canvas content is not accessible to DOM testing tools. The following must be tested manually:

1. **Orbit Controls**: Click and drag with left mouse to rotate camera around pylon
2. **Zoom Controls**: Use mouse wheel to zoom in/out while maintaining pylon focus
3. **Pan Controls**: Right-click and drag to pan camera target point
4. **Smooth Interactions**: Verify all camera movements are fluid and responsive
5. **Limit Testing**: Ensure zoom/pan/orbit limits work as configured
6. **Performance**: Verify smooth 30+ FPS during interactions
7. **Integration**: Test that all controls work together seamlessly
8. **Cross-browser**: Validate controls work in Chrome, Firefox, Safari

**Testing Limitation**: 
While we can test that OrbitControls components are present in the JSX and that mouse events don't crash the application, we cannot programmatically verify that:
- Camera actually moves in response to mouse events
- Zoom limits are respected
- Pan boundaries work correctly  
- Orbit rotation is smooth and properly constrained

This is a fundamental limitation of testing WebGL/Three.js applications with DOM-based testing tools like Cypress.

## Implementation Details

_To be filled in during implementation_

## References

- Requirements: FR5.2 (orbit camera), FR5.3 (zoom), FR5.4 (pan controls)
- Target Architecture: 3D Graphics & Visualization - @react-three/drei for camera controls
- React Three Drei OrbitControls: https://drei.docs.pmnd.rs/controls/orbit-controls
- Current Architecture: Existing PylonViewer component with static camera
