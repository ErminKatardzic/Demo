import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserMainComponent} from "./users/user-main/user-main.component";

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserMainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
