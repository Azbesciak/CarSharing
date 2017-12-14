import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AuthorizationModule} from "./authorization/authorization.module";

@NgModule({
  imports: [
    CommonModule,
    AuthorizationModule
  ],
  exports: [AuthorizationModule],
  declarations: [HomeComponent]
})
export class MainModule { }
