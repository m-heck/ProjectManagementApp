import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent {

  /*
  public username: string = '';
  public name: string = '';
  public phone: string = '';
  public email: string = '';
  public password: string = '';
  public tname: string = '';
  public code: string = '';
  constructor(private service: DataService, private _router: Router) { }
  */

  constructor(private http: HttpClient, private _router: Router) { }

  signUpButton(users: {username: string, name: string, phonenumber: string, email: string, password: string, teamname: string, code: string} ){
    var count = 0;
    fetch('http://localhost:3000/users')
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => {
      for(var i in myJson)
      {
        //console.log(myJson[i]["code"])
        //console.log(users.code)
        if(myJson[i]["code"] == users.code)
        {
          users.teamname = myJson[i]["teamname"];
          count = count + 1;
          break;
        }
      }
      console.log(count)
      if(count == 0)
      {
        const message = "Invalid join code!";
        alert(message);
      }
      else
      {
        console.log(users);
        this.http.post('http://localhost:3000/users', users)
        .subscribe((res) => {
          console.log(res);
        });

      if (true) {
        //this._router.navigate(['/main']);
      }
      const message = "You have been signed up!";
      alert(message);
      }
      //console.log(users.username)

      //see if the username exists
      /* for(var n = 0; n < arr.length; n++)
      {
        if (arr[n]["username"] == users.username) 
        {
          if(arr[n]["password"] == users.password)
          {
            validPassword = true;
            break;
          }
        }
      } */
    });
  }

  teamSignUpButton(users: {username: string, name: string, phonenumber: string, email: string, password: string, teamname: string, code: string}){
    users.code = Math.floor(1000 + Math.random() * 9000).toString()
    console.log(users.code)
    console.log(users);
    this.http.post('http://localhost:3000/users', users)
    .subscribe((res) => {
      console.log(res);
    });
    //this._router.navigate(['/main']);
    const message = "your account has been created and the team" + users.teamname + " has been created!";
    alert(message);
  }
  
  /*
  signUpButton() {
    this.service.submitUser(this.username, this.name, this.phone, this.email, this.password, this.code).subscribe(
      response => {
        console.log('API response to submitUser:', response);
      },
      error => {
        console.error('API error to submitUser:', error);
      }
    );

    if (true) {
      this._router.navigate(['/main']);
    }
    const message = this.name + " has been signed up!";
    alert(message);

  }
  */

  /*
  teamSignUpButton() {
    this.service.submitUser(this.username, this.name, this.phone, this.email, this.password, this.code).subscribe(
      response => {
        console.log('API response to submitUser:', response);
      },
      error => {
        console.error('API error to submitUser:', error);
      }
    );
    this.service.submitTeam(this.tname, this.code).subscribe(
      response => {
        console.log('API response to submitTeam:', response);
      },
      error => {
        console.error('API error to submitTeam:', error);
      }
    );
    this._router.navigate(['/main']);

    const message = this.name + " has been signed up!";
    alert(message);
  }
  */
}
