import {Component, OnInit, ViewChild} from '@angular/core';
import {UserTableDataSourceService} from "./user-table-data-source.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status', 'actions']

  constructor(public userDataSource: UserTableDataSourceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit()
    :
    void {
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
}
