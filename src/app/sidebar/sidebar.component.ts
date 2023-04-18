import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { ManageMemberTagsComponent } from '../manage-member-tags/manage-member-tags.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { DialogService } from '../../app/dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    DialogService, MatDialog
 ],
})
export class SidebarComponent {

  constructor(private _router: Router, private dialogRef: MatDialog) { }

  signOutButton(): void {
    this._router.navigate(['']);
    alert("You have logged out.");
  }

  showManageTags() {
    this.dialogRef.open(ManageMemberTagsComponent, {
    });
  };

  showAddTask() {
    this.dialogRef.open(AddTaskModalComponent, {
    });
  }
}
