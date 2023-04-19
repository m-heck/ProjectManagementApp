
import { PreLoginNavbarComponent } from './pre-login-navbar.component';

describe('PreLoginNavbarComponent', () => {
    it('Should display itself and its links', () => {
        cy.mount(PreLoginNavbarComponent, {});
        cy.get('.nav-button-container').contains('Home');
        cy.get('.nav-button-container').contains('Login');
        cy.get('.nav-button-container').contains('Sign Up');

        cy.get('#home').click()
        cy.wait(150);
        cy.get('#home').should('have.attr', 'routerLinkActive', 'active')

        cy.get('#signup').click()
        cy.wait(150);
        cy.get('#signup').should('have.attr', 'routerLinkActive', 'active')

        cy.get('#login').click()
        cy.wait(150);
        cy.get('#login').should('have.attr', 'routerLinkActive', 'active')
        cy.get('#home').should('have.attr', 'routerLinkActive', 'active') // checks that links that shouldn't be active aren't
    })
})