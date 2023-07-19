import { faker } from '@faker-js/faker'

const email = "gabipaval17@gmail.com"
const password = "123456789"
const randomEmail = faker.internet.email({ firstName: 'gabriel', lastName: 'paval' })
const randomPassword = faker.internet.password()

describe('Login', ()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/conectare')
    })

    it('Verify that Login functionality works with valid credentials', ()=>{
        
        cy.get('div[class="auth-container"]').should('be.visible')

        cy.get('input[type="text"]').type(email)
        cy.get('input[type="password"]').type(password)

        cy.get('button[class="auth-register-button-try"]').click()

        cy.get('div[class="profile-image"]').should('exist')
    })

    it('Login via Api', () => {
        cy.Login()

        cy.get('div[class="profile-image"]').should('exist')
    })

    it('Check if the Show Password feature works', ()=>{
        cy.get('.left-icon > svg')
        .should('exist')

        cy.get('input[type="text"]').type(email)
        cy.get('input[type="password"]').type(password)
        
        cy.get('.left-icon > svg').click()

        cy.get('input[type="password"]')
        .should('have.prop', 'nodeName', 'INPUT')
        .and('have.attr', 'type', 'text')
    })

    it('Check if the Log Out button works', ()=>{
        
        cy.get('input[type="text"]').type(email)
        cy.get('input[type="password"]').type(password)

        cy.get('.auth-register-button-try').click()

        cy.get('div[class="profile-image"]').should('exist')

        cy.get('.auth-user > svg').click()

        cy.get('div[class="auth-container"]').should('be.visible')
    })

    it('Verify that the fields for log in are required', ()=>{
        cy.get('.auth-register-button-try').click()

        cy.get('div[class="auth-container"]').should('be.visible')

        cy.get('.error-wrapper > span').should('exist')

        for (let i=1;i<=2;i++)
            {
                cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
                .should('be.visible')
                .should('have.text', "Acest camp este obligatoriu.")
            }
    })

    it('Check if you can connect to the system using the Enter button', ()=>{
        cy.get('input[type="text"]').type(email)
        cy.get('input[type="password"]').type(password,'{enter}')
        
        cy.get('.auth-register-button-try').click()

        cy.get('div[class="profile-image"]').should('exist')
    })

    it('Verify the Forgot Password functionality', ()=>{
        cy.get('a[href="/reset-password"]')
        .should('exist')
        .should('have.text', "Forgot password?")
        .click()

        cy.get('div[class="auth-container"]').find('forgot-password').should('be.visible')
    })

    it('Check if password is masked', ()=>{
    
        cy.get('input[type="password"]').type(password)

        cy.get('input[type="password"]')
        .should('have.prop', 'nodeName', 'INPUT')
        .and('have.attr', 'type', 'password')
    })

    it('Check that the password cannot be copied', ()=>{
        //to do
        cy.get('input[type="password"]').type(password)

        cy.task('getClipboard').should('not.eq', password)
    })

    it('Check if the login functionality works with invalid credentials', ()=>{
        cy.get('input[type="text"]').type(randomEmail)

        cy.get('input[type="password"]').type(randomPassword)

        cy.get('.auth-register-button-try').click()

        cy.get('div[class="error-wrapper"]')
        .should('exist')
        .should('have.text', "Adresa de email sau parola nu este corecta")
    })
})