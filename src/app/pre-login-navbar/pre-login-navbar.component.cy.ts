
import { PreLoginNavbarComponent } from './pre-login-navbar.component';

describe('PreLoginNavbarComponent', () => {
    it('Should display itself and its links', () => {
        cy.mount(PreLoginNavbarComponent)
        cy.get('.nav-button-container').contains('Home');
        cy.get('.nav-button-container').contains('Login');
        cy.get('.nav-button-container').contains('Sign Up');

        cy.get('#home').click();
        cy.get('@onClickSpy').should('have.been.called');
    })
})
