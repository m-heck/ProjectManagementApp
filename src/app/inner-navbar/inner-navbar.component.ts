import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TeamSignInPageComponent } from '../team-sign-in-page/team-sign-in-page.component';

interface User {
  username: String,
  name: String,
  email: String,
  contact: String,
  password: String
}

@Component({
  selector: 'app-inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.scss']
})
export class InnerNavbarComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router: Router) {}

  signOutButton(): void {
    this.router.navigate(['']);
    alert("You have logged out.");
  }

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

  //create an users array from the json object
  //user: User = usersData;
}
