import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
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

  constructor(private http: HttpClient){


  }

  signUpButton(users: {username: string, name: string, phonenumber: string, email: string, password: string, code: string} ){
    console.log(users);
    this.http.post('http://localhost:3000/users', users)
    .subscribe((res) => {
      console.log(res);
    });
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
