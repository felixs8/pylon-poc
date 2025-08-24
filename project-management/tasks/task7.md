# Task 7 - Local Image Upload and Texture Application

## Description

Implement local image upload functionality allowing users to select image files (JPG/PNG) from their device and apply them as textures to both the front and back faces of the 3D pylon model. Clicking the file input opens an interactive modal with a canvas that shows the pylon's current aspect ratio (height × width), allowing users to position and scale the image using mouse controls (drag to move, mouse wheel to zoom). When confirmed, the positioned image is applied to the 3D pylon. The system provides German-language feedback and proper cleanup of resources.

## Acceptance Criteria

**AC1: File Selection Interface**

- File input control is added to the configuration panel with German label "Bild hochladen"
- File input accepts only JPG and PNG image formats (accept=".jpg,.jpeg,.png,image/jpeg,image/png")
- Upload button is styled consistently with existing DaisyUI components
- Clicking the file input opens an interactive positioning modal instead of directly applying the image
- Current uploaded image filename is displayed when an image is positioned and confirmed

**AC2: Interactive Image Positioning Modal**

- Modal opens after successful file selection and validation
- Modal contains a 2D canvas that displays the pylon's current aspect ratio (height × width dimensions)
- Canvas shows the selected image overlaid on the pylon face representation
- Modal has German title "Bild positionieren" and includes OK/Cancel buttons ("OK"/"Abbrechen")
- Modal uses DaisyUI modal styling and can be closed with ESC key or backdrop click
- Canvas size is reasonable for user interaction (e.g., 400×600px for a 1×1.5 aspect ratio pylon)

**AC3: Canvas-Based Image Manipulation**

- Image can be moved by clicking and dragging with the mouse within the canvas bounds
- Image can be zoomed in/out using mouse wheel with reasonable zoom limits (e.g., 0.5x to 3x)
- Image positioning is constrained so it cannot be moved completely outside the pylon face area
- Canvas shows visual feedback during drag and zoom operations
- Image maintains its aspect ratio during all transformations
- Initial image position and scale are centered and fit appropriately within the pylon face

**AC4: Client-Side File Validation**

- Files are validated for correct MIME types (image/jpeg, image/png) before opening the positioning modal
- Files exceeding 10MB size limit are rejected with German error message "Datei zu groß. Maximum 10MB erlaubt."
- Invalid file types show German error message "Nur JPG und PNG Dateien erlaubt."
- Validation errors are displayed in the UI using DaisyUI alert styling
- Validation occurs immediately after file selection, before modal opens

**AC5: Image Processing and Texture Application**

- When user clicks OK in the modal, the positioned image is processed using Browser File API
- Images are loaded as Three.js textures using TextureLoader with proper positioning and scaling
- Textures are applied to both front face (positive Z direction) and back face (negative Z direction) of the pylon
- Image positioning and scaling from the canvas modal are preserved in the 3D texture application
- Texture updates complete within 1 second of modal confirmation
- Modal closes automatically after successful image application

**AC6: 3D Visual Integration**

- Uploaded images appear correctly on both front and back faces of the pylon in the 3D scene
- Images work with all existing material types (Metall, Kunststoff, Verbundwerkstoff)
- Material properties (metalness, roughness) are preserved when texture is applied
- Images scale and position appropriately when pylon dimensions change
- Image positioning from the modal is accurately represented in the 3D scene
- Texture quality remains acceptable for the configurator's purposes

**AC7: Image Removal Functionality**

- "Bild entfernen" button appears when an image is uploaded and positioned
- Clicking remove button returns pylon to base material appearance without texture
- Remove button clears the file input, filename display, and position data
- Object URLs and canvas resources are properly cleaned up to prevent memory leaks
- Remove functionality works correctly across all material types

**AC8: State Management Integration**

- Image upload state is integrated into the existing PylonConfigurationContext
- Configuration summary displays image status ("Bild hochgeladen" or "Kein Bild")
- Image state persists correctly when other configuration options are changed
- Context state includes image file information and positioning data (filename, position, scale, upload status)
- Canvas positioning state is maintained until user confirms or cancels

**AC9: Performance and Memory Management**

- Object URL and canvas resource cleanup occurs when images are removed or replaced
- Memory usage remains stable when uploading multiple images sequentially
- Large images (up to 10MB) load without freezing the interface or modal
- 3D rendering performance maintains 30+ FPS with textures applied to both faces
- Canvas interactions (drag/zoom) are smooth and responsive
- No memory leaks occur during repeated upload/position/remove cycles

