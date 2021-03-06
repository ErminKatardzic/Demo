import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user-table/user-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {UserMainComponent} from './user-main/user-main.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {EditUserComponent} from './edit-user/edit-user.component';
import {MatSelectModule} from "@angular/material/select";
import {EditPermissionsComponent} from './edit-permissions/edit-permissions.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserFilterComponent } from './user-filter/user-filter.component';
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    UserListComponent,
    UserMainComponent,
    CreateUserComponent,
    EditUserComponent,
    EditPermissionsComponent,
    UserFilterComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        NgMultiSelectDropDownModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatSortModule
    ]
})
export class UsersModule {
}
