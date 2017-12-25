import {Component, DoCheck, OnInit} from '@angular/core';
import {RouteWatcher} from "../route-watcher";
import {Route} from "../route";
import {Location} from "../location";
import { RouteSnapshot } from "../route-snapshot";

@Component({
  selector: 'app-drag-list',
  templateUrl: './way-points.component.html',
  styleUrls: ['./way-points.component.scss']
})
export class WayPointsComponent extends RouteWatcher implements OnInit, DoCheck {

  ngDoCheck(): void {
    if (this.snapshots) {
      let changed = false;
      if (this.snapshots.length != this.route.snapshots.length) {
        changed = true;
      } else {
        for (let i = 0; i < this.snapshots.length; i++) {
          const original = this.route.snapshots[i];
          const copy = this.snapshots[i];
          if ((copy && original && copy.equals(original)) || (!original && !copy)) {
            continue;
          }
          changed = true;
          break;
        }
      }
      if (changed) {
        this.update();
      }
    }
  }

  private update() {
    this.route = new Route(this.snapshots);
    this.push(this.route)
  }

  constructor() {
    super()
  }

  protected snapshots: RouteSnapshot[];

  ngOnInit() {
    this.subscribe();
  }

  protected onChange(route: Route) {
    this.snapshots = RouteSnapshot.copyAll(route.snapshots);
  }
}
