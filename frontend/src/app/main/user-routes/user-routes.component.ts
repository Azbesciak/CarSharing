import { Component, OnInit } from '@angular/core';
import {TimeDateInput} from "../../functional/route/visit-date/time-date-input";
import {LocationInput} from "../../functional/route/location-input/location-input";
import {RouteSearchParams} from "../../functional/route/route-search/route-search-params";
import {Route} from "../../functional/route/route";
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {originDateInput} from "../../functional/route/visit-date/time-date-input-utils";
import {destInput, originInput} from "../../functional/route/location-input/location-input-utils";
import {DataService} from "../../functional/data/data.service";
import {RouteView} from "./route-view";


@Component({
  selector: 'app-user-routes',
  templateUrl: './user-routes.component.html',
  styleUrls: ['./user-routes.component.scss']
})
export class UserRoutesComponent extends RouteWatcher implements OnInit {

  locInputs: LocationInput[];
  dateInputs: TimeDateInput[];
  submitFun: (route: RouteSearchParams) => void;

  routes: RouteView[];
  private routeSearchParams: RouteSearchParams;

  constructor(private dataService: DataService) {
    super()
  }

  ngOnInit() {
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));

    this.locInputs = [originInput(false), destInput(false)];
    this.dateInputs = [originDateInput()];
    this.routeSearchParams = new RouteSearchParams();
    this.submitFun = (route: RouteSearchParams) => {
      this.dataService.getUserRoutes(route)
        .then(r => this.routes = r)
        .then(() => console.log(this.routes))
        .then(() => this.routeSearchParams = route)
    };
    this.submitFun(this.routeSearchParams);
  }

  protected onChange(route: Route) {
  }

}
