import { Component, Input, OnInit } from "@angular/core";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { RouteSnapshot } from "../route-snapshot";
import { TimeDateInput } from "./time-date-input";
import {Location} from "../location";

@Component({
  selector: 'app-visit-date',
  templateUrl: './visit-date.component.html',
  styleUrls: ['./visit-date.component.scss']
})
export class VisitDateComponent extends RouteWatcher implements OnInit {

  @Input()
  timeDateInp: TimeDateInput;

  protected onChange(route: Route) {
    this.timeDateInp.onRouteChange(route, this.timeDateInp);
  }

  updateDate() {
    this.timeDateInp.onDateTimeSelect(this);
    this.push(this.route);
  }

  constructor() {super()}

  ngOnInit() {
    this.subscribe();
  }

}
