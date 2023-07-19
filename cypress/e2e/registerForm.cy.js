import { faker } from '@faker-js/faker'

const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const email = faker.internet.email({ firstName: 'gabriel', lastName: 'paval' })
const password = faker.internet.password()
const badPassword = faker.internet.password({ length: 7})

describe('Test suite for registration form', ()=>{
   
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/inregistrare')
     })

    it('Verify that the register link works', ()=>{
        
        cy.visit('https://amprenta.at.assistcloud.services/conectare')
        
        cy.get('a[href="/inregistrare"]').click()
        
        cy.get('button[class="auth-register-button-try"]')
        .should('exist')
        .should('have.text', "Înregistrează-te")
    })

    it('Check if the user can register by entering valid data in all fields and receives a confirmation message', ()=>{

        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type(lastName)
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type(firstName)
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type(email)
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type(password)
        
        cy.get('.auth-register-button-try').click()

        //cy.get('.error-wrapper > span').should('have.text', "Inregistrare cu succes")
        
        cy.get('.auth')
        .should('exist')

        cy.wait(2000)

        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type(email)
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type(password)
        
        cy.get('.auth-register-button-try').click()

        cy.get('.profile-image > img').should('exist')
    })

    it("Check that the user cannot register by entering invalid data in all mandatory fields", ()=>{
        
        for(let i=1;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .input-container > .input-field`)
            .type("inv sh")
        }
        cy.get('.auth-register-button-try').click()

        for (let i=1;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
            .should('exist')
        }

        cy.get('.auth-container')
        .find('.auth-register-button-try')
        .should('have.text', "Înregistrează-te") 
    })

    it("Check that the user cannot register by entering data only in a few mandatory fields", ()=>{
        
        for(let i=1;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .input-container > .input-field`)
            .type("char")
        }
        cy.get('.auth-register-button-try').click()

        for (let i=3;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
            .should('exist')
        }

        cy.get('.auth-container')
        .find('.auth-register-button-try')
        .should('have.text', "Înregistrează-te") 
    })

    it("Check if the form has a password confirmation field", ()=>{
    
         cy.get(':nth-child(5) > .input-wrapper > .label-input')
        .should('have.text', "Confirma parola")

        cy.get(':nth-child(5) > .input-wrapper > .input-container > .input-field')
        .should('exist')
    })

    it('Check if the error message displays by entering an already registered email address', ()=>{
        
        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type(lastName)
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type(firstName)
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type(email)
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type(password)

        cy.get('.auth-register-button-try').click()

        cy.get('.error-wrapper > span').should('have.text', "Adresa de email a fost deja folosita")
        
        cy.get('button[class="auth-register-button-try"]')
        .should('exist')
        .should('have.text', "Înregistrează-te")
    })

    it('Check that the form cannot be submitted with empty fields', ()=>{

        cy.get('.auth-register-button-try').click()

        for (let i=1;i<=4;i++)
            {
                cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
                .should('be.visible')
                .should('have.text', "Acest camp este obligatoriu.")
            }
    })

    it('Check if password is masked', ()=>{
    
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type(password)

        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field')
        .should('have.prop', 'nodeName', 'INPUT')
        .and('have.attr', 'type', 'password')
    })

    it('Verify that entering blank spaces on mandatory fields lead to validation error', ()=>{
        
        for(let i=1;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .input-container > .input-field`)
            .type("    ")
        }

        cy.get('.auth-register-button-try').click()

        for (let i=3;i<=4;i++)
        {
            cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
            .should('exist')
        }
    })

    it('Check if the email field is validated', ()=>{
         
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type(email)
        
        cy.get('.auth-register-button-try').click()
        
        cy.get(':nth-child(3) > .input-wrapper > .errorMessage').should('not.exist');  
    })

    it.only('Verify that the password field does not allow a password of at least 8 characters', ()=>{
        
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type(badPassword)

        cy.get('.auth-register-button-try').click()

        cy.get(':nth-child(4) > .input-wrapper > .errorMessage')
        .should('be.visible')
        .should('have.text', "Parola trebuie sa contina minim 8 caractere")
    })
})  