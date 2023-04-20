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
This sprint we worked on displaying personalized user data once they login. In other words, once a user logs in the main page will show the name of the project that 
they are specifically working on in the top left corner. Furthermore, the top progress bar will show the name of the user who has logged in and the specific code of 
their team will be displayed in the top left. Most importantly, we were able to display the specific users who are also working on the same project as the user who 
logged in on the side of the page. So, if another user signs up and joins that specific team then that user's name will also show up on the side bar. Furthermore, we 
also created an interactive progress bar. This progress bar will gradually fill up as the user starts to check off their given tasks. Finally, we implemented the add 
task feature so users can add tasks for themselves. When the add task button is clicked the user is prompted to input the specific information about the task and once 
they press save, a corresponding task card will appear in the list.

# Frontend Unit Tests
Some of the frontend tests from previous sprints were deleted to accomidate for changes made to our website. Only new frontend unit tests will be included in this document, however.

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
# Backend Unit Tests
Our backend wrote four more unit test cases that test our functions in our main.go file that contains API calls to the front-end. The first test TestGetTasksByUser gets
 all the tasks for the user selected. It will show which tasks the users have assigned. Our second test TestAddTasktoUser adds tasks to the user. It will only add tasks
  to the team code that the user has. Our third test TestAddMemberToTeamByID adds members to the team by ID. This will check if members can join specific teams through 
 ID. Our final test TestGetUsersInTeams will identify all users in the team by ID. This will allow us to get all the members in the team.
### 1. Unit Test: TestGetTasksByUser() function, Gets Tasks by Username
This code defines a test function TestGetTasksByUser that tests the getTasksByUser function using a Gin router with two test cases: one with a valid username and one with an invalid username. It sends HTTP GET requests with the usernames as parameters and records the response using a test recorder.
```func TestGetTasksByUser(t *testing.T) {
	router := gin.New()
	router.Use(CORSMiddleware())
	router.GET("/users/:username/tasks", getTasksByUser)

	// Test case with a valid username
	req, _ := http.NewRequest("GET", "/users/gatoralanw/tasks", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	// Test case with an invalid username
	req, _ = http.NewRequest("GET", "/users/nonexistentuser/tasks", nil)
	w = httptest.NewRecorder()

	router.ServeHTTP(w, req)

}
```

### 2. Unit Test: AddTaskToUser() function, ads Tasks to Users
Function sends valid and invalid JSON tasks to the addTaskToUser function using a Gin router and assert the expected HTTP status codes, but they are currently commented out.
```
func TestAddTaskToUser(t *testing.T) {
	router := gin.New()
	router.Use(CORSMiddleware())
	router.POST("/users/:username/tasks", addTaskToUser)

	// Test case with a valid username
	taskJSON := `{"title":"Test Task","dueDate":"2023-05-01","tags":["test"],"desc":"Test task description","completed":false}`

	router.ServeHTTP(w, req)

	w = httptest.NewRecorder()

	assert.Equal(t, http.StatusNotFound, w.Code)

	invalidJSON := `{"title":"Test Task","dueDate":"2023-05-01","tags":["test"],"desc":"Test task description","completed":}`
	req, _ = http.NewRequest("POST", "/users/gatoralanw/tasks", bytes.NewBufferString(invalidJSON))
	w = httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
```

### 3. Unit Test: TestAddMemberToTeamByID() function, allows members to join Teams by specific Team ID
This code is a test function that tests adding a member to a team by team ID and username using a Gin router, and it has three test cases: one where a member is added to a valid team ID and username, and two where the team ID or username is invalid, and it records the HTTP response code using a test recorder.

```
func TestAddMemberToTeamByID(t *testing.T) {
	router := gin.New()
	router.Use(CORSMiddleware())
	router.POST("/teams/:id/members/:username", addMemberToTeamByID)

	// Test case with a valid team ID and username
	req, _ := http.NewRequest("POST", "/teams/6969/members/TossTheNoodles", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	// invalid ID
	req, _ = http.NewRequest("POST", "/teams/1234/members/TossTheNoodles", nil)
	w = httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)

	// Invalid User
	req, _ = http.NewRequest("POST", "/teams/6969/members/nonexistentuser", nil)
	w = httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}
```

### 4. Unit Test: GetUsersInTeam() function, gets all the users in the team based on ID
This code is a test function that tests getting the users in a team by team ID using a Gin router. It has two test cases: one where a valid team ID is used to get the users in the team, and one where an invalid team ID is used to get the users, and it records the HTTP response code using a test recorder.

```
func TestGetUsersInTeam(t *testing.T) {
	router := gin.New()
	router.Use(CORSMiddleware())
	router.GET("/teams/:id/members", getUsersInTeam)

	// valid team ID
	req, _ := http.NewRequest("GET", "/teams/6969/members", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	//invalid team ID
	req, _ = http.NewRequest("GET", "/teams/1234/members", nil)
	w = httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}
```

### 5. Backend API Documentation
In order to use our api you must run the main.go file in your terminal by typing go run main.go. It should then be running on localhost 3000. Our api currently consists
 of three main methods: getUsers, getUserByUsername, and post. Get users returns a list of every single user in json format stored in the backend and can be accessed 
 using the link localhost:3000/users. Get user by username allows you to look up a specific user by their username and returns that users data in json format. It can be 
 accessed using the link localhost:3000/users/:username with username being the specific username you want to look up. Finally, post allows someone to add a user to the 
 backend database. It takes two parameters the first is the link which is http://localhost:3000/users and the second is the user object itself. The backend expects 
 every user object to contain a username, name, email, phone number, password, and project join code property so ensure that the user object you are passing in contains 
 those properties or else post will not add the user properly. When looking for a valid login you must pass in username and password parameters into the call request so 
 it can check whether a specific user exists in the backend. Furthermore, an additional function was written in this sprint which is the getUserByCode. This function 
 takes in a project join code and looks through the whole database and returns the users that have matching project join codes in order to determine which users are on 
 the same team.
