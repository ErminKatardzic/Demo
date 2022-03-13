import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersModule} from "./users/users.module";
import {MatDialogModule} from "@angular/material/dialog";
import {DeleteUserComponent} from './users/delete-user/delete-user.component';
import {MatButtonModule} from "@angular/material/button";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {ErrorInterceptor} from "./interceptor/error.interceptor";
import {NotificationComponent} from './notification/notification.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    DeleteUserComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UsersModule,
    MatDialogModule,
    MatButtonModule,
    NgMultiSelectDropDownModule,
    MatSnackBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
