import "cypress-localstorage-commands"

describe('login page tests', () => {
 it('first time user lands on login page', () => {
    cy.visit('/')
    cy.url().should('include', '/auth/login')
  });
});