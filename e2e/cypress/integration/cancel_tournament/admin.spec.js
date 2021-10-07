import { URL } from '../../helpers/constants';

describe("Cancel Tournament", ()=> {

    it('Launch Template and Cancel', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);

        cy.contains("Five Card Draw 2P").parent().find("th:first-child")
            .click({ multiple: true });
        
        cy.contains("Launch")
            .click();

        // Wait Until Players Join Game
        cy.wait(15000);

        cy.visit(`${URL}/cancel_tournaments`);
        cy.contains("Five Card Draw 2P")
            .parent()
            .contains("Cancel")
            .click();

        cy.contains("Confirmation")
        cy.contains("Yes").click();
    });

});