import { Component } from '@angular/core';
import { Router } from '@angular/router';

export const task = {
  title: "Clean the House",
  desc: " ",
  dueDate: "04-19-2023",
  tags: [" "],
  completed: " ",
};

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {

  title = " ";
  desc = " ";
  dueDate = " ";
  tags = [" "];
  completed = " ";

  constructor(private _router: Router) { }

  addTask(tasks: {taskName: string, dueDate: string, listOfTags: string[]}){
    task.title = tasks.taskName;
    task.dueDate = tasks.dueDate;
    task.tags = tasks.listOfTags;
    console.log(task.title)
    console.log(task.dueDate)
    console.log(task.tags)
    
  }

  get Title() {
    return this.title;
  }

  get DueDate() {
    return this.dueDate;
  }

  get Tags() {
    return this.tags;
  }


  
}
