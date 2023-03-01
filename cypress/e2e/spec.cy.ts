describe('template spec', () => {
  it('visits the page', () => {
    cy.visit('http://localhost:4200/')
  })
  it('finds the title', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('Project Management App')
  })
  it('clicks the link "sign up" and changes pages', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#signup').click()
  })
  it('clicking "sign up" navigates to a new url', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#signup').click()
    cy.url().should('include', '/sign-up')
  })
})