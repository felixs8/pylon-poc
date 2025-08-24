import React from "react";
import ConfigurationPanel from "../../app/components/ConfigurationPanel";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ConfigurationPanel Component", () => {
  it("renders with all dimension controls", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationPanel />
      </PylonConfigurationProvider>
    );

    // Check that the main component renders with German title
    cy.get('[data-testid="configuration-panel-title"]').should(
      "have.text",
      "Pylon-Konfiguration"
    );

    // Check that all three control types are present
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");

    // Check summary section with German formatting (comma decimal)
    cy.get('[data-testid="configuration-summary"]').should("exist");
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );
  });

  it("updates summary when dimensions change", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationPanel />
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

  it("maintains state consistency across components", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationPanel />
      </PylonConfigurationProvider>
    );

    // Check title
    cy.get('[data-testid="configuration-panel-title"]').should(
      "have.text",
      "Pylon-Konfiguration"
    );

    // Check that all components show initial state consistently
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "3,0m"
    );
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );

    // Check material consistency
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Kunststoff"
    );
    cy.get('[data-testid="material-summary-text"]').should(
      "have.text",
      "Kunststoff"
    );

    // Change material and verify updates
    cy.get('[data-testid="material-metal-radio"]').click();

    // Check material display updates
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Metall"
    );

    // Check summary updates
    cy.get('[data-testid="material-summary-text"]').should(
      "have.text",
      "Metall"
    );
  });

  it("includes color picker integration", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationPanel />
      </PylonConfigurationProvider>
    );

    // Check that color picker is present
    cy.get('[data-testid="color-picker"]').should("exist");
    cy.get('[data-testid="color-picker-title"]').should("contain", "Farbe");

    // Check initial color display in summary
    cy.get('[data-testid="color-summary"]').should("exist");
    cy.get('[data-testid="color-summary-text"]').should("contain", "#87CEEB");
  });
});
