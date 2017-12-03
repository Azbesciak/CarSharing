import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./data/data.service";
import { RegistrationComponent } from './authorization/registration/registration.component';
import { LoginComponent } from './authorization/login/login.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {RoutingModule} from "./routing/routing.module";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
