import { MainPageComponent } from './main-page.component';
import { HomePageComponent } from '../home-page/home-page.component';



describe('PreLoginNavbarComponent', () => {
    it('Does the signout button correctly signout and display the homepage content again', () => {
        cy.mount(MainPageComponent, {});
        cy.get('#signoutbutton').click();
        cy.wait(150);
        cy.mount(HomePageComponent, {});
        cy.get('#home-content').should('be.visible');
    })
})