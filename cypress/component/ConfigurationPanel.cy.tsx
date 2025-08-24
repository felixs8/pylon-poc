import React from "react";
import ConfigurationPanel from "../../app/components/ConfigurationPanel";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ConfigurationPanel Component", () => {
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
});
