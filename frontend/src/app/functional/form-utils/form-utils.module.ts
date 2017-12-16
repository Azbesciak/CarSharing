import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailValidator} from "./email-validator";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmailValidator],
})
export class FormUtilsModule { }
