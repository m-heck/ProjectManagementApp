import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {

  progress: number[] = [92, 72, 32, 24];

  constructor(private _router: Router) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }


}
