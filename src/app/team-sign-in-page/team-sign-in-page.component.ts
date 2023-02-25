import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-sign-in-page',
  templateUrl: './team-sign-in-page.component.html',
  styleUrls: ['./team-sign-in-page.component.scss']
})
export class TeamSignInPageComponent {

  constructor(private _router: Router) { }

  loginButton(): void {
    this._router.navigate(['/main']);
  }

  async addUser() {
  }
}
