const Section1 = {
  elements: {
    sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    showTableBtn: '[data-test=table-toggle-button]',
    userTable: '[data-test=user-table]',
    userTableHeader: '[data-test=table-header]',
    userTableRecords: '[data-test=user-table] > tbody',
    signupForm: '[data-test=signup-form]',
    showFormBtn: '[data-test=form-toggle-button]',
    inputFullNameTxt: '[data-test=full-name-input]',
    inputAgeTxt: '[data-test=age-input]',
    selectGenderSel: '[data-test=gender-select]',
    isNurseChk: '[data-test=nurse-input]',
    submitFormBtn: '[data-test=submit-btn]',
  },

  actions: {

    executeTestDOMTables(dataAge, dataRole) {
      Section1.actions.assertInitialStateSectionOnePage()
      Section1.actions.clickShowTable()
      Section1.actions.getColumnCount()
      Section1.actions.getRowCount()
      Section1.actions.getUserRecordCount(dataRole)
      Section1.actions.getAgeRecordCount(dataAge)
    },

    executeTestDOMForm(dataGenderType) {
      Section1.actions.fillRegistrationForm(dataGenderType)
      Section1.clickSubmitForm()
    },

    assertInitialStateSectionOnePage() {
      cy.get(Section1.elements.userTable).should('not.be.visible');
      cy.get(Section1.elements.showTableBtn).should('be.visible');
    },

    clickShowTable() {
      cy.get(Section1.elements.showTableBtn).click();
      cy.get(Section1.elements.userTable).should('be.visible');
    },

    getColumnCount() {
      let initialInnerValues = 0
      cy.get(Section1.elements.userTableHeader)
        .find('th')
        .each(($el, $index) => {
          cy.wrap($el, false)
            .then(() => {
              initialInnerValues = $index + 1
            })
        }).then(() => expect(initialInnerValues, 'COLUMN').to.equal(5))
    },

    getRowCount() {
      let initialInnerValues = 0
      cy.get('tbody')
        .find('tr')
        .each(($el, $index) => {
          cy.wrap($el, false)
            .then(() => {
              initialInnerValues = $index
            })
        }).then(() => expect(initialInnerValues, 'ROWS').to.equal(10))
    },

    getUserRecordCount(argRoleType) {
      let initialInnerValues = []
      let selectedInnerValues = []
      cy.get('tbody')
        .find('tr')
        .each(($el, $index) => {
          cy.wrap($el, false)
            .then(() => {
              if ($index !== 0) { initialInnerValues.push($el[0].innerText) }
            })
        }).then(() => initialInnerValues.forEach(function (item) {
          if (item.includes(argRoleType)) {
            selectedInnerValues.push(item)
          }
        })
        ).then(() => assert.isAtLeast(selectedInnerValues.length, 5, argRoleType))
    },

    getAgeRecordCount(argAgeBracket) {
      const d = new Date();
      let year = d.getFullYear();
      let ageBracket = year - argAgeBracket
      let ageList = []
      let datedValues = []
      let initialInnerValues = []
      let selectedInnerValues = []

      cy.get('tbody')
        .find('tr')
        .each(($el, $index) => {
          cy.wrap($el, false)
            .then(() => {
              if ($index !== 0) {
                initialInnerValues.push($el[0].innerText)
              }
            })
        })
        .then(() => initialInnerValues.forEach(item => {
          let idRecordRemoval = item.substring(2)
          selectedInnerValues.push(idRecordRemoval)
        })
        )
        .then(() => selectedInnerValues.forEach(item => {
          let newArr = item.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{2})/g)
          newArr = newArr[0].substr(newArr[0].length - 4);
          datedValues.push(newArr)
        })
        )
        .then(() => datedValues.forEach(item => {
          let myInt = parseInt(item)
          if (myInt < ageBracket) {
            cy.log(`Year Dates of Birth older than ${argAgeBracket} Years Old: ${myInt}`)
            ageList.push(myInt)
          }
        })
        ).then(() => expect(ageList.length, `OLDER THAN ${argAgeBracket}`).to.equal(3))
    },

    fillRegistrationForm(dataRegistration) {
      cy.get(Section1.elements.signupForm).should('not.be.visible')
      cy.get(Section1.elements.showFormBtn).click()
      cy.get(Section1.elements.signupForm).should('be.visible')

      cy.get(Section1.elements.inputFullNameTxt).type(dataRegistration.fullname)
      cy.get(Section1.elements.inputFullNameTxt).invoke('val').should('not.be.empty');

      cy.get(Section1.elements.inputAgeTxt).type(dataRegistration.age)
      cy.get(Section1.elements.inputAgeTxt).invoke('val').should('not.be.empty');

      cy.get(Section1.elements.selectGenderSel).select(dataRegistration.gender)
      cy.get(Section1.elements.selectGenderSel).invoke('val').should('be.equal', dataRegistration.gender);

      cy.get(Section1.elements.isNurseChk).check()
      cy.get(Section1.elements.isNurseChk).should('be.checked')
      cy.get(Section1.elements.isNurseChk).invoke('attr', 'name').should('be.equal', dataRegistration.isNurse)
    },
  },

  clickSubmitForm() {
    cy.alertMessageIntercept(Section1.elements.submitFormBtn, 'Form submitted!', 0)
  }
}

module.exports = { Section1 }
