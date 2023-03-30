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
### Backend
This sprint, we started working on the get calls of our api so the front end is able to use the information from the back end to do certain tasks:
The first task we worked on was getting the login page to correctly work. When the user types in their username the front end will call the backend to see
if that username exists within the database. If it does not then it will throw an error. This is the same case for the password. If the username exists
but the password entered was wrong, then it will throw an error. If both username exists and the password entered was correct then the login will be
successful. The last task we worked on but did not finish was displaying the specific user data once they login. We are currently in the process of 
transferring this data between the components.
# 3. Backend Unit Tests
Our backend unit tests include multiple tests that test the functions in our main.go file that contains the API calls to the front-end. The first test (getUserByCode) checks the database of users to see whether or not they have the code. It retrieves the code to find the corresponding username. Our second test (getCodeByUser) retrieves the user data to find the code. Our last test, which we worked on during this sprint, is (updateUserCode). This test updates the user's codes if they want to add, remove or change their code.
### 1. Unit Test: getUserbyCode() function, Gets Code from username
Unit tests that sets up a test context in which it creates a mock query paramater that calls getUserbyCode and comapares it to the current database and see if it finds the correct user
```func getCodebyUser(c *gin.Context) {
    username := c.Param("username")
    user, err := getUserByUsername(username)
    if err != nil {
        c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
        return
    }
    c.IndentedJSON(http.StatusOK, gin.H{"code": user.Code})
}
### 2. Unit Test: GetCodebyUser() function, get Codes that the User stores
Unit Test that checks in the database for all users and looks for a specific user and retrieves all codes for that user. IT checks the status and whether or not it matches the expected value
```
func TestGetCodebyUser(t *testing.T) {
	// Set up router and add route
	router := gin.New()
	router.GET("/users/:username/code", getCodebyUser)

	// Create a new request for a user's code
	req, err := http.NewRequest("GET", "/users/gatoralanw/code", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a response recorder
	recorder := httptest.NewRecorder()

	// Send the request to the server
	router.ServeHTTP(recorder, req)

	// Check the response status code is 200 OK
	if recorder.Code != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, recorder.Code)
	}

	// Check the response body contains the expected code
	expectedBody := `{"code":"0000"}`
	if recorder.Body.String() == expectedBody {
		t.Errorf("Expected body %q but got %q", expectedBody, recorder.Body.String())
	}
}
```

### 3. Unit Test: updateUserCode() function, allows users to update the code they have allowing to leave and join rooms
Unit Test that allows users to change their information such as code. This allows them to change codes and leave rooms. We checked it with a value to see if it changed.

```
func TestUpdateUserCode(t *testing.T) {
	// Initialize Gin context
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// new HTTP request
	requestBody := `{
		"username": "Markshiboi",
		"name": "Max",
		"email": "m.huang@ufl.edu",
		"contact": "4076164313",
		"password": "password",
		"code": "0000",
	}`
	req, err := http.NewRequest("POST", "/users", strings.NewReader(requestBody))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// new response recorder
	rr := httptest.NewRecorder()

	// new context
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	//call addUser function
	addUser(context)

	// check if status is made
	if status := rr.Code; status == http.StatusCreated {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusCreated)
	}
	// Mock the request body
	//updateUser := user{Code: "1234"}
	//req, _ := http.NewRequest(http.MethodPut, "/users/gatoralanw/code", bytes.NewBuffer(reqBody))
	//req.Header.Set("Content-Type", "application/json")
	//c.Request = req

	// Call the function with the mock context
	updateUserCode(c)

	// Assert the HTTP response status code
	if w.Code == http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, w.Code)
	}

	// Check the response body contains the expected message
	//expectedBody := `{"message":"Sure code updated","user":{"username":"gatoralanw","name":"Alan","email":"a.wang@ufl.edu","contact":"3525141846","password":"IcantactaullyShowmyPasswordLOL","code":"1234"}}`
	//if recorder.Body.String() == expectedBody {
	//	t.Errorf("Expected body %q but got %q", expectedBody, recorder.Body.String())
	//}

	// Check the user's code has been updated
	found := false
	for _, u := range users {
		if u.Username == "gatoralanw" && u.Code == "1234" {
			found = true
			break
		}
	}
	if found {
		t.Errorf("User's code not updated")
	}
}


# 4. Backend API Documentation
In order to use our api you must run the main.go file in your terminal by typing go run main.go. It should then be running on localhost 3000. Our api currently consists of three main methods: getUsers, getUserByUsername, and post. Get users returns a list of every single user in json format stored in the backend and can be accessed using the link localhost:3000/users. Get user by username allows you to look up a specific user by their username and returns that users data in json format. It can be accessed using the link localhost:3000/users/:username with username being the specific username you want to look up. Finally, post allows someone to add a user to the backend database. It takes two parameters the first is the link which is http://localhost:3000/users and the second is the user object itself. The backend expects every user object to contain a username, name, email, phone nmber, password, and project join code property so ensure that the user object you are passing in contains those properties or else post will not add the user properly. When looking for a valid login you must pass in username and password parameters into the call request
so it can check whether a specific user exists in the backend.


# 5. Notes
- One of our commands auto-generated a very long packagelock JSON file that was about 20k additions long. This has been deleted, please ignore the ~20k additions and deletions that resulted from it. 
