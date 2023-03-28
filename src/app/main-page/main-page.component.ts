import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface user {
  name: string;
  percent: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent {

  users: user[] = [{ name: 'Alan', percent: "23%" }, { name: 'Maren', percent: "76%" }, { name: 'Jerry', percent: "45%" }, {name: 'Max', percent: "100%"}];

  constructor(private _router: Router) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }
}
