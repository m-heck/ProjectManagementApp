# 1. Detail work you've completed in Sprint 2
### Frontend
First, we made many changes to how the application looks. For our previous sprint, we were only able to display the basic layout and buttons of our application, however for this sprint we focused on making the app look more visually appealing. Some changes we made to do so include:
- Making a navigation bar that is responsive and that matches the color scheme of our app
- Adding a home image to start fleshing out our information page, which is the first thing the user will see
- Cleaning up the sign up/login forms
  - Making them look better
  - Removing out unecessary fields and adding new ones
- Fixing uneven centering and inconsistent spacing across devices
- Fixing bugs from last sprint (such as unclickable buttons)
- Bringing the user to a blank mainpage after clicking login
  - Started putting a few elements on the mainpage

In order to plan out how the rest of the app, the frontend team met up and created a mockup of how we want the app to look like. 

[Frontend Mock-up.pdf](https://github.com/m-heck/ProjectManagementApp/files/10853386/Frontend.Mock-up.pdf)

We also configured Cypress and wrote our first Cypress test.

Finally, we worked on integrating the frontend with the backend alongside the backend team and writing up additional unit tests to accompany the functions that we wrote.

### Backend
# 2. List unit tests and Cypress test for frontend
### First Cypress Test: signOutButton() function, MainPage Component
Checks whether the signout button, when clicked, correctly logs the user out by bringing them back to the homepage rather than their personalized mainpage.
```
describe('PreLoginNavbarComponent', () => {
    it('Does the signout button correctly signout and display the homepage content again', () => {
        cy.mount(MainPageComponent, {});
        cy.get('#signoutbutton').click();
        cy.wait(150);
        cy.mount(HomePageComponent, {});
        cy.get('#home-content').should('be.visible');
    })
})
```
We decided to conduct other unit tests for the frontend using Cypress as well
### Unit Test: active() function, PreLoginNavbar Component
Tests whether the pre-login navigation bar component works correctly. First, it mounts the component and grabs the containers in the navigation bar. Then, it checks that the containers are correct for each of the three functions we wanted the navigation bar to serve (Home, Login, and Sign Up). Next, it simulates clicking each of these buttons and checks whether the attribute "active" has been correctly applied to the right button. Finally, it checks that buttons which should not be active don't ahve the "active" attribute.
```
describe('PreLoginNavbarComponent', () => {
    it('Should display itself and its links', () => {
        cy.mount(PreLoginNavbarComponent, {});
        cy.get('.nav-button-container').contains('Home');
        cy.get('.nav-button-container').contains('Login');
        cy.get('.nav-button-container').contains('Sign Up');
        cy.get('#home').click();
        cy.wait(150);
        cy.get('#home').should('have.attr', 'routerLinkActive', 'active');
        cy.get('#signup').click();
        cy.wait(150);
        cy.get('#signup').should('have.attr', 'routerLinkActive', 'active');
        cy.get('#login').click();
        cy.wait(150);
        cy.get('#login').should('have.attr', 'routerLinkActive', 'active');
        cy.get('#home').should('have.attr', 'routerLinkActive', 'active');
    })
})
```
### Unit Test: loginButton() function, TeamSignInPage Component
Simple test that checks that the correct login button is displayed to the login page rather than the submit button.
```
describe('TeamSignInPageComponent', () => {
    it('Checks that the login button rather than the submit button is displayed', () => {
        cy.mount(TeamSignInPageComponent, {});
        cy.get('#loginbutton').contains('Login');
        cy.get('#loginbutton').contains('Submit').should('not.exist');
    })
})
```
# 3. List unit tests for backend
# 4. Add documentation for your backend API
