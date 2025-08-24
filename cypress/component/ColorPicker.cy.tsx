import React from "react";
import ColorPicker from "../../app/components/ColorPicker";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ColorPicker Component", () => {
  beforeEach(() => {
    // Mount the ColorPicker component with Context provider
    cy.mount(
      <PylonConfigurationProvider>
        <ColorPicker />
      </PylonConfigurationProvider>
    );
  });

  it("renders color picker component", () => {
    cy.get('[data-testid="color-picker"]').should("exist");
    cy.get('[data-testid="color-picker-button"]').should("exist");
  });

  it("displays default color value (#87CEEB)", () => {
    cy.get('[data-testid="color-value"]')
      .should("exist")
      .and("contain", "#87CEEB");
  });

  it("shows color swatch with default color", () => {
    cy.get('[data-testid="color-swatch"]')
      .should("exist")
      .and("have.css", "background-color", "rgb(135, 206, 235)"); // #87CEEB in RGB
  });

  it("opens modal when color button is clicked", () => {
    // Modal should not be visible initially
    cy.get('[data-testid="color-picker-modal"]').should("not.be.visible");

    // Click the color button
    cy.get('[data-testid="color-picker-button"]').click();

    // Modal should now be visible
    cy.get('[data-testid="color-picker-modal"]').should("be.visible");
    cy.get('[data-testid="modal-title"]').should("contain", "Farbe auswählen");
  });

  it("renders HexColorPicker component in modal", () => {
    // Open modal first
    cy.get('[data-testid="color-picker-button"]').click();

    // Check for color picker in modal
    cy.get('[data-testid="hex-color-picker"]').should("exist");
  });

  it("has hex input field in modal", () => {
    // Open modal
    cy.get('[data-testid="color-picker-button"]').click();

    // Check hex input field
    cy.get('[data-testid="hex-input"]')
      .should("exist")
      .and("have.value", "#87CEEB");

    cy.get('[data-testid="hex-input-label"]').should("contain", "Hex-Farbwert");
  });

  it("confirms color selection with OK button", () => {
    // Open modal
    cy.get('[data-testid="color-picker-button"]').click();

    // Change color
    cy.get('[data-testid="hex-input"]').clear().type("#00FF00");

    // Click OK
    cy.get('[data-testid="confirm-button"]').click();

    // Modal should close
    cy.get('[data-testid="color-picker-modal"]').should("not.be.visible");

    // Color should be updated in main view
    cy.get('[data-testid="color-value"]').should("contain", "#00FF00");
    cy.get('[data-testid="color-swatch"]').should(
      "have.css",
      "background-color",
      "rgb(0, 255, 0)"
    ); // #00FF00 in RGB
  });

  it("closes modal with backdrop click", () => {
    // Open modal
    cy.get('[data-testid="color-picker-button"]').click();
    cy.get('[data-testid="color-picker-modal"]').should("be.visible");

    // Click backdrop
    cy.get(".modal-backdrop").click({ force: true });

    // Modal should close
    cy.get('[data-testid="color-picker-modal"]').should("not.be.visible");
  });
});
