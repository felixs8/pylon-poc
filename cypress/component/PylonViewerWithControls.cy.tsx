import PylonViewer from "../../app/components/PylonViewer";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("PylonViewer with Configuration", () => {
  it("renders 3D viewer with dimension controls", () => {
    cy.viewport(1280, 720); // Use desktop viewport for consistent testing
    cy.mount(
      <PylonConfigurationProvider>
        <PylonViewer />
      </PylonConfigurationProvider>
    );

    // Test that both the 3D canvas and controls render
    cy.get("canvas").should("exist");
    cy.get('[data-testid="configuration-panel-title"]').should("exist");
    cy.get('[data-testid="configuration-panel-title"]').should("contain", "Pylon-Konfiguration");
  });
});
