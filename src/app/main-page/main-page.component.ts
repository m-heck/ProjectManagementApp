import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

interface user {
  name: string;
  percent: string;
}

interface task {
  title: string;
  dueDate: string;
  tags: string[];
  desc: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})


export class MainPageComponent {
  users: user[] = [{ name: 'Alan', percent: "23%" }, { name: 'Maren', percent: "76%" },
    { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }, { name: 'Alan', percent: "23%" },
    { name: 'Maren', percent: "76%" }, { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }];

  tasks: task[] = [{ title: 'Finish SWE Homework', dueDate: "03-29-2023", tags: ['programming', 'swe'], desc: "Description." },
    { title: "Take SWE Exam", dueDate: "03-30-2023", tags: ['exam', 'swe', 'project'], desc: "Description." },
    { title: "Start OS project", dueDate: "03-31-2023", tags: ['project', 'os', 'memory management'], desc: "Description." },
    { title: "Buy groceries", dueDate: "03-31-2023", tags: ['food', 'errand','find carpool'], desc: "Description." }  ];

    joinCode = 5555;

  constructor(private _router: Router, private dialogRef: MatDialog) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }

  showAddTask() {
    this.dialogRef.open(AddTaskModalComponent, {
    });
  };
}
