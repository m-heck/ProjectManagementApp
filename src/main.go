package main

import (
	"encoding/json"
	"fmt"
)

const Version = "1.0.1"

// what the username stores
type User struct {
	Name     string
	Email    string
	Contact  json.Number
	Password string
}

// main function
func main() {
	//access directory
	dir := "./"
	db, err := New(dir, nil)
	if err != nil {
		fmt.Println("Error", err)
	}

	//database
	employees := []User{
		{"Alan", "a.wang@ufl.edu", "3525141846", "IcantactaullyShowmyPasswordLOL"},
	}

	for _, value := range employees {
		//adding one user at a time
		db.Write("users", value.Name, User{
			Name:     value.Name,
			Email:    value.Email,
			Contact:  value.Contact,
			Password: value.Password,
		})
	}

	records, err := db.ReadAll("users")
	if err != nil {
		fmt.Println("Error", err)
	}
	fmt.Println(records)

	allusers := []User{}

	for _, f := range records {
		employeeFound := User{}
		if err := json.Unmarshal([]byte(f), &employeeFound); err != nil {
			fmt.Println("Error", err)
		}
		allusers = append(allusers, employeeFound)
	}
	fmt.Println(allusers)
	/*
		if err := db.Delete("user", "john")l err != nil{
			fmt.Println("Error", err)
		}
		if err := db.Delete("user",""); err != nil{
			fmt.Println("Error",err)
			}
	*/

}
