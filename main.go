package main

import (
	//"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type user struct {
	Name     string `json: "name"`
	Password string `json: "password"`
	Email    string `json: "email"`
	Number   int    `json: "number"`
	ID       int    `json: "id"`
}

var users = []user{
	{Name: "Alan", Password: "Kyletrask611", Email: "alanwang611@gmail.com", Number: 3525141846, ID: 1846},
}

func getUsers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, users)
}

func main() {
	router := gin.Default()
	router.GET("/users", getUsers)
	router.Run("localhost: 8080")
}
