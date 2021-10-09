 import { email, password, game_name } from "../../helpers/constants";

 describe("Login and Join Any Tournament Test", () => {
     it("login and join any tournament", () => {
        cy.log("changing view port")
        cy.viewport(1080, 920);
        cy.screenshot("/change-view-port/"+email+"-changing-view-port");

        cy.log("visiting the login page of the site")
        cy.visit("/login");
        cy.screenshot("/open-login/"+email+"visit-page");
        
        cy.log("loggin in with user: "+email);
        cy.login(email, password);
        cy.screenshot("/logged-in/"+email+"logging-in")
        
        cy.log("checking if user logged in and gamestart page displayed");
        cy.wait(1000)
        cy.url().should('include', '/gamestart');
        cy.screenshot("/gamestart/"+email+"-gamestart-page");

        cy.log("go to the template lobby");
        cy.visit("/template_lobby");
        cy.screenshot("/template_lobby/"+email+"-go-to-template-lobby");

        cy.log("activate join any");
        cy.contains('Activate Join Any').click();
        cy.screenshot("/activate-join-any/"+email+"-activate-join-any");

        cy.log("get the activated tournament and join");
        cy.wait(2000);
        cy.contains(game_name).click();
        cy.screenshot("/get-activated/"+email+"-get-activated");
        
        cy.log("join the activated")
        cy.contains("Join").click();
        cy.screenshot("/join-any/"+email+"-join-any");
     })
 })