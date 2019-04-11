import Chance from 'chance';

describe('Feature: Login', () => {
    const chance = new Chance();
    const email = chance.email();
    const password = chance.string();
    let loginUrl;
    let forgotPassUrl;

    describe('Scenario: User gets to /login', () => {
        beforeEach(() => {
            cy.prepareLogin();
            loginUrl = Cypress.config('baseUrl') + Cypress.env('loginUrl');
            forgotPassUrl = Cypress.config('baseUrl') + Cypress.env('forgotPassUrl');
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

    describe('Scenario: User gets to /login?usuario&password', () => {
        beforeEach(() => {
            cy.prepareLogin({ usuario: email, password });
            loginUrl = Cypress.config('baseUrl') + Cypress.env('loginUrl');
            forgotPassUrl = Cypress.config('baseUrl') + Cypress.env('forgotPassUrl');
        });

        describe('Given: username and password', () => {
            context('When: click login button with username and password', () => {
                it('Then: the user can login', () => {
                    const homeUrl = Cypress.config('baseUrl');
                    cy.url().should('eq', homeUrl);
                });
            });
        });

        describe('Given: an url to redirect after login', () => {
            context('When: click login button with username and password', () => {
                it('Then: the user can login', () => {
                    const homeUrl = Cypress.config('baseUrl');
                    cy.url().should('eq', homeUrl);
                });
            });
        });
    });

    describe('Scenario: User gets to /login?usuario&password&urlToRedirect', () => {
        beforeEach(() => {
            const urlToRedirect = 'foo';
            cy.prepareLogin({ usuario: email, password, urlToRedirect });
            loginUrl = Cypress.config('baseUrl') + Cypress.env('loginUrl');
            forgotPassUrl = Cypress.config('baseUrl') + Cypress.env('forgotPassUrl');
        });

        describe('Given: an url to redirect after login', () => {
            context('When: click login button with username and password', () => {
                it('Then: login and redirect', () => {
                    const fooUrl = Cypress.config('baseUrl') + Cypress.env('fooUrl');
                    cy.url().should('eq', fooUrl);
                });
            });
        });
    });
});
