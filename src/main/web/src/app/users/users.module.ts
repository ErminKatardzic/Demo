import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user-table/user-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {UserMainComponent} from './user-main/user-main.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserMainComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class UsersModule {
}
