import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { DataService } from '../data.service';
//import { HttpClient } from '@angular/common/http';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';
//import * as fs from "fs";

export const person = {
  username: " ",
  name: "",
  phone: "",
  email: "",
  password: "",
  tname: "",
  code: ""
};



declare var require: any;
@Component({
  selector: 'app-team-sign-in-page',
  templateUrl: './team-sign-in-page.component.html',
  styleUrls: ['./team-sign-in-page.component.scss']
})

export class TeamSignInPageComponent {
  person = {
      username: " ",
      name: "",
      phone: "",
      email: "",
      password: "",
      code: ""
  };

  //public password: string = '';
  //public email: string = '';

  constructor(private _router: Router) { }

  //performs the get request
  signInButton(users: {username: string, password: string} ){

    //const fs = require('fs')
    let validPassword = false;
    let validUsername = false;
    const temp = this._router;

    fetch('http://localhost:3000/users')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var arr = [];
      for(var i in myJson)
      {
        arr.push(myJson[i]);
      }

      
      //see if the username exists
      for(var n = 0; n < arr.length; n++)
      {
        if (arr[n]["username"] == users.username) 
        {
          if(arr[n]["password"] == users.password)
          {
            validPassword = true;
            break;
          }
        }
      }


      if (validPassword) {
        person.username = arr[n]["username"];
        person.name = arr[n]["name"];
        person.phone = arr[n]["contact"];
        person.email = arr[n]["email"];
        person.password = arr[n]["password"];
        person.tname = arr[n]["teamname"];
        person.code = arr[n]["code"];

        temp.navigate(['/main']);
        alert("Login successful.");
      }
      else if (validUsername) {
        alert("Invalid password.");
      }
      else {
        alert("Invalid login.");
      }

    });
  }


  loginButton(): void {
    /*
    this.service.userLogin(this.email, this.password).subscribe(
      response => {
        console.log('API response to submitUser:', response);
      },
      error => {
        console.error('API error to submitUser:', error);
      }
    );*/

    // should check if this is a valid login
    var valid: boolean = true;

    if (valid) {
      this._router.navigate(['/main']);
      alert("Login successful.");
    }
    else {
      alert("Invalid login.");
    }
    
  }
}
