import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';

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
      tname: "",
      code: ""
  };

  //public password: string = '';
  //public email: string = '';

  constructor(private http: HttpClient, private _router: Router) { }

  //performs the get request
  signInButton(users: {username: string, password: string} ){
    //const fs = require('fs')
    let count = 0;
    let count2 = 0;
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

      //console.log(arr);

      console.log(users.username)
      //see if the username exists
      for(var n = 0; n < arr.length; n++)
      {
        if (arr[n]["username"] == users.username) 
        {
          if(arr[n]["password"] == users.password)
          {
              count2++;
              //console.log(JSON.parse(fs.readFileSync('user_instance.json').toString()))
              //const data = JSON.parse(fs.readFileSync('user_instance.json').toString())
              //data.name = "lol"
          }
          count++;
        }
      }
      if(count == 0)
      {
          alert("Invalid login.");
      }
      else if(count2 == 0)
      {
        alert("Invalid Password.");
      }
      else
      {
          temp.navigate(['/main']);
          alert("Login successful.");
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
