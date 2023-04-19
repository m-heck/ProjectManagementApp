import { Component } from '@angular/core';

interface user {
  name: string;
  tags: string[];
}

@Component({
  selector: 'app-manage-member-tags',
  templateUrl: './manage-member-tags.component.html',
  styleUrls: ['./manage-member-tags.component.scss']
})
export class ManageMemberTagsComponent {
  users: user[] = [{ name: 'Alan', tags:['programming', 'swe', 'find carpool', 'sports'] }, { name: 'Maren', tags:['exam', 'os', 'swe', 'armadillo'] },
    { name: 'Jerry', tags: ['project', 'swe', 'griddy', 'errand'] }, { name: 'Max', tags: ['food', 'swe', 'programming', 'memory management'] }];
}
