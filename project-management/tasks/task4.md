# Task 4: Real-Time Price Calculation and German Localization

## Status: 📋 READY FOR IMPLEMENTATION

## Description

Implement a real-time price calculation system that updates automatically when pylon dimensions change, while simultaneously converting the entire user interface to German language. Add a prominent price display component with German formatting (1.234,56 €) and establish a pricing logic foundation that calculates costs based on pylon volume. This task addresses core business requirements for price transparency and localization while building the foundation for future material and shape-based pricing.

## Acceptance Criteria

**AC1: Price Display Component**

- Add prominent price display panel positioned near dimension controls
- Display current price in German format: "1.234,56 €" (with period as thousands separator, comma as decimal separator)
- Price display updates automatically within 1 second of any dimension change
- Price component is clearly labeled in German ("Preis" or "Gesamtpreis")
- Price text is prominently styled and easily readable

**AC2: Real-Time Price Calculation Logic**

- Implement placeholder pricing algorithm based on pylon volume (height × width × depth)
- Base price calculation: Volume in m³ × price per cubic meter (e.g., 500€/m³)
- Price updates automatically when height, width, or depth values change through Context
- Price calculation completes within 1 second of configuration change
- Minimum price threshold of 100€ for smallest possible pylon (prevents unrealistic pricing)

**AC3: German Language Interface Conversion**

- Convert all UI text elements to German language:
  - Page title: "Pylon Konfigurator POC"
  - Page description: "3D Visualisierung von Werbepylonen"
  - Dimension controls: "Höhe", "Breite", "Tiefe"
  - Dimension summary: format as "3,0m × 1,0m × 0,5m" (German decimal notation)
  - Error messages: German text for validation errors
- Maintain all existing data-testid attributes for test compatibility
- Use German decimal notation (comma) consistently throughout the interface

**AC4: German Number Formatting Integration**

- Implement German number formatting utility function
- Apply German decimal formatting (comma separator) to all dimension displays
- Apply German thousands/decimal formatting to price display
- Ensure numeric input fields accept both comma and period as decimal input
- Convert user input to proper format for calculations and display

**AC5: Price Integration with Existing Context**

- Extend PylonConfigurationContext to include price calculation state
- Price recalculation triggers automatically when dimensions change
- Price state is accessible via usePylonConfiguration hook
- Maintain performance - price calculation does not slow down dimension updates
- Price calculation logic is separated into reusable utility functions

## Automated Tests

**Component Tests (Cypress):**

- Test that PriceDisplay component renders without errors
- Test that price updates when dimension values change via Context
- Test German number formatting functions with various input values
- Test that price calculation produces expected results for known dimension combinations
- Test that minimum price threshold (100€) is enforced

**Integration Tests (Cypress):**

- Test complete price calculation workflow: change dimension → verify price update
- Test German UI text display and formatting across all components
- Test that dimension inputs accept German decimal notation (comma)
- Test price display formatting matches German standards
- Test that all data-testid attributes remain functional after German conversion

**E2E Tests (Cypress):**

- Test end-to-end user workflow with German interface
- Test price calculation accuracy through user interface interactions
- Test that price updates are visible and timely during dimension changes
- Test error message display in German language
- Test price persistence during multiple dimension adjustments

## Implementation Notes

**Pricing Logic Foundation:**

- Create utility function `calculatePylonPrice(dimensions)` in dedicated pricing module
- Implement volume-based calculation as starting point for future material/shape pricing
- Design pricing structure to easily accommodate future enhancements (material multipliers, shape complexity factors)
- Include price validation and minimum threshold enforcement

**German Localization Strategy:**

- Create reusable German formatting utilities for numbers, prices, and text
- Update all hardcoded English strings to German equivalents
- Ensure formatting utilities handle edge cases (very large numbers, zero values)
- Maintain test data-testid compatibility during text conversion

**Context Enhancement:**

- Add price state to PylonConfigurationContext alongside existing dimensions
- Implement automatic price recalculation when configuration changes
- Ensure price updates do not interfere with 3D rendering performance
- Design price state management for future expansion with materials and shapes

**User Experience Considerations:**

- Position price display prominently but not intrusively
- Use loading indicators if price calculation takes noticeable time
- Provide clear visual hierarchy between price, dimensions, and 3D viewer
- Ensure price formatting is immediately recognizable as German currency

## References

- Requirements: FR6.1-FR6.4 (Price Display), NFR4.1-NFR4.3 (German Localization)
- Target Architecture: Business Logic Layer for price calculations
- Current Architecture: Existing PylonConfigurationContext for state management integration

## Files Expected to be Modified

- `/app/components/PriceDisplay.tsx` - New component for price visualization
- `/app/contexts/PylonConfigurationContext.tsx` - Add price calculation state
- `/app/utils/pricing.ts` - New pricing calculation utilities
- `/app/utils/formatting.ts` - New German formatting utilities
- `/app/components/DimensionControl.tsx` - German text and formatting conversion
- `/app/components/DimensionControls.tsx` - German text updates
- `/app/page.tsx` - German page title and description
- Test files in `/cypress/component/` and `/cypress/e2e/` - Test updates for German UI

## Definition of Done Checklist

- [ ] All acceptance criteria implemented and tested
- [ ] Build passes without errors (`npm run build`)
- [ ] TypeScript compilation clean (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Security audit clean (`npm audit`)
- [ ] All tests pass (`npm run test`)
- [ ] Manual testing completed for price calculation accuracy
- [ ] Current architecture documentation updated
- [ ] Task file updated with implementation details
