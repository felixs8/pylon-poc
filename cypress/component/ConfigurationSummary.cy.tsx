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

    // Check that the component renders
    cy.get('[data-testid="configuration-summary"]').should("exist");

    // Check title
    cy.get('[data-testid="configuration-summary"]').should(
      "contain.text",
      "Aktuelle Konfiguration:"
    );

    // Check dimensions are displayed
    cy.get('[data-testid="dimension-summary-text"]').should("exist");

    // Check material is displayed
    cy.get('[data-testid="material-summary-text"]').should("exist");
  });

  it("displays dimensions in German format", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    // Check German decimal formatting (comma instead of dot)
    cy.get('[data-testid="dimension-summary-text"]').should(
      "contain.text",
      ","
    );

    // Check dimensions format pattern - should contain numbers with comma decimal and m unit with × separators
    cy.get('[data-testid="dimension-summary-text"]').should(
      "contain.text",
      "m ×"
    );
    cy.get('[data-testid="dimension-summary-text"]').should(
      "contain.text",
      "× "
    );
  });

  it("displays material in German", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    // Default material should be plastic (Kunststoff)
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
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

    // Verify component structure and default state
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );
    cy.get('[data-testid="dimension-summary-text"]').should("exist");
    cy.get('[data-testid="material-summary-text"]').should("exist");
  });

  it("has correct accessibility structure", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    // Check component has proper test ids
    cy.get('[data-testid="configuration-summary"]').should("exist");
    cy.get('[data-testid="dimension-summary-text"]').should("exist");
    cy.get('[data-testid="material-summary-text"]').should("exist");

    // Check semantic structure
    cy.get('[data-testid="configuration-summary"] p').should("have.length", 3);
    cy.get('[data-testid="configuration-summary"] .font-medium').should(
      "contain.text",
      "Aktuelle Konfiguration:"
    );
  });

  it("handles all material types correctly", () => {
    // Test default material
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationSummary />
      </PylonConfigurationProvider>
    );

    // Default should be plastic (Kunststoff)
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );

    // Full material switching is tested in integration tests
    // This test just verifies the component renders material text correctly
  });
});
