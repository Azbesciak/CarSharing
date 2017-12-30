import { Component, OnInit } from '@angular/core';
import {LocationInput} from "../../../../functional/route/location-input/location-input";
import {RouteWatcher} from "../../../../functional/route/route-watcher";
import {Route} from "../../../../functional/route/route";
import {destInput, originInput, wayPointInput} from "../../../../functional/route/location-input/location-input-utils";
import {BusInjectorService} from "../bus-injector.service";
import {RouteCreator} from "./route-creator";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent extends RouteCreator implements OnInit {
  locInputs: LocationInput[];
  constructor(busInj: BusInjectorService) {
    super(busInj);
  }

  ngOnInit() {
    this.subscribe();
    this.locInputs = [originInput(), destInput(), wayPointInput()];
  }

  isValid() {
    return this.locInputs.every(l => l.isValid())
  }

  onCarSelect(car) {
    console.log(car);
  }
  protected onChange(route: Route) {}

  goToDetails() {

  }
}
