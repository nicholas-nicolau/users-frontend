/// <reference types="cypress"/>

export function structureTest(structure) {
  structure.forEach((subStructure) => {
    before(() => {
      cy.clearAllSessionStorage();
      cy.clearLocalStorage();
      cy.clearAllCookies();
    });

    context(subStructure.context, { testIsolation: false }, () => {
      subStructure.elements.forEach((element) => {
        if ("before" in element && typeof element["before"] === "function") {
          before(() => {
            element.before();
          });
        }

        element.assertions.forEach((assertion, index) => {
          it(element.message[index], () => {
            if (typeof assertion === "object") {
              cy.get(element.selector).should(
                assertion.operator,
                assertion.value
              );
            } else {
              cy.get(element.selector).should(assertion);
            }
          });
        });

        if ("after" in element && typeof element["after"] === "function") {
          after(() => {
            element.after();
          });
        }
      });
    });
  });
}
