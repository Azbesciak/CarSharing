import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './header/header.component';
import { SpacerComponent } from './spacer/spacer.component';
import { MenuPositionComponent } from './menu-position/menu-position.component';
import { CarItemComponent } from './car-item/car-item.component';
import { CarsListComponent } from './cars-list/cars-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    SpacerComponent,
    MenuPositionComponent,
    CarItemComponent,
    CarsListComponent
  ],
  declarations: [HeaderComponent, SpacerComponent, MenuPositionComponent, CarItemComponent, CarsListComponent]
})
export class UiModule { }
