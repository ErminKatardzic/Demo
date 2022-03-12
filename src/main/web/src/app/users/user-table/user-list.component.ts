import {Component, OnInit, ViewChild} from '@angular/core';
import {UserTableDataSourceService} from "./user-table-data-source.service";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status']

  constructor(public userDataSource: UserTableDataSourceService) {
  }

  ngOnInit(): void {
  }

}
