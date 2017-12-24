import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './header/header.component';
import { SpacerComponent } from './spacer/spacer.component';
import { MenuPositionComponent } from './menu-position/menu-position.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    SpacerComponent,
  ],
  declarations: [HeaderComponent, SpacerComponent, MenuPositionComponent]
})
export class UiModule { }
