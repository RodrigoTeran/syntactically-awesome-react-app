/// <reference types="cypress" />

describe('Default test', () => {
    it('Get SARA h1', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-cy="title"]').contains('Syntactically Awesome React App 🚀')
    })
})