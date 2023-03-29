import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
})
export class TaskDetailsModalComponent implements OnInit{
  title;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {
    this.title = data.title
  }

  ngOnInit(): void { }
}
