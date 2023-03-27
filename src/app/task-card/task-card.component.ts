import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() title: string;
  @Input() dueDate: string;
  @Input() tags: string[];
  completed: boolean = false;

  showDetails() {
    alert("Details to be shown here...");
  }
}
