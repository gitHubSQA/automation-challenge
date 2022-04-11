const { Section1 } = require('../objects/section-1')
import registration from '../fixtures/registration.json'

describe('Problem 1', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.clickNavigationBar('Section 1')
    cy.fixture('registration').as('registration');
  })

  afterEach(() => {
    cy.sessionCleanUp()
  })

  it('DOM: Tables', () => {
    Section1.actions.executeTestDOMTables(60, 'user')
  })

  it('DOM: Forms', () => {
    Section1.actions.executeTestDOMForm(registration)
  })

})