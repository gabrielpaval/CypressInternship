
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

        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type("Paval")
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type("Dan")
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type("d@gmail.com")
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type("123456789")
        
        cy.get('.auth-register-button-try').click()

        cy.get('.error-wrapper > span').should('have.text', "Inregistrare cu succes")
        
        cy.get('.auth')
        .should('exist')

        cy.wait(2000)

        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type("d@gmail.com")
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type("123456789")
        
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
        
        cy.get(':nth-child(1) > .input-wrapper > .input-container > .input-field').type("Paval")
        cy.get(':nth-child(2) > .input-wrapper > .input-container > .input-field').type("Dan")
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type("d@gmail.com")
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type("123456789")

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
    
        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type("123456789")

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
         //Create Emails
        const emails = (val) => {
        var email = "";
        var possible = "abcd@.gh";
        for (var i = 0; i < val; i++){
        email += possible.charAt(Math.floor(Math.random() * possible.length));}
        return email;
        }
        
        //validate emails
        
        const validateEmail = (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
        }
    
        for (let index = 0; index <3; index++) {
        const TestEmail = emails(3)
        const EmailState = validateEmail(TestEmail)
    
        cy.get(':nth-child(3) > .input-wrapper > .input-container > .input-field').type(TestEmail)
        cy.get('.auth-register-button-try').click()
        if(!EmailState){
            cy.get(':nth-child(3) > .input-wrapper > .errorMessage').should('be.visible');
        }else{
            cy.get(':nth-child(3) > .input-wrapper > .errorMessage').should('not.be.visible');
             }
        }
    })

    it('Verify that the password field does not allow a password of at least 8 characters', ()=>{
        
        //Create passwords
        const password = (val) => {
        var password = "";
        var possible = "abcd@.ghdjnrenvodpvmr$#$##$#$%^^&&$##@";
        for (var i = 0; i < val; i++){
        password += possible.charAt(Math.floor(Math.random() * possible.length));}
        return password;
        }

        cy.get(':nth-child(4) > .input-wrapper > .input-container > .input-field').type(password(6))

        cy.get('.auth-register-button-try').click()

        cy.get(':nth-child(4) > .input-wrapper > .errorMessage')
        .should('be.visible')
        .should('have.text', "Parola trebuie sa contina minim 8 caractere")
    })
})  