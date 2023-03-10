import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pre-login-navbar',
  templateUrl: './pre-login-navbar.component.html',
  styleUrls: ['./pre-login-navbar.component.scss']
})
export class PreLoginNavbarComponent {
  activeButton = 'Home';
  active(x: string) {
    this.activeButton = x;
  }
}
