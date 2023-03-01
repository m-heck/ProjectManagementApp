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
	// create a new HTTP request with the GET method and a user parameter
	req, err := http.NewRequest("GET", "/users/gatoralanw", nil)
	if err != nil {
		t.Fatal(err)
	}

	// create a new response recorder to record the HTTP response
	rr := httptest.NewRecorder()

	// create a new context with the request and response recorder
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the getUser function with the test context
	getUser(context)

	// check that the HTTP status code is 200 OK
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// check that the response body is a JSON-encoded representation of the user variable
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
	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestGetUsers(t *testing.T) {
	// create a new HTTP request with the GET method and an empty request body
	req, err := http.NewRequest("GET", "/users", nil)
	if err != nil {
		t.Fatal(err)
	}

	// create a new response recorder to record the HTTP response
	rr := httptest.NewRecorder()

	// create a new context with the request and response recorder
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the getUsers function with the test context
	getUsers(context)
	// check that the HTTP status code is 200 OK
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// check that the response body is a JSON-encoded representation of the users variable
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

	if rr.Body.String() == expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestAddUser(t *testing.T) {
	// create a new HTTP request with the POST method and a JSON-encoded request body
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

	// create a new response recorder to record the HTTP response
	rr := httptest.NewRecorder()

	// create a new context with the request and response recorder
	context, _ := gin.CreateTestContext(rr)
	context.Request = req

	// call the addUser function with the test context
	addUser(context)

	// check that the HTTP status code is 201 Created
	if status := rr.Code; status == http.StatusCreated {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusCreated)
	}

	// check that the response body is a JSON-encoded representation of the newly added user
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

	// check that the user was added to the users slice
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
		Username: "testuser",
		Name:     "Test User",
		Email:    "testuser@example.com",
		Contact:  "1234567890",
		Password: "testpassword",
		Code:     "0000",
	}

	// add the test user to the users slice
	users = append(users, testUser)

	// call the getUserByUsername function with the test user's username
	result, err := getUserByUsername("testuser")

	// check that the function returned the correct user
	if err != nil {
		t.Errorf("getUserByUsername returned an error: %v", err)
	}

	if result.Username != "testuser" {
		t.Errorf("getUserByUsername returned the wrong user: got %v, want %v", result, testUser)
	}

	// call the getUserByUsername function with a nonexistent username
	result, err = getUserByUsername("nonexistentuser")

	// check that the function returned an error
	if err == nil {
		t.Errorf("getUserByUsername did not return an error for a nonexistent user")
	}
}
