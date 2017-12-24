import {Component, OnInit} from '@angular/core';
import {Route} from "../../functional/route/route";
import {LocationService} from "../../functional/route/location.service";
import {RouteEvent, RouteWatcher} from "../../functional/route/route-watcher";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { LocationInput } from "../../functional/route/location-input/location-input";
import { destInput, originInput, wayPointInput } from "../../functional/route/location-input/location-input-utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteWatcher implements OnInit {

  inputs: LocationInput[];

  constructor(private location: LocationService) {super()}
  ngOnInit(): void {
    this.route = new Route();
    this.routeEventBus = new BehaviorSubject(new RouteEvent(this.route, this));
    this.inputs = [originInput(), destInput(), wayPointInput()]

  }
  protected onChange(route: Route) {}

  onDistanceChange(dist: number) {
    console.log(dist)
  }

}
