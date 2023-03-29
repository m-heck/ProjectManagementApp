import { InnerNavbarComponent } from "./inner-navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomePageComponent } from "../home-page/home-page.component";

describe('InnerNavbarComponent', () => {
    it('test project name title', () => {
        cy.mount(InnerNavbarComponent, {});
        cy.get('.navbar-title').should('contain.text', 'Project Name');
    });


    it('should display the progress bar with 50% progress', () => {
        cy.mount(InnerNavbarComponent, {});
        cy.get('.bar').should('have.attr', 'value', '50');
    });

    it('should include all necessary buttons', () => {
        cy.mount(InnerNavbarComponent, {});
        cy.get('.navbar-button').contains('Timeline');
        cy.get('.navbar-button').contains('Sign Out');
    });

    it('should log the user out when the "Sign Out" button is clicked', () => {
        cy.mount(InnerNavbarComponent, {});
        cy.get('#signoutButton').click();
        cy.wait(150);
        cy.mount(HomePageComponent, {});
        cy.get('#home-content').should('be.visible');
    });
});