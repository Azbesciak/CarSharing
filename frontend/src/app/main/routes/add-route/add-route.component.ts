import {Component, OnInit} from '@angular/core';
import {RouteEvent, RouteWatcher} from "../../../functional/route/route-watcher";
import {Route} from "../../../functional/route/route";
import {TimeDateInput} from "../../../functional/route/visit-date/time-date-input";
import {destInput, originInput, wayPointInput} from "../../../functional/route/location-input/location-input-utils";
import {LocationInput} from "../../../functional/route/location-input/location-input";
import {
  destinationDateInput, originDateInput,
} from "../../../functional/route/visit-date/time-date-input-utils";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RoutingConstants} from "../../../functional/routing/routing.constants";
import {Router} from "@angular/router";
import {UserService} from "../../authorization/user.service";
import {AppUser} from "../../authorization/user";

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent extends RouteWatcher implements OnInit {

  locInputs: LocationInput[];
  dateInputs: TimeDateInput[];
  submitFun: (route: Route) => Promise<any>;
  user: AppUser;

  constructor(private router: Router,
              private userData: UserService) {
    super()
  }

  ngOnInit(): void {
    this.userData.subscribeOnUserData((user: AppUser) => this.user = user);
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    this.locInputs = [originInput(), destInput(), wayPointInput()];
    this.dateInputs = [originDateInput('datetime'), destinationDateInput()];
    this.submitFun = route => {
      console.log(route);
      return Promise.resolve()
    };

  }

  protected onChange(route: Route) {
  }

  onCarSelect(car) {
    console.log(car);
  }
}
