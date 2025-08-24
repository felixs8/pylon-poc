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

  function uploadInvalidFile() {
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
  }

  function uploadValidFile() {
    // Create a mock file with valid type
    const validFile = new File(["content"], "test.jpg", {
      type: "image/jpeg",
    });

    cy.get('[data-testid="image-file-input"]').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(validFile);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  function uploadToBigFile() {
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
  }

  it("renders image upload component", () => {
    cy.get('[data-testid="image-upload"]').should("exist");
    cy.get('[data-testid="image-file-input"]').should("exist");
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
    uploadInvalidFile();

    cy.get('[data-testid="image-upload-error"]')
      .should("exist")
      .and("contain", "Nur JPG Dateien erlaubt.");
  });

  it("shows error message for file too large", () => {
    // Create a mock file that's too large (over 10MB)
    uploadToBigFile();

    cy.get('[data-testid="image-upload-error"]')
      .should("exist")
      .and("contain", "Datei zu groß. Maximum 10MB erlaubt.");
  });

  it("clears error message when valid file is selected", () => {
    uploadInvalidFile();
    cy.get('[data-testid="image-upload-error"]').should("exist");
    uploadValidFile();
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });

  it("validates JPEG files correctly", () => {
    uploadValidFile();
    // Should not show error for valid JPEG
    cy.get('[data-testid="image-upload-error"]').should("not.exist");
  });
});
