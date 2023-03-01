import { TeamSignInPageComponent } from './team-sign-in-page.component';

describe('TeamSignInPageComponent', () => {
    it('Checks that the login button rather than the submit button is displayed', () => {
        cy.mount(TeamSignInPageComponent, {});
        cy.get('#loginbutton').contains('Login');
        cy.get('#loginbutton').contains('Submit').should('not.exist');
    })
})