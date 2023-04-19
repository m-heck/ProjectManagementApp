# Work Completed
We primarily worked on fixing up the gaps in our project from the previous sprint and get as much of the project done as possible. Unfortunately, we weren't able to get the entire application completed, but we were able to accomplish a lot this sprint.

## Frontend
- Finished the Details modal component. We added the correct fields that a task component would have (name, due data, completed status, and task list) and constructed the modal with Angular Material. This modal shows up when the details button is pressed on a task card and can be closed by clicking outside of the bounds of the modal.
- Made an Add Task modal in a similar way that the Details modal was created. This modal shows up when the button from the Main page is pressed, as well as if the Add New Task option is selected from the sidebar.
- Created a Manage Member Tags modal, accessed from the sidebar. This modal lists the members on the team and the tags that are associated with them. The tags can be clicked to remove and new tags can be inserted with the input field. This modal isn't functional yet, however.
- Created a new Timeline page. The timeline page is routed from the main page when the Timeline button is pressed on the navigation bar. We got the tasks with their due dates, titles, and descriptions to show up. However, we were unable to finish formatting the timeline.
- Restructured our Angular components, splitting up large chunks of code into smaller components (e.g. our Member Tag component). Fixed our frontend to fit the organization of the backend (e.g. team join codes).
- Fixed bugs from our last sprint. For example, moving around the location of the navbar components so that they are connected to the sign in and main pages rather than the general app component in order to get the correct navbar to show up in our new timeline page.

The main features we were unable to complete were complete integration with the backend team and the timeline page.

## Backend

# Frontend Unit Tests
Some of the frontend tests from previous sprints were deleted to accomidate for changes made to our website. Only new frontend unit tests will be included in this document, however.

### Add Task Modal Component
1. Checks for add task modal title
```
    it('should display "New Task" as the modal title', () => {
        cy.mount(AddTaskModalComponent, {});
        cy.get('.modal-title').should('contain.text', 'New Task');
      });
```
2. Tests save button
```
      it('should have a "Save" button', () => {
        cy.mount(AddTaskModalComponent, {});
        cy.get('button').should('have.text', 'Save');
      });
```
3. Tests for task name input field and whether it has the correct type and placeholder
```
      it('should have a "Task name" input field', () => {
        cy.mount(AddTaskModalComponent, {});
        cy.get('[name="taskName"]').should('exist');
        cy.get('[name="taskName"]').should('have.attr', 'type', 'text');
        cy.get('[name="taskName"]').should('have.attr', 'placeholder', 'Task name');
      });
```
4. Checks for due date input field and whether it has the correct type and placeholder
```
      it('should have a "Due date" input field', () => {
        cy.mount(AddTaskModalComponent, {});
        cy.get('[name="dueDate"]').should('exist');
        cy.get('[name="dueDate"]').should('have.attr', 'type', 'date');
        cy.get('[name="dueDate"]').should('have.attr', 'placeholder', 'Due date');
      });
```
5. Checks for add tags input field
```
      it('should have an "Add tags" input field', () => {
        cy.mount(AddTaskModalComponent, {});
        cy.get('[placeholder="New tag"]').should('exist');
      });
```

### Inner Navbar Component
1. Mounts the component with a project name passed into it and checks whether this name was displayed correctly
(in previous sprints, this test checked whether the default "Project Name" was displayed)
```
    it('test project name title', () => {
        cy.mount(InnerNavbarComponent, {
            componentProperties: {
                projectName: 'Test Name',
              },
        });
        cy.get('.navbar-title').should('contain.text', 'Test Name');
    });
```

### Manage Member Tags Component
1. Tests the title of the manage member tags component
```
    it('should display the correct title', () => {
        cy.mount(ManageMemberTagsComponent, {});
      cy.get('.title').should('have.text', 'Manage Tags');
    });
```
2. Tests whether a member tag card is shown for each sample user (4 sample users)
```
    it('should display a member tag for each user', () => {
        cy.mount(ManageMemberTagsComponent, {});
        cy.get('app-member-tags').should('have.length', 4);
      });
```
5. Checks for the save button
```
      it('should display a "Save" button', () => {
        cy.mount(ManageMemberTagsComponent, {});
        cy.get('button').should('contain.text', 'Save');
      });
```

### Member Tags Component
1. Mounts the component with an example member tag "SWE Member" and checks whether it is displayed correctly
```
    it('should display the task name', () => {
        cy.mount(MemberTagsComponent, {
            componentProperties: {
                name: 'SWE Member',
              },
        });
      cy.get('.name').should('have.text', 'SWE Member');
    });
```
2. Same as test 1, but for a different task name
```
    it('should display the task name 2', () => {
        cy.mount(MemberTagsComponent, {
            componentProperties: {
                name: 'Task Runner',
              },
        });
      cy.get('.name').should('have.text', 'Task Runner');
    });
```
### Task Details Modal
1. Tests the due date input field
```
    it('should display the due date input field', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-form-field input[name="dueDate"]').should('exist');
      cy.get('mat-form-field mat-label').contains('Due date');
    });
```
2. Tests the checkbox of completion status field
```
    it('should display the completed checkbox', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-checkbox[name="completedStatus"]').should('exist');
      cy.get('mat-checkbox').contains('Completed');
    });
```
3. Tests the tags field
```
    it('should display the tags input field', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('mat-form-field input[placeholder="New tag"]').should('exist');
      cy.get('mat-form-field mat-label').contains('Add tags');
    });
```
4. Tests the save button
```
    it('should display the save button', () => {
        cy.mount(TaskDetailsModalComponent, {});
      cy.get('button[color="primary"]').should('exist');
      cy.get('button').contains('Save');
    });
```
# Backend Unit Tests

# Backend API Documentation
