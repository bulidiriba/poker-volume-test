import { email, password } from '../../helpers/constants';

describe("Launch Tournament Test", ()=> {

    it('Should launch tournament template in default mode', ()=> {
        cy.log("changing view port")
        cy.viewport(1080, 920);
        cy.screenshot("/change-view-port/"+email+"-changing-view-port");
        
        cy.log("visiting the login page of the site")
        cy.visit('/login');
        cy.screenshot("/open-login/"+email+"visit-page");

        cy.log("visting admin page");
        cy.visit(`/admin`);

        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > th.MuiTableCell-root')
            .as('launched_template')
            .click();
        
        cy.contains("Launch")
            .click();

        cy.contains("tournament is launched Successfully");
    });

    it('Should launch tournament template in flash mode', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);

        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > th.MuiTableCell-root')
            .as('launched_template')
            .click();

        cy.contains("FLASH")
            .click();
        
        cy.contains("Launch")
            .click();

        cy.contains("tournament is launched Successfully");
    });

    it('Should launch tournament template in single hand mode', ()=> {
        cy.viewport(1080, 920);
        cy.visit(`${URL}/login`);
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');

        cy.visit(`${URL}/admin`);

        cy.get('table > tbody > tr.MuiTableRow-root:nth-child(2) > th.MuiTableCell-root')
            .as('launched_template')
            .click();

        cy.contains("SINGLE HAND")
            .click();
        
        cy.contains("Launch")
            .click();

        cy.contains("tournament is launched Successfully");
    });

});