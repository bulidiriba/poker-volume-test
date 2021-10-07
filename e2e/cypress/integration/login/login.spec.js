import { email, password} from '../../helpers/constants';

describe("Login Test", ()=> {
    it("Login should SUCCEED if correct credentials are provided", () => {
        cy.log("changing view port")
        cy.viewport(1080, 920);
        cy.screenshot("/change-view-port/"+email+"-changing-view-port");

        cy.log("visiting the login page of the site")
        cy.visit('/login');
        cy.screenshot("/open-login/"+email+"visit-page");
        
        cy.log("loggin in with user: "+email);
        cy.login(email, password);
        cy.screenshot("/logged-in/"+email+"successfully-logged-in")

        cy.log("checking if user logged in and gamestart page displayed");
        cy.url().should('include', '/gamestart');
        cy.screenshot("/gamestart/"+email+"-gamestart-page");

    });
});