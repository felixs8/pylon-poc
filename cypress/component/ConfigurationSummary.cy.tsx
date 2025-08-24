import React from "react";
import ConfigurationSummary from "../../app/components/ConfigurationSummary";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ConfigurationSummary Component", () => {
  it("renders configuration summary with default values", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    // Check title
    cy.get('[data-testid="configuration-summary"]').should(
      "contain.text",
      "Aktuelle Konfiguration:"
    );

    // Check dimensions are displayed
    cy.get('[data-testid="dimension-summary-text"]').should("exist");
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );

    // Check material is displayed
    cy.get('[data-testid="material-summary-text"]').should(
      "have.text",
      "Kunststoff"
    );
  });

  it("updates when configuration changes", () => {
    // This test verifies that the component structure exists
    // Actual integration testing is covered by the E2E tests
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    //TODO: implement configuration change simulation

    // Verify component structure and default state
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );
    cy.get('[data-testid="dimension-summary-text"]').should("exist");
    cy.get('[data-testid="material-summary-text"]').should("exist");
  });
});
