import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiModule} from "./ui/ui.module";

@NgModule({
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    UiModule
  ],
  declarations: []
})
export class FunctionalModule { }
