import { Component } from '@angular/core';
import usersData from '../../../golang-database/users/users.json'

interface User {
  name: String,
  email: String,
  contact: Number,
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
