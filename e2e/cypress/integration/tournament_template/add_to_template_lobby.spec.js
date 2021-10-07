import { URL } from '../../helpers/constants';

describe("Add Tournament Template to Lobby Test", ()=> {

    it('Should add tournament template in to lobby', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);
        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > td:last-child > div')
            .as('launched_template')
            .click();
        
        cy.contains("Add to Lobby")
            .click();

        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > td:last-child > div')
            .as('launched_template')
            .click();
    });

    it('Should add tournament template into lobby in flash mode', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);
        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > td:last-child > div')
            .as('launched_template')
            .click();

        cy.contains("Flash Mode")
            .click();
        
        cy.contains("Add to Lobby")
            .click();
    });

    it('Should add tournament template into lobby in single hand mode', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);
        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > td:last-child > div')
            .as('launched_template')
            .click();

        cy.contains("Single Hand")
            .click();
        
        cy.contains("Add to Lobby")
            .click();
    });

    afterEach(() => {
        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > td:last-child > div')
            .as('launched_template')
            .click();
    });

});