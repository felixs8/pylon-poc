import React from "react";
import ConfigurationSummary from "../../app/components/ConfigurationSummary";
import {
  PylonConfigurationProvider,
  usePylonConfiguration,
} from "../../app/contexts/PylonConfigurationContext";

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

    // Check color is displayed
    cy.get('[data-testid="color-summary"]').should("exist");
    cy.get('[data-testid="color-summary-text"]').should("have.text", "#87CEEB");
    cy.get('[data-testid="color-summary-swatch"]').should(
      "have.css",
      "background-color",
      "rgb(135, 206, 235)"
    );

    // Check image status is displayed (default: no image)
    cy.get('[data-testid="image-summary-text"]').should(
      "have.text",
      "Kein Bild"
    );
  });

  it("updates when configuration changes", () => {
    // Test wrapper to simulate configuration changes
    const TestWrapper = () => {
      const { setHeight, setMaterial, setColor, setImage } =
        usePylonConfiguration();

      return (
        <div>
          <button data-cy="set-height" onClick={() => setHeight(4.5)}>
            Set Height 4.5
          </button>
          <button data-cy="set-material" onClick={() => setMaterial("metal")}>
            Set Material Metal
          </button>
          <button data-cy="set-color" onClick={() => setColor("#FF5733")}>
            Set Color Red
          </button>
          <button
            data-cy="set-image"
            onClick={() => setImage({ isUploaded: true, filename: "test.jpg" })}
          >
            Set Image
          </button>
          <ConfigurationSummary />
        </div>
      );
    };

    cy.mount(
      <PylonConfigurationProvider>
        <TestWrapper />
      </PylonConfigurationProvider>
    );

    // Check initial values
    cy.contains("3,0m × 1,0m × 0,5m").should("be.visible");
    cy.contains("Kunststoff").should("be.visible");
    cy.contains("#87CEEB").should("be.visible");
    cy.contains("Kein Bild").should("be.visible");

    // Click to change height
    cy.get('[data-cy="set-height"]').click();
    cy.contains("4,5m × 1,0m × 0,5m").should("be.visible");

    // Click to change material
    cy.get('[data-cy="set-material"]').click();
    cy.contains("Metall").should("be.visible");

    // Click to change color
    cy.get('[data-cy="set-color"]').click();
    cy.contains("#FF5733").should("be.visible");
    cy.get('[data-testid="color-summary-swatch"]').should(
      "have.css",
      "background-color",
      "rgb(255, 87, 51)"
    );

    // Click to set image
    cy.get('[data-cy="set-image"]').click();
    cy.contains("Bild hochgeladen").should("be.visible");
  });
});
