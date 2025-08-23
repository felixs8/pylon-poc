import Home from "@/app/page";

describe("Home.cy.tsx", () => {
  it("loads component", () => {
    cy.mount(<Home />);
    cy.contains("Pylon Configurator POC");
  });
});
