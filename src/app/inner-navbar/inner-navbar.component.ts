import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';



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
}
