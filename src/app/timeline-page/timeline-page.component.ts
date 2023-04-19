import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent {
  tasks = [
    {
      title: 'Task 1',
      dueDate: new Date('2023-05-01'),
      tags: ['tag1', 'tag2'],
      desc: 'Task 1 description'
    },
    {
      title: 'Task 2',
      dueDate: new Date('2023-05-15'),
      tags: ['tag3', 'tag4'],
      desc: 'Task 2 description'
    },
    {
      title: 'Task 3',
      dueDate: new Date('2023-06-01'),
      tags: ['tag1', 'tag4'],
      desc: 'Task 3 description'
    },
    {
      title: 'Task 4',
      dueDate: new Date('2023-06-15'),
      tags: ['tag2', 'tag3'],
      desc: 'Task 4 description'
    }
  ];
}
