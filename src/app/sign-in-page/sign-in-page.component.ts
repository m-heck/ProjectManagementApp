import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent {

  constructor(private service: DataService, private _router: Router) { }

  public name: string = '';
  public phone: string = '';
  public email: string = '';
  public password: string = '';
  public tname: string = '';
  public code: string = '';


  signUpButton() {
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

    //if (this.name == 'Max') {
      this._router.navigate(['/main']);
    //}
    alert("You have been signed up!");
  }


}
