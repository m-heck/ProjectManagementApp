import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsModalComponent } from '../task-details-modal/task-details-modal.component'


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent {
  @Input() title: string;
  @Input() dueDate: string;
  tags: string[] = ['tag', 'tag', 'tag'];
  @Input() desc: string;
  completed: boolean = false;

  constructor(private dialogRef: MatDialog) { }

  showDetails() {
    this.dialogRef.open(TaskDetailsModalComponent, {
      data: {
        title: this.title,
        dueDate: this.dueDate,
        tags: this.tags,
        desc: this.desc
      }
    });
  }


}
