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
The main thing we completed this sprint was create a working a backend api in golang. By doing this, we also created several functions in the backend that allowed this api to function. This api is hosted on local host 3000 and contains a json object in which it consists of user objects each having a username, name, email, phonenumber, email, and project code. This allows for us to identify specific users for future features of our web app. For our previous sprint, we were only able to create a database that was not in the form of an api so it was not able to send and recieve incoming data from the frontend.

Finally, we connected the frontend (local host 4200) to the backend (local host 3000) which is demonstrated through the sign up page. We were able to take all the information a user inputs into the sign up page and call the backend api to add this specific user with the specified properties to the json object. We then confirmed the addition of this user through postman by making a get call on the api to return all the users currently stored in the json.

We were also able to write unit tests for all our backend functions
# 2. List unit tests and Cypress test for frontend
### Cypress Test: End to End Tests
Our Cypress End to End test file includes multiple tests within it. The first test checks that the page of our app can be visited and the page displays correctly. The next one checks that the title is correctly displayed. The third simulates clicking on the Sign Up link and ensures that the new page is correctly displayed. The fourth Cypress test checks that when the Sign Up link is clicked, the new URL is correct
```
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
```

To conduct unit testing, we could have used Angular's Jasmine and Karma testing. However, we decided to use Cypress to test our components because we felt it would be the best fit for our team, allowing us to test the content rendered to the screen easily and effectively.
### Unit Test: signOutButton() function, MainPage Component
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
### GoLang Unit Test
Our Backend Unit tests include multiple tests that test the functions in our main.go that contains the API calls to the front-end. The first test (TestGetUser) checks whether or not the function GetUser gets the users data from the username. Our second test (TestGetUsers) tests the function GetUsers which gets all users currently stored in the API database. Our third test (TestAddUser) tests the function AddUser which adds a user into the API database. Our final test (TestetUserByUsername) tests the function GetUserByUsername which gets the user
### Unit Test: GetUser() function, Gets User from username
Unit tests that calls GetUserByUsername to find a specific user's information based off their username. We tested by making it look for a specific user in our given dataset of users. It checks whether or not the status is OK and then compares it to the expected value of the user's information.
```
func TestGetUser(t *testing.T) {
	// new HTTP request
	req, err := http.NewRequest("GET", "/users/gatoralanw", nil)
	if err != nil {
		t.Fatal(err)
	}

	// new response recorder
	rr := httptest.NewRecorder()
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the getUser function
	getUser(context)

	// check if status is OK
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// create an expected JSON object
	expected := `
		{
			"username": "gatoralanw",
			"name": "Alan",
			"email": "a.wang@ufl.edu",
			"contact": "3525141846",
			"password": "IcantactaullyShowmyPasswordLOL",
			"code": "0000",
		}
	`

	//test to see if it is expected
	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
###Unit Test: GetUsers() function, get all Users from database
Unit Test that checks for all the Users in the database. We preset a JSON with 3 datasets and compare it with the expected values in the Unit Test. The Unit Test checks if the status is OK then compres the expected to the value the function creates.

```
func TestGetUsers(t *testing.T) {
	// new HTTP request
	req, err := http.NewRequest("GET", "/users", nil)
	if err != nil {
		t.Fatal(err)
	}

	// new response recorder
	rr := httptest.NewRecorder()

	// cnew request
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the getUser function
	getUsers(context)

	// check if status is OK
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// create an expected JSON object
	expected := `[
		{
			"username": "gatoralanw",
			"name": "Alan",
			"email": "a.wang@ufl.edu",
			"contact": "3525141846",
			"password": "IcantactaullyShowmyPasswordLOL",
			"code": "0000",
		},
		{
			"username": "TossTheNoodles",
			"name": "Jerry",
			"email": "j.wang@ufl.edu",
			"contact": "4076164313",
			"password": "IcantactaullyShowmyPasswordLOL",
			"code": "0000",
		},
		{
			"username": "Makshiboi",
			"name": "Max",
			"email": "m.huang@ufl.edu",
			"contact": "3523426677",
			"password": "IcantactaullyShowmyPasswordLOL",
			"code": "0000",
		}
]`

	//test to see if it is expected
	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
```
###Unit Test: AddUser() function, add user to the database
Unit Test adds a JSON to the database. We test this function by calling it and then checking for the index and seeing if it was added. The Unit Test calls addUser() then checks if the status is made then compares to see if it got added
```
func TestAddUser(t *testing.T) {
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

	// expected JSON values
	expected := `{
		"username": "Markshiboi",
		"name": "Max",
		"email": "m.huang@ufl.edu",
		"contact": "4076164313",
		"password": "password",
		"code": "0000",
	}`

	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}

	// check that the user was added
	if len(users) == 1 {
		t.Errorf("user was not added to slice: got %v want %v", len(users), 1)
	}

	if users[0].Username == "testuser" {
		t.Errorf("user was not added to slice correctly: got %v want %v", users[0].Username, "testuser")
	}
}
```
func TestGetUserByUsername(t *testing.T) {
	// create a test user
	testUser := user{
		Username: "Juremy",
		Name:     "Jeremy Garcia",
		Email:    "jjraider@gmail.com",
		Contact:  "3525141234",
		Password: "testpassword",
		Code:     "0000",
	}

	// add the test user
	users = append(users, testUser)

	// call the getUserByUsername function
	result, err := getUserByUsername("Juremy")

	// check if returned
	if err != nil {
		t.Errorf("getUserByUsername returned an error: %v", err)
	}

	if result.Username != "Juremy" {
		t.Errorf("getUserByUsername returned the wrong user: got %v, want %v", result, testUser)
	}

	// call the getUserByUsername function
	result, err = getUserByUsername("nonexistentuser")

	// check that the function returned an error
	if err == nil {
		t.Errorf("getUserByUsername did not return an error for a nonexistent user")
	}
}
```
### Unit Test: GetUserByUsername() function, gets user data from database
Unit Test that gets the User by Username to find a specific user's information. It calls getUserByUsername then compares the username to the database. We tested this by creating a user test and added it to the database and checked if the user was in the database. 

# 4. Add documentation for your backend API
In order to use our api you must run the main.go file in your terminal by typing go run main.go. It should then be running on localhost 3000. Our api currently consists of three main methods: getUsers, getUserByUsername, and post. Get users returns a list of every single user in json format stored in the backend and can be accessed using the link localhost:3000/users. Get user by username allows you to look up a specific user by their username and returns that users data in json format. It can be accessed using the link localhost:3000/users/:username with username being the specific username you want to look up. Finally, post allows someone to add a user to the backend database. It takes two parameters the first is the link which is http://localhost:3000/users and the second is the user object itself. The backend expects every user object to contain a username, name, email, phone nmber, password, and project join code property so ensure that the user object you are passing in contains those properties or else post will not add the user properly.

