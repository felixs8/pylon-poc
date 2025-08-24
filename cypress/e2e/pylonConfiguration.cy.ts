describe("Dynamic Pylon Configuration E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display pylon configurator with dimension controls", () => {
    // Check page title and description using data-testids - German localized
    cy.get('[data-testid="page-title"]').should(
      "have.text",
      "Pylon Konfigurator POC"
    );
    cy.get('[data-testid="page-description"]').should(
      "have.text",
      "3D Visualisierung von Werbepylonen"
    );

    // Check that 3D canvas exists
    cy.get("canvas").should("exist").should("be.visible");

    // Check that dimension controls are present using data-testids - German localized
    cy.get('[data-testid="configuration-panel-title"]').should(
      "have.text",
      "Pylon-Konfiguration"
    );
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");

    // Check default values are displayed using data-testids - German format with comma decimal
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 1,0m × 0,5m"
    );
  });

  it("should allow height adjustment via numeric input", () => {
    // Verify initial height using data-testid - German formatting
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "3,0m"
    );

    // Adjust height via numeric input
    cy.get('[data-testid="height-control-input"]').clear().type("6");
    cy.get('[data-testid="height-control-input"]').blur();

    // Verify height updated using data-testids - German formatting
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "6,0m"
    );
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "6,0m × 1,0m × 0,5m"
    );
  });

  it("should allow width adjustment via numeric input", () => {
    // Change width via numeric input using data-testid
    cy.get('[data-testid="width-control-input"]').clear().type("2,5");
    cy.get('[data-testid="width-control-input"]').blur();

    // Verify width updated using data-testids
    cy.get('[data-testid="width-control-display"]').should("have.text", "2,5m");
    cy.get('[data-testid="dimension-summary-text"]').should(
      "have.text",
      "3,0m × 2,5m × 0,5m"
    );
  });

  it("should validate input ranges and show errors", () => {
    // Test height validation (max 8.0m) using data-testids
    cy.get('[data-testid="height-control-input"]').clear().type("10");
    cy.get('[data-testid="height-control-error"]').should(
      "have.text",
      "Wert muss zwischen 1,0m und 8,0m liegen"
    );
    cy.get('[data-testid="height-control-input"]').blur();

    // Test width validation (min 0.3m) using data-testids
    cy.get('[data-testid="width-control-input"]').clear().type("0.1");
    cy.get('[data-testid="width-control-error"]').should(
      "have.text",
      "Wert muss zwischen 0,3m und 3,0m liegen"
    );
    cy.get('[data-testid="width-control-input"]').blur();

    // Test depth validation (max 1.0m) using data-testids
    cy.get('[data-testid="depth-control-input"]').clear().type("2.0");
    cy.get('[data-testid="depth-control-error"]').should(
      "have.text",
      "Wert muss zwischen 0,1m und 1,0m liegen"
    );
    cy.get('[data-testid="depth-control-input"]').blur();
  });

  it("should support keyboard accessibility", () => {
    // Test that controls are focusable with tab using data-testids
    cy.get('[data-testid="height-control-slider"]').focus();
    cy.get('[data-testid="height-control-slider"]').should("be.focused");

    // Test keyboard input on numeric fields using data-testids
    cy.get('[data-testid="height-control-input"]').focus();
    cy.get('[data-testid="height-control-input"]').should("be.focused");
    cy.get('[data-testid="height-control-input"]').type("{selectall}5");
    cy.get('[data-testid="height-control-input"]').blur();
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "5,0m"
    );
  });
});
