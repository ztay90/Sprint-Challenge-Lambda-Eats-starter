describe("The first test", () => {
    it("Should return true", () => {
        expect(true).to.equal(true)
    })
})

describe("Testing MVP", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3000/orderform")
    })
    it("Add text to Name", () => {
        cy.get('input[name="name"]').type("Zachary")
        .should("have.value", "Zachary")
        
    })
    it("Check checkboxes", () => {
        cy.get('[type="checkbox"]').check()
        .should("be.checked")
    })
    it("Check Submit Button", () => {
        cy.get('form').submit()
    })
})