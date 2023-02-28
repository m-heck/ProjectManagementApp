import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import usersData from '../../../golang-database/users/users.json'

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent {

  public name: string;
  public phone: string;
  public email: string;
  public password: string;
  public tname: string;
  public code: string;

  constructor(private service: DataService, private _router: Router) { }


  signUpButton() {
    let user = {
      username: "jwang",
      name: "jerry",
      contact: "123857345",
      email: "jerrywang1409",
      password: "lol"
      //username: document.getElementById('username')?.ariaValueText!,
      //name: document.getElementById('name')?.ariaValueText!,
      //contact: document.getElementById('phoneNumber')?.ariaValueText!,
      //email: document.getElementById('email')?.ariaValueText!,
      //password: document.getElementById('password')?.ariaValueText!
    }
    usersData.push(user);
    //my attempt to write the json not sure if it works but we can fix it later


    this.service.submitUser(this.name, this.phone, this.email, this.password, this.code).subscribe(
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

  teamSignUpButton() {
    this.service.submitUser(this.name, this.phone, this.email, this.password, this.code).subscribe(
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


}
