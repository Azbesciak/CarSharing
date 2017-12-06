import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "../routing/routing.module";
import {Ng2Webstorage} from "ngx-webstorage";

const COMPONENTS = [
  RegistrationComponent,
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RoutingModule, // later to delete
    Ng2Webstorage
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class AuthorizationModule { }
