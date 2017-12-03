import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "../authorization/registration/registration.component";
import {LoginComponent} from "../authorization/login/login.component";


const appRoutes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: "login", pathMatch: 'full'}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
