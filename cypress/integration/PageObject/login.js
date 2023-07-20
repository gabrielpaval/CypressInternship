class Login{
    email(email){
        cy.get('input[type="text"]')
        .clear()
        .type(email)

        return this
    }

    password(password){
        cy.get('input[type="password"]')
        .clear()
        .type(password)

        return this
    }

    submit(){
        cy.get('button[class="auth-register-button-try"]')
        .click()
    }

    verifyLogin(){
        cy.get('div[class="profile-image"]')
        .should('exist')
        .should('be.visible')
    }
}

export default Login