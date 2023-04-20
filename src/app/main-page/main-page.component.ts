import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { person } from '../team-sign-in-page/team-sign-in-page.component'
import { task } from '../add-task-modal/add-task-modal.component'

interface user {
  username: string;
  name: string;
  email: string;
  contact: string;
  password: string;
  code: string;
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

  /* users: user[] = [{ name: 'Alan', percent: "23%" }, { name: 'Maren', percent: "76%" },
    { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }, { name: 'Alan', percent: "23%" },
    { name: 'Maren', percent: "76%" }, { name: 'Jerry', percent: "45%" }, { name: 'Max', percent: "100%" }]; */
    users: user[] = [];
    
  tasks: task[] = [{ title: 'Finish SWE Homework', dueDate: "03-29-2023", tags: ['programming', 'swe'], desc: "Description." },
    { title: "Take SWE Exam", dueDate: "03-30-2023", tags: ['exam', 'swe', 'project'], desc: "Description." },
    { title: "Start OS project", dueDate: "03-31-2023", tags: ['project', 'os', 'memory management'], desc: "Description." },
    { title: "Buy groceries", dueDate: "03-31-2023", tags: ['food', 'errand','find carpool'], desc: "Description." }  ];

    joinCode = person.code;

  constructor(private _router: Router, private dialogRef: MatDialog) { 
    this.findGroupMates();
  }

  getTaskCount(): number {
    return this.tasks.length;
  }
  
  findGroupMates() : void {
    fetch('http://localhost:3000/users')
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => {
      for(var i in myJson)
      {
        
        if(myJson[i]["code"] == person.code)
        {
          this.users.push({username: myJson[i]["username"],
            name: myJson[i]["name"],
            email: myJson[i]["email"],
            contact: myJson[i]["contact"],
            password: myJson[i]["password"],
            code: myJson[i]["code"],
            percent: "76%"});
        }
      }



      //console.log(users.username)
      //see if the username exists
       /* for(var n = 0; n < arr.length; n++)
      {
        if (arr[n]["username"] == users.username) 
        {
          if(arr[n]["password"] == users.password)
          {
            validPassword = true;
            break;
          }
        }
      }  */
    });
}

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }

  showAddTask() {
    this.dialogRef.open(AddTaskModalComponent, {
    });
    //window.location.reload();
    this.tasks.push({title: task.title,
      dueDate: task.dueDate,
      tags: task.tags,
      desc: "Description"});
  };
  
  completedTaskCount: number = 0;


updateProgress() {
  const tasksCount = this.getTaskCount();
  const progress = this.completedTaskCount * 100 / tasksCount;
  return progress;
}
  
handleCheckboxChanged(event: {index: number, completed: boolean}) {
  const progressBarIncrement = 25;
  let progressbar = 0;
  
  if (event.completed) {
    this.completedTaskCount++;
    progressbar += progressBarIncrement;
  } else {
    this.completedTaskCount--;
    progressbar -= progressBarIncrement;
  }

  this.updateProgress()
}

}
