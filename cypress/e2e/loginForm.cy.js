import { faker } from '@faker-js/faker'
import Login from '../integration/PageObject/login'

const email = "gabipaval17@gmail.com"
const password = "123456789"
const randomEmail = faker.internet.email({ firstName: 'gabriel', lastName: 'paval' })
const randomPassword = faker.internet.password()

const loginPage = new Login()

describe('Login', ()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/conectare')
    })

    it('Verify that Login functionality works with valid credentials', ()=>{
        
        cy.get('div[class="auth-container"]').should('be.visible')

        loginPage.email(email)
        loginPage.password(password)
        loginPage.submit()
        loginPage.verifyLogin()
    })

    it('Login via Api', () => {
        cy.Login()

        loginPage.verifyLogin()
    })

    it('Check if the Show Password feature works', ()=>{
        cy.get('.left-icon > svg')
        .should('exist')

        loginPage.email(email)
        loginPage.password(password)
        
        cy.get('.left-icon > svg').click()

        cy.get('input[type="password"]')
        .should('have.prop', 'nodeName', 'INPUT')
        .and('have.attr', 'type', 'text')
    })

    it('Check if the Log Out button works', ()=>{
        
        loginPage.email(email)
        loginPage.password(password)
        loginPage.submit()
        loginPage.verifyLogin()

        cy.get('.auth-user > svg').click()

        cy.get('div[class="auth-container"]')
        .should('be.visible')
    })

    it('Verify that the fields for log in are required', ()=>{
        loginPage.submit()

        cy.get('div[class="auth-container"]')
        .should('be.visible')

        cy.get('.error-wrapper > span')
        .should('exist')

        for (let i=1;i<=2;i++)
            {
                cy.get(`:nth-child(${i}) > .input-wrapper > .errorMessage`)
                .should('be.visible')
                .should('have.text', "Acest camp este obligatoriu.")
            }
    })

    it('Check if you can connect to the system using the Enter button', ()=>{
        loginPage.email(email)
        
        cy.get('input[type="password"]')
        .type(password)
        .type('{enter}')

        loginPage.verifyLogin()
    })

    it('Verify the Forgot Password functionality', ()=>{
        cy.get('a[href="/reset-password"]')
        .should('exist')
        .should('have.text', "Forgot password?")
        .click()

        cy.get('div[class="auth-container"]')
        .find('forgot-password')
        .should('be.visible')
    })

    it('Check if password is masked', ()=>{
    
        loginPage.password(password)

        cy.get('input[type="password"]')
        .should('have.prop', 'nodeName', 'INPUT')
        .and('have.attr', 'type', 'password')
    })

    it('Check that the password cannot be copied', ()=>{
        //to do
        loginPage.password(password)

        cy.task('getClipboard').should('not.eq', password)
    })

    it('Check if the login functionality works with invalid credentials', ()=>{
        loginPage.email(randomEmail)
        loginPage.password(randomPassword)
        loginPage.submit()

        cy.get('div[class="error-wrapper"]')
        .should('exist')
        .should('have.text', "Adresa de email sau parola nu este corecta")
    })
})