import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from "@angular/material";

const MATERIAL_MODULES = [
  BrowserAnimationsModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES
  ],
  exports: [
    BrowserAnimationsModule,
    MATERIAL_MODULES
  ],
  declarations: []
})
export class MaterialModule { }
