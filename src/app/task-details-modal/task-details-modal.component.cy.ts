import { TaskDetailsModalComponent } from "./task-details-modal.component";

describe('TaskDetailsModalComponent', () => {
    it('should display the due date input field', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-form-field input[name="dueDate"]').should('exist');
      cy.get('mat-form-field mat-label').contains('Due date');
    });
  
    it('should display the completed checkbox', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-checkbox[name="completedStatus"]').should('exist');
      cy.get('mat-checkbox').contains('Completed');
    });
  
    it('should display the tags input field', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-form-field input[placeholder="New tag"]').should('exist');
      cy.get('mat-form-field mat-label').contains('Add tags');
    });
  
    it('should display the save button', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('button[color="primary"]').should('exist');
      cy.get('button').contains('Save');
    });
  });
  