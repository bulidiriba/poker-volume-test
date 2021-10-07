import { URL } from '../../helpers/constants';

describe("Cancel Tournament Player #2", ()=> {

    before(() => {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test7', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);

        cy.contains("Five Card Draw 2P").parent().find("th:first-child")
            .click({ multiple: true });
        
        cy.contains("Launch")
            .click();
    });

    it('Should stop game when tournament is cancelled', ()=> {
        cy.visit(`${URL}/lobby`);
        cy.contains("Five Card Draw 2P")
            .parent()
            .contains("Join")
            .click();

        cy.contains("Confirm").click();

        cy.contains("Tournament Cancelled").click();
        cy.contains("Close").click();
        cy.url().should('include', '/lobby');
    });

});