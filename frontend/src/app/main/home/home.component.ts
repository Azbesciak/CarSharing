import {Component, OnInit} from '@angular/core';
import {Route} from "../../functional/route/route";
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { LocationInput } from "../../functional/route/location-input/location-input";
import { destInput, originInput } from "../../functional/route/location-input/location-input-utils";
import { TimeDateInput } from "../../functional/route/visit-date/time-date-input";
import {originDateInput} from "../../functional/route/visit-date/time-date-input-utils";
import { Router } from "@angular/router";
import { RoutingConstants } from "../../functional/routing/routing.constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteWatcher implements OnInit {

  locInputs: LocationInput[];
  dateInputs: TimeDateInput[];
  submitFun: (route: Route) => Promise<any>;

  constructor(private router: Router) {super()}
  ngOnInit(): void {
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    this.locInputs = [originInput(), destInput()];
    this.dateInputs = [originDateInput()];
    this.submitFun = route => {
      console.log(route);
      return Promise.resolve()
    };

  }
  protected onChange(route: Route) {}

  onDistanceChange(dist: number) {
    console.log(dist)
  }

  goToAddRoute() {
    this.router.navigate([RoutingConstants.ADD_ROUTE_PATH])
  }

}
