describe("Material Selection Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays material selector in the configuration panel", () => {
    // Check that material selector is present
    cy.get('[data-testid="material-selector"]').should("exist");
  });

  it("shows plastic as default material selection", () => {
    // Default material should be plastic
    cy.get('[data-testid="material-plastic-radio"]').should("be.checked");

    // Summary should show plastic material
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Kunststoff"
    );
  });

  it("allows changing material selection and updates summary", () => {
    // Change to metal
    cy.get('[data-testid="material-metal-radio"]').click();
    cy.get('[data-testid="material-metal-radio"]').should("be.checked");

    // Summary should update to show metal
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Metall"
    );

    // Change to composite
    cy.get('[data-testid="material-composite-radio"]').click();
    cy.get('[data-testid="material-composite-radio"]').should("be.checked");

    // Summary should update to show composite
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Verbundwerkstoff"
    );
  });

  it("displays all three material options with German labels", () => {
    // Check all material options are present with correct German labels
    cy.get('[data-testid="material-metal-label"]').should(
      "have.text",
      "Metall"
    );
    cy.get('[data-testid="material-plastic-label"]').should(
      "have.text",
      "Kunststoff"
    );
    cy.get('[data-testid="material-composite-label"]').should(
      "have.text",
      "Verbundwerkstoff"
    );
  });

  it("integrates material selection with existing dimension controls", () => {
    // Verify material selector appears alongside existing controls
    cy.get('[data-testid="depth-control-slider"]').should("exist");
    cy.get('[data-testid="width-control-slider"]').should("exist");
    cy.get('[data-testid="height-control-slider"]').should("exist");
    cy.get('[data-testid="material-selector"]').should("exist");

    // Change some dimensions and material, verify both are reflected in summary
    cy.get('[data-testid="height-control-slider"]')
      .invoke("val", 3)
      .trigger("input");
    cy.get('[data-testid="material-composite-radio"]').click();

    // Both dimension and material should be reflected
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "3,0m"
    );
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Verbundwerkstoff"
    );
  });

  it("maintains material selection when dimensions change", () => {
    // Select a material
    cy.get('[data-testid="material-metal-radio"]').click();

    // Change dimensions
    cy.get('[data-testid="width-control-slider"]')
      .invoke("val", 2)
      .trigger("input");
    cy.get('[data-testid="height-control-slider"]')
      .invoke("val", 4)
      .trigger("input");

    // Material selection should persist
    cy.get('[data-testid="material-metal-radio"]').should("be.checked");
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Metall"
    );
  });

  it("handles rapid material selection changes correctly", () => {
    // Rapidly switch between materials
    cy.get('[data-testid="material-metal-radio"]').click();
    cy.get('[data-testid="material-composite-radio"]').click();
    cy.get('[data-testid="material-plastic-radio"]').click();
    cy.get('[data-testid="material-metal-radio"]').click();

    // Final state should be metal
    cy.get('[data-testid="material-metal-radio"]').should("be.checked");
    cy.get('[data-testid="material-summary-text"]').should(
      "contain.text",
      "Metall"
    );
  });
});