## Automated Tests

**Component Tests (Cypress):**

- Test ImageUpload component renders with correct German labels
- Test file input validation (10MB limit, JPG/PNG only) before modal opens
- Test invalid file type validation with appropriate error messages
- Test modal opens after successful file selection
- Test canvas image manipulation (drag, zoom) within modal
- Test modal OK/Cancel functionality
- Test remove functionality clears image and resets state
- Test upload state updates in configuration summary

**Integration Tests (Cypress E2E):**

- Test complete upload workflow from file selection through positioning modal to 3D texture application
- Test image positioning modal canvas interactions and controls
- Test image appears on both front and back faces of pylon in 3D scene
- Test image removal returns to base material appearance
- Test image upload works with different material selections
- Test configuration summary updates correctly with image status
- Test pylon dimension changes preserve positioned image correctly
- Test Object URL and canvas cleanup doesn't cause memory issues

**Manual Testing Required:**

- Visual verification that images appear correctly on both front and back faces of pylon
- Canvas modal functionality testing (drag, zoom, positioning accuracy)
- Image positioning accuracy between canvas preview and 3D application
- Canvas interaction responsiveness and smooth user experience
- Texture quality assessment with positioned images at various scales
- Performance testing with maximum 10MB image files
- Memory usage monitoring during repeated upload/position/remove operations
- Cross-browser compatibility testing for canvas and modal functionality (Chrome, Firefox, Edge, Safari)

## Implementation Notes

**Technical Approach:**

- Extend PylonConfigurationContext to include image state with positioning data (file, objectUrl, filename, position, scale)
- Create ImageUpload component with file input, validation, and modal trigger functionality
- Create ImagePositioningModal component with canvas-based image manipulation
- Implement HTML5 Canvas API for image positioning with mouse drag and wheel zoom controls
- Integrate Browser File API for client-side file processing
- Use Three.js TextureLoader with positioned Object URLs for texture loading
- Apply textures to both front and back faces of BoxGeometry using material arrays
- Implement proper Object URL and canvas resource lifecycle management

**Canvas Implementation Details:**

- Canvas dimensions calculated based on pylon aspect ratio (height/width)
- Mouse event handlers for drag (mousedown/mousemove/mouseup) and zoom (wheel)
- Image transformation matrix for position and scale calculations
- Boundary constraints to keep image partially within pylon face area
- Real-time canvas redrawing during user interactions

**German Localization:**

- Add image and modal-related text constants to germanTexts.ts
- Include validation error messages and modal controls in German
- Update configuration summary with German image status labels

**State Structure:**

```typescript
interface ImageState {
  file: File | null;
  objectUrl: string | null;
  filename: string | null;
  position: { x: number; y: number };
  scale: number;
  isUploaded: boolean;
  isPositioning: boolean;
}
```

**Files to Modify/Create:**

- `/app/components/ImageUpload.tsx` (new component)
- `/app/components/ImagePositioningModal.tsx` (new modal component with canvas)
- `/app/contexts/PylonConfigurationContext.tsx` (extend with image and positioning state)
- `/app/components/ConfigurationPanel.tsx` (integrate ImageUpload component)
- `/app/components/ConfigurationSummary.tsx` (add image status display)
- `/app/components/Pylon.tsx` (apply texture to both front and back faces)
- `/app/utils/germanTexts.ts` (add image and modal-related text constants)
- Corresponding test files for all components and modal functionality

## Dependencies

- Requires existing 3D scene setup (Task 1) ✅
- Requires configuration panel framework (Task 3) ✅
- Requires German localization system (Task 4) ✅
- Requires material selection system (Task 5) ✅
- Requires Context state management (established in previous tasks) ✅

## Definition of Done

- [ ] All acceptance criteria met and tested (including modal and canvas functionality)
- [ ] All automated tests pass (component + E2E, including modal interactions)
- [ ] Manual testing completed successfully (canvas interactions, front/back face display)
- [ ] German localization implemented correctly (including modal text)
- [ ] Performance requirements met (< 1 second texture updates, smooth canvas interactions, 30+ FPS)
- [ ] Memory management verified (no Object URL or canvas resource leaks)
- [ ] Canvas functionality works across target browsers
- [ ] Image positioning accuracy validated between modal and 3D scene
- [ ] Code builds without errors or warnings
- [ ] current_architecture.md updated with new components and modal capabilities
- [ ] Task implementation notes documented
