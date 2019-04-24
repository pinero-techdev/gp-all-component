/**
 * Login helper: makes the login flow easier. Add here every generic stuff about login.
 * Use this for login(), logout(), etc...
 */
// Visit the page and pass the query params if it´s needed. Also,
// create a mock when to fake the API calling.
Cypress.Commands.add('prepareForgotPass', (queryParams = null) => {
  let url = Cypress.env('forgotPassUrl');
  const options = {
    method: 'POST',
    url: '**/password-svc/modifica',
    response: 'fixture:forgot-pass.json',
  };

  if (queryParams) {
    url +=
      '?' +
      Object.keys(queryParams)
        .map((key) => key + '=' + queryParams[key])
        .join('&');
  }

  Cypress.env('forgotPassUrl', url);

  cy.server();
  cy.route(options);
  cy.visit(url);
});

// Fill the fields and click on the login button.
Cypress.Commands.add(
  'forgotPass',
  (username = null, password = null, passwordRep = null, passwordOld = null) => {
    if (username) {
      cy.get('input[name="username"]').type(username);
    }
    if (password) {
      cy.get('input[type="password"][name="password"]').type(password);
    }
    if (passwordOld) {
      cy.get('input[type="password"][name="passwordOld"]').type(passwordOld);
    }
    if (passwordRep) {
      cy.get('input[type="password"][name="passwordRep"]').type(passwordRep);
    }
    cy.get('button[type=submit]').click();
  }
);

// Click on cancel button
Cypress.Commands.add('clickCancel', () => {
  cy.get('button[type="button"]').click();
});
