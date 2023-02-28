import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  showComponent = true;
  constructor(private router: Router) {
    // used to turn off pre-login-navbar after login
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showComponent = !router.url.startsWith('/main');
      }
    });
  }
}
