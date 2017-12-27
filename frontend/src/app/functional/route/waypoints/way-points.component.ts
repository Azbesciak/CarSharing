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
    if (this.locations) {
      let changed = false;
      if (this.locations.length != this.route.locations.length) {
        changed = true;
      } else {
        for (let i = 0; i < this.locations.length; i++) {
          const original = this.route.locations[i];
          const copy = this.locations[i];
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
    this.route = this.route.withLocations(this.locations);
    this.push(this.route)
  }

  constructor() {
    super()
  }

  protected locations: Location[];

  ngOnInit() {
    this.subscribe();
  }

  protected onChange(route: Route) {
    this.locations = Location.copyAll(route.locations);
  }
}
