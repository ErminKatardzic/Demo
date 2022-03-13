import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserTableDataSourceService} from "./user-table-data-source.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {deepCopy} from "../../util/deep-copy";
import {EditPermissionsComponent} from "../edit-permissions/edit-permissions.component";
import {MatPaginator} from "@angular/material/paginator";
import {UserFilterComponent} from "../user-filter/user-filter.component";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {UserDTO} from "../../../generated/model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(UserFilterComponent) filter: UserFilterComponent;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserDTO>;

  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status', 'actions']

  constructor(public userDataSource: UserTableDataSourceService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  ngAfterViewInit() {
    this.userDataSource.setPaginator(this.paginator);
    this.userDataSource.setFilter(this.filter);
    this.userDataSource.setSort(this.sort);
    this.table.dataSource = this.userDataSource;
  }

  openCreateUserDialog() {
    this.dialog.open(CreateUserComponent, {
      width: '600px'
    }).afterClosed().subscribe(result => {
        if (result) {
          this.refreshDataAndShowPopup();
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
        this.refreshDataAndShowPopup();
      }
    })
  }

  openEditUserDialog(user) {
    this.dialog.open(EditUserComponent, {
      width: '600px',
      data: deepCopy(user)
    }).afterClosed().subscribe(result => {
      if (result) {
        this.refreshDataAndShowPopup();
      }
    })
  }

  openEditPermissionsDialog(user) {
    this.dialog.open(EditPermissionsComponent, {
      width: '800px',
      data: deepCopy(user)
    }).afterClosed().subscribe(result => {
      if (result) {
        this.refreshDataAndShowPopup();
      }
    })
  }

  private refreshDataAndShowPopup() {
    this.userDataSource.refreshData();
    this.snackBar.open("Action Successful!", '', {
      duration: 3000,
      panelClass: 'green-snackbar'
    });
  }
}
