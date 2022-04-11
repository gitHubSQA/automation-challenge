const Section2 = {

  elements: {
    networkCallBtn: '[data-test=network-call-button]',
    newTabBtn: '[data-test=new-tab-button]',
    newTabByAttributeBtn: 'a[rel="noopener noreferrer"]',
    fileDownloadBtn: '[data-test=file-download-button]',
    startHereTab: 'div[id="utilities"]',
  },

  actions: {

    executeTestNetworkCall() {
      Section2.actions.interceptXHR('/todos/1', 'network-call')
      Section2.actions.clickNetworkCall()
      Section2.actions.validateXHR('@network-call')
    },

    executeTestNewTab() {
      Section2.actions.clickNewTab()
      Section2.actions.validationNewTab()
    },

    executeTestFileDownload(argDownloadFile) {
      let downloadedFile = Cypress.config().downloadsFolder + "/" + argDownloadFile
      Section2.actions.validationFileDownloadButtonAttribute(argDownloadFile)
      Section2.actions.clickFileDownload()
      Section2.actions.validateFileDownload(downloadedFile)
    },

    executeTestFileDownloadAlternate(argDownloadFile) {
      Section2.actions.clickFileDownload()
      cy.verifyDownload(argDownloadFile);
    },

    clickNetworkCall() {
      cy.alertMessageIntercept(Section2.elements.networkCallBtn, 'Abnormally long network call!', Cypress.config().implicitWait)
    },

    interceptXHR(endpointToCapture, checkAlias) {
      cy.intercept({
        pathname: endpointToCapture
      }).as(checkAlias);
    },

    validateXHR(myAlias) {
      cy.wait(myAlias).then((interception) => {
        expect(interception.response.statusCode, 'STATUS').to.eq(200)
        expect(interception.state, 'STATE').to.eq('Complete')
        expect(interception.response.statusMessage, 'STATUS MESSAGE').to.eq('OK')
      })
      cy.get(myAlias).its('response').then((res) => {
        expect(res.body, 'RESPONSE BODY').to.deep.equal({
          id: 1,
          title: "Abnormally long network call!"
        })
      })
    },

    clickNewTab() {
      cy.get(Section2.elements.newTabByAttributeBtn).invoke('removeAttr', 'target').click()
    },

    validationNewTab() {
      cy.url().should('not.include', '/section-2', 'NEW TAB: ')
    },

    validationFileDownloadButtonAttribute(argFileName) {
      cy.get(Section2.elements.fileDownloadBtn).invoke('attr', 'download').should('be.equal', "true")
      cy.get(Section2.elements.fileDownloadBtn).invoke('attr', 'href').should('be.equal', "/assets/img/" + argFileName)
    },

    clickFileDownload() {
      cy.get(Section2.elements.fileDownloadBtn).should('be.visible').click()
    },

    validateFileDownload(downloadFile) {
      cy.readFile(downloadFile, { timeout: 15000 }).then((dataFile) => {
        expect(dataFile, "FILE").to.exist.and.to.include('PNG')
      })
    }
  },
}

module.exports = { Section2 }