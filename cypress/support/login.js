/**
 * Login helper: makes the login flow easier. Add here every generic stuff about login.
 * Use this for login(), logout(), etc...
 */
// Visit the page and pass the query params if it´s needed. Also,
// create a mock when to fake the API calling.
Cypress.Commands.add('prepareLogin', (queryParams = null) => {
    let url = 'forgot-password';
    const options = {
        method: 'POST',
        url: '**/login',
        response: 'fixture:login.json',
    };

    if (queryParams) {
        url +=
            '?' +
            Object.keys(queryParams)
                .map((key) => key + '=' + queryParams[key])
                .join('&');
    }

    Cypress.env('loginUrl', 'login');
    Cypress.env('forgotPassUrl', url);

    cy.server();
    cy.route(options);
    cy.visit(url);
});

// Fill the fields and click on the login button.
Cypress.Commands.add('login', (email = null, password = null) => {
    if (email) {
        cy.get('input[name="username"]').type(email);
    }
    if (password) {
        cy.get('input[type="password"]').type(password);
    }
    cy.get('button[type=submit]').click();
});

// Click on forgot password link
Cypress.Commands.add('clickForgotPassword', () => {
    cy.get('a.login-panel-change-password').click();
});
