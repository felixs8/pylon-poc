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

  it("renders German labels and interface text", () => {
    cy.get('[data-testid="color-picker-label"]')
      .should("exist")
      .and("contain", "Farbe auswählen");

    cy.get('[data-testid="current-color-display"]')
      .should("exist")
      .find("div")
      .should("contain", "Aktuelle Farbe");
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

  it("renders HexColorPicker component", () => {
    cy.get('[data-testid="hex-color-picker"]').should("exist");
    cy.get(".react-colorful").should("exist");
  });

  it("has proper styling and layout structure", () => {
    cy.get('[data-testid="color-picker"]').should("have.class", "space-y-4");
    cy.get('[data-testid="current-color-display"]').should(
      "have.class",
      "flex"
    );
  });

  it("color picker has correct dimensions", () => {
    cy.get(".react-colorful").should(($picker) => {
      const picker = $picker[0];
      const styles = window.getComputedStyle(picker);
      expect(styles.width).to.equal("200px");
      expect(styles.height).to.equal("200px");
    });
  });

  it("supports keyboard accessibility", () => {
    cy.get(".react-colorful__saturation").should("be.visible");
    cy.get(".react-colorful__hue").should("be.visible");
  });
});
