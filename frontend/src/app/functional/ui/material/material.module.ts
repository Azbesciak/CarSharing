import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatDialogModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatDatepickerModule,
  MatNativeDateModule, NativeDateModule, MatListModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule,
  MatStepperModule, MatExpansionModule,
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import { Md2DatepickerModule, MdNativeDateModule } from "md2";

const MATERIAL_MODULES = [
  BrowserAnimationsModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NativeDateModule,
  MatListModule,
  MatProgressSpinnerModule,
  Md2DatepickerModule,
  MdNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatStepperModule,
  MatExpansionModule
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
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
  ],
  declarations: []
})
export class MaterialModule { }
