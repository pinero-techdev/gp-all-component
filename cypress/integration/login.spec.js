import Chance from 'chance';

describe('Scenario: Login', () => {
    const chance = new Chance();
    const email = chance.email();
    const password = chance.string();
    let loginUrl;
    let forgotPassUrl;

    beforeEach(() => {
        cy.prepareLogin();
        loginUrl = Cypress.env('loginUrl');
        forgotPassUrl = Cypress.env('forgotPassUrl');
    });

    describe('Given: username and password', () => {
        context('When: click login button with username and password', () => {
            it('Then: the user can login', () => {
                cy.login(email, password);
                cy.url().should('not.eq', loginUrl);
            });
        });

        context('When: click remember password', () => {
            it('Then: the user visit forgotPass page', () => {
                cy.clickForgotPassword();
                cy.url().should('contains', forgotPassUrl);
            });
        });
    });

    describe('Given: username and password empty', () => {
        context('When: click login button with username and password empty', () => {
            it('Then: the user can not login', () => {
                cy.login();
                cy.url().should('eq', loginUrl);
            });
        });
    });

    describe('Given: username empty', () => {
        context('When: click login button with username empty', () => {
            it('Then: the user can not login', () => {
                cy.login('', password);
                cy.url().should('eq', loginUrl);
            });
        });
    });

    describe('Given: password empty', () => {
        context('When: click login button with password empty', () => {
            it('Then: the user can not login', () => {
                cy.login(email, '');
                cy.url().should('eq', loginUrl);
            });
        });
    });
});
