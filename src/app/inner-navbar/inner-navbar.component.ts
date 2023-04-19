import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TeamSignInPageComponent } from '../team-sign-in-page/team-sign-in-page.component';
import * as myUser from '..//user_instance';
import { Input } from '@angular/core';


interface User {
  username: "",
  name: "",
  email: "",
  contact: "",
  password: "",
  code: ""
}

@Component({
  selector: 'app-inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.scss']
})
export class InnerNavbarComponent {
  @Input() progress: number = 0;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private router: Router) {}

  signOutButton(): void {
    this.router.navigate(['']);
    alert("You have logged out.");
  }

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

  goToTimeline() {
    this.router.navigate(['/timeline']);
  }

  showMain() {
    this.router.navigate(['/main']);
  }

  //create an users array from the json object
  //username: String = myUser.user_instance.
  //hello: number = myUser.user_instance.
}
