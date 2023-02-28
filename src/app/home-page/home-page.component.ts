import { Component } from '@angular/core';
import usersData from '../../../golang-database/users/users.json'

interface User {
  username: String,
  name: String,
  email: String,
  contact: String,
  password: String
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  name = 'Angular';

  users: User[] = usersData;
}
