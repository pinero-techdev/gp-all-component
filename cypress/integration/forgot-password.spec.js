import Chance from 'chance';

describe('Feature: Forgot password', () => {
    const chance = new Chance();
    const username = chance.string();
    const password = chance.string();
    const passwordOld = chance.string();
    let loginUrl;
    let forgotPassUrl;

    describe('Scenario: User gets to /forgot-password', () => {
        beforeEach(() => {
            cy.prepareForgotPass();
            loginUrl = Cypress.config('baseUrl') + Cypress.env('loginUrl');
            forgotPassUrl = Cypress.config('baseUrl') + Cypress.env('forgotPassUrl');
        });

        describe('Given: username and password', () => {
            context('When: click submit button with username and password', () => {
                it('Then: the user can modify the password', () => {
                    cy.forgotPass(username, password, password, passwordOld);
                    cy.url().should('eq', loginUrl);
                });
            });
        });

        describe('Given: username and password empty', () => {
            context('When: click submit button with username and password empty', () => {
                it('Then: the user can not modify password', () => {
                    cy.forgotPass();
                    cy.url().should('eq', forgotPassUrl);
                });
            });
        });

        describe('Given: username empty', () => {
            context('When: click login button with username empty', () => {
                it('Then: the user can not modify password', () => {
                    cy.forgotPass('', password);
                    cy.url().should('eq', forgotPassUrl);
                });
            });
        });

        describe('Given: password empty', () => {
            context('When: click login button with old password empty', () => {
                it('Then: the user can not login', () => {
                    cy.forgotPass(username, '', password);
                    cy.url().should('eq', forgotPassUrl);
                });
            });
        });

        describe('Given: password rep different', () => {
            context('When: click login button with rep password different to password', () => {
                it('Then: the user can not login', () => {
                    cy.forgotPass(username, password, passwordOld, passwordOld);
                    cy.url().should('eq', forgotPassUrl);
                });
            });
        });

        describe('Given: old password empty', () => {
            context('When: click login button with old password empty', () => {
                it('Then: the user can not login', () => {
                    cy.forgotPass(username, password, password);
                    cy.url().should('eq', forgotPassUrl);
                });
            });
        });
    });
});
