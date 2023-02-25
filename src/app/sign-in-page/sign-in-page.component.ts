import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent {
  title = "Project Management App";

  constructor(private _router: Router) { }


  signUpButton(): void {
    this._router.navigate(['/main']);
    alert("You have been signed up!");
  }

  async addUser() {
  }
}
