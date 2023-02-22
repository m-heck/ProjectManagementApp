
import { PreLoginNavbarComponent } from './pre-login-navbar.component';
import { createOutputSpy } from 'cypress/angular'

describe('PreLoginNavbarComponent', () => {
    it('Should display itself and its links', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(PreLoginNavbarComponent, {
//            componentProperties: {
//                onClick: createOutputSpy('onClickSpy'),
//            },
        })
        cy.get('.nav-button-container').contains('Home');
        cy.get('.nav-button-container').contains('Login');
        cy.get('.nav-button-container').contains('Sign Up');

        cy.get('#home').click()
        cy.wait(150);
        cy.get('#home a').should('have.attr', 'routerLinkActive', 'active')

        cy.get('#signup').click()
        cy.wait(150);
        cy.get('#signup a').should('have.attr', 'routerLinkActive', 'active')

        cy.get('#login').click()
        cy.wait(150);
        cy.get('#login a').should('have.attr', 'routerLinkActive', 'active')
    })
})
