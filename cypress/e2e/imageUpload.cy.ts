describe("Image Upload Integration", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders image upload section in configuration panel", () => {
    // Check that image upload section exists
    cy.get('[data-testid="image-upload"]', { timeout: 10000 }).should("exist");
    cy.get('[data-testid="image-upload-label"]').should("contain", "Bild");
    cy.get('[data-testid="image-file-input"]').should("exist");
  });

  it("shows proper validation errors for invalid files", () => {
    // Test invalid file type
    cy.get('[data-testid="image-file-input"]').selectFile(
      {
        contents: Cypress.Buffer.from("file contents"),
        fileName: "test.txt",
        mimeType: "text/plain",
      },
      { force: true }
    );

    cy.get('[data-testid="image-upload-error"]')
      .should("exist")
      .and("contain", "Nur JPG und PNG Dateien erlaubt.");
  });

  it("shows file size error for large files", () => {
    // Create a large file that exceeds 10MB by using a string buffer
    const largeContent = "x".repeat(11 * 1024 * 1024); // 11MB of 'x' characters

    cy.get('[data-testid="image-file-input"]').selectFile(
      {
        contents: largeContent,
        fileName: "large.jpg",
        mimeType: "image/jpeg",
      },
      { force: true }
    );

    cy.get('[data-testid="image-upload-error"]', { timeout: 5000 })
      .should("exist")
      .and("contain", "Datei zu groß. Maximum 10MB erlaubt.");
  });

  it("accepts valid image files without showing errors", () => {
    // Create a valid small JPEG
    cy.get('[data-testid="image-file-input"]').selectFile(
      {
        contents: Cypress.Buffer.from("fake image content"),
        fileName: "test.jpg",
        mimeType: "image/jpeg",
      },
      { force: true }
    );

    // Should not show error for valid file
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });

  it("displays image status in configuration summary", () => {
    // Initially should show "Kein Bild"
    cy.get('[data-testid="image-summary-text"]', { timeout: 10000 })
      .should("exist")
      .and("contain", "Kein Bild");
  });

  it("configuration panel includes all expected sections", () => {
    // Verify all sections are present
    cy.get('[data-testid="configuration-panel"]', { timeout: 10000 }).should(
      "exist"
    );

    // Check dimension controls
    cy.get('[data-testid="height-control"]').should("exist");
    cy.get('[data-testid="width-control"]').should("exist");
    cy.get('[data-testid="depth-control"]').should("exist");

    // Check material selector
    cy.get('[data-testid="material-selector"]').should("exist");

    // Check color picker
    cy.get('[data-testid="color-picker"]').should("exist");

    // Check image upload
    cy.get('[data-testid="image-upload"]').should("exist");

    // Check configuration summary
    cy.get('[data-testid="configuration-summary"]').should("exist");
  });

  it("maintains responsiveness with image upload section", () => {
    // Test that the page still loads quickly with all components
    cy.get('[data-testid="configuration-panel"]', { timeout: 5000 }).should(
      "exist"
    );
    cy.get('[data-testid="image-upload"]', { timeout: 1000 }).should("exist");

    // Check that 3D canvas is still working
    cy.get("canvas", { timeout: 5000 }).should("exist");
  });
});
