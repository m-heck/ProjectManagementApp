import { Component } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../../../golang-database/users/users.json'

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent {
  title = "Project Management App";

  constructor(private _router: Router) { }


  signUpButton(): void {
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
    this._router.navigate(['/main']);
    alert("Thank you for signing in");
  }

  async addUser() {
  }
}
