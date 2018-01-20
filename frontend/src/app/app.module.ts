import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DataService} from "./functional/data/data.service";
import {RoutingModule} from "./functional/routing/routing.module";
import {FunctionalModule} from "./functional/functional.module";
import {MainModule} from "./main/main.module";
import {AuthInterceptor} from "./main/authorization/auth.interceptor";
import {ResponseObserver} from "./functional/data/response-observer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FunctionalModule,
    RoutingModule,
    MainModule,
  ],
  providers: [DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseObserver,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
