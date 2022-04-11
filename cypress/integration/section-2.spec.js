const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.clickNavigationBar('Section 2')
  })

  afterEach(() => {
    cy.sessionCleanUp();
  })

  it('Http: Waiting for network calls', () => {
    Section2.actions.executeTestNetworkCall()
  })

  it('Browser API: Opening a new tab', () => {
    Section2.actions.executeTestNewTab()
  })

  //Pre-Requisite: Setup downloads folder path (cypress.json => "downloadsFolder": "/Users/Your_User/Downloads/")
  it('Browser API: Downloading a file', () => {
    Section2.actions.executeTestFileDownload('javascript-logo.png')
  })

  //BONUS: Alternate way to validate download using custom commands (cy-verify-downloads)
  it('Browser API: Downloading a file', () => {
    Section2.actions.executeTestFileDownloadAlternate('javascript-logo.png')
  })

})