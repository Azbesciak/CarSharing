import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./auth.interceptor";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "../../functional/routing/routing.module";
import {Ng2Webstorage} from "ngx-webstorage";
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import {UiModule} from "../../functional/ui/ui.module";
import {LoginService} from "./login.service";

const COMPONENTS = [
  RegistrationComponent,
  LoginComponent,
  LoginFormComponent,
  LoginDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    RoutingModule, // later to delete
    Ng2Webstorage
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [
    AuthService, LoginService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  entryComponents: [LoginDialogComponent]
})
export class AuthorizationModule { }
