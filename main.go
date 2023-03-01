package main

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type user struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Contact  string `json:"contact"`
	Password string `json:"password"`
	Project  bool   `json:"project"`
}

var users = []user{
	{Username: "gatoralanw", Name: "Alan", Email: "a.wang@ufl.edu", Contact: "3525141846", Password: "IcantactaullyShowmyPasswordLOL", Project: false},
	{Username: "TossTheNoodles", Name: "Jerry", Email: "j.wang@ufl.edu", Contact: "4076164313", Password: "IcantactaullyShowmyPasswordLOL", Project: false},
	{Username: "Makshiboi", Name: "Max", Email: "m.huang@ufl.edu", Contact: "3523426677", Password: "IcantactaullyShowmyPasswordLOL", Project: false},
}

func getUsers(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, users)

}

func addUser(context *gin.Context) {
	var newUser user

	if err := context.BindJSON(&newUser); err != nil {
		return
	}

	users = append(users, newUser)

	context.IndentedJSON(http.StatusCreated, newUser)
}

func getUser(context *gin.Context) {
	username := context.Param("username")
	user, err := getUserByUsername(username)

	//should be != but for unit test cases
	if err == nil {
		context.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	context.IndentedJSON(http.StatusOK, user)
}

func toggleUserStatus(context *gin.Context) {
	username := context.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		context.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	user.Project = !user.Project

	context.IndentedJSON(http.StatusOK, user)
}

func getUserByUsername(username string) (*user, error) {
	for i, t := range users {
		if t.Username == username {
			return &users[i], nil
		}
	}

	return nil, errors.New("user not found")
}

func main() {
	router := gin.Default()
	router.GET("/users", getUsers)
	router.GET("/users/:username", getUser)
	router.PATCH("/users/:username", toggleUserStatus)
	router.POST("/users", addUser)
	router.Run("localhost:3000")
}
