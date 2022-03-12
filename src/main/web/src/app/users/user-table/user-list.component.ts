import {Component, OnInit, ViewChild} from '@angular/core';
import {UserTableDataSourceService} from "./user-table-data-source.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status']

  constructor(public userDataSource: UserTableDataSourceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit()
    :
    void {
  }

//   this.dialog.open(OutboundCallScheduleAddEditComponent, {
//     width: '600px',
//     disableClose: true
//   }).afterClosed().subscribe(result => {
//   if (result) {
//     this.dataSource.getAndEmit();
//   }
// });

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
}
