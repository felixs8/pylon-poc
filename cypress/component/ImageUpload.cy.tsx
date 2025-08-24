import React from "react";
import ImageUpload from "../../app/components/ImageUpload";
import { PylonConfigurationProvider } from "../../app/contexts/PylonConfigurationContext";

describe("ImageUpload Component", () => {
  beforeEach(() => {
    // Mount the ImageUpload component with Context provider
    cy.mount(
      <PylonConfigurationProvider>
        <ImageUpload />
      </PylonConfigurationProvider>
    );
  });

  it("renders image upload component with German title", () => {
    cy.get('[data-testid="image-upload"]').should("exist");
    cy.get('[data-testid="image-upload-label"]')
      .should("exist")
      .and("contain", "Bild");
  });

  it("renders file input with correct attributes", () => {
    cy.get('[data-testid="image-file-input"]')
      .should("exist")
      .and("have.attr", "accept", ".jpg,.jpeg,image/jpeg")
      .and("have.attr", "type", "file");
  });

  it("does not show filename or remove button initially", () => {
    cy.get('[data-testid="image-filename"]').should("not.exist");
    cy.get('[data-testid="image-remove-button"]').should("not.exist");
  });

  it("shows error message for invalid file type", () => {
    // Create a mock file with invalid type
    const invalidFile = new File(["content"], "test.txt", {
      type: "text/plain",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(invalidFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get('[data-testid="image-upload-error"]')
      .should("exist")
      .and("contain", "Nur JPG Dateien erlaubt.");
  });

  it("shows error message for file too large", () => {
    // Create a mock file that's too large (over 10MB)
    const largeFile = new File(
      [new ArrayBuffer(11 * 1024 * 1024)],
      "large.jpg",
      { type: "image/jpeg" }
    );

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(largeFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get('[data-testid="image-upload-error"]')
      .should("exist")
      .and("contain", "Datei zu groß. Maximum 10MB erlaubt.");
  });

  it("clears error message when valid file is selected", () => {
    // First show an error
    const invalidFile = new File(["content"], "test.txt", {
      type: "text/plain",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(invalidFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get('[data-testid="image-upload-error"]').should("exist");

    // Then select a valid file
    const validFile = new File(["image content"], "test.jpg", {
      type: "image/jpeg",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(validFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Error should be cleared (modal would open but we can't test that easily)
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });

  it("validates JPEG files correctly", () => {
    const jpegFile = new File(["jpeg content"], "test.jpeg", {
      type: "image/jpeg",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpegFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Should not show error for valid JPEG
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });

  it("validates JPG files correctly", () => {
    const jpgFile = new File(["jpg content"], "test.jpg", {
      type: "image/jpeg",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(jpgFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Should not show error for valid JPG
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });
});
