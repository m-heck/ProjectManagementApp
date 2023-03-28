import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent {

  names: string[] = ['May', 'June', 'July'];

  constructor(private _router: Router) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }
}
