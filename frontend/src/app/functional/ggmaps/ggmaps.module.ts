import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GgmapsComponent } from './ggmaps.component';
import {AgmCoreModule} from "@agm/core";
import {environment as env} from "../../../environments/environment"
import {MaterialModule} from "../ui/material/material.module";
import { DirectionsMapDirective } from './directions-map.directive';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: env.googleMapsKey,
      libraries: ['places', 'directions', 'geometry', 'drawing']
    }),
    MaterialModule
  ],
  declarations: [GgmapsComponent, DirectionsMapDirective],
  exports: [GgmapsComponent, AgmCoreModule, DirectionsMapDirective]
})
export class GgmapsModule { }
