
//const firstname = Cypress.env("firstName");
//const lastname = Cypress.env("lastName");
const username = Cypress.env("username");
const email = Cypress.env("email");
//const password = Cypress.env("password");
//const confirmPassword = Cypress.env("confirmPassword");
//const user_rewards_id = Cypress.env("userRewardsId");
const phone = Cypress.env("phone");

const ssn = Cypress.env("ssn");
//const dateOfBirth = Cypress.env("dateOfBirth");
//const state = Cypress.env("state");
//const city = Cypress.env("city");
//const zip = Cypress.env("zip");
//const address = Cypress.env("address");
//const driverLicenseNum = Cypress.env("driverLicenseNum");
//const driverLicenseState = Cypress.env("driverLicenseState");

//const question1 = Cypress.env("question1");
//const answer1 = Cypress.env("answer1");
//const question2 = Cypress.env("question2");
//const answer2 = Cypress.env("answer2");

describe("Signup Test", ()=> {
    it("Signup should SUCCEED if correct credentials are provided", () => {
        cy.log("username: "+username)
        cy.log("email: "+email)
        cy.log("phone: "+phone)
        cy.log("ssn: "+ssn)

        cy.log("changing view port")
        cy.viewport(1080, 920);
        cy.screenshot("/change-view-port/"+username+"-changing-view-port");

        cy.log("visiting the login page of the site")
        cy.visit('/signup');
        cy.screenshot("/open-signup/"+username+"visit-page")
        
        cy.log("registering user: "+username);

        cy.log("inserting acount information...")
        cy.enterAccInfo("firstname", "lastname", username, email, "password", "confirmPassword", "user_rewards_id", phone)
        cy.screenshot("/registering/"+username+"-account-info")
        cy.contains("Next").click();

        cy.log("inserting age verification...")
        cy.enterAgeVerification(ssn, "dateOfBirth",  "state", "city", "zip", "address", "driverLicenseNum", "driverLicenseState")
        cy.screenshot("/registering/"+username+"-age-verification")
        cy.contains("Next").click();

        cy.log("inserting security question ...")
        cy.signup("question1", "answer1", "question2", "answer2")
        cy.screenshot("/registering/"+username+"-security-question")
        cy.contains("Sign Up").click();

        cy.log("checking if user registered successfully")
        cy.contains("Successfully registered")
        cy.screenshot("/successful/"+username+"-successfully-registered")

    });
});