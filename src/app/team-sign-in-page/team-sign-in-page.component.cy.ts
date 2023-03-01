import { MainPageComponent } from '../main-page/main-page.component';
import { TeamSignInPageComponent } from './team-sign-in-page.component';
import { PreLoginNavbarComponent } from '../pre-login-navbar/pre-login-navbar.component';

describe('TeamSignInPageComponent', () => {
    it('Does the Login Button Work', () => {
        cy.mount(PreLoginNavbarComponent, {});
        cy.get('#login');
        cy.mount(TeamSignInPageComponent, {});
        cy.get('.submit-button').click();
        cy.wait(150);
        cy.mount(MainPageComponent, {});
        cy.get('#title').should('be.visible');
    })
})