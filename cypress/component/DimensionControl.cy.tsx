import DimensionControl from "../../app/components/DimensionControl";

describe("DimensionControl Component", () => {
  // Generic error message function for tests
  const getRangeErrorMessage = (min: number, max: number) =>
    `Wert muss zwischen ${min.toFixed(1).replace(".", ",")}m und ${max.toFixed(1).replace(".", ",")}m liegen`;

  it("renders correctly with all elements", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Höhe"
        value={3.0}
        min={1.0}
        max={8.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        getRangeErrorMessage={getRangeErrorMessage}
        testId="height-control"
      />
    );

    // Check label
    cy.get('[data-testid="height-control-label"]').should("have.text", "Höhe");

    // Check display value (German formatting with comma)
    cy.get('[data-testid="height-control-display"]').should(
      "have.text",
      "3,0m"
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
        getRangeErrorMessage={getRangeErrorMessage}
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
        label="Tiefe"
        value={0.5}
        min={0.1}
        max={1.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        getRangeErrorMessage={getRangeErrorMessage}
        testId="depth-control"
      />
    );

    // Enter invalid value (above max)
    cy.get('[data-testid="depth-control-input"]').clear().type("1.5");

    // Check error message appears - German format with comma decimal
    cy.get('[data-testid="depth-control-error"]').should(
      "have.text",
      "Wert muss zwischen 0,1m und 1,0m liegen"
    );
  });

  it("resets invalid input on blur", () => {
    const mockOnChange = cy.stub();

    cy.mount(
      <DimensionControl
        label="Höhe"
        value={3.0}
        min={1.0}
        max={8.0}
        step={0.1}
        unit="m"
        onChange={mockOnChange}
        getRangeErrorMessage={getRangeErrorMessage}
        testId="height-control"
      />
    );

    // Enter invalid value
    cy.get('[data-testid="height-control-input"]').clear().type("10");
    cy.get('[data-testid="height-control-input"]').blur();

    // Wait for state update
    cy.wait(100);

    // Input should reset to original value with German formatting (comma)
    cy.get('[data-testid="height-control-input"]').should("have.value", "3,0");

    // Error should clear
    cy.get('[data-testid="height-control-error"]').should("not.exist");
  });
});
