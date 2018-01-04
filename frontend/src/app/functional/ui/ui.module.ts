import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {HeaderComponent} from './header/header.component';
import {SpacerComponent} from './spacer/spacer.component';
import {MenuPositionComponent} from './menu-position/menu-position.component';
import {CarItemComponent} from './car-item/car-item.component';
import {CarsListComponent} from './cars-list/cars-list.component';
import {FormsModule} from "@angular/forms";
import {SectionComponent} from './section/section.component';
import {SmallCardComponent} from "./small-card/small-card.component";
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";

const components = [
  HeaderComponent,
  SpacerComponent,
  MenuPositionComponent,
  CarItemComponent,
  CarsListComponent,
  SectionComponent,
  SmallCardComponent,
  InfoDialogComponent];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    MaterialModule,
    components,
    FormsModule
  ],
  declarations: components,
  entryComponents: [InfoDialogComponent]
})
export class UiModule {
}
