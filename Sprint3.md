# 1. Detail work you've completed in Sprint 2
### Frontend
This sprint, we started implementing the main features of our app that would be displayed on the main page. These features are:
- Navigation bar
	- This is a new navigation bar that replaces the one that was on the login/sign-up/home page once the user logs in.
	- Displays the name of the project
	- Displays a progress bar that illustrats the completion status of the user's assigned tasks
	- Includes buttons for Timeline and Sign Out
	- Includes a sidebar button that can be pressed to reveal the sidebar
- Sidebar
  - Revealed by pressing the hamburger icon in the navigation bar
  - Includes the options to Add New Task, Manage Member Tags, and Sign Out
  - Can be closed by preassing the menu icon a second time
- Task Cards
  - One card for each task laid out in a vertical list format
  - Includes information about each task such as
    - Title
    - Due Date
    - Completion Status
    - Tag list
    - Details Button
- Task Details Modal
  - Allows users to edit tasks that have already been created
  - Opened up when the user clicks the "Details" button on a task card
  - We have not finished implementing this feature
  - Will be reused in our Add Task feature, which allows the user to create a new task
- Progress Cards
  - One card for each member who is part of the same team
  - Includes each team member's name and displays a progress bar that indicates that person's progress with their tasks

### Backend

# 2. Frontend Unit Tests
Note: some previous unit tests for the frontend have become unnecessary due to changes in the code, so they have been commented out or deleted.

### Inner Navbar Tests
1. Tests that the navbar's title shows up correctly

```
it('test project name title', () => {
      cy.mount(InnerNavbarComponent, {});
      cy.get('.navbar-title').should('contain.text', 'Project Name');
  });
  ```

2. Tests that the navbar's progress bar displays the right progress

```
 it('should display the progress bar with 50% progress', () => {
    cy.mount(InnerNavbarComponent, {});
    cy.get('.bar').should('have.attr', 'value', '50');
});
```

3. Tests that the navbar displays the correct buttons
```
it('should include all necessary buttons', () => {
    cy.mount(InnerNavbarComponent, {});
    cy.get('.navbar-button').contains('Timeline');
    cy.get('.navbar-button').contains('Sign Out');
});
```

4. Tests that the sign out button correctly bring the user to the homepage
```
it('should log the user out when the "Sign Out" button is clicked', () => {
    cy.mount(InnerNavbarComponent, {});
    cy.get('#signoutButton').click();
    cy.wait(150);
    cy.mount(HomePageComponent, {});
    cy.get('#home-content').should('be.visible');
});
```

### Progress Card Tests
1. Tests that the name and progress bar appear correctly when passed into component
```
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
```

2. Tests that the percentage changes for a different percentage passed into component
```
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
```

### Sidebar Tests
1. Tests that the sidebar-content class is correctly toggled when the sidebar is visible
```
it('should display the sidebar', () => {
    cy.mount(SidebarComponent, {});
    cy.get('.sidebar-content').should('be.visible');
  });
```

2. Tests that the sidebar contains a ul (unordered list) of links
```
  it('should contain a list of links', () => {
    cy.mount(SidebarComponent, {});
    cy.get('.sidebar-content ul').should('exist');
  });
```

3. Tests that the Add New Task option appears
```
it('should contain a link to add a new task', () => {
  cy.mount(SidebarComponent, {});
  cy.get('.sidebar-content ul li').eq(0).contains('Add New Task');
});
```

4. Tests that the Manage Member Tags option appears
```
it('should contain a link to manage member tags', () => {
  cy.mount(SidebarComponent, {});
  cy.get('.sidebar-content ul li').eq(1).contains('Manage Member Tags');
});
```

5. Tests that the Sign Out option appears
```
it('should contain a link to sign out', () => {
  cy.mount(SidebarComponent, {});
  cy.get('.sidebar-content ul li').eq(2).contains('Sign Out');
});
```

# 3. Backend Unit Tests
# 4. Backend API Documentation
# 5. Notes
- One of our commands auto-generated a very long packagelock JSON file that was about 20k additions long. This has been deleted, please ignore the ~20k additions and deletions that resulted from it. 
