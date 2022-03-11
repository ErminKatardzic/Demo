import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelloComponent} from "./hello-component/hello.component";

const routes: Routes = [
  {path: '', redirectTo: '/hello-world', pathMatch: 'full'},
  {path: 'hello-world', component: HelloComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
