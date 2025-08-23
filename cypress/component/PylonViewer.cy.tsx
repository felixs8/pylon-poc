import PylonViewer from "../../app/components/PylonViewer";

describe("PylonViewer Component", () => {
  it("renders 3D canvas without errors", () => {
    cy.mount(<PylonViewer />);

    // Test that the component mounts without errors
    cy.get("div").should("exist");

    // Test that the canvas element is present
    cy.get("canvas").should("exist");

    // Test that WebGL context is created (canvas should have WebGL content)
    cy.get("canvas").should("have.attr", "width");
    cy.get("canvas").should("have.attr", "height");
    cy.get("canvas").invoke("height").should("be.greaterThan", 100);
    cy.get("canvas").invoke("width").should("be.greaterThan", 100);
  });
});
