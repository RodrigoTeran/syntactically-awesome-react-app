/// <reference types="cypress" />

describe('Default test', () => {
    it('Get SARA nav', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-cy="title"]').contains('SARA')
    })
})