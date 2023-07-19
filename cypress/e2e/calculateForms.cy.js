const forwardButton = 'button[class="p-button p-component transport-question_transportQuestion_DownArrow__EF+9C p-button-icon-only"]'
const newModalSection = 'div[class="modal-section_modalSection_Modal__RIZtO"]'

describe('Verify Calculează functionality', ()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/*')
    })

    it('Verify if the user is able to use successfully "Calculează" functionality', ()=>{
        cy.get('button[class="button-try"]')
        .contains('Calculează')
        .click()

        cy.get('div[class="Modal_modalOverlay_Modal__JbBmx"]')
        .should('be.visible')

        cy.get('button[class="button-try"]')
        .contains('Vreau să incep')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('button[class="button-try"]')
        .contains('Bine')
        .click()

        cy.get('select[name="fuel_type"]')
        .select("Suceava")

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Suceava")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('select[name="fuel_type"]').select(31)

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Dumbrăveni, Suceava")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Da"]')
        .check()

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[id="total_km"]').type('1234')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('select[name="fuel_type"]')
        .select("Disel")

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Disel")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('input[id="fuel_consumption"]').type('1234')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Da"]')
        .check()

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('select[name="from"]')
        .select("Kabul")

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Kabul")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('select[name="to"]')
        .select("Sofia")

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Sofia")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[id="total_km"]').type('0')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')
        .contains("Felicitări, ai terminat secțiunea de călătorii.")
    })

    it('Verify if each stage correspond successfully with progress bar', ()=>{
        cy.get('button[class="button-try"]')
        .contains('Calculează')
        .click()

        cy.get('div[class="Modal_modalOverlay_Modal__JbBmx"]')
        .should('be.visible')

        cy.get('button[class="button-try"]')
        .contains('Vreau să incep')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get(':nth-child(1) > #RFS-StepMain > #RFS-StepButton > .StepButtonContent-0-2-5')
        .contains(1)

        cy.get(':nth-child(1) > #RFS-StepMain > #RFS-StepButton')
        .should('have.css', 'background-color', 'rgb(161, 3, 8)') 
    })

    it('Verify if the user can navigate back in previous page using "Back" button', ()=>{
        cy.get('button[class="button-try"]')
        .contains('Calculează')
        .click()

        cy.get('div[class="Modal_modalOverlay_Modal__JbBmx"]')
        .should('be.visible')

        cy.get('button[class="button-try"]')
        .contains('Vreau să incep')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('button[class="button-try"]')
        .contains('Bine')
        .click()

        cy.get(forwardButton)
        .click()

        cy.get(newModalSection)
        .should('be.visible')
    })
})

describe('"Călătorii" section tests',()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/transport')
    })

    it('Verify if the Călătorii section is successfully when the user select "No" of car, airplane and public transportation', ()=>{
        cy.get('button[class="button-try"]')
        .contains('Bine')
        .click()

        cy.get('select[name="fuel_type"]')
        .select("Suceava")

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Suceava")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('select[name="fuel_type"]').select(31)

        cy.get("select option:selected")
        .invoke("text")
        .should("eq", "Dumbrăveni, Suceava")

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('input[value="Nu"]')
        .check()

        cy.get(newModalSection)
        .should('be.visible')

        cy.get('.transport-section_transportSection_Info__rfs4A')
        .should('have.text', "Felicitări, ai terminat secțiunea de călătorii. Acum urmează secțiunea de gospodărie.")
    })
})

describe('"Gospodarie" section tests',()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/gospodarie/123')   
    })

    it('Verify if the user can successfully complete "Gospodărie" section', ()=>{
        cy.get('button[class="button-try"]')
        .contains('Bine')
        .click()

        cy.get('input[id="electricity"]')
        .type('30')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('input[id="natural_gas"]')
        .type('0')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('input[id="wood"]')
        .type('0')

        cy.get(forwardButton)
        .should('be.enabled')
        .click()

        cy.get('.transport-section_transportSection_Info__rfs4A')
        .should('have.text', "Felicitări, ai terminat secțiunea de gospodărie. Acum urmează secțiunea de alimentație.")
    })
})

describe('"Alimentație" section tests',()=>{
    beforeEach(()=>{
        cy.visit('https://amprenta.at.assistcloud.services/mancare/73')
    })

    it('Verify if the user is able see the results of the form after "Alimentație" section', ()=>{
        // to do       
    })
})