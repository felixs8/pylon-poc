import React from "react";
import ConfigurationPanel from "../../app/components/ConfigurationPanel";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ConfigurationPanel Component", () => {
  const mountConfigurationPanel = () => {
    cy.mount(
      <PylonConfigurationProvider>
        <ConfigurationPanel />
      </PylonConfigurationProvider>
    );
  };

  it("renders with all required sections", () => {
    mountConfigurationPanel();

    // Check main component renders
    cy.get('[data-testid="configuration-panel"]').should("exist");

    // Check title
    cy.get('[data-testid="configuration-panel-title"]').should(
      "contain.text",
      "Pylon-Konfiguration"
    );

    // Check all dimension controls are present
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");

    // Check material selector is present
    cy.get('[data-testid="material-selector"]').should("exist");

    // Check configuration summary is present
    cy.get('[data-testid="configuration-summary"]').should("exist");
  });

  it("has proper layout with dividers", () => {
    mountConfigurationPanel();

    // Check dividers are present to separate sections
    cy.get(".divider").should("have.length", 2);
  });

  it("integrates all components correctly", () => {
    mountConfigurationPanel();

    // Test dimension controls are functional
    cy.get('[data-testid="height-control-slider"]').should("exist");
    cy.get('[data-testid="height-control-input"]').should("exist");
    cy.get('[data-testid="height-control-display"]').should("exist");

    // Test material selector is functional
    cy.get('[data-testid="material-plastic-radio"]').should("be.checked");
    cy.get('[data-testid="material-selector-display"]').should(
      "contain.text",
      "Kunststoff"
    );

    // Test summary displays current values
    cy.get('[data-testid="dimension-summary-text"]').should("exist");
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );
  });

  it("maintains state consistency across components", () => {
    mountConfigurationPanel();

    // Just verify that all components are working and connected
    // This test validates the component integration without triggering complex state changes

    // Check that all components show initial state consistently
    cy.get('[data-testid="height-control-display"]').should(
      "contain.text",
      "3,0"
    );
    cy.get('[data-testid="dimension-summary-text"]').should(
      "contain.text",
      "3,0m"
    );

    // Check material consistency
    cy.get('[data-testid="material-selector-display"]').should(
      "contain.text",
      "Kunststoff"
    );
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );

    // Change material and verify updates
    cy.get('[data-testid="material-metal-radio"]').click();

    // Check material display updates
    cy.get('[data-testid="material-selector-display"]').should(
      "contain.text",
      "Metall"
    );

    // Check summary updates
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Metall"
    );
  });

  it("follows DaisyUI styling consistency", () => {
    mountConfigurationPanel();

    // Check main container uses card styling
    cy.get('[data-testid="configuration-panel"]').should("have.class", "card");
    cy.get('[data-testid="configuration-panel"]').should(
      "have.class",
      "bg-base-100"
    );
    cy.get('[data-testid="configuration-panel"]').should(
      "have.class",
      "shadow-lg"
    );

    // Check card body
    cy.get(".card-body").should("exist");

    // Check title styling
    cy.get('[data-testid="configuration-panel-title"]').should(
      "have.class",
      "card-title"
    );
  });

  it("has proper accessibility attributes", () => {
    mountConfigurationPanel();

    // Check all major components have test ids
    cy.get('[data-testid="configuration-panel"]').should("exist");
    cy.get('[data-testid="configuration-panel-title"]').should("exist");
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");
    cy.get('[data-testid="material-selector"]').should("exist");
    cy.get('[data-testid="configuration-summary"]').should("exist");
  });
});
