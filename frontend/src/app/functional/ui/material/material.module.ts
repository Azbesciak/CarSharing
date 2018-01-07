import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatDialogModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatDatepickerModule,
  MatNativeDateModule, NativeDateModule, MatListModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule,
  MatStepperModule, MatExpansionModule, MatTooltipModule,
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {MATERIAL_COMPATIBILITY_MODE, Md2DatepickerModule, Md2ToastModule, MdNativeDateModule} from "md2";

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
  MatExpansionModule,
  MatTooltipModule,
  Md2ToastModule
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
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  declarations: []
})
export class MaterialModule { }
