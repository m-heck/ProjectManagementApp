import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private _router: Router) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }

}
