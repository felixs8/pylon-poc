import PylonViewer from "../../app/components/PylonViewer";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("PylonViewer with Configuration", () => {
  it("renders 3D viewer with dimension controls", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <PylonViewer />
      </PylonConfigurationProvider>
    );

    // Test that both the 3D canvas and controls render
    cy.get("canvas").should("exist");
    cy.get('[data-testid="dimension-controls-title"]').should(
      "have.text",
      "Pylon Dimensions"
    );
  });
});
