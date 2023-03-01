package main

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

type user struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Contact  string `json:"contact"`
	Password string `json:"password"`
	Code     string `json:"code"`
}

var users = []user{
	{Username: "gatoralanw", Name: "Alan", Email: "a.wang@ufl.edu", Contact: "3525141846", Password: "IcantactaullyShowmyPasswordLOL", Code: "0000"},
	{Username: "TossTheNoodles", Name: "Jerry", Email: "j.wang@ufl.edu", Contact: "4076164313", Password: "IcantactaullyShowmyPasswordLOL", Code: "0000"},
	{Username: "Makshiboi", Name: "Max", Email: "m.huang@ufl.edu", Contact: "3523426677", Password: "IcantactaullyShowmyPasswordLOL", Code: "0000"},
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

	if err != nil {
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

	user.Code = "9999"

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
	/* mux := http.NewServeMux()
	mux.HandleFunc("/plm/cors", Cors)
	http.ListenAndServe(":4200", mux) */
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/users", getUsers)
	router.GET("/users/:username", getUser)
	router.PATCH("/users/:username", toggleUserStatus)
	router.POST("/users", addUser)
	router.Run("localhost:3000")
}
