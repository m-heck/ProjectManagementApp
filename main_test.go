package main

import (
	//"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGetUser(t *testing.T) {
	// create a new request
	req, err := http.NewRequest("GET", "/users/gatoralanw", nil)
	if err != nil {
		t.Fatal(err)
	}

	// create a new response recorder
	rr := httptest.NewRecorder()

	// create a new Gin context and set the request
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the getUser function
	getUser(context)

	// check the response status code
	if status := rr.Code; status == http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v, want %v", status, http.StatusOK)
	}

	// check the response body
	expected := `{
		"username": "gatoralanw",
		"name": "Alan",
		"email": "a.wang@ufl.edu",
		"contact": "3525141846",
		"password": "IcantactaullyShowmyPasswordLOL",
		"code": "0000"
	}`
	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v, want %v", rr.Body.String(), expected)
	}
}

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

func TestGetUserByCode(t *testing.T) {
	// Set up test context
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// Mock query parameter
	c.Request = httptest.NewRequest(http.MethodGet, "/users?code=0000", nil)

	// Call the function with the mock context
	getUserbyCode(c)

	// Check if HTTP response status code is correct
	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, w.Code)
	}

}

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
	// t.Errorf("Expected body %q but got %q", expectedBody, recorder.Body.String())
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
