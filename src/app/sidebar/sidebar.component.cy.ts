import { SidebarComponent } from './sidebar.component';

describe('PreLoginNavbarComponent', () => {
    it('should display the sidebar', () => {
        cy.mount(SidebarComponent, {});
        cy.get('.sidebar-content').should('be.visible');
      });
    
      it('should contain a list of links', () => {
        cy.mount(SidebarComponent, {});
        cy.get('.sidebar-content ul').should('exist');
      });
    
      it('should contain a link to add a new task', () => {
        cy.mount(SidebarComponent, {});
        cy.get('.sidebar-content ul li').eq(0).contains('Add New Task');
      });
    
      it('should contain a link to manage member tags', () => {
        cy.mount(SidebarComponent, {});
        cy.get('.sidebar-content ul li').eq(1).contains('Manage Member Tags');
      });
    
      it('should contain a link to sign out', () => {
        cy.mount(SidebarComponent, {});
        cy.get('.sidebar-content ul li').eq(2).contains('Sign Out');
      });
})