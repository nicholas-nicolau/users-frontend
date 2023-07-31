/// <reference types="cypress"/>

describe("Changing Users table size", { testIsolation: false }, () => {
  before(() => {
    cy.visit("/users");
  });

  [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].forEach((e, i) => {
    context(`when selecting ${e} registers`, { testIsolation: false }, () => {
      before(() => {
        cy.get("[data-cy=register-size-select]").select(i);
        cy.wait(1000);
      });

      it(`displays only ${e} registers`, () => {
        cy.get("tr > :nth-child(1)").should("have.length", e + 1);
      });
    });
  });
});
