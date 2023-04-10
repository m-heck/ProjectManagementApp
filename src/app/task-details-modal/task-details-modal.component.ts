import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
})
export class TaskDetailsModalComponent implements OnInit{
  title;
  desc;
  dueDate;
  tags;
  completed;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {
    this.title = data.title;
    this.desc = data.desc;
    this.dueDate = data.dueDate;
    this.tags = data.tags;
    this.completed = data.completed;
  }

  ngOnInit(): void { }
}
