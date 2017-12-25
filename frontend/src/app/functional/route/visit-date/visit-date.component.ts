import { Component, Input, OnInit } from "@angular/core";
import { RouteWatcher } from "../route-watcher";
import { Route } from "../route";
import { RouteSnapshot } from "../route-snapshot";
import { TimeDateInput } from "./time-date-input";

@Component({
  selector: 'app-visit-date',
  templateUrl: './visit-date.component.html',
  styleUrls: ['./visit-date.component.scss']
})
export class VisitDateComponent extends RouteWatcher implements OnInit {

  @Input()
  timeDateInp: TimeDateInput;

  protected onChange(route: Route) {

  }

  updateDate() {
    const routeSnapshots = RouteSnapshot.copyAll(this.route.snapshots);
    this.timeDateInp.onDateTimeSelect(this.timeDateInp.date, routeSnapshots);
    console.log("aaa")
    this.push(this.route);
  }

  constructor() {super()}

  ngOnInit() {
    this.subscribe();
  }

}
