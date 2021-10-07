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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
    cy.get('#email')
        .clear()
        .type(email)
        .should('have.value', email) //enter username

    cy.get('#password')
        .clear()
        .type(password)
        .should('have.value', password) //enter password
  
    cy.contains("Sign In").click(); // click on the text "Sign In" on the page
});

Cypress.Commands.add("admin", (email, password) => {
    cy.get('#email')
        .clear()
        .type(email)
        .should('have.value', email) //enter username

    cy.get('#password')
        .clear()
        .type(password)
        .should('have.value', password) //enter password
  
    cy.contains("Sign In").click(); // click on the text "Sign In" on the page
});

Cypress.Commands.add("enterAccInfo", (firstname, lastname, username, email, password, confrimPassword, user_rewards_id, phone) => {
    //cy.get('#firstName').clear().type(firstname).should('have.value', firstname);
    //cy.get("#lastName").clear().type(lastname).should('have.value', lastname);
    cy.get("#username").clear().type(username).should('have.value', username);
    cy.get("#email").clear().type(email).should('have.value', email);
    //cy.get("#password").clear().type(password).should('have.value', password);
    //cy.get("#confrimPassword").clear().type(confrimPassword).should('have.value', confrimPassword);
    //cy.get("#user_rewards_id").clear().type(user_rewards_id).should('have.value', user_rewards_id);
    cy.get("#phone").clear().type(phone).should('have.value', phone);

});

Cypress.Commands.add("enterAgeVerification", (ssn, dateOfBirth, state, city, zip, address, driverLicenseNum, driverLicenseState) => {
    cy.get('#ssn').clear().type(ssn).should('have.value', ssn);
    //cy.get("#dateOfBirth").clear().type(dateOfBirth).should('have.value', dateOfBirth);
    //cy.get("#country-select-demo").clear().type(state).should('have.value', state);
    //cy.get("#city").clear().type(city).should('have.value', city);
    //cy.get("#zip").clear().type(zip).should('have.value', zip);
    //cy.get("#address").clear().type(address).should('have.value', address);
    //cy.get("#idNumber").clear().type(driverLicenseNum).should('have.value', driverLicenseNum);
    //cy.get("#country-select-demo").clear().type(driverLicenseState).should('have.value', driverLicenseState);
    
});

Cypress.Commands.add("signup", (question1, answer1, question2, answer2) => {
    //cy.get('#question1').clear().type(question1).should('have.value', question1);
    //cy.get("#answer1").clear().type(answer1).should('have.value', answer1);
    //cy.get("#question2").clear().type(question2).should('have.value', question2);
    //cy.get("#answer2").clear().type(answer2).should('have.value', answer2);

    cy.get('[type="checkbox"]').check()
        
});

Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => {}) => {
    // For more info on targeting inside iframes refer to this GitHub issue:
    // https://github.com/cypress-io/cypress/issues/136
    cy.log('Getting iframe body')

    return cy
        .wrap($iframe)
        .should(iframe => expect(iframe.contents().find('body')).to.exist)
        .then(iframe => cy.wrap(iframe.contents().find('body')))
        .within({}, callback)
});