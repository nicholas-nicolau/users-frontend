/// <reference types="cypress"/>

describe("Sorting Users table", { testIsolation: false }, () => {
  before(() => {
    cy.visit("/users");
  });

  context("Sorting by ID asc", { testIsolation: false }, () => {
    it("sorts the registers properly - ID ASC", () => {
      cy.get("tr > :nth-child(1)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("ID");
          expect(cells.eq(1)).to.contain("1");
          expect(cells.eq(2)).to.contain("2");
          expect(cells.eq(3)).to.contain("3");
          expect(cells.eq(4)).to.contain("4");
          expect(cells.eq(5)).to.contain("5");
          expect(cells.eq(6)).to.contain("6");
          expect(cells.eq(7)).to.contain("7");
          expect(cells.eq(8)).to.contain("8");
          expect(cells.eq(9)).to.contain("9");
          expect(cells.eq(10)).to.contain("10");
        });
    });
  });

  context("Sorting by ID desc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-id]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly- ID DESC", () => {
      cy.get("tr > :nth-child(1)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("ID");
          expect(cells.eq(1)).to.contain("50");
          expect(cells.eq(2)).to.contain("49");
          expect(cells.eq(3)).to.contain("48");
          expect(cells.eq(4)).to.contain("47");
          expect(cells.eq(5)).to.contain("46");
          expect(cells.eq(6)).to.contain("45");
          expect(cells.eq(7)).to.contain("44");
          expect(cells.eq(8)).to.contain("43");
          expect(cells.eq(9)).to.contain("42");
          expect(cells.eq(10)).to.contain("41");
        });
    });
  });

  context("Sorting by NAME asc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-name]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - NAME ASC", () => {
      cy.get("tr > :nth-child(2)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Nome");
          expect(cells.eq(1)).to.contain("Abigail Coleman");
          expect(cells.eq(2)).to.contain("Alexander Wright");
          expect(cells.eq(3)).to.contain("Alice Brown");
          expect(cells.eq(4)).to.contain("Amelia Turner");
          expect(cells.eq(5)).to.contain("Anthony Butler");
          expect(cells.eq(6)).to.contain("Aria Reed");
          expect(cells.eq(7)).to.contain("Ava Hall");
          expect(cells.eq(8)).to.contain("Avery Adams");
          expect(cells.eq(9)).to.contain("Benjamin Garcia");
          expect(cells.eq(10)).to.contain("Carter Ross");
        });
    });
  });

  context("Sorting by NAME desc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-name]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - NAME DESC", () => {
      cy.get("tr > :nth-child(2)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Nome");
          expect(cells.eq(1)).to.contain("William King");
          expect(cells.eq(2)).to.contain("Victoria Hughes");
          expect(cells.eq(3)).to.contain("Stella Ward");
          expect(cells.eq(4)).to.contain("Sophia Clark");
          expect(cells.eq(5)).to.contain("Sofia Rivera");
          expect(cells.eq(6)).to.contain("Sebastian Bailey");
          expect(cells.eq(7)).to.contain("Scarlett Cook");
          expect(cells.eq(8)).to.contain("Sarah Wilson");
          expect(cells.eq(9)).to.contain("Samuel Green");
          expect(cells.eq(10)).to.contain("Robert Johnson");
        });
    });
  });

  context("Sorting by AGE asc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-age]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - AGE ASC", () => {
      cy.get("tr > :nth-child(3)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Idade");
          expect(cells.eq(1)).to.contain("25");
          expect(cells.eq(2)).to.contain("25");
          expect(cells.eq(3)).to.contain("25");
          expect(cells.eq(4)).to.contain("26");
          expect(cells.eq(5)).to.contain("26");
          expect(cells.eq(6)).to.contain("26");
          expect(cells.eq(7)).to.contain("26");
          expect(cells.eq(8)).to.contain("27");
          expect(cells.eq(9)).to.contain("27");
          expect(cells.eq(10)).to.contain("27");
        });
    });
  });

  context("Sorting by AGE desc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-age]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - AGE DESC", () => {
      cy.get("tr > :nth-child(3)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Idade");
          expect(cells.eq(1)).to.contain("35");
          expect(cells.eq(2)).to.contain("35");
          expect(cells.eq(3)).to.contain("34");
          expect(cells.eq(4)).to.contain("34");
          expect(cells.eq(5)).to.contain("34");
          expect(cells.eq(6)).to.contain("34");
          expect(cells.eq(7)).to.contain("33");
          expect(cells.eq(8)).to.contain("33");
          expect(cells.eq(9)).to.contain("33");
          expect(cells.eq(10)).to.contain("33");
        });
    });
  });

  context("Sorting by EMAIL asc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-email]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - EMAIL ASC", () => {
      cy.get("tr > :nth-child(4)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Email");
          expect(cells.eq(1)).to.contain("abigailcoleman@example.com");
          expect(cells.eq(2)).to.contain("alexanderwright@example.com");
          expect(cells.eq(3)).to.contain("alicebrown@example.com");
          expect(cells.eq(4)).to.contain("ameliaturner@example.com");
          expect(cells.eq(5)).to.contain("anthonybutler@example.com");
          expect(cells.eq(6)).to.contain("ariareed@example.com");
          expect(cells.eq(7)).to.contain("avahall@example.com");
          expect(cells.eq(8)).to.contain("averyadams@example.com");
          expect(cells.eq(9)).to.contain("benjamingarcia@example.com");
          expect(cells.eq(10)).to.contain("carterross@example.com");
        });
    });
  });

  context("Sorting by EMAIL desc", { testIsolation: false }, () => {
    before(() => {
      cy.get("[data-cy=table-header-email]").click();
      cy.wait(1000);
    });

    it("sorts the registers properly - EMAIL DESC", () => {
      cy.get("tr > :nth-child(4)")
        .should("have.length", 11)
        .then((cells) => {
          expect(cells.eq(0)).to.contain("Email");
          expect(cells.eq(1)).to.contain("williamking@example.com");
          expect(cells.eq(2)).to.contain("victoriahughes@example.com");
          expect(cells.eq(3)).to.contain("stellaward@example.com");
          expect(cells.eq(4)).to.contain("sophiaclark@example.com");
          expect(cells.eq(5)).to.contain("sofiarivera@example.com");
          expect(cells.eq(6)).to.contain("sebastianbailey@example.com");
          expect(cells.eq(7)).to.contain("scarlettcook@example.com");
          expect(cells.eq(8)).to.contain("sarahwilson@example.com");
          expect(cells.eq(9)).to.contain("samuelgreen@example.com");
          expect(cells.eq(10)).to.contain("robertjohnson@example.com");
        });
    });
  });
});
