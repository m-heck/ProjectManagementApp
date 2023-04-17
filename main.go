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

type Team struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

// Update the user struct to include the new structs as fields
type user struct {
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Contact  string `json:"contact"`
	Password string `json:"password"`
	Code     string `json:"code"`
	Teams    []Team `json:"teams"`
	Tasks    []Task `json:"tasks"`
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

	//should be != but for unit test cases
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

func getUserbyCode(c *gin.Context) {
	codes := c.QueryArray("code")
	matchedUsers := []user{}

	for _, u := range users {
		for _, queryCode := range codes {
			if u.Code == queryCode {
				matchedUsers = append(matchedUsers, u)
			}
		}
	}

	if len(matchedUsers) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No users found with the given code(s)"})
		return
	}

	c.JSON(http.StatusOK, matchedUsers)
}

func getCodebyUser(c *gin.Context) {
	username := c.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"code": user.Code})
}

func updateUserCode(c *gin.Context) {
	username := c.Param("username")
	var updateUser user

	if err := c.ShouldBindJSON(&updateUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	// Find the user to update by their username
	for i := 0; i < len(users); i++ {
		if users[i].Username == username {
			users[i].Code = updateUser.Code

			c.IndentedJSON(http.StatusOK, gin.H{"message": "User code updated", "user": users[i]})
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
}

func getTeamsByUser(c *gin.Context) {
	username := c.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, user.Teams)
}

func addTeamToUser(c *gin.Context) {
	username := c.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	var newTeam Team
	if err := c.BindJSON(&newTeam); err != nil {
		return
	}

	user.Teams = append(user.Teams, newTeam)

	c.IndentedJSON(http.StatusCreated, newTeam)
}

func getTasksByUser(c *gin.Context) {
	username := c.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, user.Tasks)
}

func addTaskToUser(c *gin.Context) {
	username := c.Param("username")
	user, err := getUserByUsername(username)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	var newTask Task
	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	user.Tasks = append(user.Tasks, newTask)

	c.IndentedJSON(http.StatusCreated, newTask)
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
	router.GET("/users/:username/teams", getTeamsByUser)
	router.POST("/users/:username/teams", addTeamToUser)
	router.GET("/users/:username/tasks", getTasksByUser)
	router.POST("/users/:username/tasks", addTaskToUser)
	router.Run("localhost:3000")
}
