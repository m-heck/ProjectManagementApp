import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team-sign-in-page',
  templateUrl: './team-sign-in-page.component.html',
  styleUrls: ['./team-sign-in-page.component.scss']
})
export class TeamSignInPageComponent {

  public password: string = '';
  public email: string = '';

  constructor(private _router: Router, private service: DataService) { }

  loginButton(): void {
    this.service.userLogin(this.email, this.password).subscribe(
      response => {
        console.log('API response to submitUser:', response);
      },
      error => {
        console.error('API error to submitUser:', error);
      }
    );

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
