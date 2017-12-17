import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./functional/data/data.service";
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "./functional/routing/routing.module";
import {FunctionalModule} from "./functional/functional.module";
import {MainModule} from "./main/main.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FunctionalModule,
    RoutingModule,
    MainModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
