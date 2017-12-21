import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './header/header.component';
import { SpacerComponent } from './spacer/spacer.component';
import { DragListComponent } from './drag-list/drag-list.component';
import {DndModule} from "ng2-dnd";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DndModule.forRoot()
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    SpacerComponent,
    DragListComponent
  ],
  declarations: [HeaderComponent, SpacerComponent, DragListComponent]
})
export class UiModule { }
