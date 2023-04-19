import { ManageMemberTagsComponent } from "./manage-member-tags.component";

describe('manage-member-tags component', () => {

    it('should display the correct title', () => {
        cy.mount(ManageMemberTagsComponent, {});
      cy.get('.modal-title').should('have.text', 'Manage Tags');
    });
  
    it('should display a member tag for each user', () => {
        cy.mount(ManageMemberTagsComponent, {});
        cy.get('app-member-tags').should('have.length', 4);
      });

      it('should display a "Save" button', () => {
        cy.mount(ManageMemberTagsComponent, {});
        cy.get('button').should('contain.text', 'Save');
      });
  });
  