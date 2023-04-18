import { Component } from '@angular/core';

interface user {
  name: string;
  percent: string;
}

@Component({
  selector: 'app-manage-member-tags',
  templateUrl: './manage-member-tags.component.html',
  styleUrls: ['./manage-member-tags.component.scss']
})
export class ManageMemberTagsComponent {
  users: user[] = [{ name: 'Alan', percent: "23%" }, { name: 'Maren', percent: "76%" },
  { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }, { name: 'Alan', percent: "23%" },
  { name: 'Maren', percent: "76%" }, { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }]
}
