package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	fmt.Println("Go MySQL Tutorial")

	//creates the connection
	db, err := sql.Open("mysql", "username:password@tcp(127.0.0.1:3306)/projectmanagmentapp")

	// handles the error if there is one when connecting
	if err != nil {
		panic(err.Error())
	}

	// does not close until after the main has finished executing
	defer db.Close()

}
