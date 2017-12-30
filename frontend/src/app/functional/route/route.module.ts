import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GgmapsComponent } from './ggmaps/ggmaps.component';
import {AgmCoreModule} from "@agm/core";
import {environment as env} from "../../../environments/environment"
import {MaterialModule} from "../ui/material/material.module";
import { DirectionsMapDirective } from './directions/directions-map.directive';
import {CreatorComponent} from "./creator/creator.component";
import {LocationService} from "./location.service";
import {WayPointsComponent} from "./waypoints/way-points.component";
import {DndModule} from "ng2-dnd";
import { LocationInputComponent } from './location-input/location-input.component';
import { FormsModule } from "@angular/forms";
import { CurrentLocationComponent } from './current-location/current-location.component';
import { VisitDateComponent } from './visit-date/visit-date.component';
import {RoutePartComponent} from "./route-part/route-part.component";

const components = [
  GgmapsComponent,
  DirectionsMapDirective,
  CreatorComponent,
  WayPointsComponent,
  LocationInputComponent,
  CurrentLocationComponent,
  VisitDateComponent,
  RoutePartComponent
];

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: env.googleMapsKey,
      libraries: ['places', 'directions', 'geometry', 'drawing']
    }),
    MaterialModule,
    FormsModule,
    DndModule.forRoot()
  ],
  providers: [LocationService],
  declarations: [components],
  exports: [components, AgmCoreModule]
})
export class RouteModule { }
