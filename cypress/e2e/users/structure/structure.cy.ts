/// <reference types="cypress"/>

import { structureTest } from "../../../support/structureScript";

const userScreenStructure = [
  {
    context: "All elements are visible and enabled on User screen",
    elements: [
      {
        selector: "[data-cy=header-title]",
        assertions: [
          "be.visible",
          { operator: "contain.text", value: "LISTA DE USUÁRIOS" }
        ],
        message: [
          "The title header is visible",
          "The title header has the right text for pt-br"
        ]
      },
      {
        selector: "[data-cy=register-size-select]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The register size input is visible",
          "The register size input is enabled"
        ]
      },
      ...[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((e) => {
        return {
          selector: `[data-cy=register-size-option-${e}]`,
          assertions: [
            "exist",
            "be.enabled",
            { operator: "contain.text", value: `${e}  registros` }
          ],
          message: [
            `The ${e} size option exists`,
            `The ${e} size option is enabled`,
            `The ${e} size option has the right text value`
          ]
        };
      }),
      {
        selector: "[data-cy=add-new-register-button]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The add new register button is visible",
          "The add new register button is enabled"
        ]
      },
      {
        selector: "[data-cy=previous-page-button]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The previous page button is visible",
          "The previous page button is enabled"
        ]
      },
      {
        selector: "[data-cy=next-page-button]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The next page button is visible",
          "The next page button is enabled"
        ]
      },
      {
        selector: "[data-cy=pages-info]",
        assertions: [
          "be.visible",
          { operator: "contain.text", value: "1 / 5" }
        ],
        message: [
          "The pages info span is visible",
          "The pages info span has the right text value"
        ]
      },
      {
        selector: "[data-cy=search-term-input]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The search term input is visible",
          "The search term input is enabled"
        ]
      },
      {
        selector: "[data-cy=footer]",
        assertions: [
          "be.visible",
          {
            operator: "contain.text",
            value: "Mostrando 1 - 10 de um total de 50 registros"
          }
        ],
        message: [
          "The footer is visible",
          "The footer has the right text value"
        ]
      },
      {
        selector: "[data-cy=request-from-api-footer]",
        assertions: [
          "be.visible",
          {
            operator: "contain.text",
            value: "Requisitar dados diretamente da API"
          }
        ],
        message: [
          "The request from api footer is visible",
          "The request from api footer has the right text value"
        ]
      },
      {
        selector: "[data-cy=request-from-api-input]",
        assertions: ["be.visible", "be.enabled"],
        message: [
          "The request from api input is visible",
          "The request from api input enabled"
        ]
      }
    ]
  }
];

describe("users screen", { testIsolation: false }, () => {
  before(() => {
    cy.visit("/users");
  });

  structureTest(userScreenStructure);

  context("Users table", { testIsolation: false }, () => {
    it("has the right text for the headers", () => {
      cy.get("th")
        .should("have.length", 4)
        .then((headers) => {
          expect(headers.eq(0)).to.contain("ID");
          expect(headers.eq(1)).to.contain("Nome");
          expect(headers.eq(2)).to.contain("Idade");
          expect(headers.eq(3)).to.contain("Email");
        });
    });

    it("has the right arrow for column and sort order", () => {
      cy.get("[data-cy=sort-arrow-asc-id").should("be.visible");
    });

    it("sorts the registers properly", () => {
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

    it("displays the edit button for each user", () => {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((e) => {
        cy.get(`[data-cy=table-edit-button-${e}]`).should("be.visible");
        cy.get(`[data-cy=table-edit-button-${e}]`).should("be.enabled");
      });
    });

    it("displays the delete button for each user", () => {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((e) => {
        cy.get(`[data-cy=table-delete-button-${e}]`).should("be.visible");
        cy.get(`[data-cy=table-delete-button-${e}]`).should("be.enabled");
      });
    });
  });
});
