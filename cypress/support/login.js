Cypress.Commands.add('prepareLogin', () => {
    const url = Cypress.env('baseUrl') + 'login';
    const options = {
        method: 'POST',
        url: '**/login',
        response: 'fixture:login.json',
    };

    Cypress.env('loginUrl', url);
    Cypress.env('forgotPassUrl', Cypress.env('baseUrl') + 'modifica-password');

    cy.server();
    cy.route(options);
    cy.visit(url);
});

Cypress.Commands.add('login', (email = null, password = null) => {
    if (email) {
        cy.get('input[name="username"]').type(email);
    }
    if (password) {
        cy.get('input[type="password"]').type(password);
    }
    cy.get('button[type=submit]').click();
});

Cypress.Commands.add('clickForgotPassword', () => {
    cy.get('a.login-panel-change-password').click();
});
