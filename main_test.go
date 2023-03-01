package main

import (
	//"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"testing"
)

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
		"project": false
	}
]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
