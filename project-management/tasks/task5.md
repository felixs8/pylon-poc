# Task 5: Basic Material Selection Interface

## Status: 📋 READY FOR IMPLEMENTATION

## Description

Implement material selection functionality that allows users to choose between Metal, Plastic, and Composite materials with immediate visual updates to the 3D pylon model. Create a material selection UI component that integrates with the existing React Context state management system and provides visual differentiation through material appearance changes. This establishes the foundation for future pricing calculations and expands the configurator's customization capabilities.

## Acceptance Criteria

**AC1: Material Selection UI Component**

- Add material selection interface with three options: "Metall", "Kunststoff", "Verbundwerkstoff" (German labels)
- Material selection is presented via radio buttons or dropdown with clear visual design
- Current material selection is clearly indicated in the UI
- Material selector is integrated into the existing configuration panel alongside dimension controls
- UI follows German localization standards and DaisyUI styling consistency

**AC2: Context State Integration**

- Extend PylonConfigurationContext to include material selection state
- Add material property to configuration interface with type safety (TypeScript)
- Implement setMaterial function in Context for material updates
- Default material selection is set to "Kunststoff" (Plastic)
- Material state changes trigger Context updates across all consuming components

**AC3: 3D Visual Material Differentiation**

- Material selection immediately updates 3D pylon appearance within 1 second
- **Metal**: Metallic appearance with higher metalness (0.8) and lower roughness (0.2)
- **Plastic**: Non-metallic appearance with no metalness (0.0) and medium roughness (0.5)
- **Composite**: Semi-metallic appearance with moderate metalness (0.3) and higher roughness (0.7)
- Material changes preserve current pylon color and dimensions
- Lighting and shadows update correctly with new material properties

**AC4: German Text Integration**

- All material labels use German text from centralized text constants
- Material selection integrates with existing German formatting utilities
- Error states (if any) display German text
- Material display follows German text standards and accessibility requirements

**AC5: Configuration Display Integration**

- Current material selection is displayed in configuration summary/display areas
- Material information is formatted consistently with existing dimension displays
- Material updates are reflected across all UI components that show current configuration
- Integration maintains existing layout and visual hierarchy

## Automated Tests

**Component Tests (Cypress):**

- Test material selection component renders with all three material options
- Test material selection updates Context state correctly
- Test German material labels display correctly ("Metall", "Kunststoff", "Verbundwerkstoff")
- Test default material selection is "Kunststoff"
- Test material selector integrates properly with configuration panel layout
- Test material selection state persists during dimension changes

**E2E Tests (Cypress):**

- Test complete material selection workflow from UI interaction to visual update
- Test material selection works alongside dimension controls without conflicts
- Test material selection accessibility (keyboard navigation, focus management)
- Test material selection performance meets < 1 second update requirement
- Test that page remains responsive during material changes

**Manual Testing Required:**

⚠️ **Note**: 3D material appearance changes cannot be fully automated due to WebGL canvas limitations. Manual verification required for:

- Visual confirmation that Metal/Plastic/Composite materials show distinct appearances
- Verification that material changes preserve lighting and shadow quality
- Performance assessment during rapid material changes
- Visual quality of material appearance across different browsers

## Implementation Notes

**State Management Integration:**

- Extend existing PylonConfigurationContext with material property
- Add material type definition: `type MaterialType = 'metal' | 'plastic' | 'composite'`
- Update PylonConfiguration interface to include `material: MaterialType`
- Implement material setter following existing dimension setter patterns
- Ensure material changes trigger proper re-renders

**3D Material Implementation:**

- Update Pylon.tsx component to consume material from Context
- Implement Three.js MeshStandardMaterial property updates based on material selection
- Use material properties: metalness, roughness for visual differentiation
- Maintain existing color and basic material setup while adding material-specific properties
- Ensure material updates don't break existing lighting/shadow setup

**UI Component Design:**

- Create MaterialSelector component following DimensionControl patterns
- Position material selector logically within existing configuration panel
- Use DaisyUI radio buttons or select dropdown for consistent styling
- Follow existing German text integration patterns from dimension controls
- Maintain accessibility standards with proper labels and keyboard navigation

**German Localization:**

- Add material-related text constants to `/app/utils/germanTexts.ts`
- Include material labels: "Metall", "Kunststoff", "Verbundwerkstoff"
- Follow existing German text organization patterns
- Ensure material text integrates with existing formatting utilities

## References

- Requirements: FR3.1-FR3.4 (Material Selection)
- Target Architecture: MaterialSystem for PBR material properties and MaterialSelector UI component
- Current Architecture: Existing React Context pattern and German localization system

## Files Expected to be Modified

- `/app/contexts/PylonConfigurationContext.tsx` - Add material state and setter function
- `/app/components/Pylon.tsx` - Consume material from Context and update Three.js material properties
- `/app/components/DimensionControls.tsx` - Integrate MaterialSelector component
- `/app/utils/germanTexts.ts` - Add German material labels and text constants
- New file: `/app/components/MaterialSelector.tsx` - Material selection UI component
- Test files in `/cypress/component/` and `/cypress/e2e/` - Material selection test coverage

## Definition of Done Checklist

- [ ] All acceptance criteria implemented and tested
- [ ] Build passes without errors (`npm run build`)
- [ ] TypeScript compilation clean (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Security audit clean (`npm audit`)
- [ ] All tests pass (`npm run test`)
- [ ] Manual testing completed for 3D material appearance changes
- [ ] Current architecture documentation updated
- [ ] Task file updated with implementation details
