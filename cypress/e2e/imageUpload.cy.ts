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
      .and("contain", "Nur JPG Dateien erlaubt.");
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
});
