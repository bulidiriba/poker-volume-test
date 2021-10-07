import {URL} from '../../helpers/constants';

describe("Login and Launch Tournament Test", ()=> {

    it('logs in and launches a tournament', ()=> {
        cy.viewport(1080, 920); // set width and height of screen
        cy.visit(`${URL}/login`); // visit this page
        cy.login('test9', 'user.password');
        cy.url().should('include', '/gamestart');//url should contain gamestart
    
        cy.visit(`${URL}/admin`); // visit this page

        cy.get(':nth-child(2) > th.MuiTableCell-root').click(); //click on checkbox for the second tournament template
        cy.contains("Launch").click(); // click on launch button
    
        cy.contains("tournament is launched Successfully")

    });
});