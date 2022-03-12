import {Component, OnInit, ViewChild} from '@angular/core';
import {UserTableDataSourceService} from "./user-table-data-source.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {deepCopy} from "../../util/deep-copy";
import {EditPermissionsComponent} from "../edit-permissions/edit-permissions.component";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status', 'actions']

  constructor(public userDataSource: UserTableDataSourceService,
              private dialog: MatDialog
  ) {
  }

  openCreateUserDialog() {
    this.dialog.open(CreateUserComponent, {
      width: '600px'
    }).afterClosed().subscribe(result => {
        if (result) {
          // show success message
          this.userDataSource.refreshData();
        } else {
          // show error message
        }
      }
    );
  }

  openDeleteUserDialog(user) {
    this.dialog.open(DeleteUserComponent, {
      width: '600px',
      data: user
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userDataSource.refreshData();
      }
    })
  }

  openEditUserDialog(user) {
    this.dialog.open(EditUserComponent, {
      width: '600px',
      data: deepCopy(user)
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userDataSource.refreshData();
      }
    })
  }

  openEditPermissionsDialog(user) {
    this.dialog.open(EditPermissionsComponent, {
      width: '800px',
      data: deepCopy(user)
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userDataSource.refreshData();
      }
    })
  }
}
