import {Component, OnInit} from '@angular/core';
import {Route} from "../../../functional/route/route";
import {RouteWatcher} from "../../../functional/route/route-watcher";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends RouteWatcher implements OnInit {
  protected onChange(route: Route) {
  }

  ngOnInit(): void {
    this.subscribe()
  }
  constructor(){super()}
}
