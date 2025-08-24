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

  it("renders color picker component with German title", () => {
    cy.get('[data-testid="color-picker"]').should("exist");
    cy.get('[data-testid="color-picker-title"]')
      .should("exist")
      .and("contain", "Farbe");
  });

  it("renders compact color picker button with German label", () => {
    cy.get('[data-testid="color-picker-button"]').should("exist");
    cy.contains("Farbe auswählen").should("exist");
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
    cy.get(".react-colorful").should("exist");
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

  it("syncs color picker and hex input field", () => {
    // Open modal
    cy.get('[data-testid="color-picker-button"]').click();

    // Change hex input
    cy.get('[data-testid="hex-input"]').clear().type("#FF0000");

    // Check that color preview updates
    cy.get('[data-testid="modal-color-preview"]').should(
      "have.css",
      "background-color",
      "rgb(255, 0, 0)"
    ); // #FF0000 in RGB
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

  it("color picker has correct dimensions in modal", () => {
    // Open modal
    cy.get('[data-testid="color-picker-button"]').click();

    cy.get(".react-colorful").should(($picker) => {
      const picker = $picker[0];
      const styles = window.getComputedStyle(picker);
      expect(styles.width).to.equal("200px");
      expect(styles.height).to.equal("150px");
    });
  });

  it("supports keyboard accessibility", () => {
    // Check button accessibility
    cy.get('[data-testid="color-picker-button"]')
      .should("have.attr", "aria-label")
      .and("include", "Aktuelle Farbe");

    // Open modal and check color picker accessibility
    cy.get('[data-testid="color-picker-button"]').click();
    cy.get(".react-colorful__saturation").should("be.visible");
    cy.get(".react-colorful__hue").should("be.visible");
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
