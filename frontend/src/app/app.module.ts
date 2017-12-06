import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./data/data.service";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {RoutingModule} from "./routing/routing.module";
import {AuthorizationModule} from "./authorization/authorization.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RoutingModule,
    AuthorizationModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
