describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.contains("Pylon Configurator POC");
  });
});
