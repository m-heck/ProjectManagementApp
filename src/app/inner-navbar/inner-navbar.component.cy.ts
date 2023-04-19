import { InnerNavbarComponent } from "./inner-navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomePageComponent } from "../home-page/home-page.component";

describe('InnerNavbarComponent', () => {
    it('test project name title', () => {
        cy.mount(InnerNavbarComponent, {
            componentProperties: {
                projectName: 'Test Name',
              },
        });
        cy.get('.navbar-title').should('contain.text', 'Test Name');
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