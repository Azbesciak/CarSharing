import {Component, OnInit} from '@angular/core';
import {Route} from "../../functional/route/route";
import {LocationService} from "../../functional/route/location.service";
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { LocationInput } from "../../functional/route/location-input/location-input";
import { destInput, originInput, wayPointInput } from "../../functional/route/location-input/location-input-utils";
import { RouteSnapshot } from "../../functional/route/route-snapshot";
import { TimeDateInput } from "../../functional/route/visit-date/time-date-input";
import { routeDateInput } from "../../functional/route/visit-date/time-date-input-utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteWatcher implements OnInit {

  locInputs: LocationInput[];
  dateInputs: TimeDateInput[];
  submitFun: (route: Route) => Promise<any>;

  constructor() {super()}
  ngOnInit(): void {
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    this.locInputs = [originInput(), destInput()];
    this.dateInputs = [routeDateInput(this)]
    this.submitFun = route => {
      console.log(route)
      return Promise.resolve()
    };

  }
  protected onChange(route: Route) {}

  onDistanceChange(dist: number) {
    console.log(dist)
  }

}
