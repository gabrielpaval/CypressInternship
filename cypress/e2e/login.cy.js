describe('Login', ()=>{
    it('Login with credentials', ()=>{
        cy.visit('https://amprenta.at.assistcloud.services/conectare')
        cy.get('div[class="auth-container"]').should('be.visible')

        cy.get('input[type="text"]').type('gabipaval17@gmail.com')
        cy.get('input[type="password"]').type('123456789')

        cy.get('button[class="auth-register-button-try"]').click()

        cy.get('div[class="profile-image"]').should('exist')
    })

    it.only('Login via Api', () => {
        cy.Login()
    })
})