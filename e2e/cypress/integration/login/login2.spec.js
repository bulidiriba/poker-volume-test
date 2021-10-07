import { email, password} from '../../helpers/constants';

describe("Login Test", ()=> {
    it('Login should FAIL if incorrect credentials provided', ()=> {
        cy.log("changing view port")
        cy.viewport(1080, 920);

        cy.log("visiting the login page of the site")
        cy.visit('/login');
        cy.screenshot(email+"login-page-for-failing");
        
        cy.log("loggin in with user: ", email);
        cy.login("nouser", "nouser");
        cy.screenshot(email+"error-page-for-failing")

        cy.log("checking if its displaying invalid credentials");
        cy.contains("Invalid Credentials");
        cy.screenshot("invalid-credentials");
        
    });

});