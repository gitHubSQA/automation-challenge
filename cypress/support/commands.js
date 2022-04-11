// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require('cy-verify-downloads').addCustomCommand()

Cypress.Commands.add('sessionCleanUp', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.Commands.add('clickNavigationBar', (navBarBrand) => {
    cy.get('a').contains(navBarBrand).click()
})

Cypress.Commands.add('alertMessageIntercept', (element, alertMessage, implicitWait) => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get(element).should('be.visible').click().then(() => {
        cy.wait(implicitWait)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(alertMessage)
            })
    })
})