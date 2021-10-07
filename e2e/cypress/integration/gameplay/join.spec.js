import { email, password, game_name } from '../../helpers/constants';

describe("Login and Join Tournament Test", ()=> {

    it("login and joins a tournament", ()=> {
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

        cy.log("get the tournament: "+game_name);
        cy.contains(game_name).click();
        cy.screenshot("/get-template/"+email+"-"+game_name+"-clicked")

        cy.wait(1000)
        cy.log("Click Join button")
        cy.contains("Join").click()
        cy.screenshot("/click-join/"+email+"-join-clicked")
        
        cy.wait(1000)
        cy.log("Click confirm button")
        cy.contains("Confirm").click()
        cy.screenshot("/click-confirm/"+email+"-confirm-clicked")

        cy.log("waiting for a while")
        cy.wait(3000)
        cy.log("check weather its joinging the game or not")
        cy.screenshot("/join-game/"+email+"-joining-game");
    });
});