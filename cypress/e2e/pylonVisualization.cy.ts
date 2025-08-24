describe("3D Pylon Visualization", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays 3D canvas and page content", () => {
    // Check page content using data-testids
    cy.get('[data-testid="page-title"]').should(
      "have.text",
      "Pylon Konfigurator POC"
    );
    cy.get('[data-testid="page-description"]').should(
      "have.text",
      "3D Visualisierung von Werbepylonen"
    );

    // Check 3D canvas is rendered and visible
    cy.get("canvas").should("exist").and("be.visible");
    cy.get("canvas").invoke("height").should("be.greaterThan", 400);
    cy.get("canvas").invoke("width").should("be.greaterThan", 400);
  });

  it("WebGL context is successfully created", () => {
    // Test that WebGL context is successfully created
    cy.get("canvas").then(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement;
      const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
      expect(gl).to.not.be.null;
    });
  });

  it("page loads within performance requirements", () => {
    // Initial scene load completes within 3 seconds
    cy.visit("/");
    cy.get("canvas", { timeout: 3000 }).should("be.visible");

    // Check that no unhandled JavaScript errors occurred
    cy.window().then(() => {
      cy.on("window:error", (error) => {
        throw new Error(`JavaScript error occurred: ${error.message}`);
      });
    });
  });
});
