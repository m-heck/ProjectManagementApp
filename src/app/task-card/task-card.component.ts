import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsModalComponent } from '../task-details-modal/task-details-modal.component'
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent {
  @Input() title: string;
  @Input() dueDate: string;
  @Input() tags: string[];
  @Input() desc: string;
  @Input() taskIndex: number;
  @Output() checkboxToggle = new EventEmitter<{index: number, completed: boolean}>();
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

 
  onCheckboxChange(){
    this.checkboxToggle.emit({index: this.taskIndex, completed: this.completed});
  }

}
