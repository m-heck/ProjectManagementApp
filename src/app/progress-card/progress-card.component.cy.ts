import { ProgressCardComponent } from './progress-card.component';

describe('ProgressCardComponent', () => {  
    it('should display the member name and progress percentage', () => {
      cy.mount(ProgressCardComponent, {
        componentProperties: {
          name: 'John Doe',
          percent: '50%',
        },
      })
  
      cy.get('.member-name').should('contain', 'John Doe');
      cy.get('.display-percent').should('contain', '50%');
    });
  
    it('smaller percentage test', () => {
      cy.mount(ProgressCardComponent, {
        componentProperties: {
          name: 'Ana Lovelace',
          percent: '10%',
        },
      })
  
      cy.get('.member-name').should('contain', 'Ana Lovelace');
      cy.get('.display-percent').should('contain', '10%');
    });
  });