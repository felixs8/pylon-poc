import DimensionControls from "../../app/components/DimensionControls";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("DimensionControls Component", () => {
  it("renders with all dimension controls", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <DimensionControls />
      </PylonConfigurationProvider>
    );

    // Check that the main component renders with German title
    cy.get('[data-testid="dimension-controls-title"]').should(
      "have.text",
      "Pylon Abmessungen"
    );

    // Check that all three control types are present
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");

    // Check summary section with German formatting (comma decimal)
    cy.get('[data-testid="dimension-summary"]').should("exist");
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );
  });

  it("updates summary when dimensions change", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <DimensionControls />
      </PylonConfigurationProvider>
    );

    // Initial state with German formatting (comma decimal)
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );

    // Change height via numeric input
    cy.get('[data-testid="height-control-input"]').clear().type("6");
    cy.get('[data-testid="height-control-input"]').blur();

    // Summary should update with German formatting
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "6,0m × 1,0m × 0,5m"
    );

    // Change width to whole number
    cy.get('[data-testid="width-control-input"]').clear().type("2");
    cy.get('[data-testid="width-control-input"]').blur();

    // Wait for state update
    cy.wait(100);

    // Summary should update again with German formatting
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "6,0m × 2,0m × 0,5m"
    );
  });
});
