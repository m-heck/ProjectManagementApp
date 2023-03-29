# 1. Detail work you've completed in Sprint 2
### Frontend
This sprint, we started implementing the main features of our app that would be displayed on the main page. These features are:
- Navigation bar
	- This is a new navigation bar that replaces the one that was on the login/sign-up/home page once the user logs in.
	- Displays the name of the project
	- Includes buttons for 
-

### Backend
### GoLang Unit Test
Our backend unit tests include multiple tests that test the functions in our main.go file that contains the API calls to the front-end. The first test (getUserByCode) checks the database of users to see whether or not they have the code. It retrieves the code to find the corresponding username. Our second test (getCodeByUser) retrieves the user data to find the code. Our last test, which we worked on during this sprint, is (updateUserCode). This test updates the user's codes if they want to add, remove or change their code.
### Unit Test: getUserbyCode() function, Gets Code from username
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

###Unit Test: GetCodebyUser() function, get Codes that the User stores
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
###Unit Test: updateUserCode() function, allows users to update the code they have allowing to leave and join rooms
Unit Test that allows users to change their information such as code. This allows them to change codes and leave rooms. We checked it with a value to see if it changeed. 
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

# 4. More Backend API documentation
In order to use our api you must run the main.go file in your terminal by typing go run main.go. It should then be running on localhost 3000. Our api currently consists of three main methods: getUsers, getUserByUsername, and post. Get users returns a list of every single user in json format stored in the backend and can be accessed using the link localhost:3000/users. Get user by username allows you to look up a specific user by their username and returns that users data in json format. It can be accessed using the link localhost:3000/users/:username with username being the specific username you want to look up. Finally, post allows someone to add a user to the backend database. It takes two parameters the first is the link which is http://localhost:3000/users and the second is the user object itself. The backend expects every user object to contain a username, name, email, phone nmber, password, and project join code property so ensure that the user object you are passing in contains those properties or else post will not add the user properly.


