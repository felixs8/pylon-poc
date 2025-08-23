describe("3D Pylon Visualization", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays 3D canvas on main page", () => {
    // AC1: 3D canvas is rendered on the main page
    cy.get("canvas").should("exist");

    // Test canvas is visible and has proper dimensions
    cy.get("canvas").should("be.visible");
    cy.get("canvas").invoke("height").should("be.greaterThan", 500);
    cy.get("canvas").invoke("width").should("be.greaterThan", 500);
  });

  it("renders without JavaScript errors", () => {
    // AC1: Scene renders without errors
    cy.window().then(() => {
      // Check that no unhandled JavaScript errors occurred
      cy.on("window:error", (error) => {
        throw new Error(`JavaScript error occurred: ${error.message}`);
      });
    });

    // Page should load successfully
    cy.contains("Pylon Configurator POC").should("be.visible");
  });

  it("WebGL context is successfully created", () => {
    // AC1: Test that WebGL context is successfully created
    cy.get("canvas").then(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement;
      const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
      expect(gl).to.not.be.null;
    });
  });

  it("page loads within performance requirements", () => {
    // AC5: Initial scene load completes within 3 seconds
    cy.visit("/");
    cy.get("canvas", { timeout: 3000 }).should("be.visible");
  });

  it("displays page title and description", () => {
    cy.contains("Pylon Configurator POC").should("be.visible");
    cy.contains("3D Visualization of Advertising Pylons").should("be.visible");
  });
});
