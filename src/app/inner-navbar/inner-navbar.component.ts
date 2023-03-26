import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.scss']
})
export class InnerNavbarComponent {
  progress: number[] = [92, 72, 32, 24];

  constructor(private _router: Router) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }

}
