import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


export const task = {
  title: " ",
  desc: " ",
  dueDate: " ",
  tags: [" "],
  completed: " ",
};

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.scss']
})

export class TaskDetailsModalComponent implements OnInit{
  title = " ";
  desc = " ";
  dueDate = " ";
  tags = [" "];
  completed = " ";

  constructor(private _router: Router) { }
  

  addTask(tasks: {taskname: string, dueDate: string, listOfTags: string[]}){
    task.title = tasks.taskname;
    task.dueDate = tasks.dueDate;
    task.tags = tasks.listOfTags;
    
  }

  /*
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {
    this.title = data.title;
    this.desc = data.desc;
    this.dueDate = data.dueDate;
    this.tags = data.tags;
    this.completed = data.completed;
  }*/

  ngOnInit(): void { }
}
