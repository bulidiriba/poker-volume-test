
describe(
    "Five Card Draw Player "+Cypress.env('email'), 
    function () {
    it('login',() => {
        cy.log("changing view port")
        cy.viewport(1080, 920);
        cy.log("logging in user: "+Cypress.env("email"))
        cy.visit("/login");
        cy.screenshot(Cypress.env("email")+"-visit")
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.screenshot(Cypress.env("email")+"-login")
        cy.log("checking /gamestart URL")
        cy.url().should('include', '/gamestart');
        cy.screenshot(Cypress.env("email")+"-gamestart-checking")
        // cy.visit("/admin/login");
        // cy.admin('admin', 'testtecst');
        // // Wait 10 Seconds
        // cy.wait(10000);
        // cy.visit("/admin");
        // cy.contains(Cypress.env('game-name')).parent().find("th:first-child")
        //     .click({ multiple: true });
        // cy.contains("Launch")
        //     .click();

    });

    it('Start Game', ()=> {
        cy.log("Visit Lobby")
        cy.visit("/lobby");
        cy.screenshot(Cypress.env("email")+"-visit-lobby")
        cy.wait(5000);
        cy.log("get game name from environment")
        cy.contains(Cypress.env('game-name'))
            .click();
        cy.screenshot(Cypress.env("email")+"-click-game-name")
        cy.wait(5000);
        cy.log("Click Join button")
        cy.contains("Join").click()
        cy.screenshot(Cypress.env("email")+"-click-join")
        cy.log("Click confirm button")
        cy.contains("Confirm").click()
        cy.screenshot(Cypress.env("email")+"-click-confirm")
        // cy.get('#loading-text').then($a => {
        //     cy.wait(30000)
        // });


        // cy.log("Checking for the Loading spinner")
        // let w = true
        // while(w){
        //     if(cy.find('#loading-text')) {
        //         cy.log("Loading....")
        //         w = true
        //     } else {
        //         cy.log("Loading done")
        //         w = false
        //     }
        // }


        // let wait = true;
        // while(wait){
        //     if(cy.contains("All In")){
        //         cy.contains("All In").then((x) => {
        //             if(x.is("enabled")){
        //                 x.click();
        //                 wait = false
        //             } else {
        //                 wait = true
        //             }
        //         });
        //     } else {
        //         wait = false;
        //     }
        // }

        cy.log("waiting for other game to join")
        cy.screenshot(Cypress.env("email")+"-waiting-for-others")
        cy.wait(30000)                
        cy.log("Check if All In button is disabled or not(means if its users turn or not)")
        cy.contains("All In").then((x) => {
            if(x.is("enabled")){
                cy.log("Yes its user's turn")
                cy.screenshot(Cypress.env("email")+"-all-in-enabled")
                cy.log("Click the All in button")
                x.click();
            } else {
                cy.log("No its not user's turn")
                cy.log("Waiting for 31 seconds until the ALL in button gets enabled")
                cy.screenshot(Cypress.env("email")+"-all-in-disabled")
                cy.wait(31000);
                cy.log("Click the All in button")
                x.click();
            }
        });

        // Wait 10 Seconds
        cy.log("Wait for 10 seconds")
        cy.wait(10000);

        cy.log("check if game ends, by Tournament Result text")
        cy.contains('Tournament Results');
        cy.screenshot(Cypress.env("email")+"-tournament-result")
    });

});