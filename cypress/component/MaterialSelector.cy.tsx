import MaterialSelector from "../../app/components/MaterialSelector";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("MaterialSelector Component", () => {
  // Helper function to mount MaterialSelector with Context provider
  const mountMaterialSelector = () => {
    cy.mount(
      <PylonConfigurationProvider>
        <MaterialSelector />
      </PylonConfigurationProvider>
    );
  };

  it("renders with all three material options", () => {
    mountMaterialSelector();

    // Check that the component renders
    cy.get('[data-testid="material-selector"]').should("exist");

    // Check label
    cy.get('[data-testid="material-selector-label"]').should(
      "have.text",
      "Material"
    );

    // Check all three material options are present
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

    // Check all radio buttons are present
    cy.get('[data-testid="material-metal-radio"]').should("exist");
    cy.get('[data-testid="material-plastic-radio"]').should("exist");
    cy.get('[data-testid="material-composite-radio"]').should("exist");
  });

  it("defaults to plastic material", () => {
    mountMaterialSelector();

    // Check default selection is plastic (Kunststoff)
    cy.get('[data-testid="material-plastic-radio"]').should("be.checked");
    cy.get('[data-testid="material-metal-radio"]').should("not.be.checked");
    cy.get('[data-testid="material-composite-radio"]').should("not.be.checked");

    // Check display shows current selection
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Kunststoff"
    );
  });

  it("allows selection of different materials", () => {
    mountMaterialSelector();

    // Select metal
    cy.get('[data-testid="material-metal-radio"]').click();
    cy.get('[data-testid="material-metal-radio"]').should("be.checked");
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Metall"
    );

    // Select composite
    cy.get('[data-testid="material-composite-radio"]').click();
    cy.get('[data-testid="material-composite-radio"]').should("be.checked");
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Verbundwerkstoff"
    );

    // Select plastic again
    cy.get('[data-testid="material-plastic-radio"]').click();
    cy.get('[data-testid="material-plastic-radio"]').should("be.checked");
    cy.get('[data-testid="material-selector-display"]').should(
      "have.text",
      "Kunststoff"
    );
  });

  it("maintains accessibility with proper labels and focus management", () => {
    mountMaterialSelector();

    // Check radio buttons have proper name attribute for grouping
    cy.get('[data-testid="material-metal-radio"]').should(
      "have.attr",
      "name",
      "material"
    );
    cy.get('[data-testid="material-plastic-radio"]').should(
      "have.attr",
      "name",
      "material"
    );
    cy.get('[data-testid="material-composite-radio"]').should(
      "have.attr",
      "name",
      "material"
    );

    // Test keyboard navigation
    cy.get('[data-testid="material-metal-radio"]').focus();
    cy.focused().should("have.attr", "data-testid", "material-metal-radio");
  });
});
