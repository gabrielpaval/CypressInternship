// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  Cypress.Commands.add('Login', ()=>{
    cy.request('POST', "https://api.amprenta.at.assistcloud.services/api/v1/users/sign_in", 
    {email: "gabipaval17@gmail.com", 
    password: "123456789",
    }).then((response) => {
      window.localStorage.setItem('token', JSON.stringify(response.body.auth_token))
    })
    cy.visit("https://amprenta.at.assistcloud.services/")
  })

