package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type user struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Contact  string `json:"contact"`
	Password string `json:"password"`
}

var users = []user{
	{Username: "gatoralanw", Name: "Alan", Email: "a.wang@ufl.edu", Contact: "3525141846", Password: "IcantactaullyShowmyPasswordLOL"},
	{Username: "gatoralanw", Name: "Jerry", Email: "j.wang@ufl.edu", Contact: "4076164313", Password: "IcantactaullyShowmyPasswordLOL"},
	{Username: "gatoralanw", Name: "Max", Email: "m.huang@ufl.edu", Contact: "3523426677", Password: "IcantactaullyShowmyPasswordLOL"},
}

func getUsers(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, users)

}

//func addTodo(context )

func main() {
	router := gin.Default()
	router.GET("/users", getUsers)
	router.Run("localhost:3000")
}
