import { email, password, game_name, test_card_number, test_expiration_date, deposit_amount } from "../../helpers/constants";

describe("Login, deposit through braintree and check deposit table in statements", () => {
    it("login, deposit through braintree and check deposit table in statements", () => {
       cy.log("changing view port")
       cy.viewport(1080, 920);
       cy.screenshot("login/change-view-port/"+email+"-changing-view-port");

       cy.log("visiting the login page of the site")
       cy.visit("/login");
       cy.screenshot("/login/open-login/"+email+"visit-page");
       
       cy.log("loggin in with user: "+email);
       cy.login(email, password);
       cy.screenshot("/login/logged-in/"+email+"logging-in")
       
       cy.log("checking if user logged in and gamestart page displayed");
       cy.wait(5000) // wait for a while until users logged in
       cy.url().should('include', '/gamestart');
       cy.screenshot("/login/gamestart/"+email+"-gamestart-page");

       cy.log("go to the chash page");
       cy.visit("/cash");
       cy.screenshot("/deposit/cash-page/"+email+"-go-to-cash-page");

       cy.log("wait until braintree pops up");
       cy.wait(10000)
       //cy.get('.MuiContainer-root').should('have.class', 'braintree-show-options');
       cy.screenshot("/deposit/wait-braintree/"+email+"-wait-braintree");

       cy.log("wait until braintree payment options pops up");
       //cy.get('#dropin-container').should('have.text', 'Card');
       cy.wait(10000)
       cy.screenshot("/deposit/wait-braintree/"+email+"-wait-braintree2");

       //TBD better way needed to wait until iframe gets loaded successfully for both brintree and payment options

       cy.log("get the card payment option");
       cy.get(".braintree-option__label").should('have.length', '2');
        
       cy.log("select the card payment option");
       cy.get(".braintree-option__card").click();
       cy.screenshot("/deposit/select-card/"+email+"-card-selected");
       
       cy.log("enter the card number");
       cy.get('iframe').iframe(() => {
           cy.get("#credit-card-number").clear().type(test_card_number);
       });
       cy.screenshot("/deposit/enter-card/"+email+"-input-card-number");

       cy.log("enter the expiration date");
       cy.get('iframe').iframe(() => {
           cy.get("#expiration").clear().type(test_expiration_date);
       });
       cy.screenshot("/deposit/enter-card/"+email+"-input-expiration-date");

       //TBD there should be way to check for validation of both card and expiration date

       cy.log("enter the deposit amount")
       cy.get("#amount").clear().type(deposit_amount);
       cy.screenshot("/deposit/deposit-amount/"+email+"-deposited");

       cy.log("check agree box");
       cy.get('[type="checkbox"]').check({ force: true });
       cy.screenshot("/deposit/checkbox/"+email+"-checkbox-clicked");

       cy.log("click the deposit cash button");
       cy.wait(2000);
       cy.get('[type="submit"]:first').should("have.text", "Deposit Cash").click();

       cy.wait(10000)
       cy.screenshot("/deposit/submit/"+email+"-submit-deposit");

        // check if the deposit gets successful or not
        //    cy.wait(10000)
        //    cy.contains("Your deposit has been settled successfully.");
        //    cy.screenshot("/deposit/successful/"+email+"-successful")

       cy.log("going to statements page");
       cy.visit("/statements");
       cy.screenshot("/statements/statements/"+email+"-statement-page");

       cy.log("check weather the deposit added in account statement or not, with depositied amount")
       // as per current implementation the latest deposited will be listed in the last table row of deposit table in account statements.
       cy.log("first check weather the card account is the same or not")
       cy.get("#depositTable>tbody>tr:last>td").eq(4).should("have.text", "****"+test_card_number.substring(12, 16));
       
       cy.log("then check for the amount deposited")
       cy.get("#depositTable>tbody>tr:last>td").eq(1).should("have.text", deposit_amount+".00 $");
       cy.screenshot("/statements/check-deposit/"+email+"-check-deposit");
       
    })
})