import PylonViewer from "../../app/components/PylonViewer";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("PylonViewer Component", () => {
  it("renders 3D canvas without errors", () => {
    cy.mount(
      <PylonConfigurationProvider>
        <PylonViewer />
      </PylonConfigurationProvider>
    );

    // Test that the canvas element is present
    cy.get("canvas").should("exist").and("be.visible");
  });
});
