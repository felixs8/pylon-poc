import DimensionControl from "../../app/components/DimensionControl";

describe("DimensionControl Component", () => {
  it("renders correctly with all elements", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Height"
        value={3.0}
        min={1.0}
        max={8.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        testId="height-control"
      />
    );

    // Check label
    cy.get('[data-testid="height-control-label"]').should(
      "have.text",
      "Height"
    );

    // Check display value
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "3.0m"
    );

    // Check range markers - they should show min and max with unit
    cy.get('[data-testid="height-control-min-marker"]').should(
      "have.text",
      "1m"
    );
    cy.get('[data-testid="height-control-max-marker"]').should(
      "have.text",
      "8m"
    );
  });

  it("allows input through numeric field", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Width"
        value={1.0}
        min={0.5}
        max={3.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        testId="width-control"
      />
    );

    // Change value via numeric input
    cy.get('[data-testid="width-control-input"]').clear().type("2.5");
    cy.get('[data-testid="width-control-input"]').blur();

    // Verify onChange was called
    cy.then(() => {
      expect(mockOnChange).to.have.been.calledWith(2.5);
    });
  });

  it("validates input ranges and shows error", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Depth"
        value={0.5}
        min={0.1}
        max={1.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        testId="depth-control"
      />
    );

    // Enter invalid value (above max)
    cy.get('[data-testid="depth-control-input"]').clear().type("1.5");

    // Check error message appears - the format matches what's in the component
    cy.get('[data-testid="depth-control-error"]').should(
      "have.text",
      "Value must be between 0.1m and 1m"
    );
  });

  it("resets invalid input on blur", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Height"
        value={3.0}
        min={1.0}
        max={8.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        testId="height-control"
      />
    );

    // Enter invalid value
    cy.get('[data-testid="height-control-input"]').clear().type("10");
    cy.get('[data-testid="height-control-input"]').blur();

    // Input should reset to original value
    cy.get('[data-testid="height-control-input"]').should("have.value", "3");

    // Error should clear
    cy.get('[data-testid="height-control-error"]').should("not.exist");
  });
});
