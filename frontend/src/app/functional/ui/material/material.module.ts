import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatDialogModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatDatepickerModule,
  MatNativeDateModule, NativeDateModule, MatListModule, MatProgressSpinnerModule,
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {DndModule} from "ng2-dnd";

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
  MatProgressSpinnerModule
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
